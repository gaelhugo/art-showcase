import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

console.log('Starting Vue app...')
const app = createApp(App)
console.log('Vue app created:', app)
app.mount('#app')
console.log('Vue app mounted to #app')
