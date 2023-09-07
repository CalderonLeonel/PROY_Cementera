<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <center>
        <v-toolbar color="#00A1B1" dark>

          <v-col class="d-flex justify-space-around">
            <v-toolbar-title>ERP</v-toolbar-title>
          </v-col>

        </v-toolbar>
      </center>
      <v-list>

        <v-list-item>
          <v-list-item-content>
            <center>
              <v-list-item-title class="text-h6">
                ERP
              </v-list-item-title>
              <v-list-item-subtitle>HOLA</v-list-item-subtitle>
            </center>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>

        <v-list-group no-action color="#00A1B1" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-package</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>SCM</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Productos' }">
            <v-list-item-title>
              <h6>PRODUCTOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Lineas' }">
            <v-list-item-title>
              <h6>LINEAS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Formatos' }">
            <v-list-item-title>
              <h6>FORMATOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Tipos' }">
            <v-list-item-title>
              <h6>TIPOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Fabricas' }">
            <v-list-item-title>
              <h6>FABRICAS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Movimientos' }">
            <v-list-item-title>
              <h6>MOVIMIENTOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Produccion' }">
            <v-list-item-title>
              <h6>PRODUCCION</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-point-of-sale</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>VENTAS</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Ventas' }">
            <v-list-item-title>
              <h6>VENTAS</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>CLIENTES</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Clientes' }">
            <v-list-item-title>
              <h6>Clientes</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-package</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>RRHH</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Empleados' }">
            <v-list-item-title>
              <h6>EMPLEADOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Cargos' }">
            <v-list-item-title>
              <h6>CARGOS</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar color="#00A1B1" app>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer">

      </v-app-bar-nav-icon>

      <v-btn class="mx-2" fab dark x-small color="#00A1B1" @click="salir()" style="float:right;" title="CERRAR SESSION">
        <v-icon dark>
          mdi-door-closed-lock
        </v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <v-footer color="#00A1B1" padless>
      <v-row justify="center" no-gutters>

        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>ERP DRYMIX</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    user: { usuario: '', id_cargo: '', nombres: '' }
  }),
  components: {
    // Empleado_cv
  },
  computed: {
    logueado() {

      this.user = JSON.parse(sessionStorage.getItem('session'));

      return this.user;


    }
  }, created: function () {

    this.user = JSON.parse(sessionStorage.getItem('session'));
    //this.user.dispath("autologin");
    if (this.user == null) {
      this.$router.push("/login");
    }
  },
  methods: {
    salir() {
      sessionStorage.clear();
      this.user = {};
      this.$router.push("/login");
    }
  }
}
</script>






