import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/01-EchartsTree.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/02-RemerPassworld.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/03-QrCode.vue')
  },
  {
    path: '/getheight',
    name: 'getheight',
    component: () => import('../views/04-GetHeight.vue')
  },
  {
    path: '/ExportWord',
    name: 'ExportWord',
    component: () => import('../views/05-ExportWord.vue')
  },
  {
    path: '/getContent',
    name: 'getContent',
    component: () => import('../views/06-getContent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
