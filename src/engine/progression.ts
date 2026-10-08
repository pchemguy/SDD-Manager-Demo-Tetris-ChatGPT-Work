/** Pure baseline scoring/speed rules. Callers supply valid clear counts and nonnegative counters. */
/** Award for zero through four simultaneous rows, multiplied by the pre-clear level. */
export function clearAward(cleared:number,level:number):number {return [0,100,300,500,800][cleared]*level;}
/** Ten cumulative cleared rows advance a level. */
export function levelForLines(lines:number):number {return 1+Math.floor(lines/10);}
/** Gravity decreases by 100 ms per level, to a 100 ms minimum. */
export function gravityInterval(level:number):number {return Math.max(100,1000-100*(level-1));}
