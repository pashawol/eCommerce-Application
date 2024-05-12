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
          <InputText id="first-name" v-model="firstName" aria-describedby="first-name-help" 
          @input="validateFirstName"/>
          <small class="p-error" id="first-name-help">{{ firstNameErrorMessage }}</small>
        </div>
        <div class="flex flex-column gap-2 mb-1">
          <label for="last-name">Last Name</label>
          <InputText id="last-name" v-model="lastName" aria-describedby="last-name-help"
          @input="validateLastName" />
          <small class="p-error" id="last-name-help">{{ lastNameErrorMessage }}</small>
        </div>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="date">Date of Birth</label>
        <Calendar id="date" v-model="date" :dateFormat="dateFormat"
        @selected="validateDOB" />
        <small class="p-error" id="date-help">{{ dobErrorMessage }}</small>
      </div>

      <div class="h6 text-center">Shipping address</div>
      <div class="group-wrapper">
        <div class="flex flex-column gap-2 mb-1">
          <label for="country">Country</label>
          <Dropdown
            id="country"
            v-model="selectedCountry"
            aria-describedby="country-help"
            :options="countries"
            optionLabel="name"
            @change="validatePostalCode"
          />
          <small class="p-error" id="country-help">{{ countryErrorMessage }}</small>
        </div>
        <div class="flex flex-column gap-2">
          <label for="postal-code">Postal Code</label>
          <InputText id="postal-code" v-model="postalCode" aria-describedby="postal-code-help" 
          @input="validatePostalCode"/>
          <small class="p-error" id="postal-code-help">{{ postalCodeErrorMessage }}</small>
        </div>

        <div class="flex flex-column gap-2">
          <label for="city">City</label>
          <InputText id="city" v-model="city" aria-describedby="city-help" 
          @input="validateCity" />
          <small class="p-error" id="city-help">{{ cityErrorMessage }}</small>
        </div>


        <div class="flex flex-column gap-2 mb-1">
          <label for="street">Street</label>
          <InputText id="street" v-model="street" aria-describedby="street-help" 
          @input="validateStreet" />
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
  import { validateEmailErrors, validatePasswordErrors, validateNameErrors, validateStreetErrors, validateCityErrors, validatePostalCodeErrors } from '@/components/utils/validation'
  import type { Country } from '@/components/utils/countryService'

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
  const date = ref<Date | null>(null)
  const firstNameErrorMessage = ref('')
  const lastNameErrorMessage = ref('')
  const dobErrorMessage = ref('')
  const dateFormat = 'dd-mm-yy'

  const postalCode = ref('')
  const city = ref('')
  const selectedCountry = ref<Country | null>(null)
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

  const validateFirstName = () => {
    const firstNameValue: string = firstName.value

    firstNameErrorMessage.value = ''

    const errors = validateNameErrors(firstNameValue)
    firstNameErrorMessage.value = errors
  }
  const validateLastName = () => {
    const lastNameValue: string = lastName.value

    lastNameErrorMessage.value = ''

    const errors = validateNameErrors(lastNameValue)
    lastNameErrorMessage.value = errors
  }
  const validateCity = () => {
    const cityValue: string = city.value;

    cityErrorMessage.value = '';

    const errors = validateCityErrors(cityValue);
    cityErrorMessage.value = errors;
  };

  const validateStreet = () => {
    const streetValue: string = street.value;

    streetErrorMessage.value = '';

    const errors = validateStreetErrors(streetValue);
    streetErrorMessage.value = errors;
  };

  const validateDOB = () => {
    console.log('1');
    const dobValue: Date | null = date.value;
    if (!dobValue) return;

    dobErrorMessage.value = '';

    const errors = validateDOBErros(dobValue);
    dobErrorMessage.value = errors;
  };

  const validateDOBErros = (dob: Date) => {
    console.log('2');
    const currentDate = new Date();
    const thirteenYearsAgo = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());

    return dob > thirteenYearsAgo ? 'User must be older than 13' : '';
  };

  const validatePostalCode = () => {
    const postalCodeValue: string = postalCode.value;
    const country = selectedCountry.value;

    if ( country !== null ) {
      const countryValue = country.name
      postalCodeErrorMessage.value = '';

      const errors = validatePostalCodeErrors(postalCodeValue, countryValue);
      postalCodeErrorMessage.value = errors;
    }
  };


</script>

<style></style>
