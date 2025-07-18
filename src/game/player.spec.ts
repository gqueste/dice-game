import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Player } from './player'
import { DiceSymbol, DiceType } from './dice/dice.'
import { AttackDice, DefaultDice, GoldDice, MagicDice } from './dice/dice.catalog'
import { getDefaultAttackCharacter } from './card/character/catalog/default/character-default-attack'

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

  describe('hasActivatedCharacter', () => {
    test('should return false if no dice exist', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.usedDices = []
      expect(player.hasActivatedCharacter(character)).toEqual(false)
    })
    test('should return false if no dice is affected to the card', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.usedDices = [{ cardId: 'id', diceId: 'id', location: 'board' }]
      expect(player.hasActivatedCharacter(character)).toEqual(false)
    })
    test('should return true if a dice is affected to the card', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      player.board = [character]
      player.usedDices = [{ cardId: character.id, diceId: 'id', location: 'board' }]
      expect(player.hasActivatedCharacter(character)).toEqual(true)
    })
  })

  describe('isDiceAvailable', () => {
    test('should return false if dice is not in the pool', () => {
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      player.dices = []
      player.usedDices = []
      expect(player.isDiceAvailable(dice)).toEqual(false)
    })
    test('should return false if dice has been used', () => {
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      player.dices = [dice]
      player.usedDices = [{ cardId: 'id', diceId: dice.id, location: 'board' }]
      expect(player.isDiceAvailable(dice)).toEqual(false)
    })
    test('should return false if dice has not been rolled', () => {
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      dice.currentSideRolled = null
      player.dices = [dice]
      player.usedDices = []
      expect(player.isDiceAvailable(dice)).toEqual(false)
    })
    test('should return true if dice is available', () => {
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      dice.currentSideRolled = dice.sides[0]
      player.dices = [dice]
      player.usedDices = []
      expect(player.isDiceAvailable(dice)).toEqual(true)
    })
  })

  describe('getAvailableDices', () => {
    test('should return none if no dice in the pool', () => {
      const player = new Player('id', 'name')
      player.dices = []
      player.usedDices = []
      expect(player.getAvailableDices()).toEqual([])
    })
    test('should return none if dice are used', () => {
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      player.dices = [dice]
      player.usedDices = [{ cardId: 'id', diceId: dice.id, location: 'board' }]
      expect(player.getAvailableDices()).toEqual([])
    })
    test('should return none if dice have not been rolled', () => {
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      dice.currentSideRolled = null
      player.dices = [dice]
      player.usedDices = []
      expect(player.getAvailableDices()).toEqual([])
    })
    test('should return availables dices', () => {
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      dice.currentSideRolled = dice.sides[0]
      player.dices = [dice]
      player.usedDices = []
      expect(player.getAvailableDices()).toEqual([dice])
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
      player.usedDices = [{ cardId: character.id, diceId: 'id', location: 'board' }]
      expect(player.canActivateCharacter(character)).toEqual(false)
    })
    test('should return false if there are not enough symbols to activate', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      const dice = new DefaultDice()
      player.board = [character]
      player.dices = [dice]
      player.usedDices = []
      expect(player.canActivateCharacter(character)).toEqual(false)
    })
    test('should return true if there are enough symbols to activate', () => {
      const character = getDefaultAttackCharacter()
      const player = new Player('id', 'name')
      const dice0 = new DefaultDice()
      dice0.currentSideRolled = DiceSymbol.Attack
      const dice1 = new DefaultDice()
      player.board = [character]
      player.dices = [dice0, dice1]
      player.usedDices = []
      expect(player.canActivateCharacter(character)).toEqual(true)
    })
  })
})
