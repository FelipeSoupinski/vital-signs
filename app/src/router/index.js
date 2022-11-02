import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjectRegisterView from '../views/ProjectRegisterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProjectRegisterView
  },
  {
    path: '/project-register',
    name: 'home',
    component: ProjectRegisterView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router