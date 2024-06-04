export interface LoginProps {
  email: string
  dateOfBirth: string
  name: string
  lastName: string
  midlleName: string
}

export interface ToastProps {
  detail: string
  summary?: string
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined
}

export interface AddressFormProps {
  streetName: string
  postalCode: string
  city: string
  country: string
}

export interface Country {
  name: string
  code: string
}

export interface BodyRawProps {
  version: number
  actions: Record<string, string | Object>[]
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
