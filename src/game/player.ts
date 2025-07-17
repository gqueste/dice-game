import { defaultAttackCharacter } from './card/character/catalog/default/character-default-attack'
import { defaultGoldCharacter } from './card/character/catalog/default/character-default-gold'
import { defaultMagicCharacter } from './card/character/catalog/default/character-default-magic'
import type { Character } from './card/character/character.interface'
import { DefaultDice } from './dice/dice.catalog'
import type { Dice, UsedDice } from './dice/dice.'

export class Player {
  board: Character[]
  dices: Dice[]
  id: string
  name: string
  usedDices: UsedDice[]
  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.board = [defaultAttackCharacter, defaultGoldCharacter, defaultMagicCharacter]
    this.dices = [new DefaultDice(), new DefaultDice(), new DefaultDice()]
    this.usedDices = []
  }

  rollAllDices() {
    this.dices.forEach((dice) => dice.roll())
  }

  getDicesGroupedByType(): { [key: string]: Dice[] } {
    //TODO does not work here
    //add type to dice and filter on that
    return this.dices.reduce(
      (acc, currentDice) => {
        if (!acc[currentDice.id]) {
          acc[currentDice.id] = []
        }
        acc[currentDice.id].push(currentDice)
        return acc
      },
      {} as { [key: string]: Dice[] }
    )
  }
}
