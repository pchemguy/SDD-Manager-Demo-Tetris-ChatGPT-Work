/** One monotonic browser clock coordinates physical events, repeats and engine deadlines. */
import { GameSession } from "../engine/session";
import type { GameCommand, GameSnapshot } from "../engine/types";
import { Keyboard, type InputAction } from "./keyboard";
/** Lifecycle operations reset clock baselines. Errors stop input until restart succeeds. */
export class Controller {
  private last: number | null = null;
  private readonly keyboard = new Keyboard();
  /** An error stops gameplay until restart succeeds; its message is suitable for visible status. */
  error: string | null = null;
  constructor(
    private readonly session: GameSession,
    private readonly render: (snapshot: GameSnapshot) => void,
    private readonly onError: (message: string) => void = () => {},
  ) {}
  /** Start only idle. `now` is a monotonic timestamp in milliseconds. */
  start(now: number): void {
    this.run(() => {
      if (this.session.snapshot().status !== "idle") return;
      this.session.start();
      this.keyboard.reset();
      this.last = now;
    });
  }
  /** Recover with a fresh source and clear held inputs/clock debt after success. */
  restart(now: number): void {
    this.run(() => {
      this.session.restart();
      this.keyboard.reset();
      this.last = now;
      this.error = null;
    }, true);
  }
  /** Observe a frame; gaps greater than 250 ms pause before elapsed-time catch-up. */
  tick(now: number): void {
    this.run(() => {
      this.sync(now);
    });
  }
  /** Synchronize due time/repeats before this physical command. */
  command(command: GameCommand, now: number): void {
    this.run(() => {
      if (this.sync(now)) this.session.command(command);
    });
  }
  keyDown(
    code: string,
    now: number,
    nativeRepeat = false,
    interactive = false,
  ): void {
    this.run(() => {
      if (!this.sync(now)) return;
      const status = this.session.snapshot().status;
      if (status !== "running" && !["KeyP", "Escape", "Enter"].includes(code))
        return;
      for (const action of this.keyboard.down(
        code,
        now,
        nativeRepeat,
        interactive,
      ))
        this.action(action, now);
    });
  }
  keyUp(code: string, now: number): void {
    this.run(() => {
      if (this.sync(now))
        for (const action of this.keyboard.up(code, now))
          this.action(action, now);
    });
  }
  togglePause(now: number): void {
    this.run(() => {
      if (this.sync(now)) this.pauseAction(now);
    });
  }
  /** Focus loss discards the entire pending clock gap before pausing. */
  suspend(now: number): void {
    this.run(() => {
      this.session.pause();
      this.keyboard.reset();
      this.last = now;
    });
  }
  private pauseAction(now: number): void {
    if (this.session.snapshot().status === "running") this.session.pause();
    else this.session.resume();
    this.keyboard.reset();
    this.last = now;
  }
  private action(action: InputAction, now: number): void {
    if (action === "toggle-pause") this.pauseAction(now);
    else if (action === "enter") {
      const status = this.session.snapshot().status;
      if (status === "idle") {
        this.session.start();
        this.last = now;
        this.keyboard.reset();
      } else if (status === "game-over") {
        this.session.restart();
        this.last = now;
        this.keyboard.reset();
      }
    } else this.session.command(action);
  }
  /** Return false when a long gap auto-pauses, so its physical event cannot change gameplay. */
  private sync(now: number): boolean {
    if (this.last === null) {
      this.last = now;
      return true;
    }
    if (this.session.snapshot().status !== "running") {
      this.last = now;
      return true;
    }
    if (now - this.last > 250) {
      this.session.pause();
      this.keyboard.reset();
      this.last = now;
      return false;
    }
    while (this.keyboard.deadline() <= now) {
      const deadline = this.keyboard.deadline();
      this.session.advance(Math.max(0, deadline - this.last));
      this.last = deadline;
      if (this.session.snapshot().status !== "running") {
        this.keyboard.reset();
        break;
      }
      for (const command of this.keyboard.due(deadline))
        this.session.command(command);
    }
    if (this.session.snapshot().status === "running")
      this.session.advance(Math.max(0, now - this.last));
    if (this.session.snapshot().status === "game-over") this.keyboard.reset();
    this.last = now;
    return true;
  }
  private run(operation: () => void, recovery = false): void {
    if (this.error && !recovery) return;
    try {
      operation();
      this.render(this.session.snapshot());
    } catch (error) {
      this.session.pause();
      this.keyboard.reset();
      this.error = error instanceof Error ? error.message : String(error);
      this.onError(this.error);
    }
  }
}
