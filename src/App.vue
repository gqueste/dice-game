<script setup lang="ts">
import { defaultAttackCharacter } from './game/card/character/catalog/default/character-default-attack'
import { defaultGoldCharacter } from './game/card/character/catalog/default/character-default-gold'
import { defaultMagicCharacter } from './game/card/character/catalog/default/character-default-magic'
import CharacterCard from './ui/CharacterCard.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <CharacterCard :character="defaultAttackCharacter" />
      <CharacterCard :character="defaultGoldCharacter" />
      <CharacterCard :character="defaultMagicCharacter" />
    </div>
  </header>

  <main></main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
