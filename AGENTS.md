# AGENTS.md — Pascal.dev Engineering Harness

Agents are workers, not deployment authorities.

## Workflow
1. Read the task and relevant code before editing.
2. Prefer deterministic code for validation, persistence, permissions, retries, and deployment gates.
3. Keep changes scoped; do not refactor unrelated code.
4. Add or update tests for changed behavior.
5. For Ops Bridge run `npm run test:ops-bridge` and `npm run build`.
6. Report changed files, verification results, remaining risks, and human approvals needed.

## Human approval gates
Never merge to main, deploy production, mutate database schema/data, change domains/DNS/billing/email, rotate or disclose secrets, expand permissions, or perform destructive Git operations without explicit human approval.

## Security and invariants
Never commit credentials. Verify webhook signatures. Treat provider payloads as untrusted. Use least privilege. Never weaken tests/auth/validation just to pass CI.

Unknown repositories are ignored safely. Duplicate deliveries must not duplicate side effects. Failed work stays recoverable. Older events must not overwrite newer project state. Notion is a control surface, not a transactional queue. Sync stays non-automatic until end-to-end production verification passes. Vercel/Supabase outages must not block unrelated engineering work.

## Review
Reviewer agents inspect diffs independently for correctness, security, regressions, race conditions, missing tests, and violations of this file.

## Done
Done means requested behavior is implemented, relevant tests and build pass, no known critical regression is introduced, limitations are documented, and human gates remain intact.
