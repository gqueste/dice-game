<script setup lang="ts">
import { defaultAttackCharacter } from './game/card/character/catalog/default/character-default-attack'
import { defaultGoldCharacter } from './game/card/character/catalog/default/character-default-gold'
import { defaultMagicCharacter } from './game/card/character/catalog/default/character-default-magic'
import { rabbit, ghost, thief, dragon } from '@/game/card/monster/monster.catalog'
import CharacterCard from './ui/CharacterCard.vue'
import MonsterCard from './ui/MonsterCard.vue'
</script>

<template>
  <main>
    <div class="wrapper">
      <CharacterCard :character="defaultAttackCharacter" />
      <CharacterCard :character="defaultGoldCharacter" />
      <CharacterCard :character="defaultMagicCharacter" />
    </div>
    <div class="wrapper">
      <MonsterCard :monster="rabbit" />
      <MonsterCard :monster="ghost" />
      <MonsterCard :monster="thief" />
      <MonsterCard :monster="dragon" />
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
}
</style>
