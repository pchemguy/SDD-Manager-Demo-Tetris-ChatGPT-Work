# Tetris delivery plan

## Objective and governing inputs

Deliver the complete intended game in the accepted [SPEC](SPEC.md) using the boundaries in [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md). [PROJECT](PROJECT.md) supplies scope and [layout](layout.md) supplies physical ownership. PLAN defines delivery strategy and exits; the owning task list derives executable units without duplicating this strategy.

Preparation remains on `design-docs`. After written-plan acceptance and reviewed TASKS preparation, merge preparation into the repository's actual default branch and publish that checkpoint before creating implementation branches. Phase 1 establishes the baseline, `1 Baseline Tetris`, on `phase/1-baseline-tetris`, targeting the confirmed default branch `main`. Confirm identities again at activation; do not infer the default branch from naming alone.

## Technology and verification approach

Use TypeScript without a UI framework, Canvas plus semantic DOM controls, Vite for development/static production packaging, Vitest for deterministic engine/controller tests, and Playwright Test with Chromium for browser acceptance. Runtime game logic has no third-party engine or backend dependency. Select mutually compatible stable tooling versions at implementation setup, pin direct dependencies and commit the npm lockfile. Record actual Node/npm/browser versions and validate the locked setup rather than claiming version compatibility from this plan.

Official [Vite setup](https://vite.dev/guide/), [Vitest setup](https://vitest.dev/guide/), and [Playwright browser provisioning](https://playwright.dev/docs/browsers) were consulted on 2026-10-08. Browser binaries are tied to Playwright versions. Reuse a compatible available Chromium installation where supported; otherwise provision the required browser through an authorized available channel. Package/binary access is an implementation prerequisite to verify, not a claim that installation already succeeded.

Build checks must include TypeScript type checking independently of transpilation. Intended package scripts are `dev`, `build`, `preview`, `typecheck`, `test`, and `test:e2e`; `test` is noninteractive. TASKS defines exact commands once the package configuration is allocated. The repository provides these scripts plus test-only browser:prepare and test:e2e:cloud; owning verification evidence records actual execution.

Write focused contract tests alongside each owning change and run applicable regression checks before its checkpoint. Timing tests inject piece sequences and explicit elapsed values; controller tests inject scheduling/clock inputs. Browser tests exercise real DOM/Canvas integration. Use narrowly scoped deterministic fixtures to reach line-clear, stack, and timing boundaries; any browser test harness is isolated from the production entry point and never exposes production state mutation hooks.

## Phase 1: Baseline Tetris

Four delivery milestones produce the complete accepted baseline, followed by one dedicated phase review milestone. Milestones are sequential; each exit includes its final code review/testing/report outcome. Partial requests stop on the phase branch after verified publication; they do not imply phase integration.

| ID | Milestone | Prerequisite | Demonstrable outcome |
| --- | --- | --- | --- |
| 1.1 | Playable browser slice | Accepted preparation and phase activation | Play with movement/rotation, gravity, delayed locking, clearing, spawning, game over, start/restart |
| 1.2 | Complete gameplay progression | 1.1 exit | Soft drop, score/level/speed progression, and next preview integrated into play |
| 1.3 | Robust browser session | 1.2 exit | Complete controls/repeat, pause/focus/time policy, accessible state display, and explicit failure handling |
| 1.4 | Verified static distribution | 1.3 exit | Reproducible locked setup, production browser acceptance, documented launch/check commands |
| 1.5 | Phase review | All delivery milestones complete/closed | Whole-baseline code review, regressions, complete acceptance/report evidence and integration readiness |

### 1.1: Playable browser slice

Deliver a real TypeScript engine/browser path with all seven shapes, bounds/collision and rotation without kicks, independent/injected piece source, basic session state, gravity at level 1, full contact-based lock delay, row clearing, next-piece spawning, game over, and start/restart. Browser presentation shows settled/active cells and session state. Basic keyboard movement/rotation works. Establish tooling, type checking, engine checks, and the first real Chromium play/start/restart smoke as part of this capability.

This increment intentionally defers soft drop, score/level progression, visible next preview, complete key repeat, pause/focus policy, complete API-failure coverage, and full display/accessibility acceptance to 1.2/1.3. It is a playable intermediate build, not a declaration that all SPEC contracts are satisfied. Session snapshot isolation and browser-independent engine boundaries are established immediately.

Exit: demonstrate repeated fall/placement/lock/spawn cycles in the browser and a real row clear through deterministic integration evidence; verify representative shape/orientation and wall/floor/settled-cell rejection, stable compaction, blocked spawning, snapshot isolation, restart reset, partial-phase contact timing, loss/recovery of support, and lock-versus-gravity deadline order. Review code and integration boundaries, repair blockers, run focused regressions/type checking, and publish the milestone report.

Player feedback can assess board readability and whether the unusual full-gravity-interval lock delay matches the intended feel. It informs a human decision to continue, amend, simplify, or stop; absent a requested amendment, authorized execution continues within its selected range.

### 1.2: Complete gameplay progression

Add successful/blocked soft-drop behavior without shortening lock delay, line-clear score awards, total lines and level thresholds, changing gravity with its floor, and visible score/lines/level/next preview. Keep placement/lock/clear/spawn as a coherent transition. Continue independent piece selection; do not introduce expansion bonuses or seven-bag behavior.

Exit: verify all 0–4 row awards using the pre-clear level, threshold transitions and speed floor, successful descent points and blocked no-op behavior, correct source draw counts and preview promotion, and timing after progression/spawn. Run complete engine regression plus browser display/soft-drop integration; review changed dependencies and publish the milestone report.

### 1.3: Robust browser session

Complete pause/resume, keyboard repeat and opposing-key handling, command/time ordering, input/focus/default prevention, automatic pause on hidden/blur/long gaps, lifecycle reset/disposal, runtime errors, and API rejection/overflow/source-failure contracts. Finish semantic controls, instructions, lifecycle announcements, viewport layout, and sharp Canvas sizing. Tests verify collaboration with the engine, not only adapter helpers in isolation.

Exit: verify focus/hidden/gap boundaries including 250 versus greater than 250 ms, unchanged timers during pause, fresh input after reset, simultaneous repeat order, command at a lock deadline, no duplicated time/listeners/loops, invalid API/source and overflow atomicity, snapshot isolation regressions, and visible unsupported-Canvas/runtime-error recovery. Exercise keyboard/button focus and native button activation, clear state display, both required viewports, and device pixel ratios 1/2. Review the complete browser integration, repair blockers, regress the playable path, and publish the milestone report.

Feedback can assess controls, readable layout, and pause/error clarity. This is a suitable human checkpoint for a scoped steering request; it does not authorize the implementer to change accepted rules independently.

### 1.4: Verified static distribution

Validate the committed lockfile through a clean `npm ci` setup in an isolated temporary verification copy. Build production static files with type checking, serve them over HTTP, and run the complete accepted browser flows against that production build. Finish README setup/play/build/preview/check instructions and comprehensive public API/module documentation where useful. Maintain AGENTS navigation and validated command guidance. Do not add deployment, accounts, persistence, modern features, or a runtime server requirement.

Exit: establish A-01–A-08 from engine/controller tests, Chromium production-browser runs, visual inspection, documentation/links, and scope review. Verify application behavior uses local built assets without gameplay/network backend calls. Record actual tools/browser version and evidence limits. Generated output remains outside tracked source; publish owning documentation and the milestone review/report checkpoint.

### 1.5: Phase review

Reserve exactly one phase code review/testing/report outcome in this final milestone; no additional milestone review outcome is added here. Start only after all four delivery milestones and their review outcomes pass and their hosted milestones close.

Review cross-milestone interactions, engine/browser dependency direction, full acceptance coverage, locked setup and production usability evidence. Run complete relevant tests/typecheck/production build and required browser acceptance, fix bugs/critical issues/SPEC or PLAN violations, and compose the phase and final implementation reports. Every report has a TODO section; aggregate eligible deferred findings with stable IDs, evidence, impact, rationale, options, and follow-up scope, or state None. Required failures remain blockers, not TODOs.

Exit: all phase tasks and reviews are complete, accepted contracts satisfied, mandatory reports committed/pushed, all managed issues/milestones closed/read back, and no integration blocker remains. Perform an explicit verified merge into the confirmed default branch, verify merged-state behavior, publish, and confirm remote containment. Only then may the baseline be described as complete.

## Phase 2: Modern piece controls

Three sequential delivery milestones preserve useful play while adding bounded capabilities. Each includes a final code review/testing/report outcome. The fourth milestone contains exactly one dedicated whole-phase review outcome.

| ID | Milestone | Prerequisite | Demonstrable outcome |
| --- | --- | --- | --- |
| 2.1 | Bag, ghost and delayed drop | Accepted preparation, reviewed owning TASKS, eligible activation | Production play uses bags; ghost predicts Space landing; landing retains full delayed lock |
| 2.2 | Kicks and hold | 2.1 exit | Ordered wall/floor kicks and once-per-lock hold operate in production with readable held status |
| 2.3 | Verified coherent expansion | 2.2 exit | Complete acceptance, failure/focus/layout checks, setup/docs and accepted source incorporation |
| 2.4 | Phase review | All delivery milestones complete and applicable hosted milestones closed | Independent whole-feature review, complete regression evidence and integration readiness |

### 2.1: Bag, ghost and delayed drop

Deliver lazy validated bag generation through the established injectable source, shared landing placement, ghost observations/rendering and discrete Space input. Establish exact hard-drop scoring, state publication and contact behavior with the feature snapshot contract. Introduce held/availability fields coherently when required by the public value shape; hold behavior/display remains explicitly deferred to 2.2. Preserve baseline lifecycle, progression and controlled movement.

Exit: deterministic bag permutations/boundaries/call counts and fresh sources pass; ghost/drop destinations agree on empty and obstructed boards; positive descent scores exactly 2d without source draw/merge/clear; zero-distance drop preserves timers; first contact between gravity ticks gives full G. Overflow, snapshot isolation and paused/terminal ghost values pass. Production Chromium demonstrates Space input and ghost visibility, with focused baseline regressions, typecheck/build, code review and a committed/published milestone report.

This is the earliest useful changed path, not a mocked-only helper milestone. The player can assess landing readability and delayed-drop feel while the remaining two capabilities are visibly deferred. Feedback can lead to human-directed continuation, steering or stopping; the implementer does not change accepted timing independently.

### 2.2: Kicks and hold

Deliver both ordered kick tables against existing geometry, contact-preserving rotation and complete hold transitions, including empty/occupied draw counts, canonical spawn, eligibility and blocked incoming spawn. Add C/Shift input, held shape/identifier and eligibility display while retaining one next preview and existing repeat/focus/clock ownership.

Exit: every table transition has independently enumerated expectations; first-valid order and later-offset success, I-specific handling, floor/wall/stack/top bounds and total rejection are checked. O remains a full no-op. Empty/occupied/exhausted hold, lock re-enablement, restart, paused state, source failure atomicity and blocked-spawn terminal observations pass. Kicked support loss/recontact and hold contact initialization preserve the accepted timer policy. Real production Chromium exercises both controls, next/held display, error/restart and baseline controls, with unit/controller regressions, build, code review and the milestone report.

Hold usability and ghost/held readability provide a consequential checkpoint for accepting the player experience or requesting scoped steering. No automatic rule change or extra feature is authorized.

### 2.3: Verified coherent expansion

Complete cross-feature timing/order/failure acceptance, focus exclusions including Space on semantic buttons, viewport/DPR layout and local-only production-browser checks. Update player/API/agent guidance and acceptance traceability. Verify clean committed-input locked installation and fresh owned test-browser provisioning, using the validated cloud route; keep its assets outside production. Reuse current tooling without upgrading it solely for this feature.

Incorporate accepted feature design, behavioral, strategy and physical-layout targets into PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC/children, PLAN/layout and TASKS, through sdd-integrate-feature. Reconcile feature tasks and the complete hierarchy without duplicate executable owners. Reassess affected main SPEC/PLAN/TASKS QC, preserve baseline completion evidence, and archive eligible feature sources/reports under the established package with repaired links and clear historical status. Any active source needed for unfinished phase execution retains its authoritative ownership until safe disposition. Incorporation must not erase remaining review work or infer completion from archive placement.

Exit: FA-01–FA-08 and affected A-01–A-08 have inspectable evidence; required viewports at DPR 1/2, failure recovery and production controls pass. Full engine/controller/browser checks, strict typecheck/build, reproducible setup, meaningful screenshot inspection, local Markdown links and production/test/credential boundary review pass. Main documents describe the coherent intended game, with no contradictory active ownership or unresolved QC issue. Publish delivery review/report and required document evidence before phase review.

### 2.4: Phase review

Use exactly one whole-phase review/testing/report outcome after delivery exits. Under preserved inline execution, the executor implements the range; one fresh-context independent reviewer assesses the complete feature branch at the final boundary. Detailed reviewer invocation follows the applicable execution/review skills when that stage is reached, not parallel implementation delegation.

Review engine/controller/view interactions, kick/contact timing, source/hold draw ownership, drop scoring/atomicity, ghost consistency, public snapshots, lifecycle/focus, setup/distribution and final document/task integration. Resolve bugs, required contract deviations and integration blockers, then run the complete relevant unit/controller suite, strict typecheck/static build and production Chromium acceptance against the final feature tip.

Publish the phase and feature summary reports, with concise implemented-capability summaries and TODO sections; aggregate eligible non-blocking findings with provenance or state None. Read back applicable task and milestone closures. Explicitly merge the verified coherent feature into the re-confirmed main target, run merged-state checks, push and read back the exact target/containment. Retain branch/checkpoint evidence. Stop after the accepted expansion; no new feature or hosted deployment is implied.

## Coverage and evidence routes

| SPEC coverage | Delivery route | Final acceptance evidence |
| --- | --- | --- |
| B-01–B-04 | 1.1; source failure strengthening in 1.3 | Placement/clear/source/spawn engine scenarios and browser integrated play |
| B-05–B-06 | 1.2; overflow failures in 1.3 | Every award/threshold/floor and soft-drop boundary |
| T-01–T-05 | 1.1 core state/timing; 1.2 soft drop/progression; 1.3 complete lifecycle/order | Deterministic snapshot/timing and browser controller integration |
| T-06 | 1.3 | Rejection/source failure/overflow atomicity and visible recovery |
| U-01–U-04 | 1.1 playable input/display; 1.2 counters/preview; 1.3 complete policies/usability | Chromium controls/focus/layout and visual evidence |
| U-05 / A-08 | Tooling begins in 1.1; full production validation in 1.4 | Clean lockfile setup, typed production build, HTTP-served browser checks, README |
| F-01/F-04–F-06 | 2.1 | Bags/landing/drop/ghost/timing and production Space |
| F-02/F-03/F-07 | 2.2 | Kicks/hold/contact/source/UI and production controls |
| FA-01–FA-08 | 2.3 / final 2.4 | Cross-feature order/failures, clean setup, coherent docs and independent final review |
| A-01–A-07 | Incremental verification in 1.1–1.3; complete production assessment in 1.4/1.5 | Linked engine/controller/browser/manual evidence with limitations |

## Hosted lifecycle and reports

GitHub tracking is established for this repository's selected eligible phases. Before the first task, sdd-forge projects the eligible phase label, all corresponding milestone objects, and all task issues with correct parent associations from reviewed TASKS. Preparation alone creates no hosted objects. Commit/push/readback precedes evidence-backed task issue closure; delivery milestone closure waits for its final review issue and every constituent issue. The phase review milestone closes after its sole review issue.

Reports use `docs/dev/reports/phases/1/<milestone-id>.md`, `docs/dev/reports/phases/1/PHASE-REPORT.md`, and `docs/dev/reports/IMPLEMENTATION-REPORT.md`. The owning task list links exact report owners. Phase 2 reports use docs/dev/reports/phases/2; its implementation summary remains under the recorded feature package. Task transfer preserves remaining reviews and one executable owner. Full-phase integration uses an explicit verified two-parent merge and exact target readback. Preserved Git/worktree/checklist/provider state governs resume; no separate transaction journal is introduced.

## Risks and stopping boundaries

| Risk | Required resolution / evidence |
| --- | --- |
| Restricted package/browser provisioning | Confirm compatible dependencies and runnable Chromium at the first integrated setup; if blocked, retain work and report the facility blocker before claiming browser acceptance |
| Lock/contact timing errors | Establish event-driven timing and contact tests in 1.1; regress soft drop, progression and controller deadline ties as their owners appear |
| Intermediate build mistaken for completion | Keep explicit milestone deferrals; full acceptance is required at 1.4/1.5 |
| Input and animation clock divergence | One time owner, partition at repeats, deterministic clock tests plus real browser flows |
| Test harness leaking into release | Keep fixture injection in tests/isolated harness; inspect production entry and output in 1.4 |
| Hosted/push interruption | Preserve exact identities and resume pending publication/reconciliation; do not proceed past a blocked dependency or duplicate objects |

Phase 2 provides all required modern controls after the coherent baseline. Its feature campaign retains provenance; complete main documents govern intended behavior after incorporation. Baseline phase boundaries retain their original scoped deferrals. PLAN/layout preparation and review do not authorize product implementation; written-plan review and TASKS readiness precede execution-method/range selection.
