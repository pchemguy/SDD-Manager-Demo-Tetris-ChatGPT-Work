# Component decomposition

The [architecture](ARCHITECTURE.md) defines three blocks. These logical components refine their responsibilities without prescribing file layout or delivery order. Interface names below describe design seams; SPEC will establish their precise public contracts.

## Game engine components

| Component | Responsibility and state | Collaborators / provided seam | Verification |
| --- | --- | --- | --- |
| Piece definitions | Tetromino occupancy, orientation transforms, and spawn representation; immutable data | Placement and session rules consume shapes | Verify each type/orientation and expected occupied cells |
| Board and placement rules | Settled cells; collision, bounds, merge, and row compaction; no clock or input ownership | Validate candidate placements and produce board changes for the session | Boundary/collision cases, single/multiple clears, stable compaction |
| Piece source | Supply tetromino identifiers; production-independent selection or test sequence | Session requests active and preview pieces | Controlled sequence and legal identifier checks |
| Game session | Sole aggregate state owner; commands, spawning, gravity, grounded timer, locking, clearing, progression, pause/restart, terminal state | Uses definitions, board operations, and piece source; provides command/update and snapshot seams | Deterministic gameplay scenarios, timing boundaries, invalid commands, terminal transitions |
| Progression rules | Pure score, level, and gravity-interval calculations; no mutable session ownership | Session supplies cleared lines and progression values | Formula boundaries after SPEC selects exact values |

Board operations and progression rules can be focused functions rather than mutable service objects. The game session coordinates each state transition so that board, active piece, preview, score, and timers remain coherent. Board helpers never call back into the session. Shared value types do not depend on browser code.

### Grounded timer collaboration

After any operation that can change placement, the session asks whether a downward placement is possible. A transition to grounded starts the lock timer for one full gravity interval. A grounded-to-grounded movement or rotation preserves it. A grounded-to-airborne transition clears it. Locking merges the active piece, clears completed rows, updates progression, and attempts to spawn the next piece; the renderer performs none of these decisions.

Tests should exercise contact caused by gravity, soft drop, and lateral/rotation changes, partial gravity intervals at contact, just-before/at-deadline locking, preserved timers while grounded, and fresh timers after becoming airborne. Event tie-breaking and restart/pause reset behavior require exact SPEC contracts.

## Browser controller components

| Component | Responsibility | Dependencies and boundary | Verification |
| --- | --- | --- | --- |
| Keyboard adapter | Translate keys into game/session commands and controlled repeat; release held input | Browser events and controller callbacks; no board mutation | Key mappings, repeat/release, focus and scroll behavior |
| Frame controller | Collect monotonic elapsed time, order commands/updates, and request rendering | Browser scheduling, game session, presentation | Explicit elapsed-time tests and real browser session flows |
| Application composition | Construct source/session/adapters, bind buttons, and manage lifecycle | All browser-side components | Startup, pause/resume, restart, and listener lifecycle |

Pause and focus behavior must coordinate keyboard state with time accounting so resuming does not inherit held input or unintentional background elapsed time. The exact policy is deferred to SPEC rather than inferred from browser animation scheduling.

## Presentation components

| Component | Responsibility | Inputs / outputs | Verification |
| --- | --- | --- | --- |
| Board renderer | Draw settled cells and active piece on Canvas | Snapshot plus display dimensions; no engine commands | Representative board states, scaling, and visibility |
| Status and preview view | Show score, level, lines, next piece, and session state | Snapshot; session action callbacks from buttons | State-to-display consistency and usable keyboard/button flows |

Presentation consumes consistent snapshots after updates. It must distinguish paused and game-over states without changing gameplay. Layout, colors, precise dimensions, accessible labels, and target browser behavior will be specified before implementation.

## Boundaries still requiring specification

SPEC owns rotation without wall kicks, spawn/game-over conditions, random-selection semantics, speed/scoring formulas, input repeat, invalid-action handling, snapshot isolation, and command/time event order. No proposed interface above establishes an implemented API or finished acceptance result.
