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

The baseline excludes multiplayer, accounts, a server, online leaderboards, persistent scores, touch controls, audio, and licensed branding or assets. These exclusions are design proposals for a focused desktop MVP, subject to design review.

## Success and preparation decisions

Success means a playable baseline with reproducible engine checks, a usable browser interface, and repository evidence connecting accepted requirements to verified delivery. The game is intended to run entirely in the browser and be distributable as static files; hosting is a separate deployment decision.

The next specification stage must settle exact rotation matrices and spawn positions, scoring and speed formulas, keyboard bindings/repeat behavior, pause/focus timing, game-over boundaries, simultaneous event ordering, and target browser support. These details are not implemented contracts yet.

## Preparation context

Repository: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work. Initial checkpoint: `1261ab9cdd4a20a6b3ef2ab1d12ba50e636167c0`. Default integration branch: `main`. Preparation branch: `design-docs`.

GitHub plugin repository reads and the HTTPS Git clone succeeded. The plugin reports write permission; no hosted tracking objects have been created. GitHub task/label/milestone tracking is recommended, with user confirmation pending for the baseline lifecycle. Counts and eligible phase scope will come from the accepted PLAN and TASKS.

Only design preparation is recorded here. SPEC, PLAN, layout, TASKS, and product implementation remain to be prepared. See [architecture](ARCHITECTURE.md) and [decomposition](DECOMPOSITION.md).
