/** Pure landing placement shared by hard drop and ghost observation. */
import { canPlace } from "./board";
import type { ActivePiece, Board } from "./types";
/** Return a detached greatest continuous downward placement, stopping at first support.
 * Input must be a valid piece on the supplied board. Neither argument is mutated.
 */
export function landingPlacement(board: Board, piece: ActivePiece): ActivePiece {
  let landing = { ...piece };
  while (canPlace(board, { ...landing, y: landing.y + 1 }))
    landing = { ...landing, y: landing.y + 1 };
  return landing;
}
