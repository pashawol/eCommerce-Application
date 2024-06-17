import { describe, expect, beforeEach, test, vitest, afterEach } from 'vitest'
import fetchMock from 'fetch-mock'
import { useCartStore } from '../store/CartStore'
import { useGlobalStore } from '@/store/GlobalStore'
import { createPinia, setActivePinia } from 'pinia'

describe('Cart Store - createCart', () => {
  let store: ReturnType<typeof useCartStore>
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCartStore()
    globalStore = useGlobalStore()
    fetchMock.reset()
  })

  afterEach(() => {
    fetchMock.restore()
  })

  test('should create a cart with default currency USD', async () => {
    const mockResponse = {
      id: 'cart-id',
      version: 1,
      currency: 'USD',
      totalPrice: {
        type: 'CentPrecision',
        centAmount: 0,
        fractionDigits: 2
      },
      lineItems: []
    }

    fetchMock.once('*', { ...mockResponse })

    await store.createCart()

    expect(store.myCart).toEqual(mockResponse)
  })

  test('should handle error when creating a cart', async () => {
    fetchMock.once('', { status: 500 })
    await store.createCart()

    expect(store.myCart).toBeNull()
  })

  test('should log error message when creating a cart fails', async () => {
    const consoleErrorMock = vitest.spyOn(console, 'error').mockImplementation(() => {})

    fetchMock.once('', { status: 500 })

    await store.createCart()

    expect(consoleErrorMock).toHaveBeenCalledWith('Error:', expect.any(Error))

    consoleErrorMock.mockRestore()
  })
})
