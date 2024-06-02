import { defineStore } from 'pinia'
import type { LoginProps, ToastProps } from '../interfaces'
import Validation from '../services/validation'

interface State {
  mainDateOfBirth: Date | undefined
  dataForm: LoginProps
  errorsForm: LoginProps
  toast: ToastProps
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    mainDateOfBirth: undefined,
    dataForm: {
      email: '',
      dateOfBirth: ''
    },
    errorsForm: {
      email: '',
      dateOfBirth: ''
    },
    toast: {
      severity: 'success',
      summary: 'Test',
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
    validateDOB() {
      const dobValue = this.mainDateOfBirth
      if (!dobValue) return
      if (this.mainDateOfBirth) {
        this.dataForm.dateOfBirth = new Date(this.mainDateOfBirth).toISOString().split('T')[0]
      }
      this.errorsForm.dateOfBirth = ''

      if (this.mainDateOfBirth) {
        const errors = Validation.date(new Date(this.mainDateOfBirth))
        this.errorsForm.dateOfBirth = errors
      }
    },
    isFilledForm() {
      const isEmptyErrors = Object.values(this.errorsForm).every((item) => item === '')
      // const isNotEmptyData = Object.values(this.dataForm).every((item) => item !== '')

      return isEmptyErrors
    }
  }
})
