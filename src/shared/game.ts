import { Points, PlayerState, Point, PointMap } from "../types/state";
import { SYMBOL, PLAYER, GRID } from "../shared/constants";

const createIndexes = (grid: GRID) =>
  Array(grid)
    .fill(0)
    .map((e, i) => e + i);

const findPointByCoor = (
  points: PointMap,
  x: number,
  y: number
): Point | undefined => points[`${x}x${y}`];

const findAndAdd = (
  points: PointMap,
  x: number,
  y: number,
  matches: Points,
  symbol: SYMBOL
) => {
  const point = findPointByCoor(points, x, y);
  if (!point || point.state !== symbol) {
    matches.splice(0, matches.length);
    return false;
  }
  if (point.state === symbol) {
    matches.push(point);
  }
  if (matches.length > 4) {
    return true;
  }
};

const getUpX = (points: PointMap, grid: GRID, symbol: SYMBOL) => (
  startX: number
): Points => {
  const sequence = [];
  for (let x = startX, y = grid - 1; x < grid; x++, y--) {
    if (findAndAdd(points, x, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getDownY = (points: PointMap, grid: GRID, symbol: SYMBOL) => (
  startY: number
): Points => {
  const sequence = [];
  for (let x = 0, y = startY; y < grid; y++, x++) {
    if (findAndAdd(points, x, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getDownX = (points: PointMap, grid: GRID, symbol: SYMBOL) => (
  startX: number
): Points => {
  const sequence = [];
  for (let x = startX, y = 0; x < grid; x++, y++) {
    if (findAndAdd(points, x, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getUpY = (points: PointMap, grid: GRID, symbol: SYMBOL) => (
  endY: number
): Points => {
  const sequence = [];
  for (let x = 0, y = grid - endY - 1; y >= 0; y--, x++) {
    if (findAndAdd(points, x, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getRow = (points: PointMap, grid: GRID, symbol: SYMBOL) => (
  row: number
): Points => {
  const sequence = [];
  for (let x = 0; x < grid; x++) {
    if (findAndAdd(points, x, row, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getColumn = (points: PointMap, grid: GRID, symbol: SYMBOL) => (
  column: number
): Points => {
  const sequence = [];
  for (let y = 0; y < grid; y++) {
    if (findAndAdd(points, column, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const createCombineResults = (
  pointMap: PointMap,
  grid: GRID,
  symbol: SYMBOL
) => (callback: (index: number) => Points): Array<Points> => {
  const indexes = createIndexes(grid);
  const initiatedCallback = callback(pointMap, grid, symbol);
  for (let i = 0; i < grid; i++) {
    const matchedSequence = initiatedCallback(i);
    if (Array.isArray(matchedSequence) && matchedSequence.length > 4) {
      return matchedSequence;
    }
  }
  return null;
};

const findFirstFive = (generateSequences: Function) => (
  ...callbacks
): Array<Points> | null => {
  for (let cb of callbacks) {
    const sequence = generateSequences(cb);
    if (sequence) {
      return sequence;
    }
  }
  return null;
};

export const getVictoriousMatch = (
  points: Points,
  grid: GRID,
  symbol: SYMBOL
): Array<Points> | null => {
  const markedPoints = points.filter(p => p.state != null);
  const pointMap = markedPoints.reduce((result, point) => {
    result[point.key] = point;
    return result;
  }, {});
  const generateSequences = createCombineResults(pointMap, grid, symbol);
  return findFirstFive(generateSequences)(
    getUpX,
    getDownY,
    getDownX,
    getUpY,
    getRow,
    getColumn
  );
};

export function createPlayer(
  player: PLAYER,
  name: string,
  symbol: SYMBOL
): PlayerState {
  return {
    id: player,
    name,
    pauseUsed: 0,
    symbol,
    wins: 0,
    timePlayed: 0
  };
}

export function generateBoard(size: GRID): Points {
  const grid = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid.push({ key: `${i}x${j}`, x: i, y: j, state: null });
    }
  }

  return grid;
}
