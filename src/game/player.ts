import { getDefaultAttackCharacter } from './card/character/catalog/default/character-default-attack'
import { getDefaultGoldCharacter } from './card/character/catalog/default/character-default-gold'
import { getDefaultMagicCharacter } from './card/character/catalog/default/character-default-magic'
import type { Character } from './card/character/character'
import { DefaultDice } from './dice/dice.catalog'
import type { Dice, DiceSymbol, DiceType, UsedDice } from './dice/dice.'

export class Player {
  board: Character[]
  dices: Dice[]
  id: string
  name: string
  usedDices: UsedDice[]
  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.board = [
      getDefaultAttackCharacter(),
      getDefaultGoldCharacter(),
      getDefaultMagicCharacter(),
    ]
    this.dices = [new DefaultDice(), new DefaultDice(), new DefaultDice()]
    this.usedDices = []
  }

  rollAllDices() {
    this.dices.forEach((dice) => dice.roll())
  }

  getDicesGroupedByType(): { [key in DiceType]: Dice[] } {
    return this.dices.reduce(
      (acc, currentDice) => {
        if (!acc[currentDice.type]) {
          acc[currentDice.type] = []
        }
        acc[currentDice.type].push(currentDice)
        return acc
      },
      {} as { [key in DiceType]: Dice[] }
    )
  }

  getThrownDicesSymbols(): DiceSymbol[] {
    return (
      this.dices.reduce((acc, dice) => {
        if (!!dice.currentSideRolled) {
          acc.push(dice.currentSideRolled)
        }
        return acc
      }, [] as DiceSymbol[]) || []
    )
  }

  hasActivatedCharacter(character: Character): boolean {
    return !!this.usedDices.find((usedDice) => character.id === usedDice.cardId)
  }

  isDiceAvailable(dice: Dice): boolean {
    return (
      !!this.dices.find((d) => d.id === dice.id) &&
      !this.isDiceUsed(dice) &&
      !!dice.currentSideRolled
    )
  }

  getAvailableDices(): Dice[] {
    return this.dices.filter((dice) => this.isDiceAvailable(dice))
  }

  canActivateCharacter(character: Character): boolean {
    return (
      !!this.board.find((char) => char.id === character.id) &&
      !this.hasActivatedCharacter(character) &&
      character.isActivable(this.getAvailableDices().map((dice) => dice.currentSideRolled!))
    )
  }

  activateCharacter(character: Character) {
    const allocateDiceForTargetDiceSymbol = (diceSymbol: DiceSymbol) => {
      const correspondingDice = this.getAvailableDices().find(
        (dice) => dice.currentSideRolled === diceSymbol
      )
      if (correspondingDice) {
        this.usedDices.push({
          cardId: character.id,
          diceId: correspondingDice.id,
          location: 'board',
        })
      }
    }

    if (this.canActivateCharacter(character)) {
      const cost = character.getCurrentSkillCost()
      cost.forEach(allocateDiceForTargetDiceSymbol)
    } else {
      throw new Error(`player ${this.id} can not activate character ${character.id}`)
    }
  }

  isDiceUsed(dice: Dice): boolean {
    return !!this.usedDices.find((used) => used.diceId === dice.id)
  }
}
