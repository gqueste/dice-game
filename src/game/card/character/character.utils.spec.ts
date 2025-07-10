import { beforeEach, describe, expect, test } from 'vitest'
import { defaultAttackCharacter } from './catalog/default/character-default-attack'
import { canActivateCharacter, isActivatedCharacter } from './character.utils'
import { DiceSymbol } from '@/game/dice/dice.'
import { Level, type Character } from './character.interface'

describe('Character.utils', () => {
  describe('canActivateCharacter', () => {
    let character: Character
    beforeEach(() => {
      character = structuredClone(defaultAttackCharacter)
    })
    test('should be false if no dices available', () => {
      expect(canActivateCharacter(character, [])).toEqual(false)
    })
    test('should be false if no correct dices available', () => {
      expect(
        canActivateCharacter(character, [DiceSymbol.Blank, DiceSymbol.Gold, DiceSymbol.Magic])
      ).toEqual(false)
    })
    test('should be false if no correct amount of dices is available', () => {
      character.levels[Level.Level1]!.skill.cost = [DiceSymbol.Attack, DiceSymbol.Attack]
      expect(
        canActivateCharacter(character, [DiceSymbol.Attack, DiceSymbol.Gold, DiceSymbol.Magic])
      ).toEqual(false)
    })
    test('should be true if correct amount of dices is available', () => {
      character.levels[Level.Level1]!.skill.cost = [DiceSymbol.Attack, DiceSymbol.Attack]
      expect(
        canActivateCharacter(character, [DiceSymbol.Attack, DiceSymbol.Attack, DiceSymbol.Magic])
      ).toEqual(true)
    })
  })

  describe('isActivatedCharacter', () => {
    test('should return false if no dice exist', () => {
      expect(isActivatedCharacter(defaultAttackCharacter, [])).toEqual(false)
    })
    test('should return false if no dice is affected to the card', () => {
      expect(
        isActivatedCharacter(defaultAttackCharacter, [
          { cardId: 'id', diceId: 'id', location: 'board' },
        ])
      ).toEqual(false)
    })
    test('should return true if a dice is affected to the card', () => {
      expect(
        isActivatedCharacter(defaultAttackCharacter, [
          { cardId: defaultAttackCharacter.id, diceId: 'id', location: 'board' },
        ])
      ).toEqual(true)
    })
  })
})
