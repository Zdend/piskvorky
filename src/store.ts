import Vue from "vue";
import Vuex from "vuex";
import { LIMIT, GRID, SYMBOL, PLAYER } from './shared/constants';
import { Limit, PlayerState, Board, Point } from './types/state';

Vue.use(Vuex);

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

export function generateBoard(size: GRID): Board {
  const grid = {};
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const key = `${i}x${j}`;
      grid[key] = { key, x: i, y: j, state: null };
    }
  }

  return grid;
}


export default new Vuex.Store({
  state: {
    limit: LIMIT.UNLIMITED.timeLimit,
    grid: GRID.G15,
    player1: createPlayer(PLAYER.PLAYER1, 'Red', SYMBOL.CIRCLE),
    player2: createPlayer(PLAYER.PLAYER2, 'Blue', SYMBOL.CROSS),
    pausesPerGame: 0,
    board: generateBoard(GRID.G15),
    turn: PLAYER.PLAYER1
  },
  mutations: {
    changeLimit(state, value: number) {
      state.limit = value;
    },
    changeGrid(state, value: GRID) {
      state.grid = value;
      state.board = generateBoard(value);
    },
    changePauses(state, value: number) {
      state.pausesPerGame = value;
    },
    changePlayer(state, player: PlayerState) {
      if (!Number.isInteger(player.id)) {
        throw new Error('Player ID is not specified');
      }
      const playerProp = (player.id as PLAYER) === PLAYER.PLAYER1 ? 'player1' : 'player2';
      const newState = { ...state[playerProp], ...player };
      state[playerProp] = newState;
    },
    changeBoard(state, board: Board) {
      state.board = board;
    },
    changeTurn(state, player: PLAYER) {
      state.turn = player;
    }
  },
  actions: {
    placePoint({ commit, state, getters }, point: Point) {
      const player = getters.currentPlayer;
      const newBoard = Object.values(state.board).map((p: Point) => {
        return p.key === point.key ? { ...point, state: player.symbol } : p;
      });

      commit('changeBoard', newBoard);
      commit('changeTurn', player.id === PLAYER.PLAYER1 ? PLAYER.PLAYER2 : PLAYER.PLAYER1);
    }
  },
  getters: {
    currentPlayer(state) {
      return state.turn === PLAYER.PLAYER1 ? state.player1 : state.player2;
    }
  }
});
