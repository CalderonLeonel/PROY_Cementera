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
  },
  {
    path: 'almacenamiento',
    name: 'Almacenamiento',
    component: () => import('@/components/Almacenamiento.vue'),
  },
  {
    path: 'adquisicion',
    name: 'Adquisicion',
    component: () => import('@/components/Adquisicion.vue'),
  },
  {

    path: 'archivos',
    name: 'Archivos',
    component: () => import('@/components/Archivos.vue'),
  },

  {
    path: "/alertas",
    name: "Alertas",
    component: require("../components/Alerta.vue").default,
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
