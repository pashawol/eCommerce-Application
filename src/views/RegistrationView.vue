<template>
  <FormPage v-bind="params">
    <form action="" class="mb-3">
      <div class="flex flex-column gap-2 mb-1">
        <label for="username">Email</label>
        <InputText
          id="email"
          v-model="email"
          aria-describedby="email-help"
          @input="validateEmail"
        />
        <small class="p-error" id="email-help">{{ emailErrorMessage }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="password">Password</label>
        <Password
          id="password"
          v-model="password"
          aria-describedby="password-help"
          :feedback="false"
          toggleMask
          @input="validatePassword"
        />
        <small class="p-error" id="password-help">{{ passwordErrorMessage }}</small>
      </div>

      <div class="group-wrapper">
        <div class="flex flex-column gap-2 mb-1">
          <label for="first-name">First Name</label>
          <InputText id="first-name" v-model="firstName" aria-describedby="first-name-help" />
          <small class="p-error" id="first-name-help">{{ firstNameErrorMessage }}</small>
        </div>
        <div class="flex flex-column gap-2 mb-1">
          <label for="last-name">Last Name</label>
          <InputText id="last-name" v-model="lastName" aria-describedby="last-name-help" />
          <small class="p-error" id="last-name-help">{{ lastNameErrorMessage }}</small>
        </div>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="dob">Date of Birth</label>
        <Calendar id="dob" v-model="dob" :dateFormat="dateFormat" />
        <small class="p-error" id="dob-help">{{ dobErrorMessage }}</small>
      </div>

      <div class="h6 text-center">Shipping address</div>
      <div class="group-wrapper">
        <div class="flex flex-column gap-2">
          <label for="postal-code">Postal Code</label>
          <InputText id="postal-code" v-model="postalCode" aria-describedby="postal-code-help" />
          <small class="p-error" id="postal-code-help">{{ postalCodeErrorMessage }}</small>
        </div>

        <div class="flex flex-column gap-2">
          <label for="city">City</label>
          <InputText id="city" v-model="city" aria-describedby="city-help" />
          <small class="p-error" id="city-help">{{ cityErrorMessage }}</small>
        </div>

        <div class="flex flex-column gap-2 mb-1">
          <label for="country">Country</label>
          <Dropdown
            id="country"
            v-model="selectedCountry"
            aria-describedby="country-help"
            :options="countries"
            optionLabel="name"
          />
          <small class="p-error" id="country-help">{{ countryErrorMessage }}</small>
        </div>

        <div class="flex flex-column gap-2 mb-1">
          <label for="street">Street</label>
          <InputText id="street" v-model="street" aria-describedby="street-help" />
          <small class="p-error" id="street-help">{{ streetErrorMessage }}</small>
        </div>
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
  import { validateEmailErrors, validatePasswordErrors } from '@/components/utils/validation'

  const params = {
    title: 'Registration',
    btnName: 'Submit',
    linkName: 'Login',
    linkUrl: '/login',
    linkText: 'Already have an account?'
  }

  const email = ref('')
  const password = ref('')
  const emailErrorMessage = ref('')
  const passwordErrorMessage = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const dob = ref<Date | null>(null)
  const firstNameErrorMessage = ref('')
  const lastNameErrorMessage = ref('')
  const dobErrorMessage = ref('')
  const dateFormat = 'dd-mm-yy'

  const postalCode = ref('')
  const city = ref('')
  const selectedCountry = ref('')
  const street = ref('')
  const postalCodeErrorMessage = ref('')
  const cityErrorMessage = ref('')
  const countryErrorMessage = ref('')
  const streetErrorMessage = ref('')

  // const inputStyleClass = 'p-inputtext-sm';

  const validateEmail = () => {
    const emailValue: string = email.value

    emailErrorMessage.value = ''

    const errors = validateEmailErrors(emailValue)
    emailErrorMessage.value = errors
  }

  const validatePassword = () => {
    const passwordValue: string = password.value

    passwordErrorMessage.value = ''

    const errors = validatePasswordErrors(passwordValue)
    passwordErrorMessage.value = errors
  }
</script>

<style></style>
