/** Initial one-shot mapping; controlled repeat/focus policy is delivered in milestone 1.3. */
import type {GameCommand} from '../engine/types';
export function mappedCommand(code:string):GameCommand|null {
  return ({ArrowDown:'soft-drop',ArrowLeft:'left',ArrowRight:'right',ArrowUp:'rotate-clockwise',KeyX:'rotate-clockwise',KeyZ:'rotate-counterclockwise'} as Record<string,GameCommand>)[code]??null;
}
