/** Synchronous aggregate owner. Commands/time are supplied externally; observations are detached. */
import { canPlace, emptyBoard, mergeAndClear } from './board';
import { spawnOrigin } from './pieces';
import type { ActivePiece, GameCommand, GameSnapshot, PieceSource, PieceSourceFactory } from './types';

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
  /** Attempt a discrete placement. Rejected moves preserve every timer. */
  command(command: GameCommand): void {
    if(this.state.status!=='running')return;
    const current=this.state.active!, candidate={...current};
    if(command==='left')candidate.x--;
    else if(command==='right')candidate.x++;
    else if(command==='rotate-clockwise')candidate.orientation=(candidate.orientation+1)%4;
    else if(command==='rotate-counterclockwise')candidate.orientation=(candidate.orientation+3)%4;
    else return; // Soft drop belongs to the progression increment.
    if(canPlace(this.state.board,candidate)){this.state.active=candidate;this.updateContact();}
  }
  /** Process due lock/gravity events in chronological order, carrying time across spawns. */
  advance(elapsedMs: number): void {
    if(this.state.status!=='running')return;
    let remaining=elapsedMs;
    while(this.state.status==='running'){
      const gravityDue=this.state.gravityIntervalMs-this.state.gravityElapsedMs;
      const lockDue=this.state.grounded ? this.state.grounded.intervalMs-this.state.grounded.elapsedMs : Infinity;
      const step=Math.min(remaining,gravityDue,lockDue);
      this.state.gravityElapsedMs+=step;
      if(this.state.grounded)this.state.grounded.elapsedMs+=step;
      remaining-=step;
      if(lockDue<=step){this.lock();}
      else if(gravityDue<=step){
        this.state.gravityElapsedMs=0;
        const candidate={...this.state.active!,y:this.state.active!.y+1};
        if(canPlace(this.state.board,candidate))this.state.active=candidate;
        this.updateContact();
      } else break;
      if(remaining===0)break;
    }
  }
  /** Publish an entire merge/clear/promotion transition after collaborator work succeeds. */
  private lock(): void {
    const {board}=mergeAndClear(this.state.board,this.state.active!);
    const type=this.state.next!, next=this.source!();
    const active: ActivePiece={type,orientation:0,...spawnOrigin(type)};
    const valid=canPlace(board,active);
    this.state={...this.state,board,next,active:valid?active:null,status:valid?'running':'game-over',gravityElapsedMs:0,grounded:null};
    if(valid)this.updateContact();
  }
  private updateContact(): void {
    const active=this.state.active!;
    if(canPlace(this.state.board,{...active,y:active.y+1}))this.state.grounded=null;
    else if(!this.state.grounded)this.state.grounded={elapsedMs:0,intervalMs:this.state.gravityIntervalMs};
  }
  /** Return an independently owned nested snapshot. */
  snapshot(): GameSnapshot { return structuredClone(this.state); }
}
