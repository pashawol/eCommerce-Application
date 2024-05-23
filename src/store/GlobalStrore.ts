import { defineStore } from 'pinia'

interface State {
  isAuth: boolean
}

export const useGlobalStore = defineStore('globalStore', {
  state: (): State => ({
    isAuth: false
  }),
  actions: {
    checkAuth() {
      localStorage.getItem('accessToken') ? (this.isAuth = true) : (this.isAuth = false)
      console.log(this.isAuth)
    }
  }
})
