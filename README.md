# Browser Tetris

A single-player browser Tetris project written in TypeScript, demonstrating practical use of specification-driven development with SDD Manager in ChatGPT Work.

The demo context contained several other activated plugins and skills in addition to SDD Manager. The global context also contained information from prior uses of the Tetris model, including earlier Tetris-development conversations. These contextual inputs could influence development decisions and outputs; this demo does not isolate the contribution of SDD Manager.

The project is in design preparation. No game implementation or runnable application is present.

The baseline MVP covers movement, rotation, soft drop, line clearing, scoring, increasing speed, next-piece preview, pause, restart, and game over. A grounded piece receives one full gravity interval before locking. Hold, ghost piece, seven-bag randomization, wall kicks, and hard drop are reserved for a subsequent feature expansion.

Start with the [project brief](docs/dev/PROJECT.md), [architecture](docs/dev/ARCHITECTURE.md), [component decomposition](docs/dev/DECOMPOSITION.md), and [specification](docs/dev/SPEC.md). The [delivery plan](docs/dev/PLAN.md) and [layout](docs/dev/layout.md) describe intended implementation. Adjacent [SPEC review](docs/dev/SPEC-REVIEW-REPORT.md) and [PLAN review](docs/dev/PLAN-REVIEW-REPORT.md) record preparation readiness. Agent workflow guidance is in [AGENTS.md](AGENTS.md).

Development uses [SDD Manager](SDD-MANAGER.md). See the [AI-assisted development disclosure](AI_DISCLOSURE.md). The bundled disclosure describes the development lifecycle; implemented stages and verification are established by repository evidence.
