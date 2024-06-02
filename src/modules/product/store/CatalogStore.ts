import { defineStore } from 'pinia'
import { ref } from 'vue'
import { organizeCategories } from '../services/categorization'
import type { Product } from '../interfaces/product'
import type { Category } from '../interfaces/category'
import { useGlobalStore } from '@/store/GlobalStore'
import { type filters, getFiltersQuery } from '../services/filtration'

const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
const responseData = ref()

interface State {
  categories: Category[]
  products: Product[]
  isLoadingCategories: boolean
  isLoadingProducts: boolean
  searchQuery: string
  filters: filters
  sort: string
  productData?: Product | null
}

export const useCatalogStore = defineStore('catalogStore', {
  state: (): State => ({
    categories: [],
    products: [],
    isLoadingCategories: false,
    isLoadingProducts: false,
    searchQuery: '',
    filters: {
      color: '',
      size: '',
      price: ''
    },
    sort: 'price asc',
    productData: null
  }),

  actions: {
    getRequestOptions() {
      const globalStore = useGlobalStore()
      return {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalStore.token}`
        }
      }
    },

    async fetchCategories() {
      const cachedCategories = localStorage.getItem('categories')

      if (cachedCategories) {
        this.categories = JSON.parse(cachedCategories)
      } else if (this.categories.length === 0 && !this.isLoadingCategories) {
        try {
          this.isLoadingCategories = true

          const response = await fetch(
            `${API_URL}/${PROJECT_KEY}/categories`,
            this.getRequestOptions()
          )

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
        const sortQuery = this.sort.length ? `sort=${encodeURIComponent(this.sort)}` : ''

        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/product-projections/search?${filterQuery}${searchQuery}&${sortQuery}`,
          this.getRequestOptions()
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
          this.getRequestOptions()
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

    setFilters(filters: filters) {
      this.filters = { ...this.filters, ...filters }
      this.fetchProducts()
    },

    setSort(sort: string) {
      this.sort = sort
      this.fetchProducts()
    },

    resetFilters() {
      this.searchQuery = ''
      this.filters = {
        color: '',
        size: '',
        price: ''
      }
      this.fetchProducts()
    },

    applySort() {
      this.setSort(this.sort)
    },

    async fetchProductById(id: string, callback: () => void): Promise<void> {
      this.productData = null
      try {
        // const globalStore = useGlobalStore()
        // if (!globalStore.token) return
        const requestOptions = this.getRequestOptions()
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/products/${id}`, requestOptions)
        // if (response.status === 404) {
        //   router.push({ name: '404' })
        //   return
        // }
        if (response.status === 200) {
          const data = await response.json()
          this.productData = data.masterData.current
        }

        if (response.status === 404) {
          callback()
          return
        }
      } catch (err) {
        console.error('Error fetching product:', err)

        throw err
      }
    }
  }
})
