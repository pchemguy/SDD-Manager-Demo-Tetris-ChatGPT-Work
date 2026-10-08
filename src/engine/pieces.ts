/** Immutable tetromino geometry; placement and game state are owned by consumers. */
import type { PieceType, Point } from './types';
export const PIECE_TYPES: readonly PieceType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
const GRIDS: Record<PieceType, readonly string[]> = {
  I: ['....', 'XXXX', '....', '....'], J: ['X..', 'XXX', '...'],
  L: ['..X', 'XXX', '...'], O: ['XX', 'XX'], S: ['.XX', 'XX.', '...'],
  T: ['.X.', 'XXX', '...'], Z: ['XX.', '.XX', '...'],
};
/** Return fresh occupied local cells. Rotation uses the bounding square; O stays fixed. */
export function pieceCells(type: PieceType, orientation = 0): Point[] {
  const grid = GRIDS[type], n = grid.length;
  let cells = grid.flatMap((row, y) => [...row].flatMap((cell, x) => cell === 'X' ? [{ x, y }] : []));
  const turns = type === 'O' ? 0 : ((orientation % 4) + 4) % 4;
  for (let i = 0; i < turns; i++) cells = cells.map(({ x, y }) => ({ x: n - 1 - y, y: x }));
  return cells;
}
/** Return the bounding square's side length. */
export function pieceSize(type: PieceType): number { return GRIDS[type].length; }
/** Return the canonical top-left spawn origin. */
export function spawnOrigin(type: PieceType): Point { return { x: Math.floor((10 - pieceSize(type)) / 2), y: 0 }; }
