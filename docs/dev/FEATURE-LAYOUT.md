# Modern piece controls physical layout delta

This active delta maps accepted [feature decomposition](FEATURE_DECOMPOSITION.md) to [FEATURE-PLAN](FEATURE-PLAN.md). Unaffected ownership remains in [layout](layout.md). Existing paths are observed at the accepted baseline; proposed additions are marked planned. Placement does not establish implementation or task completion.

| Owner | Source placement | Tests and evidence placement |
| --- | --- | --- |
| Engine command/snapshot values | Existing `src/engine/types.ts` | Existing typed consumers and strict typecheck; feature values exercised through session/browser tests |
| Bag source | Existing `src/engine/piece-source.ts` | Extend `tests/engine/piece-source.test.ts`; existing deterministic source fixtures |
| Ordered rotation candidates | Planned `src/engine/rotation.ts`; geometry remains in existing `pieces.ts`, validation in `board.ts` | Planned `tests/engine/rotation.test.ts`; integrated session/contact scenarios |
| Shared landing placement | Planned `src/engine/landing.ts`; consumes existing board validation and ActivePiece value | Planned `tests/engine/landing.test.ts`; session ghost/drop equality and timing checks |
| Hold/drop/rotation aggregate transitions | Existing `src/engine/session.ts` | Existing `session.test.ts`, `timing.test.ts`, `errors.test.ts`; focused feature scenarios may be separated by coherent subject during task derivation |
| Browser input/time/composition | Existing `src/browser/keyboard.ts`, `controller.ts`, `app.ts`; entry `src/main.ts` remains free of test hooks | Existing keyboard/controller tests and isolated clock/source fixtures; production controls/lifecycle suites |
| Ghost and held-piece display | Existing `src/view/canvas.ts`, `status.ts`, `index.html`, `src/styles.css` | Existing display suite extended with ghost/held observations and viewport/DPR inspection |
| Integrated feature acceptance | Existing production entry and isolated test-only compositions | Planned `tests/e2e/modern-features.spec.ts`; retain affected existing e2e suites and fixtures under `tests/fixtures/` |
| Player/agent/API guidance | Existing README, AGENTS and owning source TSDoc | Local links, actual commands and public-contract review |
| Feature sources and preparation QC | Active roots FEATURE_ARCHITECTURE, FEATURE_DECOMPOSITION, FEATURE-SPEC, FEATURE-PLAN, FEATURE-LAYOUT and adjacent SPEC/PLAN/TASKS reports under `docs/dev/` | Reassess changed main root QC upon incorporation; retain eligible historical feature files under campaign package |
| Executable feature owner | Planned `docs/dev/FEATURE-TASKS.md` | Complete task ownership reconciled with main TASKS during accepted incorporation; no duplicate checklist |
| Milestone/phase evidence | Planned `docs/dev/reports/phases/2/` | `2.1.md`, `2.2.md`, `2.3.md`, `PHASE-REPORT.md` |
| Feature summary/archive navigation | Existing `docs/dev/features/001_3fd5011-modern-piece-controls/` | Planned `IMPLEMENTATION-REPORT.md`; README identifies active versus archived sources |

Engine helpers import engine types/geometry/validation only. The session owns all hold eligibility and timing; landing/rotation helpers own no mutable session state. Browser adapters dispatch commands rather than manipulating snapshots. Canvas/status reuse common immutable shapes/colors where useful and do not acquire simulation responsibilities.

Keep the existing pinned tooling, lockfile, test-browser scripts, ignored outputs and credential exclusions. No product dependency, browser binary, generated build or test fixture enters production source. A coherent task may adjust closely related existing helpers when code review establishes the boundary, but must update this placement/QC evidence if ownership materially changes. Final incorporation updates main layout to describe observed and intended complete organization accurately, rather than copying stale baseline preparation statements.
