/** Kicks through public session commands retain or clear contact by actual support. */
import { expect, test } from "vitest";
import { GameSession } from "../../src/engine/session";
import { sequenceFactory } from "../fixtures/piece-sources";

test("floor kick preserves elapsed fall/contact, counters and source", () => {
  let draws = 0;
  const g = new GameSession(() => () => { draws++; return "T"; });
  g.start(); g.command("hard-drop"); g.advance(400);
  g.command("rotate-clockwise");
  expect(g.snapshot()).toMatchObject({ active: {type:"T",orientation:1,x:2,y:17}, ghost: {type:"T",orientation:1,x:2,y:17}, score:36, gravityElapsedMs:400, grounded:{elapsedMs:400,intervalMs:1000} });
  expect(draws).toBe(2); g.advance(600);
  expect(draws).toBe(3);
});

test("translated kick loses stack support then rotation recontact gets fresh G", () => {
  const g = new GameSession(sequenceFactory(["O","O","I"])); g.start();
  for (let n = 0; n < 2; n++) { g.command("hard-drop"); g.advance(1000); }
  g.command("hard-drop"); g.advance(400); g.command("rotate-clockwise");
  expect(g.snapshot()).toMatchObject({ active:{type:"I",orientation:1,x:1,y:14}, ghost:{y:16}, gravityElapsedMs:400, grounded:null });
  g.command("rotate-counterclockwise");
  expect(g.snapshot().grounded).toEqual({elapsedMs:0,intervalMs:1000});
  g.advance(999); expect(g.snapshot().active!.type).toBe("I");
  g.advance(1); expect(g.snapshot().active!.type).toBe("O");
});

test("all blocked candidates preserve full published session", () => {
  const g = new GameSession(sequenceFactory([...Array(18).fill("O"),"T","I"])); g.start();
  for (let n = 0; n < 18; n++) {
    const target = n % 2 === 0 ? 3 : 5;
    while (g.snapshot().active!.x < target) g.command("right");
    while (g.snapshot().active!.x > target) g.command("left");
    g.command("hard-drop"); g.advance(1000);
  }
  expect(g.snapshot().active!.type).toBe("T");
  g.advance(400); const before = g.snapshot(); g.command("rotate-clockwise");
  expect(g.snapshot()).toEqual(before);
});
