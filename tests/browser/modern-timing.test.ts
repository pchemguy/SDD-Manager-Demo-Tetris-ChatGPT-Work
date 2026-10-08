/** Cross-feature chronology using real sessions/controller and public collaborator seams. */
import { expect, test } from "vitest";
import { GameSession } from "../../src/engine/session";
import { Controller } from "../../src/browser/controller";
import { sevenBagPieceSource } from "../../src/engine/piece-source";
import { sequenceFactory } from "../fixtures/piece-sources";
import type { PieceType } from "../../src/engine/types";

test("physical Space exactly at lock deadline drops the new piece after due lock", () => {
  const g = new GameSession(sequenceFactory(["O","I","T"])); const c=new Controller(g,()=>{});
  c.start(0); c.keyDown("Space",0); c.keyUp("Space",0);
  for(const t of [250,500,750]) c.tick(t);
  c.keyDown("Space",1000);
  expect(g.snapshot()).toMatchObject({active:{type:"I",y:16},score:68,next:"T",grounded:{elapsedMs:0,intervalMs:1000}});
  expect(g.snapshot().board.flat().filter(Boolean)).toHaveLength(4);
});

test("hold at due lock uses restored eligibility on new piece without extra occupied draw", () => {
  const g = new GameSession(sequenceFactory(["O","I","T","Z"])); const c=new Controller(g,()=>{});
  c.start(0); c.keyDown("KeyC",0); c.keyUp("KeyC",0); c.command("hard-drop",0);
  for(const t of [250,500,750]) c.tick(t);
  c.keyDown("KeyC",1000);
  expect(g.snapshot()).toMatchObject({active:{type:"O",x:4,y:0,orientation:0},held:"T",next:"Z",holdAvailable:false,grounded:null,gravityElapsedMs:0});
});

test("hold/drop do not cancel horizontal episode and pause clears physical held input", () => {
  const g = new GameSession(sequenceFactory(["O","I","T"])); const c=new Controller(g,()=>{});
  c.start(0); c.keyDown("ArrowLeft",0); c.keyDown("KeyC",50); c.command("hard-drop",100); c.tick(150);
  expect(g.snapshot().active!.x).toBe(2);
  expect(g.snapshot().grounded!.elapsedMs).toBe(50);
  c.togglePause(200); const before=g.snapshot(); c.tick(1000);
  expect(g.snapshot()).toEqual(before); c.togglePause(1000); c.tick(1150);
  // The repeat due at 200 runs before pausing; resume must not add another.
  expect(g.snapshot().active!.x).toBe(1);
});

test("bag restart creates new lazy state; snapshots/drop do not call randomness", () => {
  let calls=0;
  const g=new GameSession(()=>sevenBagPieceSource(()=>{calls++;return 0.999;}));
  expect(calls).toBe(0); g.start(); expect(calls).toBe(6);
  g.command("hold"); g.command("hard-drop"); g.snapshot(); g.snapshot(); expect(calls).toBe(6);
  g.restart(); expect(calls).toBe(12);
  expect(g.snapshot()).toMatchObject({active:{type:"I",y:0},next:"J",held:null,holdAvailable:true});
});

test("occupied blocked hold terminates coherently without any source draw", () => {
  let draws=0;
  const g=new GameSession(()=>{let n=0;return()=>{draws++;return n++===0?"I":"O" as PieceType;};});
  g.start(); g.command("hold");
  for(let n=0;n<10;n++){g.command("right");g.command("right");g.command("hard-drop");g.advance(1000);}
  const before=g.snapshot(),count=draws; g.command("hold");
  expect(draws).toBe(count);
  expect(g.snapshot()).toMatchObject({status:"game-over",held:"O",next:"O",active:null,ghost:null,holdAvailable:false});
  expect(g.snapshot().board).toEqual(before.board);expect(g.snapshot().score).toBe(before.score);
});

test("interleaved drop/kick/hold and split elapsed time produce identical observations", () => {
  const a=new GameSession(sequenceFactory(["I","T","L"])), b=new GameSession(sequenceFactory(["I","T","L"]));
  for(const g of [a,b]) {g.start();g.command("hard-drop");g.command("rotate-clockwise");}
  a.advance(400); for(const t of [123,77,200])b.advance(t);
  for(const g of [a,b]) {g.pause();g.advance(1000);g.resume();g.command("hold");g.command("hard-drop");}
  a.advance(1000); for(const t of [250,250,250,250])b.advance(t);
  expect(a.snapshot()).toEqual(b.snapshot());
});
