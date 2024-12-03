import type { CardEffect, PlayableCard } from '../card.interface'

export interface Monster extends PlayableCard {
  experience: number
  appearEffect?: CardEffect
  riverEffect?: CardEffect
  buyEffect?: CardEffect
}
