<template>
  <div class="score">
    <div class="score__col">
      <div class="player__wins">{{ player1.wins }} wins</div>
      <div class="player__name text-danger">{{ player1.name }}</div>
    </div>
    <div class="score__body">
      <h1
        :class="{
          'text-primary': currentPlayer.symbol === symbol.CIRCLE,
          'text-danger': currentPlayer.symbol === symbol.CROSS,
          score__title: true
        }"
      >
        {{ currentPlayer.name }}<span v-if="victor === null">'s turn</span>
        <span v-if="victor !== null"> wins!</span>
        <div>{{ timeLeftReadable }}</div>
      </h1>
    </div>
    <div class="score__col">
      <div class="player__wins">{{ player2.wins }} wins</div>
      <div class="player__name text-primary">{{ player2.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SYMBOL, PLAYER } from "../shared/constants";
import { Points, PlayerState } from "../types/state";

@Component
export default class BoardComponent extends Vue {
  @Prop() private player1!: PlayerState;
  @Prop() private player2!: PlayerState;
  @Prop() private currentPlayer!: PlayerState;
  @Prop() private victor!: PLAYER;
  @Prop() private limit!: number;
  @Prop() private changeTurn!: Function;

  timeLeft = this.limit;
  symbol = SYMBOL;
  interval = null;

  get timeLeftReadable() {
    return this.timeLeft < Infinity ? `${this.timeLeft}s` : "";
  }

  created() {
    if (this.limit === Infinity) {
      return;
    }
    let player = this.currentPlayer.id;
    this.interval = setInterval(() => {
      if (this.victor != null) {
        return;
      }
      if (player !== this.currentPlayer.id) {
        player = this.currentPlayer.id;
        this.timeLeft = this.limit + 1;
      }
      if (this.timeLeft < 1) {
        this.timeLeft = this.limit + 1;
        this.changeTurn();
        return;
      }
      this.timeLeft = this.timeLeft - 1;
    }, 1000);
  }
  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
</script>

<style scoped lang="scss">
.score {
  background: rgba(255, 255, 255, 0.9);
  max-width: 100vw;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 85px;
  padding: 1rem 0.5rem;
  z-index: 1;
  min-width: 400px;
}
.score__col {
  flex: 25%;
  text-align: center;
}
.score__body {
  text-align: center;
  flex: 50%;
}
.score__title {
  font-size: 1.75rem;
  vertical-align: middle;
}

.player__name {
  font-weight: 600;
  text-align: center;
}
.player__wins {
  text-align: center;
}
</style>
