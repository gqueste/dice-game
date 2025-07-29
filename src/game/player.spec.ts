import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Player, RolledSymbol } from './player'
import { DiceSymbol, DiceType } from './dice/dice.'
import { AttackDice, DefaultDice, GoldDice, MagicDice } from './dice/dice.catalog'
import { getDefaultAttackCharacter } from './card/character/catalog/default/character-default-attack'
import { Level } from './card/character/character'

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

  describe('hasActivatedCharacter', () => {
    test('should return false if no symbol exist', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.rolledSymbols = []
      expect(player.hasActivatedCharacter(character)).toEqual(false)
    })
    test('should return false if no symbol is affected to the card', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.usedSymbols = [{ cardId: 'id', symbolId: 'id', location: 'board' }]
      expect(player.hasActivatedCharacter(character)).toEqual(false)
    })
    test('should return true if a symbol is affected to the card', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.usedSymbols = [{ cardId: character.id, symbolId: 'id', location: 'board' }]
      expect(player.hasActivatedCharacter(character)).toEqual(true)
    })
  })

  describe('isRolledSymbolAvailable', () => {
    test('should return false if symbol is not in the pool', () => {
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.rolledSymbols = []
      player.usedSymbols = []
      expect(player.isRolledSymbolAvailable(symbol)).toEqual(false)
    })
    test('should return false if symbol has been used', () => {
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.rolledSymbols = [symbol]
      player.usedSymbols = [{ cardId: 'id', symbolId: symbol.id, location: 'board' }]
      expect(player.isRolledSymbolAvailable(symbol)).toEqual(false)
    })
    test('should return true if symbol is available', () => {
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.rolledSymbols = [symbol]
      player.usedSymbols = []
      expect(player.isRolledSymbolAvailable(symbol)).toEqual(true)
    })
  })

  describe('getAvailableRolledSymbols', () => {
    test('should return none if no symbol in the pool', () => {
      const player = new Player('id', 'name')
      player.dices = []
      player.usedSymbols = []
      expect(player.getAvailableRolledSymbols()).toEqual([])
    })
    test('should return none if symbol are used', () => {
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.rolledSymbols = [symbol]
      player.usedSymbols = [{ cardId: 'id', symbolId: symbol.id, location: 'board' }]
      expect(player.getAvailableRolledSymbols()).toEqual([])
    })
    test('should return availables symbols', () => {
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.rolledSymbols = [symbol]
      player.usedSymbols = []
      expect(player.getAvailableRolledSymbols()).toEqual([symbol])
    })
  })

  describe('canActivateCharacter', () => {
    test('should return false if character is not in player board', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = []
      expect(player.canActivateCharacter(character)).toEqual(false)
    })
    test('should return false if character has been activated', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.usedSymbols = [{ cardId: character.id, symbolId: 'id', location: 'board' }]
      expect(player.canActivateCharacter(character)).toEqual(false)
    })
    test('should return false if there are not enough symbols to activate', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Blank })
      player.board = [character]
      player.rolledSymbols = [symbol]
      player.usedSymbols = []
      expect(player.canActivateCharacter(character)).toEqual(false)
    })
    test('should return true if there are enough symbols to activate', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      const symbol0 = new RolledSymbol({ symbol: DiceSymbol.Attack })
      const symbol1 = new RolledSymbol({ symbol: DiceSymbol.Blank })

      player.board = [character]
      player.rolledSymbols = [symbol0, symbol1]
      player.usedSymbols = []
      expect(player.canActivateCharacter(character)).toEqual(true)
    })
  })

  describe('activateCharacter', () => {
    test('should throw error if is already activated', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.board = [character]
      player.usedSymbols = [{ cardId: character.id, symbolId: symbol.id, location: 'board' }]

      expect(() => player.activateCharacter(character)).toThrowError()

      expect(player.usedSymbols).toEqual([
        { cardId: character.id, symbolId: symbol.id, location: 'board' },
      ])
    })
    test('should throw error if no corresponding symbol', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.rolledSymbols = []
      player.usedSymbols = []

      expect(() => player.activateCharacter(character)).toThrowError()
      expect(player.usedSymbols).toEqual([])
    })
    test('should activate and allocate dices', () => {
      const character = getDefaultAttackCharacter()
      character.currentLevel = Level.Level2
      character.levels[Level.Level2]!.skill.cost = [DiceSymbol.Attack, DiceSymbol.Attack]
      const player = new Player('id', 'name')
      const symbol0 = new RolledSymbol({ symbol: DiceSymbol.Attack })
      const symbol1 = new RolledSymbol({ symbol: DiceSymbol.Blank })
      const symbol2 = new RolledSymbol({ symbol: DiceSymbol.Attack })
      const symbol3 = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.board = [character]
      player.rolledSymbols = [symbol0, symbol1, symbol2, symbol3]
      player.usedSymbols = [{ cardId: 'fakeId', symbolId: symbol0.id, location: 'board' }]

      player.activateCharacter(character)

      expect(player.usedSymbols).toEqual([
        { cardId: 'fakeId', symbolId: symbol0.id, location: 'board' },
        { cardId: character.id, symbolId: symbol2.id, location: 'board' },
        { cardId: character.id, symbolId: symbol3.id, location: 'board' },
      ])
    })
  })

  describe('isRolledSymbolUsed', () => {
    test('should return false if dice symbol is not used', () => {
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.rolledSymbols = [symbol]

      expect(player.isRolledSymbolUsed(symbol)).toEqual(false)
    })
    test('should return true if symbol dice is used', () => {
      const player = new Player('id', 'name')
      const symbol = new RolledSymbol({ symbol: DiceSymbol.Attack })
      player.rolledSymbols = [symbol]
      player.usedSymbols = [{ cardId: 'id', symbolId: symbol.id, location: 'board' }]

      expect(player.isRolledSymbolUsed(symbol)).toEqual(true)
    })
  })
})
