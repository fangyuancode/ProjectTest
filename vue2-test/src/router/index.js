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
  },
  // 07-wangEditor
  {
    path: '/wangEditor',
    name: 'wangEditor',
    component: () => import('../views/07-wangEditor.vue')
  },
  {
    path: '/NewPage',
    name: 'NewPage',
    component: () => import('../views/09-NewPage.vue')
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('../views/test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
