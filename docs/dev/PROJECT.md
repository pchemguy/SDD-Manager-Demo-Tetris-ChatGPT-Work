# Project brief

## Purpose and audience

Build a playable single-player browser Tetris game in TypeScript. The repository also demonstrates a greenfield SDD Manager workflow in ChatGPT Work using a standard cloud computer sandbox. The initial player audience is desktop users with a keyboard; development evidence should make design, acceptance, delivery, and verification inspectable.

The requested conversation configuration is ChatGPT Work web 6.1 Sol Medium. The assistant cannot verify the interface's model selection. SDD Manager 0.15.0 is the loaded workflow package.

## Accepted baseline scope

- A 10-column, 20-row visible board and all seven tetromino types.
- Independently randomized pieces, without seven-bag behavior.
- Left/right movement, clockwise/counterclockwise rotation, and soft drop.
- Gravity, piece locking, completed-row clearing, scoring, and increasing speed.
- One next-piece preview, pause/resume, restart, and game over.
- Canvas rendering with a deterministic game engine separated from browser input, elapsed-time collection, and display.

A grounded piece receives one full gravity interval before locking, measured from first contact rather than the next scheduled gravity tick. Soft drop does not shorten the interval. Movement and rotation do not reset the timer while the piece remains grounded. Becoming airborne clears it; grounding again starts a fresh full interval. These rules were explicitly accepted by the user.

## Expansion and non-goals

Hold, ghost piece, seven-bag randomization, wall kicks, and hard drop belong to a subsequent SDD feature expansion. The baseline architecture supports localized extension, but the MVP does not implement those capabilities in anticipation.

The baseline excludes multiplayer, accounts, a server, online leaderboards, persistent scores, touch controls, audio, and licensed branding or assets. The user accepted these design boundaries.

## Success and preparation decisions

Success means a playable baseline with reproducible engine checks, a usable browser interface, and repository evidence connecting accepted requirements to verified delivery. The game is intended to run entirely in the browser and be distributable as static files; hosting is a separate deployment decision.

The accepted [specification](SPEC.md) defines exact rotation matrices and spawn positions, scoring and speed formulas, keyboard bindings/repeat behavior, pause/focus timing, game-over boundaries, simultaneous event ordering, and target browser support.

## Preparation context

Repository: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work. Initial checkpoint: `1261ab9cdd4a20a6b3ef2ab1d12ba50e636167c0`. Default integration branch: `main`. Preparation branch: `design-docs`.

GitHub plugin repository reads, the HTTPS Git clone, and preparation publication succeeded. The user confirmed GitHub task/label/milestone tracking for the baseline lifecycle, including verification-based completion and reconciliation. No hosted tracking objects have been created. Counts and eligible phase scope will come from the accepted PLAN and TASKS; only the eligible phase will be projected.

Design and specification are accepted. PLAN, layout, TASKS, and product implementation remain to be prepared. See [architecture](ARCHITECTURE.md), [decomposition](DECOMPOSITION.md), and the [SPEC review](SPEC-REVIEW-REPORT.md).
