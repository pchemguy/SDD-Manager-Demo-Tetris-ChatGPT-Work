/** Controlled deadlines, independent of OS key autorepeat or browser rendering. */
import { expect, test } from "vitest";
import { Keyboard } from "../../src/browser/keyboard";
test("horizontal immediate/150/50 cadence and native repeat ignored", () => {
  const k = new Keyboard();
  expect(k.down("ArrowLeft", 0)).toEqual(["left"]);
  expect(k.down("ArrowLeft", 20, true)).toEqual([]);
  expect(k.deadline()).toBe(150);
  expect(k.due(149)).toEqual([]);
  expect(k.due(150)).toEqual(["left"]);
  expect(k.deadline()).toBe(200);
  expect(k.due(200)).toEqual(["left"]);
  k.up("ArrowLeft", 210);
  expect(k.deadline()).toBe(Infinity);
});
test("last horizontal wins, release reactivates other immediately with fresh delay", () => {
  const k = new Keyboard();
  k.down("ArrowLeft", 0);
  expect(k.down("ArrowRight", 40)).toEqual(["right"]);
  expect(k.due(190)).toEqual(["right"]);
  expect(k.up("ArrowRight", 210)).toEqual(["left"]);
  expect(k.deadline()).toBe(360);
});
test("down immediate/50 cadence; horizontal wins ties; reset removes held inputs", () => {
  const k = new Keyboard();
  k.down("ArrowLeft", 0);
  expect(k.down("ArrowDown", 100)).toEqual(["soft-drop"]);
  expect(k.due(150)).toEqual(["left", "soft-drop"]);
  k.reset();
  expect(k.deadline()).toBe(Infinity);
  expect(k.up("ArrowLeft", 151)).toEqual([]);
});
test("one-shot mapping and native interactive focus prevent duplicate activation", () => {
  const k = new Keyboard();
  expect(k.down("KeyX", 0)).toEqual(["rotate-clockwise"]);
  expect(k.down("KeyX", 1, true)).toEqual([]);
  expect(k.down("KeyZ", 2)).toEqual(["rotate-counterclockwise"]);
  expect(k.down("Escape", 3)).toEqual(["toggle-pause"]);
  expect(k.down("KeyP", 4)).toEqual(["toggle-pause"]);
  expect(k.down("Enter", 5)).toEqual(["enter"]);
  expect(k.down("Enter", 6, false, true)).toEqual([]);
  expect(k.down("ArrowDown", 7, false, true)).toEqual([]);
  expect(k.down("KeyC", 8)).toEqual([]);
});

test("Space is discrete, excludes native focus/repeat and preserves scheduled repeats", () => {
  const k = new Keyboard();
  k.down("ArrowLeft", 0); k.down("ArrowDown", 0);
  expect(k.down("Space", 10)).toEqual(["hard-drop"]);
  expect(k.down("Space", 11, true)).toEqual([]);
  expect(k.down("Space", 12)).toEqual([]);
  expect(k.deadline()).toBe(50);
  expect(k.due(50)).toEqual(["soft-drop"]);
  k.up("Space", 60);
  expect(k.down("Space", 61, false, true)).toEqual([]);
  expect(k.down("Space", 62)).toEqual(["hard-drop"]);
});
