import { defineStore } from 'pinia'
import { ref } from 'vue'
const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
const responseData = ref()
import { useGlobalStore } from '@/store/GlobalStore'

interface State {}

export const useCatalogStore = defineStore('catalogStore', {
  state: (): State => ({}),

  actions: {}
})
