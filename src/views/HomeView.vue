<script setup lang="ts">
  import { useGlobalStore } from '@/store/GlobalStore'

  const globalStore = useGlobalStore()
</script>

<template>
  <main class="container">
    <h1>HOME PAGE</h1>
    {{ globalStore.token }}
  </main>
</template>
