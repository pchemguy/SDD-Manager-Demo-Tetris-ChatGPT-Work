# Baseline Tetris specification

## Purpose, scope, and owners

The user accepted this written specification, including geometry, scoring, speed, input, and focus policy. Its preparation conformance gate is recorded in the adjacent review report.

Build a single-player keyboard-controlled browser Tetris game in TypeScript. The baseline includes seven independently selected tetrominoes, a 10 × 20 board, rotation, movement, soft drop, gravity, delayed locking, clearing, score/level progression, one next preview, pause/resume, restart, and game over. Hold, ghost piece, seven-bag randomization, wall kicks, and hard drop are excluded. No server, account, persistence, touch control, or audio is required.

The [project brief](PROJECT.md), [architecture](ARCHITECTURE.md), and [decomposition](DECOMPOSITION.md) govern scope and responsibilities. The engine owns state/rules/time accumulation; browser adapters supply commands and elapsed time; presentation consumes isolated snapshots. This specification describes intended behavior, not implemented functionality or official Tetris Guideline compliance.

## Canonical contract map

| Requirements | Canonical owner | Responsible components |
| --- | --- | --- |
| B-01–B-06: coordinates, shapes, placement, source, lock/clear/spawn, progression | [Board and pieces](spec/board-and-pieces.md) | Piece definitions, board rules, piece source, progression, session |
| T-01–T-06: API, lifecycle, gravity, lock timing, event order, errors | [Session and timing](spec/session-and-timing.md) | Game session; controller supplies ordered commands/time |
| U-01–U-05: keys/repeat, frame/focus policy, display, accessibility, delivery | [Browser interaction](spec/browser-interaction.md) | Keyboard/frame/composition adapters, Canvas and status views |

Grounded means that moving the active piece down one row would fail placement validation. Gravity interval means the current level's ordinary fall interval, independent of soft drop. A snapshot is a detached observation of engine state; modifying it cannot modify the session.

## System-wide guarantees

For identical initial conditions, injected piece sequences, command sequences, and elapsed-time inputs, the engine produces identical snapshots. Subdivision equivalence for elapsed time uses the numeric precision policy in T-03. It runs without DOM, Canvas, network, browser timers, or implicit random calls. Ordinary blocked placements are no-ops; invalid API input is rejected explicitly by the timing contract.

Lock delay is one full gravity interval starting at first contact, regardless of the gravity tick phase. Soft drop does not shorten it. Grounded movement/rotation does not reset it. Becoming airborne clears it; subsequent grounding starts a fresh interval. Pause freezes simulation time and resume introduces no background catch-up.

The distribution is a static browser application with no backend dependency. Chromium-based desktop browsers are the acceptance target; testing in the cloud Chromium browser supplies browser acceptance evidence. Compatibility with other browsers is best effort, not an unverified release claim.

## End-to-end acceptance

| Acceptance | Observable outcome and boundaries |
| --- | --- |
| A-01: playable session | Start from idle; see a valid active piece and one preview; move, rotate, soft drop, fall, lock, clear, and continue through spawning without invalid occupied cells |
| A-02: placement and termination | Walls/floor/settled cells reject moves and rotations without kicks; full rows compact correctly; blocked spawn after clearing enters game over with no active piece |
| A-03: full grounded interval | Ground at a partial gravity phase; verify no lock before a complete G has elapsed and lock at G; include successful and failed soft drop, grounded adjustments, and becoming airborne/re-grounding |
| A-04: timing reproducibility | Equivalent subdivision of elapsed time without interleaved commands produces the same state; locking precedes commands at the exact deadline; remaining time continues through newly spawned pieces |
| A-05: lifecycle and focus | Pause freezes all gameplay time, resume preserves timers, blur/hidden/long frame gap pauses without catch-up, restart clears board/progression/timers, and game over ignores gameplay commands |
| A-06: progression and source | Verify every line-clear score and level threshold, gravity floor, soft-drop points only on successful descent, one preview, and injected repeated-piece sequences without seven-bag restrictions |
| A-07: browser usability | Board, active piece, preview, score/lines/level/status, buttons, and instructions remain readable at 800 × 600 and 1280 × 720; keyboard does not scroll gameplay; semantic controls operate by keyboard |
| A-08: delivery and scope | A production static build starts through an HTTP server and supports A-01–A-07; no excluded feature or runtime server/account dependency is present |

Acceptance requires meaningful engine and browser evidence selected in PLAN/TASKS. Document review does not establish executable acceptance. See the [SPEC review report](SPEC-REVIEW-REPORT.md) for preparation readiness.
