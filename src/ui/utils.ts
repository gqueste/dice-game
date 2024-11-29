import { DiceSymbol } from '@/game/dice/dice.interface'
import { CircleDollarSign, Sparkles, Swords, X } from 'lucide-vue-next'
import { type Component } from 'vue'
import AddAttack from './symbols/AddAttack.vue'
import AddGold from './symbols/AddGold.vue'
import AddMagic from './symbols/AddMagic.vue'
import { EffectType } from '@/game/card/card.interface'
import { Age } from '@/game/game.interface'

export const diceSymbolToComponent = (diceSymbol: DiceSymbol): Component => {
  switch (diceSymbol) {
    case DiceSymbol.Attack:
      return Swords
    case DiceSymbol.Gold:
      return CircleDollarSign
    case DiceSymbol.Magic:
      return Sparkles
    default:
      return X
  }
}

export const effectTypeToComponent = (effectType: EffectType): Component => {
  switch (effectType) {
    case EffectType.AddAttack:
      return AddAttack
    case EffectType.AddGold:
      return AddGold
    case EffectType.AddMagic:
      return AddMagic
    default:
      return AddAttack
  }
}

export const ageToLabel = (age: Age): string => {
  switch (age) {
    case Age.First:
      return 'I'
    case Age.Second:
      return 'II'
    case Age.Third:
      return 'III'
  }
}
