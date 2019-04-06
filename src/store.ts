import Vue from "vue";
import Vuex from "vuex";
import { LIMIT, GRID, SYMBOL, PLAYER } from "./shared/constants";
import { Limit, PlayerState, Board, Point, Points } from "./types/state";
import { createPlayer, generateBoard, getVictoriousMatch } from "./shared/game";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    limit: LIMIT.UNLIMITED.timeLimit,
    grid: GRID.G15,
    player1: createPlayer(PLAYER.PLAYER1, "Red", SYMBOL.CROSS),
    player2: createPlayer(PLAYER.PLAYER2, "Blue", SYMBOL.CIRCLE),
    board: generateBoard(GRID.G15),
    turn: PLAYER.PLAYER1,
    victor: null,
    victoriousSequence: null
  },
  mutations: {
    changeLimit(state, value: number) {
      state.limit = value;
    },
    changeGrid(state, value?: GRID) {
      state.grid = value || state.grid;
      state.board = generateBoard(value || state.grid);
    },
    changePlayer(state, player: PlayerState) {
      if (!Number.isInteger(player.id)) {
        throw new Error("Player ID is not specified");
      }
      const playerProp =
        (player.id as PLAYER) === PLAYER.PLAYER1 ? "player1" : "player2";
      const newState = { ...state[playerProp], ...player };
      state[playerProp] = newState;
    },
    changeBoard(state, board: Board) {
      state.board = board;
    },
    changeTurn(state) {
      state.turn =
        state.turn === PLAYER.PLAYER1 ? PLAYER.PLAYER2 : PLAYER.PLAYER1;
    },
    changeVictor(state, player: PLAYER) {
      state.victor = player;
    },
    changeVictoriousSequence(state, points: Points) {
      state.victoriousSequence = points;
    }
  },
  actions: {
    placePoint({ commit, state, getters }, point: Point) {
      if (state.victor !== null) {
        return;
      }
      const player = getters.currentPlayer;
      const newBoard = state.board.map((p: Point) => {
        return p.key === point.key ? { ...point, state: player.symbol } : p;
      });

      const matchingSequence = getVictoriousMatch(
        point,
        newBoard,
        state.grid,
        player.symbol
      );

      commit("changeBoard", newBoard);

      if (matchingSequence) {
        commit("changeVictor", player.id);
        commit("changeVictoriousSequence", matchingSequence);
        commit("changePlayer", { id: player.id, wins: player.wins + 1 });
        return;
      }

      commit("changeTurn");
    },
    playAgain({ commit, state }) {
      commit("changeVictor", null);
      commit("changeVictoriousSequence", null);
      commit("changeGrid");
      commit("changeTurn");
    }
  },
  getters: {
    currentPlayer(state) {
      return state.turn === PLAYER.PLAYER1 ? state.player1 : state.player2;
    }
  }
});
