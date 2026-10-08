# Feature architecture — Modern piece controls

Status: design accepted by the user on 2026-10-08. [Campaign context](features/001_3fd5011-modern-piece-controls/README.md) owns identity, baseline and branch context. The [baseline architecture](ARCHITECTURE.md) governs unchanged blocks.

## Outcome and constraints

Provide hold, ghost piece, seven-bag randomization, wall kicks and hard drop as one coherent expansion of the playable browser game. The engine remains synchronous and browser-independent; the controller supplies time and commands; presentation consumes detached snapshots. No backend, framework, rule-mode selector, remote asset or additional dependency is required by this design.

The accepted lock policy remains authoritative. First contact starts one full current gravity interval. Grounded movement or rotation preserves its elapsed delay; becoming airborne clears it. Hard drop lands the current piece and starts a full interval when contact is new. A zero-distance hard drop on an already grounded piece preserves its existing deadline. Hard drop never immediately locks. Pause preserves engine timers and suppresses elapsed gameplay time.

## Affected blocks

| Block | Feature responsibility | Preserved boundary |
| --- | --- | --- |
| Engine | Bag source, ordered kick selection, landing calculation, hold state and eligibility, hard-drop transition and score | Sole mutable gameplay owner; no browser or drawing APIs |
| Browser controller | Map hold and hard drop as discrete actions; construct a fresh bag source for each session | Existing clock, repeat, focus, pause and recovery policies |
| Presentation | Draw distinguishable ghost under active cells; display held piece and hold availability; explain controls | No independent collision, randomization or gameplay mutation |

Ghost and hard drop share an engine landing calculation so their positions cannot drift through duplicated placement rules. Ghost placement is derived observation, with no independent mutable timer or board state. Hold belongs to the session aggregate because it changes active/preview state, source consumption and spawning. Hold does not merge cells, clear rows or award points.

## Recommended approach and alternatives

Extend existing component seams with focused pure placement helpers and session transitions. A bag source retains shuffle state behind the existing PieceSource interface, with injected randomness for deterministic tests. Rotation tests candidate offsets in table order and publishes the first valid placement; separate I and other-piece tables express the selected kick rules. Piece geometry and spawn definitions remain the baseline representation unless precise specification reveals an incompatibility.

A configurable classic/modern rules framework would retain two production behaviors but add mode configuration, branches and a larger acceptance matrix without a requested player need. A separate modern engine would duplicate timing, scoring and lifecycle logic. The localized extension is recommended because the five capabilities fit the existing source/session/view boundaries and preserve one authoritative gameplay implementation.

## Transition and failure ownership

Hold exchanges identifiers, respawning the incoming type in orientation zero. Empty hold consumes the current preview and obtains a new preview; occupied hold swaps without a source draw. One hold is permitted until locking re-enables it. Incoming blocked spawn ends the game coherently, without a partial publication. New active-piece episodes receive fresh fall/contact state; ordinary manipulation cannot restart a grounded deadline.

Hard drop computes the maximum legal descent and proposes two points per descended row. Placement and score publish together after safe-counter checks. Rotation, hold and drop reuse existing failure recovery and source-validation boundaries. Source consumption cannot be rolled back, while failing state transitions must preserve the engine's published state under the established collaborator-failure policy.

## Design review and specification boundary

Ownership review finds no new dependency cycle: placement/source helpers feed the session; controller consumes commands and snapshots; views consume snapshot values. Mutable hold eligibility and bag state each have one owner. Shared landing logic supports both display and input without moving gameplay into rendering.

FEATURE-SPEC must define ordered kick offsets and coordinate conventions, bag shuffle/random-input validation, exact draw counts, hold/game-over transitions, drop scoring and timer behavior, snapshot values, key bindings and accessible display obligations. The design choices are accepted; the precise written feature SPEC requires human acceptance before planning and implementation. Unchanged baseline scoring, level progression, one next preview, board dimensions and lifecycle rules remain in scope for regression verification. Full Guideline certification, T-spin/combo scoring, multiple previews, touch/audio and persistence are excluded.

See [feature decomposition](FEATURE_DECOMPOSITION.md) for component collaboration and verification seams.
