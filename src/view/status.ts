/** Present lifecycle and button availability as semantic DOM controls. */
import type { GameSnapshot } from "../engine/types";
export function statusRenderer(root: Document): (state: GameSnapshot) => void {
  const status = root.querySelector<HTMLElement>("#status")!,
    start = root.querySelector<HTMLButtonElement>("#start")!;
  return (state) => {
    const text = {
      idle: "Ready",
      running: "Playing",
      paused: "Paused",
      "game-over": "Game over",
    }[state.status];
    if (status.textContent !== text) status.textContent = text;
    start.disabled = state.status !== "idle";
    const pause = root.querySelector<HTMLButtonElement>("#pause")!;
    pause.disabled = !["running", "paused"].includes(state.status);
    pause.textContent = state.status === "paused" ? "Resume" : "Pause";
    for (const key of ["score", "lines", "level"] as const)
      root.querySelector("#" + key)!.textContent = String(state[key]);
    root.querySelector("#next-type")!.textContent = state.next ?? "—";
  };
}
