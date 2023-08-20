import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:require(/* webpackChunkName: "about" */ '../views/Home.vue').default
    //component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: require('../components/Login.vue').default
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
