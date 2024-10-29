<template>
  <div class="card">
    <div class="header">
      <div class="price">{{ character.price }}</div>
      <div class="name">{{ character.name }}</div>
    </div>
    <div class="illustration"></div>
    <div v-for="level in character.levels" class="level" :key="level?.level">
      <div class="current-level-check">{{ level?.levelUpCost }}</div>
      <div v-for="(requiredDice, index) in level?.skill.cost" :key="index" class="required-dice">
        <component :is="diceSymbolToComponent(requiredDice)" />
      </div>
      <div class="effect">
        {{ level?.skill.effect.value }}
        <component :is="effectTypeToComponent(level!.skill.effect.type)" />
      </div>
    </div>
    <div class="footer"><ArrowBigDown />Expérience<ArrowBigDown /></div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/game/card/character/character.interface'
import { diceSymbolToComponent, effectTypeToComponent } from './utils'
import { ArrowBigDown } from 'lucide-vue-next'

defineProps<{ character: Character }>()
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  height: 300px;
  padding: 8px;

  .header {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;

    .price {
      border: 2px solid yellow;
      border-radius: 50%;
      width: 32px;
      height: 32px;
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
    gap: 12px;
    align-items: center;
    padding: 0 8px;

    .current-level-check {
      border: 1px solid black;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-right: 12px;
    }

    .required-dice {
      border: 1px solid grey;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .effect {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
  }

  .footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    align-self: flex-end;
  }
}
</style>
