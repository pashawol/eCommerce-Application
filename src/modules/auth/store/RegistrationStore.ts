import type { CustomerDraft, MyCustomerDraft } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'
import { apiRoot } from '../services/client'
import type { RegProps, ToastProps } from '../interfaces'
import Validation from '@/components/utils/validation'

interface State {
  mainDateOfBirth: Date
  customerDraft: RegProps
  errorsForm: RegProps
  mainShippingDropdown: {
    name: string
    code: string
  }
  mainBillingDropdown: {
    name: string
    code: string
  }
  toast: ToastProps
}

export const useRegistrationStore = defineStore('registrationStore', {
  state: (): State => ({
    mainDateOfBirth: new Date(),
    mainShippingDropdown: {
      name: '',
      code: ''
    },
    mainBillingDropdown: {
      name: '',
      code: ''
    },
    customerDraft: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      addresses: [
        {
          streetName: '',

          postalCode: '',
          city: '',
          country: ''
        },
        {
          streetName: '',

          postalCode: '',
          city: '',
          country: ''
        }
      ],
      shippingAddresses: [0],
      billingAddresses: [0],
      defaultBillingAddress: 0,
      defaultShippingAddress: 0
    },
    errorsForm: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      addresses: [
        {
          streetName: '',

          postalCode: '',
          city: '',
          country: ''
        },
        {
          streetName: '',

          postalCode: '',
          city: '',
          country: ''
        }
      ],
      shippingAddresses: [0],
      billingAddresses: [0],
      defaultBillingAddress: 0,
      defaultShippingAddress: 0
    },
    toast: {
      severity: undefined,
      summary: undefined,
      detail: ''
    }
  }),
  actions: {
    validateEmail() {
      const emailValue: string = this.customerDraft.email

      this.errorsForm.email = ''

      const errors = Validation.email(emailValue)
      this.errorsForm.email = errors
    },

    validatePassword() {
      const passwordValue: string = this.customerDraft.password

      this.errorsForm.password = ''

      const errors = Validation.password(passwordValue)
      this.errorsForm.password = errors
    },

    validateFirstName() {
      const firstNameValue: string = this.customerDraft.firstName

      this.errorsForm.firstName = ''

      const errors = Validation.name(firstNameValue)
      this.errorsForm.firstName = errors
    },
    validateLastName() {
      const lastNameValue: string = this.customerDraft.lastName

      this.errorsForm.lastName = ''

      const errors = Validation.name(lastNameValue)
      this.errorsForm.lastName = errors
    },
    validateDOB() {
      const dobValue = this.mainDateOfBirth
      if (!dobValue) return
      this.customerDraft.dateOfBirth = new Date(this.mainDateOfBirth).toISOString().split('T')[0]
      this.errorsForm.dateOfBirth = ''

      const errors = Validation.date(new Date(this.mainDateOfBirth))
      this.errorsForm.dateOfBirth = errors
    },

    validateCityShipping() {
      const cityValue: string = this.customerDraft.addresses[0].city

      this.errorsForm.addresses[0].city = ''

      const errors = Validation.city(cityValue)
      this.errorsForm.addresses[0].city = errors
    },

    validateStreetShipping() {
      const streetValue: string = this.customerDraft.addresses[0].streetName

      this.errorsForm.addresses[0].streetName = ''

      const errors = Validation.street(streetValue)
      this.errorsForm.addresses[0].streetName = errors
    },

    validatePostalCodeShipping() {
      const postalCodeValue: string = this.customerDraft.addresses[0].postalCode
      const country = this.mainShippingDropdown
      this.customerDraft.addresses[0].country = country.code
      if (country !== null) {
        const countryValue = country.name
        this.errorsForm.addresses[0].postalCode = ''

        const errors = Validation.postalCode(postalCodeValue, countryValue)
        this.errorsForm.addresses[0].postalCode = errors
      }
    },

    validateCityBilling() {
      const cityValue: string = this.customerDraft.addresses[1].city

      this.errorsForm.addresses[1].city = ''

      const errors = Validation.city(cityValue)
      this.errorsForm.addresses[1].city = errors
    },

    validateStreetBilling() {
      const streetValue: string = this.customerDraft.addresses[1].streetName

      this.errorsForm.addresses[1].streetName = ''

      const errors = Validation.street(streetValue)
      this.errorsForm.addresses[1].streetName = errors
    },

    validatePostalCodeBilling() {
      const postalCodeValue: string = this.customerDraft.addresses[1].postalCode
      const country = this.mainBillingDropdown
      this.customerDraft.addresses[1].country = country.code
      if (country !== null) {
        const countryValue = country.name
        this.errorsForm.addresses[1].postalCode = ''

        const errors = Validation.postalCode(postalCodeValue, countryValue)
        this.errorsForm.addresses[1].postalCode = errors
      }
    },

    isFilledForm() {
      const isEmptyErrors = Object.values(this.errorsForm).every((item) => item === '')
      const isNotEmptyData = Object.values(this.customerDraft).every((item) => item !== '')

      // console.log(this.customerDraft)
      // console.log(isNotEmptyData)

      // return isEmptyErrors && isNotEmptyData
      return isNotEmptyData
    },
    async registration() {
      const JSONBody = this.customerDraft
      try {
        // console.log(this.dataForm)
        const response = await apiRoot
          .me()
          .signup()
          .post({ body: JSONBody as unknown as MyCustomerDraft })
          .execute()

        this.toast = {
          summary: 'You registreted successfully',
          detail: 'Welcome to the Store',
          severity: 'success'
        }

        console.log('Customer registered:', response.body)
        return response.body
      } catch (error: Error) {
        console.error('Error during customer registration:', error)
        this.toast = {
          summary: 'Something went wrong :(',
          detail: error.message,
          severity: 'error'
        }
      }
    }
  }
})
