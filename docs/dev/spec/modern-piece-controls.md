# Modern piece controls

These canonical F-01–F-07 and FA-01–FA-08 contracts refine [SPEC](../SPEC.md). Unchanged geometry, progression, chronology and browser guarantees remain in the adjacent board, timing and browser children. They describe the complete intended game, without external certification.

## F-01: seven-bag source

Provide `sevenBagPieceSource(random: () => number): PieceSource`, using the existing source/factory injection boundary. Production composition supplies this source with browser-injected randomness. Construction draws no randomness or piece. Each bag begins as `[I, J, L, O, S, T, Z]`; shuffle with descending Fisher–Yates: for i = 6 through 1, obtain r, set j = floor(r × (i + 1)), then swap entries i and j. Return entries in index order 0 through 6, preparing the next bag only when another piece is requested after exhaustion.

Each r must be a finite number with 0 ≤ r < 1; other values raise TypeError. Each complete bag uses exactly six random calls. A failed bag generation publishes no partial bag/cursor; consumed collaborator randomness is not rolled back. Source exceptions propagate. Uniform independent supplied randomness yields the intended uniform permutation; acceptance uses deterministic permutations rather than a statistical quota.

Every aligned group of seven source outputs contains every identifier exactly once. Identical types may appear across bag boundaries. Injected test sources may still repeat arbitrarily: GameSession does not enforce bag semantics on collaborators. Restart constructs a fresh source and fresh bag state. Observation, rotation, movement, failed hold and hard drop never draw identifiers.

Start/restart draws active then next. Each lock promotes next and draws one replacement, including blocked spawn. Empty hold promotes next and draws one replacement, including blocked spawn; occupied hold performs no draw. Preview is always exactly one identifier while initialized, including game over.

## F-02: ordered rotation kicks

Use baseline bounding-square geometry, orientation values 0/1/2/3 and spawn origins. For each clockwise/counterclockwise rotation, compute target orientation modulo four. Test candidate origins current origin + (dx, dy) in the displayed order; publish the first candidate whose occupied cells satisfy B-01. Coordinates increase rightward/downward. Offsets are incremental from the original origin, never accumulated from a preceding failed candidate.

Each table entry is normative project data. The first test retains the origin. This specifies the selected kick behavior directly without asserting external certification. Negative candidate origins are allowed when all occupied cells remain within the visible board; occupied cells above row zero remain invalid. No hidden rows or separate spawn kick is introduced.

### J, L, S, T and Z

| Transition | Ordered (dx, dy) candidates |
| --- | --- |
| 0 → 1 | (0,0), (-1,0), (-1,-1), (0,2), (-1,2) |
| 1 → 0 | (0,0), (1,0), (1,1), (0,-2), (1,-2) |
| 1 → 2 | (0,0), (1,0), (1,1), (0,-2), (1,-2) |
| 2 → 1 | (0,0), (-1,0), (-1,-1), (0,2), (-1,2) |
| 2 → 3 | (0,0), (1,0), (1,-1), (0,2), (1,2) |
| 3 → 2 | (0,0), (-1,0), (-1,1), (0,-2), (-1,-2) |
| 3 → 0 | (0,0), (-1,0), (-1,1), (0,-2), (-1,-2) |
| 0 → 3 | (0,0), (1,0), (1,-1), (0,2), (1,2) |

### I

| Transition | Ordered (dx, dy) candidates |
| --- | --- |
| 0 → 1 | (0,0), (-2,0), (1,0), (-2,1), (1,-2) |
| 1 → 0 | (0,0), (2,0), (-1,0), (2,-1), (-1,2) |
| 1 → 2 | (0,0), (-1,0), (2,0), (-1,-2), (2,1) |
| 2 → 1 | (0,0), (1,0), (-2,0), (1,2), (-2,-1) |
| 2 → 3 | (0,0), (2,0), (-1,0), (2,-1), (-1,2) |
| 3 → 2 | (0,0), (-2,0), (1,0), (-2,1), (1,-2) |
| 3 → 0 | (0,0), (1,0), (-2,0), (1,2), (-2,-1) |
| 0 → 3 | (0,0), (-1,0), (2,0), (-1,-2), (2,1) |

O rotation is a complete no-op and retains orientation 0. If every candidate fails, the full session snapshot remains unchanged. Successful rotation preserves fall elapsed time and invokes existing contact policy: grounded-to-grounded preserves lock deadline; support loss clears it; fresh contact starts a full G. Rotation awards no points and consumes no source values.

## F-03: hold

The `hold` command is valid but ignored outside running or when hold eligibility is exhausted. Each initialized active-piece episode begins eligible after start/restart or an ordinary lock/spawn. The first successful hold consumes eligibility; swapping does not restore it. Only a later lock that continues play restores eligibility. Losing support, rotations, hard drop, pause/resume and line-free waiting do not restore it.

With empty hold: save outgoing active type, promote next to incoming active, and draw one replacement next. With occupied hold: swap outgoing and held identifiers; preserve next and make no source call. Store only type, never placement/orientation. Incoming active always has orientation 0 and canonical spawn origin. Board, score, lines, level and gravity interval remain unchanged. Initialize fall elapsed to 0 and groundedness from the incoming placement; grounded incoming pieces receive a fresh full G.

If incoming spawn is blocked, publish the hold exchange and any required preview replacement coherently, enter game over with active/ghost null and hold unavailable, and retain board/progression/held/next. No merge, clear or kick occurs during hold. On source failure or invalid draw during empty hold, preserve the entire published pre-command snapshot, including eligibility and timers; source consumption need not roll back. Restart clears held type and restores eligibility for the new active piece.

## F-04: hard drop and ghost landing

Landing is the greatest integer d ≥ 0 such that each one-row step from active to active + (0,d) is valid. Stop at the first blocked downward step; do not search beyond an obstruction. Type, orientation and x are unchanged. The same engine placement calculation supplies ghost observation and hard-drop destination.

`hard-drop` is valid but ignored outside running. For positive d, atomically move active down d, add 2 × d to score through the existing safe-counter guard, reset fall elapsed to 0 and establish contact. Board, next, held, eligibility, lines and level do not change. There is no merge, clear, preview promotion, source draw or immediate lock. At first contact grounded elapsed is 0 with captured G. A later time advance performs ordinary delayed locking.

For d = 0, hard drop is a complete no-op: score, fall elapsed and existing grounded elapsed/interval remain unchanged. Repeated zero-distance drops cannot extend a deadline. A lateral move or kicked rotation after landing may remove support under T-04; recontact then starts a fresh interval. A drop at the exact lock deadline is applied after the due lock, to the new active piece if still running, under T-05.

Ghost is a detached ActivePiece value at landing, using the active type/orientation/x. Running and paused sessions with active pieces expose it; idle and game over expose null. Observing ghost neither changes state nor invokes source/randomness. Recompute from current placement/board rather than retaining independently mutable ghost state. At contact ghost coincides with active. Ghost represents position only, never a commitment to lock there.

## F-05: public observations and lifecycle

Extend GameCommand with `hold` and `hard-drop`; existing commands retain their identifiers. Extend GameSnapshot with:

| Field | Contract |
| --- | --- |
| `held: PieceType | null` | Null before first hold and after restart; held identifier retained during pause and game over |
| `holdAvailable: boolean` | True exactly when status is running or paused, active exists and episode remains eligible; false in idle/game over |
| `ghost: ActivePiece | null` | Derived landing observation under F-04, detached with every other nested snapshot value |

Paused holdAvailable describes eligibility after resumption, not permission to act while paused. Commands remain no-ops in paused/game-over/idle after identifier validation. Pause preserves feature values and timers. Construction remains idle without source/random calls. Source-factory injection remains supported with deterministic non-bag test sequences. No persisted format or gameplay save migration is required.

## F-06: errors and atomicity

Unknown command validation and elapsed-time rejection retain T-06. Hard-drop counter overflow raises RangeError before placement, score or timing publishes. Empty-hold collaborator failure raises its original exception, or TypeError for an invalid identifier, before any hold/active/preview/eligibility/timer update publishes. Bag random validation follows F-01. Ordinary exhausted hold, blocked rotations and zero-distance drop are valid no-ops.

Rendering/initialization errors use existing visible error and restart handling; no view may mutate the engine. A successful restart constructs a fresh valid source and clears hold/bag/session state. Error recovery does not claim rollback of consumed collaborator values. No new persistent state, network lifecycle or backend resource is introduced.

## F-07: browser controls and display

Space maps to hard drop; C or either Shift key maps to hold. These are discrete fresh-keydown actions, with native repeat ignored. Existing focus rules apply: recognized gameplay keys prevent default scrolling on game/noninteractive surface while running; buttons, links and editable controls retain native behavior. Space on a focused semantic button activates that button without also dropping a piece. Hold/drop have no synthetic repeat deadline and do not clear existing horizontal/soft-drop repeat episodes. Pause/restart/game-over/focus-loss policies reset held input as already specified. Advance-before-input and simultaneous ordering remain unchanged.

Draw ghost after settled cells and before active cells, using an outlined or translucent style visibly distinguishable from filled pieces. Settled/active cells remain readable at overlap; a coincident ghost must not obscure active cells. Type colors remain consistent. Paused retains ghost/held display with visible paused status. Idle/game over has no ghost. Render a labeled Hold panel with held identifier and canonical orientation-zero shape; empty hold displays None and no shape. Display Available or Used for eligible/ineligible running or paused pieces; display Unavailable in idle/game over. Labels convey meaning without relying on color. A runtime error shows Unavailable even if the stopped engine snapshot retains eligibility.

Retain one next preview. Visible instructions explain C/Shift, Space, hold once per lock and full-interval delayed locking after hard drop. Added display fits existing 800 × 600 and 1280 × 720 viewport obligations at DPR 1/2, without horizontal scrolling or overlap. Semantic lifecycle buttons, focus indication, Canvas accessible text and polite lifecycle announcements remain; no per-frame ghost/hold availability announcement is required. No extra clickable gameplay controls or accessibility certification is introduced.

## Feature acceptance

| ID | Required observable evidence |
| --- | --- |
| FA-01: bags | Known random sequence yields independently computed permutation; multiple complete bags each contain all seven; boundary repeat allowed; lazy six-call generation, fresh restart, rejection/exception and injected repeated-source compatibility |
| FA-02: kicks | Every transition in both tables matches independently enumerated expected offsets; legal first candidate wins, later candidates can succeed; wall/floor/stack and occupied-above-top rejection, blocked snapshot equality, O no-op and contact preservation/support loss |
| FA-03: hold | Empty promotion/draw and occupied no-draw swap; canonical reset; one hold until lock; restart reset; blocked incoming spawn; failed source preserves whole snapshot; score/board unchanged |
| FA-04: drop | Ghost/drop equality across empty/stacked/cavity boards, exact 2d award; no source/merge/clear/immediate lock; positive descent resets fall only; zero distance preserves whole snapshot; overflow rejects atomically |
| FA-05: timing | Partial gravity phase to hard-drop contact gives full G; at G−1 no lock and at G lock; partially elapsed grounded drop preserves deadline; kicked support loss/recontact; held spawn initializes timing; pause preserves it; deadline input ordering and subdivision remain correct |
| FA-06: observations | Detached feature values, source-free repeated snapshots, paused eligibility/ghost, null idle/terminal ghost, retained held/next terminal observations and coherent restart/error recovery |
| FA-07: production browser | Actual hold/drop keys and native-focus exclusions; visible ghost/held identifiers/shapes and eligibility; one next preview; resize/DPR readability, pause/restart/error recovery, no runtime remote requests or production test hooks |
| FA-08: coherent distribution | Static build and reproducible locked setup remain; affected baseline A-01–A-08 obligations pass under declared deltas; documentation explains all controls, awards and delayed locking; complete accepted feature sources incorporated before final feature integration |

Acceptance evidence is recorded by the owning tasks and implementation reports; document conformance does not substitute for runtime verification.
