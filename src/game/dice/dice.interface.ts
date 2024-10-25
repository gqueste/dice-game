export interface Dice {
  id: string
  sides: [DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol, DiceSymbol]
}

export enum DiceSymbol {
  Blank = 'blank',

  Attack = 'attack',
  Gold = 'gold',
  Magic = 'magic',
}
