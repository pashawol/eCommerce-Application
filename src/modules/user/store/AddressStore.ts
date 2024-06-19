import type { AddressFormProps, BodyRawProps, Country, ToastProps } from '../interfaces'
import { defineStore } from 'pinia'
import { useGlobalStore } from '@/store/GlobalStore'
import Validation from '../services/validation'

const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY

interface State {
  action: string
  ids: string
  address: AddressFormProps
  addressErrorsForm: AddressFormProps
  countries: Country[]
  toast: ToastProps
  countriesDropdown: {
    name: string
    code: string
  }
}

export const useAddressStore = defineStore('addressStore', {
  state: (): State => ({
    action: '',
    ids: '',
    countries: [
      { name: 'Canada', code: 'CA' },
      { name: 'United States', code: 'US' }
    ],
    countriesDropdown: {
      name: '',
      code: ''
    },
    address: {
      streetName: '',
      postalCode: '',
      city: '',
      country: ''
    },
    addressErrorsForm: {
      streetName: '',
      postalCode: '',
      city: '',
      country: ''
    },
    toast: {
      severity: undefined,
      summary: '',
      detail: ''
    }
  }),
  actions: {
    validateCity() {
      const cityValue: string = this.address.city

      this.addressErrorsForm.city = ''

      const errors = Validation.city(cityValue)
      this.addressErrorsForm.city = errors
    },
    validateStreet() {
      const streetValue: string = this.address.streetName

      this.addressErrorsForm.streetName = ''

      const errors = Validation.street(streetValue)
      this.addressErrorsForm.streetName = errors
    },
    validatePostalCode() {
      const postalCodeValue: string = this.address.postalCode
      const country = this.countriesDropdown
      this.address.country = country.code
      if (country !== null) {
        const countryValue = country.name
        this.addressErrorsForm.postalCode = ''

        const errors = Validation.postalCode(postalCodeValue, countryValue)
        this.addressErrorsForm.postalCode = errors
      }
    },
    isFilledAddressForm() {
      const isEmptyErrors = Object.values(this.addressErrorsForm).every((item) => item === '')
      const isNotEmptyData = Object.values(this.address).every((item) => item !== '')

      return isEmptyErrors && isNotEmptyData
    },
    async addressAction() {
      const globalStore = useGlobalStore()
      const createHeader = new Headers()
      const bodyRaw: BodyRawProps = {
        version: globalStore.userData.version,
        actions: []
      }

      // const filteredAddress = this.removeEmptyValues(this.address);

      if (this.action === 'changeAddress') {
        bodyRaw.actions.push({
          action: this.action,
          addressId: this.ids,
          address: this.address
        })
      } else if (this.action === 'addAddress') {
        bodyRaw.actions.push({
          action: this.action,
          address: this.address
        })
      } else if (
        this.action === 'removeShippingAddressId' ||
        this.action === 'removeBillingAddressId' ||
        this.action === 'setDefaultShippingAddress' ||
        this.action === 'setDefaultBillingAddress'
      ) {
        bodyRaw.actions.push({
          action: this.action,
          addressId: this.ids
        })
      }

      createHeader.append('Content-Type', 'application/json')
      createHeader.append('Authorization', `Bearer ${globalStore.token}`)

      const requestOptions = {
        method: 'POST',
        headers: createHeader,
        body: JSON.stringify(bodyRaw)
      }

      try {
        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/customers/${globalStore.userData.id}`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error(`Change failed failed: ${response.statusText}`)
        }

        this.toast = {
          summary: 'Successfully changed',
          detail: 'Your address info has been changed',
          severity: 'success'
        }

        this.countriesDropdown = {
          name: '',
          code: ''
        }

        this.address = {
          streetName: '',
          postalCode: '',
          city: '',
          country: ''
        }

        return response.json().then((data) => (globalStore.userData = data))
      } catch (error: unknown) {
        console.log('Error: ', error)
        if (error instanceof Error) {
          this.toast = {
            summary: 'Something went wrong :(',
            detail: error.message,
            severity: 'error'
          }
        }
      }
    },
    async addAddressToPosition(addressType: string) {
      const globalStore = useGlobalStore()
      const createHeader = new Headers()
      const bodyRaw: BodyRawProps = {
        version: globalStore.userData.version,
        actions: []
      }

      createHeader.append('Content-Type', 'application/json')
      createHeader.append('Authorization', `Bearer ${globalStore.token}`)

      bodyRaw.actions = [
        {
          action: addressType,
          addressId:
            globalStore.userData.addresses[globalStore.userData.addresses.length - 1].id || ''
        }
      ]

      const requestOptions = {
        method: 'POST',
        headers: createHeader,
        body: JSON.stringify(bodyRaw)
      }

      try {
        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/customers/${globalStore.userData.id}`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error(`Change failed failed: ${response.statusText}`)
        }

        this.toast = {
          summary: 'Successfully changed',
          detail: `Your new address has been added to your ${addressType === 'addShippingAddressId' ? 'Shipping' : 'Billing'} list`,
          severity: 'success'
        }

        return response.json().then((data) => (globalStore.userData = data))
      } catch (error: unknown) {
        console.log('Error: ', error)
        if (error instanceof Error) {
          this.toast = {
            summary: 'Something went wrong :(',
            detail: error.message,
            severity: 'error'
          }
        }
      }
    }
    // removeEmptyValues(obj: object) {
    //   return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''))
    // }
  }
})
