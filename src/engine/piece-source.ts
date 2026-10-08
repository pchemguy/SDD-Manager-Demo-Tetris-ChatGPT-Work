/** Independently randomized identifiers; randomness is injected by the browser composition. */
import type { PieceSource } from "./types";
import { PIECE_TYPES } from "./pieces";
/** Supply one independent piece per call from a random value in [0,1). */
export function randomPieceSource(random: () => number): PieceSource {
  return () => PIECE_TYPES[Math.floor(random() * PIECE_TYPES.length)];
}
