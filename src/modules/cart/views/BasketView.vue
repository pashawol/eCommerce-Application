<template>
  <div class="basket container">
    <div class="card">
      <template v-if="myCart?.lineItems.length">
        <DataTable :value="myCart?.lineItems" tableStyle="min-width: 50rem">
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
              <!-- $ {{ (slotProps.data.price.value.centAmount / 100).toFixed(2) }} -->

              <div class="prices-wrap">
                <Badge
                  v-if="slotProps.data.price.discounted"
                  :value="'$' + (slotProps.data.price.discounted.value.centAmount / 100).toFixed(2)"
                >
                </Badge>
                <Badge
                  :class="{
                    'original-price': slotProps.data.price.discounted
                  }"
                  :value="'$' + (slotProps.data.price.value.centAmount / 100).toFixed(2)"
                >
                </Badge>
              </div>
            </template>
          </Column>

          <Column header="Quantity">
            <template #body="slotProps">
              <ModifyQuantity
                :quantity="slotProps.data.quantity"
                :productData="slotProps.data.variant"
              />
            </template>
          </Column>

          <Column header="Total Price">
            <template #body="slotProps">
              <span>$ {{ (slotProps.data.totalPrice.centAmount / 100).toFixed(2) }}</span>
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
                <strong class="text-xl font-bold">{{ cartStore.totalItems || 0 }}</strong>
                products.
              </div>
              <div>
                Total price:
                <strong
                  :class="myCart.discountCodes.length > 0 ? 'old-price' : 'text-xl font-bold'"
                >
                  💲{{ cartStore.totalPrice }}</strong
                >
                <strong class="text-xl font-bold" v-if="myCart.discountCodes.length > 0">
                  💲{{ cartStore.totalPriceWithDiscount }}</strong
                >.
              </div>
            </div>
            <form @submit.prevent="applyPromo" class="promo-form">
              <InputGroup>
                <InputText v-model="promoValue" placeholder="Enter your discount code" />
                <Button type="submit" label="Apply" />
              </InputGroup>
              <!-- <Button
                @click="cartStore.removeDiscountCode"
                severity="warning"
                outlined
                label="Clear My Cart"
              /> -->
            </form>
          </template>
        </DataTable>
      </template>
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
  import { ref } from 'vue'
  import InputGroup from 'primevue/inputgroup'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import ModifyQuantity from '../components/ModifyQuantity.vue'
  import ButtonRemoveFromCart from '../components/ButtonRemoveFromCart.vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column' // optional
  import Badge from 'primevue/badge'

  import { useCartStore } from '../store/CartStore'

  import { storeToRefs } from 'pinia'

  const cartStore = useCartStore()
  const { myCart } = storeToRefs(cartStore)

  import { useToast } from 'primevue/usetoast'
  const toast = useToast()

  const promoValue = ref('')

  const submit = () => {
    cartStore.removeCart().then(() => {
      toast.add({
        ...cartStore.toast,
        life: 2000
      })
    })
  }

  const applyPromo = () => {
    cartStore.getDiscountCodeByKey(promoValue.value)
    cartStore.addDiscountCode(promoValue.value).then(() => {
      toast.add({
        ...cartStore.toast,
        life: 2000
      })
    })
  }
</script>

<style scoped lang="scss">
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
  .original-price {
    text-decoration: line-through;
    background: transparent;
    color: var(--gray-400);
  }
  .promo-form {
    margin-left: auto;
    max-width: 30rem;
    margin-block: 1rem;
    input {
      border-color: var(--color-background);
    }
  }
  .old-price {
    text-decoration: line-through;
  }
</style>
