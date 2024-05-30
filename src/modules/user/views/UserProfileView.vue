<template>
  <div class="user-profile">
    <div class="container">
      {{ globalStore.userData }}
    </div>
  </div>
</template>

<style></style>

<script setup lang="ts">
  import { useGlobalStore } from '@/store/GlobalStore'

  const globalStore = useGlobalStore()
</script>
