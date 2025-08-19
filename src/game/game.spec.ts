import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Game } from './game'
import { allEvents } from './card/event/event.catalog'
import * as uuid from 'uuid'
import { DiceSymbol } from './dice/dice.'
import { Player } from './player'
import { Character, Level } from './card/character/character'
import { Age } from './game.interface'
import { EffectType } from './card/card'

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

  describe('addDiceSymbolForPlayer', () => {
    test('should add symbol to rolledSymbols pool', () => {
      vi.spyOn(uuid, 'v4').mockReturnValue('id')
      const game: Game = new Game()
      const player = new Player('playerId', 'name')
      const character = new Character({
        age: Age.First,
        cost: [],
        currentLevel: Level.Level1,
        id: 'id',
        name: 'name',
        levels: {},
      })
      player.board = [character]
      game.players = [player]
      expect(player.rolledSymbols).toEqual([])
      game.addDiceSymbolForPlayer(DiceSymbol.Attack, player, player.board[0]!)
      expect(player.rolledSymbols).toEqual([
        { id: 'id', parentCharacter: 'id', symbol: DiceSymbol.Attack },
      ])
    })
  })

  describe('resolveCharacterEffect', () => {
    test('should add symbols to rolledSymbols pool', () => {
      vi.spyOn(uuid, 'v4').mockReturnValue('id')
      const game: Game = new Game()
      const player = new Player('playerId', 'name')
      const character = new Character({
        age: Age.First,
        cost: [],
        currentLevel: Level.Level1,
        id: 'id',
        name: 'name',
        levels: {
          [Level.Level1]: {
            level: Level.Level1,
            levelUpCost: 0,
            skill: {
              cost: [DiceSymbol.Attack],
              effect: {
                type: EffectType.AddAttack,
                value: 2,
              },
            },
          },
        },
      })
      player.board = [character]
      game.players = [player]
      expect(player.rolledSymbols).toEqual([])
      game.resolveCharacterEffect(character, player)
      expect(player.rolledSymbols).toEqual([
        { id: 'id', parentCharacter: 'id', symbol: DiceSymbol.Attack },
        { id: 'id', parentCharacter: 'id', symbol: DiceSymbol.Attack },
      ])
    })
    test('should not add symbols if no skill', () => {
      vi.spyOn(uuid, 'v4').mockReturnValue('id')
      const game: Game = new Game()
      const player = new Player('playerId', 'name')
      const character = new Character({
        age: Age.First,
        cost: [],
        currentLevel: Level.Level1,
        id: 'id',
        name: 'name',
        levels: {},
      })
      player.board = [character]
      game.players = [player]
      expect(player.rolledSymbols).toEqual([])
      game.resolveCharacterEffect(character, player)
      expect(player.rolledSymbols).toEqual([])
    })
    test('should not add symbols if unknown effect', () => {
      vi.spyOn(uuid, 'v4').mockReturnValue('id')
      const game: Game = new Game()
      const player = new Player('playerId', 'name')
      const character = new Character({
        age: Age.First,
        cost: [],
        currentLevel: Level.Level1,
        id: 'id',
        name: 'name',
        levels: {
          [Level.Level1]: {
            level: Level.Level1,
            levelUpCost: 0,
            skill: {
              cost: [DiceSymbol.Attack],
              effect: {
                type: 'unknown' as EffectType,
                value: 2,
              },
            },
          },
        },
      })
      player.board = [character]
      game.players = [player]
      expect(player.rolledSymbols).toEqual([])
      game.resolveCharacterEffect(character, player)
      expect(player.rolledSymbols).toEqual([])
    })
  })
})
