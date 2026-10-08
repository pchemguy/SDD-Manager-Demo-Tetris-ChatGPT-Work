/** Coordinate browser elapsed time and explicit input; the engine alone owns gameplay state. */
import {GameSession} from '../engine/session';
import type {GameCommand,GameSnapshot} from '../engine/types';
export class Controller {
  private last: number|null=null;
  constructor(private readonly session:GameSession,private readonly render:(snapshot:GameSnapshot)=>void){}
  start(now:number):void {this.session.start();this.last=now;this.paint();}
  restart(now:number):void {this.session.restart();this.last=now;this.paint();}
  tick(now:number):void {if(this.last!==null)this.session.advance(Math.max(0,now-this.last));this.last=now;this.paint();}
  command(command:GameCommand,now:number):void {this.tick(now);this.session.command(command);this.paint();}
  private paint():void {this.render(this.session.snapshot());}
}
