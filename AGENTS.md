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

SPEC, PLAN, and layout are accepted; their review gates and the TASKS preparation gate are Ready. The selected range is the full baseline phase T-001–T-020 on `phase/1-baseline-tetris`, starting at preparation merge `6d96a76a1976f5b8c2ca3ed7847777ffcdc4d66d`. Product implementation has started; TASKS remains the sole progress owner. No active feature exists. GitHub lifecycle tracking is confirmed for the baseline; project only an eligible phase after its inputs and review gates are established.

## Workflow

The user selected inline execution: the coordinating agent implements work in this session using the SDD checkpoints and review requirements. Execution-method selection is established; do not ask the user to choose it again.

Keep preparation documents on `design-docs`. Complete specification, planning, task derivation, required review, and human decisions before implementation. Merge accepted preparation into the repository's actual default branch and publish it before creating implementation branches.

Use the installed SDD Manager coordinator and focused skills. Preserve user-owned changes, use Git commits as checkpoints, verify scoped changes before committing, and publish authorized checkpoints to this repository. Do not reset, force-push, or create additional features without scope authority. Treat a completed partial implementation range as a stopping boundary.

Maintain these links and command guidance when owning artifacts appear. Keep executable task status in its owning TASKS document; do not duplicate a checklist here. Keep credentials out of committed files, remote URLs, logs, and reports.

## Environment and checks

Preparation uses the standard ChatGPT Work Linux cloud sandbox. Node.js 24.19.0, npm 11.9.0, and Python 3.12.14 were observed. Pinned dependencies are installed. `npm run test` and `npm run typecheck` were validated for the initial piece module. Build and explicit-loopback dev/preview commands are usable. Milestone 1.1 Chromium acceptance passed using task-owned @sparticuz/chromium 153.0.0 assets (browser 153.0.8010.0), multiprocess launch and /etc/fonts. The official Playwright download supplied HTML; use the recorded supported packaged route when standard provisioning is unavailable. Full baseline acceptance remains pending. Do not modify or execute files under `/pyenv`.

For documentation changes, inspect relative links, consistency with accepted decisions, and `git diff --check`. Establish package commands during implementation preparation and update this guidance from actual evidence.
