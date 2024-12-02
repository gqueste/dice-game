<template>
  <PlayableCard :age="monster.age" :name="monster.name" :cost="monster.cost">
    <template v-slot:body>
      <MonsterCardEffect v-if="monster.appearEffect" :effect="monster.appearEffect">
        <ArrowDownToLine />
      </MonsterCardEffect>
      <MonsterCardEffect v-if="monster.riverEffect" :effect="monster.riverEffect">
        <RefreshCw />
      </MonsterCardEffect>
      <MonsterCardEffect v-if="monster.buyEffect" :effect="monster.buyEffect">
        <Skull />
      </MonsterCardEffect>
    </template>
    <template v-slot:footer> {{ monster.experience }} XP </template>
  </PlayableCard>
</template>

<script setup lang="ts">
import type { Monster } from '@/game/card/monster/monster.interface'
import PlayableCard from './PlayableCard.vue'
import { ArrowDownToLine, RefreshCw, Skull } from 'lucide-vue-next'
import MonsterCardEffect from './MonsterCardEffect.vue'

defineProps<{ monster: Monster }>()
</script>

<style lang="scss" scoped></style>
