/** Pure ordered rotation placement, using explicit project kick tables in y-down coordinates. */
import { canPlace } from "./board";
import type { ActivePiece, Board } from "./types";
type Offsets = readonly (readonly [number, number])[];
const normal: Record<string, Offsets> = {
  "0>1": [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
  "1>0": [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  "1>2": [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  "2>1": [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
  "2>3": [[0,0],[1,0],[1,-1],[0,2],[1,2]],
  "3>2": [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  "3>0": [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  "0>3": [[0,0],[1,0],[1,-1],[0,2],[1,2]],
};
const line: Record<string, Offsets> = {
  "0>1": [[0,0],[-2,0],[1,0],[-2,1],[1,-2]],
  "1>0": [[0,0],[2,0],[-1,0],[2,-1],[-1,2]],
  "1>2": [[0,0],[-1,0],[2,0],[-1,-2],[2,1]],
  "2>1": [[0,0],[1,0],[-2,0],[1,2],[-2,-1]],
  "2>3": [[0,0],[2,0],[-1,0],[2,-1],[-1,2]],
  "3>2": [[0,0],[-2,0],[1,0],[-2,1],[1,-2]],
  "3>0": [[0,0],[1,0],[-2,0],[1,2],[-2,-1]],
  "0>3": [[0,0],[-1,0],[2,0],[-1,-2],[2,1]],
};
/** Return detached candidates relative to the original valid piece, in normative order.
 * Direction 1 is clockwise, -1 counterclockwise; O retains its original value.
 * Geometry uses visible rows only. This helper owns no board or contact state.
 */
export function rotationCandidates(piece: ActivePiece, direction: 1 | -1): ActivePiece[] {
  if (piece.type === "O") return [{ ...piece }];
  const orientation = (piece.orientation + direction + 4) % 4;
  const offsets = (piece.type === "I" ? line : normal)[`${piece.orientation}>${orientation}`];
  return offsets.map(([dx,dy]) => ({ ...piece, orientation, x: piece.x + dx, y: piece.y + dy }));
}
/** Select the first legal rotated placement, or null when all candidates fail.
 * Neither input is mutated; occupied cells above visible row zero are invalid.
 */
export function rotatedPlacement(board: Board, piece: ActivePiece, direction: 1 | -1): ActivePiece | null {
  return rotationCandidates(piece, direction).find(candidate => canPlace(board, candidate)) ?? null;
}
