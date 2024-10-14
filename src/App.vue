<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <center>
        <v-toolbar color="#00A1B1" dark>
          <v-col cols="4">
            <v-img src="./assets/logo192.png"></v-img>
          </v-col>
          <v-col cols="8">
            <v-toolbar-title><b>ERP Drymix</b></v-toolbar-title>
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

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(1, '0')">
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
          <v-list-item :to="{ name: 'Transporte' }">
            <v-list-item-title>
              <h6>TRANSPORTE</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Materia' }">
            <v-list-item-title>
              <h6>MATERIA PRIMA</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(2, '0')">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-test-tube</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>LABORATORIO</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Laboratorio' }">
            <v-list-item-title>
              <h6>NUEVO PRODUCTO</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(2, '0')">
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

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(3, '0')">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>REPORTES</v-list-item-title>
            </v-list-item-content>
          </template>
        
          <v-list-item :to="{ name: 'Reportes' }">
            <v-list-item-title>
              <h6>REPORTES</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(2, '0')">
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

        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(5, '0')">
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
          <v-list-item :to="{ name: 'Alerta' }">
            <v-list-item-title>
              <h6>ALERTAS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Cargos' }">
            <v-list-item-title>
              <h6>CARGOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Turnos' }">
            <v-list-item-title>
              <h6>TURNOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Unidades' }">
            <v-list-item-title>
              <h6>UNIDADES</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Areas' }">
            <v-list-item-title>
              <h6>AREAS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Departamentos' }">
            <v-list-item-title>
              <h6>DEPARTAMENTOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Solicitudes' }">
            <v-list-item-title>
              <h6>SOLICITUDES DE PERSONAL</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(6, '0')">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>USUARIOS</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item :to="{ name: 'Usuarios' }">
            <v-list-item-title>
              <h6>CUENTAS</h6>
            </v-list-item-title>
          </v-list-item>
          /// Creo que esto hay doble, desaparece el de arriba porque no se tiene acceso a produccion o no se loguearon
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

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(2, '0')">
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

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(2, '0')">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>REPORTES</v-list-item-title>
            </v-list-item-content>
          </template>
        
          <v-list-item :to="{ name: 'Reportes' }">
            <v-list-item-title>
              <h6>REPORTES</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      
        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(2, '0')">
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
          <v-list-item :to="{ name: 'Alerta' }">
            <v-list-item-title>
              <h6>ALERTAS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Cargos' }">
            <v-list-item-title>
              <h6>CARGOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Turnos' }">
            <v-list-item-title>
              <h6>TURNOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Unidades' }">
            <v-list-item-title>
              <h6>UNIDADES</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Areas' }">
            <v-list-item-title>
              <h6>AREAS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Departamentos' }">
            <v-list-item-title>
              <h6>DEPARTAMENTOS</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
       
        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(2, '0')">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>USUARIOS</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item :to="{ name: 'Usuarios' }">
            <v-list-item-title>
              <h6>CUENTAS</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(2, '0')">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-wallet-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>CONTABILIDAD</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'Contabilidad' }">
            <v-list-item-title>
              <h6>CONTABILIDAD</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(7, '0')">
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

          <v-list-item :to="{ name: 'Proveedor' }" v-if="checkAccess(7, 'SUPERVISOR')">
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
        
        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(8, '0')">
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
          <v-list-item :to="{ name: 'Almacen' }" v-if="checkAccess(8, 'SUPERVISOR')">
            <v-list-item-title>
              <h6>ALMACEN</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(9, '0')">
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
          <v-list-item :to="{ name: 'ArchivosEmpleado' }" v-if="checkAccess(9, 'SUPERVISOR') || checkAccess(9, 'GERENTE')">
            <v-list-item-title>
              <h6>DOCUMENTOS DE PERSONAL</h6>
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
    user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' }
  }),
  components: {
    // Empleado_cv
  },
  computed: {
    logueado() {
      if (this.user != null) {
        this.user = JSON.parse(sessionStorage.getItem('session'));
      }
      return this.user;
    }
  }, created: function () {

    if (this.user != null) {
      this.user = JSON.parse(sessionStorage.getItem('session'));
    }
    if (this.user == null) {
      if (this.$route.path != '/login') {
        this.$router.push("/login");
      }
    }
    console.log("UserData: " + JSON.stringify(this.user));
  },
  methods: {
    checkAccess(accesoCorrecto, tipoCorrecto) {
      //this.user = JSON.parse(sessionStorage.getItem('session'));
      if (this.user == null) {
        return false;
      }
      else {
        let checkedAccess = false;
        let checkedType = false;
        //Si accesoCorrecto es 0, no se requiere ningun acceso para acceder
        if (accesoCorrecto != 0) {
          this.user['accesos'].forEach(access => {
            if (access == accesoCorrecto)
              checkedAccess = true;
          });
        } else checkedAccess = true;

        //Si tipoCorrecto es '0', no se requiere ningun tipo de cuenta para acceder
        if (tipoCorrecto != '0') {
          if (this.user['tipo'] == tipoCorrecto) {
            checkedType = true;
          }
        } else checkedType = true;
        if (checkedAccess && checkedType) { return true }
        else return false;
      }

    },
    salir() {
      sessionStorage.clear();
      this.user = null;
      if (this.$route.path != '/login') {
        this.$router.push("/login");
      }
    }
  }
}
</script>






