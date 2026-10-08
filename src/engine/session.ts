/** Synchronous aggregate owner. Commands/time are supplied externally; observations are detached. */
import { canPlace, emptyBoard, mergeAndClear } from "./board";
import { rotatedPlacement } from "./rotation";
import { landingPlacement } from "./landing";
import { PIECE_TYPES, spawnOrigin } from "./pieces";
import {
  clearAward,
  levelForLines,
  gravityInterval,
  checkedCounter,
  hardDropScore,
} from "./progression";
import type {
  ActivePiece,
  GameCommand,
  GameSnapshot,
  PieceSource,
  PieceSourceFactory,
} from "./types";

/** Own a session and its injected source factory; construction performs no source draw. */
export class GameSession {
  private state: Omit<GameSnapshot, "ghost"> = {
    status: "idle",
    board: emptyBoard(),
    active: null,
    next: null,
    held: null,
    holdAvailable: false,
    score: 0,
    lines: 0,
    level: 1,
    gravityIntervalMs: 1000,
    gravityElapsedMs: 0,
    grounded: null,
  };
  private source: PieceSource | null = null;
  constructor(private readonly factory: PieceSourceFactory) {}
  /** Start only an idle session. */
  start(): void {
    if (this.state.status === "idle") this.restart();
  }
  /** Initialize a fresh running session from any lifecycle state.
   * @throws Source exceptions or TypeError for invalid identifiers; prior state remains intact.
   */
  restart(): void {
    const source = this.factory(),
      type = this.draw(source),
      next = this.draw(source);
    this.state = {
      status: "running",
      board: emptyBoard(),
      active: { type, orientation: 0, ...spawnOrigin(type) },
      next,
      held: null,
      holdAvailable: true,
      score: 0,
      lines: 0,
      level: 1,
      gravityIntervalMs: 1000,
      gravityElapsedMs: 0,
      grounded: null,
    };
    this.source = source;
  }
  /** Pause/resume preserve engine timers; other lifecycle transitions are no-ops. */
  pause(): void {
    if (this.state.status === "running") this.state.status = "paused";
  }
  resume(): void {
    if (this.state.status === "paused") this.state.status = "running";
  }
  /** Attempt a discrete placement. Blocked moves preserve every timer.
   * Valid commands outside running are ignored.
   * Hold is once per lock; hard drop lands without locking.
   * @throws TypeError for unknown commands/invalid draws; RangeError for counter overflow.
   * Empty-hold source errors propagate before state publication.
   */
  command(command: GameCommand): void {
    if (
      ![
        "left",
        "right",
        "rotate-clockwise",
        "rotate-counterclockwise",
        "soft-drop",
        "hard-drop",
        "hold",
      ].includes(command)
    )
      throw new TypeError("Unknown gameplay command.");
    if (this.state.status !== "running") return;
    if (command === "hold") {
      if (this.state.holdAvailable) this.hold();
      return;
    }
    const current = this.state.active!;
    if (command === "hard-drop") {
      const landing = landingPlacement(this.state.board, current);
      const distance = landing.y - current.y;
      if (distance === 0) return;
      const score = hardDropScore(this.state.score, distance);
      this.state.active = landing;
      this.state.score = score;
      this.state.gravityElapsedMs = 0;
      this.updateContact();
      return;
    }
    // O is a complete no-op, including timers and public orientation.
    if (command.startsWith("rotate-")) {
      if (current.type === "O") return;
      const rotated = rotatedPlacement(this.state.board, current,
        command === "rotate-clockwise" ? 1 : -1);
      if (rotated) {
        this.state.active = rotated;
        this.updateContact();
      }
      return;
    }
    const candidate = { ...current };
    if (command === "left") candidate.x--;
    else if (command === "right") candidate.x++;
    else if (command === "soft-drop") candidate.y++;
    else return;
    if (canPlace(this.state.board, candidate)) {
      if (command === "soft-drop") {
        this.state.score = checkedCounter(this.state.score + 1);
        this.state.gravityElapsedMs = 0;
      }
      this.state.active = candidate;
      this.updateContact();
    }
  }
  /** Process due lock/gravity events in chronological order, carrying time across spawns.
   * Lock wins ties. Game over discards unused time; pause consumes none.
   * A failed event step rolls back; preceding successful events remain published.
   * @throws TypeError for nonfinite/nonnumeric input, RangeError outside 0–60000 ms.
   * Source errors and counter overflow propagate before their event step publishes.
   */
  advance(elapsedMs: number): void {
    if (typeof elapsedMs !== "number" || !Number.isFinite(elapsedMs))
      throw new TypeError("Elapsed time must be finite numeric milliseconds.");
    if (elapsedMs < 0 || elapsedMs > 60000)
      throw new RangeError("Elapsed time must be between 0 and 60000 ms.");
    if (this.state.status !== "running") return;
    let remaining = elapsedMs;
    while (this.state.status === "running") {
      const gravityDue =
        this.state.gravityIntervalMs - this.state.gravityElapsedMs;
      const lockDue = this.state.grounded
        ? this.state.grounded.intervalMs - this.state.grounded.elapsedMs
        : Infinity;
      const step = Math.min(remaining, gravityDue, lockDue);
      const beforeEvent = structuredClone(this.state);
      try {
        this.state.gravityElapsedMs += step;
        if (this.state.grounded) this.state.grounded.elapsedMs += step;
        remaining -= step;
        if (lockDue <= step) {
          this.lock();
        } else if (gravityDue <= step) {
          this.state.gravityElapsedMs = 0;
          const candidate = {
            ...this.state.active!,
            y: this.state.active!.y + 1,
          };
          if (canPlace(this.state.board, candidate))
            this.state.active = candidate;
          this.updateContact();
        } else break;
      } catch (error) {
        this.state = beforeEvent;
        throw error;
      }
      if (remaining === 0) break;
    }
  }
  /** Exchange types once per lock; draw only for empty hold before publishing.
   * Incoming spawn starts fresh timing; collision retains exchange and ends play.
   * A failed draw preserves the entire state, including eligibility and timers.
   */
  private hold(): void {
    const held = this.state.active!.type;
    const type = this.state.held ?? this.state.next!;
    const next = this.state.held === null ? this.draw(this.source!) : this.state.next;
    const active: ActivePiece = { type, orientation: 0, ...spawnOrigin(type) };
    const valid = canPlace(this.state.board, active);
    this.state = {
      ...this.state, held, next,
      active: valid ? active : null,
      status: valid ? "running" : "game-over",
      holdAvailable: false,
      gravityElapsedMs: 0,
      grounded: null,
    };
    if (valid) this.updateContact();
  }
  /** Publish an entire merge/clear/promotion transition after collaborator work succeeds. */
  private lock(): void {
    const { board, cleared } = mergeAndClear(
      this.state.board,
      this.state.active!,
    );
    const score = checkedCounter(
        this.state.score + clearAward(cleared, this.state.level),
      ),
      lines = checkedCounter(this.state.lines + cleared),
      level = checkedCounter(levelForLines(lines));
    const type = this.state.next!,
      next = this.draw(this.source!);
    const active: ActivePiece = { type, orientation: 0, ...spawnOrigin(type) };
    const valid = canPlace(board, active);
    this.state = {
      ...this.state,
      board,
      score,
      lines,
      level,
      gravityIntervalMs: gravityInterval(level),
      next,
      active: valid ? active : null,
      status: valid ? "running" : "game-over",
      holdAvailable: valid,
      gravityElapsedMs: 0,
      grounded: null,
    };
    if (valid) this.updateContact();
  }
  private draw(source: PieceSource) {
    const type = source();
    if (!PIECE_TYPES.includes(type))
      throw new TypeError("Source must return a valid tetromino identifier.");
    return type;
  }
  private updateContact(): void {
    const active = this.state.active!;
    if (canPlace(this.state.board, { ...active, y: active.y + 1 }))
      this.state.grounded = null;
    else if (!this.state.grounded)
      this.state.grounded = {
        elapsedMs: 0,
        intervalMs: this.state.gravityIntervalMs,
      };
  }
  /** Return a detached snapshot with source-free derived ghost placement. */
  snapshot(): GameSnapshot {
    return structuredClone({
      ...this.state,
      ghost: this.state.active
        ? landingPlacement(this.state.board, this.state.active)
        : null,
    });
  }
}
