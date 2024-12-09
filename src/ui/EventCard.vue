<template>
  <PlayableCard :age="event.age" :name="event.name" :cost="event.cost">
    <template v-slot:body>
      <RiverCardBody :river-card="event" />
    </template>
  </PlayableCard>
</template>

<script setup lang="ts">
import PlayableCard from './PlayableCard.vue'
import RiverCardBody from './RiverCardBody.vue'
import type { Event } from '@/game/card/event/event.interface'

defineProps<{ event: Event }>()
</script>

<style lang="scss" scoped></style>
