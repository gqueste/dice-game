import { beforeEach, describe, expect, test } from 'vitest'
import { getDefaultAttackCharacter } from './catalog/default/character-default-attack'
import { DiceSymbol } from '@/game/dice/dice.'
import { Level, type Character } from './character'

let character: Character

describe('Character', () => {
  beforeEach(() => {
    character = getDefaultAttackCharacter()
  })
  describe('isActivable', () => {
    test('should be false if no dices available', () => {
      expect(character.isActivable([])).toEqual(false)
    })
    test('should be false if no correct dices available', () => {
      expect(character.isActivable([DiceSymbol.Blank, DiceSymbol.Gold, DiceSymbol.Magic])).toEqual(
        false
      )
    })
    test('should be false if no correct amount of dices is available', () => {
      character.levels[Level.Level1]!.skill.cost = [DiceSymbol.Attack, DiceSymbol.Attack]
      expect(character.isActivable([DiceSymbol.Attack, DiceSymbol.Gold, DiceSymbol.Magic])).toEqual(
        false
      )
    })
    test('should be true if correct amount of dices is available', () => {
      character.levels[Level.Level1]!.skill.cost = [DiceSymbol.Attack, DiceSymbol.Attack]
      expect(
        character.isActivable([DiceSymbol.Attack, DiceSymbol.Attack, DiceSymbol.Magic])
      ).toEqual(true)
    })
  })

  describe('getCurrentSkillCost', () => {
    test('should return empty array if no skill', () => {
      character.levels = {}
      expect(character.getCurrentSkillCost()).toEqual([])
    })
    test('should return empty array if no skill for this level', () => {
      delete character.levels[Level.Level1]
      expect(character.getCurrentSkillCost()).toEqual([])
    })
    test('should return array with correspondig skill dice symbols', () => {
      expect(character.getCurrentSkillCost()).toEqual([DiceSymbol.Attack])
    })
  })
  describe('getCurrentSkill', () => {
    test('should return undefined if no skill', () => {
      character.levels = {}
      expect(character.getCurrentSkill()).toEqual(undefined)
    })
    test('should return undefined if no skill for this level', () => {
      delete character.levels[Level.Level1]
      expect(character.getCurrentSkill()).toEqual(undefined)
    })
    test('should return skill with correspondig skill dice symbols', () => {
      expect(character.getCurrentSkill()).toEqual({
        cost: ['attack'],
        effect: {
          type: 'addAttack',
          value: 2,
        },
      })
    })
  })
})
