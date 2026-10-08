/** Literal placement/compaction fixtures protect bounds, collisions and row ordering. */
import { expect, test } from 'vitest';
import { emptyBoard, canPlace, mergeAndClear } from '../../src/engine/board';

test('empty board has independent rows and legal placements use occupied cells only', () => {
  const board = emptyBoard();
  expect(board).toHaveLength(20); expect(board[0]).toHaveLength(10);
  board[0][0] = 'Z'; expect(board[1][0]).toBeNull();
  board[0][0] = null;
  expect(canPlace(board, { type: 'I', orientation: 1, x: -2, y: 0 })).toBe(true);
  expect(canPlace(board, { type: 'I', orientation: 0, x: 3, y: -1 })).toBe(true);
});
test('occupied-cell bounds and settled collisions reject placement', () => {
  const board = emptyBoard(); board[10][5] = 'Z';
  for (const [x,y] of [[-1,0],[9,0],[0,-1],[0,19],[4,9]]) {
    expect(canPlace(board, { type:'O', orientation:0, x,y })).toBe(false);
  }
  expect(canPlace(board, { type:'O', orientation:0, x:0,y:18 })).toBe(true);
});
test.each([1,2,3,4])('clears %i complete rows simultaneously and preserves remaining order', count => {
  const board = emptyBoard(); board[10][8] = 'J'; board[11][8] = 'L';
  for (let y=20-count;y<20;y++) board[y].fill('I');
  const result = mergeAndClear(board, { type:'O', orientation:0, x:0,y:0 });
  expect(result.cleared).toBe(count); expect(result.board).toHaveLength(20);
  expect(result.board.slice(0,count).flat().every(c => c === null)).toBe(true);
  expect(result.board[10+count][8]).toBe('J'); expect(result.board[11+count][8]).toBe('L');
  expect(board[0][0]).toBeNull(); expect(board[19].every(c => c === 'I')).toBe(true);
});
test('merge fills four cells without mutating the input and rejects invalid placement', () => {
  const board = emptyBoard(); const p = { type:'O' as const, orientation:0,x:4,y:18 };
  const result = mergeAndClear(board,p);
  expect(result.cleared).toBe(0); expect(result.board.flat().filter(Boolean)).toHaveLength(4);
  expect(board.flat().filter(Boolean)).toHaveLength(0);
  expect(() => mergeAndClear(board,{...p,x:9})).toThrow(RangeError);
});
