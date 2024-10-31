import { createRouter, createWebHistory } from 'vue-router'
import { homeRoute } from './routers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@core/views/NotFound/404.vue'),
    },
    {
      path: '/login/:type?',
      name: 'Login',
      component: () => import('@core/views/Login/Index.vue'),
    },
    homeRoute,
  ],
})

export default router
