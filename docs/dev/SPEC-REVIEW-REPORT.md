# SPEC review report

## Current gate

State: **Ready for complete-project planning and acceptance**. Accepted baseline and modern feature decisions are incorporated; the complete current owners pass scoped conformance. Original reviews and findings remain below. This gate describes document readiness, not runtime acceptance.

| Document | Reviewed identity (SHA-256) |
| --- | --- |
| `docs/dev/SPEC.md` | `464308a577e91bec87f8071abde85915e4a28b3f8bdf2ae9c0d5b844e68a81d4` |
| `docs/dev/spec/board-and-pieces.md` | `9bb85e488f2bab86be88ff8d1eedc285f749a30f5589df65075d7a0d83d74833` |
| `docs/dev/spec/session-and-timing.md` | `9f98d13667add448adbfd37ade6a7eca888ec20e5085412f54032ad6fe2f901d` |
| `docs/dev/spec/browser-interaction.md` | `f114ddb641f829cb30f009cc515938973d098497d622d9096a9d09b7dfb901da` |
| `docs/dev/spec/modern-piece-controls.md` | `7444dd212359d75b2b2a86684ebfd6c4519bd76708e807cb61639f45197c5763` |
| `docs/dev/PROJECT.md` | `aa795c0fd4ecc704f42f6c037a3556e94b612ae22b0e85cf1ebbb0fe579833db` |
| `docs/dev/ARCHITECTURE.md` | `0a7ac908dfb0613fdcde87ea7b22aca7313149685c7ee4a0f7b8abe2feb824df` |
| `docs/dev/DECOMPOSITION.md` | `b44d9af82c860792a739204c698c09c861118e9bdd63d19745cf972df3d3968d` |

## Initial review

Date: 2026-10-08. Reviewer: coordinating agent using sdd-specify and the SDD development-document QC criteria. No independent subagent review was performed.

The initial SPEC root identity was `d5e9a4685a78be1d5ed0a924cf39a2db74bcd5acf57fc4a1df4143ff8691f94e`; initial timing child identity was `ea0a67f90e083a587719f2cb77c26060bd1ffbcfc7164c22b5362b159d718ebc`. Other specification children were unchanged during correction.

| Coverage | Design obligations and assessment |
| --- | --- |
| B-01–B-06 / A-01, A-02, A-06 | All seven shapes, independent source, placement, atomic lock/clear/spawn, score/level progression, and next preview have canonical contracts and component owners |
| T-01–T-06 / A-03–A-05 | Session owns state/timers, source and clock are injected, full contact-based delay is preserved, pause/restart/errors and exact event ordering are explicit |
| U-01–U-05 / A-05, A-07, A-08 | Controller owns time/input/lifecycle resources; presentation consumes snapshots; static delivery and desktop browser evidence are specified |
| Scope exclusions | Modern expansion features and server/account/touch/audio/persistence stay excluded; baseline supplies no dormant implementation |

The review checked parent/child ownership, accepted scope, directed dependencies, success/no-op/error semantics, lifecycle/resource obligations, numerical rules, and end-to-end acceptance. Exact shapes and controls are specified as proposed defaults rather than attributed to earlier user decisions. No new architectural block or dependency was introduced.

| Finding | Location and consequence | Correction / recheck | Disposition |
| --- | --- | --- | --- |
| SPEC-F01 | T-01/T-03 and root guarantees required exact equal timing snapshots across fractional subdivisions; floating-point addition can vary by subdivision | Define precision for fractional comparison and exact integer-boundary scenarios, preserving exact gameplay-state comparison | Resolved in Revision 1 |
| SPEC-D01 | Concrete geometry, score, speed, input and focus policies were not individually approved in design | Mark these as written-spec review choices; obtain human specification acceptance before PLAN | Accepted in Revision 2 |

## Revision 1

The specification owner corrected the root and session/timing child. Identical input sequences remain deterministic; integer-millisecond subdivision scenarios require exact snapshots, and fractional timing fields use a 0.000001 ms comparison tolerance away from boundary ambiguity. The root explicitly identifies the human review boundary for concrete defaults. Final identities are in the current-gate table.

Recheck: inspected the corrected guarantees for consistency with event ordering and contact-based lock delay, and manually traced contact at a partial gravity phase, grounded movement, loss/recovery of support, pause/resume, deadline ties, clearing/progression/spawn, and failure atomicity. Automated document checks confirmed 17 unique canonical requirement groups, all seven square shapes with four occupied cells, end-state language, and local file links. Authored-document whitespace and tracked-secret checks are recorded by the persistence verification.

No runtime behavior, browser compatibility, source uniformity, accessibility certification, or product acceptance has been demonstrated; no implementation exists. No downstream PLAN/TASKS assessment exists to invalidate. SPEC-F01 is resolved. SPEC-D01 remains the sole progression boundary.

## Revision 2

The user accepted the complete written SPEC on 2026-10-08. SPEC-D01 is resolved by that decision. The specification owner updated preparation-status text in SPEC, PROJECT, and AGENTS without changing gameplay contracts or any specification child. Recheck against checkpoint `6b2605766d9cb88053be8a56d3bac09488da07d5` confirms the contract map, all 17 requirement groups, and A-01–A-08 are unchanged. The current identity table reflects the status-text edits. SPEC-F01 remains resolved; no blockers remain. The gate is Ready for PLAN. Product tests remain unperformed because implementation is absent.

## Revision 3

PLAN preparation updates PROJECT's document-navigation/status paragraph only. Comparison with accepted SPEC checkpoint `336ebc6b68268d912a716b940b2e10c048c5075b` confirms SPEC and all children, ARCHITECTURE, DECOMPOSITION, and every behavioral/scope decision are byte-identical. The current identity table reflects PROJECT's status-text change. This does not invalidate the established SPEC/design conformance assessment; Ready is retained. No new specification correction or behavioral decision was made.

## Revision 4

TASKS preparation updates PROJECT's preparation context and navigation to record accepted PLAN/layout, inline method selection, and the executable hierarchy. No project scope or gameplay contract changes. SPEC and all children, ARCHITECTURE, and DECOMPOSITION remain byte-identical to their accepted state. Refresh the PROJECT identity in the current table and retain the conformance gate as Ready. No implementation acceptance is claimed.

## Revision 5

2026-10-08: T-033 accepted-source incorporation, inline assessment. B-01–B-06, T-01–T-06 and U-01–U-05 retain all unaffected baseline obligations; F-01–F-07 and FA-01–FA-08 specify the accepted bags, kicks, hold, ghost/drop, atomicity and display directly. Compared both literal kick tables and every feature clause with accepted FEATURE-SPEC; the canonical F-01 onward is identical. Source/placement/session/browser/presentation responsibilities match design. Grounded full-G timing, no reset on zero descent, fresh held contact, exact deadline order and source-failure publication remain coherent. No new behavioral decision or compatibility claim is introduced. Historical scope exclusions apply to baseline preparation only.

Checks: read complete changed roots/children against accepted feature sources; grouped requirement/acceptance coverage, ownership/dependency/error/timing semantics, local links and whitespace. Current exact identities are above. No unresolved conformance finding remains. Active FEATURE-TASKS still owns T-021–T-036; transfer and TASKS reassessment remain T-034.
