# Baseline executable tasks

This is the complete baseline Phase → Milestone → Task hierarchy derived from accepted [PLAN](PLAN.md), [layout](layout.md), [SPEC](SPEC.md), and design. [TASKS review](TASKS-REVIEW-REPORT.md) owns preparation conformance evidence. Preparation began with all tasks unchecked. Checked outcomes below carry observed implementation/verification evidence; reports own their review boundaries. Modern features belong to a subsequent feature campaign.

## Execution and verification conventions

The user selected inline execution. sdd-implement selects the requested task range, executes one task at a time, marks verified completion, commits/pushes each result, verifies publication, and coordinates GitHub issue closure. Every task includes relevant tests and professional API/module documentation; neither is a separate padding task. Read the owning SPEC sections rather than infer behavior from this list.

For each new/changed behavior, observe a meaningful failing contract test before implementing it, then make it pass and run applicable regression/type checks. Test fixtures derive expected results from SPEC. Preserve valid interrupted work and actual evidence; do not reconstruct fictitious RED runs. A review task requires both code review and testing, blocker repair and a committed/pushed report with TODOs (or None). Reports are created during their owning tasks, not during task generation.

T-001 declares these package commands, all **planned and unexecuted** at preparation:

| Command | Intended behavior |
| --- | --- |
| `npm ci` | Reproduce the committed lockfile setup |
| `npm run dev -- --host 0.0.0.0` | Development HTTP server |
| `npm run typecheck` | TypeScript no-emit strict checks for project source and tests |
| `npm run test -- <test-path>` | Noninteractive Vitest run of selected engine/controller tests |
| `npm run test` | Complete engine/controller suite, excluding Playwright collection |
| `npm run build` | Typecheck, then Vite production build |
| `npm run preview -- --host 0.0.0.0` | HTTP preview of the built static distribution |
| `npm run test:e2e -- <test-path>` | Selected Playwright Chromium suite with managed test HTTP server |
| `npm run test:e2e` | Complete browser suite against the production build, with isolated test fixtures served separately where required |

Engine public design seams are `GameSession` with start/restart/pause/resume/command/advance/snapshot operations, injected `PieceSourceFactory`, `PieceType`, `GameCommand`, and `GameSnapshot`; T-001/T-003 establish their TypeScript contracts consistently with T-01. Helper signatures may be chosen by the owning task without changing behavior or physical ownership. Test-only sources/clock/harness remain outside the production entry/import graph.

## Phase 1 — Baseline Tetris

- [x] Phase 1 — Baseline Tetris
    - [x] Milestone 1.1 — Playable browser slice
        - [x] T-001 — Define typed pieces and executable test toolchain
            Scope: package manifest/lockfile, TypeScript/Vite/Vitest/Playwright configuration, engine types/pieces, `tests/engine/pieces.test.ts`; compatible stable tooling versions and ignored generated output. No UI framework or product scaffold from another application.
            Depends on: accepted preparation, eligible phase projection, and established phase branch.
            Contracts: B-01/B-02, engine isolation, U-05 tooling; layout tooling and piece owners.
            RED/GREEN evidence: tests of all seven orientation-0 grids, four occupied cells, independently specified clockwise/counterclockwise examples and four-turn identity fail before implementation, then pass. Run `npm run test -- tests/engine/pieces.test.ts` and `npm run typecheck`; verify package/browser provisioning capability before relying on it.
            Completion: usable typed piece definitions and pinned executable commands; record actual tool versions and any browser provisioning blocker without claiming runtime acceptance.
            Result: Observed 16 geometry assertion failures against API skeleton, then 16/16 full Vitest tests passed and typecheck passed. Dependencies installed and pinned. Browser download network approval was cancelled; Chromium acceptance remains pending for browser integration. Existing npm http-proxy warning is environmental. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/1.

        - [x] T-002 — Implement board placement and row compaction
            Scope: `src/engine/board.ts`, `tests/engine/board.test.ts`, independently constructed board fixtures under `tests/fixtures/` as needed.
            Depends on: T-001.
            Contracts: B-01, B-02 placement validation, B-04 merge/clear; A-02.
            Evidence: invalid occupied cells at walls/floor/top, overlaps, empty bounding margins, one-to-four simultaneous clears, stable compaction and empty rows; observed RED then GREEN. Run `npm run test -- tests/engine/board.test.ts` plus piece regression/typecheck.
            Completion: board helpers preserve input/aggregate ownership and return coherent placement/merge/clear results without clock or browser access.
            Result: Observed seven board failures against skeleton. Corrected a test fixture that accidentally seeded a collision in the legal-margin case. Full Vitest suite passed 23/23 and typecheck passed; covers occupied bounds, overlap, independent rows, pure merge, one-to-four clears and stable row order. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/2.

        - [x] T-003 — Establish piece sources and session lifecycle snapshots
            Scope: `src/engine/piece-source.ts`, lifecycle/state portions of `src/engine/session.ts`, related engine types, `tests/engine/piece-source.test.ts`, `tests/engine/session.test.ts`, controlled-source fixture.
            Depends on: T-001, T-002.
            Contracts: B-03, T-01/T-02 idle/start/restart, snapshot isolation; A-05/A-06 initialization.
            Evidence: idle makes no draw; start draws active then preview; repeated identifiers are valid; start outside idle is a no-op; restart resets state using fresh factory; snapshot mutation cannot affect session. Run focused source/session tests, current engine regression and typecheck with observed RED/GREEN.
            Completion: deterministic injectable session initialization, public value contracts, and detached snapshots support later rule/timing integration.
            Result: Source and lifecycle assertions failed against skeleton; separately observed snapshot mutation leaking into engine, then fixed ownership. Full Vitest suite passed 27/27 and typecheck passed. Controlled selection allows repeats, idle draws nothing, start draws two, restart creates fresh source, snapshots are detached. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/3.

        - [x] T-004 — Implement movement and event-driven locking cycles
            Scope: gameplay/timing portions of `src/engine/session.ts`, `tests/engine/session.test.ts`, `tests/engine/timing.test.ts`; real board/source collaborators.
            Depends on: T-002, T-003.
            Contracts: B-02/B-04, T-03/T-04/T-05 core at level 1; A-01–A-04. Progression and soft drop are explicit later increments.
            Evidence: left/right/rotation rejection without kicks, gravity, contact between ordinary ticks, no lock before G and lock at G, grounded adjustments preserving timer, support loss/recontact, grounded spawn, lock-first tie, remainder crossing spawn, integer subdivision equality, clear/preview promotion/blocked spawn. Independently prepared fixtures exercise support-changing movement and rotation. Run session/timing and full current engine tests/typecheck; observe meaningful RED/GREEN.
            Completion: repeated coherent lock/clear/spawn cycles at the initial gravity interval without browser APIs or duplicate state ownership.
            Result: Observed eight missing-operation RED failures then 36/36 full engine tests passed and typecheck passed. Public-input fixtures cover movement and rotation support loss, between-tick contact, unchanged grounded deadlines, lock-first ties, remainder/subdivision equality, two-row clear, preview draws, grounded spawn and blocked-spawn termination. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/4.

        - [x] T-005 — Integrate the first playable browser path
            Scope: `index.html`, `src/main.ts`, basic browser app/controller/keyboard, Canvas/status views and styling; initial `tests/e2e/gameplay.spec.ts`, controller checks and isolated fixtures as needed.
            Depends on: T-004.
            Contracts: 1.1's PLAN scope; U-01 movement/rotation/start/restart, U-03 board/state, U-05 initial tooling integration; A-01/A-02 partial browser path.
            Evidence: a real Chromium run starts/restarts, accepts basic keyboard movement/rotation, renders active/settled cells, and continues across locking/spawning; integrated deterministic evidence demonstrates a row clear and blocked spawn. Observe failing entry/integration checks before production wiring. Run current unit tests/typecheck/build and `npm run test:e2e -- tests/e2e/gameplay.spec.ts`. Record actual Chromium version and visually inspect the playable board.
            Completion: working intermediate browser game, with 1.1 deferrals accurately stated in README; no claim of complete baseline acceptance.
            Result: Observed missing entry build and missing controller RED; 37 unit/controller tests, typecheck/build and three Playwright cases passed. Chromium 153.0.8010.0 packaged assets used with ownership-safe extraction and multiprocess contexts; official CDN supplied HTML and cloud browser could not reach local sandbox. Pixel evidence and screenshot inspect active/settled cells; isolated public-API fixture verifies clear and blocked spawn. Remaining progression/pause policies documented. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/5.

        - [x] T-006 — Review, test and report milestone 1.1
            Depends on: T-001–T-005 complete and published.
            Scope: whole playable slice and its dependency/test boundaries, relevant README/guidance, PLAN 1.1 exits; no new milestone scope.
            Evidence: code review plus current engine/controller/browser smoke, typecheck/build, contact/clear/spawn regression and useful-play demonstration; repair bugs/critical issues/contract violations before completion. Record explicit remaining 1.2/1.3 deferrals and player-feedback decision evidence without changing scope.
            Report: `docs/dev/reports/phases/1/1.1.md`, with checks/results/limitations and TODO None or eligible findings. Publish/close all constituent issues including this review, then close/read back milestone 1.1.
            Result: Code review found no blocker within slice; 37 unit tests, strict typecheck/build and three Chromium cases passed. Visual text/Canvas inspection passed after correcting task browser fonts. Report records environment limits, evidence and explicit 1.2/1.3 deferrals; TODO None. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/6.

    - [x] Milestone 1.2 — Complete gameplay progression
        - [x] T-007 — Define score, level and gravity progression rules
            Scope: `src/engine/progression.ts`, `tests/engine/progression.test.ts`, relevant public types/documentation.
            Depends on: T-006.
            Contracts: B-05/B-06.
            Evidence: independent expectations for all 0–4 clear awards at multiple pre-clear levels, 9/10/19/20 line boundaries, gravity at levels 1/2/9/10/higher and 100 ms floor. Run `npm run test -- tests/engine/progression.test.ts` and typecheck, observing RED/GREEN.
            Completion: pure progression functions introduce no mutable session or browser state.
            Result: Missing progression module observed RED; 51/51 unit tests and typecheck passed. Independently tabulated all clear awards at levels 1/3/10, line thresholds 9/10/19/20 and gravity floor through high levels. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/7.

        - [x] T-008 — Integrate soft drop and lock-time progression
            Scope: session command/lock transition, session/timing tests; progression and source integration.
            Depends on: T-007.
            Contracts: B-03–B-06, T-03/T-04 progression; A-03/A-06.
            Evidence: successful soft drop adds exactly 1 point/reset fall age; blocked descent changes neither score nor lock deadline; lock award uses pre-clear level, updates speed for new piece, promotes/draws preview once; grounded delay remains independent of soft-drop cadence. Run full engine tests and typecheck with observed RED/GREEN.
            Completion: complete baseline gameplay score/speed/soft-drop rules integrated without expansion bonuses.
            Result: Observed two new score/soft-drop failures before wiring progression; 53/53 engine/controller tests and typecheck passed. Controlled public inputs verify blocked soft-drop deadline, successful row award/reset, pre-clear level at ten-line boundary, 900 ms new-piece speed and exactly one preview draw per lock. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/8.

        - [x] T-009 — Display progression and next preview during play
            Scope: view Canvas/status, basic ArrowDown adapter and app integration, `tests/e2e/display.spec.ts` and gameplay checks.
            Depends on: T-008.
            Contracts: U-01 soft-drop action, U-03 counters/preview; A-06/A-07 partial display.
            Evidence: visible score/lines/level match snapshots, preview identifier/shape matches next spawn, successful soft drop updates score, idle has no preview, game-over retains resulting counters. Run current unit tests/typecheck/build and focused Chromium gameplay/display scenarios; observe integration RED/GREEN and visually inspect preview.
            Completion: progression is usable in the existing browser game; complete repeat/focus policies remain for 1.3.
            Result: New browser display scenario failed on absent score element before wiring; 53 unit tests, strict build and four Chromium gameplay/display cases passed. Visible soft-drop score and idle/running next identifier/Canvas verified; progression screenshot inspected. Pause/repeat remain explicitly deferred. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/9.

        - [x] T-010 — Review, test and report milestone 1.2
            Depends on: T-007–T-009 complete and published.
            Scope: full progression/source/soft-drop integration and regressions of 1.1.
            Evidence: code review, all engine tests/typecheck/build, current browser gameplay/display tests, all award/threshold/floor and blocked-soft-drop boundaries; resolve required failures before completion.
            Report: `docs/dev/reports/phases/1/1.2.md`; publish review evidence, close/read back constituent issues, then milestone 1.2.
            Result: Reviewed progression/source/soft-drop and prior slice boundaries; 53 unit tests, strict typecheck/build and four Chromium cases passed. Report records award/speed/preview evidence and visual inspection with no blocker or TODO within scope. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/10.

    - [x] Milestone 1.3 — Robust browser session
        - [x] T-011 — Complete engine lifecycle and failure contracts
            Scope: session lifecycle/validation/atomic transitions, engine types as needed, `tests/engine/errors.test.ts`, state/timing regressions.
            Depends on: T-010.
            Contracts: complete T-01–T-06, B-05 overflow boundary; A-04/A-05.
            Evidence: pause/resume preserves timers; invalid transitions no-op; gameplay outside running is ignored after validation; invalid type/range/command, source errors/invalid identifiers, and safe-integer overflow publish no partial failing transition. Cover maximum advance and fractional precision from T-03, snapshot isolation, restart after terminal/error state. Run full engine tests/typecheck with RED/GREEN for newly added behavior.
            Completion: public engine API has documented deterministic success/no-op/rejection/error semantics.
            Result: New error suite observed RED before lifecycle/guard implementation; 68/68 unit tests and typecheck passed. Covers pause preservation, idle validation, collaborator failure/invalid draws, no partial board/progression/piece publication, restart recovery, maximum advance and fractional tolerance. Strengthened whole-snapshot failure assertion observed timer RED, then event-step rollback fixed it; 68/68 remained green. Safe-integer guard tested at exact boundary; integration ordering reviewed to reject before score/board publication (reachable overflow would require impractically many public inputs). Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/11.

        - [x] T-012 — Implement controlled key repeat and focus-aware mapping
            Scope: `src/browser/keyboard.ts`, `tests/browser/keyboard.test.ts`, relevant command value contracts; no duplicate timing owner.
            Depends on: T-011.
            Contracts: U-01, T-05 adapter order.
            Evidence: 150 ms initial/50 ms repeat horizontal cadence, most-recent opposing-key precedence/release, 50 ms soft drop, one-shot rotation/pause/Enter, ignored native repeat, held-state reset, editable/interactive focus handling and native button activation. Use injected event/deadline inputs; run focused keyboard tests/current regressions/typecheck with observed RED/GREEN.
            Completion: a typed adapter supplies commands/deadlines without mutating board or independently advancing game time.
            Result: Four new keyboard cases failed before adapter implementation; 72/72 full unit tests and typecheck passed. Independent cadence/order expectations cover 150/50 horizontal, 50 soft-drop, last-pressed direction and release fallback, native repeat rejection, one-shot actions, reset and interactive-focus suppression. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/12.

        - [x] T-013 — Coordinate browser time, pause, recovery and resource lifecycle
            Scope: browser controller/app composition, `tests/browser/controller.test.ts`, clock fixture, `tests/e2e/lifecycle.spec.ts`, `tests/e2e/controls.spec.ts`.
            Depends on: T-011, T-012.
            Contracts: U-01/U-02, T-02/T-05/T-06 collaboration; A-04/A-05.
            Evidence: partition elapsed time at repeats, lock before exact-deadline input, horizontal before soft repeat, no double-counted clock time, pause preservation, blur/hidden/gap >250 ms pause before catch-up, exactly 250 ms progression, fresh resume/restart input, single loop/listeners and cleanup. Verify visible runtime/Canvas initialization failure recovery with isolated doubles; production remains free of test state hooks. Run controller/current engine tests/typecheck/build plus focused Chromium controls/lifecycle cases, observing RED/GREEN.
            Completion: complete clock/input/error collaboration respects engine ownership and remains correct across lifecycle changes.
            Result: Seven new controller failures preceded implementation; 80/80 unit tests, typecheck/build and nine Chromium cases passed. Real production controls, pause and gap paths plus isolated source/Canvas failure and dispose verified. Browser clock fixtures now pause wall-time progression; exact repeat test flushes via physical keyup and recovery waits for the next due frame, correcting fixture assumptions without changing contracts. Native desktop blur/hidden delivery not certified; handler/controller semantics covered. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/13.

        - [x] T-014 — Finish readable display and accessible controls
            Scope: Canvas/status views, page shell/styles, display/controls browser checks and meaningful rendering-operation checks.
            Depends on: T-013.
            Contracts: U-03/U-04; A-07.
            Evidence: all labeled counters/preview/status, semantic labeled buttons with correct disabled state and focus, Canvas accessible/fallback text, polite lifecycle/error announcements, visible instructions and type/color consistency. Chromium checks/visual inspection at 800 × 600 and 1280 × 720, DPR 1/2; no overlap/horizontal scroll and preserved board ratio. Run relevant regressions/typecheck/build/browser display tests with RED/GREEN for behavioral display changes.
            Completion: readable complete player interface; no unsupported full nonvisual-accessibility claim.
            Result: Four viewport/DPR checks failed before layout/buffer corrections; 80 unit tests, strict build and five display cases passed. Inspected 800x600 and 1280x720 screenshots, including DPR2: square sharp board, visible counters/preview/controls, focus and readable glyphs. Semantic controls/disabled states, accessible Canvas text and polite status verified; no certification claim. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/14.

        - [x] T-015 — Review, test and report milestone 1.3
            Depends on: T-011–T-014 complete and published.
            Scope: whole baseline engine/browser contract collaboration, input/lifecycle/failure/display paths and prior milestone regressions.
            Evidence: code review, complete engine/controller tests/typecheck/build/current Chromium suites, representative timing/focus/error/viewport inspection; gather useful controls/pause feedback and repair required failures.
            Report: `docs/dev/reports/phases/1/1.3.md`; publish, close constituent issues/read back, then milestone 1.3. Preserve actionable human steering opportunities without automatic requirement changes.
            Result: Whole engine/browser collaboration reviewed; 80 unit tests, strict build and 13 Chromium cases passed. Viewport/DPR screenshots inspected and source/render/input failure paths verified. Report records real fixture repairs, native desktop limitations and counter-overflow evidence limits; TODO None within scope. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/15.

    - [x] Milestone 1.4 — Verified static distribution
        - [x] T-016 — Establish complete production browser acceptance
            Scope: gameplay/controls/lifecycle/display Playwright suites, deterministic fixtures and isolated test-only harness, Playwright server/artifact configuration.
            Depends on: T-015.
            Contracts: A-01–A-08, U-05 production evidence; accepted engine/browser contracts supply independent expectations.
            Evidence: HTTP-served production entry start/play/pause/restart/game-over, real controls/status/rendering, required viewport/DPR variants, zero runtime errors, local-only application assets and no gameplay backend calls. Use controlled isolated composition for otherwise inaccessible board/deadline boundaries; it complements rather than substitutes for production-entry smoke. Run `npm run build` and `npm run test:e2e` plus current unit/type checks. Tests added for existing behavior are characterization/acceptance expansion; report their observed initial outcomes rather than invent a RED history.
            Completion: inspectable Chromium acceptance with actual browser version; no production test hooks or fixture inclusion.
            Result: Acceptance expansion initially passed 17/17 real Chromium scenarios; focused editable/link extension passed 3/3 controls cases. Full 80 unit tests and strict build passed. Production controls clear two rows with score 390, reach blocked-spawn score 90 and restart via Enter; next identifier/color promotion and local-only requests with zero runtime errors verified. No fictitious RED history or production mutation hook. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/16.

        - [x] T-017 — Verify reproducible setup and static distribution boundaries
            Scope: package/lock/build configuration where checks expose corrections; isolated temporary verification copy and production asset inspection.
            Depends on: T-016.
            Contracts: U-05/A-08 and PLAN 1.4.
            Evidence: clean `npm ci`, full tests/typecheck/build and production browser runs from committed inputs; generated/credential/cache files remain ignored; no runtime Node backend/remote asset dependency, excluded feature, test fixture import or secret in tracked files/built output. Diagnose and repair in-scope setup/build failures; do not change accepted behavior to fit tools.
            Completion: reproducible static output and accurately recorded setup limits. Do not commit generated bundles or publish a hosted site.
            Result: Fresh git archive of published 272db5218e1f9c19e8ab123aa2066f6fa327e340 passed npm ci, fresh owned browser cache provisioning (Chromium 153.0.8010.0), 80 unit tests, strict build and 17 Chromium cases. Clean static files byte-identical; tracked/build secret, fixture, runtime remote-asset and engine browser-dependency checks passed. Tooling-only scripts/ownership added to layout; no hosted site or generated binary committed. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/17.

        - [x] T-018 — Complete user and agent documentation
            Scope: README, AGENTS, substantive engine/browser/view API/module documentation and relevant link corrections.
            Depends on: T-017.
            Contracts: U-05 launch/check guidance; layout documentation ownership and demo-context disclosure.
            Evidence: execute documented setup/dev/build/HTTP preview/check commands where applicable, verify controls match SPEC, validate links/public API contracts, preserve context/disclosure statements, and keep current owner/status guidance accurate. Run appropriate typechecks/regressions if source documentation changes; do not create tests for prose edits.
            Completion: usable player/developer guidance with actual evidence and no speculative command/status claims.
            Result: README/AGENTS document actual setup/play/check commands and preserve activated-plugin/prior-Tetris-context disclosure. Executed dev/preview HTTP commands; links checked. Public API comments clarified and source/tests formatted without behavior changes; 80 unit tests, strict build and 17 cloud Chromium cases passed. Clean setup evidence retained from T-017; final integration remains explicitly pending. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/18.

        - [x] T-019 — Review, test and report milestone 1.4
            Depends on: T-016–T-018 complete and published.
            Scope: complete distribution, documentation, acceptance traceability, production/test separation and prior regressions.
            Evidence: code review plus complete unit/controller/browser checks/typecheck/build, locked setup evidence and visual usability; map A-01–A-08 to actual results and repair required gaps.
            Report: `docs/dev/reports/phases/1/1.4.md`; publish and reconcile all constituent issue closures, then close/read back milestone 1.4.
            Result: Distribution/code/documentation review and A-01–A-08 traceability report complete; 80 unit tests, strict build and 17 Chromium cases passed. Clean setup from T-017 and viewport/visual evidence retained, test/production/credential boundaries inspected, TODO None within milestone. Independent phase review and integration remain T-020. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/19.

    - [x] Milestone 1.5 — Phase review
        - [x] T-020 — Review, test and report phase 1 and the complete baseline
            Depends on: milestones 1.1–1.4 complete, reviewed and closed/read back; T-006, T-010, T-015, T-019 published.
            Scope: whole baseline, cross-milestone integration, all A-01–A-08 evidence, accepted scope/design/PLAN, final TODO aggregation and integration readiness.
            Evidence: sdd-verify code review and complete relevant tests/typecheck/build/production Chromium acceptance; repair bugs/critical findings/SPEC or PLAN violations. Trace remaining eligible TODOs with provenance/options or state None. Publish reports, close review issue then milestone 1.5, reconcile parent completion, explicitly merge verified phase into confirmed default branch, verify merged state, publish and read back containment.
            Reports: `docs/dev/reports/phases/1/PHASE-REPORT.md` and `docs/dev/reports/IMPLEMENTATION-REPORT.md`.
            Completion: full baseline integration/publication and hosted reconciliation; stop before modern feature preparation unless separately requested.
            Result: Independent read-only whole-branch review found initial paint recovery and O orientation metadata gaps; both observed RED then fixed GREEN in one pass. Fresh full checks passed 82 unit tests, strict build and 18 Chromium cases. Phase/final reports record acceptance, all reviewer boundary rulings and TODO None. Reports published at 140ca00; all 20 task issues/five milestones closed and parent associations read back. Explicit main merge a01e4384b23398a30d8f5e5e520548bf35197d98 passed 82 unit tests, strict build and 18 Chromium cases, then was pushed/read back. Integration and phase parent completion are reconciled; no active modern feature. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/20.

## Preparation and selection boundary

Twenty tasks comprise 15 delivery outcomes and five review outcomes. Milestone 1.1 ends at T-006; 1.2 at T-010; 1.3 at T-015; 1.4 at T-019; the phase ends at T-020. The user selected the full phase T-001–T-020 for inline execution. Progress is recorded above; inline method selection does not silently select an arbitrary next-N boundary.
