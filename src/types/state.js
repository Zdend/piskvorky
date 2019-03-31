export interface LimitInfo {
  label: string;
  timeLimit: number;
}

export interface Limit {
  [key: string]: LimitInfo;
}

export type Points = Array<Point>;
export interface PointMap {
  [key: string]: Point;
}

export interface PiskvorkyState {
  limit: number;
  grid: GRID;
  player1: PlayerState;
  player2: PlayerState;
  turn: PLAYER;
  board: Points;
  victor: PLAYER;
  victoriousSequence: Points;
  timePlayed: number;
}

export interface Point {
  key: string;
  x: number;
  y: number;
  state: SYMBOL | null;
}

export interface PlayerState {
  id: PLAYER;
  name: string;
  symbol: SYMBOL;
  wins: number;
}
