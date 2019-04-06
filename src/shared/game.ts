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

const getDownLeft = (
  points: PointMap,
  point: Point,
  grid: GRID,
  symbol: SYMBOL
): Points => {
  const sequence = [];
  for (let x = point.x + 5, y = point.y - 5; y < point.y + 5; y++, x--) {
    if (findAndAdd(points, x, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getDownRight = (
  points: PointMap,
  point: Point,
  grid: GRID,
  symbol: SYMBOL
): Points => {
  const sequence = [];
  for (let x = point.x - 5, y = point.y - 5; x < point.x + 5; x++, y++) {
    if (findAndAdd(points, x, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getRow = (
  points: PointMap,
  point: Point,
  grid: GRID,
  symbol: SYMBOL
): Points => {
  const sequence = [];
  for (let x = point.x - 5; x < point.x + 5; x++) {
    if (findAndAdd(points, x, point.y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const getColumn = (
  points: PointMap,
  point: Point,
  grid: GRID,
  symbol: SYMBOL
): Points => {
  const sequence = [];
  for (let y = point.y - 5; y < point.y + 5; y++) {
    if (findAndAdd(points, point.x, y, sequence, symbol)) {
      return sequence;
    }
  }
  return null;
};

const createCombineResults = (
  pointMap: PointMap,
  point: Point,
  grid: GRID,
  symbol: SYMBOL
) => (
  callback: (index: number, point: Point, grid: GRID, symbol: SYMBOL) => Points
): Array<Points> => {
  const indexes = createIndexes(grid);
  const matchedSequence = callback(pointMap, point, grid, symbol);
  if (Array.isArray(matchedSequence) && matchedSequence.length > 4) {
    return matchedSequence;
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
  point: Point,
  points: Points,
  grid: GRID,
  symbol: SYMBOL
): Array<Points> | null => {
  const pointMap = points.reduce((result, currentPoint) => {
    if (currentPoint.state !== null) {
      result[currentPoint.key] = currentPoint;
    }
    return result;
  }, {});

  const generateSequences = createCombineResults(pointMap, point, grid, symbol);
  return findFirstFive(generateSequences)(
    getDownLeft,
    getDownRight,
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
