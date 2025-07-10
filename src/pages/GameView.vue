<script setup lang="ts">
import type { Dice, DiceSymbol } from '@/game/dice/dice.'
import CharacterCard from '@/ui/CharacterCard.vue'
import { diceSymbolToComponent } from '@/ui/utils'
import { computed, ref } from 'vue'
import { Game } from '@/game/game'
import EventCard from '@/ui/EventCard.vue'
import { canActivateCharacter, isActivatedCharacter } from '@/game/card/character/character.utils'
import type { Character } from '@/game/card/character/character.interface'

const boardState = ref(new Game())
const currentPlayer = ref(boardState.value.players[0])

const onNewGame = () => {
  boardState.value = new Game()
  currentPlayer.value = boardState.value.players[0]
}

const thrownDicesSymbols = computed(() =>
  currentPlayer.value.dices.reduce((acc, dice) => {
    if (!!dice.currentSideRolled) {
      acc.push(dice.currentSideRolled)
    }
    return acc
  }, [] as DiceSymbol[])
)

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

const onCharacterCardClick = (card: Character) => {
  //TODO diceUsed in UI
  //TODO move in player (add composable) and test
  //TODO make component for DiceSymbol and have a Used Status ou directement dans le template pour le moment ?
  //TODO "mes Dés" essayer disposition comme dans Dice and Slice ?
  if (
    !canActivateCharacter(card, thrownDicesSymbols.value) ||
    isActivatedCharacter(card, currentPlayer.value.usedDices)
  ) {
    return
  }
  const skill = card.levels[card.currentLevel]?.skill
  if (!skill) {
    return
  }
  for (const targetDice of skill.cost) {
    const usedDice = currentPlayer.value.dices.find((dice) => dice.currentSideRolled === targetDice)
    if (usedDice) {
      currentPlayer.value.usedDices.push({
        diceId: usedDice.id,
        cardId: card.id,
        location: 'board',
      })
    }
  }
}

const isDiceUsed = (): boolean => {
  //TODO
  return false
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
        <!--TODO used-->
        <component
          v-for="dice in currentPlayer.dices.filter((dice) => dice.currentSideRolled)"
          :key="dice.id"
          :used="isDiceUsed()"
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
      <CharacterCard
        v-for="card in currentPlayer.board"
        :key="card.id"
        :character="card"
        :activable="canActivateCharacter(card, thrownDicesSymbols)"
        :activated="isActivatedCharacter(card, currentPlayer.usedDices)"
        @click="onCharacterCardClick(card)"
      />
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
