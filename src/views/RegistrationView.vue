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
      <div class="group-wrapper">
        <div class="flex flex-column gap-2 mb-1">
          <label for="country">Country</label>
          <Dropdown
            id="country"
            v-model="dataForm.selectedCountry"
            aria-describedby="country-help"
            :options="countries"
            optionLabel="name"
            @change="validatePostalCode"
          />
          <small class="p-error" id="country-help">{{ errorsForm.selectedCountry }}</small>
        </div>
        <div class="flex flex-column gap-2">
          <label for="postal-code">Postal Code</label>
          <InputText
            id="postal-code"
            v-model="dataForm.postalCode"
            aria-describedby="postal-code-help"
            @input="validatePostalCode"
          />
          <small class="p-error" id="postal-code-help">{{ errorsForm.postalCode }}</small>
        </div>

        <div class="flex flex-column gap-2">
          <label for="city">City</label>
          <InputText
            id="city"
            v-model="dataForm.city"
            aria-describedby="city-help"
            @input="validateCity"
          />
          <small class="p-error" id="city-help">{{ errorsForm.city }}</small>
        </div>

        <div class="flex flex-column gap-2 mb-1">
          <label for="street">Street</label>
          <InputText
            id="street"
            v-model="dataForm.street"
            aria-describedby="street-help"
            @input="validateStreet"
          />
          <small class="p-error" id="street-help">{{ errorsForm.street }}</small>
        </div>
        <div class="mb-4">
          <Button type="submit" :disabled="!isFilledForm()" label="Submit" />
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
  import { countries } from '@/components/utils/countryList'
  import Validation from '@/components/utils/validation'
  import type { Country } from '@/components/utils/countryList'

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
    postalCode: '',
    city: '',
    selectedCountry: ref<Country | null>(null),
    street: ''
  })

  const errorsForm = ref({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    date: '',
    postalCode: '',
    city: '',
    selectedCountry: '',
    street: ''
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
  const validateCity = () => {
    const cityValue: string = dataForm.value.city

    errorsForm.value.city = ''

    const errors = Validation.city(cityValue)
    errorsForm.value.city = errors
  }

  const validateStreet = () => {
    const streetValue: string = dataForm.value.street

    errorsForm.value.street = ''

    const errors = Validation.street(streetValue)
    errorsForm.value.street = errors
  }

  const validateDOB = () => {
    const dobValue = dataForm.value.date
    if (!dobValue) return

    errorsForm.value.date = ''

    const errors = Validation.date(dobValue)
    errorsForm.value.date = errors
  }

  const validatePostalCode = () => {
    const postalCodeValue: string = dataForm.value.postalCode
    const country = dataForm.value.selectedCountry

    if (country !== null) {
      const countryValue = country.name
      errorsForm.value.postalCode = ''

      const errors = Validation.postalCode(postalCodeValue, countryValue)
      errorsForm.value.postalCode = errors
    }
  }

  const isFilledForm = (data = dataForm.value, errors = errorsForm.value) => {
    const isEmptyErrors = Object.values(errors).every((item) => item === '')
    const isNotEmptyData = Object.values(data).every((item) => item !== '')

    return isEmptyErrors && isNotEmptyData
  }
</script>

<style></style>
