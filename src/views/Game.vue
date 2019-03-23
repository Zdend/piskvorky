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
        <board-component
          :grid="grid"
          :board="board"
          v-on:point-placed="placePoint"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { LIMIT, GRID, PLAYER } from "../shared/constants";
import { getEnumValues } from "../shared/enum";
import { PlayerState, Limit, Board, Point } from "../types/state";
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
  @State board: Board;
  @Mutation changeLimit: Function;
  @Mutation changeGrid: Function;
  @Mutation changePlayer: Function;
  @Mutation changePauses: Function;
  @Getter currentPlayer: PlayerState;
  @Action placePoint: Function;
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
