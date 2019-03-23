export interface LimitInfo {
  label: string;
  timeLimit: number;
}

export interface Limit {
  [key: string]: LimitInfo;
}

export interface PiskvorkyState {
  limit: number;
  grid: GRID;
  player1: PlayerState;
  player2: PlayerState;
  pausesPerGame: number;
  turn: PLAYER;
  board: Board;
}

export interface Point {
  key: string;
  x: number;
  y: number;
  state: SYMBOL | null;
}

export interface Board {
  [key: string]: Point;
}

export interface PlayerState {
  id: PLAYER;
  name: string;
  pauseUsed: number;
  symbol: SYMBOL;
  wins: number;
  timePlayed: number;
}
