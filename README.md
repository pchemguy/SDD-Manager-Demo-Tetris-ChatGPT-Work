# Browser Tetris

A single-player browser Tetris project written in TypeScript, demonstrating practical use of specification-driven development with SDD Manager in ChatGPT Work.

The demo context contained several other activated plugins and skills in addition to SDD Manager. The global context also contained information from prior uses of the Tetris model, including earlier Tetris-development conversations. These contextual inputs could influence development decisions and outputs; this demo does not isolate the contribution of SDD Manager.

The first playable slice is under implementation: movement, rotation, gravity, locking, clearing, spawn/game-over and start/restart are present. Scoring/speed, soft drop, next preview, pause and complete input/display policies remain for milestones 1.2–1.3. Browser acceptance is pending; TASKS owns verified completion.

Use Node.js 24 and run `npm ci`, then `npm run dev -- --host 127.0.0.1`. Run `npm run test` and `npm run typecheck` for current engine/controller checks. `npm run build` creates static output; `npm run preview -- --host 127.0.0.1` serves it over HTTP. `npm run test:e2e` requires a provisioned Chromium browser.

The baseline MVP covers movement, rotation, soft drop, line clearing, scoring, increasing speed, next-piece preview, pause, restart, and game over. A grounded piece receives one full gravity interval before locking. Hold, ghost piece, seven-bag randomization, wall kicks, and hard drop are reserved for a subsequent feature expansion.

Start with the [project brief](docs/dev/PROJECT.md), [architecture](docs/dev/ARCHITECTURE.md), [component decomposition](docs/dev/DECOMPOSITION.md), and [specification](docs/dev/SPEC.md). The [delivery plan](docs/dev/PLAN.md) and [layout](docs/dev/layout.md) describe intended implementation. Adjacent [SPEC review](docs/dev/SPEC-REVIEW-REPORT.md) and [PLAN review](docs/dev/PLAN-REVIEW-REPORT.md) record preparation readiness. Agent workflow guidance is in [AGENTS.md](AGENTS.md).

The [task hierarchy](docs/dev/TASKS.md) and [TASKS review](docs/dev/TASKS-REVIEW-REPORT.md) define executable work and readiness. Implementation is selected for inline execution in the same conversation using SDD checkpoints and reviews.

Development uses [SDD Manager](SDD-MANAGER.md). See the [AI-assisted development disclosure](AI_DISCLOSURE.md). The bundled disclosure describes the development lifecycle; implemented stages and verification are established by repository evidence.
