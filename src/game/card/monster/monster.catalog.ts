import { DiceSymbol } from '@/game/dice/dice.interface'
import type { Monster } from './monster.interface'
import { v4 as uuid } from 'uuid'
import { Age } from '@/game/game.interface'
import { EffectType } from '../card.interface'

export const rabbit: Monster = {
  id: uuid(),
  name: 'Lapin',
  cost: [DiceSymbol.Attack],
  age: Age.First,
  experience: 2,
  buyEffect: {
    effect: EffectType.AddGold,
    value: 1,
  },
}

export const ghost: Monster = {
  id: uuid(),
  name: 'Fantôme',
  cost: [DiceSymbol.Magic, DiceSymbol.Magic],
  age: Age.First,
  experience: 5,
  riverEffect: {
    effect: EffectType.RemoveAttack,
    value: 1,
  },
}

export const thief: Monster = {
  id: uuid(),
  name: 'Voleur',
  cost: [DiceSymbol.Attack, DiceSymbol.Attack],
  age: Age.First,
  experience: 5,
  appearEffect: {
    effect: EffectType.RemoveGold,
    value: 1,
  },
  riverEffect: {
    effect: EffectType.RemoveGold,
    value: 1,
  },
}

export const dragon: Monster = {
  id: uuid(),
  name: 'Dragon',
  cost: [
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Magic,
    DiceSymbol.Magic,
  ],
  age: Age.Third,
  experience: 40,
  riverEffect: {
    effect: EffectType.RemoveGold,
    value: 5,
  },
  appearEffect: {
    effect: EffectType.RemoveMagic,
    value: 5,
  },
  buyEffect: {
    effect: EffectType.AddGold,
    value: 5,
  },
}
