# Feature SPEC review report

## Current gate

State: **Ready for human written-spec review.** SPEC/design conformance passes with no unresolved confirmed finding. Dependent planning awaits the user's acceptance of the written SPEC; this report does not supply that acceptance.

Scope: FEATURE-SPEC F-01–F-07 and FA-01–FA-08 against the accepted feature design and unchanged main contracts. Governing baseline: `3fd501155708a92ddf63415f02180bdde9167836`; accepted design checkpoint: `5f2cffd64ff47909ab4a2992accf5108a65601bd`, with status/navigation clarified in this preparation checkpoint. Design acceptance: user response “Accepted” on 2026-10-08.

## Reviewed identities

SHA-256 identities below identify the exact reviewed pending content, including unchanged main governing inputs. The report does not require its own future commit identifier.

| Artifact under docs/dev | SHA-256 |
| --- | --- |
| `FEATURE-SPEC.md` | `3c7c1242898e865274ad517a286d5f2d0a67087df01923592ef6c6972f2544e1` |
| `PROJECT.md` | `585820be5f322e346cff69789b2178a03c03c62367db4c2756a6198a7d86cb0e` |
| `ARCHITECTURE.md` | `41849d0f494c99501847d21378cdb1378a6adc31b91775e4ae3cda002fb1c5f7` |
| `DECOMPOSITION.md` | `0053d29f5628c1283f36e1d3f8158f6eacc3be1b25485c7bca9976dbfed30c74` |
| `FEATURE_ARCHITECTURE.md` | `5e5768852016cd911e318866082149eae14386f57647b7ddbd390cb72ab6d150` |
| `FEATURE_DECOMPOSITION.md` | `f30cafb117f1c4c06f08f2c35cca45523a0eb885d59577443aceea432cbafff7` |
| `SPEC.md` | `1957efa19387693a72e5bc2578bc12eae41684ea2322205996f76c04b4e9cea4` |
| `spec/board-and-pieces.md` | `318c7577899a2365c468c13f3ab8b8057643490a67716e01dc1a9327ce9752d7` |
| `spec/session-and-timing.md` | `e97bf04b409f2cb155f8c59e797fd90c775121aa21a0a77f623400f079d211dd` |
| `spec/browser-interaction.md` | `24d21f81dbb24b33d2d198793cce6194ec0d2b2fd190ec47e5ad9a3648096bcc` |

## Initial review

Reviewer: coordinating executor using sdd-specify and shared development-document QC, 2026-10-08. This is a scoped inline document review, not an independent code review or runtime verification.

| Contract group | Design coverage and assessment |
| --- | --- |
| F-01 / FA-01 | Existing source injection owns bag/cursor; lazy calls, deterministic shuffle, restart, validation and non-bag collaborator compatibility are explicit |
| F-02 / FA-02 | Placement owns ordered table candidates; geometry, downward coordinates, visible bounds, first-valid selection and grounded policy remain coherent |
| F-03 / FA-03 | Session owns held identifier, eligibility, canonical incoming spawn, draw counts, terminal publication and failure atomicity |
| F-04 / FA-04–FA-05 | Shared engine landing owns ghost/drop equality; scoring and timing publish together; no immediate lock or grounded-deadline reset |
| F-05–F-06 / FA-06 | Public value isolation, lifecycle, safe counters and collaborator consumption limits extend existing aggregate/error boundaries |
| F-07 / FA-07 | Keyboard/controller retains clock/focus ownership; view owns readable held/ghost information without simulation decisions |
| FA-08 | Static client, local assets, no production test hooks, baseline regression and accepted final document incorporation remain explicit |

Reviewed the delta map against B-02–B-05, T-01/T-03/T-04/T-06 and U-01/U-03/U-04. Exact rotation tables define project behavior without claiming external certification. Counter-safe hard drop, empty/occupied hold failure paths, source call ownership, paused/terminal observations and key-focus exclusions have assessable success/error contracts. Unchanged clear awards, board geometry and lifecycle policies are linked rather than duplicated. No implementation task hierarchy or physical source allocation is introduced.

Mechanical checks passed: sixteen transition rows in two tables; all eight clockwise/counterclockwise transitions represented exactly once per table; five offsets per row with origin first; eight feature acceptance IDs; no TBD/TODO placeholders; local Markdown links and whitespace checked before commit. Table validation checks completeness and shape, not independent runtime correctness.

No confirmed conformance defect remains. Design/AGENTS status and preparation-branch wording were clarified to identify active feature ownership and preserve the established initial-baseline branch policy. No main requirement, code or test was changed. No fabricated revision cycle or runtime pass is recorded.

## Limits and downstream effects

Concrete new SPEC defaults await user review: exact kick offsets, lazy Fisher–Yates call order/validation, Space and C/Shift mapping, snapshot field names, hard-drop fall-timer reset on positive descent, and held/ghost display semantics. These elaborate the accepted design without broadening its capabilities. FEATURE-PLAN and FEATURE-TASKS do not exist; no hosted feature objects have been projected. Main SPEC remains the complete baseline authority until accepted final feature incorporation. Baseline PLAN/TASKS completion evidence is historical and does not certify this unimplemented feature.
