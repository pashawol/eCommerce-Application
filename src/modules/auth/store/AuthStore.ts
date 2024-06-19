import { apiRoot, getAccessTokenForUser } from './../services/client'
import { defineStore } from 'pinia'
import type { LoginProps, PageContentProps, ToastProps } from '../interfaces/index'
import Validation from '../services/validation'
import { useGlobalStore } from '@/store/GlobalStore'
import type { Customer } from '@commercetools/platform-sdk'

interface State {
  dataForm: LoginProps
  errorsForm: LoginProps
  toast: ToastProps
  pageContent: PageContentProps
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
    },
    pageContent: {
      title: 'Login',
      btnName: 'Submit',
      linkName: 'Registration',
      linkUrl: '/registration',
      linkText: 'Don’t have an account?'
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
      const globalStore = useGlobalStore()

      try {
        const respone = await apiRoot
          .withProjectKey({
            projectKey: import.meta.env.VITE_CTP_PROJECT_KEY
          })
          .login()
          .post({ body: this.dataForm })
          .execute()

        await getAccessTokenForUser(this.dataForm.email, this.dataForm.password).then(
          (accessToken) => {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('customerID', respone.body.customer.id)
          }
        )

        this.toast = {
          summary: 'You logined successfully',
          detail: 'Welcome to the Store',
          severity: 'success'
        }

        globalStore.userData = respone.body.customer

        return respone
      } catch (err: unknown) {
        if (err instanceof Error) {
          this.toast = {
            summary: 'Something went wrong :(',
            detail: err.message,
            severity: 'error'
          }
        }
        console.log(err)
      }
    }
  }
})
