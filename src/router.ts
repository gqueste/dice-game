import { createRouter, createWebHistory } from 'vue-router'

import GameView from './pages/GameView.vue'
import CatalogView from './pages/CatalogView.vue'

const routes = [
  { path: '/', component: GameView },
  { path: '/catalog', component: CatalogView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
