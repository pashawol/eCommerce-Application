<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from '@layouts/Header/HeaderApp.vue'
  import Toast from 'primevue/toast'
  import { useGlobalStore } from './store/GlobalStore'
  import { onMounted } from 'vue'

  const globalStore = useGlobalStore()

  onMounted(async () => {
    await globalStore.getToken()
    globalStore.checkAuth()
    if (globalStore.isAuth) await globalStore.getUserData()
  })
</script>

<template>
  <div class="main-wrapper">
    <Header />
    <Toast />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>

  <!-- <RouterView /> -->
</template>

<style lang="scss">
  @layer normalize, primevue;
  @import '@/assets/scss/_common.scss';
  @import 'normalize.css' layer(normalize-reset);
  @import url('primeicons/primeicons.css');
  @import url('primeflex/primeflex.scss');
  @import url('assets/scss/main.scss');
</style>
