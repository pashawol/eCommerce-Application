import { apiRoot } from './../services/client'
import { defineStore } from 'pinia'
import type { LoginProps } from '../interfaces/index'

interface State {
  dataForm: LoginProps
}

export const useAuthStore = defineStore('authStore', {
  state: (): State => ({
    dataForm: {
      email: '',
      password: ''
    }
  }),
  actions: {
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
