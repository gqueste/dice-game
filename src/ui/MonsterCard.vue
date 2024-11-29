<template>
  <PlayableCard>
    <template v-slot:header>
      <div class="header">
        <div class="identification">
          <span class="age-badge" :style="getStyleForAge(monster.age)">
            {{ ageToLabel(monster.age) }}
          </span>
          {{ monster.name }}
        </div>
        <div class="cost"></div>
      </div>
    </template>
    <template v-slot:footer> footer </template>
  </PlayableCard>
</template>

<script setup lang="ts">
import type { Monster } from '@/game/card/monster/monster.interface'
import PlayableCard from './PlayableCard.vue'
import { ageToLabel } from './utils'
import { Age } from '@/game/game.interface'

defineProps<{ monster: Monster }>()

const getStyleForAge = (age: Age): string => {
  switch (age) {
    case Age.Third:
      return 'border-color: yellow'
    case Age.Second:
      return 'border-color: grey'
    default:
      return 'border-color: brown'
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: fit-content;

  .identification {
    display: flex;
    align-items: center;
    gap: 8px;

    .age-badge {
      border: 2px solid black;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
