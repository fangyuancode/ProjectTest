import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/exportExcel',
      name: 'exportExcel',
      component: () => import('../views/02-exportExcel.vue')
    },
    {
      path: '/printPdf',
      name: 'printPdf',
      component: () => import('../views/01-printPdf.vue')
    },
    {
      path: '/testDb',
      name: 'testDb',
      component: () => import('../views/03-testDb.vue')
    },
    {
      path: '/joint',
      name: 'joint',
      component: () => import('../views/05-joint.vue')
    }
    // 03-testDb.vue
  ]
})

export default router
