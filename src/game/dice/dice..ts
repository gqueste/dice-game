export class Dice {
  id: string
  sides: [DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol]
  currentSideRolled: null | DiceSymbol

  constructor(
    id: string,
    sides: [DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol]
  ) {
    this.id = id
    this.sides = sides
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
