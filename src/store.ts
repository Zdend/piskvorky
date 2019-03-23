import Vue from "vue";
import Vuex from "vuex";
import { LIMIT, GRID, SYMBOL, Limit, PLAYER } from './shared/constants';

Vue.use(Vuex);

interface PiskvorkyState {
  limit: number,
  grid: GRID,
  player1: PlayerState,
  player2: PlayerState,
  pausesPerGame: number
}

export interface PlayerState {
  id: PLAYER,
  name: string,
  pauseUsed: number,
  symbol: SYMBOL
}

export function createPlayer(player: PLAYER, name: string, symbol: SYMBOL): PlayerState {
  return {
    id: player,
    name,
    pauseUsed: 0,
    symbol
  };
}

export function generateBoard(size: GRID): Array<Array<GRID | null>> {
  return Array(size).fill(Array(size).fill(null));
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
    },
    changePauses(state, value: number) {
      state.pausesPerGame = value;
    },
    changePlayer(state, player: PlayerState) {
      if (!player.id) {
        throw new Error('Player ID is not specified');
      }
      const playerProp = player.id as PLAYER === PLAYER.PLAYER1 ? 'player1' : 'player2';
      const newState = { ...state[playerProp], ...player };
      state[playerProp] = newState;
    }
  },
  actions: {},
  getters: {}
});
