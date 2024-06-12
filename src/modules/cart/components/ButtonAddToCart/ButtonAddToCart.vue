<template>
  <Button label="Add to Cart" severity="success" icon="pi pi-cart-plus" @click="addToCart" />
</template>

<script setup lang="ts">
  import Button from 'primevue/button'
  const addToCart = () => {
    console.log('Add to cart')
  }
</script>

<style scoped>
  /* Add your component-specific styles here */
</style>
