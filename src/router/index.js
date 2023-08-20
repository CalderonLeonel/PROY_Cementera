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
    path: 'proveedor',
    name: 'Proveedor',
    component: () => import('@/components/Proveedor.vue'),
  },
  {
    path: 'almacen',
    name: 'Almacen',
    component: () => import('@/components/Almacen.vue'),
  },
  {
    path: 'inventario',
    name: 'Inventario',
    component: () => import('@/components/Inventario.vue'),
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
