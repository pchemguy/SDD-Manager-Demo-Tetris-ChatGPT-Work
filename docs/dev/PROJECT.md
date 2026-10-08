# Project brief

## Purpose and audience

Build a playable single-player browser Tetris game in TypeScript. The repository demonstrates SDD Manager development in ChatGPT Work using a standard cloud sandbox. Desktop keyboard players are the intended audience; accepted design, contracts, delivery and verification evidence remain inspectable.

The requested conversation configuration is ChatGPT Work web 6.1 Sol Medium; the assistant cannot verify the interface's model selection. The loaded workflow package is SDD Manager 0.15.0. Context disclosure is retained in the root README and AI disclosure.

## Accepted scope

- A 10-column, 20-row visible board with all seven tetrominoes and no hidden rows.
- Shuffled seven-bag production sources with injectable deterministic collaborators.
- Movement, clockwise/counterclockwise rotation with ordered kicks, soft drop and hard drop.
- Once-per-lock hold, derived ghost landing and one next preview.
- Gravity, delayed locking, row clearing, score/level/speed progression.
- Pause/resume, restart, game over and explicit error recovery.
- Canvas drawing and semantic DOM information with a deterministic engine separated from browser time/input and presentation.

First contact receives one full gravity interval before locking. Grounded manipulation and zero-distance drop preserve the deadline; losing support clears it and recontact begins fresh. Positive hard drop lands and scores while ordinary delayed locking remains in effect. Pause preserves simulation timers. These accepted rules govern every capability.

## Non-goals and success

Exclude multiplayer, accounts, backend services, leaderboards, persistent scores, touch/audio, external licensed branding/assets, selectable rule modes, 180-degree rotation, extra previews and spin/combo bonuses. Static distribution requires no gameplay backend; hosted site deployment is a separate action.

Success means usable play through all required controls, reproducible engine/controller and production browser acceptance, clean locked setup and coherent evidence. [SPEC](SPEC.md) owns exact geometry, kicks, source/hold/drop behavior, progression, timing, controls, failures and acceptance. [Architecture](ARCHITECTURE.md) and [decomposition](DECOMPOSITION.md) own responsibility boundaries; [PLAN](PLAN.md), [layout](layout.md) and their adjacent QC reports govern delivery.

## Repository and workflow

Repository: https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work. Confirmed integration target: `main`. Inline execution and maintained GitHub task/label/milestone tracking are established. The baseline evidence is retained in [phase 1 reports](reports/phases/1); [modern campaign](features/001_3fd5011-modern-piece-controls/README.md) records its full baseline checkpoint, working ref and provenance. Executable ownership and selected progress belong only in the owning task list, without a separate transaction journal.
