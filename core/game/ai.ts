---
id: 2b5baa18-2b5b-2b5b-2b5b-2b5baa18
path: core/game/ai.ts
level: file
title: "Ai"
description: "TypeScript module"
---


* Evaluate the current board position
 * @param board Current board state
 * @param aiPlayer AI player symbol
 * @returns Score evaluation
 */
//test
export const evaluateBoard = (board: Board, aiPlayer: Player): number => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  const winner = checkWinner(board);
  
  if (winner === aiPlayer) return 10;
  if (winner === humanPlayer) return -10;
  if (checkDraw(board)) return 0;
  
  // Evaluate position based on potential winning lines
  let score = 0;
  const combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagona