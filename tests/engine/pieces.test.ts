/** Literal SPEC geometry detects missing cells and incorrect rotation pivots. */
import { describe, expect, test } from "vitest";
import {
  PIECE_TYPES,
  pieceCells,
  pieceSize,
  spawnOrigin,
} from "../../src/engine/pieces";
import type { PieceType } from "../../src/engine/types";

const grids: Record<PieceType, string> = {
  I: "..../XXXX/..../....",
  J: "X../XXX/...",
  L: "..X/XXX/...",
  O: "XX/XX",
  S: ".XX/XX./...",
  T: ".X./XXX/...",
  Z: "XX./.XX/...",
};
function draw(type: PieceType, orientation: number): string {
  const n = pieceSize(type),
    cells = pieceCells(type, orientation);
  return Array.from({ length: n }, (_, y) =>
    Array.from({ length: n }, (_, x) =>
      cells.some((p) => p.x === x && p.y === y) ? "X" : ".",
    ).join(""),
  ).join("/");
}
describe("tetromino geometry", () => {
  test.each(PIECE_TYPES)(
    "%s has its canonical grid and four occupied cells",
    (type) => {
      expect(draw(type, 0)).toBe(grids[type]);
      expect(pieceCells(type)).toHaveLength(4);
    },
  );
  test("clockwise and counterclockwise rotate around the specified square", () => {
    expect(draw("J", 1)).toBe(".XX/.X./.X.");
    expect(draw("J", 3)).toBe(".X./.X./XX.");
    expect(draw("I", 1)).toBe("..X./..X./..X./..X.");
  });
  test.each(PIECE_TYPES)(
    "%s returns to orientation zero after four turns",
    (type) => {
      expect(draw(type, 4)).toBe(grids[type]);
      expect(draw(type, -4)).toBe(grids[type]);
    },
  );
  test("O stays fixed and spawn origins center the bounding squares", () => {
    expect(draw("O", 1)).toBe("XX/XX");
    expect(spawnOrigin("I")).toEqual({ x: 3, y: 0 });
    expect(spawnOrigin("J")).toEqual({ x: 3, y: 0 });
    expect(spawnOrigin("O")).toEqual({ x: 4, y: 0 });
  });
});
