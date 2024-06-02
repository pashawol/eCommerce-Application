export interface LoginProps {
  email: string
  dateOfBirth: string
}

export interface ToastProps {
  detail: string
  summary?: string
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined
}

export interface AddressFormProps {
  ids: string
  streetName: string
  postalCode: string
  city: string
  country: string
}

export interface Country {
  name: string
  code: string
}
