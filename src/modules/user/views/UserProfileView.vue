<template>
  <div class="sUserProfileView">
    <div class="container">
      <h1 class="sUserProfileView__title">Your profile info</h1>
      <div class="row">
        <div class="col">
          <div class="sUserProfileView__wrap">
            <span>Name, Surname, LastName</span>
            {{ userData.firstName }} {{ userData.middleName }}
            {{ userData.lastName }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Birthday</span>
            {{ userData.dateOfBirth }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Email</span>
            {{ userData.email }}
          </div>
        </div>

        <div class="col">
          <div class="sUserProfileView__addresses">
            <div
              class="sUserProfileView__address-wrap"
              v-for="(address, index) in userData.addresses"
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
      {{ userData }}
    </div> -->
  </div>
</template>

<style lang="scss">
  @import url('../scss/sUserProfileView.scss');
</style>

<script setup lang="ts">
  import { useGlobalStore } from '@/store/GlobalStore'
  import { storeToRefs } from 'pinia'
  import Badge from 'primevue/badge'
  import { onMounted, ref } from 'vue'

  const globalStore = useGlobalStore()
  const { userData } = storeToRefs(globalStore)
  const addressTitles = ref<string[]>(['Shipping address', 'Billing address'])

  function checkDefaultAddress(index: number): boolean {
    const defaultShippingAddressId: string | undefined = userData.value.defaultShippingAddressId
    const defaultBillindAddressId: string | undefined = userData.value.defaultBillingAddressId

    if (
      index === 0 &&
      defaultShippingAddressId &&
      userData.value.shippingAddressIds?.includes(defaultShippingAddressId)
    ) {
      return true
    }

    if (
      index === 1 &&
      defaultBillindAddressId &&
      userData.value.billingAddressIds?.includes(defaultBillindAddressId)
    ) {
      return true
    }

    return false
  }
</script>
