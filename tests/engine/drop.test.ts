/** Public drop/ghost contracts: source-free observations and full delayed contact. */
import { expect, test } from "vitest";
import { GameSession } from "../../src/engine/session";
import { hardDropScore } from "../../src/engine/progression";
import { sequenceFactory } from "../fixtures/piece-sources";

test("ghost is detached and source-free across idle, running and paused lifecycle", () => {
  let draws = 0;
  const g = new GameSession(() => () => { draws++; return "O"; });
  expect(g.snapshot()).toMatchObject({ ghost: null, held: null, holdAvailable: false });
  g.start();
  expect(g.snapshot()).toMatchObject({ ghost: { type: "O", orientation: 0, x: 4, y: 18 }, held: null, holdAvailable: true });
  const s = g.snapshot(); s.ghost!.y = 99;
  expect(g.snapshot().ghost!.y).toBe(18);
  g.command("left");
  expect(g.snapshot().ghost!.x).toBe(3);
  g.pause();
  const before = g.snapshot();
  g.command("hard-drop"); g.advance(1000);
  expect(g.snapshot()).toEqual(before);
  expect(draws).toBe(2);
});

test("positive drop awards 2d, resets fall and starts full G without drawing or merging", () => {
  let draws = 0;
  const g = new GameSession(() => () => { draws++; return "O"; });
  g.start(); g.advance(400);
  const ghost = g.snapshot().ghost;
  g.command("hard-drop");
  expect(g.snapshot()).toMatchObject({ active: ghost, score: 36, gravityElapsedMs: 0, grounded: { elapsedMs: 0, intervalMs: 1000 }, next: "O", held: null, holdAvailable: true });
  expect(g.snapshot().board.flat().filter(Boolean)).toHaveLength(0);
  expect(draws).toBe(2);
  g.advance(999);
  const before = g.snapshot();
  g.command("hard-drop");
  expect(g.snapshot()).toEqual(before);
  g.advance(1);
  expect(g.snapshot().active!.y).toBe(0);
  expect(g.snapshot().board.flat().filter(Boolean)).toHaveLength(4);
  expect(draws).toBe(3);
});

test("drop scoring only covers remaining descent and pause preserves grounded deadline", () => {
  const g = new GameSession(sequenceFactory(["O"])); g.start();
  g.command("soft-drop"); g.command("hard-drop");
  expect(g.snapshot().score).toBe(35);
  g.advance(350); g.pause();
  const before = g.snapshot(); g.advance(60000);
  expect(g.snapshot()).toEqual(before); g.resume(); g.advance(650);
  expect(g.snapshot().active!.y).toBe(0);
});

test("terminal ghost is null and drop does nothing", () => {
  const g = new GameSession(sequenceFactory(["O"])); g.start();
  for (let i = 0; i < 10; i++) { g.command("hard-drop"); g.advance(1000); }
  expect(g.snapshot()).toMatchObject({ status: "game-over", ghost: null, holdAvailable: false });
  const before = g.snapshot(); g.command("hard-drop"); expect(g.snapshot()).toEqual(before);
});

test("drop award guard rejects unsafe result before its owning transition can publish", () => {
  expect(hardDropScore(Number.MAX_SAFE_INTEGER - 2, 1)).toBe(Number.MAX_SAFE_INTEGER);
  expect(() => hardDropScore(Number.MAX_SAFE_INTEGER - 1, 1)).toThrow(RangeError);
});
