<script setup lang="ts">
import type { Dice } from '@/game/dice/dice.'
import CharacterCard from '@/ui/CharacterCard.vue'
import { diceSymbolToComponent } from '@/ui/utils'
import { computed, ref } from 'vue'
import { Game } from '@/game/game'
import EventCard from '@/ui/EventCard.vue'

const boardState = ref(new Game())
const currentPlayer = ref(boardState.value.players[0])

const onNewGame = () => {
  boardState.value = new Game()
  currentPlayer.value = boardState.value.players[0]
}

const groupedCurrentPlayerDices = computed(() =>
  currentPlayer.value.dices.reduce(
    (acc, currentDice) => {
      if (!acc[currentDice.id]) {
        acc[currentDice.id] = []
      }
      acc[currentDice.id].push(currentDice)
      return acc
    },
    {} as { [key: string]: Dice[] }
  )
)

const rollDices = () => {
  currentPlayer.value.rollAllDices()
}
</script>

<template>
  <main>
    <button @click="onNewGame">Nouvelle partie</button>
    <div class="river">
      <span class="debug">River</span>
      <EventCard v-for="card in boardState.river" :key="card.id" :event="card" />
    </div>
    <div class="dice-throwing-area">
      <span class="debug">Dice Throwing area</span>
      <div class="dice-result">
        <component
          v-for="dice in currentPlayer.dices.filter((dice) => dice.currentSideRolled)"
          :key="dice.id"
          :is="diceSymbolToComponent(dice.currentSideRolled!!)"
        />
      </div>
      <button @click="rollDices">Lancer les dés</button>
    </div>
    <div class="player-board">
      <span class="debug">Board</span>
      <div>
        <div>Game info</div>
        <div>Mes dés</div>
        <div v-for="key in Object.keys(groupedCurrentPlayerDices)" :key class="dice-details-line">
          <span class="quantity">{{ groupedCurrentPlayerDices[key].length }}</span>
          <span>
            <component
              v-for="side in groupedCurrentPlayerDices[key][0].sides"
              :key="side"
              :is="diceSymbolToComponent(side)"
            />
          </span>
        </div>
      </div>
      <CharacterCard v-for="card in currentPlayer.board" :key="card.id" :character="card" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.debug {
  position: absolute;
  top: 1px;
  left: 1px;
}

.river {
  position: relative;
  border: 1px solid black;
  display: flex;
}

.dice-throwing-area {
  width: 100%;
  height: 300px;
  position: relative;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.player-board {
  --player-board-color: green;

  position: relative;
  display: flex;
  border: 1px solid var(--player-board-color);
  border-radius: 4px;
  padding: 24px;
  gap: 4px;

  .debug {
    color: var(--player-board-color);
  }
}

.dice-details-line {
  display: flex;
  justify-content: center;

  .quantity {
    margin-right: 16px;
    font-weight: bold;
  }
}
</style>
