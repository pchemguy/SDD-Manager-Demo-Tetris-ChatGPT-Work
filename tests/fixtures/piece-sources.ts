/** Controlled piece sequences for contract tests, never imported by production. */
import type { PieceType, PieceSourceFactory } from "../../src/engine/types";
export function sequenceFactory(
  sequence: readonly PieceType[],
): PieceSourceFactory {
  return () => {
    let index = 0;
    return () => sequence[index++ % sequence.length];
  };
}
