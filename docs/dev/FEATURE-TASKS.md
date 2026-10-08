# Modern piece controls executable tasks

## Authority and boundaries

[Campaign](features/001_3fd5011-modern-piece-controls/README.md): `001_3fd5011`, working branch `feature/001_3fd5011-modern-piece-controls`, baseline `3fd501155708a92ddf63415f02180bdde9167836`, target `main`. Accepted feature design, [SPEC](FEATURE-SPEC.md), [PLAN](FEATURE-PLAN.md) and [layout](FEATURE-LAYOUT.md) govern this list. Main [TASKS](TASKS.md) retains completed baseline T-001–T-020; feature IDs are new and never duplicate those items.

The user selected inline execution. PLAN/layout is accepted; the user selected the full expansion T-021–T-036 on 2026-10-08. Execution is active; completed task evidence is recorded below. Phase 2 hosting is activated with verified task issues #21–#36. [Preparation review](FEATURE-TASKS-REVIEW-REPORT.md) supplies conformance readiness. Each delivery task includes meaningful tests and professional API/module documentation, not separate padding tasks. Read exact owning SPEC contracts rather than infer rules from this list.

Verify current worktree/refs and preparation publication before selection. Activate only eligible phase 2 and reconcile confirmed repository GitHub tracking before its first task. The baseline is complete on main. Preserve existing authentication and scoped publication authorization; use protected credential transfer if the observed shell failure recurs. Commit/push/readback completed outcomes before managed issue closure; review closure precedes milestone closure.

At T-034, accepted task incorporation may transfer the single executable owner to main TASKS. Preserve identical IDs, progress and remaining reviews, and resolve subsequent execution through that canonical owner. Historical archived feature checkboxes are not a second executable list. Never infer full phase completion from a partial range or from document incorporation.

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

    - [ ] Milestone 2.2 — Kicks and hold
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

        - [ ] T-029 — Deliver hold controls and held-piece information
            Depends on: T-028.
            Scope: src/browser/keyboard.ts, app.ts/controller consumers; src/view/canvas.ts, status.ts, index.html/styles; browser tests and modern feature e2e.
            Contracts: F-07 / FA-07.
            Evidence: C and both Shift keys discrete; held shape/type and Available/Used/Unavailable including runtime error; next stays one; native controls retain activation; real hold/drop/kick interplay and restart. Observe UI RED and inspect updated layout.
            Checks: npm run test; npm run build; npm run test:e2e:cloud -- tests/e2e/modern-features.spec.ts; relevant controls/lifecycle/display checks.
            Completion: All five capabilities operate through actual production paths; preserve repeat clock ownership.

        - [ ] T-030 — Review test and report milestone 2.2
            Depends on: T-026–T-029.
            Scope: Whole 2.2 integration and report docs/dev/reports/phases/2/2.2.md.
            Contracts: FEATURE-PLAN 2.2 exit.
            Evidence: Review tables/geometry/timers, hold draw/eligibility/terminal/failure publication, ghost/drop collaboration and usable held display; repair required issues; report capabilities, limitations and TODO disposition.
            Checks: Complete unit/controller tests, strict build and all relevant production-browser scenarios; inspect display.
            Completion: Publish/read back report and task evidence before review issue and milestone closure.

    - [ ] Milestone 2.3 — Verified coherent expansion
        - [ ] T-031 — Complete cross-feature production acceptance and failure evidence
            Depends on: T-030 and 2.2 closure.
            Scope: Existing engine/controller tests, e2e suites and isolated fixtures; only required bug repairs in their owning source.
            Contracts: FA-01–FA-08 and affected A-01–A-08.
            Evidence: Exact drop-at-deadline ordering, pause/subdivision, kick support loss/recontact, hold/contact and atomic source/counter failures; semantic-button Space/focus exclusions; production ghost/hold/restart/error, local-only requests, viewport/DPR 1/2. Add missing evidence, not implementation-mirroring tests or fabricated RED.
            Checks: npm run test; npm run build; npm run test:e2e:cloud; actual screenshot inspection.
            Completion: Complete acceptance mapping with actual check counts and clear native-event/browser limits.

        - [ ] T-032 — Verify clean setup and complete player developer guidance
            Depends on: T-031.
            Scope: README, AGENTS and public source/API comments; test-only provisioning/docs boundary; task-owned clean verification copy.
            Contracts: FA-08; F-07 guidance and unchanged distribution obligations.
            Evidence: Fresh committed-input npm ci and owned browser prepare/build/e2e; verify no fixture/secret/remote asset in production; validate dev/preview commands and all controls/scoring/delayed drop guidance. Preserve other-plugin/prior-Tetris disclosure.
            Checks: In clean copy: npm ci, npm run browser:prepare, npm run test, npm run build, npm run test:e2e:cloud; main links/docs checks.
            Completion: Reproducible static distribution and accurate user/agent commands; no dependency upgrade or site deployment.

        - [ ] T-033 — Incorporate accepted design contracts strategy and layout
            Depends on: T-032.
            Scope: PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC/children, PLAN/layout and affected adjacent SPEC/PLAN QC reports through sdd-integrate-feature.
            Contracts: Accepted feature source targets; FA-08.
            Evidence: Complete main documents describe intended game directly; preserve baseline scope/evidence and phase-2 boundaries; eliminate contradictory current contracts/stale preparation claims; reassess changed SPEC/design and PLAN/SPEC coverage. Keep active task ownership intact.
            Checks: Document/link/whitespace checks; affected QC reviews; npm run test and npm run build if substantive source/doc changes warrant.
            Completion: Accepted non-task sources incorporated with current main QC; no premature archive or completion claim.

        - [ ] T-034 — Reconcile task ownership archive eligible sources and recheck hierarchy
            Depends on: T-033.
            Scope: TASKS, FEATURE-TASKS, main/feature TASKS QC and campaign navigation/archive via sdd-integrate-feature.
            Contracts: FA-08; FEATURE-PLAN incorporation/source disposition.
            Evidence: Transfer T-021–T-036 exactly once into complete hierarchy with statuses/evidence intact; preserve unfinished review tasks as executable. Replace root feature list with canonical navigation if transferred; retain marked historical sources only when eligible. Repair links and AGENTS current owner; recheck main TASKS/PLAN conformance and four-space structure.
            Checks: Task identity/parent/links checks, affected QC reports, git diff --check; no duplicate executable owner or dropped remaining task.
            Completion: Main TASKS becomes canonical only on verified transfer; continuation resolves T-035/T-036 there. Feature archives retain provenance rather than current authority.

        - [ ] T-035 — Review test and report milestone 2.3
            Depends on: T-031–T-034.
            Scope: Complete distribution/acceptance/incorporation and report docs/dev/reports/phases/2/2.3.md.
            Contracts: FEATURE-PLAN 2.3 exit, FA-01–FA-08.
            Evidence: Review complete evidence matrix, clean setup/docs, canonical ownership/archive and current main QC; repair blockers; record implemented capabilities, check/tool versions, native event limits and TODO disposition.
            Checks: Full unit/controller suite, strict typecheck/build and production cloud Chromium; document links and ownership readback.
            Completion: Report published/read back; all constituent issues and review close before milestone closure.

    - [ ] Milestone 2.4 — Phase review
        - [ ] T-036 — Review test integrate and report the complete modern expansion
            Depends on: T-025, T-030, T-035 and all delivery milestone completion/closure.
            Scope: Whole feature branch, canonical main/task/source disposition, phase report docs/dev/reports/phases/2/PHASE-REPORT.md and campaign IMPLEMENTATION-REPORT.md.
            Contracts: FEATURE-PLAN 2.4; all FA and affected baseline acceptance.
            Evidence: One fresh-context independent whole-branch review under preserved inline execution; inspect all five capabilities, failures/timers/source/UI/distribution and incorporated contracts. Repair required defects and reverify; publish reports/TODO aggregation; read back hosted completion. Reconfirm main target, explicitly merge, test merged state, push and read back exact target/containment.
            Checks: Complete npm run test, npm run typecheck, npm run build, npm run test:e2e:cloud before and after eligible integration; code review plus source/task/hosted reconciliation.
            Completion: Verified complete feature integrated/published on main; stop before extra features or deployment.

## Selection handoff

Sixteen tasks comprise twelve delivery tasks and four dedicated review tasks. Milestone 2.1 stops at T-025; 2.2 at T-030; 2.3 at T-035; the full expansion ends at T-036. Select an explicit range through sdd-implement; preparation and inline method selection do not silently select it. The owning task results record product implementation and verified hosted associations.
