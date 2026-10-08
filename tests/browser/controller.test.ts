/** Controller collaborators are real engine sessions and a detached render observer. */
import {expect,test} from 'vitest';
import {GameSession} from '../../src/engine/session';
import {Controller} from '../../src/browser/controller';
import {sequenceFactory} from '../fixtures/piece-sources';
test('start/restart and basic inputs connect clock and engine without duplicate elapsed time',()=>{const g=new GameSession(sequenceFactory(['O','T']));const c=new Controller(g,()=>{});c.start(0);c.tick(100);c.command('left',200);c.tick(1000);expect(g.snapshot()).toMatchObject({active:{x:3,y:1},gravityElapsedMs:0});c.restart(1100);expect(g.snapshot()).toMatchObject({active:{x:4,y:0},gravityElapsedMs:0});});
