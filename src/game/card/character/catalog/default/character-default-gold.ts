import { DiceSymbol } from '@/game/dice/dice.'
import { type Character, Level } from '@/game/card/character/character.interface'
import { v4 as uuid } from 'uuid'
import { EffectType } from '@/game/card/card.interface'
import { Age } from '@/game/game.interface'

export const defaultGoldCharacter: Character = {
  id: uuid(),
  age: Age.Start,
  name: 'Paysan',
  currentLevel: Level.Level1,
  cost: [],
  levels: {
    [Level.Level1]: {
      level: Level.Level1,
      levelUpCost: 0,
      skill: {
        cost: [DiceSymbol.Gold],
        effect: {
          type: EffectType.AddGold,
          value: 2,
        },
      },
    },
    [Level.Level2]: {
      level: Level.Level2,
      levelUpCost: 10,
      skill: {
        cost: [DiceSymbol.Gold],
        effect: {
          type: EffectType.AddGold,
          value: 3,
        },
      },
    },
    [Level.Level3]: {
      level: Level.Level3,
      levelUpCost: 20,
      skill: {
        cost: [DiceSymbol.Gold],
        effect: {
          type: EffectType.AddGold,
          value: 4,
        },
      },
    },
  },
}
