<template>
  <table class="board mt-4">
    <tr v-for="row in grid" :key="row">
      <td v-for="cell in getCells(row)" :key="cell.key" class="board__cell">
        <button
          type="button"
          class="board__cell-btn"
          @click="$emit('point-placed', cell)"
          :disabled="isSelected(cell.state)"
        >
          <i class="fa fa-times board__cell-icon" v-if="isCross(cell.state)" />
          <i
            class="far fa-circle board__cell-icon"
            v-if="isCircle(cell.state)"
          />
          <span v-if="cell.state === null">&nbsp;</span>
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GRID, SYMBOL } from "../shared/constants";

@Component
export default class Board extends Vue {
  @Prop() private grid!: GRID;
  @Prop() private board!: GRID;

  getCells(rowIndex) {
    return Object.values(this.board).filter(point => point.y === rowIndex);
  }

  isCross(state: SYMBOL | null) {
    return state === SYMBOL.CROSS;
  }

  isCircle(state: SYMBOL | null) {
    return state === SYMBOL.CIRCLE;
  }

  isSelected(state: SYMBOL | null) {
    return state !== null;
  }
}
</script>

<style scoped lang="scss">
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
  border: 2px solid rgb(68, 68, 68);
  text-align: center;
  overflow: hidden;
}

.board__cell-btn {
  height: 100%;
  width: 100%;
  border: 0;
  background: 0;
  transition: all 0.2s ease-in-out;
  text-align: center;
  vertical-align: middle;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    background: rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    color: black;
  }
}

.board__cell-icon {
  font-size: 24px;
}
</style>
