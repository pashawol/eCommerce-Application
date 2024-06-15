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
  serverAnswer: string
  currentPage: number
  total: number
  isCategory: boolean
  categoryId: string | null
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
    productData: null,
    serverAnswer: '',
    currentPage: 0,
    total: 0,
    isCategory: false,
    categoryId: null
  }),

  actions: {
    getRequestOptions(method: string = 'GET') {
      const globalStore = useGlobalStore()
      return {
        method: method,
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
    searchFilter() {
      const filters = getFiltersQuery(this.filters)
      const searchQuery = this.searchQuery
        ? `&fuzzy=true&text.en-US=${encodeURIComponent(this.searchQuery)}`
        : ''
      const filterQuery = filters.length ? `filter.query=${filters.join('&filter=')}` : ''
      const sortQuery = this.sort.length ? `sort=${encodeURIComponent(this.sort)}` : ''

      return `${filterQuery}${searchQuery}&${sortQuery}`
    },
    categoriesFilter(categoryId: string) {
      return `filter=categories.id:subtree("${categoryId}")`
    },
    async fetchProducts() {
      try {
        this.isLoadingProducts = true

        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/product-projections/search?${this.isCategory === true ? this.categoriesFilter(this.categoryId!) : this.searchFilter()}&offset=${this.currentPage}&limit=4`,
          this.getRequestOptions()
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        responseData.value = await response.json()
        this.products = responseData.value.results
        this.total = responseData.value.total
      } catch (err) {
        console.error('Error fetching products:', err)
        throw err
      }
    },

    setFilters(filters: filters) {
      this.filters = { ...this.filters, ...filters }
      this.isCategory = false
      this.fetchProducts()
    },

    setSort(sort: string) {
      this.sort = sort
      this.isCategory = false
      this.fetchProducts()
    },

    resetFilters() {
      this.searchQuery = ''
      this.filters = {
        color: '',
        size: '',
        price: ''
      }
      this.isCategory = false
      this.fetchProducts()
    },

    applySort() {
      this.setSort(this.sort)
    },

    async fetchProductById(id: string): Promise<void> {
      this.productData = null
      this.serverAnswer = ''
      try {
        // const globalStore = useGlobalStore()
        // if (!globalStore.token) return
        const requestOptions = this.getRequestOptions()
        const response = await fetch(`${API_URL}/${PROJECT_KEY}/products/${id}`, requestOptions)
        // if (response.status === 404) {
        //   router.push({ name: '404' })
        //   return
        // }
        // if (response.status === 200) {
        const data = await response.json()
        this.productData = data.masterData.current
        // }

        if (response.status === 404) {
          this.serverAnswer = '404'
          return
        }
      } catch (err) {
        console.error('Error fetching product:', err)

        throw err
      }
    }
  }
})
