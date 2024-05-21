import { apiRoot } from './../services/client'
import { defineStore } from 'pinia'
import type { LoginProps, ToastProps } from '../interfaces/index'
import Validation from '@/components/utils/validation'
import type { CustomerDraft, MyCustomerDraft } from '@commercetools/platform-sdk'

interface State {
  dataForm: LoginProps
  errorsForm: LoginProps
  toast: ToastProps
}

export const useAuthStore = defineStore('authStore', {
  state: (): State => ({
    dataForm: {
      email: '',
      password: ''
    },
    errorsForm: {
      email: '',
      password: ''
    },
    toast: {
      severity: undefined,
      summary: undefined,
      detail: ''
    }
  }),
  actions: {
    validateEmail() {
      const emailValue: string = this.dataForm.email
      this.errorsForm.email = ''

      const errors = Validation.email(emailValue)
      this.errorsForm.email = errors
    },
    validatePassword() {
      const passwordValue: string = this.dataForm.password
      this.errorsForm.password = ''

      const errors = Validation.password(passwordValue)
      this.errorsForm.password = errors
    },
    isFilledForm() {
      const isEmptyErrors = Object.values(this.errorsForm).every((item) => item === '')
      const isNotEmptyData = Object.values(this.dataForm).every((item) => item !== '')

      return isEmptyErrors && isNotEmptyData
    },
    async logIn() {
      try {
        // console.log(this.dataForm)
        const respone = await apiRoot.login().post({ body: this.dataForm }).execute()
        console.log(respone.body)

        this.toast = {
          summary: 'You logined successfully',
          detail: 'Welcome to the Store',
          severity: 'success'
        }

        return respone.body
      } catch (err: Error) {
        this.toast = {
          summary: 'Something went wrong :(',
          detail: err.message,
          severity: 'error'
        }
        console.log(err)
      }
    }
  }
})
