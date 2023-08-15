/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import axios from 'axios'
import VueAxios from 'vue-axios'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

axios.defaults.baseURL='http://localhost:3000/'
//axios.defaults.baseURL='http://216.158.233.122:3009/'
//axios.defaults.baseURL='http://192.168.1.10:3000/'
