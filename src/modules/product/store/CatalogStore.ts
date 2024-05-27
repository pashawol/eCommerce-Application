import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAnonymousToken } from '../services/getToken'
import { organizeCategories } from '../services/categorization'
import type { Product } from '../interfaces/product'
import type { Category } from '../interfaces/category'

const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
const responseData = ref()

interface State {
  categories: Category[]
  products: Product[]
  isLoadingCategories: boolean
  isLoadingProducts: boolean
}

export const useCatalogStore = defineStore('catalogStore', {
  state: (): State => ({
    categories: [],
    products: [],
    isLoadingCategories: false,
    isLoadingProducts: false
  }),

  actions: {
    async fetchCategories() {
      const cachedCategories = localStorage.getItem('categories')

      if (cachedCategories) {
        this.categories = JSON.parse(cachedCategories)
      } else if (this.categories.length === 0 && !this.isLoadingCategories) {
        try {
          this.isLoadingCategories = true
          const token = await getAnonymousToken()

          const response = await fetch(`${API_URL}/${PROJECT_KEY}/categories`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          responseData.value = await response.json()
          this.categories = organizeCategories(responseData.value.results)
          localStorage.setItem('categories', JSON.stringify(this.categories))
        } catch (err) {
          console.error('Error fetching categories:', err)
          throw err
        }
      }
    },

    async fetchProducts() {
      const cachedProducts = localStorage.getItem('products')

      if (cachedProducts) {
        this.products = JSON.parse(cachedProducts)
      } else if (this.products.length === 0 && !this.isLoadingProducts) {
        try {
          this.isLoadingProducts = true
          const token = await getAnonymousToken()
          const response = await fetch(`${API_URL}/${PROJECT_KEY}/product-projections/search`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          responseData.value = await response.json()
          this.products = responseData.value.results
          localStorage.setItem('products', JSON.stringify(this.products))
        } catch (err) {
          console.error('Error fetching products:', err)
          throw err
        }
      }
    },

    async fetchCategoryProducts(categoryId: string): Promise<void> {
      try {
        const token = await getAnonymousToken()

        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/product-projections/search?filter=categories.id:subtree("${categoryId}")`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        responseData.value = await response.json()
        this.products = responseData.value.results
      } catch (err) {
        console.error('Error fetching data:', err)
        throw err
      }
    }
  }
})
