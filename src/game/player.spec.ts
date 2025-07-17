import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Player } from './player'
import { DiceSymbol } from './dice/dice.'

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
})
