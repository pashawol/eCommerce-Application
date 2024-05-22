import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FetchView from '../views/FetchView.vue'
import Authenticated from '@/services/authentificated'
import { ref } from 'vue'

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
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/CatalogView.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('../views/UserProfileView.vue'),
      children: [] // Add an empty array for children
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
      path: '/404',
      name: '404',
      component: () => import('../views/404View.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/example',
      name: 'example',
      component: FetchView
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404View.vue')
    }
  ]
})
router.beforeEach((to) => {
  const isAuth = Authenticated.get()

  if (isAuth) {
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
