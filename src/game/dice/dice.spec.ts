import { describe, expect, test, vi } from 'vitest'
import { Dice, DiceSymbol, DiceType } from './dice.'

const testDice: Dice = new Dice('id0', DiceType.Default)

describe('dice.utils', () => {
  describe('rollDice', () => {
    test.each([
      [0.1, DiceSymbol.Blank],
      [0.2, DiceSymbol.Blank],
      [0.3, DiceSymbol.Blank],
      [0.6, DiceSymbol.Attack],
      [0.8, DiceSymbol.Gold],
      [0.9, DiceSymbol.Magic],
    ])('with rando %f, should return %s', (rand, expected) => {
      vi.spyOn(Math, 'random').mockReturnValueOnce(rand)
      testDice.roll()
      expect(testDice.currentSideRolled).toEqual(expected)
    })
  })
})
