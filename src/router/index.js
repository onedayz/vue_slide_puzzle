import { createRouter, createWebHashHistory } from 'vue-router'
import Puzzle from '../views/Puzzle.vue'

const routes = [
  {
    path: '/',
    name: 'Puzzle',
    component: Puzzle
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
