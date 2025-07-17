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
