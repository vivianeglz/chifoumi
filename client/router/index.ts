import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@client/views/HomeView.vue')
    },
    {
      path: '/room',
      redirect: () => {
        return { name: 'home' }
      }
    },
    {
      path: '/room/:id',
      name: 'room',
      component: () => import('@client/views/RoomView.vue')
    }
  ]
})

export default router
