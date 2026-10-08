/** SPEC awards use pre-clear level; thresholds and gravity floor are independently tabulated. */
import {expect,test} from 'vitest';
import {clearAward,levelForLines,gravityInterval} from '../../src/engine/progression';
test.each([1,3,10])('all clear awards at level %i',level=>{expect([0,1,2,3,4].map(n=>clearAward(n,level))).toEqual([0,100,300,500,800].map(n=>n*level));});
test.each([[0,1],[9,1],[10,2],[19,2],[20,3]])('lines %i level %i',(lines,level)=>expect(levelForLines(lines)).toBe(level));
test.each([[1,1000],[2,900],[9,200],[10,100],[11,100],[1000,100]])('level %i gravity %i',(level,ms)=>expect(gravityInterval(level)).toBe(ms));
