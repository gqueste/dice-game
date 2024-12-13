import { DiceSymbol } from '@/game/dice/dice.interface'
import type { Event } from './event.interface'
import { v4 as uuid } from 'uuid'
import { Age } from '@/game/game.interface'
import { EffectType } from '../card.interface'

export const market: Event = {
  id: uuid(),
  name: 'Marché',
  cost: [DiceSymbol.Gold, DiceSymbol.Gold],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddDefaultDice,
    value: 1,
  },
}

export const hunt: Event = {
  id: uuid(),
  name: 'Chasse',
  cost: [DiceSymbol.Attack, DiceSymbol.Attack],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddDefaultDice,
    value: 1,
  },
}

export const experiment: Event = {
  id: uuid(),
  name: 'Expérience',
  cost: [DiceSymbol.Magic, DiceSymbol.Magic],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddDefaultDice,
    value: 1,
  },
}

export const attackGoldToDefault: Event = {
  id: 'attackGoldToDefault',
  name: 'XXX',
  cost: [DiceSymbol.Attack, DiceSymbol.Gold],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddDefaultDice,
    value: 1,
  },
}

export const attackMagicToDefault: Event = {
  id: 'attackMagicToDefault',
  name: 'XXX',
  cost: [DiceSymbol.Attack, DiceSymbol.Magic],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddDefaultDice,
    value: 1,
  },
}

export const goldMagicToDefault: Event = {
  id: 'goldMagicToDefault',
  name: 'XXX',
  cost: [DiceSymbol.Gold, DiceSymbol.Magic],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddDefaultDice,
    value: 1,
  },
}

export const convertAttackToGold: Event = {
  id: 'convertAttackToGold',
  name: 'XXX',
  cost: [DiceSymbol.Attack, DiceSymbol.Attack],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddGold,
    value: 1,
  },
}

export const convertAttackToMagic: Event = {
  id: 'convertAttackToMagic',
  name: 'XXX',
  cost: [DiceSymbol.Attack, DiceSymbol.Attack],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddMagic,
    value: 1,
  },
}

export const convertGoldToAttack: Event = {
  id: 'convertGoldToAttack',
  name: 'XXX',
  cost: [DiceSymbol.Gold, DiceSymbol.Gold],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddAttack,
    value: 1,
  },
}

export const convertGoldToMagic: Event = {
  id: 'convertGoldToMagic',
  name: 'XXX',
  cost: [DiceSymbol.Gold, DiceSymbol.Gold],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddMagic,
    value: 1,
  },
}

export const convertMagicToAttack: Event = {
  id: 'convertMagicToAttack',
  name: 'XXX',
  cost: [DiceSymbol.Magic, DiceSymbol.Magic],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddAttack,
    value: 1,
  },
}

export const convertMagicToGold: Event = {
  id: 'convertMagicToGold',
  name: 'XXX',
  cost: [DiceSymbol.Magic, DiceSymbol.Magic],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddGold,
    value: 1,
  },
}

export const buyAttackDiceGold: Event = {
  id: 'buyAttackDiceGold',
  name: 'XXX',
  cost: [DiceSymbol.Attack, DiceSymbol.Attack, DiceSymbol.Gold],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddAttackDice,
    value: 1,
  },
}

export const buyAttackDiceMagic: Event = {
  id: 'buyAttackDiceMagic',
  name: 'XXX',
  cost: [DiceSymbol.Attack, DiceSymbol.Attack, DiceSymbol.Magic],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddAttackDice,
    value: 1,
  },
}

export const buyGoldDiceAttack: Event = {
  id: 'buyGoldDiceAttack',
  name: 'XXX',
  cost: [DiceSymbol.Gold, DiceSymbol.Gold, DiceSymbol.Attack],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddGoldDice,
    value: 1,
  },
}

export const buyGoldDiceMagic: Event = {
  id: 'buyGoldDiceMagic',
  name: 'XXX',
  cost: [DiceSymbol.Gold, DiceSymbol.Gold, DiceSymbol.Magic],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddGoldDice,
    value: 1,
  },
}

export const buyMagicDiceAttack: Event = {
  id: 'buyMagicDiceAttack',
  name: 'XXX',
  cost: [DiceSymbol.Magic, DiceSymbol.Magic, DiceSymbol.Attack],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddMagicDice,
    value: 1,
  },
}

export const buyMagicDiceGold: Event = {
  id: 'buyMagicDiceGold',
  name: 'XXX',
  cost: [DiceSymbol.Magic, DiceSymbol.Magic, DiceSymbol.Gold],
  age: Age.First,
  buyEffect: {
    type: EffectType.AddMagicDice,
    value: 1,
  },
}

//TODO Add an event card for all conversion
// Attack -> Gold Dice
// Attack -> Magic Dice
// Attack -> Attack Dice

// events to buy attack and attacker dice

// Buy card to get more space in player stash

export const allEvents = [
  market,
  hunt,
  experiment,
  attackGoldToDefault,
  attackMagicToDefault,
  goldMagicToDefault,
  convertAttackToGold,
  convertAttackToMagic,
  convertGoldToAttack,
  convertGoldToMagic,
  convertMagicToAttack,
  convertMagicToGold,
  buyAttackDiceGold,
  buyAttackDiceMagic,
  buyGoldDiceAttack,
  buyGoldDiceMagic,
  buyMagicDiceAttack,
  buyMagicDiceGold,
]
