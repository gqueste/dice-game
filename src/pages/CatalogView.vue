<script setup lang="ts">
import { getDefaultAttackCharacter } from '../game/card/character/catalog/default/character-default-attack'
import { getDefaultGoldCharacter } from '../game/card/character/catalog/default/character-default-gold'
import { getDefaultMagicCharacter } from '../game/card/character/catalog/default/character-default-magic'
import { rabbit, ghost, thief, dragon } from '@/game/card/monster/monster.catalog'
import CharacterCard from '../ui/CharacterCard.vue'
import MonsterCard from '../ui/MonsterCard.vue'
import EventCard from '../ui/EventCard.vue'
import { allEvents } from '../game/card/event/event.catalog'
</script>

<template>
  <main>
    <div class="wrapper">
      <CharacterCard :character="getDefaultAttackCharacter()" />
      <CharacterCard :character="getDefaultGoldCharacter()" />
      <CharacterCard :character="getDefaultMagicCharacter()" />
    </div>
    <div class="wrapper">
      <MonsterCard :monster="rabbit" />
      <MonsterCard :monster="ghost" />
      <MonsterCard :monster="thief" />
      <MonsterCard :monster="dragon" />
    </div>
    <div class="wrapper">
      <EventCard v-for="event in allEvents" :event="event" :key="event.id" />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em 0;
  flex-wrap: wrap;
}
</style>
