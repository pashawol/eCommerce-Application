<template>
  <div class="btn-wrap">
    <Skeleton
      class="skeleton-btn"
      v-if="loadingAddLineItem && cartStore.currentProduct === props.productData.sku"
      height="2.75rem"
    ></Skeleton>
    <Button
      label="Remove from Cart"
      severity="danger"
      outlined
      :disabled="
        myCart && myCart.lineItems.some((item) => item.variant.sku === props.productData.sku)
          ? false
          : true
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
    cartStore.removeLineItem(props.productData.sku).then(() => {
      toast.add({
        ...cartStore.toast,
        life: 2000
      })
    })
  }
</script>

<style scoped>
  .skeleton-btn {
    background-color: var(--additional-red-84);
  }

  /* Add your component-specific styles here */
</style>
