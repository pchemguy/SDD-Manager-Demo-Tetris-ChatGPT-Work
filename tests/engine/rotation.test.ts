/** Independent normative offsets and literal geometry fixtures for ordered kicks. */
import { expect, test } from "vitest";
import { rotationCandidates, rotatedPlacement } from "../../src/engine/rotation";
import { emptyBoard } from "../../src/engine/board";
import type { ActivePiece, Board, PieceType } from "../../src/engine/types";
const normal = [
  [0,1,[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]]],
  [1,0,[[0,0],[1,0],[1,1],[0,-2],[1,-2]]],
  [1,2,[[0,0],[1,0],[1,1],[0,-2],[1,-2]]],
  [2,1,[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]]],
  [2,3,[[0,0],[1,0],[1,-1],[0,2],[1,2]]],
  [3,2,[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]]],
  [3,0,[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]]],
  [0,3,[[0,0],[1,0],[1,-1],[0,2],[1,2]]],
] as const;
const line = [
  [0,1,[[0,0],[-2,0],[1,0],[-2,1],[1,-2]]],
  [1,0,[[0,0],[2,0],[-1,0],[2,-1],[-1,2]]],
  [1,2,[[0,0],[-1,0],[2,0],[-1,-2],[2,1]]],
  [2,1,[[0,0],[1,0],[-2,0],[1,2],[-2,-1]]],
  [2,3,[[0,0],[2,0],[-1,0],[2,-1],[-1,2]]],
  [3,2,[[0,0],[-2,0],[1,0],[-2,1],[1,-2]]],
  [3,0,[[0,0],[1,0],[-2,0],[1,2],[-2,-1]]],
  [0,3,[[0,0],[-1,0],[2,0],[-1,-2],[2,1]]],
] as const;
for (const type of ["I","J","L","S","T","Z"] as PieceType[])
  for (const [from,to,offsets] of type === "I" ? line : normal)
    test(`${type} ${from}→${to} candidates are ordered relative to original origin`, () => {
      const piece = { type, orientation: from, x: 3, y: 5 };
      const result = rotationCandidates(piece, (to - from + 4) % 4 === 1 ? 1 : -1);
      expect(result).toEqual(offsets.map(([dx,dy]) => ({ type, orientation: to, x: 3 + dx, y: 5 + dy })));
      expect(piece).toEqual({ type, orientation: from, x: 3, y: 5 });
    });

test("first valid wins; wall, floor and fifth I candidate can succeed", () => {
  const board = emptyBoard();
  expect(rotatedPlacement(board, { type:"T", orientation:0,x:3,y:5 },1)).toEqual({ type:"T",orientation:1,x:3,y:5 });
  expect(rotatedPlacement(board, { type:"I",orientation:1,x:-2,y:5 },-1)).toEqual({ type:"I",orientation:0,x:0,y:5 });
  expect(rotatedPlacement(board, { type:"T",orientation:0,x:3,y:18 },1)).toEqual({ type:"T",orientation:1,x:2,y:17 });
  expect(rotatedPlacement(board, { type:"I",orientation:0,x:3,y:18 },1)).toEqual({ type:"I",orientation:1,x:4,y:16 });
});

test("stack chooses later candidate without mutating board; complete obstruction rejects", () => {
  const board = emptyBoard(); board[6][4] = "Z";
  const piece: ActivePiece = { type:"T",orientation:0,x:3,y:4 };
  const before = structuredClone(board);
  expect(rotatedPlacement(board,piece,1)).toEqual({ ...piece,orientation:1,x:2 });
  expect(board).toEqual(before);
  const filled: Board = emptyBoard().map(row => row.map(() => "Z" as PieceType));
  for (const [x,y] of [[4,4],[3,5],[4,5],[5,5]]) filled[y][x] = null;
  expect(rotatedPlacement(filled,piece,1)).toBeNull();
});

test("visible top rejects occupied above-board cells and O remains fixed", () => {
  const board = emptyBoard(); board[2][4] = "Z"; board[2][3] = "Z";
  // T at the top: upward kick's top cell is outside visible rows; downward candidates are obstructed.
  board[3][4] = "Z"; board[3][3] = "Z";
  expect(rotatedPlacement(board,{type:"T",orientation:0,x:3,y:0},1)).toBeNull();
  const o: ActivePiece = {type:"O",orientation:0,x:4,y:18};
  expect(rotationCandidates(o,1)).toEqual([o]);
  expect(rotatedPlacement(emptyBoard(),o,-1)).toEqual(o);
});
