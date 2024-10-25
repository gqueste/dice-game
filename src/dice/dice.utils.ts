import { type Dice, DiceSymbol } from './dice.interface'

export const rollDice = (dice: Dice): DiceSymbol => {
  const randomValue = Math.floor(Math.random() * 6)
  return dice.sides[randomValue]
}

export const rollDices = (dices: Dice[]): DiceSymbol[] => dices.map(rollDice)
