/** Public session contract scenarios use deterministic sources and detached observations. */
import { expect, test } from 'vitest';
import { GameSession } from '../../src/engine/session';
import { sequenceFactory } from '../fixtures/piece-sources';

test('idle draws nothing and start draws active followed by exactly one preview', () => {
  let factories=0,draws=0;
  const session=new GameSession(()=>{factories++;return ()=>{draws++;return 'O';};});
  expect(factories).toBe(0); expect(draws).toBe(0);
  expect(session.snapshot()).toMatchObject({status:'idle',active:null,next:null,score:0,lines:0,level:1});
  session.start();
  expect(session.snapshot()).toMatchObject({status:'running',active:{type:'O',orientation:0,x:4,y:0},next:'O'});
  expect(draws).toBe(2); expect(factories).toBe(1);
  session.start(); expect(draws).toBe(2); expect(factories).toBe(1);
});
test('restart creates a fresh source and resets initialization', () => {
  const session=new GameSession(sequenceFactory(['T','I','Z']));
  session.start(); session.restart();
  expect(session.snapshot()).toMatchObject({active:{type:'T',orientation:0,x:3,y:0},next:'I',gravityElapsedMs:0,score:0,lines:0,level:1});
});
test('snapshot nested mutation cannot change current or subsequent engine state', () => {
  const session=new GameSession(sequenceFactory(['J','L']));session.start();
  const snapshot=session.snapshot(); expect(snapshot.active).not.toBeNull(); snapshot.board[0][0]='Z'; snapshot.active!.x=99;
  expect(session.snapshot().board[0][0]).toBeNull(); expect(session.snapshot().active!.x).toBe(3);
});
