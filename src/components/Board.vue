<template>
  <table class="board">
    <tr v-for="row in grid" :key="row">
      <td
        v-for="cell in getCells(row - 1)"
        :key="cell.key"
        :class="{
          board__cell: true,
          'board__cell--victorious': isVictorious(cell.key)
        }"
      >
        <button
          type="button"
          class="board__cell-btn"
          @click="$emit('point-placed', cell)"
          :disabled="isSelected(cell.state)"
        >
          <i
            class="fa fa-times board__cell-icon text-danger"
            v-if="isCross(cell.state)"
          />
          <i
            class="far fa-circle board__cell-icon text-primary"
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
import { Points } from "../types/state";

@Component
export default class BoardComponent extends Vue {
  @Prop() private grid!: GRID;
  @Prop() private board!: Points;
  @Prop() private victoriousSequence!: Points;

  getCells(rowIndex) {
    return this.board.filter(point => point.y === rowIndex);
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

  isVictorious(key: string) {
    return (
      this.victoriousSequence &&
      this.victoriousSequence.some(p => p.key === key && p.state !== null)
    );
  }
}
</script>

<style scoped lang="scss">
.board {
  margin: 4rem auto 0 auto;
  width: 100%;
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
  background: none;
  transition: all 0.2s ease-in-out;
  text-align: center;
  vertical-align: middle;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    background: rgba(0, 0, 0, 0.2);
  }
}

.board__cell--victorious {
  background: rgb(253, 197, 93);
}

.board__cell-icon {
  font-size: 24px;
  position: relative;
  top: 2px;
}
</style>
