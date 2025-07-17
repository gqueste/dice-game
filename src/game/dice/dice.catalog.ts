import { Dice, DiceType } from './dice.'
import { v4 as uuid } from 'uuid'

export class DefaultDice extends Dice {
  constructor() {
    super(uuid(), DiceType.Default)
  }
}

export class AttackDice extends Dice {
  constructor() {
    super(uuid(), DiceType.Attack)
  }
}

export class AttackerDice extends Dice {
  constructor() {
    super(uuid(), DiceType.Attacker)
  }
}

export class GoldDice extends Dice {
  constructor() {
    super(uuid(), DiceType.Gold)
  }
}

export class GolderDice extends Dice {
  constructor() {
    super(uuid(), DiceType.Golder)
  }
}

export class MagicDice extends Dice {
  constructor() {
    super(uuid(), DiceType.Magic)
  }
}

export class MagicerDice extends Dice {
  constructor() {
    super(uuid(), DiceType.Magicer)
  }
}
