/** Controlled random values prove independent selection and permitted repeats. */
import { expect, test } from "vitest";
import { randomPieceSource, sevenBagPieceSource } from "../../src/engine/piece-source";

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

test("bags are lazy six-call shuffles with complete aligned groups", () => {
  let calls = 0;
  const source = sevenBagPieceSource(() => { calls++; return 0.999; });
  expect(calls).toBe(0);
  expect(source()).toBe("I");
  expect(calls).toBe(6);
  expect(Array.from({ length: 6 }, source)).toEqual(["J", "L", "O", "S", "T", "Z"]);
  expect(calls).toBe(6);
  expect(Array.from({ length: 7 }, source)).toEqual(["I", "J", "L", "O", "S", "T", "Z"]);
  expect(calls).toBe(12);
});

test("descending shuffle has known permutation and permits a boundary repeat", () => {
  let calls = 0;
  const source = sevenBagPieceSource(() => calls++ < 6 ? 0 : 0.999);
  expect(Array.from({ length: 8 }, source)).toEqual(["J", "L", "O", "S", "T", "Z", "I", "I"]);
  expect(sevenBagPieceSource(() => 0)()).toBe("J");
});

test.each([NaN, Infinity, -Infinity, -0.01, 1, "0.5", null, undefined])(
  "invalid random value %s cannot publish a partial bag", (value) => {
    let calls = 0;
    const source = sevenBagPieceSource(() => ++calls === 3 ? value as number : 0.999);
    expect(() => source()).toThrow(TypeError);
    expect(Array.from({ length: 7 }, source)).toEqual(["I", "J", "L", "O", "S", "T", "Z"]);
    expect(calls).toBe(9);
  },
);

test("collaborator exceptions propagate and a failed refill retries a whole fresh bag", () => {
  let calls = 0;
  const failure = new Error("random unavailable");
  const source = sevenBagPieceSource(() => { if (++calls === 8) throw failure; return 0.999; });
  expect(Array.from({ length: 7 }, source)).toEqual(["I", "J", "L", "O", "S", "T", "Z"]);
  expect(() => source()).toThrow(failure);
  expect(Array.from({ length: 7 }, source)).toEqual(["I", "J", "L", "O", "S", "T", "Z"]);
  expect(calls).toBe(14);
});
