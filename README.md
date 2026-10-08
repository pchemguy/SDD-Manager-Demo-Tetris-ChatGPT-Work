# Browser Tetris

A classic single-player Tetris game in TypeScript and Canvas, developed as a practical SDD Manager demo in the standard ChatGPT Work cloud sandbox. The complete baseline is verified and integrated on `main`; [TASKS](docs/dev/TASKS.md) and the [implementation report](docs/dev/reports/IMPLEMENTATION-REPORT.md) record completion. Modern features are a later SDD expansion.

The demo context contained several other activated plugins and skills in addition to SDD Manager. The global context also contained information from prior uses of the Tetris model, including earlier Tetris-development conversations. These contextual inputs could influence development decisions and outputs; this demo does not isolate the contribution of SDD Manager.

The [modern feature campaign](docs/dev/features/001_3fd5011-modern-piece-controls/README.md) prepares hold, ghost, seven-bag randomization, wall kicks and hard drop. Its design is accepted and its feature SPEC is prepared for review; the playable code on this branch remains the completed baseline.

## Run locally

Validated with Node.js **24.19.0** and npm **11.9.0**. Install the locked development tools, then start the HTTP development server:

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

Open the local URL printed by Vite. For the production distribution:

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

The build creates `dist/`: static HTML, JavaScript and CSS. Serve it with any static HTTP server; it needs no gameplay backend, remote assets or runtime Node process. Opening `index.html` through `file://` is unsupported. Explicit loopback avoids a cloud-sandbox interface-enumeration limitation observed with `--host 0.0.0.0`. Publishing a hosted site is separate from this demo.

## Play

| Input | Action |
| --- | --- |
| ← / → | Move; repeat after 150 ms, then every 50 ms |
| ↓ | Soft drop; one point per successful row, 50 ms repeat |
| ↑ / X | Rotate clockwise |
| Z | Rotate counterclockwise |
| P / Escape | Pause / resume |
| Enter | Start from Ready; restart after Game over |
| Start / Pause or Resume / Restart | Corresponding button action |

A piece gets **one full gravity interval from first contact** before locking. Grounded movement/rotation and blocked soft drop preserve that deadline. Losing support clears it; recontact starts a fresh interval. Pause preserves both timers. Blur, a hidden page, or a clock gap over 250 ms pauses before catch-up; resume explicitly.

All seven pieces are independently selected, so repeats are valid. There are no wall kicks. Clearing 1/2/3/4 rows awards 100/300/500/800 × the level before clearing. Every ten cleared rows advances a level; gravity drops from 1000 ms by 100 ms per level to a 100 ms floor. Blocked spawning ends the game. Hold, ghost, seven bag, wall kicks and hard drop are reserved for the subsequent feature expansion.

## Check

```bash
npm run typecheck
npm run test
npm run build
```

Standard Playwright browser provisioning and checks:

```bash
npx playwright install chromium
npm run test:e2e
```

In this cloud sandbox the official browser download returned an HTML “Site Unavailable” response. A tested Linux x64 route uses the pinned npm browser package instead:

```bash
npm run browser:prepare
npm run test:e2e:cloud
```

This provisions test-only Chromium **153.0.8010.0** into an ignored owned cache, extracts without changing archive ownership, configures local fonts and runs the same Playwright suite with multiprocess browser launch. It requires Linux x64 and `tar`; the packaged assets are a development dependency, never part of the production app. `TETRIS_BROWSER_CACHE` can select a fresh task-owned cache. Both browser commands accept a selected test path after `--`.

Verification to date: **82 unit/controller tests and 18 Chromium scenarios**, including actual production controls, two-row clear/scoring, preview promotion, game over/restart, pause, recovery through isolated collaborators, disposal, local-only requests and 800×600 / 1280×720 at DPR 1/2. Clean `npm ci` and fresh browser provisioning passed from a committed-input copy. Desktop Chrome/Edge are intended player browsers; other browsers and native desktop blur/visibility delivery have not been certified. The UI has semantic controls, focus, readable status and Canvas fallback text; full nonvisual play and accessibility certification are outside scope.

## Development map

`src/engine` owns deterministic synchronous gameplay with injected piece sources. `src/browser` owns keyboard repeat, one clock, lifecycle/error handling and composition. `src/view` consumes detached snapshots to draw Canvas and update semantic DOM. Production `src/main.ts` exports no test mutation hook. Isolated fixtures under `tests/fixtures` complement production-entry acceptance and are excluded from the production build.

| Public API | Contract |
| --- | --- |
| `new GameSession(factory)` | Idle; no draw or implicit clock/randomness |
| `start()` / `restart()` | Start only idle / reset from any state with a fresh source |
| `pause()` / `resume()` | Running ↔ paused; preserve timers |
| `command(value)` | Attempt movement, rotation or soft drop; unknown values reject even outside play |
| `advance(ms)` | Finite numeric 0–60000 ms; chronological events, remainder across spawns, lock first on a tie |
| `snapshot()` | Detached board, piece, preview, counters, lifecycle and timing values |
| `mount(document, factory?)` | Compose the app; returned function disposes its loop/listeners |

Sources may throw or return invalid identifiers: a failing transition publishes no partial board/progression/piece/timer step. Earlier completed events remain committed; a consumed source sequence is not rolled back. Counter overflow rejects before the failing transition publishes. Browser errors stop input with a visible message and a restart route.

The [project brief](docs/dev/PROJECT.md), [architecture](docs/dev/ARCHITECTURE.md), [decomposition](docs/dev/DECOMPOSITION.md), [SPEC](docs/dev/SPEC.md), [PLAN](docs/dev/PLAN.md), [layout](docs/dev/layout.md) and [TASKS](docs/dev/TASKS.md) show the SDD workflow. Preparation review reports sit beside their sources; milestone reports are in [phase reports](docs/dev/reports/phases/1). [AGENTS.md](AGENTS.md) provides agent navigation. Development uses [SDD Manager](SDD-MANAGER.md); see the [AI disclosure](AI_DISCLOSURE.md). The demo is an independent implementation using ordinary shapes and project-owned drawing code, with no external logo, music or sprite assets.
