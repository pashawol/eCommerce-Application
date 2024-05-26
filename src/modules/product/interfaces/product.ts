// export interface Product {
//   id: string
//   name: {
//     'en-US': string
//     [key: string]: string
//   }
//   description: {
//     'en-US': string
//     [key: string]: string
//   }
//   masterData: {
//     current: {
//       description: {
//         'en-US': string
//       }
//       name: {
//         'en-US': string
//       }
//       masterVariant: {
//         id: number
//         prices: Price[]
//         images: Image[]
//       }
//     }
//   }
// }

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
