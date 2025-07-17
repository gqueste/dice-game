import { DiceSymbol } from '@/game/dice/dice.'
import type { Monster } from './monster.interface'
import { v4 as uuid } from 'uuid'
import { Age } from '@/game/game.interface'
import { EffectType } from '../card'

export const rabbit: Monster = {
  id: uuid(),
  name: 'Lapin',
  cost: [DiceSymbol.Attack],
  age: Age.First,
  experience: 2,
  killEffect: {
    type: EffectType.AddGold,
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
    type: EffectType.RemoveAttack,
    value: -1,
  },
}

export const thief: Monster = {
  id: uuid(),
  name: 'Voleur',
  cost: [DiceSymbol.Attack, DiceSymbol.Attack],
  age: Age.First,
  experience: 5,
  appearEffect: {
    type: EffectType.RemoveGold,
    value: -1,
  },
  riverEffect: {
    type: EffectType.RemoveGold,
    value: -1,
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
    type: EffectType.RemoveGold,
    value: -5,
  },
  appearEffect: {
    type: EffectType.RemoveMagic,
    value: -5,
  },
  killEffect: {
    type: EffectType.AddGold,
    value: 5,
  },
}
