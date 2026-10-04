const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert/strict');
const { createHmac } = require('node:crypto');
const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');
// Load the actual route modules on Node 20 without adding a test dependency.
require.extensions['.ts'] = (mod, filename) => {
  let source = fs.readFileSync(filename, 'utf8').replace(/"@\/([^\"]+)"/g, (_, value) => JSON.stringify(path.resolve(__dirname, '../src', value)));
  mod._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
};
const { POST } = require('../src/app/api/ops-bridge/github/route.ts');
const { GET } = require('../src/app/api/ops-bridge/health/route.ts');
const originalFetch = global.fetch;
let records, calls, failProject, failComplete, failRead;
beforeEach(() => {
  records = []; calls = []; failProject = false; failComplete = false; failRead = false;
  process.env.GITHUB_WEBHOOK_SECRET = 'test-secret';
  process.env.NOTION_API_TOKEN = 'test-notion';
  process.env.NOTION_OPS_EVENTS_DATA_SOURCE_ID = 'test-source';
  process.env.OPS_HEALTH_TOKEN = 'test-health';
  global.fetch = async (url, options = {}) => {
    const body = options.body ? JSON.parse(options.body) : undefined;
    calls.push({ url, method: options.method, body });
    const result = (value, status = 200) => new Response(JSON.stringify(value), { status });
    if (failRead) return result({}, 401);
    if (url.endsWith('/query')) return result({ results: body.filter ? records : [] });
    if (url.endsWith('/pages') && options.method === 'POST') {
      const record = { id: 'event-page', properties: body.properties }; records.push(record); return result(record);
    }
    if (options.method === 'PATCH') {
      if (url.endsWith('/event-page')) {
        if (failComplete) return result({}, 503);
        records[0].properties.Procesado = body.properties.Procesado;
      } else if (failProject) return result({}, 503);
    }
    return result({ id: 'readable' });
  };
});
after(() => { global.fetch = originalFetch; });
function request(payload = { repository: { id: 1069836211 }, ref: 'refs/heads/main', after: 'abc1234' }, options = {}) {
  const body = JSON.stringify(payload);
  return new Request('http://localhost/api/ops-bridge/github', { method: 'POST', body, headers: {
    'x-github-event': options.event ?? 'push', 'x-github-delivery': options.delivery ?? 'test-delivery',
    'x-hub-signature-256': options.signature ?? `sha256=${createHmac('sha256', 'test-secret').update(body).digest('hex')}`,
  } });
}
test('valid mapped event records pending, updates project, then completes; Sync untouched', async () => {
  assert.equal((await POST(request())).status, 200);
  assert.equal(records.length, 1); assert.equal(records[0].properties.Procesado.checkbox, true);
  const mutations = calls.filter(c => ['POST', 'PATCH'].includes(c.method) && !c.url.endsWith('/query'));
  assert.deepEqual(mutations.map(c => c.method), ['POST', 'PATCH', 'PATCH']);
  assert.equal(mutations[1].body.properties.Sync, undefined);
});
test('sequential redelivery does not create or update again', async () => {
  await POST(request()); calls = [];
  assert.equal((await (await POST(request())).json()).duplicate, true);
  assert.equal(records.length, 1); assert.equal(calls.length, 1);
});
for (const stage of ['project', 'completion']) test(`redelivery resumes after ${stage} failure`, async () => {
  if (stage === 'project') failProject = true; else failComplete = true;
  assert.equal((await POST(request())).status, 503);
  assert.equal(records[0].properties.Procesado.checkbox, false);
  failProject = failComplete = false;
  assert.equal((await POST(request())).status, 200);
  assert.equal(records.length, 1); assert.equal(records[0].properties.Procesado.checkbox, true);
});
test('invalid signature makes no upstream calls', async () => {
  assert.equal((await POST(request(undefined, { signature: 'sha256=bad' }))).status, 401); assert.equal(calls.length, 0);
});
test('unknown repo is ignored', async () => {
  assert.equal((await POST(request({ repository: { id: 999 } }))).status, 202); assert.equal(calls.length, 0);
});
test('null payload and missing delivery fail validation', async () => {
  assert.equal((await POST(request(null))).status, 400);
  assert.equal((await POST(request(undefined, { delivery: '' }))).status, 400); assert.equal(calls.length, 0);
});
test('health requires auth and detects failed Notion authentication', async () => {
  const req = () => new Request('http://localhost/health', { headers: { authorization: 'Bearer test-health' } });
  assert.equal((await GET(new Request('http://localhost/health'))).status, 401);
  failRead = true; assert.equal((await GET(req())).status, 503);
  failRead = false; const response = await GET(req()); assert.equal(response.status, 200);
  assert.equal((await response.json()).productionReady, false);
});
