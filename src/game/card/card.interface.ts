import type { DiceSymbol } from '../dice/dice.interface'
import type { Age } from '../game.interface'

export enum EffectType {
  AddAttack = 'addAttack',
  AddGold = 'addGold',
  AddMagic = 'addMagic',
  RemoveAttack = 'removeAttack',
  RemoveGold = 'removeGold',
  RemoveMagic = 'removeMagic',
}

export interface CardEffect {
  type: EffectType
  value: number
}

export interface PlayableCard {
  id: string
  age: Age
  name: string
  cost: DiceSymbol[]
}
