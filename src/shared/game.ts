import { Points, PlayerState, Point } from '../types/state';
import { SYMBOL, PLAYER, GRID } from '../shared/constants';


const createIndexes = (grid: GRID) => Array(grid).fill(0).map((e, i) => e + i);

const findPointByCoor = (points: Points, x: number, y: number) => points.find(p => p.x === x && p.y === y);

const findAndAdd = (points: Points, x: number, y: number, matches: Points) => {
  const point = findPointByCoor(points, x, y);
 if (point) {
    matches.push(point);
   }
};

const getUpX = (points: Points, grid: GRID) => (startX: number): Points => {
    const sequence = [];
   for (let x = startX, y = grid - 1; x < grid; x++, y--) {
       findAndAdd(points, x, y, sequence)
   }
   return sequence;
}

const getDownY = (points: Points, grid: GRID) => (startY: number): Points => {
    const sequence = [];
   for (let x = 0, y = startY; y < grid; y++, x++) {
    findAndAdd(points, x, y, sequence)
   }
   return sequence;
}

const getDownX = (points: Points, grid: GRID) => (startX: number): Points => {
    const sequence = [];
   for (let x = startX, y = 0; x < grid; x++, y++) {
       findAndAdd(points, x, y, sequence)
   }
   return sequence;
}

const getUpY = (points: Points, grid: GRID) => (endY: number): Points => {
    const sequence = [];
   for (let x = 0, y = grid - endY - 1; y >= 0; y--, x++) {
    findAndAdd(points, x, y, sequence)
   }
   return sequence;
}


const getRow = (points: Points, grid: GRID) => (row: number): Points => points.filter(p => p.y === row);
const getColumn = (points: Points, grid: GRID) => (column: number): Points => points.filter(p => p.x === column);

const createCombineResults = (grid: GRID) => (callback: (number) => Points): Array<Points> => {
    const indexes = createIndexes(grid);
    return indexes.reduce((r, index) => {
        const result = r.push(callback(index));
        return r;
    }, []);
}

const findSequences = (points: Points, grid: GRID): Array<Points> => {
    const combineResults = createCombineResults(grid);
    const bottomLeftToTopRight = combineResults(getUpX(points, grid)).concat(combineResults(getDownY(points, grid)));
    const topLeftToBottomRight = combineResults(getDownX(points, grid)).concat(combineResults(getUpY(points, grid)));
    const straightSequences = combineResults(getRow(points, grid)).concat(combineResults(getColumn(points, grid)));
    const diagonalSequences = bottomLeftToTopRight.concat(topLeftToBottomRight).filter(s => s.length > 4);
    const sequences = straightSequences.concat(diagonalSequences);
    return sequences;
};

const find5InSequence = (sequence: Points, symbol: SYMBOL): Points => {
    const result = sequence.reduce((matches, point) => {
        if (matches.length === 5) {
            return matches;
        }
        if (point.state === symbol) {
            matches.push(point);
        } else {
            matches = [];
        }
        return matches;
    }, []);
    return result.length > 4 ? result : null;
}

export const getVictoriousMatch = (board: Points, symbol: SYMBOL, grid: GRID): boolean => {
    const sequences = findSequences(board, grid).filter(s => s.filter(p => p.state === symbol).length > 4);
    const matchedSequence = sequences.find(sequence => find5InSequence(sequence, symbol));
    return matchedSequence ? find5InSequence(matchedSequence, symbol) : null;
};

export function createPlayer(player: PLAYER, name: string, symbol: SYMBOL): PlayerState {
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