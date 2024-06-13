<template>
  <Button
    label="Add to Cart"
    severity="success"
    icon="pi pi-cart-plus"
    @click="cartStore.addLineItem(productData)"
  />
</template>

<script setup lang="ts">
  import Button from 'primevue/button'
  import { useCartStore } from '@/modules/cart/store/CartStore'
  const cartStore = useCartStore()
  import type { productDataInterface } from '@modules/cart/interface'

  const props = defineProps<{
    productData: productDataInterface
  }>()
</script>

<style scoped>
  /* Add your component-specific styles here */
</style>
