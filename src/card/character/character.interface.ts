import { DiceSymbol } from '@/dice/dice.interface'

export interface CharacterCard {
  id: string
  price: number
  name: string
  currentLevel: Level
  levels: {
    [key in Level]?: {
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
  effect: {
    type: EffectType
    value: number
  }
}

export enum EffectType {
  AddAttack = 'addAttack',
}
