import { defineStore } from 'pinia'
import { ref } from 'vue'
const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
const responseData = ref()
import { useGlobalStore } from '@/store/GlobalStore'

import type { productDataInterface } from '../interface'
import type { Cart } from '@commercetools/platform-sdk'
interface State {
  myCart: Cart | null
}

export const useCartStore = defineStore('cartStore', {
  state: (): State => ({
    myCart: null
  }),
  actions: {
    getRequestOptions(method = 'GET') {
      const globalStore = useGlobalStore()
      return {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalStore.token}`
        }
      }
    },
    async createCart() {
      const datas = {
        currency: 'USD'
      }
      try {
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts`, {
          ...this.getRequestOptions('POST'),
          body: JSON.stringify(datas)
        })
        const data = await response.json()
        this.myCart = data
        console.log('Cart created:', data)
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async addLineItem(productData: productDataInterface) {
      try {
        if (!this.myCart) {
          await this.createCart()
        }

        if (!this.myCart) return

        await this.fetchCart()
        if (!this.myCart) return

        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts/${this.myCart.id}`, {
          ...this.getRequestOptions('POST'),
          body: JSON.stringify({
            version: this.myCart.version,
            currency: 'USD',
            actions: [
              {
                action: 'addLineItem',
                ...productData
              }
            ]
          })
        })
        const data = await response.json()
        console.log('Line item added:', data)
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async fetchCart() {
      try {
        if (this.myCart) {
          const response = await fetch(
            `${API_URL}/${PROJECT_KEY}/carts/${this.myCart.id}`,
            this.getRequestOptions()
          )
          const data = await response.json()
          this.myCart = data
          console.log('Cart data:', data)
        } else {
          console.error('Error: Cart or createdBy is null')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async queryCarts() {
      try {
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts`, this.getRequestOptions())
        const data = await response.json()
        console.log('Carts:', data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  },
  persist: { storage: localStorage }
})
