<template>
  <div class="basket container">
    <h1>This is a basket</h1>
    <div class="row">
      <div class="col">
        <div class="card">
          <DataTable :value="myCart?.lineItems" tableStyle="min-width: 50rem">
            <template #header>
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">My Cart</span>
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
                <div class="text-lg font-medium mt-2">
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

            <template #footer>
              <div class="text-right">
                <div>
                  In total there are
                  <strong class="text-lg font-medium">{{ myCart?.lineItems.length || 0 }}</strong>
                  products.
                </div>
                Total price:
                <strong class="text-lg font-medium"
                  >$ {{ (myCart?.totalPrice.centAmount || 0 / 100).toFixed(2) }}</strong
                >.
              </div>
            </template>
          </DataTable>
        </div>
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column' // optional

  import { useCartStore } from '../store/CartStore'
  const cartStore = useCartStore()
  const { myCart } = cartStore
</script>

<style scoped>
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
  .basket {
    --body-bg: var(--dark-color-5);
  }
</style>
