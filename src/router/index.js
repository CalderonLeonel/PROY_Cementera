import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../components/Login.vue'
//import Reporte1 from '../components/Reporte1.vue'


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
    path: '/productos',
    name: 'Productos',
    component: require('../components/Productos.vue').default
  },
  {
    path: '/lineas',
    name: 'Lineas',
    component: require('../components/Lineas.vue').default
  },
  {
    path: '/formatos',
    name: 'Formatos',
    component: require('../components/Formatos.vue').default
  },
  {
    path: '/tipos',
    name: 'Tipos',
    component: require('../components/TipoProductos.vue').default
  },
  {
    path: '/fabricas',
    name: 'Fabricas',
    component: require('../components/Fabrica.vue').default
  },
  {
    path: '/movimientos',
    name: 'Movimientos',
    component: require('../components/Movimiento.vue').default
  },
  {
    path: '/produccion',
    name: 'Produccion',
    component: require('../components/Produccion.vue').default
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: require('../components/Ventas.vue').default
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: require('../components/Clientes.vue').default
  },
  {
    path: '/contabilidad',
    name: 'Contabilidad',
    component: require('../components/Contabilidad.vue').default
  },
  {
    path: '/transporte',
    name: 'Transporte',
    component: require('../components/Transporte.vue').default
  },
  {
    path: '/laboratorio',
    name: 'Laboratorio',
    component: require('../components/Laboratorio.vue').default
  },
  {
    path: '/materia',
    name: 'Materia',
    component: require('../components/MateriasPrimas.vue').default
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
