<script setup lang="ts">
  import { useGlobalStore } from '@/store/GlobalStore'

  const globalStore = useGlobalStore()
</script>

<template>
  <main>
    <h1>HOME PAGE</h1>
    {{ globalStore.token }}
  </main>
</template>
