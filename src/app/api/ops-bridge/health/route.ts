import { NextResponse } from "next/server";
import { OPS_PROJECTS } from "@/lib/ops-bridge/project-map";
import { checkNotionAccess } from "@/lib/ops-bridge/notion";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = process.env.OPS_HEALTH_TOKEN;
  if (!token) return NextResponse.json({ ok: false, error: "Health access is not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let notionReachable = false;
  try {
    await checkNotionAccess(OPS_PROJECTS.map(project => project.notionPageId));
    notionReachable = true;
  } catch { /* Never expose upstream error bodies or credentials. */ }
  const ok = notionReachable && Boolean(process.env.GITHUB_WEBHOOK_SECRET);
  return NextResponse.json({
    ok,
    service: "pascal-ops-bridge",
    notionReachable,
    mappedProjects: OPS_PROJECTS.length,
    productionReady: false,
    limitations: ["Write permissions and end-to-end execution need verification", "Concurrent delivery deduplication requires a durable unique-key inbox"],
  }, { status: ok ? 200 : 503 });
}
