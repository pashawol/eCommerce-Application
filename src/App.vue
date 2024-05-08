<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import HeaderBlock from '@layouts/HeaderBlock/HeaderBlock.vue'
</script>
<template>
  <header>
    <img alt="Vue logo" class="logo" src="/img/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HeaderBlock />
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/catalog">Catalog</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/registration">Registration</RouterLink>
        <RouterLink to="/basket">Basket</RouterLink>
        <RouterLink to="/product">Product</RouterLink>
        <RouterLink to="/user-profile">User profile</RouterLink>
        <RouterLink to="/404">404</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
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
