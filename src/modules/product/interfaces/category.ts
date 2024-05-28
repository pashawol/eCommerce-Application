interface Category {
  id: string
  name: {
    'en-US': string
    [key: string]: string
  }
  parent?: {
    id: string
  }
  subcategories: Category[]
}

export { type Category }
