/** Browser-independent value contracts for the synchronous Tetris engine. */
export type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";
export type Cell = PieceType | null;
export type Board = Cell[][];
export interface Point {
  x: number;
  y: number;
}
export interface ActivePiece extends Point {
  type: PieceType;
  orientation: number;
}
export type GameStatus = "idle" | "running" | "paused" | "game-over";
export type GameCommand =
  | "left"
  | "right"
  | "rotate-clockwise"
  | "rotate-counterclockwise"
  | "soft-drop"
  | "hard-drop";
/** A source supplies one identifier; a factory supplies a fresh source on restart. */
export type PieceSource = () => PieceType;
export type PieceSourceFactory = () => PieceSource;
/** Detached observation: nested writes never modify engine state. Times are milliseconds. */
export interface GameSnapshot {
  status: GameStatus;
  board: Board;
  active: ActivePiece | null;
  next: PieceType | null;
  held: PieceType | null;
  holdAvailable: boolean;
  ghost: ActivePiece | null;
  score: number;
  lines: number;
  level: number;
  gravityIntervalMs: number;
  gravityElapsedMs: number;
  grounded: { elapsedMs: number; intervalMs: number } | null;
}
