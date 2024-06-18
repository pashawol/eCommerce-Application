import { defineStore, type StoreDefinition } from 'pinia'

import type { ToastProps } from '@interfaces/index'

import type { productDataInterface } from '../interface'
import type { Cart } from '@commercetools/platform-sdk'

import server from '../services/server'

interface State {
  myCart: Cart | null
  loadingAddLineItem: boolean
  toast: ToastProps
  currentProduct: string | null
  permyriad: number
}

export const useCartStore: StoreDefinition<'cartStore', State> = defineStore('cartStore', {
  state: (): State => ({
    myCart: null,
    loadingAddLineItem: false,
    currentProduct: null,
    permyriad: 0,
    toast: {
      severity: undefined,
      summary: undefined,
      detail: ''
    }
  }),
  getters: {
    totalPrice: (state: State) => {
      if (state.myCart) {
        return (state.myCart.totalPrice.centAmount / 100).toFixed(2)
      }
      return 0
    },
    totalPriceWithDiscount: (state: State) => {
      if (state.myCart && state.permyriad) {
        return ((state.myCart.totalPrice.centAmount * (1 - state.permyriad / 10000)) / 100).toFixed(
          2
        )
      }
      return 0
    },
    totalItems: (state: State): number => {
      if (state.myCart) {
        return state.myCart.lineItems.reduce((acc, item) => acc + item.quantity, 0)
      }
      return 0
    }
  },
  actions: {
    async fetchCart() {
      if (this.myCart) {
        this.myCart = await server.fetchCart(this.myCart.id)
      } else {
        await this.createCart()
      }
    },
    async createCart() {
      const data = await server.createCart()
      this.myCart = data
    },
    async addLineItem(productData: productDataInterface) {
      this.loadingAddLineItem = true
      this.currentProduct = productData.sku
      if (!this.myCart) {
        await this.createCart()
      }
      if (this.myCart) {
        await server.addLineItem(this.myCart?.id, productData, this.myCart?.version)

        this.toast = {
          summary: 'Success',
          detail: 'Product added to cart',
          severity: 'success'
        }

        await this.fetchCart()
      }

      setTimeout(() => {
        this.currentProduct = null
        this.loadingAddLineItem = false
      }, 500)
    },
    async removeLineItem(lineItemSku: string) {
      const lineItemId = this.myCart?.lineItems.find((item) => item.variant.sku === lineItemSku)?.id

      if (this.myCart && lineItemId) {
        await server.removeLineItemById(this.myCart?.id, lineItemId, this.myCart?.version)
        await this.fetchCart()
        this.toast = {
          summary: 'Success',
          detail: 'Product removed from cart',
          severity: 'success'
        }
      }
    },
    async changeLineItemQuantity(lineItemSku: string, quantity: number) {
      const lineItemId = this.myCart?.lineItems.find((item) => item.variant.sku === lineItemSku)?.id
      if (this.myCart && lineItemId) {
        await server.changeLineItemQuantity(
          this.myCart?.id,
          lineItemId,
          quantity,
          this.myCart?.version
        )
        await this.fetchCart()
      }
    },
    async removeCart() {
      if (this.myCart) {
        server.removeCart(this.myCart.id, this.myCart.version)
        this.myCart = null
        this.toast = {
          summary: 'Success',
          detail: 'Cart removed',
          severity: 'success'
        }
      }
    },
    async getDiscountCodeByKey(discountCodeKey: string) {
      const data = await server.getDiscountCodeByKey(discountCodeKey)
      this.permyriad = data.value.permyriad
    },
    async removeDiscountCode() {
      if (this.myCart?.id) {
        server.removeDiscountCode(this.myCart?.id, this.myCart?.version)
        await this.fetchCart()
      }
    },
    async addDiscountCode(discountCode: string) {
      await this.getDiscountCodeByKey(discountCode)
      if (this.myCart) {
        const response = await server.addDiscountCode(
          this.myCart?.id,
          discountCode,
          this.myCart?.version
        )
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
      }
    }
  },
  persist: { storage: localStorage }
})
