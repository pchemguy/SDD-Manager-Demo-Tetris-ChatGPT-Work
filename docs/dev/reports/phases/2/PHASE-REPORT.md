# Phase 2 — Modern piece controls

## Implemented capabilities

The accepted full T-021–T-036 range delivers seven-bag selection, table-driven kicks, once-per-lock hold, detached ghost landing and hard drop with 2d scoring. Hard drop preserves ordinary full-gravity-interval locking from first contact; zero-distance drops preserve existing deadlines. Baseline scoring/progression, lifecycle/focus/repeats, one preview and static delivery remain coherent.

[Independent review](../../../features/001_3fd5011-modern-piece-controls/FINAL-CODE-REVIEW.md) found no critical, important or minor issue. Product source is unchanged after reviewed `4a76283`; T-033–T-035 incorporated accepted design/contracts/strategy/layout, refreshed main QC and transferred all stable IDs into sole canonical [TASKS](../../../TASKS.md). Archived sources/checklists are historical and cannot control execution.

## Verification and readiness

Coordinator fresh preintegration checks pass: 175 unit/controller tests in 15 files, strict typecheck, production build and all 23 Chromium cases. [Milestone 2.3](2.3.md) maps all FA-01–FA-08 and affected A-01–A-08; T-032 records fresh locked installation/browser provisioning. Required compact/DPR and paused screenshots inspected. Complete branch difference contains only this accepted campaign and no pending unrelated work.

Delivery issues #21–#35 and milestones 2.1–2.3 are closed/read back. The final review issue/milestone and exact target publication will be reconciled after merged-state checks. Confirmed target is main at `3fd501155708a92ddf63415f02180bdde9167836`. Feature readiness is verified; integration/publication is pending.

## Limits and TODO

Chromium 153.0.8010.0 acceptance only; native desktop blur/visibility delivery and other browsers are not certified. Node 24.19.0/npm 11.9.0. Environment proxy/color warnings only, no failures/skips. TODO: None. No extra feature or hosted site deployment selected.
