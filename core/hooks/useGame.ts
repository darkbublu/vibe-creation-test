// Custom Hook for Game State Management

import { useState, useEffect, useCallback } from 'react';
import {
  GameState,
  GameMode,
  Player,
  INITIAL_GAME_STATE
} from '@core/types';

import {
  updateGameState,
  createNewGameState,
  isAITurn,
  getWinningLine
} from '@core/game/logic';

import { getAIMove } from '@core/game/ai';
import {
  saveGameState,
  loadGameState,
  clearSavedGameState
} from '@core/game/utils';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [isAIThinking, setIsAIThinking] = useState(false);

  // Load saved game state on mount
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState && !savedState.isGameOver) {
      setGameState(savedState);
    }
  }, []);

  // Save game state whenever it changes
  useEffect(() => {
    if (gameState.moveCount > 0) {
      saveGameState(gameState);
    }
  }, [gameState]);

  // Handle AI moves
  useEffect(() => {
    const makeAIMove = async () => {
      if (isAITurn(gameState) && !isAIThinking) {
        setIsAIThinking(true);
        
        try {
          const aiMoveIndex = await getAIMove(gameState.board, 'O', 'hard', 800);
          
                     if (aiMoveIndex !== -1) {
             setGameState((prevState: GameState) => updateGameState(prevState, aiMoveIndex));
           }
        } catch (error) {
          console.error('AI move failed:', error);
        } finally {
          setIsAIThinking(false);
        }
      }
    };

    makeAIMove();
  }, [gameState, isAIThinking]);

  /**
   * Make a move at the specified index
   */
  const makeMove = useCallback((index: number) => {
    if (
      gameState.isGameOver ||
      gameState.board[index] !== null ||
      isAIThinking ||
      (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O')
    ) {
      return;
    }

         setGameState((prevState: GameState) => updateGameState(prevState, index));
  }, [gameState, isAIThinking]);

  /**
   * Start a new game with the specified mode
   */
  const newGame = useCallback((mode: GameMode) => {
    clearSavedGameState();
    setGameState(createNewGameState(mode));
    setIsAIThinking(false);
  }, []);

  /**
   * Reset the current game (keep same mode)
   */
  const resetGame = useCallback(() => {
    clearSavedGameState();
    setGameState((prevState: GameState) => createNewGameState(prevState.gameMode));
    setIsAIThinking(false);
  }, []);

  /**
   * Set the game mode
   */
  const setGameMode = useCallback((mode: GameMode) => {
    setGameState((prevState: GameState) => ({
      ...prevState,
      gameMode: mode
    }));
  }, []);

  /**
   * Go back to menu
   */
  const goToMenu = useCallback(() => {
    setGameMode('menu');
  }, [setGameMode]);

  /**
   * Get the winning line for highlighting
   */
  const winningLine = getWinningLine(gameState.board);

  return {
    gameState,
    isAIThinking,
    winningLine,
    makeMove,
    newGame,
    resetGame,
    setGameMode,
    goToMenu,
  };
};

export default useGame; 