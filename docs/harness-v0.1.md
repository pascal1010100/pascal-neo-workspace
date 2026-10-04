# Harness v0.1

Flow: Task / mission -> implementer agent -> deterministic verification -> reviewer agent -> human approval -> merge/deploy.

The implementer makes the smallest scoped change and adds tests. The reviewer independently checks the diff. The human owns architecture exceptions and all high-impact gates.

For Ops Bridge the deterministic gate is `npm run test:ops-bridge` plus `npm run build`. GitHub Actions is authoritative; agent claims do not replace CI.

GitHub + Notion work may continue while Vercel or Supabase access is unavailable. The Bridge must not claim production readiness until a durable inbox and end-to-end runtime verification exist.

Next increment: add a transactional durable inbox with a unique provider/delivery key, retry state, and ordering protection. Do not emulate it with Notion.
