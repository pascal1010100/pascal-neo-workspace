const { execFileSync } = require("node:child_process");
const fs = require("node:fs");

const required = [
  "AGENTS.md",
  "docs/harness-v0.1.md",
  "docs/reviewer-contract.md",
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Harness contract missing: ${file}`);
}

const agents = fs.readFileSync("AGENTS.md", "utf8");
for (const phrase of ["Human approval gates", "Never commit credentials", "Duplicate deliveries"]) {
  if (!agents.includes(phrase)) throw new Error(`AGENTS.md invariant missing: ${phrase}`);
}

const reviewer = fs.readFileSync("docs/reviewer-contract.md", "utf8");
for (const phrase of ["PASS", "BLOCK", "idempotency", "ordering"]) {
  if (!reviewer.includes(phrase)) throw new Error(`Reviewer contract incomplete: ${phrase}`);
}

execFileSync(process.execPath, ["--test", "tests/ops-bridge.test.cjs"], { stdio: "inherit" });
console.log("Harness contract verification passed.");
