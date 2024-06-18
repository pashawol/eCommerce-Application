<template>
  <div class="modifyQuantity">
    <Button size="small" icon="pi pi-minus" @click="submit(-1)" />
    <span class="modifyQuantity__result">{{ props.quantity }}</span>
    <Button size="small" icon="pi pi-plus" @click="submit(+1)" />
  </div>
</template>

<script setup lang="ts">
  import Button from 'primevue/button'

  import { useCartStore } from '../store/CartStore'
  const cartStore = useCartStore()

  import { useToast } from 'primevue/usetoast'
  const toast = useToast()
  import type { productDataInterface } from '@modules/cart/interface'

  const props = defineProps<{
    quantity: number
    productData: productDataInterface
  }>()

  const submit = (quantity: number) => {
    cartStore.changeLineItemQuantity(props.productData.sku, props.quantity + quantity)

    console.log(props.productData.sku, props.quantity)
    // .then(() => {
    //   toast.add({
    //     ...cartStore.toast,
    //     life: 2000
    //   })
    // })
  }
</script>

<style scoped lang="scss">
  .modifyQuantity {
    align-items: center;
    display: flex;
    &__result {
      display: block;
      min-width: 3rem;
      text-align: center;
      font-weight: bold;
      font-size: 1.25rem;
    }
    button {
      padding: 0;
      width: 2.4rem;
      height: 2.4rem;
    }
  }
  /* Your component's CSS styles go here */
</style>
