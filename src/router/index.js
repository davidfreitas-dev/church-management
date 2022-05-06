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
    component: () => import('../views/ancient/AncientPage.vue')
  },
  {
    path: '/preachers-timeline',
    name: 'preachers-timeline',
    component: () => import('../views/ancient/PreachersTimeLine.vue')
  },
  {
    path: '/preachers-list',
    name: 'preachers-list',
    component: () => import('../views/ancient/PreachersList.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/music/MusicPage.vue')
  },
  {
    path: '/singers-timeline',
    name: 'singers-timeline',
    component: () => import('../views/music/SingersTimeLine.vue')
  },
  {
    path: '/singers-list',
    name: 'singers-list',
    component: () => import('../views/music/SingersList.vue')
  },
  {
    path: '/reception',
    name: 'Reception',
    component: () => import('../views/reception/ReceptionPage.vue')
  },
  {
    path: '/receptionists-timeline',
    name: 'receptionists-timeline',
    component: () => import('../views/reception/ReceptionistsTimeLine.vue')
  },
  {
    path: '/visitors-list',
    name: 'visitors-list',
    component: () => import('../views/reception/VisitorsList.vue')
  },
  {
    path: '/media',
    name: 'Media',
    component: () => import('../views/media/MediaPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
