<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from '@layouts/Header/HeaderApp.vue'
  import { ref } from 'vue'
  import Toast from 'primevue/toast'

  // const pagesWithOutHeader = ['404']
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
