import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tooltip from 'primevue/tooltip'
import Icon from '@/components/common/Icon.vue'

const app = createApp(App)

app.component('InputText', InputText)
app.component('Button', Button)
app.component('Tooltip', Tooltip)
app.component('Icon', Icon)

app.use(router)

app.mount('#app')
