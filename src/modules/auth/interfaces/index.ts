export interface LoginProps {
  email: string
  password: string
}

export interface ToastProps {
  detail: string
  summary?: string
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined
}

export interface RegProps {
  firstName: string
  lastName: string
  email: string
  password: string
  dateOfBirth: string
  addresses: [
    {
      streetName: string

      postalCode: string
      city: string
      country: string
    },
    {
      streetName: string

      postalCode: string
      city: string
      country: string
    }
  ]
  shippingAddresses: number[]
  billingAddresses: number[]
  defaultBillingAddress: number | undefined
  defaultShippingAddress: number | undefined
}

export interface Country {
  name: string
  code: string
}
