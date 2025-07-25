import { DiceSymbol } from '@/game/dice/dice.'
import { Character, Level } from '@/game/card/character/character'
import { v4 as uuid } from 'uuid'
import { EffectType } from '@/game/card/card'
import { Age } from '@/game/game.interface'

export const getDefaultMagicCharacter = (): Character =>
  new Character({
    id: uuid(),
    age: Age.Start,
    name: 'Apprenti',
    currentLevel: Level.Level1,
    cost: [],
    levels: {
      [Level.Level1]: {
        level: Level.Level1,
        levelUpCost: 0,
        skill: {
          cost: [DiceSymbol.Magic],
          effect: {
            type: EffectType.AddMagic,
            value: 2,
          },
        },
      },
      [Level.Level2]: {
        level: Level.Level2,
        levelUpCost: 10,
        skill: {
          cost: [DiceSymbol.Magic],
          effect: {
            type: EffectType.AddMagic,
            value: 3,
          },
        },
      },
      [Level.Level3]: {
        level: Level.Level3,
        levelUpCost: 20,
        skill: {
          cost: [DiceSymbol.Magic],
          effect: {
            type: EffectType.AddMagic,
            value: 4,
          },
        },
      },
    },
  })
