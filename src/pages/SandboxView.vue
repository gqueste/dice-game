<script setup lang="ts">
import CharacterCard from '@/ui/CharacterCard.vue'
import { defaultAttackCharacter } from '@/game/card/character/catalog/default/character-default-attack'
</script>

<template>
  <main>
    <div class="cards">
      <div>
        <div>Default</div>
        <CharacterCard :character="defaultAttackCharacter" />
      </div>
      <div>
        <div>Hover</div>
        <CharacterCard :character="defaultAttackCharacter" :activable="true" :hovered="true" />
      </div>
    </div>
    <div class="cards">
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
.cards {
  display: flex;
  gap: 8px;
}
</style>
