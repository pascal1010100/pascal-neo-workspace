# Pascal Ops Bridge

Internal event bridge for Pascal.dev Company OS.

## Current implementation

- Canonical identity map for Company OS projects.
- Signed GitHub webhook receiver at `/api/ops-bridge/github`.
- GitHub events update the mapped project's **Última señal** and **Última actividad técnica** in Notion.
- Processed GitHub events are written to the Company OS **Ops Events** audit log.
- Health endpoint at `/api/ops-bridge/health`.
- No production deployment, database, pricing, email, or domain changes are performed.

## Required environment variables

Configure these in the deployment environment. Never commit their values.

```bash
GITHUB_WEBHOOK_SECRET=
NOTION_API_TOKEN=
NOTION_OPS_EVENTS_DATA_SOURCE_ID=
```

The Notion integration behind `NOTION_API_TOKEN` must have update access to the Company OS project pages and insert access to the Ops Events data source. Set `NOTION_OPS_EVENTS_DATA_SOURCE_ID` to the Ops Events data source identifier.

## GitHub webhook

Point GitHub webhooks to:

```text
https://<internal-ops-domain>/api/ops-bridge/github
```

Recommended events for the first stage:

- Push
- Pull request
- Workflow run

Set a high-entropy webhook secret and store the same value as `GITHUB_WEBHOOK_SECRET`.

## Guardrails

- The receiver validates GitHub's `X-Hub-Signature-256`.
- Unknown repositories are acknowledged but ignored.
- Secrets stay in environment variables.
- This stage writes operational metadata to Notion only.
- It does not change Vercel deployments or Supabase databases.

## Mapped projects

- Pascal.dev / Portafolio
- Mandalas Hostels
- Nativa Market
- Nómada Fantasma
- GuateRaw Travel
- Not Your Money Laundry
- Content Lab (identity incomplete; no GitHub/Vercel mapping yet)

## Next stages

1. Add Vercel deployment-event ingestion.
2. Add Supabase health reconciliation for known refs.
3. Add a durable event/audit log.
4. Add retries and idempotency using provider delivery IDs.
5. Only after verification, switch project `Sync` from Manual to Automatic.
