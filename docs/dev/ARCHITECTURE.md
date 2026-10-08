# Architecture

## Arrangement

The [project brief](PROJECT.md) establishes a browser TypeScript MVP. A synchronous game engine owns gameplay; a browser application supplies commands and elapsed time, then renders an engine snapshot. No backend is required.

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Game engine | Board, active/next piece, movement and rotation validity, gravity, lock delay, clearing, score, level, and session transitions | Game rules and injected piece source; no browser APIs |
| Browser controller | Convert keyboard and session actions into commands; supply elapsed time; coordinate updates and display | Engine API, browser events, monotonic clock, animation scheduling |
| Presentation | Canvas board/pieces and DOM status, controls, and next preview | Read-only snapshots and controller callbacks |

Dependency direction is browser controller toward engine and presentation. Presentation does not mutate engine state. The engine does not know about Canvas, DOM, timers, keyboard codes, storage, network, or animation frames. TypeScript value contracts describe commands and snapshots without a framework abstraction.

## State and time ownership

The engine is the sole owner of mutable game state. Rendering receives a snapshot that cannot serve as a mutation path. Session state distinguishes idle, running, paused, and game over; exact transition contracts belong in SPEC.

The browser controller measures elapsed time and passes it to the engine. The engine owns gravity and grounded-duration accumulation. Lock delay is independent of the gravity tick phase and soft-drop rate. First contact starts a full current gravity interval; grounded movement/rotation preserves elapsed delay, and becoming airborne clears it. Pause supplies no gameplay time.

Engine updates must account for intervening gameplay events consistently rather than advance one cell per animation frame. SPEC will settle event ordering, large elapsed-time handling, and the treatment of background/focus changes. A test can replace clock progression with explicit elapsed-time inputs.

## Randomness and verification

The engine receives a piece source through a narrow interface. Production selection chooses each tetromino independently; tests supply known sequences. Engine behavior is deterministic for a given initial state, piece sequence, command sequence, and elapsed-time sequence.

Engine checks cover rules and state transitions without a browser. Browser checks cover controls, animation integration, pause/focus handling, display updates, and session flows. Verification design must include lock timing from actual contact, especially when contact occurs between ordinary gravity ticks.

## Choices and tradeoffs

Canvas provides direct control of the board and piece drawing. DOM elements keep status and buttons accessible and easy to test. A framework would add infrastructure without a demonstrated UI need; an all-DOM board is feasible but places cell rendering into element management. The selected Canvas/DOM split keeps drawing separate from game decisions.

A pure engine adds a clear boundary that supports deterministic verification and the planned feature expansion. It does not require an event bus, dependency-injection framework, generalized plugin system, or speculative configurable rule engine. A static client avoids server operation and account dependencies.

## Expansion boundaries

Seven-bag behavior changes the piece source. Hold changes engine commands/state and its UI. Ghost display consumes engine-derived placement information. Wall kicks change rotation validation. Hard drop adds an engine command and input mapping. Their exact contracts will be specified in a feature campaign; baseline modules do not contain inactive implementations.

Logical component detail is owned by [DECOMPOSITION](DECOMPOSITION.md). Behavioral formulas and acceptance belong to SPEC; physical allocation and delivery order belong to layout and PLAN.
