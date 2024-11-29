import type { DiceSymbol } from '@/game/dice/dice.interface'
import type { Age } from '@/game/game.interface'
import type { EffectType } from '../card.interface'

export interface Monster {
  id: string
  age: Age
  name: string
  cost: DiceSymbol[]
  experience: number
  appearEffect?: {
    effect: EffectType
    value: number
  }
  riverEffect?: {
    effect: EffectType
    value: number
  }
  buyEffect?: {
    effect: EffectType
    value: number
  }
}
