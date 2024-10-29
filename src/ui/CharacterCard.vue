<template>
  <div class="card">
    <div class="header">
      <div class="price">{{ character.price }}</div>
      <div class="name">{{ character.name }}</div>
    </div>
    <div class="illustration"></div>
    <div v-for="level in character.levels" class="level" :key="level?.level">
      <div class="current-level-check"></div>
      <div v-for="(requiredDice, index) in level?.skill.cost" :key="index" class="required-dice">
        <component :is="diceSymbolToComponent(requiredDice)" />
      </div>
      <div class="effect">{{ level?.skill.effect.value }} {{ level?.skill.effect.type }}</div>
      <div v-if="level?.levelUpCost" class="level-up-cost">
        {{ level?.levelUpCost }} <ArrowBigDown />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/game/card/character/character.interface'
import { diceSymbolToComponent } from './utils'
import { ArrowBigDown } from 'lucide-vue-next'

defineProps<{ character: Character }>()
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
  gap: 10px;

  .header {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;

    .price {
      border: 2px solid yellow;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .illustration {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    align-self: center;
  }

  .level {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    .current-level-check {
      border: 1px solid black;
      width: 10px;
      height: 10px;
    }

    .required-dice {
      border: 1px solid grey;
    }
  }
}
</style>
