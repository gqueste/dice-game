import type { DiceSymbol } from '@/game/dice/dice.interface'
import type { Age } from '@/game/game.interface'
import type { CardEffect } from '../card.interface'

export interface Monster {
  id: string
  age: Age
  name: string
  cost: DiceSymbol[]
  experience: number
  appearEffect?: CardEffect
  riverEffect?: CardEffect
  buyEffect?: CardEffect
}
