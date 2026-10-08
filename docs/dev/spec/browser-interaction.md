# Browser interaction

These contracts refine [SPEC](../SPEC.md) for keyboard/frame/composition adapters and presentation in [DECOMPOSITION](../DECOMPOSITION.md).

## U-01: controls and repeat

| Input | Action |
| --- | --- |
| ArrowLeft / ArrowRight | Move one cell left/right |
| ArrowDown | Soft drop one row |
| ArrowUp or X | Rotate clockwise once per key press |
| Z | Rotate counterclockwise once per key press |
| Space | Hard drop once per fresh keydown; ordinary delayed locking |
| C / either Shift | Hold once per fresh keydown, subject to episode eligibility |
| P or Escape | Toggle pause/resume once per key press |
| Enter | Start from idle; restart from game over; otherwise no gameplay action |
| Start, Pause/Resume, Restart buttons | Respective lifecycle action |

Native key auto-repeat is ignored. A fresh horizontal keydown moves immediately, then repeats after 150 ms and every 50 ms thereafter while held. If both horizontal keys are held, the most recently pressed one owns repeat; releasing it activates the other with an immediate step and a fresh 150 ms delay. ArrowDown steps immediately and every 50 ms while held. Rotate/hold/hard-drop/pause/start never repeat. Hold/drop retain existing horizontal/soft-drop repeat episodes.

Repeat deadlines use the same active elapsed time as gameplay. If simultaneous, engine time events happen first, then horizontal repeat, then soft-drop repeat. Physical browser events keep dispatch order as in [T-05](session-and-timing.md). Held input may act on subsequent pieces during uninterrupted play. Clear all held/repeat state on pause, restart, game over, blur, or hidden document; resuming requires a fresh press.

Recognized gameplay key events prevent default scrolling while running when focus is on the game surface or noninteractive page area. They must not override native activation of focused buttons, links, or editable controls. Button activation must not cause a duplicate gameplay Enter or Space action. The game surface is focusable and has a visible focus indication; start/restart by button returns focus to it.

## U-02: time and focus policy

Use a monotonic browser clock and advance elapsed time before applying input or rendering. Coordinate animation-frame events, physical events, and synthetic repeat deadlines through a single controller so time is never counted twice. Partition elapsed time at repeat deadlines so rendering frequency does not change gameplay.

While running, blur, hidden document, or any observed clock gap greater than 250 ms automatically pauses before advancing that gap and clears held input. A gap of exactly 250 ms is processed normally. Automatic pause discards that entire unprocessed gap, displays paused state, and requires explicit resume. Pause/resume/restart reset the browser clock baseline; paused/background time is not passed to the engine. Clock gaps are checked on physical-input handling as well as animation frames.

Only one active scheduling loop and one set of input listeners may exist. Restart must not duplicate either. Disposing the application releases listeners and scheduling. No gameplay request, analytics call, score submission, or external asset fetch is required after application assets load.

## U-03: rendering and information

Canvas shows all 20 × 10 board cells, settled tetrominoes, a distinguishable outlined/translucent ghost and the active piece in that order. Keep square cells, visible cell boundaries, and distinct foreground/background contrast. Use consistent type colors in board and canonical next/held previews; numeric/text status does not depend on color. Empty matrix margins do not render as blocks. Paused and game-over status is visibly distinct; pausing preserves the board display.

Display score, cleared lines, level, next/held type/shape, hold Available/Used/Unavailable and session status in labeled DOM elements. Provide visible control instructions and Start, Pause/Resume, and Restart buttons. Disable Start outside idle and Pause/Resume outside running/paused. Restart remains available. Idle has no active/preview piece; a runtime error has visible text and disables gameplay until a successful restart, with hold shown Unavailable even if stopped engine eligibility is retained. Paused retains ghost/held; idle/game over has no ghost. F-07 owns exact display/controls obligations.

At viewport sizes 800 × 600 and 1280 × 720 with normal browser zoom, board, next/held previews, instructions, controls and status must be available without horizontal scrolling or overlapping. The board must preserve its 1:2 aspect ratio and remain readable. Size the drawing buffer to avoid visibly blurred cells at device pixel ratios 1 and 2. Smaller screens may scroll vertically; touch controls are outside scope.

## U-04: accessible controls

Use semantic buttons with visible labels and visible keyboard focus. Provide Canvas fallback/accessible text naming the game board and directing the user to status and controls. A polite status announcement reports lifecycle changes and runtime errors; do not announce every frame or falling step. Text status uses readable contrast. Full nonvisual board play and formal accessibility certification are outside the acceptance claim.

## U-05: static delivery and supported environment

Source and tests use TypeScript. The production build is static HTML, JavaScript, CSS, and local assets served over HTTP, with no runtime Node.js process or backend required. Opening file:// is not a supported launch method. README must provide validated setup, development, build, production-preview, and test commands once tooling exists.

Verify browser acceptance in cloud Chromium. Record its actual version in verification evidence instead of inventing a minimum version. Desktop Chrome/Edge are the intended player environment. Other-browser support must be reported from actual evidence. Dependencies are pinned by a committed lockfile and setup must be reproducible from it.

Use no external copyrighted Tetris logo, music, or sprite assets. Drawing uses project-owned code and ordinary shapes; the game needs no external fonts or remote assets. Publishing a hosted site is a separate deployment action from building and verifying static files.
