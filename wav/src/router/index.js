import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import AudioVisualizer from '../views/AudioVisualizer.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/visualizer',
      name: 'AudioVisualizer',
      component: AudioVisualizer,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
