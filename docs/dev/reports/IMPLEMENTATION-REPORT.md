# Baseline implementation report

Status: baseline code verified and ready for authorized `main` integration. Final publication/containment evidence will be recorded after merged-state checks.

The browser TypeScript/Canvas game implements all accepted baseline gameplay and lifecycle/display behavior, including one **full gravity interval from first contact** before locking. Independently selected pieces may repeat; rotations have no kicks. Soft drop, simultaneous clears, pre-clear-level awards, level/speed progression, one preview, pause/resume/focus policy, controlled repeat, restart, blocked-spawn game over and visible runtime recovery are present. Engine ownership is separate from the browser clock/input and presentation.

Verification: **82 unit/controller tests, 18 cloud Chromium scenarios, strict typecheck and static production build passed** after the one independent-review fix pass. Browser 153.0.8010.0; clean locked setup/fresh owned provisioning passed earlier from committed inputs. Actual production controls, score/clear, preview color/promotion, pause, terminal restart, initial/runtime recovery, resource disposal, local-only requests, and both required viewport/DPR pairs are covered. Two uncovered review defects (O orientation metadata and unguarded initial paint) were reproduced RED and fixed GREEN. No required issue remains.

[Phase report](phases/1/PHASE-REPORT.md) records full acceptance provenance, reviewer findings, fixes, all rulings/evidence limits and integration reconciliation. Delivery reports: [1.1](phases/1/1.1.md), [1.2](phases/1/1.2.md), [1.3](phases/1/1.3.md), [1.4](phases/1/1.4.md). [TASKS](../TASKS.md) owns executable completion; [README](../../../README.md) owns validated player/setup/check instructions and the other-plugins/prior-Tetris-context disclosure.

No hosted site was deployed. The static `dist` output requires HTTP serving but no gameplay server/account/remote assets. Only cloud Chromium acceptance is claimed; desktop visibility/blur delivery, other browsers and full nonvisual accessibility are not certified. Counter guard boundary/publication ordering are tested/reviewed without an impractical end-to-end overflow run. Pinned packaged browser provisioning is Linux x64, separate from the production import graph.

## Final integration

Pending observed merged-state verification, issue/milestone reconciliation and remote containment readback.

## TODO

None. Modern features remain the next separately scoped SDD feature expansion; no expansion preparation or implementation belongs to this baseline phase.
