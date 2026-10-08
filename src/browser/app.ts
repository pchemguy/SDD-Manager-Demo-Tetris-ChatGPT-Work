/** Compose real source, engine, adapters and views; dispose removes the single frame loop/listeners. */
import {GameSession} from '../engine/session';
import {randomPieceSource} from '../engine/piece-source';
import {Controller} from './controller';
import {mappedCommand} from './keyboard';
import {boardRenderer,previewRenderer} from '../view/canvas';
import {statusRenderer} from '../view/status';
export function mount(root:Document):()=>void {
 const canvas=root.querySelector<HTMLCanvasElement>('#board')!,start=root.querySelector<HTMLButtonElement>('#start')!,restart=root.querySelector<HTMLButtonElement>('#restart')!;
 const session=new GameSession(()=>randomPieceSource(Math.random)),board=boardRenderer(canvas),status=statusRenderer(root),preview=previewRenderer(root.querySelector<HTMLCanvasElement>('#preview')!);
 const controller=new Controller(session,state=>{board(state);status(state);preview(state);});
 board(session.snapshot());status(session.snapshot());preview(session.snapshot());
 const onStart=()=>{controller.start(performance.now());canvas.focus();},onRestart=()=>{controller.restart(performance.now());canvas.focus();};
 const onKey=(event:KeyboardEvent)=>{if(event.repeat||event.target instanceof HTMLButtonElement)return;const command=mappedCommand(event.code);if(command){event.preventDefault();controller.command(command,performance.now());}else if(event.code==='Enter'){if(session.snapshot().status==='idle')onStart();else if(session.snapshot().status==='game-over')onRestart();}};
 start.addEventListener('click',onStart);restart.addEventListener('click',onRestart);root.addEventListener('keydown',onKey);
 let frame=0;const loop=(now:number)=>{controller.tick(now);frame=requestAnimationFrame(loop);};frame=requestAnimationFrame(loop);
 return()=>{cancelAnimationFrame(frame);start.removeEventListener('click',onStart);restart.removeEventListener('click',onRestart);root.removeEventListener('keydown',onKey);};
}
