import { defineStore } from 'pinia'
import type { AddressFormProps, Country, LoginProps, ToastProps } from '../interfaces'
import Validation from '../services/validation'

interface State {
  mainDateOfBirth: Date | undefined
  dataForm: LoginProps
  errorsForm: LoginProps
  toast: ToastProps
  addressForm: AddressFormProps
  addressErrorsForm: AddressFormProps
  countries: Country[]
  countriesDropdown: {
    name: string
    code: string
  }
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    mainDateOfBirth: undefined,
    countries: [
      { name: 'Canada', code: 'CA' },
      { name: 'United States', code: 'US' }
    ],
    countriesDropdown: {
      name: '',
      code: ''
    },
    dataForm: {
      email: '',
      dateOfBirth: ''
    },
    addressForm: {
      ids: '',
      streetName: '',
      postalCode: '',
      city: '',
      country: ''
    },
    errorsForm: {
      email: '',
      dateOfBirth: ''
    },
    addressErrorsForm: {
      ids: '',
      streetName: '',
      postalCode: '',
      city: '',
      country: ''
    },
    toast: {
      severity: 'success',
      summary: 'Test',
      detail: ''
    }
  }),
  actions: {
    validateEmail() {
      const emailValue: string = this.dataForm.email
      this.errorsForm.email = ''

      const errors = Validation.email(emailValue)
      this.errorsForm.email = errors
    },
    validateDOB() {
      const dobValue = this.mainDateOfBirth
      if (!dobValue) return
      if (this.mainDateOfBirth) {
        this.dataForm.dateOfBirth = new Date(this.mainDateOfBirth).toISOString().split('T')[0]
      }
      this.errorsForm.dateOfBirth = ''

      if (this.mainDateOfBirth) {
        const errors = Validation.date(new Date(this.mainDateOfBirth))
        this.errorsForm.dateOfBirth = errors
      }
    },
    validateCity() {
      const cityValue: string = this.addressErrorsForm.city

      this.addressErrorsForm.city = ''

      const errors = Validation.city(cityValue)
      this.addressErrorsForm.city = errors
    },

    validateStreet() {
      const streetValue: string = this.addressErrorsForm.streetName

      this.addressErrorsForm.streetName = ''

      const errors = Validation.street(streetValue)
      this.addressErrorsForm.streetName = errors
    },

    validatePostalCode() {
      const postalCodeValue: string = this.addressForm.postalCode
      const country = this.countriesDropdown
      this.addressForm.country = country.code
      if (country !== null) {
        const countryValue = country.name
        this.addressErrorsForm.postalCode = ''

        const errors = Validation.postalCode(postalCodeValue, countryValue)
        this.addressErrorsForm.postalCode = errors
      }
    },
    isFilledForm() {
      const isEmptyErrors = Object.values(this.errorsForm).every((item) => item === '')
      // const isNotEmptyData = Object.values(this.dataForm).every((item) => item !== '')

      return isEmptyErrors
    },
    isFilledAddressForm() {
      const isEmptyErrors = Object.values(this.addressErrorsForm).every((item) => item === '')
      // const isNotEmptyData = Object.values(this.dataForm).every((item) => item !== '')

      return isEmptyErrors
    }
  }
})
