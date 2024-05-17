import { ref } from 'vue'

export interface Country {
  name: string
  code: string
}

export const countries = ref<Country[]>([
  { name: 'Canada', code: 'CA' },
  { name: 'United States', code: 'US' }
])
