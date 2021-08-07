import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Course1 from '../views/Course1.vue'
import Course2 from '../views/Course2.vue'
import Welcome from '../views/Welcome.vue'
import Views from '../views/Views.vue'
import Friends from '../views/Friends.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/welcome',
    component: Dashboard,
    children: [
      {
        name: 'Course1',
        path: '/course1',
        component: Course1
      },
      {
        name: 'Course2',
        path: '/course2',
        component: Course2
      },
      {
        name: 'Welcome',
        path: '/welcome',
        component: Welcome
      },
      {
        name: 'Views',
        path: '/views',
        component: Views
      },
      {
        name: 'Friends',
        path: '/friends',
        component: Friends
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
