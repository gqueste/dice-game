import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Game } from './game'
import { allEvents } from './card/event/event.catalog'

describe('Game', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getCurrentPlayer', () => {
    test('should return undefined if no corresponding player', () => {
      const game: Game = new Game()
      game.currentPlayerId = 'player1'
      expect(game.getCurrentPlayer()).toEqual(undefined)
    })
    test('should return player if corresponding player exists', () => {
      const game: Game = new Game()
      game.currentPlayerId = 'player0'
      expect(game.getCurrentPlayer()).toBeTruthy()
      expect(game.getCurrentPlayer()?.id).toEqual('player0')
    })
  })

  describe('drawFromLibrary', () => {
    test('should throw error if no more cards in library', () => {
      const game: Game = new Game()
      game.river = []
      game.library = []
      expect(() => game.drawFromLibrary()).toThrowError()
    })
    test('should get a card from the library and remove it from it', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.1)
      const game: Game = new Game()
      game.river = []
      game.library = [allEvents[0], allEvents[1]]
      const card = game.drawFromLibrary()
      expect(card).toEqual(allEvents[0])
      expect(game.library).toEqual([allEvents[1]])
    })
  })
})
