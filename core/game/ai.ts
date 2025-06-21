---
id: 2b5baa18-2b5b-2b5b-2b5b-2b5baa18
path: core/game/ai.ts
level: file
title: "Ai"
description: "TypeScript module"
---

// AI Logic for Tic-Tac-Toe using Minimax Algorithm
//test
//testttt
//get ur done
import {
  Board,
  Player,
  AIMove,
  GameConfig
} from '@core/types';

import {
  checkWinner,
  checkDraw,
  getAvailableMoves,
  makeMove,
  switchPlayer
} from './logic';

/**
 * Minimax algorithm to find the best move for AI
 * @param board Current board state
 * @param depth Current depth in the game tree
 * @param isMaximizing Whether we're maximizing (AI turn) or minimizing (player turn)
 * @param aiPlayer AI player symbol
 * @param humanPlayer Human player symbol
 * @returns Score for this board position
 */
const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player
): number => {
  const winner = checkWinner(board);
  
  // Terminal states
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (checkDraw(board)) return 0;
  
  const availableMoves = getAvailableMoves(board);
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, aiPlayer);
      if (newBoard) {
        const score = minimax(newBoard, depth + 1, false, aiPlayer, humanPlayer);
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, humanPlayer);
      if (newBoard) {
        const score = minimax(newBoard, depth + 1, true, aiPlayer, humanPlayer);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

/**
 * Get the best move for AI using minimax algorithm
 * @param board Current board state
 * @param aiPlayer AI player symbol (default 'O')
 * @param difficulty AI difficulty level
 * @returns Best move index
 */
export const getBestMove = (
  board: Board,
  aiPlayer: Player = 'O',
  difficulty: 'easy' | 'medium' | 'hard' = 'hard'
): number => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    return -1; // No moves available
  }
  
  // Easy difficulty: Random move with some strategy
  if (difficulty === 'easy') {
    return getEasyMove(board, aiPlayer, humanPlayer, availableMoves);
  }
  
  // Medium difficulty: Mix of minimax and random
  if (difficulty === 'medium') {
    return getMediumMove(board, aiPlayer, humanPlayer, availableMoves);
  }
  
  // Hard difficulty: Pure minimax
  let bestMove = availableMoves[0];
  let bestScore = -Infinity;
  
  for (const move of availableMoves) {
    const newBoard = makeMove(board, move, aiPlayer);
    if (newBoard) {
      const score = minimax(newBoard, 0, false, aiPlayer, humanPlayer);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }
  
  return bestMove;
};

/**
 * Easy AI: Mostly random with basic blocking
 */
const getEasyMove = (
  board: Board,
  aiPlayer: Player,
  humanPlayer: Player,
  availableMoves: number[]
): number => {
  // 30% chance to make optimal move, 70% random
  if (Math.random() < 0.3) {
    return getOptimalMove(board, aiPlayer, humanPlayer, availableMoves);
  }
  
  // Block immediate wins 50% of the time
  if (Math.random() < 0.5) {
    const blockingMove = findBlockingMove(board, humanPlayer, availableMoves);
    if (blockingMove !== -1) return blockingMove;
  }
  
  // Otherwise random move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

/**
 * Medium AI: Strategic with some randomness
 */
const getMediumMove = (
  board: Board,
  aiPlayer: Player,
  humanPlayer: Player,
  availableMoves: number[]
): number => {
  // 70% chance to make optimal move, 30% random
  if (Math.random() < 0.7) {
    return getOptimalMove(board, aiPlayer, humanPlayer, availableMoves);
  }
  
  // Take center if available
  if (availableMoves.includes(4)) return 4;
  
  // Take corners
  const corners = [0, 2, 6, 8].filter(corner => availableMoves.includes(corner));
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }
  
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

/**
 * Get optimal move using minimax
 */
const getOptimalMove = (
  board: Board,
  aiPlayer: Player,
  humanPlayer: Player,
  availableMoves: number[]
): number => {
  let bestMove = availableMoves[0];
  let bestScore = -Infinity;
  
  for (const move of availableMoves) {
    const newBoard = makeMove(board, move, aiPlayer);
    if (newBoard) {
      const score = minimax(newBoard, 0, false, aiPlayer, humanPlayer);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }
  
  return bestMove;
};

/**
 * Find a move that blocks the opponent from winning
 */
const findBlockingMove = (
  board: Board,
  humanPlayer: Player,
  availableMoves: number[]
): number => {
  for (const move of availableMoves) {
    const testBoard = makeMove(board, move, humanPlayer);
    if (testBoard && checkWinner(testBoard) === humanPlayer) {
      return move; // This move would let human win, so block it
    }
  }
  return -1;
};

/**
 * Find a move that wins the game immediately
 */
export const findWinningMove = (
  board: Board,
  player: Player
): number => {
  const availableMoves = getAvailableMoves(board);
  
  for (const move of availableMoves) {
    const testBoard = makeMove(board, move, player);
    if (testBoard && checkWinner(testBoard) === player) {
      return move;
    }
  }
  
  return -1;
};

/**
 * Get AI move with delay to simulate thinking
 * @param board Current board state
 * @param aiPlayer AI player symbol
 * @param difficulty AI difficulty
 * @param delay Delay in milliseconds
 * @returns Promise that resolves to the AI move
 */
export const getAIMove = (
  board: Board,
  aiPlayer: Player = 'O',
  difficulty: 'easy' | 'medium' | 'hard' = 'hard',
  delay: number = 1000
): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const move = getBestMove(board, aiPlayer, difficulty);
      resolve(move);
    }, delay);
  });
};

/**
 * Evaluate the current board position
 * @param board Current board state
 * @param aiPlayer AI player symbol
 * @returns Score evaluation
 */
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
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  
  for (const [a, b, c] of combinations) {
    score += evaluateLine(board[a], board[b], board[c], aiPlayer);
  }
  
  return score;
};

/**
 * Evaluate a single line (row, column, or diagonal)
 */
const evaluateLine = (
  cell1: Player | null,
  cell2: Player | null,
  cell3: Player | null,
  aiPlayer: Player
): number => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  let score = 0;
  
  // Count AI and human pieces in this line
  const aiCount = [cell1, cell2, cell3].filter(cell => cell === aiPlayer).length;
  const humanCount = [cell1, cell2, cell3].filter(cell => cell === humanPlayer).length;
  const emptyCount = [cell1, cell2, cell3].filter(cell => cell === null).length;
  
  if (aiCount === 3) score += 10;
  else if (aiCount === 2 && emptyCount === 1) score += 2;
  else if (aiCount === 1 && emptyCount === 2) score += 1;
  
  if (humanCount === 3) score -= 10;
  else if (humanCount === 2 && emptyCount === 1) score -= 2;
  else if (humanCount === 1 && emptyCount === 2) score -= 1;
  
  return score;
};

export default {
  getBestMove,
  getAIMove,
  findWinningMove,
  evaluateBoard,
}; 