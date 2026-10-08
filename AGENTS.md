# Agent orientation

## Purpose and governing sources

This repository develops a browser TypeScript Tetris game and demonstrates SDD Manager workflows. Read this file explicitly if the host does not discover it, and inspect any applicable nested AGENTS.md before editing.

- [PROJECT](docs/dev/PROJECT.md) owns the brief, accepted scope, and preparation context.
- [ARCHITECTURE](docs/dev/ARCHITECTURE.md) owns major blocks and dependency direction.
- [DECOMPOSITION](docs/dev/DECOMPOSITION.md) owns logical responsibilities and verification seams.
- [SPEC](docs/dev/SPEC.md) and its linked children own observable behavior and acceptance; [SPEC review](docs/dev/SPEC-REVIEW-REPORT.md) records the preparation gate.
- [PLAN](docs/dev/PLAN.md) owns delivery boundaries; [layout](docs/dev/layout.md) owns planned physical paths; [PLAN review](docs/dev/PLAN-REVIEW-REPORT.md) records their preparation gate.
- [SDD Manager notice](SDD-MANAGER.md) and [disclosure](AI_DISCLOSURE.md) identify development assistance.

SPEC is accepted and its review gate is Ready. PLAN and layout are prepared for human review. TASKS has not been authored; no executable range or active feature exists. Product source, tests, package manifests, and application commands are absent. GitHub lifecycle tracking is confirmed for the baseline; project only an eligible phase after its inputs and review gates are established.

## Workflow

Keep preparation documents on `design-docs`. Complete specification, planning, task derivation, required review, and human decisions before implementation. Merge accepted preparation into the repository's actual default branch and publish it before creating implementation branches.

Use the installed SDD Manager coordinator and focused skills. Preserve user-owned changes, use Git commits as checkpoints, verify scoped changes before committing, and publish authorized checkpoints to this repository. Do not reset, force-push, or create additional features without scope authority. Treat a completed partial implementation range as a stopping boundary.

Maintain these links and command guidance when owning artifacts appear. Keep executable task status in its owning TASKS document; do not duplicate a checklist here. Keep credentials out of committed files, remote URLs, logs, and reports.

## Environment and checks

Preparation uses the standard ChatGPT Work Linux cloud sandbox. Node.js 24.19.0, npm 11.9.0, and Python 3.12.14 were observed. No application setup, build, or test command is declared or validated yet. Do not modify or execute files under `/pyenv`.

For documentation changes, inspect relative links, consistency with accepted decisions, and `git diff --check`. Establish package commands during implementation preparation and update this guidance from actual evidence.
