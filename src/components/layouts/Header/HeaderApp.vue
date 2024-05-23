<script setup lang="ts">
  import Menubar from 'primevue/menubar'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGlobalStore } from '@/store/GlobalStrore'

  const globalStore = useGlobalStore()
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
    {
      label: 'User-profile',
      route: '/user-profile'
    },
    {
      label: 'Basket',
      route: '/basket'
    },
    {
      label: 'Product',
      route: '/product'
    }
  ]

  const logout = () => {
    localStorage.removeItem('accessToken')
    router.push('/login')
    globalStore.checkAuth()
  }

  onMounted(() => {
    globalStore.checkAuth()
  })
</script>

// TODO: In future add to logout button functionality what delete acssess token from local storage
<template>
  <header class="header">
    <Menubar :model="menuItems" breakpoint="1200px">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
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
          <Button @click="logout" severity="danger">Log Out </Button>
          <router-link to="/login"> </router-link>
        </div>
      </template>
    </Menubar>
  </header>
</template>

<style lang="scss">
  @import '@/assets/scss/_common.scss';
  @import './Header.scss';
</style>
