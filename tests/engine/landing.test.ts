/** Literal landing fixtures catch skipped obstructions and input mutation. */
import { expect, test } from "vitest";
import { landingPlacement } from "../../src/engine/landing";
import { emptyBoard } from "../../src/engine/board";
import type { ActivePiece } from "../../src/engine/types";

test.each([
  ["O", 0, 4, 0, 18], ["I", 0, 3, 0, 18], ["I", 1, 3, 0, 16],
  ["T", 2, 3, 1, 17], ["O", 0, 4, 18, 18],
] as const)("empty board %s orientation %i lands at literal row", (type, orientation, x, y, target) => {
  const board = emptyBoard();
  const piece: ActivePiece = { type, orientation, x, y };
  const before = structuredClone({ board, piece });
  const result = landingPlacement(board, piece);
  expect(result).toEqual({ type, orientation, x, y: target });
  expect(result).not.toBe(piece);
  expect({ board, piece }).toEqual(before);
});

test("first obstruction stops descent even when empty cavity exists below it", () => {
  const board = emptyBoard();
  board[10][4] = "Z";
  const piece: ActivePiece = { type: "O", orientation: 0, x: 4, y: 0 };
  expect(landingPlacement(board, piece)).toEqual({ ...piece, y: 8 });
  expect(board[11][4]).toBeNull();
});

test("stack support and zero descent preserve detached values", () => {
  const board = emptyBoard();
  board[18][5] = "J";
  const piece: ActivePiece = { type: "O", orientation: 0, x: 4, y: 16 };
  expect(landingPlacement(board, { ...piece, y: 0 })).toEqual(piece);
  expect(landingPlacement(board, piece)).toEqual(piece);
});
