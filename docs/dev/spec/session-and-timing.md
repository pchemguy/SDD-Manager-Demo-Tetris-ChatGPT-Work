# Session and timing

These contracts refine [SPEC](../SPEC.md) for the game session and its browser consumers in [DECOMPOSITION](../DECOMPOSITION.md). API names express required operations; physical modules belong to layout.

## T-01: session API and snapshots

Provide operations to start, restart, pause, resume, apply a gameplay command, advance elapsed milliseconds, and obtain a snapshot. Gameplay commands are left, right, rotate-clockwise, rotate-counterclockwise, and soft-drop. No hard-drop or hold command exists.

A snapshot contains status (`idle`, `running`, `paused`, `game-over`), the settled 20 × 10 board, active type/orientation/origin or null, next type or null, score, cleared lines, level, gravity interval, elapsed time since the last successful downward step/spawn, and grounded elapsed/interval or null. Returned nested data is detached from mutable engine state. Mutating one snapshot must not affect subsequent snapshots.

The source factory is injectable. The engine accesses neither browser globals nor an implicit clock/random source. Given identical sources and input sequences, sessions produce equal snapshots, including timing state. Equivalent subdivisions use the T-03 precision policy.

## T-02: lifecycle

Creation is idle with empty board, score/lines 0, level 1, no active piece, and no preview; no source draw occurs. Start initializes a running session from idle; otherwise it is a no-op. Restart initializes a fresh running session from any status with empty board and reset progression/timers/source instance.

Pause changes running to paused; resume changes paused to running. Other pause/resume transitions are no-ops. Both preserve gameplay state/timers. Gameplay commands and elapsed-time progression are ignored outside running after input validation. Game over is terminal until restart; start does not restart game over.

## T-03: gravity and elapsed time

Advance accepts finite real milliseconds in the inclusive range 0–60000. While running, process every due event in simulated chronological order, retaining fractional milliseconds and remaining time across lock/clear/spawn. Advancing a + b has the same effect as advancing a then b when each call is valid and no commands intervene, subject to floating-point precision. Integer-millisecond acceptance scenarios require identical snapshots. Fractional scenarios compare timing fields within 0.000001 ms and use event boundaries separated from that tolerance; piece/board/counter/status fields must be identical. Exact-deadline acceptance uses integer-millisecond inputs. Stop processing gameplay events when game over occurs; unused time is discarded.

The fall timer starts at 0 on spawn. At G milliseconds it attempts a one-row downward move. A successful downward move resets the fall timer to 0 and reevaluates groundedness. A failed gravity attempt keeps placement unchanged and resets the fall timer to 0. Successful soft drop also resets the fall timer to 0; blocked soft drop does not reset it. Left/right and rotation preserve the fall timer.

Event-driven processing must use contact time within an advance, not the end of the supplied delta, to start lock delay. Example: with G = 1000 and fall timer 900, a 500 ms advance that causes contact at the next gravity step leaves grounded elapsed at 400 ms, without locking.

## T-04: grounded timer

Check groundedness on spawn and after each successful placement change. First contact starts elapsed 0 and captures one full G as the lock interval. A piece that spawns grounded starts this timer immediately. Airborne time has no grounded timer.

At grounded elapsed G, lock the piece even if its ordinary fall timer has a different phase. Grounded movement/rotation preserves elapsed and deadline. Blocked commands also preserve them. Becoming airborne clears the timer; contact again starts elapsed 0 with a full G. Soft drop never shortens the delay, forces locking, or changes a captured interval.

Pause preserves both timers and supplies no simulation time; resumption continues the remaining delay. Restart and every new spawn reset fall timing and initialize groundedness from the new placement.

## T-05: event order

At an exact simulated timestamp, process a due lock before a due gravity event. Lock/clear/progression/spawn is one coherent transition. Timers belonging to the locked piece are discarded; the new piece starts fresh. Any remaining duration belongs to the new piece.

The browser controller first advances the engine to an input event's elapsed timestamp, then applies the command. Therefore a command exactly at a lock deadline cannot rescue the expiring piece; it acts on the newly spawned piece if the session remains running. Multiple input commands at the same timestamp retain browser dispatch order. Snapshot/rendering occurs after the completed transition/command, never between merge and spawn.

## T-06: rejection and failure semantics

NaN, infinity, nonnumeric elapsed input, or an unknown command identifier raises TypeError; finite elapsed values outside the allowed range raise RangeError. Validate even outside running. Rejected input changes no session state and performs no source calls. Ordinary blocked moves/rotations and inappropriate lifecycle transitions are valid no-ops.

A source factory/source exception propagates; a value outside the seven identifiers raises TypeError. A failing start/restart/lock transition does not publish partial board/progression/piece changes. The source collaborator may have consumed values before failing; retry is not guaranteed to reproduce its sequence. The browser must pause/stop input and show a visible runtime-error status with a restart option, rather than silently continue from a failed transition. Successful restart with a fresh valid factory restores normal play.

Engine state must remain internally coherent after rejection or collaborator failure. Rendering failures must not feed state mutations back into the engine. A Canvas initialization failure produces a visible unsupported-display message instead of an active invisible game.
