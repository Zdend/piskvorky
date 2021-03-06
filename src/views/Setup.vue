<template>
  <b-container>
    <b-row>
      <b-col col lg="3"></b-col>
      <b-col lg="6">
        <h1>Piškvorky</h1>
        <h2 class="my-5">
          The rules are simple! Connect 5 circles or crosses horizontally,
          vertically or diagonally before your opponent does.
        </h2>
        <b-form @submit.prevent="startGame">
          <b-form-group
            label="Time Limit:"
            label-for="limitInput"
            description="Limit per player per turn"
          >
            <b-form-select
              v-model="limitValue"
              :options="limitOptions"
              id="limitInput"
            />
          </b-form-group>

          <b-form-group
            label="Grid Size:"
            label-for="gridInput"
            description="Larger grids allow for longer games"
          >
            <b-form-select
              v-model="gridValue"
              :options="gridOptions"
              id="gridInput"
            />
          </b-form-group>

          <b-form-group label="Player 1 Name" label-for="player1Name">
            <b-form-input
              v-model="player1Name"
              id="player1Name"
              maxlength="6"
            />
          </b-form-group>

          <b-form-group label="Player 2 Name" label-for="player2Name">
            <b-form-input
              v-model="player2Name"
              id="player2Name"
              maxlength="6"
            />
          </b-form-group>

          <b-button
            type="submit"
            size="lg"
            variant="primary"
            class="setup__start-btn mt-3"
            >Start</b-button
          >
        </b-form>
      </b-col>
      <b-col col lg="3"></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { LIMIT, GRID, PLAYER } from "../shared/constants";
import { getEnumValues } from "../shared/enum";
import { PlayerState, Limit, LimitInfo } from "../types/state";

@Component({
  components: {}
})
export default class Setup extends Vue {
  @State limit: number;
  @State grid: GRID;
  @State player1: PlayerState;
  @State player2: PlayerState;
  @Mutation changeLimit: Function;
  @Mutation changeGrid: Function;
  @Mutation changePlayer: Function;
  @Mutation changePauses: Function;
  @Action playAgain: Function;

  set limitValue(value: number) {
    this.changeLimit(value);
  }
  get limitValue() {
    return this.limit;
  }
  get limitOptions() {
    return Object.values(LIMIT).map((l: LimitInfo) => ({
      value: l.timeLimit,
      text: l.label
    }));
  }

  get gridValue() {
    return this.grid;
  }
  set gridValue(value: GRID) {
    this.changeGrid(value);
  }
  get gridOptions() {
    return getEnumValues(GRID).map(value => ({
      value,
      text: `${value}x${value}`
    }));
  }

  get player1Name() {
    return this.player1.name;
  }
  set player1Name(value: string) {
    this.changePlayer({ id: PLAYER.PLAYER1, name: value });
  }

  get player2Name() {
    return this.player2.name;
  }
  set player2Name(value: string) {
    this.changePlayer({ id: PLAYER.PLAYER2, name: value });
  }

  startGame() {
    this.playAgain();
    this.$router.push("/game");
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  font-size: 4rem;
}

h2 {
  font-size: 1.25rem;
  text-align: center;
}

.setup__start-btn {
  width: 100%;
}
</style>
