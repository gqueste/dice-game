import { defaultDice } from './dice/dice.catalog'
import { rollDice } from './dice/dice.utils'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    ${rollDice(defaultDice)}
    ${rollDice(defaultDice)}
    ${rollDice(defaultDice)}
    ${rollDice(defaultDice)}
    ${rollDice(defaultDice)}
    ${rollDice(defaultDice)}
    ${rollDice(defaultDice)}
  </div>
`
