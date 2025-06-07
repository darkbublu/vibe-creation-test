// Custom Hook for Game Statistics Management

import { useState, useEffect, useCallback } from 'react';
import { GameStats, Player, GameMode } from '@core/types';

import {
  loadGameStats,
  updateGameStats as updateGameStatsUtil,
  resetGameStats as resetGameStatsUtil,
  formatGameStats
} from '@core/game/utils';

export const useStats = () => {
  const [stats, setStats] = useState<GameStats>(loadGameStats());

  // Load stats on mount
  useEffect(() => {
    setStats(loadGameStats());
  }, []);

  /**
   * Update statistics after a game ends
   */
  const updateStats = useCallback((winner: Player | null, gameMode: GameMode) => {
    if (gameMode === 'menu') return;
    
    setStats((prevStats: GameStats) => 
      updateGameStatsUtil(prevStats, winner, gameMode as 'ai' | 'player')
    );
  }, []);

  /**
   * Reset all statistics
   */
  const resetStats = useCallback(() => {
    const newStats = resetGameStatsUtil();
    setStats(newStats);
  }, []);

  /**
   * Get formatted statistics for display
   */
  const formattedStats = formatGameStats(stats);

  return {
    stats,
    formattedStats,
    updateStats,
    resetStats,
  };
};

export default useStats; 