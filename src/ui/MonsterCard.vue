<template>
  <PlayableCard :age="monster.age" :name="monster.name" :cost="monster.cost">
    <template v-slot:body>
      <RiverCardBody :river-card="monster" />
    </template>
    <template v-slot:footer> {{ monster.experience }} XP </template>
  </PlayableCard>
</template>

<script setup lang="ts">
import type { Monster } from '@/game/card/monster/monster.interface'
import PlayableCard from './PlayableCard.vue'
import RiverCardBody from './RiverCardBody.vue'

defineProps<{ monster: Monster }>()
</script>

<style lang="scss" scoped></style>
