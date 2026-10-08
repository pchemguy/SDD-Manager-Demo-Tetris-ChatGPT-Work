# Architecture

## Arrangement and dependencies

The [project brief](PROJECT.md) establishes a browser TypeScript game. A synchronous engine owns gameplay; browser adapters supply commands/time and request rendering. No backend or UI framework is required.

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Engine | Board, active/next/held state and eligibility, bag source, rotation/landing, gravity/contact, clear/progression and lifecycle | Engine values/rules and injected piece source; no browser APIs |
| Browser controller | Physical keys, controlled repeats, one monotonic clock, lifecycle/focus/error handling and source composition | Engine API, browser events/scheduling and presentation |
| Presentation | Settled/ghost/active Canvas drawing, next/held previews and semantic status/controls | Detached snapshots and immutable shapes/colors |

Dependencies point from browser/view consumers toward engine values and operations. The engine imports no DOM, Canvas, keyboard, timer, storage, network or animation APIs. Views issue no simulation decisions and mutate no snapshot to control play.

## State, placement and time

GameSession is the sole mutable gameplay aggregate. Hold belongs here because exchange coordinates active/preview/held state, source consumption, eligibility and canonical spawning. Store held type only. Preview remains exactly one type. Ghost is derived from active/board using the same pure continuous landing calculation as hard drop; it has no independent state or timer.

Pure rotation helpers enumerate project-owned ordered offsets and choose the first valid candidate. The session publishes successful placement and reevaluates contact; failed candidates publish nothing. Geometry and board validation remain separate immutable/pure collaborators.

The controller supplies elapsed time; the engine accumulates fall and captured contact intervals. First contact begins full G independently of gravity phase. Grounded changes preserve deadlines, support loss clears contact and recontact starts fresh. Hard drop lands without forcing a lock; zero descent preserves state. Hold initializes fresh incoming timing while consuming episode eligibility. Pause supplies no gameplay time. SPEC owns exact chronology, numerical boundaries and failure atomicity.

## Randomness and verification

Each source instance owns a lazy seven-bag cursor and injected randomness. Restart constructs a fresh source. The session validates identifiers but permits arbitrary injected repeated sequences. Observation/placement never draws. Source failure preserves published gameplay state without undoing collaborator consumption.

Deterministic engine/controller checks cover pure placement, bag failures, draw counts, exchanges, counters, contact/order and snapshots. Production Chromium checks cover physical controls/focus, rendering and lifecycle; isolated fixtures remain outside production. [DECOMPOSITION](DECOMPOSITION.md) owns logical seams; SPEC owns behavior, PLAN delivery and layout physical paths.

## Choices and tradeoffs

Canvas controls cell rendering; DOM provides semantic controls and labels. Focused pure placement helpers and localized aggregate transitions support all five features without a second engine, configurable rule framework, generic event bus or service layer. Static delivery avoids server/account dependencies. Exact kick data describes project behavior without external Guideline certification.
