import { allEvents } from './card/event/event.catalog'
import type { Event } from './card/event/event.interface'
import { Age } from './game.interface'
import { Player } from './player'

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
}
