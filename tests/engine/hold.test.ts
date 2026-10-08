/** Hold exchanges through public inputs, pinning source ownership and atomic publication. */
import { expect, test } from "vitest";
import { GameSession } from "../../src/engine/session";
import type { PieceType } from "../../src/engine/types";
import { sequenceFactory } from "../fixtures/piece-sources";

test("empty hold draws once, occupied swap draws none, and only lock restores eligibility", () => {
  let draws = 0;
  const g = new GameSession(() => { let cursor = 0; return () => { draws++; return (["T","I","L","Z"] as PieceType[])[cursor++ % 4]; }; });
  g.start(); g.command("rotate-clockwise"); g.command("left"); g.command("soft-drop");
  const before = g.snapshot(); g.command("hold");
  expect(g.snapshot()).toMatchObject({ held:"T",active:{type:"I",orientation:0,x:3,y:0},next:"L",holdAvailable:false,gravityElapsedMs:0,grounded:null,score:1 });
  expect(g.snapshot().board).toEqual(before.board); expect(draws).toBe(3);
  const held = g.snapshot(); g.command("hold"); expect(g.snapshot()).toEqual(held);
  g.command("hard-drop"); g.advance(1000);
  expect(g.snapshot().holdAvailable).toBe(true); expect(draws).toBe(4);
  g.command("rotate-clockwise"); g.advance(400); g.command("hold");
  expect(g.snapshot()).toMatchObject({held:"L",active:{type:"T",orientation:0,x:3,y:0},next:"Z",holdAvailable:false,gravityElapsedMs:0,grounded:null});
  expect(draws).toBe(4);
  g.restart(); expect(g.snapshot()).toMatchObject({ held:null,holdAvailable:true,active:{type:"T"} });
});

test("hold is a valid ignored command in idle or pause, retaining eligibility", () => {
  const g = new GameSession(sequenceFactory(["T","I"]));
  const idle = g.snapshot(); g.command("hold"); expect(g.snapshot()).toEqual(idle);
  g.start(); g.advance(400); g.pause();
  const paused = g.snapshot(); g.command("hold"); expect(g.snapshot()).toEqual(paused);
  expect(paused.holdAvailable).toBe(true); g.resume(); g.command("hold"); expect(g.snapshot().held).toBe("T");
});

function tallSide(count: number) {
  const g = new GameSession(sequenceFactory([...Array(count + 1).fill("O"), "I"])); g.start();
  for (let n = 0; n < count; n++) {
    g.command("right"); g.command("right"); g.command("hard-drop"); g.advance(1000);
  }
  return g;
}

test("incoming held spawn initializes fresh contact and preserves board/progression", () => {
  const g = tallSide(9); g.advance(400); const before = g.snapshot(); g.command("hold");
  expect(g.snapshot()).toMatchObject({held:"O",active:{type:"I",orientation:0,x:3,y:0},holdAvailable:false,gravityElapsedMs:0,grounded:{elapsedMs:0,intervalMs:1000}});
  for (const key of ["board","score","lines","level","gravityIntervalMs"] as const) expect(g.snapshot()[key]).toEqual(before[key]);
  g.advance(999); expect(g.snapshot().active!.type).toBe("I");
  g.advance(1); expect(g.snapshot()).toMatchObject({ status:"game-over", active:null, holdAvailable:false });
});

test("blocked hold publishes coherent retained held/preview and no merge", () => {
  const g = tallSide(10); const before = g.snapshot(); g.command("hold");
  expect(g.snapshot()).toMatchObject({status:"game-over",held:"O",next:"O",active:null,ghost:null,holdAvailable:false,gravityElapsedMs:0,grounded:null});
  expect(g.snapshot().board).toEqual(before.board); expect(g.snapshot().score).toBe(before.score);
  const over = g.snapshot(); g.command("hold"); expect(g.snapshot()).toEqual(over);
});

test.each(["exception","identifier"])("failed empty hold %s preserves entire state and eligibility", mode => {
  let calls = 0;
  const failure = new Error("hold source");
  const g = new GameSession(() => () => {
    if (++calls === 3) { if (mode === "exception") throw failure; return "bad" as PieceType; }
    return "O";
  });
  g.start(); g.command("hard-drop"); g.advance(400); const before = g.snapshot();
  expect(() => g.command("hold")).toThrow(mode === "exception" ? failure : TypeError);
  expect(g.snapshot()).toEqual(before); expect(calls).toBe(3);
  g.command("hold"); expect(g.snapshot()).toMatchObject({held:"O",holdAvailable:false,active:{y:0},grounded:null});
});
