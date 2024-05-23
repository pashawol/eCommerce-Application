import type { MyCustomerDraft } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'
import { apiRoot } from '../services/client'
import type { Country, PageContentProps, RegProps, ToastProps, Address } from '../interfaces'
import Validation from '../services/validation'

interface State {
  mainDateOfBirth: Date | undefined
  customerDraft: RegProps
  billingAddress: number[]
  shippingAddress: number[]
  sameAddress: string[]
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
  pageContent: PageContentProps
  countries: Country[]
}

export const useRegistrationStore = defineStore('registrationStore', {
  state: (): State => ({
    mainDateOfBirth: undefined,
    billingAddress: [],
    shippingAddress: [],
    sameAddress: [],
    countries: [
      { name: 'Canada', code: 'CA' },
      { name: 'United States', code: 'US' }
    ],
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
      defaultBillingAddress: null,
      defaultShippingAddress: null
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
    },
    pageContent: {
      title: 'Registration',
      btnName: 'Submit',
      linkName: 'Login',
      linkUrl: '/login',
      linkText: 'Already have an account?'
    }
  }),
  actions: {
    setSameAddress() {
      if (this.sameAddress[0] === 'compare') {
        for (const [key, value] of Object.entries(this.customerDraft.addresses[0])) {
          if (key === 'country') {
            for (const [innerKey] of Object.entries(this.countries)) {
              if (this.countries[innerKey as unknown as number].code === value) {
                this.mainBillingDropdown = this.countries[innerKey as unknown as number]
                this.customerDraft.addresses[1].country =
                  this.countries[innerKey as unknown as number].code
              }
            }
          } else {
            this.customerDraft.addresses[1][key as keyof (typeof this.customerDraft.addresses)[0]] =
              value
          }
        }
      }
      // else {
      //   for (const [key] of Object.entries(this.customerDraft.addresses[0])) {
      //     if (key === 'country') {
      //       this.mainBillingDropdown = {
      //         name: '',
      //         code: ''
      //       }
      //       this.customerDraft.addresses[1].country = ''
      //     } else {
      //       this.customerDraft.addresses[1][key as keyof (typeof this.customerDraft.addresses)[0]] =
      //         ''
      //     }
      //   }
      // }
    },
    actionDefaultBillingAddress() {
      this.customerDraft.defaultBillingAddress = this.billingAddress[0]
    },
    actionDefaultShippingAddress() {
      this.customerDraft.defaultShippingAddress = this.shippingAddress[0]
    },
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
      if (this.mainDateOfBirth) {
        this.customerDraft.dateOfBirth = new Date(this.mainDateOfBirth).toISOString().split('T')[0]
      }
      this.errorsForm.dateOfBirth = ''

      if (this.mainDateOfBirth) {
        const errors = Validation.date(new Date(this.mainDateOfBirth))
        this.errorsForm.dateOfBirth = errors
      }
    },

    validateCityShipping() {
      const cityValue: string = this.customerDraft.addresses[0].city

      this.errorsForm.addresses[0].city = ''

      const errors = Validation.city(cityValue)
      this.errorsForm.addresses[0].city = errors

      // this.customerDraft.addresses[0].city !== this.customerDraft.addresses[1].city
      //   ? (this.sameAddress = [])
      //   : (this.sameAddress = ['compare'])
    },

    validateStreetShipping() {
      const streetValue: string = this.customerDraft.addresses[0].streetName

      this.errorsForm.addresses[0].streetName = ''

      const errors = Validation.street(streetValue)
      this.errorsForm.addresses[0].streetName = errors

      // this.customerDraft.addresses[0].streetName !== this.customerDraft.addresses[1].streetName
      //   ? (this.sameAddress = [])
      //   : (this.sameAddress = ['compare'])
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

      // if (
      //   this.mainBillingDropdown.code !== this.mainShippingDropdown.code ||
      //   this.customerDraft.addresses[0].postalCode !== this.customerDraft.addresses[1].postalCode
      // ) {
      //   this.sameAddress = []
      // } else {
      //   this.sameAddress = ['compare']
      // }
    },

    validateCityBilling() {
      const cityValue: string = this.customerDraft.addresses[1].city

      this.errorsForm.addresses[1].city = ''

      const errors = Validation.city(cityValue)
      this.errorsForm.addresses[1].city = errors

      // this.customerDraft.addresses[0].city !== this.customerDraft.addresses[1].city
      //   ? (this.sameAddress = [])
      //   : (this.sameAddress = ['compare'])
    },

    validateStreetBilling() {
      const streetValue: string = this.customerDraft.addresses[1].streetName

      this.errorsForm.addresses[1].streetName = ''

      const errors = Validation.street(streetValue)
      this.errorsForm.addresses[1].streetName = errors

      // this.customerDraft.addresses[0].streetName !== this.customerDraft.addresses[1].streetName
      //   ? (this.sameAddress = [])
      //   : (this.sameAddress = ['compare'])
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

      // if (
      //   this.mainBillingDropdown.code !== this.mainShippingDropdown.code ||
      //   this.customerDraft.addresses[0].postalCode !== this.customerDraft.addresses[1].postalCode
      // ) {
      //   this.sameAddress = []
      // } else {
      //   this.sameAddress = ['compare']
      // }
    },

    isFilledForm() {
      function checkStringProperties(obj: RegProps, isempty: boolean): boolean {
        for (const key in obj) {
          if (
            typeof obj[key] === 'string' &&
            (isempty ? obj[key].trim() === '' : obj[key].trim() !== '')
          ) {
            return false
          }
          if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            if (!checkStringProperties(obj[key], isempty)) {
              return false
            }
          }
          if (Array.isArray(obj[key])) {
            for (const item of obj[key]) {
              if (!checkStringProperties(item, isempty)) {
                return false
              }
            }
          }
        }
        return true
      }

      if (this.sameAddress[0] === 'compare') {
        for (const [key, value] of Object.entries(this.customerDraft.addresses[0])) {
          if (key === 'country') {
            for (const [innerKey] of Object.entries(this.countries)) {
              if (this.countries[innerKey as unknown as number].code === value) {
                this.mainBillingDropdown = this.countries[innerKey as unknown as number]
                this.customerDraft.addresses[1].country =
                  this.countries[innerKey as unknown as number].code
              }
            }
          } else {
            this.customerDraft.addresses[1][key as keyof (typeof this.customerDraft.addresses)[0]] =
              value
          }
        }
      }

      const isEmptyErrors = checkStringProperties(this.errorsForm, false)
      const isNotEmptyData = checkStringProperties(this.customerDraft, true)

      return isEmptyErrors && isNotEmptyData
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
        localStorage.setItem('accessToken', 'tipaToken')

        return response.body
      } catch (error: unknown) {
        console.error('Error during customer registration:', error)
        if (error instanceof Error) {
          this.toast = {
            summary: 'Something went wrong :(',
            detail: error.message,
            severity: 'error'
          }
        }
      }
    }
  }
})
