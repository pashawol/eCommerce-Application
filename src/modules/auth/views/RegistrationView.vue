<template>
  <Toast />
  <FormPage v-bind="params">
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
          @date-select="registrationStore.validateDOB"
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
          :options="countries"
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
          v-model="shippingAddress"
          inputId="shippingAddress"
          name="shipping-address"
          value="Cheese"
        />
        <label for="shipping-address" class="ml-2"> Set as default shipping address </label>
      </div>
      <div class="h6 text-center">Billing address</div>
      <div class="flex align-items-center mb-1">
        <Checkbox v-model="sameAddress" inputId="sameAddress" name="sameAddress" value="Cheese" />
        <label for="sameAddress" class="ml-2"> The same as shipping address </label>
      </div>
      <div class="group-wrapper billing-inputs">
        <div class="flex flex-column gap-2 mb-1">
          <label for="country">Country</label>
          <Dropdown
            id="country"
            v-model="registrationStore.mainBillingDropdown"
            aria-describedby="country-help"
            :options="countries"
            optionLabel="name"
            @change="registrationStore.validatePostalCodeBilling"
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
          />
          <small class="p-error" id="street-help">{{
            registrationStore.errorsForm.addresses[1].streetName
          }}</small>
        </div>
      </div>
      <div class="flex align-items-center mb-4">
        <Checkbox
          v-model="billingAddress"
          inputId="billingAddress"
          name="billingAddress"
          value="Cheese"
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
  import { ref } from 'vue'
  import FormPage from '../components/FormPage/FormPage.vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Calendar from 'primevue/calendar'
  import Dropdown from 'primevue/dropdown'
  import { countries } from '@/components/utils/countryList'
  import Validation from '@/components/utils/validation'
  import type { Country } from '@/components/utils/countryList'
  import Toast from 'primevue/toast'
  import { useToast } from 'primevue/usetoast'

  import Checkbox from 'primevue/checkbox'

  const registrationStore = useRegistrationStore()
  const toast = useToast()
  const shippingAddress = ref(false)
  const billingAddress = ref(false)
  const sameAddress = ref(false)

  const params = ref({
    title: 'Registration',
    btnName: 'Submit',
    linkName: 'Login',
    linkUrl: '/login',
    linkText: 'Already have an account?'
  })

  // const dataForm = ref({
  //   email: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  //   date: ref<Date | null>(null),
  //   postalCodeShippingAddress: '',
  //   cityShippingAddress: '',
  //   selectedCountryShippingAddress: ref<Country | null>(null),
  //   streetShippingAddress: '',
  //   postalCodeBillingAddress: '',
  //   cityBillingAddress: '',
  //   selectedCountryBillingAddress: ref<Country | null>(null),
  //   streetBillingAddress: ''
  // })

  // const errorsForm = ref({
  //   email: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  //   date: '',
  //   postalCodeShippingAddress: '',
  //   cityShippingAddress: '',
  //   selectedCountryShippingAddress: '',
  //   streetShippingAddress: '',
  //   postalCodeBillingAddress: '',
  //   cityBillingAddress: '',
  //   selectedCountryBillingAddress: '',
  //   streetBillingAddress: ''
  // })

  const dateFormat = 'dd-mm-yy'

  // const validateEmail = () => {
  //   const emailValue: string = dataForm.value.email

  //   errorsForm.value.email = ''

  //   const errors = Validation.email(emailValue)
  //   errorsForm.value.email = errors
  // }

  // const validatePassword = () => {
  //   const passwordValue: string = dataForm.value.password

  //   errorsForm.value.password = ''

  //   const errors = Validation.password(passwordValue)
  //   errorsForm.value.password = errors
  // }

  // const validateFirstName = () => {
  //   const firstNameValue: string = dataForm.value.firstName

  //   errorsForm.value.firstName = ''

  //   const errors = Validation.name(firstNameValue)
  //   errorsForm.value.firstName = errors
  // }
  // const validateLastName = () => {
  //   const lastNameValue: string = dataForm.value.lastName

  //   errorsForm.value.lastName = ''

  //   const errors = Validation.name(lastNameValue)
  //   errorsForm.value.lastName = errors
  // }
  // const validateDOB = () => {
  //   const dobValue = dataForm.value.date
  //   if (!dobValue) return

  //   errorsForm.value.date = ''

  //   const errors = Validation.date(dobValue)
  //   errorsForm.value.date = errors
  // }

  // const validateCityShipping = () => {
  //   const cityValue: string = dataForm.value.cityShippingAddress

  //   errorsForm.value.cityShippingAddress = ''

  //   const errors = Validation.city(cityValue)
  //   errorsForm.value.cityShippingAddress = errors
  // }

  // const validateStreetShipping = () => {
  //   const streetValue: string = dataForm.value.streetShippingAddress

  //   errorsForm.value.streetShippingAddress = ''

  //   const errors = Validation.street(streetValue)
  //   errorsForm.value.streetShippingAddress = errors
  // }

  // const validatePostalCodeShipping = () => {
  //   const postalCodeValue: string = dataForm.value.postalCodeShippingAddress
  //   const country = dataForm.value.selectedCountryShippingAddress

  //   if (country !== null) {
  //     const countryValue = country.name
  //     errorsForm.value.postalCodeShippingAddress = ''

  //     const errors = Validation.postalCode(postalCodeValue, countryValue)
  //     errorsForm.value.postalCodeShippingAddress = errors
  //   }
  // }

  // const validateCityBilling = () => {
  //   const cityValue: string = dataForm.value.cityBillingAddress

  //   errorsForm.value.cityBillingAddress = ''

  //   const errors = Validation.city(cityValue)
  //   errorsForm.value.cityBillingAddress = errors
  // }

  // const validateStreetBilling = () => {
  //   const streetValue: string = dataForm.value.streetBillingAddress

  //   errorsForm.value.streetBillingAddress = ''

  //   const errors = Validation.street(streetValue)
  //   errorsForm.value.streetBillingAddress = errors
  // }

  // const validatePostalCodeBilling = () => {
  //   const postalCodeValue: string = dataForm.value.postalCodeBillingAddress
  //   const country = dataForm.value.selectedCountryBillingAddress
  //   if (country !== null) {
  //     const countryValue = country.name
  //     errorsForm.value.postalCodeBillingAddress = ''

  //     const errors = Validation.postalCode(postalCodeValue, countryValue)
  //     errorsForm.value.postalCodeBillingAddress = errors
  //   }
  // }

  // const isFilledForm = (data = dataForm.value, errors = errorsForm.value) => {
  //   const isEmptyErrors = Object.values(errors).every((item) => item === '')
  //   const isNotEmptyData = Object.values(data).every((item) => item !== '')

  //   return isEmptyErrors && isNotEmptyData
  // }

  // const changeFieldsVisibility = () => {
  //   sameAddress.value = !sameAddress.value
  // }

  const sumbit = () => {
    registrationStore.registration().then(() => {
      toast.add({
        severity: registrationStore.toast.severity,
        summary: registrationStore.toast.summary,
        detail: registrationStore.toast.detail,
        life: 3000
      })
    })
  }
</script>

<style></style>
