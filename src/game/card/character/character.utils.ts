import type { DiceSymbol, UsedDice } from '@/game/dice/dice.'
import type { Character } from './character.interface'

export const canActivateCharacter = (
  character: Character,
  availableDices: DiceSymbol[]
): boolean => {
  if (availableDices.length === 0) {
    return false
  }
  const skill = character.levels[character.currentLevel]?.skill
  if (!skill) {
    return false
  }
  const dices = [...availableDices]

  for (const targetDice of skill.cost) {
    const index = dices.findIndex((dice) => dice === targetDice)
    if (index > -1) {
      dices.splice(index, 1)
    } else {
      return false
    }
  }
  return true
}

export const isActivatedCharacter = (character: Character, usedDices: UsedDice[]): boolean =>
  !!usedDices.find((usedDice) => character.id === usedDice.cardId)
