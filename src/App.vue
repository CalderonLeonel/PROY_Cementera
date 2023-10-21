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
              <v-list-item-subtitle></v-list-item-subtitle>
            </center>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-group no-action color="light-blue darken-4" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-package</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>SCM</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Proveedor' }">
            <v-list-item-title>
              <h6>PRODUCTOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Proveedor' }">
            <v-list-item-title>
              <h6>LINEAS</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group no-action color="light-blue darken-4" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>
                mdi-receipt-text
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ADQUISICIONES</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Proveedor' }">
            <v-list-item-title>
              <h6>PROVEEDOR</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Adquisicion' }">
            <v-list-item-title>
              <h6>ADQUISICIONES</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group no-action color="light-blue darken-4" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>
                mdi-content-paste
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>INVENTARIOS Y ALMACENAMIENTO</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Inventario' }">
            <v-list-item-title>
              <h6>INVENTARIO</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Almacen' }">
            <v-list-item-title>
              <h6>ALMACEN</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Almacenamiento' }">
            <v-list-item-title>
              <h6>ALMACENAMIENTO</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="light-blue darken-4" value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>
                mdi-file-multiple
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ARCHIVOS</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Archivos' }">
            <v-list-item-title>
              <h6>GESTIÓN DE DOCUMENTOS</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        
        
      </v-list>

    </v-navigation-drawer>

    <v-app-bar color="#00A1B1" app>
      <v-app-bar-nav-icon color="black" @click="drawer = !drawer">

      </v-app-bar-nav-icon>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>

        <v-col class="light-blue darken-4 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>ERP DRYMIX</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  }
};
</script>






