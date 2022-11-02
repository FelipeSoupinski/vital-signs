import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjectListView from '../views/ProjectListView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'projects',
    component: ProjectListView
  },
  {
    path: '/project-register',
    name: 'project-register',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectRegisterView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectListView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
