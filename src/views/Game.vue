<template>
  <div>
    <b-container class="mt-4">
      <b-row>
        <b-col col sm="3">
          <div class="player__wins">{{ player1.wins }} wins</div>
          <div class="player__name">{{ player1.name }}</div>
        </b-col>
        <b-col col sm="6">
          <h1
            :class="{
              'text-primary': currentPlayer.symbol === symbol.CIRCLE,
              'text-danger': currentPlayer.symbol === symbol.CROSS
            }"
          >
            {{ currentPlayer.name }}<span v-if="victor === null">'s turn</span>
            <span v-if="victor !== null"> has won!!</span>
          </h1>
        </b-col>
        <b-col col sm="3">
          <div class="player__wins">{{ player2.wins }} wins</div>
          <div class="player__name">{{ player2.name }}</div>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <b-col>
          <board-component
            :grid="grid"
            :board="board"
            v-on:point-placed="placePoint"
          />

          <div class="mt-4 text-center">
            <b-button
              size="lg"
              type="button"
              @click="playAgain"
              v-if="victor !== null"
              >Play Again</b-button
            >
          </div>
          <div class="mt-4 text-center">
            <router-link to="/">Back to Config</router-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { LIMIT, GRID, PLAYER, SYMBOL } from "../shared/constants";
import { getEnumValues } from "../shared/enum";
import { PlayerState, Limit, Points, Point } from "../types/state";
import BoardComponent from "@/components/Board.vue";

@Component({
  components: {
    BoardComponent
  }
})
export default class Setup extends Vue {
  @State limit: number;
  @State grid: GRID;
  @State player1: PlayerState;
  @State player2: PlayerState;
  @State pausesPerGame: number;
  @State turn: PLAYER;
  @State board: Points;
  @State victor: PLAYER;
  @State victoriousSequence: Points;
  @Mutation changeLimit: Function;
  @Mutation changeGrid: Function;
  @Mutation changePlayer: Function;
  @Mutation changePauses: Function;
  @Getter currentPlayer: PlayerState;
  @Action placePoint: Function;
  @Action playAgain: Function;

  get symbol() {
    return SYMBOL;
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
</style>
