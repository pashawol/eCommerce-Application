<template>
  <FormPage v-bind="registrationStore.pageContent">
    <form @submit.prevent="sumbit()" class="mb-3">
      <div class="flex flex-column gap-2 mb-1">
        <label for="username">Email</label>
        <InputText
          id="email"
          v-model="registrationStore.customerDraft.email"
          aria-describedby="email-help"
          @input="registrationStore.validateEmail"
        />
        <small class="p-error" id="email-help">{{ registrationStore.errorsForm.email }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="password">Password</label>
        <Password
          id="password"
          v-model="registrationStore.customerDraft.password"
          aria-describedby="password-help"
          :feedback="false"
          toggleMask
          @input="registrationStore.validatePassword"
        />
        <small class="p-error" id="password-help">{{
          registrationStore.errorsForm.password
        }}</small>
      </div>

      <div class="group-wrapper">
        <div class="flex flex-column gap-2 mb-1">
          <label for="first-name">First Name</label>
          <InputText
            id="first-name"
            v-model="registrationStore.customerDraft.firstName"
            aria-describedby="first-name-help"
            @input="registrationStore.validateFirstName"
          />
          <small class="p-error" id="first-name-help">{{
            registrationStore.errorsForm.firstName
          }}</small>
        </div>
        <div class="flex flex-column gap-2 mb-1">
          <label for="last-name">Last Name</label>
          <InputText
            id="last-name"
            v-model="registrationStore.customerDraft.lastName"
            aria-describedby="last-name-help"
            @input="registrationStore.validateLastName"
          />
          <small class="p-error" id="last-name-help">{{
            registrationStore.errorsForm.lastName
          }}</small>
        </div>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="date">Date of Birth</label>
        <Calendar
          id="date"
          v-model="registrationStore.mainDateOfBirth"
          :dateFormat="dateFormat"
          :manualInput="false"
          @date-select="registrationStore.validateDOB"
          :maxDate="new Date()"
        />
        <small class="p-error" id="date-help">{{ registrationStore.errorsForm.dateOfBirth }}</small>
      </div>

      <div class="h6 text-center">Shipping address</div>
      <div class="flex flex-column gap-2 mb-1">
        <label for="country">Country</label>
        <Dropdown
          id="country"
          v-model="registrationStore.mainShippingDropdown"
          aria-describedby="country-help"
          :options="registrationStore.countries"
          optionLabel="name"
          @change="registrationStore.validatePostalCodeShipping"
        />
        <small class="p-error" id="country-help">{{
          registrationStore.errorsForm.addresses[0].country
        }}</small>
      </div>
      <div class="flex flex-column gap-2">
        <label for="postal-code-shipping">Postal Code</label>
        <InputText
          id="postal-code-shipping"
          v-model="registrationStore.customerDraft.addresses[0].postalCode"
          aria-describedby="postal-code-help"
          @input="registrationStore.validatePostalCodeShipping"
        />
        <small class="p-error" id="postal-code-help">{{
          registrationStore.errorsForm.addresses[0].postalCode
        }}</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="city-shipping">City</label>
        <InputText
          id="city-shipping"
          v-model="registrationStore.customerDraft.addresses[0].city"
          aria-describedby="city-help"
          @input="registrationStore.validateCityShipping"
        />
        <small class="p-error" id="city-help">{{
          registrationStore.errorsForm.addresses[0].city
        }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="street-shipping">Street</label>
        <InputText
          id="street-shipping"
          v-model="registrationStore.customerDraft.addresses[0].streetName"
          aria-describedby="street-help"
          @input="registrationStore.validateStreetShipping"
        />
        <small class="p-error" id="street-help">{{
          registrationStore.errorsForm.addresses[0].streetName
        }}</small>
      </div>
      <div class="flex align-items-center mb-4">
        <Checkbox
          v-model="registrationStore.shippingAddress"
          inputId="shippingAddress"
          name="shipping-address"
          :value="0"
          @change="registrationStore.actionDefaultShippingAddress"
        />
        <label for="shipping-address" class="ml-2"> Set as default shipping address </label>
      </div>
      <div class="h6 text-center">Billing address</div>
      <div class="flex align-items-center mb-1">
        <Checkbox
          v-model="registrationStore.sameAddress"
          inputId="sameAddress"
          name="sameAddress"
          value="compare"
          @change="registrationStore.setSameAddress"
        />
        <label for="sameAddress" class="ml-2"> The same as shipping address </label>
      </div>
      <div class="group-wrapper billing-inputs">
        <div class="flex flex-column gap-2 mb-1">
          <label for="country">Country</label>
          <Dropdown
            id="country"
            v-model="registrationStore.mainBillingDropdown"
            aria-describedby="country-help"
            :options="registrationStore.countries"
            optionLabel="name"
            @change="registrationStore.validatePostalCodeBilling"
            :disabled="registrationStore.sameAddress[0] === 'compare'"
          />
          <small class="p-error" id="country-help">{{
            registrationStore.errorsForm.addresses[1].country
          }}</small>
        </div>
        <div class="flex flex-column gap-2">
          <label for="postal-code">Postal Code</label>
          <InputText
            id="postal-code"
            v-model="registrationStore.customerDraft.addresses[1].postalCode"
            aria-describedby="postal-code-help"
            @input="registrationStore.validatePostalCodeBilling"
            :disabled="registrationStore.sameAddress[0] === 'compare'"
          />
          <small class="p-error" id="postal-code-help">{{
            registrationStore.errorsForm.addresses[1].postalCode
          }}</small>
        </div>

        <div class="flex flex-column gap-2">
          <label for="city">City</label>
          <InputText
            id="city"
            v-model="registrationStore.customerDraft.addresses[1].city"
            aria-describedby="city-help"
            @input="registrationStore.validateCityBilling"
            :disabled="registrationStore.sameAddress[0] === 'compare'"
          />
          <small class="p-error" id="city-help">{{
            registrationStore.errorsForm.addresses[1].city
          }}</small>
        </div>

        <div class="flex flex-column gap-2 mb-1">
          <label for="street">Street</label>
          <InputText
            id="street"
            v-model="registrationStore.customerDraft.addresses[1].streetName"
            aria-describedby="street-help"
            @input="registrationStore.validateStreetBilling"
            :disabled="registrationStore.sameAddress[0] === 'compare'"
          />
          <small class="p-error" id="street-help">{{
            registrationStore.errorsForm.addresses[1].streetName
          }}</small>
        </div>
      </div>
      <div class="flex align-items-center mb-4">
        <Checkbox
          v-model="registrationStore.billingAddress"
          inputId="billingAddress"
          name="billingAddress"
          :value="1"
          @change="registrationStore.actionDefaultBillingAddress"
        />
        <label for="billingAddress" class="ml-2"> Set as default billing address </label>
      </div>
      <div class="mb-4">
        <Button type="submit" :disabled="!registrationStore.isFilledForm()" label="Submit" />
      </div>
    </form>
  </FormPage>
</template>

<script setup lang="ts">
  import { useRegistrationStore } from '../store/RegistrationStore'
  import { useToast } from 'primevue/usetoast'
  import { useRouter } from 'vue-router'
  import { useGlobalStore } from '@/store/GlobalStore'
  import FormPage from '../components/FormPage/FormPage.vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Calendar from 'primevue/calendar'
  import Dropdown from 'primevue/dropdown'
  import Checkbox from 'primevue/checkbox'

  const globalStore = useGlobalStore()
  const registrationStore = useRegistrationStore()
  const toast = useToast()
  const router = useRouter()
  const dateFormat = 'dd-mm-yy'

  const sumbit = () => {
    registrationStore.registration().then(() => {
      toast.add({
        severity: registrationStore.toast.severity,
        summary: registrationStore.toast.summary,
        detail: registrationStore.toast.detail,
        life: 3000
      })

      globalStore.checkAuth()

      if (registrationStore.toast.severity === 'success') {
        router.push('/login')
      }
    })
  }
</script>

<style></style>
