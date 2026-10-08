# Agent orientation

## Purpose and governing sources

This repository develops a browser TypeScript Tetris game and demonstrates SDD Manager workflows. Read this file explicitly if the host does not discover it, and inspect any applicable nested AGENTS.md before editing.

- [PROJECT](docs/dev/PROJECT.md) owns the brief, accepted scope, and preparation context.
- [ARCHITECTURE](docs/dev/ARCHITECTURE.md) owns major blocks and dependency direction.
- [DECOMPOSITION](docs/dev/DECOMPOSITION.md) owns logical responsibilities and verification seams.
- [SPEC](docs/dev/SPEC.md) and its linked children own observable behavior and acceptance; [SPEC review](docs/dev/SPEC-REVIEW-REPORT.md) records the preparation gate.
- [PLAN](docs/dev/PLAN.md) owns delivery boundaries; [layout](docs/dev/layout.md) owns planned physical paths; [PLAN review](docs/dev/PLAN-REVIEW-REPORT.md) records their preparation gate.
- [TASKS](docs/dev/TASKS.md) is the sole executable checklist for the baseline; [TASKS review](docs/dev/TASKS-REVIEW-REPORT.md) records conformance and readiness.
- [SDD Manager notice](SDD-MANAGER.md) and [disclosure](AI_DISCLOSURE.md) identify development assistance.

SPEC, PLAN, and layout are accepted; their review gates and the TASKS preparation gate are Ready. The selected range is the full baseline phase T-001–T-020 on `phase/1-baseline-tetris`, starting at preparation merge `6d96a76a1976f5b8c2ca3ed7847777ffcdc4d66d`. The full baseline is complete and integrated on `main`; TASKS remains the sole progress owner. The phase branch retains published checkpoints. GitHub lifecycle tracking is confirmed for the baseline; project only an eligible phase after its inputs and review gates are established.

## Active feature preparation

Campaign [001_3fd5011-modern-piece-controls](docs/dev/features/001_3fd5011-modern-piece-controls/README.md) is open on `feature/001_3fd5011-modern-piece-controls`, based on full checkpoint `3fd501155708a92ddf63415f02180bdde9167836`, targeting `main`. Its accepted [feature architecture](docs/dev/FEATURE_ARCHITECTURE.md) and [feature decomposition](docs/dev/FEATURE_DECOMPOSITION.md) cover hold, ghost, seven bag, wall kicks and hard drop. Design is accepted. [FEATURE-SPEC](docs/dev/FEATURE-SPEC.md) is prepared with its [QC report](docs/dev/FEATURE-SPEC-REVIEW-REPORT.md); written SPEC is accepted. [FEATURE-PLAN](docs/dev/FEATURE-PLAN.md), [feature layout](docs/dev/FEATURE-LAYOUT.md) and [plan review](docs/dev/FEATURE-PLAN-REVIEW-REPORT.md) are prepared; PLAN/layout acceptance is pending. Task derivation and implementation have not started. The baseline TASKS remains completed and does not own feature execution. Read the active feature package before continuing. Preserve the full-contact-interval lock rule, including delayed hard drop.

## Workflow

The user selected inline execution: the coordinating agent implements work in this session using the SDD checkpoints and review requirements. Execution-method selection is established; do not ask the user to choose it again.

Keep initial baseline preparation documents on `design-docs`; active feature preparation follows the established feature branch/package context. Complete specification, planning, task derivation, required review, and human decisions before implementation. Merge accepted preparation into the repository's actual default branch and publish it before creating implementation branches.

Use the installed SDD Manager coordinator and focused skills. Preserve user-owned changes, use Git commits as checkpoints, verify scoped changes before committing, and publish authorized checkpoints to this repository. Do not reset, force-push, or create additional features without scope authority. Treat a completed partial implementation range as a stopping boundary.

Maintain these links and command guidance when owning artifacts appear. Keep executable task status in its owning TASKS document; do not duplicate a checklist here. Keep credentials out of committed files, remote URLs, logs, and reports.

## Environment and checks

Validated standard ChatGPT Work Linux sandbox: Node.js 24.19.0, npm 11.9.0, Python 3.12.14 and Chromium 153.0.8010.0. Do not modify or execute files under `/pyenv`. The README owns full setup/controls and evidence limitations.

Run `npm ci`, `npm run test`, `npm run typecheck`, `npm run build`. Development and preview use explicit `--host 127.0.0.1`; arbitrary interfaces hit sandbox enumeration limits. Standard `npm run test:e2e` requires Playwright Chromium. Here use `npm run browser:prepare` followed by `npm run test:e2e:cloud` (same suite, pinned test-only assets, ownership-safe extraction, local fonts, multiprocess launch). Generated/browser cache output stays ignored. Clean committed-input installation, fresh provisioning, 82 unit tests and 18 browser cases have passed. Full phase review/integration is complete; reports and TASKS record verified publication.

Tests can inject source/time collaborators and compose isolated entries under tests/fixtures. Never add production state mutation hooks or runtime fixture imports. Changes follow accepted SPEC; record actual verification and any limitations in the owning task/report. Modelled focus-loss handlers are distinct from native desktop blur/visibility certification.
