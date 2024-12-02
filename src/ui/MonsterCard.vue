<template>
  <PlayableCard :age="monster.age" :name="monster.name" :cost="monster.cost">
    <template v-slot:footer> footer </template>
  </PlayableCard>
</template>

<script setup lang="ts">
import type { Monster } from '@/game/card/monster/monster.interface'
import PlayableCard from './PlayableCard.vue'

defineProps<{ monster: Monster }>()
</script>

<style lang="scss" scoped></style>
