import { apiRoot } from './../services/client'
import { defineStore } from 'pinia'
import type { LoginProps } from '../interfaces/index'
import Validation from '@/components/utils/validation'

interface State {
  dataForm: LoginProps
  errorsForm: LoginProps
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
        console.log(this.dataForm)
        const respone = await apiRoot.login().post({ body: this.dataForm }).execute()

        return respone.body
      } catch (err) {
        console.log(err)
      }
    }
  }
})
