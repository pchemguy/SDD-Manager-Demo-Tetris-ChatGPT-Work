# Modern piece controls feature campaign

Status: design, SPEC and PLAN/layout accepted; feature TASKS prepared and reviewed; implementation has not started.

Campaign: `001_3fd5011`. Baseline: `3fd501155708a92ddf63415f02180bdde9167836`.
Working branch: `feature/001_3fd5011-modern-piece-controls`. Integration target: `main`.
Package directory matches the complete feature branch suffix.

## Objective and scope

Extend the completed browser TypeScript Tetris baseline with hold, ghost piece, seven-bag randomization, wall kicks and hard drop. Preserve the accepted full-gravity-interval contact-based lock delay, existing progression, lifecycle policies, static distribution and engine/browser/presentation separation. This is the planned second stage of the SDD demo, using the established inline workflow and cloud sandbox.

## Active sources and next boundary

- [Feature architecture](../../FEATURE_ARCHITECTURE.md) proposes engine and presentation changes and records alternatives.
- [Feature decomposition](../../FEATURE_DECOMPOSITION.md) assigns component ownership and verification seams.
- [Baseline SPEC](../../SPEC.md), [architecture](../../ARCHITECTURE.md) and [decomposition](../../DECOMPOSITION.md) govern unchanged behavior.
- [Completed baseline report](../../reports/IMPLEMENTATION-REPORT.md) records the starting implementation evidence.

The user requested beginning this campaign. The user accepted the feature architecture and decomposition on 2026-10-08. [FEATURE-SPEC](../../FEATURE-SPEC.md) and its [review](../../FEATURE-SPEC-REVIEW-REPORT.md) define the exact delta. [FEATURE-PLAN](../../FEATURE-PLAN.md), [feature layout](../../FEATURE-LAYOUT.md) and the [plan review](../../FEATURE-PLAN-REVIEW-REPORT.md) define the proposed delivery boundaries. [FEATURE-TASKS](../../FEATURE-TASKS.md) and its [review](../../FEATURE-TASKS-REVIEW-REPORT.md) derive T-021–T-036. The user selected the full expansion T-021–T-036 on 2026-10-08; the stopping boundary is verified full-feature integration. Inline execution remains selected. Execute inline with verified task checkpoints and maintained GitHub lifecycle tracking. No product implementation, main-document incorporation or final feature merge is authorized by design preparation alone.

Baseline hosted tracking is complete. Feature phase eligibility and tracking scope must be established before creating feature task objects. No feature issues, labels or milestones have been created during design preparation.

## Accepted design decisions

Hold is available once per active-piece episode and is re-enabled only after a piece locks. Held pieces return at canonical spawn orientation and position. The ghost marks the same landing position used by hard drop. Production selection uses shuffled bags containing all seven types. Rotation uses explicit ordered kick tables with distinct I-piece handling; O remains a no-op. Hard drop awards two points per descended row and does not force locking or reset an existing grounded deadline.

The user accepted these design choices. Exact kick tables, input bindings, source-draw counts, error behavior, snapshot fields and acceptance scenarios belong to FEATURE-SPEC.
