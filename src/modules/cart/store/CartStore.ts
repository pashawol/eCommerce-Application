import { defineStore } from 'pinia'
import { ref } from 'vue'
const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
const responseData = ref()
import { useGlobalStore } from '@/store/GlobalStore'
import type { ToastProps } from '@interfaces/index'

import type { productDataInterface } from '../interface'
import type { Cart, CartDiscount } from '@commercetools/platform-sdk'

interface State {
  myCart: Cart | null
  loadingAddLineItem: boolean
  toast: ToastProps
  currentProduct: string | null
  cartDiscount: CartDiscount
}

export const useCartStore = defineStore('cartStore', {
  state: (): State => ({
    myCart: null,
    loadingAddLineItem: false,
    currentProduct: null,
    cartDiscount: {} as CartDiscount,
    toast: {
      severity: undefined,
      summary: undefined,
      detail: ''
    }
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
        this.loadingAddLineItem = true
        this.currentProduct = productData.sku

        // await this.fetchCart()
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts/${this.myCart?.id}`, {
          ...this.getRequestOptions('POST'),
          body: JSON.stringify({
            version: this.myCart?.version,
            currency: 'USD',
            actions: [
              {
                action: 'addLineItem',
                ...productData
              }
            ]
          })
        })

        this.toast = {
          summary: 'Success',
          detail: 'Product added to cart',
          severity: 'success'
        }

        await this.fetchCart()

        setTimeout(() => {
          this.currentProduct = null
          this.loadingAddLineItem = false
        }, 500)
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async changeLineItemQuantity(lineItemSku: string, quantity: number) {
      const lineItemId = this.myCart?.lineItems.find((item) => item.variant.sku === lineItemSku)?.id

      try {
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts/${this.myCart?.id}`, {
          ...this.getRequestOptions('POST'),
          body: JSON.stringify({
            version: this.myCart?.version,
            actions: [
              {
                action: 'changeLineItemQuantity',
                lineItemId,
                quantity
              }
            ]
          })
        })
        await this.fetchCart()
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async removeLineItem(lineItemSku: string) {
      const lineItemId = this.myCart?.lineItems.find((item) => item.variant.sku === lineItemSku)?.id
      try {
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts/${this.myCart?.id}`, {
          ...this.getRequestOptions('POST'),
          body: JSON.stringify({
            version: this.myCart?.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId
              }
            ]
          })
        })
        await this.fetchCart()
        this.toast = {
          summary: 'Success',
          detail: 'Product removed from cart',
          severity: 'success'
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async fetchCart() {
      try {
        if (this.myCart?.id) {
          const response = await fetch(
            `${API_URL}/${PROJECT_KEY}/carts/${this.myCart.id}`,
            this.getRequestOptions()
          )
          const data = await response.json()
          this.myCart = data
        } else {
          await this.createCart()
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
    },
    async removeCart() {
      try {
        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/carts/${this.myCart?.id}?version=${this.myCart?.version}`,
          this.getRequestOptions('DELETE')
        )
        this.myCart = null
        console.log('Cart removed:', response)
        this.toast = {
          summary: 'Success',
          detail: 'Cart removed',
          severity: 'success'
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async fetchDiscountCodes() {
      try {
        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/cart-discounts`,
          this.getRequestOptions()
        )
        const data = await response.json()
        console.log('Discount codes:', data)
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async getDiscountCodeByKey(discountCodeKey: string) {
      try {
        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/cart-discounts/key=${discountCodeKey}`,
          this.getRequestOptions()
        )
        const data = await response.json()

        console.log('Discount code:', data)
        this.cartDiscount = data
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async removeDiscountCode() {
      try {
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts/${this.myCart?.id}`, {
          ...this.getRequestOptions('POST'),
          body: JSON.stringify({
            version: this.myCart?.version,
            actions: [
              {
                action: 'removeDiscountCode',
                discountCode: {
                  typeId: 'discount-code',
                  id: this.myCart?.discountCodes[0].discountCode.id
                }
              }
            ]
          })
        })
        this.cartDiscount = {} as CartDiscount
        await this.fetchCart()
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async addDiscountCode(discountCode: string) {
      await this.getDiscountCodeByKey(discountCode)

      try {
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/carts/${this.myCart?.id}`, {
          ...this.getRequestOptions('POST'),
          body: JSON.stringify({
            version: this.myCart?.version,
            actions: [
              {
                action: 'addDiscountCode',
                code: discountCode
              }
            ]
          })
        })
        if (response.status === 400) {
          this.toast = {
            summary: 'Error',
            detail: 'Invalid discount code',
            severity: 'error'
          }
          return
        } else {
          await this.fetchCart()
          this.toast = {
            summary: 'Success',
            detail: 'Discount code applied',
            severity: 'success'
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  },
  getters: {
    totalPrice: (state) => {
      if (state.myCart) {
        return (state.myCart.totalPrice.centAmount / 100).toFixed(2)
      }
      return 0
    },
    totalPriceWithDiscount: (state) => {
      if (state.myCart && state.cartDiscount.value) {
        return (
          (state.myCart.totalPrice.centAmount * (1 - state.cartDiscount.value.permyriad / 10000)) /
          100
        ).toFixed(2)
      }
      return 0
    },
    totalItems: (state) => {
      if (state.myCart) {
        return state.myCart.lineItems.reduce((acc, item) => acc + item.quantity, 0)
      }
      return 0
    }
  },
  persist: { storage: localStorage }
})
