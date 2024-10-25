import { Dice, DiceSymbol } from './dice.interface'
import { v4 as uuid } from 'uuid'

export const defaultDice: Dice = {
  id: uuid(),
  sides: [
    DiceSymbol.Blank,
    DiceSymbol.Blank,
    DiceSymbol.Blank,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
}
