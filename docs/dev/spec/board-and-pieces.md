# Board and pieces

These contracts refine [SPEC](../SPEC.md) for piece definitions, board/placement operations, source, progression, and session integration in [DECOMPOSITION](../DECOMPOSITION.md).

## B-01: coordinates and board

The board contains 20 rows of 10 cells. Coordinates increase rightward (x) and downward (y), with top-left (0, 0). Each settled cell is empty or one of I, J, L, O, S, T, Z. There are no hidden rows. The active piece is represented separately from settled cells.

A placement is valid exactly when every occupied shape cell lies at 0 ≤ x < 10 and 0 ≤ y < 20 and overlaps no settled cell. Empty cells in a shape's bounding square do not cause collision or bounds rejection. Failed movement/rotation leaves active position/orientation, board, score, and timers unchanged.

## B-02: shapes, rotation, and spawn

Rows in the following table are slash-separated, top to bottom; `X` denotes an occupied cell and `.` an empty cell. Orientation 0 uses the displayed square; the origin is its top-left. Clockwise rotation maps local (x, y) to (n − 1 − y, x) within its n × n square. Counterclockwise is its inverse. Orientation cycles modulo 4. O keeps its shape and orientation 0 for both rotation commands.

| Type | n | Orientation 0 | Spawn origin |
| --- | --- | --- | --- |
| I | 4 | `..../XXXX/..../....` | (3, 0) |
| J | 3 | `X../XXX/...` | (3, 0) |
| L | 3 | `..X/XXX/...` | (3, 0) |
| O | 2 | `XX/XX` | (4, 0) |
| S | 3 | `.XX/XX./...` | (3, 0) |
| T | 3 | `.X./XXX/...` | (3, 0) |
| Z | 3 | `XX./.XX/...` | (3, 0) |

Rotation retains the origin and succeeds only if the resulting placement is valid. No translation, wall kick, floor kick, or spawn collision adjustment is attempted. Left/right and soft drop propose exactly one cell of displacement.

## B-03: source and preview

Production chooses each requested identifier independently with equal probability among the seven types. Repeated identical identifiers are permitted; there is no seven-bag or avoidance rule. Source calls occur only when starting/restarting a session or replenishing the preview after a lock. Rendering, failed commands, time with no spawn, and preview observation do not draw pieces.

Start/restart draws the active identifier followed by the preview identifier. Each lock promotes the preview to the spawn candidate and draws one replacement preview, including when that candidate is blocked. Tests can inject a deterministic source; no statistical randomness test is required to prove individual gameplay rules. Restart uses a fresh source instance from the supplied source factory; a deterministic factory can return the same sequence each time.

## B-04: locking, clearing, and spawning

At the lock deadline, merge the active piece's four cells into settled cells. Find all full rows and remove them simultaneously. Remaining rows preserve top-to-bottom order; prepend the same number of empty rows. Update score/lines/level, then spawn the preview in orientation 0 at its type's spawn origin and replenish preview.

If that spawn placement is invalid, enter game over and expose no active piece; retain the resulting settled board, score, lines, level, and preview. Otherwise initialize the active piece's timing and immediately check groundedness. Spawn collision is the sole gameplay game-over criterion; a high stack that leaves the spawn placement valid continues.

## B-05: score and level

Score and cleared-line count start at 0; level starts at 1. A successful soft-drop command adds 1 point per one-row descent. Ordinary gravity, blocked soft drop, movement, and rotation add no points.

| Rows cleared by one lock | Points multiplied by the level immediately before this clear |
| --- | --- |
| 0 | 0 |
| 1 | 100 |
| 2 | 300 |
| 3 | 500 |
| 4 | 800 |

Add the clear award, add cleared rows to total lines, then set level = 1 + floor(total lines / 10). There are no combo, back-to-back, spin, or perfect-clear bonuses. Values are nonnegative integers; score and counters must remain exact within JavaScript safe-integer range. Reject a counter-overflowing operation with RangeError before changing session state.

## B-06: gravity progression

Ordinary gravity interval in milliseconds is G(level) = max(100, 1000 − 100 × (level − 1)). Thus levels 1, 2, 9, and 10 use 1000, 900, 200, and 100 ms; subsequent levels remain at 100 ms. A grounded episode captures its lock interval from the level at contact. Level changes only during locking/clearing, so it cannot change an existing active piece's deadline.

The soft-drop command cadence is specified by [browser interaction](browser-interaction.md). It does not change G or the captured lock interval.
