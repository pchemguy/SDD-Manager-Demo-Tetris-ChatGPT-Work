# Repository layout

This maps [DECOMPOSITION](DECOMPOSITION.md) to physical ownership for [PLAN](PLAN.md). Development Markdown, root guidance/disclosure, LICENSE, and .gitignore exist. Source, test and tooling paths below describe the repository organization; generated paths are reproducible outputs. Placement itself is not completion evidence. TASKS owns the concrete bounded edit scopes.

## Source and checks

| Logical owner | Source | Checks / fixtures |
| --- | --- | --- |
| Shared engine value contracts | `src/engine/types.ts` | Checked through consumers and strict type checking; no duplicate implementation-mirroring suite |
| Piece definitions | `src/engine/pieces.ts` | `tests/engine/pieces.test.ts` |
| Board/placement/compaction | `src/engine/board.ts` | `tests/engine/board.test.ts` |
| Piece source and factory | `src/engine/piece-source.ts` | `tests/engine/piece-source.test.ts`; deterministic sources in `tests/fixtures/piece-sources.ts` |
| Progression calculations | `src/engine/progression.ts` | `tests/engine/progression.test.ts` |
| Shared landing | `src/engine/landing.ts` | `tests/engine/landing.test.ts`; integrated drop/ghost |
| Ordered rotation placement | `src/engine/rotation.ts` | `tests/engine/rotation.test.ts`, `kick-session.test.ts` |
| Aggregate game session | `src/engine/session.ts` | Focused state/rule scenarios in `tests/engine/session.test.ts`, timing in `tests/engine/timing.test.ts`, errors in `tests/engine/errors.test.ts`; `drop.test.ts`, `hold.test.ts`, `kick-session.test.ts` |
| Keyboard mapping/held-state/repeat | `src/browser/keyboard.ts` | `tests/browser/keyboard.test.ts`; browser input flows in `tests/e2e/controls.spec.ts` |
| Clock/frame/input coordination | `src/browser/controller.ts` | `tests/browser/controller.test.ts`, `modern-timing.test.ts`; shared fake scheduling in `tests/fixtures/clock.ts`; `tests/e2e/lifecycle.spec.ts` |
| Application composition and cleanup | `src/browser/app.ts`, entry `src/main.ts` | Browser session/start/restart/cleanup flows and controller composition checks |
| Board/ghost/next/held Canvas rendering | `src/view/canvas.ts` | Rendering operation checks where meaningful; `tests/e2e/display.spec.ts` plus visual review |
| DOM status/buttons | `src/view/status.ts` | Browser status/focus/button integration flows |
| Page shell and styling | `index.html`, `src/styles.css` | Chromium viewport/device-pixel-ratio and accessible-control checks |
| Integrated gameplay acceptance | Existing production composition plus test-only injected composition | `tests/e2e/gameplay.spec.ts`, `modern-features.spec.ts`; fixtures/harness in `tests/fixtures/` |

Engine imports engine files only. Browser and view consumers may import engine value contracts; engine never imports them. The controller coordinates collaborators through narrow typed interfaces and never mutates returned snapshots. Rendering dependencies do not become engine collaborators. The source entry imports application composition and styling; it exports no test state mutation hook.

The session remains the sole mutable aggregate owner. Do not split timers into independently mutable services or introduce a generic plugin architecture. A coherent helper may be extracted if implementation reveals a genuine responsibility boundary; update layout and reassess affected readiness instead of adding speculative modules in advance.

## Tooling and distribution

| Path | Owner and purpose |
| --- | --- |
| `package.json`, `package-lock.json` | npm package scripts, pinned tooling and dependency resolution; project tooling owner |
| `tsconfig.json` | Strict type checking for project source/tests or explicit referenced configurations if tooling requires separation |
| `vite.config.ts` | Static development/build configuration; shares compatible transformation settings with Vitest where useful |
| `vitest.config.ts` | Deterministic engine/controller checks and exact test inclusion; does not collect Playwright suites |
| `scripts/prepare-browser.mjs`, `scripts/run-browser-tests.mjs` | Actual Linux cloud test-browser provisioning/run boundary; uses pinned npm assets, ownership-safe extraction and ignored task cache. Added after official browser-download failure; has no production import. |
| `playwright.config.ts` | Chromium browser suites, HTTP server lifecycle, viewport variants and artifact settings |
| `dist/` | Generated production static output; ignored, reproducible from source and lockfile |
| `node_modules/`, `coverage/`, `test-results/`, `playwright-report/` | Generated dependencies/check artifacts; ignored |

No committed browser executable, generated production bundle, credential, or dependency directory belongs in the repository. Browser provisioning/cache uses supported tooling locations outside product source. Test fixtures must be imported by tests or an isolated test-only entry, excluded from the production import graph. If a fixture page is needed, allocate it under `tests/fixtures/`, not the production page shell.

## Documentation and retained evidence

| Path | Owner |
| --- | --- |
| `README.md` | User setup, play, build, preview, checks, status and disclosure links |
| `AGENTS.md` | Concise agent navigation, actual validated commands and active workflow ownership |
| `AI_DISCLOSURE.md`, `SDD-MANAGER.md` | Root adoption/disclosure records |
| `docs/dev/PROJECT.md`, `ARCHITECTURE.md`, `DECOMPOSITION.md` | Brief and logical design |
| `docs/dev/SPEC.md`, `docs/dev/spec/` | Behavioral contracts and acceptance |
| `docs/dev/PLAN.md`, `docs/dev/layout.md` | Delivery strategy and physical ownership |
| `docs/dev/TASKS.md` | Complete executable hierarchy and evidence-backed progress; canonical after verified feature transfer; active scoped feature list owns execution until transfer |
| Adjacent `SPEC-REVIEW-REPORT.md`, `PLAN-REVIEW-REPORT.md`, `TASKS-REVIEW-REPORT.md` | Required preparation assessments; cover current roots/children and retain historical review revisions |
| `docs/dev/reports/phases/1/` | Milestone, phase, and any scoped steering evidence |
| `docs/dev/reports/IMPLEMENTATION-REPORT.md` | Whole-baseline final evidence and deferred TODO aggregation |
| `docs/dev/reports/phases/2/` | Modern delivery/phase review evidence |
| `docs/dev/features/001_3fd5011-modern-piece-controls/` | Recorded campaign context, eligible historical feature sources/QC and final IMPLEMENTATION-REPORT.md |
| `docs/dev/FEATURE-TASKS.md` | Active scoped execution until verified transfer; canonical navigation afterward |

Public TypeScript APIs and substantive modules receive professional TSDoc-style documentation where it clarifies contracts, lifecycle, timing, and failure semantics. Product guidance stays in README; development documents do not substitute for player instructions. Layout declares no executable status and does not duplicate a task checklist.
