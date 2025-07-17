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

export interface PlayableCardInterface {
  id: string
  age: Age
  name: string
  cost: DiceSymbol[]
}

export class PlayableCard implements PlayableCardInterface {
  id: string
  age: Age
  name: string
  cost: DiceSymbol[]

  constructor({ id, age, name, cost }: PlayableCardInterface) {
    this.id = id
    this.age = age
    this.name = name
    this.cost = cost
  }
}

export interface RiverCardInterface extends PlayableCardInterface {
  appearEffect?: CardEffect
  riverEffect?: CardEffect
  buyEffect?: CardEffect
  killEffect?: CardEffect
}

export class RiverCard extends PlayableCard {
  appearEffect?: CardEffect
  riverEffect?: CardEffect
  buyEffect?: CardEffect
  killEffect?: CardEffect

  constructor(config: RiverCardInterface) {
    super(config)
    this.appearEffect = config.appearEffect
    this.riverEffect = config.riverEffect
    this.buyEffect = config.buyEffect
    this.killEffect = config.killEffect
  }
}
