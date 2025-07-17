export class Dice {
  id: string
  type: DiceType
  sides: [DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol]
  currentSideRolled: null | DiceSymbol

  constructor(id: string, type: DiceType) {
    this.id = id
    this.type = type
    this.sides = DiceConfiguration[type]
    this.currentSideRolled = null
  }

  roll() {
    const randomValue = Math.floor(Math.random() * 6)
    this.currentSideRolled = this.sides[randomValue]
  }
}

export enum DiceSymbol {
  Blank = 'blank',
  Attack = 'attack',
  Gold = 'gold',
  Magic = 'magic',
}

export interface UsedDice {
  diceId: string
  cardId: string
  location: 'board' | 'river'
}

export enum DiceType {
  Default = 'default',
  Attack = 'attack',
  Attacker = 'attacker',
  Magic = 'magic',
  Magicer = 'magicer',
  Gold = 'gold',
  Golder = 'golder',
}

export const DiceConfiguration: {
  [key in DiceType]: [DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol]
} = {
  [DiceType.Default]: [
    DiceSymbol.Blank,
    DiceSymbol.Blank,
    DiceSymbol.Blank,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
  [DiceType.Attack]: [
    DiceSymbol.Blank,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
  [DiceType.Attacker]: [
    DiceSymbol.Blank,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Attack,
    DiceSymbol.Magic,
  ],
  [DiceType.Gold]: [
    DiceSymbol.Blank,
    DiceSymbol.Gold,
    DiceSymbol.Gold,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
  [DiceType.Golder]: [
    DiceSymbol.Blank,
    DiceSymbol.Gold,
    DiceSymbol.Gold,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
  [DiceType.Magic]: [
    DiceSymbol.Blank,
    DiceSymbol.Magic,
    DiceSymbol.Magic,
    DiceSymbol.Attack,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
  [DiceType.Magicer]: [
    DiceSymbol.Blank,
    DiceSymbol.Magic,
    DiceSymbol.Magic,
    DiceSymbol.Magic,
    DiceSymbol.Gold,
    DiceSymbol.Magic,
  ],
}
