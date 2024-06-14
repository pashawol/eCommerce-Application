<script setup lang="ts">
  import Menubar from 'primevue/menubar'
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGlobalStore } from '@/store/GlobalStore'
  import Badge from 'primevue/badge'

  const globalStore = useGlobalStore()

  import { useCartStore } from '@/modules/cart/store/CartStore'
  import { storeToRefs } from 'pinia'
  const cartStore = useCartStore()
  const { myCart } = storeToRefs(cartStore)
  const router = useRouter()
  const menuItems = [
    {
      label: 'Home',
      route: '/'
    },
    {
      label: 'About',
      route: '/about'
    },
    {
      label: 'Catalog',
      route: '/catalog'
    },
    // {
    //   label: 'User-profile',
    //   route: '/user-profile'
    // },
    {
      label: 'Basket',
      route: '/basket',
      icon: 'pi pi-shopping-cart',
      badge: true
    }
    // {
    //   label: 'Product',
    //   route: '/product'
    // }
  ]

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('customerID')
    router.push('/login')
    globalStore.checkAuth()
    globalStore.resetUserData()
  }

  onMounted(() => {
    globalStore.checkAuth()
  })
</script>

<template>
  <header class="header">
    <Menubar :model="menuItems" breakpoint="1200px">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
            <i v-if="item.icon" :class="item.icon" style="margin-left: 0.5em"></i>
            <Badge
              v-if="item.badge"
              :value="myCart?.totalLineItemQuantity"
              severity="info"
              style="margin-left: 0.5em"
            />
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span>{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div v-if="!globalStore.isAuth" class="flex align-items-center gap-2">
          <router-link to="/login">
            <Button outlined>Log in</Button>
          </router-link>

          <router-link to="/registration">
            <Button>Sign Up </Button>
          </router-link>
        </div>
        <div v-else class="flex align-items-center gap-2">
          <router-link to="/user-profile">
            <Button class="profile-btn">
              <Icon name="user" />
            </Button>
          </router-link>
          <Button @click="logout" severity="danger">Log Out </Button>
        </div>
      </template>
    </Menubar>
  </header>
</template>

<style lang="scss">
  @import '@/assets/scss/_common.scss';
  @import './Header.scss';
</style>
