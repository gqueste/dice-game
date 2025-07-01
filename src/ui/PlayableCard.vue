<template>
  <div class="card" :class="{ hovered, buyable }">
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

const props = defineProps<{
  age: Age
  name: string
  cost: DiceSymbol[]
  hovered?: boolean
  buyable?: boolean
}>()

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
  border: 6px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 400px;
  padding: 8px;
  z-index: 1;
  transform: rotateX(30deg);
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    z-index 0.3s;
  background-color: white;
  overflow: hidden;

  &.buyable {
    border-color: aqua;
    box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
  }

  &:hover,
  &.hovered {
    z-index: 10;
    transform: scale(1.1, 1);
    cursor: pointer;
  }

  &:hover:not(.buyable),
  &.hovered:not(.buyable) {
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(167, 167, 167, 0.1), transparent);
    transition: all 400ms;
  }

  &:hover:before {
    left: 100%;
  }

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
