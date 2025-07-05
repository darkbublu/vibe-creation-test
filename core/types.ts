// try
//505
export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

<<<<<<< HEAD
export type UserRole = 'admin' | 'user' | 'moderator';
// #endregion

// #region Authentication Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegistrationData extends LoginCredentials {
  email: string;
  confirmPassword: string;
}
// #endregion

// #region API Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
// #endregion

// Game Types and Interfaces for Tic-Tac-Toe

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isGameOver: boolean;
  gameMode: GameMode;
  moveCount: number;
}

export type GameMode = 'ai' | 'player' | 'menu';

export interface GameStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
}

export interface Move {
  index: number;
  player: Player;
}

export interface GameConfig {
  aiDifficulty: 'easy' | 'medium' | 'hard';
  firstPlayer: Player;
}

export interface WinningLine {
  indices: number[];
  pattern: 'row' | 'column' | 'diagonal';
}

// AI Types
export interface AIMove {
  index: number;
  score: number;
}

export interface GameContextType {
  gameState: GameState;
  stats: GameStats;
  makeMove: (index: number) => void;
  resetGame: () => void;
  setGameMode: (mode: GameMode) => void;
  newGame: (mode: GameMode) => void;
}

// UI Component Props
export interface SquareProps {
  value: CellValue;
  onClick: () => void;
  isWinning?: boolean;
  disabled?: boolean;
}

export interface BoardProps {
  board: Board;
  onSquareClick: (index: number) => void;
  winningLine?: number[];
  disabled?: boolean;
}

export interface GameInfoProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  gameMode: GameMode;
  moveCount: number;
}

export interface GameMenuProps {
  onModeSelect: (mode: GameMode) => void;
  stats: GameStats;
}

export interface StatsDisplayProps {
  stats: GameStats;
}

// Constants
export const INITIAL_BOARD: Board = Array(9).fill(null);

export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export const INITIAL_GAME_STATE: GameState = {
  board: INITIAL_BOARD,
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  isGameOver: false,
  gameMode: 'menu',
  moveCount: 0,
};

export const INITIAL_STATS: GameStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  winRate: 0,
}; 
=======
85
>>>>>>> 9228db559405d0bcf1ff3e8daf4b4a36c5f738af
