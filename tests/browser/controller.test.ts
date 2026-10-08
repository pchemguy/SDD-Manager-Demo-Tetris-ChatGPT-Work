/** Controller collaborators are real engine sessions and a detached render observer. */
import { expect, test } from "vitest";
import { GameSession } from "../../src/engine/session";
import { Controller } from "../../src/browser/controller";
import { sequenceFactory } from "../fixtures/piece-sources";
test("start/restart and basic inputs connect clock and engine without duplicate elapsed time", () => {
  const g = new GameSession(sequenceFactory(["O", "T"]));
  const c = new Controller(g, () => {});
  c.start(0);
  c.tick(100);
  c.command("left", 200);
  for (const n of [400, 600, 800, 1000]) c.tick(n);
  expect(g.snapshot()).toMatchObject({
    active: { x: 3, y: 1 },
    gravityElapsedMs: 0,
  });
  c.restart(1100);
  expect(g.snapshot()).toMatchObject({
    active: { x: 4, y: 0 },
    gravityElapsedMs: 0,
  });
});
function setup() {
  const g = new GameSession(sequenceFactory(["O"]));
  const c = new Controller(g, () => {});
  c.start(0);
  return { g, c };
}
test("250 ms gap processes normally; greater gap pauses before passing any elapsed time", () => {
  const { g, c } = setup();
  c.tick(250);
  expect(g.snapshot().gravityElapsedMs).toBe(250);
  c.tick(501);
  expect(g.snapshot()).toMatchObject({
    status: "paused",
    gravityElapsedMs: 250,
  });
});
test("physical input also checks clock gap and cannot move after automatic pause", () => {
  const { g, c } = setup();
  c.command("left", 251);
  expect(g.snapshot()).toMatchObject({
    status: "paused",
    active: { x: 4 },
    gravityElapsedMs: 0,
  });
});
test("repeat deadlines partition engine time and horizontal repeat precedes soft-drop repeat", () => {
  const { g, c } = setup();
  c.keyDown("ArrowLeft", 0);
  c.tick(150);
  c.tick(200);
  c.keyDown("ArrowDown", 200);
  c.tick(250);
  expect(g.snapshot()).toMatchObject({
    active: { x: 0, y: 2 },
    score: 2,
    gravityElapsedMs: 0,
  });
});
test("pause/resume discard paused time and require fresh held inputs", () => {
  const { g, c } = setup();
  c.keyDown("ArrowLeft", 0);
  c.togglePause(100);
  c.tick(5000);
  c.togglePause(5000);
  c.tick(5100);
  expect(g.snapshot()).toMatchObject({
    status: "running",
    active: { x: 3 },
    gravityElapsedMs: 200,
  });
});
test("input exactly on lock deadline acts on the next piece", () => {
  const { g, c } = setup();
  for (let i = 0; i < 18; i++) c.command("soft-drop", 0);
  for (const n of [200, 400, 600, 800]) c.tick(n);
  c.command("right", 1000);
  expect(g.snapshot()).toMatchObject({
    active: { x: 5, y: 0 },
    grounded: null,
  });
  expect(g.snapshot().board[18][4]).toBe("O");
});
test("blur/hidden suspend discards unprocessed time before automatic pause", () => {
  const { g, c } = setup();
  c.tick(100);
  c.suspend(200);
  expect(g.snapshot()).toMatchObject({
    status: "paused",
    gravityElapsedMs: 100,
  });
});
test("source failure pauses input and reports error; successful fresh restart recovers", () => {
  let n = 0,
    fail = true;
  const g = new GameSession(() => () => {
    if (++n === 3 && fail) throw Error("source failure");
    return "O";
  });
  const errors: string[] = [];
  const c = new Controller(
    g,
    () => {},
    (message) => errors.push(message),
  );
  c.start(0);
  for (let i = 0; i < 18; i++) c.command("soft-drop", 0);
  for (const t of [200, 400, 600, 800, 1000]) c.tick(t);
  expect(errors).toEqual(["source failure"]);
  expect(g.snapshot().status).toBe("paused");
  c.command("left", 1000);
  expect(g.snapshot().active!.x).toBe(4);
  fail = false;
  c.restart(2000);
  expect(c.error).toBeNull();
  expect(g.snapshot().status).toBe("running");
});
test("render failure reports visible recovery without mutating board", () => {
  const g = new GameSession(sequenceFactory(["O"]));
  const errors: string[] = [];
  let fail = false;
  const c = new Controller(
    g,
    () => {
      if (fail) throw Error("render");
    },
    (message) => errors.push(message),
  );
  c.start(0);
  fail = true;
  c.tick(100);
  expect(errors).toEqual(["render"]);
  expect(g.snapshot().board.flat().filter(Boolean)).toHaveLength(0);
});
