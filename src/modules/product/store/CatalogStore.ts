import { defineStore } from 'pinia'
import { ref } from 'vue'
import { organizeCategories } from '../services/categorization'
import type { Product } from '../interfaces/product'
import type { Category } from '../interfaces/category'
import { useGlobalStore } from '@/store/GlobalStore'
import { getFiltersQuery } from '../services/filtration'

const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
const responseData = ref()
const globalStore = useGlobalStore()

const requestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${globalStore.token}`
  }
}

interface State {
  categories: Category[]
  products: Product[]
  isLoadingCategories: boolean
  isLoadingProducts: boolean
  searchQuery: string
  filters: {
    color?: string
    size?: string
    price?: string
  }
}

export const useCatalogStore = defineStore('catalogStore', {
  state: (): State => ({
    categories: [],
    products: [],
    isLoadingCategories: false,
    isLoadingProducts: false,
    searchQuery: '',
    filters: {}
  }),

  actions: {
    async fetchCategories() {
      const cachedCategories = localStorage.getItem('categories')

      if (cachedCategories) {
        this.categories = JSON.parse(cachedCategories)
      } else if (this.categories.length === 0 && !this.isLoadingCategories) {
        try {
          this.isLoadingCategories = true

          const response = await fetch(`${API_URL}/${PROJECT_KEY}/categories`, requestOptions)

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
      try {
        this.isLoadingProducts = true

        const filters = getFiltersQuery(this.filters)
        const searchQuery = this.searchQuery
          ? `&fuzzy=true&text.en-US=${encodeURIComponent(this.searchQuery)}`
          : ''
        const filterQuery = filters.length ? `filter.query=${filters.join('&filter=')}` : ''

        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/product-projections/search?${filterQuery}${searchQuery}`,
          requestOptions
        )
        responseData.value = await response.json()
        this.products = responseData.value.results
      } catch (err) {
        console.error('Error fetching products:', err)
        throw err
      }
    },

    async fetchCategoryProducts(categoryId: string): Promise<void> {
      try {
        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/product-projections/search?filter=categories.id:subtree("${categoryId}")`,
          requestOptions
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
    },

    setFilters(filters: Partial<State['filters']>) {
      this.filters = { ...this.filters, ...filters }
      this.fetchProducts()
    },

    resetFilters() {
      this.searchQuery = ''
      this.filters.color = ''
      this.filters.size = ''
      this.filters.price = ''
      this.fetchProducts()
    }
  }
})
