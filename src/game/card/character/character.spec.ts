import { beforeEach, describe, expect, test } from 'vitest'
import { getDefaultAttackCharacter } from './catalog/default/character-default-attack'
import { DiceSymbol } from '@/game/dice/dice.'
import { Level, type Character } from './character'

describe('Character', () => {
  describe('isActivable', () => {
    let character: Character
    beforeEach(() => {
      character = getDefaultAttackCharacter()
    })
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
})
