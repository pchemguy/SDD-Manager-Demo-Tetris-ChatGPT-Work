/** Compose real engine/adapters/views. The returned disposer releases the single loop and listeners. */
import { GameSession } from "../engine/session";
import { randomPieceSource } from "../engine/piece-source";
import type { PieceSourceFactory } from "../engine/types";
import { Controller } from "./controller";
import { mappedCommand } from "./keyboard";
import { boardRenderer, previewRenderer } from "../view/canvas";
import { statusRenderer } from "../view/status";
/** Optional source injection is a composition seam; production uses independent Math.random draws. */
export function mount(
  root: Document,
  factory: PieceSourceFactory = () => randomPieceSource(Math.random),
): () => void {
  const canvas = root.querySelector<HTMLCanvasElement>("#board")!,
    start = root.querySelector<HTMLButtonElement>("#start")!,
    restart = root.querySelector<HTMLButtonElement>("#restart")!,
    pause = root.querySelector<HTMLButtonElement>("#pause")!,
    label = root.querySelector<HTMLElement>("#status")!;
  let board: ReturnType<typeof boardRenderer>,
    preview: ReturnType<typeof previewRenderer>;
  try {
    board = boardRenderer(canvas);
    preview = previewRenderer(
      root.querySelector<HTMLCanvasElement>("#preview")!,
    );
  } catch (error) {
    label.textContent =
      "Unsupported display: " +
      (error instanceof Error ? error.message : String(error));
    start.disabled = pause.disabled = true;
    let dispose = () => restart.removeEventListener("click", retry);
    const retry = () => {
      dispose();
      dispose = mount(root, factory);
    };
    restart.addEventListener("click", retry);
    return () => dispose();
  }
  const session = new GameSession(factory),
    status = statusRenderer(root);
  const controller = new Controller(
    session,
    (state) => {
      board(state);
      preview(state);
      status(state);
    },
    (message) => {
      label.textContent =
        "Runtime error: " + message + " — Restart to recover.";
      start.disabled = pause.disabled = true;
    },
  );
  board(session.snapshot());
  preview(session.snapshot());
  status(session.snapshot());
  const onStart = () => {
      controller.start(performance.now());
      canvas.focus();
    },
    onRestart = () => {
      controller.restart(performance.now());
      canvas.focus();
    },
    onPause = () => controller.togglePause(performance.now());
  const onKey = (event: KeyboardEvent) => {
    const target = event.target instanceof Element ? event.target : null;
    const interactive = Boolean(
      target?.closest(
        'button,a,input,textarea,select,[contenteditable]:not([contenteditable="false"])',
      ),
    );
    if (
      !interactive &&
      session.snapshot().status === "running" &&
      (mappedCommand(event.code) || ["KeyP", "Escape"].includes(event.code))
    )
      event.preventDefault();
    controller.keyDown(
      event.code,
      performance.now(),
      event.repeat,
      interactive,
    );
  };
  const onUp = (event: KeyboardEvent) =>
      controller.keyUp(event.code, performance.now()),
    onBlur = () => controller.suspend(performance.now()),
    onVisibility = () => {
      if (root.hidden) onBlur();
    };
  start.addEventListener("click", onStart);
  restart.addEventListener("click", onRestart);
  pause.addEventListener("click", onPause);
  root.addEventListener("keydown", onKey);
  root.addEventListener("keyup", onUp);
  window.addEventListener("blur", onBlur);
  root.addEventListener("visibilitychange", onVisibility);
  let frame = 0;
  const loop = (now: number) => {
    controller.tick(now);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(frame);
    start.removeEventListener("click", onStart);
    restart.removeEventListener("click", onRestart);
    pause.removeEventListener("click", onPause);
    root.removeEventListener("keydown", onKey);
    root.removeEventListener("keyup", onUp);
    window.removeEventListener("blur", onBlur);
    root.removeEventListener("visibilitychange", onVisibility);
  };
}
