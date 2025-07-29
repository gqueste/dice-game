import { DiceSymbol } from '@/game/dice/dice.'
import { PlayableCard, type CardEffect, type PlayableCardInterface } from '../card'

interface CharacterInterface extends PlayableCardInterface {
  currentLevel: Level
  levels: {
    [key in Level]?: {
      level: Level
      levelUpCost: number
      skill: CharacterSkill
    }
  }
}
export class Character extends PlayableCard {
  currentLevel: Level
  levels: {
    [key in Level]?: {
      level: Level
      levelUpCost: number
      skill: CharacterSkill
    }
  }

  constructor(config: CharacterInterface) {
    super(config)
    this.currentLevel = config.currentLevel
    this.levels = config.levels
  }

  isActivable(availableDices: DiceSymbol[]): boolean {
    if (availableDices.length === 0) {
      return false
    }
    const skill = this.getCurrentSkill()
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

  getCurrentSkill(): CharacterSkill | undefined {
    return this.levels[this.currentLevel]?.skill
  }

  getCurrentSkillCost(): DiceSymbol[] {
    const skill = this.getCurrentSkill()
    if (!skill) {
      return []
    }
    return skill.cost
  }
}

export enum Level {
  Level1 = 'level1',
  Level2 = 'level2',
  Level3 = 'level3',
}

export interface CharacterSkill {
  cost: DiceSymbol[]
  effect: CardEffect
}
