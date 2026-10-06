import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { findProjectByGitHubRepoId } from "@/lib/ops-bridge/project-map";
import {
  createOpsEvent,
  findOpsEvent,
  completeOpsEvent,
  updateNotionProjectSignal,
} from "@/lib/ops-bridge/notion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifyGitHubSignature(
  rawBody: string,
  signature: string | null,
  secret: string,
) {
  if (!signature?.startsWith("sha256=")) return false;

  const expected = `sha256=${createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex")}`;

  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

function describeGitHubEvent(
  event: string,
  payload: Record<string, unknown>,
) {
  if (event === "push") {
    const ref = typeof payload.ref === "string" ? payload.ref : "unknown-ref";
    const after =
      typeof payload.after === "string" ? payload.after.slice(0, 7) : "unknown";
    return `GitHub push · ${ref} · ${after}`;
  }

  if (event === "pull_request") {
    const action =
      typeof payload.action === "string" ? payload.action : "updated";
    const number =
      typeof payload.number === "number" ? `#${payload.number}` : "PR";
    const pullRequest = payload.pull_request as
      | { title?: string }
      | undefined;
    const title = pullRequest?.title ? ` · ${pullRequest.title}` : "";
    return `GitHub pull_request ${action} · ${number}${title}`;
  }

  if (event === "workflow_run") {
    const workflowRun = payload.workflow_run as
      | { name?: string; status?: string; conclusion?: string | null }
      | undefined;
    const name = workflowRun?.name ?? "workflow";
    const state = workflowRun?.conclusion ?? workflowRun?.status ?? "updated";
    return `GitHub Actions · ${name} · ${state}`;
  }

  return `GitHub ${event}`;
}

function toOpsEventType(event: string) {
  if (event === "push") return "Push" as const;
  if (event === "pull_request") return "PR" as const;
  if (event === "workflow_run") return "Workflow" as const;
  return "Cambio" as const;
}

function githubEventResult(
  event: string,
  payload: Record<string, unknown>,
): { result: "OK" | "Atención"; requiresAttention: boolean } {
  if (event !== "workflow_run") {
    return { result: "OK", requiresAttention: false };
  }

  const workflowRun = payload.workflow_run as
    | { conclusion?: string | null }
    | undefined;
  const conclusion = workflowRun?.conclusion;

  if (conclusion && !["success", "neutral", "skipped"].includes(conclusion)) {
    return { result: "Atención", requiresAttention: true };
  }

  return { result: "OK", requiresAttention: false };
}

export async function POST(request: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "GITHUB_WEBHOOK_SECRET is not configured" },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!verifyGitHubSignature(rawBody, signature, secret)) {
    return NextResponse.json(
      { ok: false, error: "Invalid GitHub signature" },
      { status: 401 },
    );
  }

  const event = request.headers.get("x-github-event") ?? "unknown";
  const delivery = request.headers.get("x-github-delivery") ?? "unknown";

  if (!/^[a-zA-Z0-9-]{1,100}$/.test(delivery) || delivery === "unknown") {
    return NextResponse.json({ ok: false, error: "Invalid delivery ID" }, { status: 400 });
  }
  if (event === "ping") return NextResponse.json({ ok: true, event });
  if (!["push", "pull_request", "workflow_run"].includes(event)) {
    return NextResponse.json({ ok: true, ignored: true, event }, { status: 202 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid object");
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const repository = payload.repository as
    | { id?: number; full_name?: string }
    | undefined;

  if (!repository?.id) {
    return NextResponse.json(
      { ok: false, error: "Webhook payload has no repository id" },
      { status: 400 },
    );
  }

  const project = findProjectByGitHubRepoId(String(repository.id));

  if (!project) {
    return NextResponse.json(
      {
        ok: true,
        ignored: true,
        reason: "Repository is not mapped to Company OS",
        repository: repository.full_name ?? repository.id,
        event,
        delivery,
      },
      { status: 202 },
    );
  }

  const signal = describeGitHubEvent(event, payload);
  const eventStatus = githubEventResult(event, payload);

  try {
    const externalId = `github:${delivery}`;
    const existing = await findOpsEvent(externalId);
    if (existing?.properties.Procesado?.checkbox) {
      return NextResponse.json({ ok: true, duplicate: true, delivery });
    }
    const occurredAt = existing?.properties.Fecha?.date?.start ?? new Date().toISOString();
    // Persist the pending record first; redelivery resumes this same record.
    const record = existing ?? await createOpsEvent({
      title: signal,
      occurredAt,
      source: "GitHub",
      type: toOpsEventType(event),
      result: eventStatus.result,
      projectPageId: project.notionPageId,
      opsId: project.opsId,
      externalId,
      detail: `${repository.full_name ?? repository.id} · ${event}`,
      requiresAttention: eventStatus.requiresAttention,
      processed: false,
    });
    await updateNotionProjectSignal({ pageId: project.notionPageId, signal, occurredAt });
    await completeOpsEvent(record.id);
  } catch {
    // GitHub failed deliveries must be redelivered explicitly; no automatic retry claim.
    return NextResponse.json({ ok: false, error: "Notion synchronization incomplete", delivery }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    opsId: project.opsId,
    event,
    delivery,
    signal,
  });
}
