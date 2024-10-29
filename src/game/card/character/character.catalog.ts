import { DiceSymbol } from '@/game/dice/dice.interface'
import { type Character, EffectType, Level } from './character.interface'
import { v4 as uuid } from 'uuid'

export const defaultAttackCharacter: Character = {
  id: uuid(),
  name: 'Chasseur',
  currentLevel: Level.Level1,
  price: 0,
  levels: {
    [Level.Level1]: {
      level: Level.Level1,
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
      level: Level.Level2,
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
      level: Level.Level3,
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
