import { DiceSymbol } from '@/game/dice/dice.interface'

export interface Character {
  id: string
  price: number
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
  effect: {
    type: EffectType
    value: number
  }
}

export enum EffectType {
  AddAttack = 'addAttack',
  AddGold = 'addGold',
  AddMagic = 'addMagic',
}
