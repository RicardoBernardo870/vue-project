import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      meta: { title: 'Home', hideHeader: true },
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/dashboard',
      meta: { title: 'Dashboard' },
      name: 'dashboard',
      component: () => import('../pages/DashboardPage.vue'),
    },
    {
      path: '/product/:id',
      meta: { title: 'Product Details' },
      name: 'product-details',
      component: () => import('../pages/ProductDetailsPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: { title: 'Not Found', hideHeader: true },
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],
})

export default router
