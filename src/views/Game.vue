<template>
  <b-container>
    <b-row>
      <b-col col lg="3"></b-col>
      <b-col lg="6">
        <h1>Piškvorky</h1>
      </b-col>
      <b-col col lg="3"></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { LIMIT, Limit, GRID, PLAYER } from "../shared/constants";
import { getEnumValues } from "../shared/enum";
import { PlayerState } from "../store";

@Component({
  components: {}
})
export default class Setup extends Vue {
  @State limit: number;
  @State grid: GRID;
  @State player1: PlayerState;
  @State player2: PlayerState;
  @State pausesPerGame: number;
  @Mutation changeLimit: Function;
  @Mutation changeGrid: Function;
  @Mutation changePlayer: Function;
  @Mutation changePauses: Function;
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  font-size: 4rem;
}

.setup__start-btn {
  width: 100%;
}
</style>
