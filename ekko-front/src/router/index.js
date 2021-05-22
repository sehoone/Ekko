import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/question',
    name: 'Question',
    component: () => import('../views/Question.vue'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/join',
    name: 'Join',
    component: () => import('../views/Join.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
