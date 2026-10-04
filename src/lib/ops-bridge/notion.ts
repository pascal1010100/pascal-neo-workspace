const NOTION_API_VERSION = "2026-03-11";

type ProjectSignalInput = {
  pageId: string;
  signal: string;
  occurredAt?: string;
};

export async function updateNotionProjectSignal({
  pageId,
  signal,
  occurredAt = new Date().toISOString(),
}: ProjectSignalInput) {
  const token = process.env.NOTION_API_TOKEN;

  if (!token) {
    throw new Error("NOTION_API_TOKEN is not configured");
  }

  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_API_VERSION,
    },
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
