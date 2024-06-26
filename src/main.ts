/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Icon from '@/components/common/Icon.vue'
import ToastService from 'primevue/toastservice'
import store from './store'
// import 'dotenv/config'

const app = createApp(App)

app.component('InputText', InputText)
app.component('Button', Button)
app.component('Icon', Icon)

app.use(PrimeVue)
app.use(ToastService)
app.use(store)
app.use(router)
app.mount('#app')
