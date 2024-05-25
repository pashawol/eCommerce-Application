export interface LoginProps {
  email: string
  password: string
}

export interface ToastProps {
  detail: string
  summary?: string
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined
}

export type RegProps = {
  [key: string]: any
  firstName: string
  lastName: string
  email: string
  password: string
  dateOfBirth: string
  addresses: Address[]
  shippingAddresses: number[]
  billingAddresses: number[]
  defaultBillingAddress: number | null
  defaultShippingAddress: number | null
}

export interface Country {
  name: string
  code: string
}

export interface Address {
  streetName: string

  postalCode: string
  city: string
  country: string
}
export interface PageContentProps {
  title: string
  btnName: string
  linkName: string
  linkUrl: string
  linkText: string
}
