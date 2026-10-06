# Reviewer Contract

The reviewer is independent from the implementer. Review the proposed diff before any human merge decision.

## Review order

1. Correctness: does the change actually satisfy the task?
2. Regression risk: what existing behavior could break?
3. Security: auth, signatures, secrets, permissions, untrusted input and unsafe side effects.
4. Reliability: retries, idempotency, ordering, partial failure and race conditions.
5. Verification: are tests meaningful and is important behavior missing coverage?
6. Harness compliance: does the change respect AGENTS.md and human approval gates?

## Output

Return one verdict:

- PASS — no blocking finding.
- BLOCK — one or more concrete blocking findings exist.

For every finding include severity, file/behavior, why it matters, and the smallest corrective action. Do not approve a change merely because CI is green.

## Ops Bridge blockers

Treat duplicate side effects, unrecoverable failed work, stale-event overwrite, signature bypass, secret exposure, production actions without approval, or falsely reporting production readiness as blocking findings.
