<template>
  <div :style="tableStyle" class="mx-auto pb-5">
    <score
      :player1="player1"
      :player2="player2"
      :currentPlayer="currentPlayer"
      :victor="victor"
      :style="tableStyle"
      :limit="limit"
      :changeTurn="changeTurn"
    />

    <board-component
      :grid="grid"
      :board="board"
      :victoriousSequence="victoriousSequence"
      v-on:point-placed="placePoint"
    />

    <div class="setup__footer" :style="tableStyle">
      <router-link
        to="/"
        tag="b-button"
        size="lg"
        type="button"
        variant="secondary"
      >
        Change Rules
      </router-link>

      <b-button
        size="lg"
        type="button"
        variant="primary"
        @click="playAgain"
        v-if="victor !== null"
        >Play Again</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { GRID, PLAYER, SYMBOL } from "../shared/constants";
import { getEnumValues } from "../shared/enum";
import { PlayerState, Limit, Points, Point } from "../types/state";
import BoardComponent from "@/components/Board.vue";
import Score from "@/components/Score.vue";

@Component({
  components: {
    BoardComponent,
    Score
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
  @Getter currentPlayer: PlayerState;
  @Action placePoint: Function;
  @Action playAgain: Function;
  @Mutation changeTurn: Function;

  private symbol: typeof SYMBOL = SYMBOL;

  get tableStyle() {
    return {
      width: `${this.grid * 40}px`
    };
  }

  mounted() {
    const el = [document.documentElement, document.body].filter(Boolean)[0];
    el.scrollLeft = el.scrollWidth / 2 - el.clientWidth / 2;
  }
}
</script>

<style scoped lang="scss">
.setup__start-btn {
  width: 100%;
}
.setup__footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 0.5rem;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  max-width: 100vw;
}

@media screen and (max-width: 600px) {
  .setup__footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
