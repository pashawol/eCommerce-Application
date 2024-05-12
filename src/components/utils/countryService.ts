import { ref } from 'vue'

interface Country {
  name: string;
  code: string;
}

export const countries = ref<Country[]>([
  { name: 'Belarus', code: 'BY' },
  { name: 'Canada', code: 'CA' },
  { name: 'Russian Federation', code: 'RU' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'US' },
]);
