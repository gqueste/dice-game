import { EffectType } from '@/game/card/character/character.interface'
import { DiceSymbol } from '@/game/dice/dice.interface'
import { CircleDollarSign, Sparkles, Swords, X } from 'lucide-vue-next'
import { type Component } from 'vue'
import AddAttack from './symbols/AddAttack.vue'
import AddGold from './symbols/AddGold.vue'
import AddMagic from './symbols/AddMagic.vue'

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
