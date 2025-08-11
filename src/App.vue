<template>
  <v-app>

    <v-dialog v-model="loginModal" max-width="1000px" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">INICIAR SESIÓN</v-card-title>
        <v-card-text>
          <Login @close-modal="loginModal = false" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" iconv dark color="#BF120A"
          @click="loginModal = false" style="float: right"
                                        title="CANCELAR">                                      
                                        CANCELAR
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer v-if="logueado" v-model="drawer" app>
      <center>
        <v-toolbar color="#00A1B1" dark>
          <v-col cols="3">
               <v-avatar size="56" class="ml-4">
                <v-img
                  style="background-color: white;"
                  src="./assets/logo192.png"
                  alt="Logo Drymix"
                  cover
                />
              </v-avatar>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="6">

            <v-toolbar-title><b>Drymix</b></v-toolbar-title>

          </v-col>

        </v-toolbar>
      </center>
      <v-list>

        <v-list-item>
          <v-list-item-content>
            <center>
              <v-list-item-title class="text-h6">

                {{ logueado.nombres + ' ' + logueado.paterno + ' ' + logueado.materno }}

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
              <v-list-item-title>PRODUCCION</v-list-item-title>
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
              <h6>TIPOS DE PRODUCTOS</h6>
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
          <!--
          <v-list-item :to="{ name: 'Transporte' }">
            <v-list-item-title>
              <h6>TRANSPORTE</h6>
            </v-list-item-title>
          </v-list-item>
          -->
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

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(3, '0')">
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
          <v-list-item :to="{ name: 'RegistroVentas' }">
            <v-list-item-title>
              <h6>REGISTRO DE VENTAS</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(4, '0')">
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
              <h6>CLIENTES</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(5, '0')">
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



        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(6, '0')">
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
          <v-list-item :to="{ name: 'Asistencias' }">
            <v-list-item-title>
              <h6>ASISTENCIA</h6>
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
          <v-list-item :to="{ name: 'Unidades' }" v-if="checkAccess(0, 'GERENTE')">
            <v-list-item-title>
              <h6>UNIDADES</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Areas' }" v-if="checkAccess(0, 'GERENTE')">
            <v-list-item-title>
              <h6>AREAS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Departamentos' }" v-if="checkAccess(0, 'GERENTE')">
            <v-list-item-title>
              <h6>DEPARTAMENTOS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Carnet' }">
            <v-list-item-title>
              <h6>CARNET</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Solicitudes' }">
            <v-list-item-title>
              <h6>SOLICITUDES DE PERSONAL</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(7, '0')">

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
              <h6>CUENTAS DE USUARIO</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="#00A1B1" value="true" v-if="checkAccess(8, '0')">
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

          <v-list-item :to="{ name: 'Departamento' }">
            <v-list-item-title>
              <h6>CONT. DE DEPATAMENTOS</h6>
            </v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Planilla' }">
            <v-list-item-title>
              <h6>PAGOS</h6>
            </v-list-item-title>
          </v-list-item>

        </v-list-group>

        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(9, '0')">
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

          <v-list-item :to="{ name: 'Proveedor' }" v-if="checkAccess(9, 'SUPERVISOR') || checkAccess(9, 'GERENTE')">
            <v-list-item-title>
              <h6>PROVEEDOR</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Adquisicion' }">
            <v-list-item-title>
              <h6>ADQUISICIONES</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'AprobarAdquisicion' }">
            <v-list-item-title>
              <h6>REVISAR ADQUISICIONES</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        
        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(10, '0') || checkAccess(10, 'GERENTE')">
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
          <v-list-item :to="{ name: 'Stock' }">
            <v-list-item-title>
              <h6>STOCK</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Item' }">
            <v-list-item-title>
              <h6>ITEMS</h6>
            </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Almacen' }" v-if="checkAccess(10, 'SUPERVISOR') || checkAccess(10, 'GERENTE')">
            <v-list-item-title>
              <h6>ALMACEN</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action color="light-blue darken-4" value="true" v-if="checkAccess(11, '0') || checkAccess(11, 'GERENTE')">
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
          <v-list-item :to="{ name: 'ArchivosEmpleado' }" v-if="checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
            <v-list-item-title>
              <h6>DOCUMENTOS DE PERSONAL</h6>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar color="#00A1B1" app>
      <v-app-bar-nav-icon  v-if="logueado" color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn v-if="logueado" class="mx-6"  dark x-medium color="#007B88" @click="salir()" style="float:left;" variant="text"
       title="CERRAR SESIÓN">
        <v-icon dark>mdi-door-closed-lock</v-icon>
        CERRAR SESIÓN
      </v-btn>
      <v-btn v-if="!logueado" class="mx-6"  dark x-medium color="#007B88" @click="openLoginModal()" style="float:left;" variant="text"
        title="INICIAR SESIÓN"> 
        <v-icon dark>mdi-account</v-icon>
        INICIAR SESIÓN
      </v-btn>
    </v-app-bar>

    <v-main v-if="logueado">
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <!-- Vista principal para cuando el usuario no está logueado -->
    <v-main v-else>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>

      </v-container>
    </v-main>
    
    

    <v-footer color="#00A1B1" padless>
      <v-row justify="center" no-gutters>

        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>DRYMIX</strong>
        </v-col>
      </v-row>
    </v-footer>

  </v-app>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'App',
  data: () => ({
    loginModal: false,
    drawer: false,
    user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '', id_fabrica: 0, }
  }),
  components: {
    Login
  },
  computed: {
    logueado() {
      if (this.user != null) {
        this.user = JSON.parse(sessionStorage.getItem('session'));
      }
      return this.user;
    }
  },
  created: function () {

    if (this.user != null) {
      this.user = JSON.parse(sessionStorage.getItem('session'));
    }

    console.log("UserData: " + JSON.stringify(this.user));
  },
  methods: {
    openLoginModal() {
      this.loginModal = true;
    },

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
      if (this.$route.path != '/') {
        this.$router.push("/");
      }
    },
  }
}
</script>