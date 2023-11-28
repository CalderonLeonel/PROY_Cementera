import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: require(/* webpackChunkName: "about" */ "../views/Home.vue")
      .default,
    //component: Login
  },
  {
    path: "/login",
    name: "Login",
    component: require("../components/Login.vue").default,
  },
  {
    path: "/productos",
    name: "Productos",
    component: require("../components/Productos.vue").default,
  },
  {
    path: "/lineas",
    name: "Lineas",
    component: require("../components/Lineas.vue").default,
  },
  {
    path: "/formatos",
    name: "Formatos",
    component: require("../components/Formatos.vue").default,
  },
  {
    path: "/tipos",
    name: "Tipos",
    component: require("../components/TipoProductos.vue").default,
  },
  {
    path: "/fabricas",
    name: "Fabricas",
    component: require("../components/Fabrica.vue").default,
  },
  {
    path: "/moviminetos",
    name: "Movimientos",
    component: require("../components/Movimiento.vue").default,
  },
  {
    path: "/produccion",
    name: "Produccion",
    component: require("../components/Produccion.vue").default,
  },
  {
    path: "/ventas",
    name: "Ventas",
    component: require("../components/Ventas.vue").default,
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: require("../components/Clientes.vue").default,
  },
  {
    path: "/cargos",
    name: "Cargos",
    component: require("../components/Cargo.vue").default,
  },
  {
    path: "/empleados",
    name: "Empleados",
    component: require("../components/Empleado.vue").default,
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: require('../components/Reportes.vue').default
  },
  {
    path: "/turnos",
    name: "Turnos",
    component: require("../components/Turno.vue").default,
  },
  {
    path: "/unidades",
    name: "Unidades",
    component: require("../components/Unidad.vue").default,
  },
  {
    path: "/areas",
    name: "Areas",
    component: require("../components/Area.vue").default,
  },
  {
    path: "/departamentos",
    name: "Departamentos",
    component: require("../components/Departamento.vue").default,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: require("../components/Usuario.vue").default,
  },
  {
    path: "proveedor",
    name: "Proveedor",
    component: () => import("@/components/Proveedor.vue"),
  },
  {
    path: "almacen",
    name: "Almacen",
    component: () => import("@/components/Almacen.vue"),
  },
  {
    path: "inventario",
    name: "Inventario",
    component: () => import("@/components/Inventario.vue"),
  },
  {
    path: "almacenamiento",
    name: "Almacenamiento",
    component: () => import("@/components/Almacenamiento.vue"),
  },
  {
    path: "adquisicion",
    name: "Adquisicion",
    component: () => import("@/components/Adquisicion.vue"),
  },
  {
    path: "archivos",
    name: "Archivos",
    component: () => import("@/components/Archivos.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
