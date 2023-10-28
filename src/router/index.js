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
    name: 'Login',
    component: require('../components/Login.vue').default
  },
  {
    path: '/cargos',
    name: 'Cargos',
    component: require('../components/Cargo.vue').default
  },
  {
    path: '/empleados',
    name: 'Empleados',
    component: require('../components/Empleado.vue').default
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: require('../components/Reportes.vue').default
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
