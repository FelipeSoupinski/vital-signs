import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjectListView from '../views/ProjectListView.vue'
import ProjectInfoView from '../views/ProjectInfoView.vue'

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
    component: () => import('../views/ProjectRegisterView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectListView
  },
  {
    path: '/projects/:id',
    name: 'projects-info',
    component: ProjectInfoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
