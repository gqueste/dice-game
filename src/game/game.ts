import { allEvents } from './card/event/event.catalog'
import type { Event } from './card/event/event.interface'
import { Age } from './game.interface'
import { Player } from './player'

export class Game {
  currentAge: Age
  library: Event[]
  players: Player[]
  river: Event[]

  constructor() {
    this.currentAge = Age.First
    this.library = allEvents
    this.players = [new Player('player0', 'Joueur 1')]
    this.river = []
    for (let i = 0; i < 5; i++) {
      this.river.push(this.drawFromLibrary())
    }
  }

  drawFromLibrary(): Event {
    if (this.library.length <= 0) {
      throw new Error('no more card in library')
    }
    const randomValue = Math.floor(Math.random() * this.library.length)
    const removed = this.library.splice(randomValue, 1)
    return removed[0]
  }
}
