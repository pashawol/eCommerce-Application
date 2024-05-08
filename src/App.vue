<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from '@layouts/Header/HeaderApp.vue'
  import { ref } from 'vue'

  // const pagesWithOutHeader = ['404']

  const params = ref({
    menuItems: [
      {
        label: 'about',
        route: '/about'
      },
      {
        label: 'catalog',
        route: '/catalog'
      },
      {
        label: 'user-profile',
        route: '/user-profile'
      },
      {
        label: 'basket',
        route: '/basket'
      },
      {
        label: '404',
        route: '/404'
      },
      {
        label: 'product',
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
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
