<template>
  <FormPage v-bind="params">
    <form action="" class="mb-3">
      <div class="flex flex-column gap-2 mb-1">
        <label for="username">Email</label>
        <InputText
          id="email"
          v-model="dataForm.email"
          aria-describedby="email-help"
          @input="validateEmail"
        />
        <small class="p-error" id="email-help">{{ errorsForm.email }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="password">Password</label>
        <Password
          id="password"
          v-model="dataForm.password"
          aria-describedby="password-help"
          :feedback="false"
          toggleMask
          @input="validatePassword"
        />
        <small class="p-error" id="password-help">{{ errorsForm.password }}</small>
      </div>

      <div class="group-wrapper">
        <div class="flex flex-column gap-2 mb-1">
          <label for="first-name">First Name</label>
          <InputText
            id="first-name"
            v-model="dataForm.firstName"
            aria-describedby="first-name-help"
            @input="validateFirstName"
          />
          <small class="p-error" id="first-name-help">{{ errorsForm.firstName }}</small>
        </div>
        <div class="flex flex-column gap-2 mb-1">
          <label for="last-name">Last Name</label>
          <InputText
            id="last-name"
            v-model="dataForm.lastName"
            aria-describedby="last-name-help"
            @input="validateLastName"
          />
          <small class="p-error" id="last-name-help">{{ errorsForm.lastName }}</small>
        </div>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="date">Date of Birth</label>
        <Calendar
          id="date"
          v-model="dataForm.date"
          :dateFormat="dateFormat"
          @date-select="validateDOB"
        />
        <small class="p-error" id="date-help">{{ errorsForm.date }}</small>
      </div>

      <div class="h6 text-center">Shipping address</div>
      <div class="flex flex-column gap-2 mb-1">
        <label for="country">Country</label>
        <Dropdown
          id="country"
          v-model="dataForm.selectedCountryShippingAddress"
          aria-describedby="country-help"
          :options="countries"
          optionLabel="name"
          @change="validatePostalCodeShipping"
        />
        <small class="p-error" id="country-help">{{
          errorsForm.selectedCountryShippingAddress
        }}</small>
      </div>
      <div class="flex flex-column gap-2">
        <label for="postal-code-shipping">Postal Code</label>
        <InputText
          id="postal-code-shipping"
          v-model="dataForm.postalCodeShippingAddress"
          aria-describedby="postal-code-help"
          @input="validatePostalCodeShipping"
        />
        <small class="p-error" id="postal-code-help">{{
          errorsForm.postalCodeShippingAddress
        }}</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="city-shipping">City</label>
        <InputText
          id="city-shipping"
          v-model="dataForm.cityShippingAddress"
          aria-describedby="city-help"
          @input="validateCityShipping"
        />
        <small class="p-error" id="city-help">{{ errorsForm.cityShippingAddress }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="street-shipping">Street</label>
        <InputText
          id="street-shipping"
          v-model="dataForm.streetShippingAddress"
          aria-describedby="street-help"
          @input="validateStreetShipping"
        />
        <small class="p-error" id="street-help">{{ errorsForm.streetShippingAddress }}</small>
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
            v-model="dataForm.selectedCountryBillingAddress"
            aria-describedby="country-help"
            :options="countries"
            optionLabel="name"
            @change="validatePostalCodeBilling"
          />
          <small class="p-error" id="country-help">{{
            errorsForm.selectedCountryBillingAddress
          }}</small>
        </div>
        <div class="flex flex-column gap-2">
          <label for="postal-code">Postal Code</label>
          <InputText
            id="postal-code"
            v-model="dataForm.postalCodeBillingAddress"
            aria-describedby="postal-code-help"
            @input="validatePostalCodeBilling"
          />
          <small class="p-error" id="postal-code-help">{{
            errorsForm.postalCodeBillingAddress
          }}</small>
        </div>

        <div class="flex flex-column gap-2">
          <label for="city">City</label>
          <InputText
            id="city"
            v-model="dataForm.cityBillingAddress"
            aria-describedby="city-help"
            @input="validateCityBilling"
          />
          <small class="p-error" id="city-help">{{ errorsForm.cityBillingAddress }}</small>
        </div>

        <div class="flex flex-column gap-2 mb-1">
          <label for="street">Street</label>
          <InputText
            id="street"
            v-model="dataForm.streetBillingAddress"
            aria-describedby="street-help"
            @input="validateStreetBilling"
          />
          <small class="p-error" id="street-help">{{ errorsForm.streetBillingAddress }}</small>
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
        <Button type="submit" :disabled="!isFilledForm()" label="Submit" />
      </div>
    </form>
  </FormPage>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import FormPage from '@/components/layouts/FormPage/FormPage.vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Calendar from 'primevue/calendar'
  import Dropdown from 'primevue/dropdown'
  import { countries } from '@/components/utils/countryService'
  import Validation from '@/components/utils/validation'
  import type { Country } from '@/components/utils/countryService'
  import Checkbox from 'primevue/checkbox'

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

  const dataForm = ref({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    date: ref<Date | null>(null),
    postalCodeShippingAddress: '',
    cityShippingAddress: '',
    selectedCountryShippingAddress: ref<Country | null>(null),
    streetShippingAddress: '',
    postalCodeBillingAddress: '',
    cityBillingAddress: '',
    selectedCountryBillingAddress: ref<Country | null>(null),
    streetBillingAddress: ''
  })

  const errorsForm = ref({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    date: '',
    postalCodeShippingAddress: '',
    cityShippingAddress: '',
    selectedCountryShippingAddress: '',
    streetShippingAddress: '',
    postalCodeBillingAddress: '',
    cityBillingAddress: '',
    selectedCountryBillingAddress: '',
    streetBillingAddress: ''
  })

  const dateFormat = 'dd-mm-yy'

  const validateEmail = () => {
    const emailValue: string = dataForm.value.email

    errorsForm.value.email = ''

    const errors = Validation.email(emailValue)
    errorsForm.value.email = errors
  }

  const validatePassword = () => {
    const passwordValue: string = dataForm.value.password

    errorsForm.value.password = ''

    const errors = Validation.password(passwordValue)
    errorsForm.value.password = errors
  }

  const validateFirstName = () => {
    const firstNameValue: string = dataForm.value.firstName

    errorsForm.value.firstName = ''

    const errors = Validation.name(firstNameValue)
    errorsForm.value.firstName = errors
  }
  const validateLastName = () => {
    const lastNameValue: string = dataForm.value.lastName

    errorsForm.value.lastName = ''

    const errors = Validation.name(lastNameValue)
    errorsForm.value.lastName = errors
  }
  const validateDOB = () => {
    const dobValue = dataForm.value.date
    if (!dobValue) return

    errorsForm.value.date = ''

    const errors = Validation.date(dobValue)
    errorsForm.value.date = errors
  }

  const validateCityShipping = () => {
    const cityValue: string = dataForm.value.cityShippingAddress

    errorsForm.value.cityShippingAddress = ''

    const errors = Validation.city(cityValue)
    errorsForm.value.cityShippingAddress = errors
  }

  const validateStreetShipping = () => {
    const streetValue: string = dataForm.value.streetShippingAddress

    errorsForm.value.streetShippingAddress = ''

    const errors = Validation.street(streetValue)
    errorsForm.value.streetShippingAddress = errors
  }

  const validatePostalCodeShipping = () => {
    const postalCodeValue: string = dataForm.value.postalCodeShippingAddress
    const country = dataForm.value.selectedCountryShippingAddress

    if (country !== null) {
      const countryValue = country.name
      errorsForm.value.postalCodeShippingAddress = ''

      const errors = Validation.postalCode(postalCodeValue, countryValue)
      errorsForm.value.postalCodeShippingAddress = errors
    }
  }

  const validateCityBilling = () => {
    const cityValue: string = dataForm.value.cityBillingAddress

    errorsForm.value.cityBillingAddress = ''

    const errors = Validation.city(cityValue)
    errorsForm.value.cityBillingAddress = errors
  }

  const validateStreetBilling = () => {
    const streetValue: string = dataForm.value.streetBillingAddress

    errorsForm.value.streetBillingAddress = ''

    const errors = Validation.street(streetValue)
    errorsForm.value.streetBillingAddress = errors
  }

  const validatePostalCodeBilling = () => {
    const postalCodeValue: string = dataForm.value.postalCodeBillingAddress
    const country = dataForm.value.selectedCountryBillingAddress
    if (country !== null) {
      const countryValue = country.name
      errorsForm.value.postalCodeBillingAddress = ''

      const errors = Validation.postalCode(postalCodeValue, countryValue)
      errorsForm.value.postalCodeBillingAddress = errors
    }
  }

  const isFilledForm = (data = dataForm.value, errors = errorsForm.value) => {
    const isEmptyErrors = Object.values(errors).every((item) => item === '')
    const isNotEmptyData = Object.values(data).every((item) => item !== '')

    return isEmptyErrors && isNotEmptyData
  }

  // const changeFieldsVisibility = () => {
  //   sameAddress.value = !sameAddress.value
  // }
</script>

<style></style>
