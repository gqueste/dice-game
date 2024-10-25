import { describe, expect, test, vi } from 'vitest'
import { Dice, DiceSymbol } from './dice.interface'
import { rollDice, rollDices } from './dice.utils'

const testDice: Dice = {
  id: 'id0',
  sides: [
    DiceSymbol.Blank,
    DiceSymbol.Blank,
    DiceSymbol.Blank,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
}

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
      expect(rollDice(testDice)).toEqual(expected)
    })
  })
  describe('rollDices defaultDices', () => {
    test('should roll several dices', () => {
      vi.spyOn(Math, 'random')
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.6)
        .mockReturnValueOnce(0.8)
        .mockReturnValueOnce(0.9)
      expect(rollDices([testDice, testDice, testDice, testDice])).toEqual([
        DiceSymbol.Blank,
        DiceSymbol.Attack,
        DiceSymbol.Gold,
        DiceSymbol.Magic,
      ])
    })
  })
})
