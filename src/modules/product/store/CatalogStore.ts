// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import { getAnonymousToken } from '../services/getToken'
// import type { Product } from '../interfaces/product'
// import type { Category } from '../interfaces/category'

// const API_URL = import.meta.env.VITE_CTP_API_URL
// const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY

// export const useCatalogStore = defineStore('catalog', () => {
//   const dataProducts = ref<Product[]>([])
//   const dataCategories = ref<Category[]>([])
//   const error = ref<string | null>(null)

//   const fetchProducts = async () => {
//     try {
//       const token = await getAnonymousToken()

//       const response = await fetch(`${API_URL}/${PROJECT_KEY}/product-projections/search`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       })

//       if (!response.ok) {
//         throw new Error('Failed to fetch data')
//       }

//       const responseData = await response.json()
//       dataProducts.value = responseData.results
//     } catch (err) {
//       if (err instanceof Error) error.value = err.message
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const token = await getAnonymousToken()

//       const response = await fetch(`${API_URL}/${PROJECT_KEY}/categories`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       })

//       if (!response.ok) {
//         throw new Error('Failed to fetch categories')
//       }

//       const responseData = await response.json()
//       dataCategories.value = responseData.results
//     } catch (err) {
//       if (err instanceof Error) error.value = err.message
//     }
//   }

// })
