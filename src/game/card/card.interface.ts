export enum EffectType {
  AddAttack = 'addAttack',
  AddGold = 'addGold',
  AddMagic = 'addMagic',
  RemoveAttack = 'removeAttack',
  RemoveGold = 'removeGold',
  RemoveMagic = 'removeMagic',
}

export interface CardEffect {
  type: EffectType
  value: number
}
