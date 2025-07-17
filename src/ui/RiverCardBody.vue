<template>
  <RiverCardEffect v-if="riverCard.appearEffect" :effect="riverCard.appearEffect">
    <ArrowDownToLine />
  </RiverCardEffect>
  <RiverCardEffect v-if="riverCard.riverEffect" :effect="riverCard.riverEffect">
    <RefreshCw />
  </RiverCardEffect>
  <RiverCardEffect v-if="riverCard.buyEffect" :effect="riverCard.buyEffect">
    <Hand />
  </RiverCardEffect>
  <RiverCardEffect v-if="riverCard.killEffect" :effect="riverCard.killEffect">
    <Skull />
  </RiverCardEffect>
</template>

<script setup lang="ts">
import type { RiverCard } from '@/game/card/card'
import { ArrowDownToLine, Hand, RefreshCw, Skull } from 'lucide-vue-next'
import RiverCardEffect from './RiverCardEffect.vue'

defineProps<{ riverCard: RiverCard }>()
</script>
