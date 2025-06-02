<script setup lang="ts">
import CharacterCard from '@/ui/CharacterCard.vue'
import { defaultAttackCharacter } from '@/game/card/character/catalog/default/character-default-attack'
</script>

<template>
  <main>
    <div class="characters">
      <div>
        <div>Default</div>
        <CharacterCard :character="defaultAttackCharacter" />
      </div>
      <div>
        <div>Activable</div>
        <CharacterCard :character="defaultAttackCharacter" :activable="true" />
      </div>
      <div>
        <div>Activated</div>
        <CharacterCard :character="defaultAttackCharacter" :activated="true" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.characters {
  display: flex;
  gap: 8px;
}
</style>
