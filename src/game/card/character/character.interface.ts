import { DiceSymbol } from '@/game/dice/dice.interface'
import type { CardEffect } from '../card.interface'
import type { Age } from '@/game/game.interface'

export interface Character {
  id: string
  age: Age
  cost: DiceSymbol[]
  name: string
  currentLevel: Level
  levels: {
    [key in Level]?: {
      level: Level
      levelUpCost: number
      skill: CharacterSkill
    }
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
