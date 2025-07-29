<script setup lang="ts">
import type { Dice, DiceType } from '@/game/dice/dice.'
import CharacterCard from '@/ui/CharacterCard.vue'
import { diceSymbolToComponent } from '@/ui/utils'
import { ref, type Ref } from 'vue'
import { Game } from '@/game/game'
import EventCard from '@/ui/EventCard.vue'
import type { Character } from '@/game/card/character/character'
import DiceSide from '@/ui/DiceSide.vue'

const game: Ref<Game> = ref(new Game())

const onNewGame = () => {
  game.value = new Game()
}

const rollDices = () => {
  game.value.getCurrentPlayer()?.rollAllDices()
}

const onCharacterCardClick = (card: Character) => {
  game.value.getCurrentPlayer()?.activateCharacter(card)
  game.value.activateCharacterForPlayer(game.value.getCurrentPlayer()!, card)
}

const isDiceUsed = (dice: Dice): boolean => {
  return !!game.value.getCurrentPlayer()?.isDiceUsed(dice)
}
</script>

<template>
  <main>
    <button @click="onNewGame">Nouvelle partie</button>
    <div class="river">
      <span class="debug">River</span>
      <EventCard v-for="card in game.river" :key="card.id" :event="card" />
    </div>
    <div class="dice-throwing-area">
      <span class="debug">Dice Throwing area</span>
      <div class="dice-result">
        <DiceSide
          v-for="dice in game.getCurrentPlayer()?.dices.filter((dice) => dice.currentSideRolled)"
          :key="dice.id"
          :symbol="dice.currentSideRolled!"
          :used="isDiceUsed(dice)"
        />
      </div>
      <button @click="rollDices">Lancer les dés</button>
    </div>
    <div class="player-board">
      <span class="debug">Board</span>
      <div>
        <div>Game info</div>
        <div>Mes dés</div>
        <div
          v-for="key in Object.keys(game.getCurrentPlayer()?.getDicesGroupedByType() || {})"
          :key
          class="dice-details-line"
        >
          <span class="quantity">{{
            (game.getCurrentPlayer()?.getDicesGroupedByType() || {})[key as DiceType]?.length
          }}</span>
          <span>
            <component
              v-for="side in ((game.getCurrentPlayer()?.getDicesGroupedByType() || {})[
                key as DiceType
              ] || [])[0].sides"
              :key="side"
              :is="diceSymbolToComponent(side)"
            />
          </span>
        </div>
      </div>
      <CharacterCard
        v-for="card in game.getCurrentPlayer()?.board"
        :key="card.id"
        :character="card"
        :activable="game.getCurrentPlayer()?.canActivateCharacter(card)"
        :activated="game.getCurrentPlayer()?.hasActivatedCharacter(card)"
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
