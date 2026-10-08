# Feature decomposition — Modern piece controls

Status: proposed design for review. [Feature architecture](FEATURE_ARCHITECTURE.md) defines the change; [baseline decomposition](DECOMPOSITION.md) owns unchanged components. [Campaign context](features/001_3fd5011-modern-piece-controls/README.md) identifies the baseline and next boundary.

## Engine collaboration

| Component | Responsibility and owned state | Consumers and verification seam |
| --- | --- | --- |
| Piece source | Shuffle one copy of every type per bag using injected randomness; retain bag/cursor inside each fresh source | Session consumes identifiers through the existing interface; deterministic permutations, bag boundaries, fresh-source reset and invalid randomness checks |
| Rotation placement | Generate ordered rotated candidates from piece type, orientation transition and kick tables; select first legal placement | Session attempts rotations; fixtures check walls, floor, stacked cells, I-specific offsets, blocked rotations and O no-op |
| Landing placement | Find furthest legal downward placement without merging or mutation | Session uses for hard drop and ghost observation; empty/stacked boards, cavities, zero descent and ghost/drop equality |
| Game session | Own held identifier, hold eligibility, active/preview promotion, timers and score; publish coherent feature transitions | Public commands and detached snapshots; draw counts, swap/reset, blocked spawn, contact deadlines, pause, failure rollback and overflow checks |

No feature service owns an independent game clock. Placement helpers read the board and active value without mutating them. The session continues to coordinate lock, clear, progression and spawn. Hold eligibility becomes available after locking, never after a hold exchange or ordinary movement. Fresh incoming held pieces use canonical spawn geometry and establish contact through the same engine logic as ordinary spawns.

## Commands and observations

The command union gains hold and hard drop. The snapshot gains held-piece/availability observations and derived ghost placement; FEATURE-SPEC owns exact field names and lifecycle values. Existing board, progression and timer fields remain detached and retain their meaning. Ghost observations do not consume the source, score points or advance simulation.

The hard-drop transition computes landing and award before publishing. It does not call the lock transition. A subsequent movement or kicked rotation may remove support and clear contact through the existing contact policy. Hold begins a new active-piece episode, while its once-per-lock eligibility prevents repeated swaps from repeatedly obtaining new timers.

## Browser and presentation collaboration

Keyboard mapping adds discrete hold and hard-drop actions, rejecting native repeats under the established focus policy. The frame controller retains advance-before-command ordering, pause handling and error recovery. Application composition supplies a fresh seven-bag source on restart with randomness injected at the browser boundary.

Board rendering draws ghost distinctly from settled and active cells and keeps active cells legible when ghost overlaps. A held-piece panel uses the same immutable shape/color definitions as the next preview; status communicates whether hold is available. Existing semantic controls, readable status, focus and viewport/DPR requirements extend to the added display. Reuse presentation drawing primitives where useful without introducing a generic UI framework.

## Verification and unresolved contracts

Engine tests cover bag permutations, kick order, landing equality, hold eligibility/draw counts, safe drop scoring, blocked spawn and state isolation. Timing scenarios cover hard-drop contact between gravity ticks, zero-distance drop preserving a partially elapsed deadline, soft drop preserving that deadline, support loss/recontact, hold timer initialization and pause/resume. Browser checks exercise real production hold/drop controls, held/ghost displays and restart, complementing isolated deterministic collaborators without adding production mutation hooks.

Precise kick tables and their relation to the existing bounding-square geometry, input choices, snapshot contracts and terminal/failure transitions require FEATURE-SPEC. Physical source allocation, delivery order and executable task ownership remain with feature planning and task derivation. This decomposition introduces no implementation or completion claim.
