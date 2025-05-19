<script setup lang="ts">
import { defaultAttackCharacter } from '@/game/card/character/catalog/default/character-default-attack'
import { defaultGoldCharacter } from '@/game/card/character/catalog/default/character-default-gold'
import { defaultMagicCharacter } from '@/game/card/character/catalog/default/character-default-magic'
import { allEvents } from '@/game/card/event/event.catalog'
import { defaultDice } from '@/game/dice/dice.catalog'
import type { Dice } from '@/game/dice/dice.interface'
import { Age } from '@/game/game.interface'
import CharacterCard from '@/ui/CharacterCard.vue'
import { diceSymbolToComponent } from '@/ui/utils'
import { computed, ref } from 'vue'

const DEFAULT_STATE = {
  players: [
    {
      id: 'player0',
      name: 'Joueur 1',
      board: [defaultAttackCharacter, defaultGoldCharacter, defaultMagicCharacter],
      dices: [defaultDice, defaultDice, defaultDice],
    },
  ],
  library: allEvents,
  currentAge: Age.First,
}

const boardState = ref(DEFAULT_STATE)
const currentPlayer = ref(boardState.value.players[0])

const onNewGame = () => {
  boardState.value = DEFAULT_STATE
  currentPlayer.value = DEFAULT_STATE.players[0]
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
</script>

<template>
  <main>
    <button @click="onNewGame">Nouvelle partie</button>
    <div>River</div>
    <div>Dice Throwing area</div>
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
.player-board {
  --player-board-color: green;

  position: relative;
  display: flex;
  border: 1px solid var(--player-board-color);
  border-radius: 4px;
  padding: 24px;
  gap: 4px;

  .debug {
    position: absolute;
    top: 1px;
    left: 1px;
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
