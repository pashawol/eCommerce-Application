export interface Product {
  id: string
  name: {
    'en-US': string
    [key: string]: string
  }
  description: {
    'en-US': string
    [key: string]: string
  }
  masterVariant: {
    id: number
    prices: Price[]
    images: Image[]
    sku: string
  }
}

interface Price {
  value: {
    centAmount: number
  }
  discounted?: {
    value: {
      centAmount: number
    }
  }
}

interface Image {
  url: string
}
