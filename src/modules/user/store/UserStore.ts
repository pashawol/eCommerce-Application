import { useGlobalStore } from './../../../store/GlobalStore'
import { defineStore } from 'pinia'
import type { BodyRawProps, LoginProps, ToastProps } from '../interfaces'
import Validation from '../services/validation'

const API_URL = import.meta.env.VITE_CTP_API_URL
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
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
      name: '',
      lastName: '',
      midlleName: '',
      email: '',
      dateOfBirth: ''
    },
    errorsForm: {
      email: '',
      name: '',
      lastName: '',
      midlleName: '',
      dateOfBirth: ''
    },
    toast: {
      severity: undefined,
      summary: '',
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
    validateName() {
      const nameValue: string = this.dataForm.name
      this.errorsForm.name = ''

      const errors = Validation.name(nameValue)
      this.errorsForm.name = errors
    },
    validateSurname() {
      const surnameValue: string = this.dataForm.lastName
      this.errorsForm.lastName = ''

      const errors = Validation.name(surnameValue)
      this.errorsForm.lastName = errors
    },
    validateMiddleName() {
      const midlleNameValue: string = this.dataForm.midlleName
      this.errorsForm.midlleName = ''

      const errors = Validation.name(midlleNameValue)
      this.errorsForm.midlleName = errors
    },
    validateDOB() {
      const dobValue = this.mainDateOfBirth
      if (!dobValue) return
      if (this.mainDateOfBirth) {
        const date = new Date(this.mainDateOfBirth)
        const setCurrentDate = date.setDate(date.getDate() + 1)
        this.dataForm.dateOfBirth = new Date(setCurrentDate).toISOString().split('T')[0]
      }
      this.errorsForm.dateOfBirth = ''

      if (this.mainDateOfBirth) {
        const errors = Validation.date(new Date(this.mainDateOfBirth))
        this.errorsForm.dateOfBirth = errors
      }
    },
    isFilledForm() {
      const isEmptyErrors = Object.values(this.errorsForm).every((item) => item === '')
      const isNotEmptyData = Object.values(this.dataForm).some((item) => item !== '')

      return isEmptyErrors && isNotEmptyData
    },
    async changePersonalInfo() {
      const globalStore = useGlobalStore()
      const createHeader = new Headers()
      const bodyRaw: BodyRawProps = {
        version: globalStore.userData.version,
        actions: []
      }

      createHeader.append('Content-Type', 'application/json')
      createHeader.append('Authorization', `Bearer ${globalStore.token}`)

      if (this.dataForm.name !== '') {
        bodyRaw.actions.push({
          action: 'setFirstName',
          firstName: this.dataForm.name
        })
      }
      if (this.dataForm.lastName !== '') {
        bodyRaw.actions.push({
          action: 'setLastName',
          lastName: this.dataForm.lastName
        })
      }
      // if (this.dataForm.midlleName !== '') {
      // }
      bodyRaw.actions.push({
        action: 'setMiddleName',
        middleName: this.dataForm.midlleName
      })
      if (this.dataForm.dateOfBirth !== '') {
        bodyRaw.actions.push({
          action: 'setDateOfBirth',
          dateOfBirth: this.dataForm.dateOfBirth
        })
      }
      if (this.dataForm.email !== '') {
        bodyRaw.actions.push({
          action: 'changeEmail',
          email: this.dataForm.email
        })
      }

      const requestOptions = {
        method: 'POST',
        headers: createHeader,
        body: JSON.stringify(bodyRaw)
      }

      try {
        const response = await fetch(
          `${API_URL}/${PROJECT_KEY}/customers/${globalStore.userData.id}`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error(`Change failed failed: ${response.statusText}`)
        }

        this.toast = {
          summary: 'Successfully changed',
          detail: 'Your personal info has been changed',
          severity: 'success'
        }

        return response.json().then((data) => (globalStore.userData = data))
      } catch (error: unknown) {
        console.log('Error: ', error)
        if (error instanceof Error) {
          this.toast = {
            summary: 'Something went wrong :(',
            detail: error.message,
            severity: 'error'
          }
        }
      }
    }
  }
})
