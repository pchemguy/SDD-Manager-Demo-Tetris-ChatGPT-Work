/** Paint a detached board value. Canvas never supplies game inputs or owns simulation state. */
import {pieceCells} from '../engine/pieces';
import type {GameSnapshot,PieceType} from '../engine/types';
const colors:Record<PieceType,string>={I:'#65dbe8',J:'#769dff',L:'#ffb267',O:'#f5db65',S:'#8dda8a',T:'#c79afb',Z:'#f47d91'};
export function boardRenderer(canvas:HTMLCanvasElement):(state:GameSnapshot)=>void {
  const context=canvas.getContext('2d');if(!context)throw new Error('Canvas is unavailable in this browser.');
  return state=>{
    const cell=canvas.width/10;context.fillStyle='#101c2c';context.fillRect(0,0,canvas.width,canvas.height);
    const draw=(x:number,y:number,type:PieceType)=>{context.fillStyle=colors[type];context.fillRect(x*cell+1,y*cell+1,cell-2,cell-2);};
    for(let y=0;y<20;y++)for(let x=0;x<10;x++){context.strokeStyle='#243348';context.strokeRect(x*cell,y*cell,cell,cell);const type=state.board[y][x];if(type)draw(x,y,type);}
    if(state.active)for(const p of pieceCells(state.active.type,state.active.orientation))draw(p.x+state.active.x,p.y+state.active.y,state.active.type);
  };
}

/** Draw orientation-zero next shape into its own local Canvas, never into the board. */
export function previewRenderer(canvas:HTMLCanvasElement):(state:GameSnapshot)=>void {
 const context=canvas.getContext('2d');if(!context)throw new Error('Canvas is unavailable in this browser.');
 return state=>{context.fillStyle='#101c2c';context.fillRect(0,0,canvas.width,canvas.height);if(state.next){const cell=canvas.width/4;context.fillStyle=colors[state.next];for(const p of pieceCells(state.next))context.fillRect(p.x*cell+1,p.y*cell+1,cell-2,cell-2);}};
}
