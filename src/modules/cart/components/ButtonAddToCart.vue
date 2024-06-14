<template>
  <div class="btn-wrap">
    <Skeleton
      class="skeleton-btn"
      v-if="loadingAddLineItem && cartStore.currentProduct === props.productData.sku"
      height="2.75rem"
    ></Skeleton>
    <Button
      :label="
        myCart && myCart.lineItems.some((item) => item.variant.sku === props.productData.sku)
          ? 'Already in cart'
          : 'Add to Cart'
      "
      severity="success"
      icon="pi pi-cart-plus"
      :disabled="
        myCart && myCart.lineItems.some((item) => item.variant.sku === props.productData.sku)
          ? true
          : false
      "
      @click="submit"
      v-else
    >
    </Button>
  </div>
</template>

<script setup lang="ts">
  import Skeleton from 'primevue/skeleton'
  import Button from 'primevue/button'
  import { useCartStore } from '@/modules/cart/store/CartStore'
  const cartStore = useCartStore()
  const { loadingAddLineItem, myCart } = storeToRefs(cartStore)
  import type { productDataInterface } from '@modules/cart/interface'
  import { storeToRefs } from 'pinia'

  import { useToast } from 'primevue/usetoast'
  const toast = useToast()

  const props = defineProps<{
    productData: productDataInterface
  }>()

  const submit = () => {
    cartStore.addLineItem(props.productData).then(() => {
      if (cartStore.currentProduct !== null && cartStore.currentProduct === props.productData.sku) {
        toast.add({
          ...cartStore.toast,
          life: 2000
        })
      }
    })
  }
</script>

<style scoped>
  .skeleton-btn {
    background-color: var(--additional-green-84);
  }

  /* Add your component-specific styles here */
</style>
