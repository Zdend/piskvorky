<template>
  <b-container class="mt-4">
    <b-row>
      <b-col col sm="3">
        <div class="player__wins">{{ player1.wins }} wins</div>
        <div class="player__name">{{ player1.name }}</div>
      </b-col>
      <b-col col sm="6">
        <h1>{{ currentPlayer.name }}'s turn</h1>
      </b-col>
      <b-col col sm="3">
        <div class="player__wins">{{ player2.wins }} wins</div>
        <div class="player__name">{{ player2.name }}</div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="board mt-4">
          <tr v-for="row in grid" :key="row">
            <td
              v-for="cell in getCells(row)"
              :key="cell.key"
              class="board__cell"
            >
              <button type="button" class="board__cell-btn">
                <i class="fa fa-times" />
              </button>
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { LIMIT, Limit, GRID, PLAYER } from "../shared/constants";
import { getEnumValues } from "../shared/enum";
import { PlayerState, Board, Point } from "../store";

@Component({
  components: {}
})
export default class Setup extends Vue {
  @State limit: number;
  @State grid: GRID;
  @State player1: PlayerState;
  @State player2: PlayerState;
  @State pausesPerGame: number;
  @State turn: PLAYER;
  @State board: Board;
  @Getter getCells: Array<Point>;
  @Mutation changeLimit: Function;
  @Mutation changeGrid: Function;
  @Mutation changePlayer: Function;
  @Mutation changePauses: Function;

  get currentPlayer() {
    return this.turn === PLAYER.PLAYER1 ? this.player1 : this.player2;
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  font-size: 2rem;
}

.setup__start-btn {
  width: 100%;
}
.player__name {
  font-weight: 600;
  text-align: center;
}
.player__wins {
  text-align: center;
}

.board {
  margin: 0 auto;
}
.board__row {
  padding: 0;
  margin: 0;
}

.board__cell {
  height: 40px;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid black;
  text-align: center;
  overflow: hidden;
}

.board__cell-btn {
  height: 100%;
  width: 100%;
  border: 0;
  background: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
