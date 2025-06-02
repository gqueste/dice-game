import { Dice, DiceSymbol } from './dice.'
import { v4 as uuid } from 'uuid'

export class DefaultDice extends Dice {
  constructor() {
    super(uuid(), [
      DiceSymbol.Blank,
      DiceSymbol.Blank,
      DiceSymbol.Blank,
      DiceSymbol.Attack,
      DiceSymbol.Gold,
      DiceSymbol.Magic,
    ])
  }
}

export class AttackDice extends Dice {
  constructor() {
    super(uuid(), [
      DiceSymbol.Blank,
      DiceSymbol.Attack,
      DiceSymbol.Attack,
      DiceSymbol.Attack,
      DiceSymbol.Gold,
      DiceSymbol.Magic,
    ])
  }
}

export class AttackerDice extends Dice {
  constructor() {
    super(uuid(), [
      DiceSymbol.Blank,
      DiceSymbol.Attack,
      DiceSymbol.Attack,
      DiceSymbol.Attack,
      DiceSymbol.Attack,
      DiceSymbol.Magic,
    ])
  }
}

export class GolderDice extends Dice {
  constructor() {
    super(uuid(), [
      DiceSymbol.Blank,
      DiceSymbol.Gold,
      DiceSymbol.Gold,
      DiceSymbol.Attack,
      DiceSymbol.Gold,
      DiceSymbol.Gold,
    ])
  }
}

export class MagicDice extends Dice {
  constructor() {
    super(uuid(), [
      DiceSymbol.Blank,
      DiceSymbol.Magic,
      DiceSymbol.Magic,
      DiceSymbol.Attack,
      DiceSymbol.Gold,
      DiceSymbol.Magic,
    ])
  }
}

export class MagicerDice extends Dice {
  constructor() {
    super(uuid(), [
      DiceSymbol.Blank,
      DiceSymbol.Magic,
      DiceSymbol.Magic,
      DiceSymbol.Magic,
      DiceSymbol.Gold,
      DiceSymbol.Magic,
    ])
  }
}
