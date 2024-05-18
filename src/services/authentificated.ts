import router from '../router'

export default class Authenticated {
  public static get(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true'
  }
  public static set(value: boolean = true) {
    localStorage.setItem('isAuthenticated', value.toString())
  }
  public static redirectToMain(): void {
    this.set()
    router.push('/')
  }
}
