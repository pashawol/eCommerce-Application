<template>
  <div class="basket container">
    <div class="card">
      <DataTable v-if="myCart?.lineItems" :value="myCart?.lineItems" tableStyle="min-width: 50rem">
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <span class="text-xl text-900 font-bold">My Cart</span>
            <Button @click="submit" severity="warning" outlined label="Clear My Cart" />
          </div>
        </template>
        <Column header="" style="width: 8rem">
          <template #body="slotProps">
            <div class="img-wrap">
              <img
                class="block xl:block mx-auto rounded w-full"
                :src="slotProps.data.variant.images[0].url"
                :alt="slotProps.data.name['en-US']"
              />
            </div>
          </template>
        </Column>
        <Column header="Name">
          <template #body="slotProps">
            <div class="text-lg font-medium">
              {{ slotProps.data.name['en-US'] }}
            </div>
          </template>
        </Column>
        <Column header="Individual price">
          <template #body="slotProps">
            $ {{ (slotProps.data.price.value.centAmount / 100).toFixed(2) }}
          </template>
        </Column>

        <Column header="Quantity">
          <template #body="slotProps">
            {{ slotProps.data.quantity }}
          </template>
        </Column>

        <Column header="Total Price">
          <template #body="slotProps">
            $ {{ (slotProps.data.totalPrice.centAmount / 100).toFixed(2) }}
          </template>
        </Column>
        <Column header=" ">
          <template #body="slotProps">
            <ButtonRemoveFromCart label=" " :productData="slotProps.data.variant" />
          </template>
        </Column>

        <template #footer>
          <div class="text-right">
            <div>
              In total there are
              <strong class="text-lg font-medium">{{ myCart?.lineItems.length || 0 }}</strong>
              products.
            </div>
            Total price:
            <strong class="text-lg font-medium"
              >$ {{ ((myCart?.totalPrice.centAmount || 0) / 100).toFixed(2) }}</strong
            >.
          </div>
        </template>
      </DataTable>
      <div v-else class="text-center empty-cart">
        <div class="text-center text-2xl">🛍️ Your cart is empty (:</div>
        <RouterLink to="/catalog">
          <Button label="🚀 Go to the product page" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import ButtonRemoveFromCart from '../components/ButtonRemoveFromCart.vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column' // optional

  import { useCartStore } from '../store/CartStore'

  import { storeToRefs } from 'pinia'

  const cartStore = useCartStore()
  const { myCart } = storeToRefs(cartStore)

  import { useToast } from 'primevue/usetoast'
  const toast = useToast()

  const submit = () => {
    cartStore.removeCart().then(() => {
      toast.add({
        ...cartStore.toast,
        life: 2000
      })
    })
  }
</script>

<style scoped>
  .basket {
    padding-top: 2rem;
  }
  .col-lg-4 {
    width: calc(100% / 12 * 4);
  }

  .img-wrap {
    width: 6rem;
    aspect-ratio: 1;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      object-position: top;
    }
  }
  .empty-cart {
    text-align: center;
    padding-block: 2rem;
    .p-button {
      margin-top: 1rem;
    }
  }
</style>
