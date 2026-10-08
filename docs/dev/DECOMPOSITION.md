# Component decomposition

[Architecture](ARCHITECTURE.md) defines engine, browser coordination and presentation. These components refine logical ownership; SPEC owns observable contracts and layout owns files.

## Engine collaboration

| Component | Responsibility/state | Seam and verification |
| --- | --- | --- |
| Piece definitions | Immutable occupancy, bounding-square rotations and canonical spawn | Shape/orientation/spawn fixtures |
| Board operations | Visible bounds/collision, pure merge and stable row compaction | Independent boundary/clear fixtures |
| Piece source | Per-instance lazy bag/cursor, descending shuffle with injected randomness | Identifier source/factory; permutations/call counts/refill failures/restart |
| Rotation placement | Ordered translated orientation candidates and first valid selection; no mutable state | Tables plus wall/floor/stack/top/complete rejection |
| Landing placement | Greatest continuous legal descent, stopping at first obstruction | Shared ghost/drop value; cavity/stack/zero descent/input immutability |
| Game session | Sole mutable board/piece/held/eligibility/counter/time/lifecycle aggregate | Public commands, advance and detached snapshots; draw/reset/failure/terminal scenarios |
| Progression | Pure awards/level/gravity and exact counter/drop-score guards | Formula/overflow boundaries before aggregate publication |

Helpers depend on engine values/geometry/validation, never call back into the session and never own clocks. Hold exchanges types, initializes canonical incoming placement and coordinates preview drawing before publication. Only a continuing ordinary lock restores hold eligibility. Hard drop validates award before publishing destination; later ordinary time performs lock/clear/spawn.

After any placement change, the session checks downward support. Grounded-to-grounded preserves the captured interval; support loss clears it; new contact receives full G. Incoming held/ordinary spawn initializes contact from its placement. Ghost derives from current active/board through landing and consumes no source. Tests exercise gravity/soft/hard drop, kicked support loss, hold contact, pauses, exact deadlines and subdivision through public seams.

## Browser collaboration

| Component | Responsibility | Verification |
| --- | --- | --- |
| Keyboard adapter | Map physical codes, discrete hold/drop/rotation/lifecycle actions and controlled horizontal/soft-drop repeats | Fresh/native-repeat/focus exclusion, opposing/released keys, unchanged repeat episodes |
| Controller | One monotonic clock, advance before command, partition repeats, pause/focus/reset/error handling | Real sessions with explicit scheduling and production lifecycle/focus flows |
| Composition | Fresh bag factory, session/views, semantic buttons/listeners and single loop/disposal | Production start/restart/recovery and isolated source/display failures |

No browser component mutates gameplay snapshots. Pause/focus policies coordinate input reset with discarded browser clock debt; SPEC defines exact bounds and ordering. Error presentation stops input until successful restart.

## Presentation collaboration

| Component | Responsibility | Verification |
| --- | --- | --- |
| Board renderer | Settled cells, distinct outlined ghost, then filled active; device density/square cells | Production pixels and viewport/DPR screenshots including overlap/contact/pause |
| Preview renderer | Shared immutable orientation-zero next/held shape and type colors | Identifier/pixels; empty and retained held state |
| Status view | Score/lines/level, lifecycle and hold Available/Used/Unavailable; semantic buttons | DOM consistency/focus/native activation, runtime unavailability/recovery |

Presentation owns drawing/layout only. It retains paused observations, omits terminal ghost, preserves one next preview and labels meaning without color dependence. Player instructions explain all keys, once-per-lock hold and delayed hard drop. [SPEC](SPEC.md) owns detailed contracts and objective acceptance; no document review establishes runtime correctness by itself.
