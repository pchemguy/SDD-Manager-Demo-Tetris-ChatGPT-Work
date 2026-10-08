/** Injected random sources: independent draws or lazy complete seven-piece bags. */
import type { PieceSource, PieceType } from "./types";
import { PIECE_TYPES } from "./pieces";
/** Supply one independent piece per call from a random value in [0,1). */
export function randomPieceSource(random: () => number): PieceSource {
  return () => PIECE_TYPES[Math.floor(random() * PIECE_TYPES.length)];
}

/** Return shuffled bags in index order using six descending Fisher–Yates draws.
 * Construction is lazy. Failed refill publishes no partial bag; consumed randomness
 * is not rolled back. Every instance owns its own bag and cursor.
 * @throws TypeError unless every random result is finite numeric and in [0,1).
 * Collaborator exceptions propagate unchanged.
 */
export function sevenBagPieceSource(random: () => number): PieceSource {
  let bag: PieceType[] = [], cursor = 0;
  return () => {
    if (cursor === bag.length) {
      const next = [...PIECE_TYPES];
      for (let i = next.length - 1; i > 0; i--) {
        const r = random();
        if (typeof r !== "number" || !Number.isFinite(r) || r < 0 || r >= 1)
          throw new TypeError("Random values must be finite numbers in [0,1).");
        const j = Math.floor(r * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      bag = next;
      cursor = 0;
    }
    return bag[cursor++];
  };
}
