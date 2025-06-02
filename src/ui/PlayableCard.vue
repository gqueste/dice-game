<template>
  <div class="card">
    <div class="header">
      <div class="age-badge" :style="ageStyle">
        {{ ageToLabel(age) }}
      </div>
      <div class="name">{{ name }}</div>
      <div class="cost">
        <span v-for="symbol in Object.keys(formattedCost)" :key="symbol" class="cost-item">
          <span v-if="formattedCost[symbol].length > 1">{{ formattedCost[symbol].length }}</span>
          <component :is="diceSymbolToComponent(symbol as DiceSymbol)" />
        </span>
      </div>
    </div>
    <div class="illustration"></div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { Age } from '@/game/game.interface'
import { ageToLabel, diceSymbolToComponent } from './utils'
import type { DiceSymbol } from '@/game/dice/dice.'
import { computed } from 'vue'

const props = defineProps<{ age: Age; name: string; cost: DiceSymbol[] }>()

const ageStyle = computed<string>(() => {
  switch (props.age) {
    case Age.Third:
      return 'border-color: yellow'
    case Age.Second:
      return 'border-color: grey'
    case Age.First:
      return 'border-color: brown'
    default:
      return 'border-color: black'
  }
})

const formattedCost = computed<{ [key: string]: DiceSymbol[] }>(() => {
  return props.cost.reduce(
    (acc, current) => {
      if (acc[current]) {
        acc[current].push(current)
      } else {
        acc[current] = [current]
      }
      return acc
    },
    {} as { [key: string]: DiceSymbol[] }
  )
})
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 400px;
  padding: 8px;

  .header {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: fit-content;
    gap: 1em;

    .age-badge {
      border: 2px solid black;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cost {
      flex-grow: 1;
      display: flex;
      flex-wrap: nowrap;
      justify-content: end;
      align-items: center;
      gap: 0.5em;

      &-item {
        display: flex;
        align-items: center;
      }
    }
  }

  .illustration {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    align-self: center;
  }

  .body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
