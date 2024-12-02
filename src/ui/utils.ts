import { DiceSymbol } from '@/game/dice/dice.interface'
import { CircleDollarSign, Sparkles, Swords, X } from 'lucide-vue-next'
import { type Component } from 'vue'
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
      return diceSymbolToComponent(DiceSymbol.Attack)
    case EffectType.AddGold:
      return diceSymbolToComponent(DiceSymbol.Gold)
    case EffectType.AddMagic:
      return diceSymbolToComponent(DiceSymbol.Magic)
    case EffectType.RemoveAttack:
      return diceSymbolToComponent(DiceSymbol.Attack)
    case EffectType.RemoveGold:
      return diceSymbolToComponent(DiceSymbol.Gold)
    case EffectType.RemoveMagic:
      return diceSymbolToComponent(DiceSymbol.Magic)
    default:
      return diceSymbolToComponent(DiceSymbol.Attack)
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
    case Age.Start:
      return 'D'
  }
}
