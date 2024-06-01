<template>
  <div class="sUserProfileView">
    <div class="container">
      <h1 class="sUserProfileView__title">Your profile info</h1>
      <div class="row">
        <div class="col">
          <div class="sUserProfileView__wrap">
            <span>Name, Surname, LastName</span>
            {{ globalStore.userData.firstName }} {{ globalStore.userData.middleName }}
            {{ globalStore.userData.lastName }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Birthday</span>
            {{ globalStore.userData.dateOfBirth }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Email</span>
            {{ globalStore.userData.email }}
          </div>
        </div>

        <div class="col">
          <div class="sUserProfileView__addresses">
            <div
              class="sUserProfileView__address-wrap"
              v-for="(address, index) in globalStore.userData.addresses"
              :key="address.id"
            >
              <h3>
                {{ addressTitles[index] }}
                <Badge v-if="address.id && checkDefaultAddress(index)" value="Default" />
              </h3>
              <div class="sUserProfileView__wrap">
                <span>Country</span>
                {{ address.country }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>City</span>
                {{ address.city }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>Street name</span>
                {{ address.streetName }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>Postal code</span>
                {{ address.postalCode }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container">
      {{ globalStore.userData }}
    </div> -->
  </div>
</template>

<style lang="scss">
  @import url('../scss/sUserProfileView.scss');
</style>

<script setup lang="ts">
  import { useGlobalStore } from '@/store/GlobalStore'
  import Badge from 'primevue/badge'
  import { onMounted, ref } from 'vue'

  const globalStore = useGlobalStore()
  const addressTitles = ref<string[]>(['Shipping address', 'Billing address'])

  function checkDefaultAddress(index: number): boolean {
    const defaultShippingAddressId: string | undefined =
      globalStore.userData.defaultShippingAddressId
    const defaultBillindAddressId: string | undefined = globalStore.userData.defaultBillingAddressId

    if (
      index === 0 &&
      defaultShippingAddressId &&
      globalStore.userData.shippingAddressIds?.includes(defaultShippingAddressId)
    ) {
      return true
    }

    if (
      index === 1 &&
      defaultBillindAddressId &&
      globalStore.userData.billingAddressIds?.includes(defaultBillindAddressId)
    ) {
      return true
    }

    return false
  }
</script>
