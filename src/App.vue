<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <center>
        <v-toolbar color="blue" dark>

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

          <v-list-item :to="{ name: 'Productos' }">
            <v-list-item-title>
              <h5>PRODUCTOS</h5>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: '' }">
            <v-list-item-title>
              <h5>LINEAS</h5>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Menú Lateral</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
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






