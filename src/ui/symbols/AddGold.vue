<template><component :is="diceSymbolToComponent(DiceSymbol.Gold)" /></template>

<script setup lang="ts">
import { diceSymbolToComponent } from '../utils'
import { DiceSymbol } from '@/game/dice/dice.interface'
</script>
