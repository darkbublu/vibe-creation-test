// Game Utilities for Tic-Tac-Toe

import { GameStats, GameState, Player } from '@core/types';

/**
 * Local Storage Keys
 */
const STORAGE_KEYS = {
  GAME_STATS: 'tic-tac-toe-stats',
  GAME_STATE: 'tic-tac-toe-game-state',
  SETTINGS: 'tic-tac-toe-settings',
} as const;

/**
 * Save game statistics to local storage
 * @param stats Game statistics to save
 */
export const saveGameStats = (stats: GameStats): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATS, JSON.stringify(stats));
  } catch (error) {
    console.warn('Failed to save game stats:', error);
  }
};

/**
 * Load game statistics from local storage
 * @returns Saved game statistics or default stats
 */
export const loadGameStats = (): GameStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATS);
    if (saved) {
      const stats = JSON.parse(saved) as GameStats;
      // Recalculate win rate to ensure accuracy
      stats.winRate = stats.gamesPlayed > 0 ? (stats.wins / stats.gamesPlayed) * 100 : 0;
      return stats;
    }
  } catch (error) {
    console.warn('Failed to load game stats:', error);
  }
  
  return {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    winRate: 0,
  };
};

/**
 * Update game statistics after a game ends
 * @param currentStats Current statistics
 * @param winner Winner of the game (null for draw)
 * @param gameMode Game mode played
 * @returns Updated statistics
 */
export const updateGameStats = (
  currentStats: GameStats,
  winner: Player | null,
  gameMode: 'ai' | 'player'
): GameStats => {
  const newStats = { ...currentStats };
  newStats.gamesPlayed += 1;
  
  if (winner === null) {
    newStats.draws += 1;
  } else if (winner === 'X') {
    newStats.wins += 1;
  } else {
    newStats.losses += 1;
  }
  
  newStats.winRate = (newStats.wins / newStats.gamesPlayed) * 100;
  
  saveGameStats(newStats);
  return newStats;
};

/**
 * Reset game statistics
 * @returns Reset statistics
 */
export const resetGameStats = (): GameStats => {
  const resetStats: GameStats = {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    winRate: 0,
  };
  
  saveGameStats(resetStats);
  return resetStats;
};

/**
 * Save game state to local storage
 * @param gameState Game state to save
 */
export const saveGameState = (gameState: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
};

/**
 * Load game state from local storage
 * @returns Saved game state or null
 */
export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    if (saved) {
      return JSON.parse(saved) as GameState;
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
  }
  
  return null;
};

/**
 * Clear saved game state
 */
export const clearSavedGameState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
  } catch (error) {
    console.warn('Failed to clear saved game state:', error);
  }
};

/**
 * Format game statistics for display
 * @param stats Game statistics
 * @returns Formatted statistics object
 */
export const formatGameStats = (stats: GameStats) => {
  return {
    gamesPlayed: stats.gamesPlayed.toString(),
    wins: stats.wins.toString(),
    losses: stats.losses.toString(),
    draws: stats.draws.toString(),
    winRate: stats.winRate.toFixed(1) + '%',
  };
};

/**
 * Get game result message
 * @param winner Winner of the game
 * @param gameMode Game mode
 * @returns Result message
 */
export const getGameResultMessage = (
  winner: Player | null,
  gameMode: 'ai' | 'player'
): string => {
  if (winner === null) {
    return "It's a draw! 🤝";
  }
  
  if (gameMode === 'ai') {
    return winner === 'X' ? "You won! 🎉" : "AI won! 🤖";
  }
  
  return `Player ${winner} won! 🎉`;
};

/**
 * Get encouraging message based on game result
 * @param winner Winner of the game
 * @param gameMode Game mode
 * @returns Encouraging message
 */
export const getEncouragingMessage = (
  winner: Player | null,
  gameMode: 'ai' | 'player'
): string => {
  if (winner === null) {
    return "Great game! Both players played well.";
  }
  
  if (gameMode === 'ai') {
    if (winner === 'X') {
      return "Excellent strategy! You outplayed the AI.";
    } else {
      return "Don't give up! Try a different strategy next time.";
    }
  }
  
  return `Congratulations Player ${winner}! Well played.`;
};

/**
 * Generate a random game tip
 * @returns Random game tip
 */
export const getRandomGameTip = (): string => {
  const tips = [
    "Try to control the center square - it's the most valuable position!",
    "Look for opportunities to create multiple winning threats at once.",
    "Block your opponent's winning moves before going for your own.",
    "Corners are strong positions - they're part of multiple winning lines.",
    "Watch out for fork opportunities where you can win in two ways.",
    "Don't just focus on offense - defense is just as important!",
    "The first player (X) has a slight advantage if they play optimally.",
    "Try to think one move ahead of your opponent.",
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

/**
 * Check if local storage is available
 * @returns True if local storage is available
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, 'test');
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Debounce function to limit how often a function can be called
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format time duration in milliseconds to readable format
 * @param ms Time in milliseconds
 * @returns Formatted time string
 */
export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  
  return `${seconds}s`;
};

/**
 * Create a delay promise
 * @param ms Delay in milliseconds
 * @returns Promise that resolves after the delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default {
  saveGameStats,
  loadGameStats,
  updateGameStats,
  resetGameStats,
  saveGameState,
  loadGameState,
  clearSavedGameState,
  formatGameStats,
  getGameResultMessage,
  getEncouragingMessage,
  getRandomGameTip,
  isLocalStorageAvailable,
  debounce,
  formatDuration,
  delay,
}; 