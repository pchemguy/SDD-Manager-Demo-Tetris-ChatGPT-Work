# Phase 1 — Baseline Tetris

Status: **Complete.** Whole baseline reviewed, verified, explicitly merged into the confirmed default branch and published/read back. All twenty tasks and five hosted milestones are complete.

## Scope and evidence

T-001–T-020 implement the accepted seven-piece, 10×20 browser TypeScript baseline. All four delivery milestones were reviewed, published and their GitHub milestones closed/read back before T-020. No modern feature campaign, CI or hosted deployment was added. [1.4 acceptance mapping](1.4.md) traces A-01–A-08 to real engine/controller/production-browser evidence; earlier reports own increment findings.

Final fix-pass verification: **82/82 unit/controller tests**, strict typecheck/Vite build, **18/18 Playwright Chromium scenarios**. Actual browser: **153.0.8010.0**. Production keyboard gameplay clears two rows for 390 points, reaches blocked spawn retaining 90 points, restarts via Enter and promotes preview identifier/color. Local-only application requests have no runtime errors. Inspected screenshots show readable square sharp board/controls at 800×600 and 1280×720, DPR 1/2. Source/fixture/credential/static boundaries remain intact.

T-017 owns the clean committed-input `npm ci`, fresh browser-cache extraction/provisioning and complete acceptance run at published 272db5218e1f9c19e8ab123aa2066f6fa327e340. Tooling dependencies did not change afterward; current code received fresh full checks after documentation formatting and the two final fixes. README setup/dev/preview/check commands and local links were exercised.

## Independent review and one fix pass

A fresh-context read-only reviewer, gpt-6.1-sol at medium effort, reviewed base 6d96a76a1976f5b8c2ca3ed7847777ffcdc4d66d through a49846b27cd8a5b0aff44f7acc9d3ff1130dfa8c. This honors the user-requested 6.1 Sol Medium configuration; root interface model selection itself is not independently verifiable. The reviewer inspected governing contracts, all production modules, tests, tooling and screenshots, and independently ran the then-current 80 tests, typecheck and 17 browser cases. Both reproduced defects survived that existing green suite.

| Finding | Executor grade / disposition | Observed regression and correction |
| --- | --- | --- |
| Initial paint outside guarded recovery leaves inert controls showing Ready | Important; fixed | First-paint transient failure browser case went RED, then GREEN after routing initial painting through Controller.tick; visible error, disabled gameplay and Restart recovery now verified. Existing disposal regression remains green. |
| O rotation publishes orientation 1/3 despite B-02 requiring 0 | Regraded from reviewer's Minor to required Important contract correction; fixed | Both rotation-direction public-session cases went RED, then GREEN; O now remains a no-op, preserving placement/orientation and grounded/fall timing. |

Fixes were published in 08ed4b8. No second reviewer/re-review or additional architecture/feature expansion was used. No Critical finding and no unaddressed required finding remain. The review confirmed aggregate ownership, captured full lock interval, chronological event order/remainders, failure rollback/counter guard ordering, uniform source/progression, input/clock/lifecycle boundaries and production/test separation.

## Explicit rulings on review boundaries

| Reviewer set aside | Executor ruling and basis | Remaining cost / evidence limit |
| --- | --- | --- |
| Native desktop blur/document visibility delivery | Keep accepted handler semantics; controller suspension and registered adapter paths are assessed, headless delivery is not represented as desktop certification. | Native desktop event delivery remains unverified. |
| Other-browser compatibility | Keep intended Chrome/Edge and actual cloud Chromium evidence; no additional browser claim or scope expansion. | Compatibility outside tested Chromium remains unverified. |
| Full nonvisual play/accessibility certification | Keep semantic controls, readable status/focus and Canvas text required by U-04; full nonvisual play/certification is explicitly outside baseline. | Full nonvisual gameplay is not supplied/certified. |
| Ordinary gameplay reaching counter overflow | Accept direct exact-boundary guard tests plus inspected pre-publication/source ordering and event rollback; no billions of synthetic public inputs. | No end-to-end run reaches an unsafe counter. |
| Fresh installation/provisioning not repeated by reviewer | Root's T-017 committed-input clean run supplies that evidence; current full checks cover unchanged tooling and final code. | Clean install was demonstrated at the recorded tooling commit; final fixes were checked in the established install. |
| Hosted/default-branch reconciliation outside read-only review | Root separately confirms markers/parents, issue/milestone states and published/default-branch containment. | None remaining: root read back all hosted closures and the published merged head. |

Ruling: O metadata is a required contract repair despite limited visual effect; no change to accepted rotation behavior or player controls was introduced. No deferred Minor finding remains. Browser provisioning substituted pinned npm assets for an HTTP-200 HTML download failure, with ownership-safe extraction, local fonts and multiprocess contexts verified; it did not change accepted browser behavior.

## Integration and hosted reconciliation

The repository default branch was reconfirmed as `main`, with unchanged pre-merge head 6d96a76a1976f5b8c2ca3ed7847777ffcdc4d66d. Final phase reports were published at 140ca00ed64a17e303b5ac051d085aa54c8444a4; T-020 then closed/read back and milestone 1.5 closed/read back. Root subsequently verified all 20 exact task markers/phase labels/milestone associations and all five closed milestones.

Explicit non-fast-forward merge: **a01e4384b23398a30d8f5e5e520548bf35197d98**, with first parent 6d96a76a1976f5b8c2ca3ed7847777ffcdc4d66d and second parent 140ca00ed64a17e303b5ac051d085aa54c8444a4. The merged tree passed **82 unit/controller tests, strict typecheck/build and 18 Chromium cases**. It was pushed to `main`; GitHub's main-ref readback returned that exact merge SHA. A documentation-only reconciliation follows this merge and preserves its ancestry. TASKS phase/milestone/task completion is reconciled, and no active feature exists.

The normal checkout is retained on `main`; the phase branch remains available for its auditable task checkpoints. No extra worktree, hosted deployment or feature campaign was created.

## TODO

None. Known acceptance/evidence limits are explicit above, not hidden defects. Hold, ghost, seven bag, wall kicks and hard drop remain a subsequent SDD feature expansion; this selected phase stops at the verified baseline.
