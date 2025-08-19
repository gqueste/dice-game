import { EffectType } from './card/card'
import type { Character } from './card/character/character'
import { allEvents } from './card/event/event.catalog'
import type { Event } from './card/event/event.interface'
import { DiceSymbol } from './dice/dice.'
import { Age } from './game.interface'
import { Player } from './player'
import { v4 as uuid } from 'uuid'

export class Game {
  currentAge: Age
  library: Event[]
  players: Player[]
  river: Event[]
  currentPlayerId: string

  constructor() {
    const player1 = new Player('player0', 'Joueur 1')
    this.currentAge = Age.First
    this.library = [...allEvents]
    this.players = [player1]
    this.river = []
    for (let i = 0; i < 5; i++) {
      this.river.push(this.drawFromLibrary())
    }
    this.currentPlayerId = player1.id
  }

  drawFromLibrary(): Event {
    if (this.library.length <= 0) {
      throw new Error('no more card in library')
    }
    const randomValue = Math.floor(Math.random() * this.library.length)
    const removed = this.library.splice(randomValue, 1)
    return removed[0]
  }

  getCurrentPlayer(): Player | undefined {
    return this.players.find((player) => player.id === this.currentPlayerId)
  }

  activateCharacterForPlayer(player: Player, character: Character) {
    try {
      player.activateCharacter(character)
      this.resolveCharacterEffect(character, player)
    } catch (err) {
      console.error(err)
    }
  }

  addDiceSymbolForPlayer(diceSymbol: DiceSymbol, player: Player, character: Character) {
    player.rolledSymbols.push({
      id: uuid(),
      symbol: diceSymbol,
      parentCharacter: character.id,
    })
  }

  resolveCharacterEffect(character: Character, caster: Player) {
    const skill = character.getCurrentSkill()
    if (!skill) {
      return
    }
    ;[...Array(skill.effect.value)].forEach(() => {
      switch (skill.effect.type) {
        case EffectType.AddAttack:
          this.addDiceSymbolForPlayer(DiceSymbol.Attack, caster, character)
          break
        case EffectType.AddGold:
          this.addDiceSymbolForPlayer(DiceSymbol.Gold, caster, character)
          break
        case EffectType.AddMagic:
          this.addDiceSymbolForPlayer(DiceSymbol.Magic, caster, character)
          break
        default:
          break
      }
    })
  }
}
