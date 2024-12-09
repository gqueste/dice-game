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

//TODO Add an event card for all conversion
// Attack -> Gold Dice
// Attack -> Magic Dice
// Attack -> Attack Dice

// events to buy attack and attacker dice

// events to add momentary dices

// Buy card to get more space in player stash

export const allEvents = [
  market,
  hunt,
  experiment,
  attackGoldToDefault,
  attackMagicToDefault,
  goldMagicToDefault,
]
