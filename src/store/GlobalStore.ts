import { apiRoot } from '@/services/anonymousToken'
import axios from 'axios'
import { defineStore } from 'pinia'
import { Buffer } from 'buffer'

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY
const clientId = import.meta.env.VITE_CTP_CLIENT_ID
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET
const authUri = `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/ecommerceapplication/anonymous/token`
const scope = `${import.meta.env.VITE_CTP_SCOPES}`

interface State {
  isAuth: boolean
  anonymousToken: string
  token: string | null
}

export const useGlobalStore = defineStore('globalStore', {
  state: (): State => ({
    isAuth: false,
    anonymousToken: '',
    token: ''
  }),
  actions: {
    async getToken() {
      try {
        const authPayload = new URLSearchParams()
        authPayload.append('grant_type', 'client_credentials')
        authPayload.append('scope', scope)

        const authResponse = await fetch(authUri, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: authPayload
        })

        if (!authResponse.ok) {
          throw new Error(`Authentication failed: ${authResponse.statusText}`)
        }

        const authData = await authResponse.json()
        // console.log('Anonymous token:', authData.access_token)
        this.anonymousToken = authData.access_token
        // this.checkAuth()
        return authData.access_token
      } catch (error) {
        console.error('Error obtaining anonymous token:', error)
        throw error
      }
    },
    checkAuth() {
      localStorage.getItem('accessToken') ? (this.isAuth = true) : (this.isAuth = false)
      localStorage.getItem('accessToken')
        ? (this.token = localStorage.getItem('accessToken'))
        : (this.token = this.anonymousToken)
    }
  }
})
