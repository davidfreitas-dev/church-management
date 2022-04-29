import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/design-system',
    name: 'design-system',
    component: () => import('../views/DesignSystem.vue')
  },
  {
    path: '/ancient',
    name: 'ancient',
    component: () => import('../views/AncientPage.vue')
  },
  {
    path: '/preachers-timeline',
    name: 'preachers-timeline',
    component: () => import('../views/PreachersTimeLine.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
