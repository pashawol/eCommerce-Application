import { useGlobalStore } from '@/store/GlobalStore'

class server {
  private static API_URL = import.meta.env.VITE_CTP_API_URL
  private static PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
  private static data = {
    currency: 'USD'
  }

  private static getRequestOptions(method = 'GET') {
    const globalStore = useGlobalStore()
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${globalStore.token}`
      }
    }
  }

  public static async createCart() {
    const requestOptions = this.getRequestOptions('POST')

    try {
      const response = await fetch(`${this.API_URL}/${this.PROJECT_KEY}/carts`, {
        ...requestOptions,
        body: JSON.stringify(this.data)
      })
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async fetchCart(cartId: string) {
    const requestOptions = this.getRequestOptions()
    try {
      const response = await fetch(
        `${this.API_URL}/${this.PROJECT_KEY}/carts/${cartId}`,
        requestOptions
      )
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async addLineItem(cartId: string, productData: any, version: number) {
    const requestOptions = this.getRequestOptions('POST')
    try {
      const response = await fetch(`${this.API_URL}/${this.PROJECT_KEY}/carts/${cartId}`, {
        ...requestOptions,
        body: JSON.stringify({
          version,
          currency: this.data.currency,
          actions: [
            {
              action: 'addLineItem',
              ...productData
            }
          ]
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async removeLineItemById(cartId: string, lineItemId: string, version: number) {
    const requestOptions = this.getRequestOptions('POST')
    try {
      const response = await fetch(`${this.API_URL}/${this.PROJECT_KEY}/carts/${cartId}`, {
        ...requestOptions,
        body: JSON.stringify({
          version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId
            }
          ]
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async changeLineItemQuantity(
    cartId: string,
    lineItemId: string,
    quantity: number,
    version: number
  ) {
    const requestOptions = this.getRequestOptions('POST')
    try {
      const response = await fetch(`${this.API_URL}/${this.PROJECT_KEY}/carts/${cartId}`, {
        ...requestOptions,
        body: JSON.stringify({
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity
            }
          ]
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async getDiscountCodeByKey(discountCodeKey: string) {
    const requestOptions = this.getRequestOptions()
    try {
      const response = await fetch(
        `${this.API_URL}/${this.PROJECT_KEY}/cart-discounts/key=${discountCodeKey}`,
        requestOptions
      )
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async fetchDiscountCodes() {
    const requestOptions = this.getRequestOptions()
    try {
      const response = await fetch(
        `${this.API_URL}/${this.PROJECT_KEY}/cart-discounts`,
        requestOptions
      )
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async addDiscountCode(cartId: string, discountCode: string, version: number) {
    const requestOptions = this.getRequestOptions('POST')
    try {
      const response = await fetch(`${this.API_URL}/${this.PROJECT_KEY}/carts/${cartId}`, {
        ...requestOptions,
        body: JSON.stringify({
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code: discountCode
            }
          ]
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async removeDiscountCode(cartId: string, version: number) {
    const requestOptions = this.getRequestOptions('POST')
    try {
      const response = await fetch(`${this.API_URL}/${this.PROJECT_KEY}/carts/${cartId}`, {
        ...requestOptions,
        body: JSON.stringify({
          version,
          actions: [
            {
              action: 'removeDiscountCode',
              discountCode: {
                typeId: 'discount-code',
                id: ''
              }
            }
          ]
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async removeCart(cartId: string, version: number) {
    const requestOptions = this.getRequestOptions('DELETE')
    try {
      const response = await fetch(
        `${this.API_URL}/${this.PROJECT_KEY}/carts/${cartId}?version=${version}`,
        requestOptions
      )
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  public static async queryCarts() {
    const requestOptions = this.getRequestOptions()
    try {
      const response = await fetch(`${this.API_URL}/${this.PROJECT_KEY}/carts`, requestOptions)
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }
}

export default server
