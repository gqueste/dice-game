import { type Dice, DiceSymbol } from './dice.interface'
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

export const attackDice: Dice = {
  id: uuid(),
  sides: [
    DiceSymbol.Blank,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
}

export const attackerDice: Dice = {
  id: uuid(),
  sides: [
    DiceSymbol.Blank,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Magic,
  ],
}

export const golderDice: Dice = {
  id: uuid(),
  sides: [
    DiceSymbol.Blank,
    DiceSymbol.Gold,
    DiceSymbol.Gold,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Gold,
  ],
}

export const magicDice: Dice = {
  id: uuid(),
  sides: [
    DiceSymbol.Blank,
    DiceSymbol.Magic,
    DiceSymbol.Magic,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
}

export const magicerDice: Dice = {
  id: uuid(),
  sides: [
    DiceSymbol.Blank,
    DiceSymbol.Magic,
    DiceSymbol.Magic,
    DiceSymbol.Magic,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
}
