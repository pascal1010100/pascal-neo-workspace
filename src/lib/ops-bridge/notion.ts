const NOTION_API_VERSION = "2026-03-11";

type ProjectSignalInput = {
  pageId: string;
  signal: string;
  occurredAt?: string;
};

type OpsEventInput = {
  title: string;
  occurredAt?: string;
  source: "GitHub" | "Vercel" | "Supabase" | "Notion" | "Sistema";
  type: "Push" | "PR" | "Workflow" | "Deploy" | "Health" | "Sync" | "Error" | "Cambio";
  result: "OK" | "Atención" | "Error" | "Ignorado";
  projectPageId?: string;
  opsId: string;
  externalId: string;
  detail: string;
  requiresAttention?: boolean;
  processed?: boolean;
};

function notionHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_API_VERSION,
  };
}

function getNotionToken() {
  const token = process.env.NOTION_API_TOKEN;

  if (!token) {
    throw new Error("NOTION_API_TOKEN is not configured");
  }

  return token;
}

export async function updateNotionProjectSignal({
  pageId,
  signal,
  occurredAt = new Date().toISOString(),
}: ProjectSignalInput) {
  const token = getNotionToken();

  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: notionHeaders(token),
    body: JSON.stringify({
      properties: {
        "Última señal": {
          rich_text: [
            {
              type: "text",
              text: { content: signal.slice(0, 1800) },
            },
          ],
        },
        "Última actividad técnica": {
          date: { start: occurredAt },
        },
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Notion update failed (${response.status}): ${detail.slice(0, 500)}`,
    );
  }

  return response.json();
}

export async function createOpsEvent({
  title,
  occurredAt = new Date().toISOString(),
  source,
  type,
  result,
  projectPageId,
  opsId,
  externalId,
  detail,
  requiresAttention = false,
  processed = true,
}: OpsEventInput) {
  const token = getNotionToken();
  const dataSourceId = process.env.NOTION_OPS_EVENTS_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error("NOTION_OPS_EVENTS_DATA_SOURCE_ID is not configured");
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: notionHeaders(token),
    body: JSON.stringify({
      parent: {
        type: "data_source_id",
        data_source_id: dataSourceId,
      },
      properties: {
        Evento: {
          title: [
            {
              type: "text",
              text: { content: title.slice(0, 500) },
            },
          ],
        },
        Fecha: {
          date: { start: occurredAt },
        },
        Fuente: {
          select: { name: source },
        },
        Tipo: {
          select: { name: type },
        },
        Resultado: {
          select: { name: result },
        },
        ...(projectPageId
          ? {
              Proyecto: {
                relation: [{ id: projectPageId }],
              },
            }
          : {}),
        "Ops ID": {
          rich_text: [
            {
              type: "text",
              text: { content: opsId.slice(0, 500) },
            },
          ],
        },
        "External ID": {
          rich_text: [
            {
              type: "text",
              text: { content: externalId.slice(0, 500) },
            },
          ],
        },
        Detalle: {
          rich_text: [
            {
              type: "text",
              text: { content: detail.slice(0, 1800) },
            },
          ],
        },
        "Requiere atención": {
          checkbox: requiresAttention,
        },
        Procesado: {
          checkbox: processed,
        },
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const responseDetail = await response.text();
    throw new Error(
      `Notion Ops Event failed (${response.status}): ${responseDetail.slice(0, 500)}`,
    );
  }

  return response.json();
}

// Notion has no unique constraint: this handles sequential redelivery only.
// Concurrent deliveries require a durable unique-key inbox before production.
async function notionRequest(path: string, method = "GET", body?: unknown) {
  const response = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: notionHeaders(getNotionToken()),
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Notion request failed (${response.status})`);
  return response.json();
}

function eventsDataSource() {
  const id = process.env.NOTION_OPS_EVENTS_DATA_SOURCE_ID;
  if (!id) throw new Error("NOTION_OPS_EVENTS_DATA_SOURCE_ID is not configured");
  return id;
}

export async function findOpsEvent(externalId: string) {
  const data = await notionRequest(`data_sources/${eventsDataSource()}/query`, "POST", {
    filter: { property: "External ID", rich_text: { equals: externalId } },
    page_size: 2,
  });
  if (data.results.length > 1) throw new Error("Duplicate delivery records require reconciliation");
  return data.results[0] as { id: string; properties: { Procesado?: { checkbox?: boolean }; Fecha?: { date?: { start?: string } } } } | undefined;
}

export async function completeOpsEvent(pageId: string) {
  await notionRequest(`pages/${pageId}`, "PATCH", {
    properties: { Procesado: { checkbox: true } },
  });
}

export async function checkNotionAccess(pageIds: string[]) {
  await notionRequest("users/me");
  await notionRequest(`data_sources/${eventsDataSource()}/query`, "POST", { page_size: 1 });
  await Promise.all(pageIds.map(id => notionRequest(`pages/${id}`)));
}
