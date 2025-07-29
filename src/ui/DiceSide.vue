<script setup lang="ts">
import type { DiceSymbol } from '@/game/dice/dice.'
import { diceSymbolToComponent } from './utils'
import { computed, type ComputedRef } from 'vue'

const props = defineProps<{ symbol: DiceSymbol; used?: boolean }>()

const color: ComputedRef<string> = computed(() => (props.used ? 'white' : 'black'))
</script>

<template>
  <component :class="{ used }" :is="diceSymbolToComponent(symbol)" :color />
</template>

<style scoped lang="scss">
.used {
  background-color: grey;
}
</style>
