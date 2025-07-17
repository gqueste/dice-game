<script setup lang="ts">
import CharacterCard from '@/ui/CharacterCard.vue'
import { getDefaultAttackCharacter } from '@/game/card/character/catalog/default/character-default-attack'
import { ref, type Ref } from 'vue'
import type { Character } from '@/game/card/character/character'

const character: Ref<Character> = ref(getDefaultAttackCharacter())
</script>

<template>
  <main>
    <div class="cards">
      <div>
        <div>Default</div>
        <CharacterCard :character="character" />
      </div>
      <div>
        <div>Hover</div>
        <CharacterCard :character="character" activable hovered />
      </div>
    </div>
    <div class="cards">
      <div>
        <div>Buyable</div>
        <CharacterCard :character="character" buyable />
      </div>
      <div>
        <div>Buyable + Hover</div>
        <CharacterCard :character="character" buyable hovered />
      </div>
    </div>
    <div class="cards">
      <div>
        <div>Default</div>
        <CharacterCard :character="character" />
      </div>
      <div>
        <div>Activable</div>
        <CharacterCard :character="character" activable />
      </div>
      <div>
        <div>Activated</div>
        <CharacterCard :character="character" activated />
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
