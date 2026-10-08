/** Controlled random values prove independent selection and permitted repeats. */
import { expect, test } from "vitest";
import { randomPieceSource } from "../../src/engine/piece-source";

test("independent draws cover each identifier and permit repeated pieces", () => {
  const values = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.99, 0, 0];
  let i = 0;
  const source = randomPieceSource(() => values[i++]);
  expect(Array.from({ length: 9 }, () => source())).toEqual([
    "I",
    "J",
    "L",
    "O",
    "S",
    "T",
    "Z",
    "I",
    "I",
  ]);
});
