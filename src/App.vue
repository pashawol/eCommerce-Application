<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from '@layouts/Header/HeaderApp.vue'
  import { ref } from 'vue'

  // const pagesWithOutHeader = ['404']

  const params = ref({
    menuItems: [
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
        label: '404',
        route: '/404'
      },
      {
        label: 'Product',
        route: '/product'
      }
    ]
  })
</script>

<template>
  <div class="main-wrapper">
    <Header v-bind="params" />
    <router-view v-slot="{ Component }">
      <component :is="Component" v-bind="params" />
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
