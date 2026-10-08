/** Public session contract scenarios use deterministic sources and detached observations. */
import { expect, test } from "vitest";
import { GameSession } from "../../src/engine/session";
import { sequenceFactory } from "../fixtures/piece-sources";

test("idle draws nothing and start draws active followed by exactly one preview", () => {
  let factories = 0,
    draws = 0;
  const session = new GameSession(() => {
    factories++;
    return () => {
      draws++;
      return "O";
    };
  });
  expect(factories).toBe(0);
  expect(draws).toBe(0);
  expect(session.snapshot()).toMatchObject({
    status: "idle",
    active: null,
    next: null,
    score: 0,
    lines: 0,
    level: 1,
  });
  session.start();
  expect(session.snapshot()).toMatchObject({
    status: "running",
    active: { type: "O", orientation: 0, x: 4, y: 0 },
    next: "O",
  });
  expect(draws).toBe(2);
  expect(factories).toBe(1);
  session.start();
  expect(draws).toBe(2);
  expect(factories).toBe(1);
});
test("restart creates a fresh source and resets initialization", () => {
  const session = new GameSession(sequenceFactory(["T", "I", "Z"]));
  session.start();
  session.restart();
  expect(session.snapshot()).toMatchObject({
    active: { type: "T", orientation: 0, x: 3, y: 0 },
    next: "I",
    gravityElapsedMs: 0,
    score: 0,
    lines: 0,
    level: 1,
  });
});
test("snapshot nested mutation cannot change current or subsequent engine state", () => {
  const session = new GameSession(sequenceFactory(["J", "L"]));
  session.start();
  const snapshot = session.snapshot();
  expect(snapshot.active).not.toBeNull();
  snapshot.board[0][0] = "Z";
  snapshot.active!.x = 99;
  expect(session.snapshot().board[0][0]).toBeNull();
  expect(session.snapshot().active!.x).toBe(3);
});
test("soft drop awards only successful rows and resets gravity without shortening lock delay", () => {
  const g = new GameSession(sequenceFactory(["O"]));
  g.start();
  g.advance(300);
  g.command("soft-drop");
  expect(g.snapshot()).toMatchObject({
    score: 1,
    active: { y: 1 },
    gravityElapsedMs: 0,
  });
  for (let i = 0; i < 17; i++) g.command("soft-drop");
  g.advance(400);
  g.command("soft-drop");
  expect(g.snapshot()).toMatchObject({
    score: 18,
    grounded: { elapsedMs: 400, intervalMs: 1000 },
  });
  g.advance(599);
  expect(g.snapshot().active!.y).toBe(18);
  g.advance(1);
  expect(g.snapshot().active!.y).toBe(0);
});
test("lock awards pre-clear level, advances speed and promotes preview exactly once", () => {
  let draws = 0;
  const g = new GameSession(() => () => {
    draws++;
    return "O";
  });
  g.start();
  for (let round = 0; round < 6; round++) {
    for (const target of [0, 2, 4, 6, 8]) {
      while (g.snapshot().active!.x > target) g.command("left");
      while (g.snapshot().active!.x < target) g.command("right");
      for (let i = 0; i < 18; i++) g.command("soft-drop");
      g.advance(g.snapshot().gravityIntervalMs);
    }
    if (round === 4)
      expect(g.snapshot()).toMatchObject({
        lines: 10,
        level: 2,
        score: 1950,
        gravityIntervalMs: 900,
      });
  }
  expect(g.snapshot()).toMatchObject({ lines: 12, score: 2640, level: 2 });
  expect(draws).toBe(32);
});

test.each(["rotate-clockwise", "rotate-counterclockwise"] as const)(
  "%s keeps O orientation zero, placement and grounded timing",
  (command) => {
    const g = new GameSession(sequenceFactory(["O"]));
    g.start();
    g.advance(18400);
    const before = g.snapshot();
    g.command(command);
    expect(g.snapshot()).toEqual(before);
  },
);
