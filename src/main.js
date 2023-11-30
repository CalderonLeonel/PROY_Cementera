import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

Vue.use(VueAxios,axios);

axios.defaults.baseURL='http://34.121.212.171:3000/' //'http://192.168.0.4:3000/'
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
