<template>
  <Skeleton
    class="skeleton-btn"
    v-if="loadingAddLineItem && cartStore.currentProduct === props.productData.sku"
    height="2.75rem"
  ></Skeleton>
  <Button
    label="Add to Cart"
    severity="success"
    icon="pi pi-cart-plus"
    @click="cartStore.addLineItem(productData)"
    v-else
  />
</template>

<script setup lang="ts">
  import Skeleton from 'primevue/skeleton'
  import Button from 'primevue/button'
  import { useCartStore } from '@/modules/cart/store/CartStore'
  const cartStore = useCartStore()
  const { loadingAddLineItem } = storeToRefs(cartStore)
  import type { productDataInterface } from '@modules/cart/interface'
  import { storeToRefs } from 'pinia'
  import { watchEffect } from 'vue'

  import { useToast } from 'primevue/usetoast'
  const toast = useToast()

  const props = defineProps<{
    productData: productDataInterface
  }>()

  watchEffect(() => {
    if (
      cartStore.currentProduct === props.productData.sku &&
      cartStore.toast.severity &&
      cartStore.toast.summary &&
      cartStore.toast.detail
    ) {
      toast.add({
        ...cartStore.toast,
        life: 2000
      })
    }
  })
</script>

<style scoped>
  .skeleton-btn {
    background-color: var(--additional-green-84);
  }
  /* Add your component-specific styles here */
</style>
