import type { DiceSymbol } from '../dice/dice.'
import type { Age } from '../game.interface'

export enum EffectType {
  AddAttack = 'addAttack',
  AddGold = 'addGold',
  AddMagic = 'addMagic',
  RemoveAttack = 'removeAttack',
  RemoveGold = 'removeGold',
  RemoveMagic = 'removeMagic',
  AddDefaultDice = 'addDefaultDice',
  AddAttackDice = 'addAttackDice',
  AddMagicDice = 'addMagicDice',
  AddGoldDice = 'addGoldDice',
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

export interface RiverCard extends PlayableCard {
  appearEffect?: CardEffect
  riverEffect?: CardEffect
  buyEffect?: CardEffect
  killEffect?: CardEffect
}
