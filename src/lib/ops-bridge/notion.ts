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
        Sync: {
          select: { name: "Automático" },
        },
        "Sync estado": {
          select: { name: "Mapeado" },
        },
      },
    }),
    cache: "no-store",
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
  });

  if (!response.ok) {
    const responseDetail = await response.text();
    throw new Error(
      `Notion Ops Event failed (${response.status}): ${responseDetail.slice(0, 500)}`,
    );
  }

  return response.json();
}
