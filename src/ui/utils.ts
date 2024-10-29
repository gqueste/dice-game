import { DiceSymbol } from '@/game/dice/dice.interface'
import { CircleDollarSign, Sparkles, Swords, X } from 'lucide-vue-next'
import type { Component } from 'vue'

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
