import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Player } from './player'
import { DiceSymbol, DiceType } from './dice/dice.'
import { AttackDice, DefaultDice, GoldDice, MagicDice } from './dice/dice.catalog'

describe('Player', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('rollAllDices', () => {
    test('should set all dices rolled value', () => {
      const player = new Player('id', 'name')
      expect(player.dices.map((dice) => dice.currentSideRolled)).toEqual([null, null, null])
      const randomSpy = vi.spyOn(Math, 'random')
      randomSpy.mockReturnValue(0.1)
      player.rollAllDices()
      expect(player.dices.map((dice) => dice.currentSideRolled)).toEqual([
        DiceSymbol.Blank,
        DiceSymbol.Blank,
        DiceSymbol.Blank,
      ])
      expect(randomSpy).toHaveBeenCalledTimes(3)
    })
  })

  describe('getDicesGroupedByType', () => {
    test('should group all player dices by type', () => {
      const player = new Player('id', 'name')
      player.dices = [
        new AttackDice(),
        new DefaultDice(),
        new GoldDice(),
        new DefaultDice(),
        new MagicDice(),
        new AttackDice(),
        new AttackDice(),
      ]
      expect(player.getDicesGroupedByType()).toEqual({
        [DiceType.Attack]: [player.dices[0], player.dices[5], player.dices[6]],
        [DiceType.Default]: [player.dices[1], player.dices[3]],
        [DiceType.Gold]: [player.dices[2]],
        [DiceType.Magic]: [player.dices[4]],
      })
    })
  })

  describe('getThrownDicesSymbols', () => {
    test('should return thrown symbols', () => {
      const player = new Player('id', 'name')
      const dice0 = new DefaultDice()
      dice0.currentSideRolled = DiceSymbol.Blank
      const dice1 = new DefaultDice()
      dice1.currentSideRolled = DiceSymbol.Attack
      player.dices = [dice0, dice1]
      expect(player.getThrownDicesSymbols()).toEqual([DiceSymbol.Blank, DiceSymbol.Attack])
    })

    test('should return [] if no dices', () => {
      const player = new Player('id', 'name')
      player.dices = []
      expect(player.getThrownDicesSymbols()).toEqual([])
    })

    test('should return [] if no dices thrown', () => {
      const player = new Player('id', 'name')
      player.dices = [new DefaultDice(), new AttackDice()]
      expect(player.getThrownDicesSymbols()).toEqual([])
    })
  })
})
