import { DiceSymbol } from '@/dice/dice.interface'
import { type CharacterCard, EffectType, Level } from './character.interface'

export const defaultAttackCharacter: Partial<CharacterCard> = {
  name: 'Chasseur',
  currentLevel: Level.Level1,
  price: 0,
  levels: {
    [Level.Level1]: {
      levelUpCost: 10,
      skill: {
        cost: [DiceSymbol.Attack],
        effect: {
          type: EffectType.AddAttack,
          value: 2,
        },
      },
    },
    [Level.Level2]: {
      levelUpCost: 20,
      skill: {
        cost: [DiceSymbol.Attack],
        effect: {
          type: EffectType.AddAttack,
          value: 3,
        },
      },
    },
    [Level.Level3]: {
      levelUpCost: 30,
      skill: {
        cost: [DiceSymbol.Attack],
        effect: {
          type: EffectType.AddAttack,
          value: 4,
        },
      },
    },
  },
}
