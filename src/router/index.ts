import { useGlobalStore } from '@/store/GlobalStore'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/catalog/',
      name: 'catalog',
      component: () => import('../modules/product/views/CatalogView.vue')
    },
    {
      path: '/catalog/:id',
      name: 'product',
      component: () => import('../modules/product/views/ProductView.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('../modules/user/views/UserProfileView.vue')
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../modules/auth/views/RegistrationView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../modules/auth/views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundView',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})
router.beforeEach((to) => {
  const globalStore = useGlobalStore()
  if (globalStore.isAuth) {
    if (to.name === 'login' || to.name === 'registration') {
      return '/'
    }
  } else {
    if (to.name == 'user-profile') {
      return '/login'
    }
  }
})

export default router
