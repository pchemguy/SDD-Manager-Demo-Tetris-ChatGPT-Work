# Tetris executable tasks

This is the complete Phase → Milestone → Task hierarchy derived from accepted [PLAN](PLAN.md), [layout](layout.md), [SPEC](SPEC.md), and design. [TASKS review](TASKS-REVIEW-REPORT.md) owns preparation conformance evidence. Preparation began with all tasks unchecked. Checked outcomes below carry observed implementation/verification evidence; reports own their review boundaries. Phase 1 evidence retains its baseline scope; phase 2 owns the accepted modern expansion. TASKS is the sole executable owner of T-001–T-036.

## Execution and verification conventions

The user selected inline execution. sdd-implement selects the requested task range, executes one task at a time, marks verified completion, commits/pushes each result, verifies publication, and coordinates GitHub issue closure. Every task includes relevant tests and professional API/module documentation; neither is a separate padding task. Read the owning SPEC sections rather than infer behavior from this list.

For each new/changed behavior, observe a meaningful failing contract test before implementing it, then make it pass and run applicable regression/type checks. Test fixtures derive expected results from SPEC. Preserve valid interrupted work and actual evidence; do not reconstruct fictitious RED runs. A review task requires both code review and testing, blocker repair and a committed/pushed report with TODOs (or None). Reports are created during their owning tasks, not during task generation.

The repository provides these validated package commands:

| Command | Intended behavior |
| --- | --- |
| `npm ci` | Reproduce the committed lockfile setup |
| `npm run dev -- --host 127.0.0.1` | Development HTTP server |
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
            Result: Independent read-only whole-branch review found initial paint recovery and O orientation metadata gaps; both observed RED then fixed GREEN in one pass. Fresh full checks passed 82 unit tests, strict build and 18 Chromium cases. Phase/final reports record acceptance, all reviewer boundary rulings and TODO None. Reports published at 140ca00; all 20 task issues/five milestones closed and parent associations read back. Explicit main merge a01e4384b23398a30d8f5e5e520548bf35197d98 passed 82 unit tests, strict build and 18 Chromium cases, then was pushed/read back. Integration and phase parent completion were reconciled at the baseline boundary. Hosted issue: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues/20.

## Phase 2 — Modern piece controls

- [ ] Phase 2 — Modern piece controls
    - [x] Milestone 2.1 — Bag, ghost and delayed drop
        - [x] T-021 — Implement lazy validated seven-bag piece sources
            Depends on: Baseline complete; accepted preparation and eligible activation.
            Scope: src/engine/piece-source.ts; tests/engine/piece-source.test.ts and deterministic fixtures; source API documentation.
            Contracts: F-01 / FA-01.
            Evidence: Known shuffle permutation, six random calls per lazy bag, aligned seven-type groups, boundary repeat, invalid random/source exceptions without partial bag, fresh instance; injected repeated sources remain valid. Observe contract-test RED before source implementation.
            Checks: npm run test -- tests/engine/piece-source.test.ts; npm run typecheck; full npm run test.
            Completion: Validated sevenBagPieceSource; no composition or unrelated random-source change.
            Result: RED observed 11 missing-source failures; focused 12/12 and full 93/93 tests passed; typecheck passed. Lazy six-call bags, literal permutations/boundary repeat, fresh instance and invalid/throwing refill atomicity verified. npm reports an environment http-proxy deprecation warning; no test failures/skips. GitHub issue #21 association verified.

        - [x] T-022 — Establish shared pure landing placement
            Depends on: T-021.
            Scope: src/engine/landing.ts; tests/engine/landing.test.ts; existing board/types collaborators and API comments.
            Contracts: F-04 / FA-04.
            Evidence: Independently enumerated empty/stacked/cavity/zero-distance landings; first obstruction stops descent; preserves type/orientation/x and input board/value. Observe missing-helper RED.
            Checks: npm run test -- tests/engine/landing.test.ts; npm run typecheck; npm run test.
            Completion: Pure landing value usable by session/ghost; no renderer logic.
            Result: Missing module identified then six behavioral RED failures observed with identity stub. Focused 7/7, full 100/100 and typecheck passed. Literal empty/stacked/cavity/zero-distance placements and input immutability verified. Issue #22 verified.

        - [x] T-023 — Integrate ghost observations and delayed hard-drop transitions
            Depends on: T-022.
            Scope: src/engine/session.ts, types.ts; session/timing/errors tests and affected typed fixtures.
            Contracts: F-04–F-06 / FA-04–FA-06.
            Evidence: Detached source-free ghost; positive drop exact 2d award and fall reset with no merge/source/lock; zero drop entire snapshot equality; full contact interval at partial gravity phase, paused/terminal values and counter atomicity. Add coherent held/availability value shape while hold command remains deferred. Observe meaningful session/timing RED.
            Checks: npm run test; npm run typecheck; npm run build.
            Completion: Engine hard-drop/ghost contracts pass; hold behavior and kicks explicitly deferred.
            Result: Five RED contract failures observed; full 105/105 tests, typecheck/build passed. Positive 2d/fall reset, no draw/merge, exact G boundary, whole-snapshot zero-distance equality, detached source-free paused/terminal ghost verified. Adjacent pure progression hardDropScore enables exact overflow-boundary evidence without a mutation hook; session inspection verifies guard precedes all publication. held/availability shape is coherent; hold/kicks remain deferred. Issue #23 verified.

        - [x] T-024 — Deliver production bag selection ghost and Space controls
            Depends on: T-021, T-023.
            Scope: src/browser/app.ts, keyboard.ts and affected controller input types; src/view/canvas.ts, instructions; keyboard/controller tests and tests/e2e/modern-features.spec.ts.
            Contracts: F-01/F-04/F-07 / FA-01/FA-04/FA-07 partial.
            Evidence: Fresh bag production composition; discrete Space, native repeat/focus rejection; visible ghost before/after landing; actual production input preserves delayed lock. Source injection remains isolated; no test mutation hook. Observe browser integration RED before wiring; inspect screenshot.
            Checks: npm run test; npm run build; npm run test:e2e:cloud -- tests/e2e/modern-features.spec.ts; relevant gameplay/display regressions.
            Completion: Playable bag/ghost/drop path; hold/kicks deferred to 2.2.
            Result: Keyboard RED and production non-bag preview RED observed before wiring. Full 106/106 tests/build passed; modern/display/gameplay Chromium 153.0.8010.0 suite 12/12 passed. Actual pixel outline/drop, 400-ms partial gravity/full delay, native repeat/focus exclusion and repeat preservation verified. Four obsolete independent-source cases updated to literal identity-bag geometry: I/J/L bottom tiling gives one line/154 points; center stack gives 101 points and preview T. Ghost/active/settled readability inspected in screenshot; 800/1280 DPR 1/2 bounds pass. npm proxy/color environment warnings only. Issue #24 verified.

        - [x] T-025 — Review test and report milestone 2.1
            Depends on: T-021–T-024.
            Scope: Whole 2.1 code, tests, public docs and report docs/dev/reports/phases/2/2.1.md.
            Contracts: FEATURE-PLAN 2.1 exit.
            Evidence: Review ownership, source consumption, landing/scoring/contact and production input; repair required defects; demonstrate usable changed path; report concise capabilities, limitations, explicit deferrals and TODO None or eligible findings.
            Checks: Complete current unit/controller tests, strict build and relevant real Chromium checks; inspect ghost readability.
            Completion: Reviewed 2.1 code and published [milestone report](reports/phases/2/2.1.md); no blockers/TODO.
            Result: Fresh full 106/106 tests, strict build and all 19/19 Chromium cases pass. Source/landing/drop/contact/input/render ownership inspected separately; screenshots readable at required viewport/DPR. Hold/kicks deferred explicitly; no whole-feature or main integration claim. Issue #25 verified; hosted review/milestone closure follows publication.

    - [x] Milestone 2.2 — Kicks and hold
        - [x] T-026 — Implement ordered rotation candidate placement
            Depends on: T-025 and 2.1 closure.
            Scope: src/engine/rotation.ts; tests/engine/rotation.test.ts; pieces/board/type collaborators and API comments.
            Contracts: F-02 / FA-02.
            Evidence: Every orientation transition in both tables against independent expectations; five ordered offsets, first valid wins and later candidates succeed; walls/floor/stack/above-top failure; O fixed. Observe helper RED.
            Checks: npm run test -- tests/engine/rotation.test.ts; npm run typecheck; npm run test.
            Completion: Pure candidate/selection boundary with explicit y-down semantics; no hidden rows.
            Result: Milestone 2.1 closure read back. Observed 51 behavioral RED failures; 51/51 focused and 157/157 full tests passed. Typecheck initially caught fixture nullability annotation, corrected; final typecheck passes. Independently enumerated all 48 type/transition lists plus first/fifth candidate, wall/floor/stack/top/total rejection/O and input immutability. Issue #26 verified; session integration deferred.

        - [x] T-027 — Integrate kicked rotation with contact timing
            Depends on: T-026.
            Scope: src/engine/session.ts; session/timing tests and declared-delta corrections to obsolete no-kick expectations.
            Contracts: F-02/F-04 / FA-02/FA-05.
            Evidence: Blocked snapshot equality, fall elapsed preservation, grounded deadline preservation, kick support loss/recontact, O no-op and ghost refresh. Observe public-session RED before integration.
            Checks: npm run test; npm run build; focused current browser gameplay regressions.
            Completion: Session kicks obey ordered placement/contact rules without changing source or scoring.
            Result: Three public-session/wall RED failures observed (nine existing/blocked cases passed); full 160/160 and strict build pass; six production gameplay/modern Chromium cases pass. Floor kick retains 400-ms fall/contact and deadline; translated I kick loses stacked support and recontact starts full G; completely obstructed top candidates preserve whole snapshot. Obsolete no-kick assertion now expects literal x=0/orientation=0 wall result. O no-op remains covered. Issue #27 verified.

        - [x] T-028 — Implement coherent once-per-lock hold transitions
            Depends on: T-027.
            Scope: src/engine/session.ts, types.ts; session/errors/timing fixtures and public API comments.
            Contracts: F-03/F-05/F-06 / FA-03/FA-05/FA-06.
            Evidence: Empty hold promotes preview plus one draw; occupied swaps no draw; orientation/origin reset, eligibility consumed/re-enabled on lock, fresh fall/contact, paused no-op, terminal retained observations; failed source preserves full state. Observe hold/error RED.
            Checks: npm run test; npm run typecheck; npm run build.
            Completion: Public hold command and snapshot eligibility coherent, atomic and detached.
            Result: Six hold RED failures observed; final full 166/166 tests, typecheck and build pass. Empty draw/occupied no-draw, canonical reset, exhausted hold equality, lock re-enablement, restart/pause, fresh grounded incoming and blocked terminal exchange, source/identifier failure whole-state rollback verified. Contact fixture correctly expects terminal unavailability after its I lock blocks the next O spawn; earlier eligibility expectation was a fixture error. Unknown-command regression now uses teleport because hold is valid. Issue #28 verified.

        - [x] T-029 — Deliver hold controls and held-piece information
            Depends on: T-028.
            Scope: src/browser/keyboard.ts, app.ts/controller consumers; src/view/canvas.ts, status.ts, index.html/styles; browser tests and modern feature e2e.
            Contracts: F-07 / FA-07.
            Evidence: C and both Shift keys discrete; held shape/type and Available/Used/Unavailable including runtime error; next stays one; native controls retain activation; real hold/drop/kick interplay and restart. Observe UI RED and inspect updated layout.
            Checks: npm run test; npm run build; npm run test:e2e:cloud -- tests/e2e/modern-features.spec.ts; relevant controls/lifecycle/display checks.
            Completion: All five capabilities operate through actual production paths; repeat clock ownership preserved.
            Result: Three keyboard and two UI RED failures observed before wiring. Full 169/169 tests/build and all 21/21 Chromium cases pass; strengthened both-Shift modern suite rerun 3/3. Held canonical pixels/type and Available/Used/Unavailable, hold/drop/rotation interplay, pause/restart and failed-hold recovery verified. Shared local next/held rendering adds no simulation owner. Required viewport/DPR layout passes; 800×600 and paused hold screenshots inspected with clear shapes/labels/ghost and visible footer. Issue #29 verified.

        - [x] T-030 — Review test and report milestone 2.2
            Depends on: T-026–T-029.
            Scope: Whole 2.2 integration and report docs/dev/reports/phases/2/2.2.md.
            Contracts: FEATURE-PLAN 2.2 exit.
            Evidence: Review tables/geometry/timers, hold draw/eligibility/terminal/failure publication, ghost/drop collaboration and usable held display; repair required issues; report capabilities, limitations and TODO disposition.
            Checks: Complete unit/controller tests, strict build and all relevant production-browser scenarios; inspect display.
            Completion: Reviewed complete 2.2 code and [milestone report](reports/phases/2/2.2.md); no blockers/TODO.
            Result: Fresh 169/169 unit/controller tests, strict build and all 21/21 Chromium cases pass. Tables/candidates/contact/hold/source/UI reviewed separately; inspected required compact layout and paused held/ghost display. Remaining complete acceptance/setup/incorporation belongs to 2.3. Issue #30 verified; publication precedes review and milestone closure.

    - [x] Milestone 2.3 — Verified coherent expansion
        - [x] T-031 — Complete cross-feature production acceptance and failure evidence
            Depends on: T-030 and 2.2 closure.
            Scope: Existing engine/controller tests, e2e suites and isolated fixtures; only required bug repairs in their owning source.
            Contracts: FA-01–FA-08 and affected A-01–A-08.
            Evidence: Exact drop-at-deadline ordering, pause/subdivision, kick support loss/recontact, hold/contact and atomic source/counter failures; semantic-button Space/focus exclusions; production ghost/hold/restart/error, local-only requests, viewport/DPR 1/2. Add missing evidence, not implementation-mirroring tests or fabricated RED.
            Checks: npm run test; npm run build; npm run test:e2e:cloud; actual screenshot inspection.
            Completion: Cross-feature acceptance mapped to actual tests; no required production repair.
            Result: Milestone 2.2 closure read back. Full 175/175 tests, strict build and all 23/23 Chromium cases pass. Six added controller/session characterizations pin drop/hold exactly after due lock, repeat/pause chronology, bag restart purity, occupied blocked no-draw hold and interleaved subdivision. A fixture expectation was corrected for the repeat due before pause; no fabricated feature RED or production change. FA-01 source/restart; FA-02 rotation/kick-session plus literal production pixel; FA-03 hold/occupied blocked; FA-04 landing/drop/guard; FA-05 timing/modern-timing; FA-06 errors/hold/drop; FA-07 modern/display/controls/lifecycle; affected A-01–A-08 gameplay/progression/board/session retained. Viewport/DPR screenshots with populated hold inspected; button Space, editable/link exclusion and local-only requests pass. FA-08 clean setup/guidance/incorporation remains for T-032–T-034. Chromium-only/modelled native-event limits retained. Issue #31 verified.

        - [x] T-032 — Verify clean setup and complete player developer guidance
            Depends on: T-031.
            Scope: README, AGENTS and public source/API comments; test-only provisioning/docs boundary; task-owned clean verification copy.
            Contracts: FA-08; F-07 guidance and unchanged distribution obligations.
            Evidence: Fresh committed-input npm ci and owned browser prepare/build/e2e; verify no fixture/secret/remote asset in production; validate dev/preview commands and all controls/scoring/delayed drop guidance. Preserve other-plugin/prior-Tetris disclosure.
            Checks: In clean copy: npm ci, npm run browser:prepare, npm run test, npm run build, npm run test:e2e:cloud; main links/docs checks.
            Completion: Reproducible static distribution and accurate user/agent/API guidance; no dependency upgrade or site deployment.
            Result: Fresh git-archive copy of committed 002e5d5: npm ci installed 62 locked packages; fresh owned browser prepare reports Chromium 153.0.8010.0; 175/175 tests, strict build and 23/23 browser cases pass. Dev/preview HTTP commands exercised by suite. README covers all keys, bags/kicks/ghost/hold, awards and delayed drop; API/TSDoc audit preserves valid-piece preconditions and error ownership. Current documentation-only diff typecheck/build passes with identical production bundles. README/AGENTS links and tracked credential exclusion pass; inspected production contains no fixture import, secret or remote asset. Other-plugin/prior-Tetris disclosure retained. Issue #32 verified.

        - [x] T-033 — Incorporate accepted design contracts strategy and layout
            Depends on: T-032.
            Scope: PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC/children, PLAN/layout and affected adjacent SPEC/PLAN QC reports through sdd-integrate-feature.
            Contracts: Accepted feature source targets; FA-08.
            Evidence: Complete main documents describe intended game directly; preserve baseline scope/evidence and phase-2 boundaries; eliminate contradictory current contracts/stale preparation claims; reassess changed SPEC/design and PLAN/SPEC coverage. Keep active task ownership intact.
            Checks: Document/link/whitespace checks; affected QC reviews; npm run test and npm run build if substantive source/doc changes warrant.
            Completion: Accepted non-task sources incorporated with current main QC; no premature archive or completion claim.
            Result: Complete PROJECT/design/SPEC/children/PLAN/layout incorporated from accepted sources; F-01 onward retained verbatim including both kick tables. Current SHA-256 main SPEC/design and PLAN/layout conformance rechecks Ready; historical QC cycles retained. Requirement routes, full-G timing, unique active ownership and local links/whitespace pass. No source change or runtime claim; T-034 retains task transfer. Issue #33 verified.

        - [x] T-034 — Reconcile task ownership archive eligible sources and recheck hierarchy
            Depends on: T-033.
            Scope: TASKS, FEATURE-TASKS, main/feature TASKS QC and campaign navigation/archive via sdd-integrate-feature.
            Contracts: FA-08; FEATURE-PLAN incorporation/source disposition.
            Evidence: Transfer T-021–T-036 exactly once into complete hierarchy with statuses/evidence intact; preserve unfinished review tasks as executable. Replace root feature list with canonical navigation if transferred; retain marked historical sources only when eligible. Repair links and AGENTS current owner; recheck main TASKS/PLAN conformance and four-space structure.
            Checks: Task identity/parent/links checks, affected QC reports, git diff --check; no duplicate executable owner or dropped remaining task.
            Completion: Main TASKS becomes canonical only on verified transfer; continuation resolves T-035/T-036 there.
            Result: T-021–T-036 transferred once with stable IDs, statuses, dependencies and evidence; T-035/T-036 remain unchecked. Canonical TASKS/PLAN review Ready; counts 4/4/4 delivery plus dedicated reviews, four-space hierarchy and all local links verified. Eligible source/QC pairs archived with historical status; root navigation and AGENTS identify TASKS as sole owner. Issue #34 verified. Feature archives retain provenance rather than current authority.

        - [x] T-035 — Review test and report milestone 2.3
            Depends on: T-031–T-034.
            Scope: Complete distribution/acceptance/incorporation and report docs/dev/reports/phases/2/2.3.md.
            Contracts: FEATURE-PLAN 2.3 exit, FA-01–FA-08.
            Evidence: Review complete evidence matrix, clean setup/docs, canonical ownership/archive and current main QC; repair blockers; record implemented capabilities, check/tool versions, native event limits and TODO disposition.
            Checks: Full unit/controller suite, strict typecheck/build and production cloud Chromium; document links and ownership readback.
            Completion: Report published/read back; all constituent issues and review close before milestone closure.
            Result: Complete milestone code/docs/acceptance review passes; fresh 175/175 unit/controller, strict typecheck/build and 23/23 Chromium checks pass. Current QC identities, unique 36-ID hierarchy, relocated Markdown links, distribution boundary and compact/paused screenshot readability verified. T-032 clean setup evidence retained for unchanged product/tooling inputs. Report: docs/dev/reports/phases/2/2.3.md; TODO None; final phase integration remains T-036. Issue #35 verified.

    - [ ] Milestone 2.4 — Phase review
        - [ ] T-036 — Review test integrate and report the complete modern expansion
            Depends on: T-025, T-030, T-035 and all delivery milestone completion/closure.
            Scope: Whole feature branch, canonical main/task/source disposition, phase report docs/dev/reports/phases/2/PHASE-REPORT.md and campaign IMPLEMENTATION-REPORT.md.
            Contracts: FEATURE-PLAN 2.4; all FA and affected baseline acceptance.
            Evidence: One fresh-context independent whole-branch review under preserved inline execution; inspect all five capabilities, failures/timers/source/UI/distribution and incorporated contracts. Repair required defects and reverify; publish reports/TODO aggregation; read back hosted completion. Reconfirm main target, explicitly merge, test merged state, push and read back exact target/containment.
            Checks: Complete npm run test, npm run typecheck, npm run build, npm run test:e2e:cloud before and after eligible integration; code review plus source/task/hosted reconciliation.
            Completion: Verified complete feature integrated/published on main; stop before extra features or deployment.

## Selection boundary

The baseline T-001–T-020 is complete. The user selected full expansion T-021–T-036 for inline execution, ending after verified integration/publication. T-035/T-036 remain executable here until verified; archived feature checklists are historical snapshots.
