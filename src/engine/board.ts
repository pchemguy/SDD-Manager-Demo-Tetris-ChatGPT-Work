/** Pure settled-board operations; the game session owns the mutable aggregate. */
import type { ActivePiece, Board } from './types';
import { pieceCells } from './pieces';
/** Construct an empty 20-by-10 board with independently owned rows. */
export function emptyBoard(): Board { return Array.from({length:20},()=>Array(10).fill(null)); }
/** Check only occupied shape cells against bounds and settled cells. */
export function canPlace(board: Board, piece: ActivePiece): boolean {
  return pieceCells(piece.type,piece.orientation).every(cell => {
    const x = piece.x + cell.x, y = piece.y + cell.y;
    return x >= 0 && x < 10 && y >= 0 && y < 20 && board[y][x] === null;
  });
}
/** Merge a valid active piece and compact complete rows without mutating input. */
export function mergeAndClear(board: Board, piece: ActivePiece): { board: Board; cleared: number } {
  if (!canPlace(board,piece)) throw new RangeError('Cannot merge an invalid placement');
  const merged = board.map(row=>[...row]);
  for (const cell of pieceCells(piece.type,piece.orientation)) merged[piece.y+cell.y][piece.x+cell.x] = piece.type;
  const remaining = merged.filter(row=>row.some(cell=>cell===null));
  const cleared = 20-remaining.length;
  return { board: [...Array.from({length:cleared},()=>Array(10).fill(null)),...remaining], cleared };
}
