<template>
  <div class="card-effect">
    <span class="trigger-moment"><slot></slot></span>
    <span class="effect">
      {{ effect.value }}
      <component :is="effectTypeToComponent(effect.type)" />
    </span>
  </div>
</template>

<script setup lang="ts">
import type { CardEffect } from '@/game/card/card.interface'
import { effectTypeToComponent } from './utils'

defineProps<{ effect: CardEffect }>()
</script>

<style lang="scss" scoped>
.card-effect {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;

  .trigger-moment {
    display: flex;
    align-items: center;
  }

  .effect {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
}
</style>
