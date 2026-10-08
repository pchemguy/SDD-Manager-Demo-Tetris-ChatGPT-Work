/** Translate physical events into actions/deadlines. This adapter owns no engine clock or board. */
import type { GameCommand } from "../engine/types";
export type InputAction = GameCommand | "toggle-pause" | "enter";
export function mappedCommand(code: string): GameCommand | null {
  return (
    (
      {
        ArrowDown: "soft-drop",
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "rotate-clockwise",
        KeyX: "rotate-clockwise",
        KeyZ: "rotate-counterclockwise",
      } as Record<string, GameCommand>
    )[code] ?? null
  );
}
/** Controller supplies one active clock and consumes due actions after advancing engine time. */
export class Keyboard {
  private held = new Set<string>();
  private horizontal: string | null = null;
  private horizontalDue = Infinity;
  private downDue = Infinity;
  /** Return immediate actions; native repeats and interactive focus do not capture held state. */
  down(
    code: string,
    now: number,
    nativeRepeat = false,
    interactive = false,
  ): InputAction[] {
    if (nativeRepeat || interactive || this.held.has(code)) return [];
    if (code === "ArrowLeft" || code === "ArrowRight") {
      this.held.add(code);
      this.horizontal = code;
      this.horizontalDue = now + 150;
      return [mappedCommand(code)!];
    }
    if (code === "ArrowDown") {
      this.held.add(code);
      this.downDue = now + 50;
      return ["soft-drop"];
    }
    if (code === "KeyP" || code === "Escape") return ["toggle-pause"];
    if (code === "Enter") return ["enter"];
    const command = mappedCommand(code);
    return command ? [command] : [];
  }
  /** Release a key; the surviving opposing horizontal key starts a fresh repeat episode. */
  up(code: string, now: number): InputAction[] {
    this.held.delete(code);
    if (code === "ArrowDown") this.downDue = Infinity;
    if (code !== this.horizontal) return [];
    const other = code === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
    this.horizontal = this.held.has(other) ? other : null;
    this.horizontalDue = this.horizontal ? now + 150 : Infinity;
    return this.horizontal ? [mappedCommand(this.horizontal)!] : [];
  }
  /** Earliest deadline; Infinity means no repeat is scheduled. */
  deadline(): number {
    return Math.min(this.horizontalDue, this.downDue);
  }
  /** Consume exact due deadlines in horizontal-before-soft-drop order. */
  due(now: number): GameCommand[] {
    const actions: GameCommand[] = [];
    if (this.horizontalDue <= now) {
      actions.push(mappedCommand(this.horizontal!)!);
      this.horizontalDue += 50;
    }
    if (this.downDue <= now) {
      actions.push("soft-drop");
      this.downDue += 50;
    }
    return actions;
  }
  reset(): void {
    this.held.clear();
    this.horizontal = null;
    this.horizontalDue = this.downDue = Infinity;
  }
}
