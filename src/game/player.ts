import { getDefaultAttackCharacter } from './card/character/catalog/default/character-default-attack'
import { getDefaultGoldCharacter } from './card/character/catalog/default/character-default-gold'
import { getDefaultMagicCharacter } from './card/character/catalog/default/character-default-magic'
import type { Character } from './card/character/character'
import { DefaultDice } from './dice/dice.catalog'
import type { Dice, DiceSymbol, DiceType, UsedSymbol } from './dice/dice.'
import { v4 as uuid } from 'uuid'

export class RolledSymbol {
  id: string
  symbol: DiceSymbol
  parentCharacter?: string
  parentDice?: string

  constructor({
    symbol,
    parentCharacter,
    parentDice,
  }: {
    symbol: DiceSymbol
    parentCharacter?: string
    parentDice?: string
  }) {
    this.id = uuid()
    this.symbol = symbol
    this.parentCharacter = parentCharacter
    this.parentDice = parentDice
  }
}

export class Player {
  board: Character[]
  dices: Dice[]
  id: string
  name: string
  usedSymbols: UsedSymbol[]
  rolledSymbols: RolledSymbol[]
  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.board = [
      getDefaultAttackCharacter(),
      getDefaultGoldCharacter(),
      getDefaultMagicCharacter(),
    ]
    this.rolledSymbols = []
    this.dices = [new DefaultDice(), new DefaultDice(), new DefaultDice()]
    this.usedSymbols = []
  }

  rollAllDices() {
    this.rolledSymbols = []
    this.dices.forEach((dice) => dice.roll())
    this.dices.forEach((dice) => {
      this.rolledSymbols.push(
        new RolledSymbol({ symbol: dice.currentSideRolled!, parentDice: dice.id })
      )
    })
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

  hasActivatedCharacter(character: Character): boolean {
    return !!this.usedSymbols.find((usedSymbol) => character.id === usedSymbol.cardId)
  }

  isRolledSymbolAvailable(rolledSymbol: RolledSymbol): boolean {
    return (
      !!this.rolledSymbols.find((s) => s.id === rolledSymbol.id) &&
      !this.isRolledSymbolUsed(rolledSymbol)
    )
  }

  getAvailableRolledSymbols(): RolledSymbol[] {
    return this.rolledSymbols.filter((symbol) => this.isRolledSymbolAvailable(symbol))
  }

  canActivateCharacter(character: Character): boolean {
    return (
      !!this.board.find((char) => char.id === character.id) &&
      !this.hasActivatedCharacter(character) &&
      character.isActivable(
        this.getAvailableRolledSymbols().map((rolledSymbol) => rolledSymbol.symbol)
      )
    )
  }

  activateCharacter(character: Character) {
    const allocateRolledSymbolForTargetDiceSymbol = (diceSymbol: DiceSymbol) => {
      const correspondingDice = this.getAvailableRolledSymbols().find(
        (rolledSymbol) => rolledSymbol.symbol === diceSymbol
      )
      if (correspondingDice) {
        this.usedSymbols.push({
          cardId: character.id,
          symbolId: correspondingDice.id,
          location: 'board',
        })
      }
    }

    if (this.canActivateCharacter(character)) {
      const cost = character.getCurrentSkillCost()
      cost.forEach(allocateRolledSymbolForTargetDiceSymbol)
    } else {
      throw new Error(`player ${this.id} can not activate character ${character.id}`)
    }
  }

  isRolledSymbolUsed(rolledSymbol: RolledSymbol): boolean {
    return !!this.usedSymbols.find((used) => used.symbolId === rolledSymbol.id)
  }
}
