// Core Game Logic for Tic-Tac-Toe

import {
  Board,
  Player,
  GameState,
  CellValue,
  WINNING_COMBINATIONS,
  INITIAL_BOARD,
  Move,
  WinningLine
} from '@core/types';

/**
 * Check if there's a winner on the board
 * @param board Current board state
 * @returns Winner player or null if no winner
 */
export const checkWinner = (board: Board): Player | null => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
};

/**
 * Check if the game is a draw (board full with no winner)
 * @param board Current board state
 * @returns True if the game is a draw
 */
export const checkDraw = (board: Board): boolean => {
  return board.every(cell => cell !== null) && !checkWinner(board);
};

/**
 * Get the winning line indices if there's a winner
 * @param board Current board state
 * @returns Array of winning indices or null
 */
export const getWinningLine = (board: Board): number[] | null => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  return null;
};

/**
 * Make a move on the board
 * @param board Current board state
 * @param index Square index to place the move
 * @param player Player making the move
 * @returns New board state or null if move is invalid
 */
export const makeMove = (board: Board, index: number, player: Player): Board | null => {
  if (index < 0 || index >= 9 || board[index] !== null) {
    return null; // Invalid move
  }
  
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};

/**
 * Get available moves (empty squares)
 * @param board Current board state
 * @returns Array of available move indices
 */
export const getAvailableMoves = (board: Board): number[] => {
  return board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null) as number[];
};

/**
 * Switch to the other player
 * @param currentPlayer Current player
 * @returns Other player
 */
export const switchPlayer = (currentPlayer: Player): Player => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

/**
 * Check if a move is valid
 * @param board Current board state
 * @param index Square index to check
 * @returns True if the move is valid
 */
export const isValidMove = (board: Board, index: number): boolean => {
  return index >= 0 && index < 9 && board[index] === null;
};

/**
 * Create a new game state
 * @param gameMode Game mode to set
 * @returns Initial game state
 */
export const createNewGameState = (gameMode: 'ai' | 'player' | 'menu' = 'menu'): GameState => {
  return {
    board: [...INITIAL_BOARD],
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    isGameOver: false,
    gameMode,
    moveCount: 0,
  };
};

/**
 * Update game state after a move
 * @param gameState Current game state
 * @param moveIndex Index of the move
 * @returns Updated game state
 */
export const updateGameState = (gameState: GameState, moveIndex: number): GameState => {
  const newBoard = makeMove(gameState.board, moveIndex, gameState.currentPlayer);
  
  if (!newBoard) {
    return gameState; // Invalid move, return unchanged state
  }
  
  const winner = checkWinner(newBoard);
  const isDraw = checkDraw(newBoard);
  const isGameOver = winner !== null || isDraw;
  
  return {
    ...gameState,
    board: newBoard,
    currentPlayer: isGameOver ? gameState.currentPlayer : switchPlayer(gameState.currentPlayer),
    winner,
    isDraw,
    isGameOver,
    moveCount: gameState.moveCount + 1,
  };
};

/**
 * Get game status message
 * @param gameState Current game state
 * @returns Status message string
 */
export const getGameStatusMessage = (gameState: GameState): string => {
  if (gameState.winner) {
    return `Player ${gameState.winner} wins!`;
  }
  
  if (gameState.isDraw) {
    return "It's a draw!";
  }
  
  if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O') {
    return "AI is thinking...";
  }
  
  return `Player ${gameState.currentPlayer}'s turn`;
};

/**
 * Check if it's AI's turn
 * @param gameState Current game state
 * @returns True if it's AI's turn
 */
export const isAITurn = (gameState: GameState): boolean => {
  return gameState.gameMode === 'ai' && 
         gameState.currentPlayer === 'O' && 
         !gameState.isGameOver;
};

/**
 * Get the pattern type of a winning line
 * @param winningIndices Winning line indices
 * @returns Pattern type
 */
export const getWinningPattern = (winningIndices: number[]): 'row' | 'column' | 'diagonal' => {
  const [a, b, c] = winningIndices.sort((x, y) => x - y);
  
  // Check for rows
  if (Math.floor(a / 3) === Math.floor(b / 3) && Math.floor(b / 3) === Math.floor(c / 3)) {
    return 'row';
  }
  
  // Check for columns
  if (a % 3 === b % 3 && b % 3 === c % 3) {
    return 'column';
  }
  
  // Must be diagonal
  return 'diagonal';
};

export default {
  checkWinner,
  checkDraw,
  getWinningLine,
  makeMove,
  getAvailableMoves,
  switchPlayer,
  isValidMove,
  createNewGameState,
  updateGameState,
  getGameStatusMessage,
  isAITurn,
  getWinningPattern,
}; 