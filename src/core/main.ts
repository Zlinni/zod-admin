import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import '@core/router/permit'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'iconify-icon'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './server/mockRequest'
import './style/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(VueApexCharts)
app.mount('#app')
