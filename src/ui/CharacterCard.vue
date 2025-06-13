<template>
  <PlayableCard
    :age="character.age"
    :name="character.name"
    :cost="character.cost"
    :hovered="hovered"
  >
    <template v-slot:body>
      <div
        v-for="level in character.levels"
        class="level"
        :class="{
          'is-current-level': level?.level === character.currentLevel,
          activable,
          activated,
        }"
        :key="level?.level"
      >
        <div class="current-level-check">{{ level?.levelUpCost }}</div>
        <div v-for="(requiredDice, index) in level?.skill.cost" :key="index" class="required-dice">
          <component :is="diceSymbolToComponent(requiredDice)" />
        </div>
        <div class="effect">
          {{ level?.skill.effect.value }}
          <component :is="effectTypeToComponent(level!.skill.effect.type)" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer"><ArrowBigDown />Expérience<ArrowBigDown /></div>
    </template>
  </PlayableCard>
</template>

<script setup lang="ts">
import type { Character } from '@/game/card/character/character.interface'
import { diceSymbolToComponent, effectTypeToComponent } from './utils'
import { ArrowBigDown } from 'lucide-vue-next'
import PlayableCard from './PlayableCard.vue'

defineProps<{ character: Character; activable?: boolean; activated?: boolean; hovered?: boolean }>()
</script>

<style lang="scss" scoped>
.level {
  --active-color: red;

  --level-color: black;
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  align-items: center;
  padding: 0 8px;
  color: var(--level-color);

  .current-level-check {
    border: 1px solid var(--level-color);
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 12px;
  }

  .required-dice {
    border: 1px solid var(--level-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .effect {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
}

.footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
}

.is-current-level {
  border: 1px solid var(--active-color);
  border-radius: 4px;
  padding: 8px;

  &.activable {
    --level-color: var(--active-color);
    border: 3px solid var(--active-color);
  }

  &.activated {
    --level-color: white;
    background-color: var(--active-color);
    border: 3px solid var(--active-color);

    font-weight: bold;

    .current-level-check {
      border-width: 2px;
    }

    .required-dice {
      border-width: 2px;
    }
  }
}
</style>
