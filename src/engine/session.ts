/** Synchronous aggregate owner. Commands/time are supplied externally; observations are detached. */
import { emptyBoard } from './board';
import { spawnOrigin } from './pieces';
import type { GameSnapshot, PieceSource, PieceSourceFactory } from './types';

/** Own a session and its injected source factory; construction performs no source draw. */
export class GameSession {
  private state: GameSnapshot = { status:'idle',board:emptyBoard(),active:null,next:null,score:0,lines:0,level:1,gravityIntervalMs:1000,gravityElapsedMs:0,grounded:null };
  private source: PieceSource | null = null;
  constructor(private readonly factory: PieceSourceFactory) {}
  /** Start only an idle session. */
  start(): void { if(this.state.status==='idle') this.restart(); }
  /** Initialize a fresh running session from any lifecycle state. */
  restart(): void {
    const source=this.factory(), type=source(), next=source();
    this.state={status:'running',board:emptyBoard(),active:{type,orientation:0,...spawnOrigin(type)},next,score:0,lines:0,level:1,gravityIntervalMs:1000,gravityElapsedMs:0,grounded:null};
    this.source=source;
  }
  /** Return an independently owned nested snapshot. */
  snapshot(): GameSnapshot { return structuredClone(this.state); }
}
