<template>
  <v-card elevation="5" outlined shaped>
    <v-dialog v-model="tpostModal" max-width="600"> <!-- Modal Cargo-->
      <v-card elevation="5" outlined shaped>
        <v-card-title>
          <span>
            <h5>TIPO DE EMPLEADO</h5>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card-title>
                  <v-text-field v-model="searchtpost" append-icon="mdi-magnify" label="BUSCAR TIPO DE EMPLEADO"
                    single-line hide-details></v-text-field>
                </v-card-title>
              </v-col>

              <v-col cols="12">
                <v-data-table :headers="headerstpost" :items="datostempleado" :search="searchtpost" :items-per-page="5"
                  class="elevation-1" id="tableId">
                  <template #[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="seleccionarTpost(item)">
                      mdi-check-circle
                    </v-icon>
                  </template>
                </v-data-table>


              </v-col>
              <v-col cols="10"> </v-col>
              <v-col cols="2">
                <v-btn class="mx-2" fab dark small color="red darken-1" @click="closeTpost" style="float: right"
                  title="SALIR">
                  <v-icon dark> mdi-close-circle-outline </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editarEmpleadoModal" max-width="1000px"> <!-- Modal EDITAR EMPLEADO-->
      <v-card elevation="5" outlined shaped>
        <v-card-title>
          <span>
            <h5>TIPO DE EMPLEADO</h5>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="nombre" :counter="50" :rules="nombreRules"
                        @input="nombre = nombre.toUpperCase()" label="NOMBRE DE EMPLEADO" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="paterno" :counter="50" :rules="paternoRules"
                        @input="paterno = paterno.toUpperCase()" label="APELLIDO PATERNO" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="materno" :counter="50" :rules="maternoRules"
                        @input="materno = materno.toUpperCase()" label="APELLIDO MATERNO"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="email" :counter="50" :rules="emailRules" @input="email = email.toUpperCase()"
                        label="CORREO ELECTRONICO"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="ci" :counter="50" :rules="ciRules" @input="ci = ci.toUpperCase()"
                        label="NUMERO DE CARNET"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field type="number" v-model="telefono" :rules="telefonosRules"
                        @input="telefono = telefono.toUpperCase()" label="TELEFONO" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="2"> </v-col>
                    <v-col cols="12" md="1">
                      <v-btn class="mx-2" fab dark x-small color="#EE680B" @click="showCargo()" style="float: right"
                        title="BUSCAR CARGO">
                        <v-icon dark> mdi-gesture-double-tap </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="cargo" :counter="30" :rules="nombreRules" label="CARGO" disabled
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="2"> </v-col>
                    <v-col cols="12" md="1">
                      <v-btn class="mx-2" fab dark x-small color="#EE680B" :rules="direccionRules"
                        @click="showTpostulante()" style="float: right" title="BUSCAR TIPO DE EMPLEADO">
                        <v-icon dark> mdi-gesture-double-tap </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="tpost" :counter="30" :rules="numeroRules" label="TIPO DE EMPLEADO" disabled
                        required></v-text-field>
                    </v-col>


                    <v-col cols="12" md="9"> </v-col>
                    <v-col cols="12" md="3">
                      <v-toolbar dense shaped color="#002245">
                        <v-toolbar-title style="color:#ffffff">
                          <h6>OPCIONES</h6>
                        </v-toolbar-title>

                        <v-btn v-if="botonAct == 1" class="mx-2" fab dark x-small color="#EE680B"
                          @click=actualizarEmpleado() style="float: left" title="ACTUALIZAR INFORMACIÓN">
                          <v-icon dark> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn variant="outlined" v-if="botonAct == 0" class="mx-2" fab dark x-small color="#EE680B"
                          @click=regempleado() style="float: left" title="REGISTRAR EMPLEADO">
                          <v-icon dark> mdi-content-save-plus-outline </v-icon>
                        </v-btn>
                        <v-btn variant="outlined" class="mx-2" fab dark x-small color="#EE680B" @click="limpiar()"
                          style="float: left" title="LIMPIAR FORMULARIO">
                          <v-icon dark> mdi-eraser </v-icon>
                        </v-btn>

                      </v-toolbar>
                    </v-col>
                    <v-col cols="12" md="1"> </v-col>
                    <v-col cols="12" md="1"> </v-col>
                    <v-col cols="12" md="9">

                    </v-col>

                    <div class="text-center">
                      <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                        <strong>{{ mensajeSnackbar }}</strong>


                        <template v-slot:action="{ attrs }">
                          <v-icon right v-bind="attrs" @click="snackbarOK = false">
                            mdi-close
                          </v-icon>
                        </template>nivel
                      </v-snackbar>
                    </div>
                    <div class="text-center">

                      <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B"
                        outlined>
                        <strong>{{ mensajeSnackbarError }}</strong>

                        <template v-slot:action="{ attrs }">
                          <v-icon right v-bind="attrs" @click="snackbarError = false">
                            mdi-close
                          </v-icon>
                        </template>
                      </v-snackbar>
                    </div>

                  </v-row>
                </v-container>
              </v-form>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

    </v-dialog>

    <div> <!-- ENCABEZADO -->
      <v-alert dense color="#00A1B1" style="color: #ffffff">
        <h5>EMPLEADOS</h5>
      </v-alert>
    </div>
    
    <div> <!-- CREAR EMPLEADO-->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="nombre" :counter="50" :rules="nombreRules" @input="nombre = nombre.toUpperCase()"
                label="Nombre del Empleado" required></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field v-model="paterno" :counter="50" :rules="paternoRules" @input="paterno = paterno.toUpperCase()"
                label="Apellido Paterno" required></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field v-model="materno" :counter="50" :rules="maternoRules" @input="materno = materno.toUpperCase()"
                label="Apellido Materno"></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field v-model="email" :counter="50" :rules="emailRules" @input="email = email.toUpperCase()"
                label="Correo Electrónico"></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field v-model="ci" :counter="50" :rules="ciRules" @input="ci = ci.toUpperCase()"
                label="Número de Carnet"></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field type="number" v-model="telefono" :rules="telefonosRules"
                @input="telefono = telefono.toUpperCase()" label="Teléfono"></v-text-field>
            </v-col>
            <!-- CARGO BOTON SHOW MODAL -->
            <v-col cols="12" md="1">
              <v-btn class="mx-2" fab dark x-small color="cyan" @click="showCargo()" style="float: right"
                title="BUSCAR CARGO">
                <v-icon dark> mdi-gesture-double-tap </v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="cargo" :counter="30" :rules="nombreRules" label="CARGO1" disabled
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="3"> </v-col>
            <v-col cols="12" md="2"> </v-col>
            <v-col cols="12" md="1">
              <v-btn class="mx-2" fab dark x-small color="#EE680B" :rules="direccionRules" @click="showTpostulante()"
                style="float: right" title="BUSCAR TIPO DE EMPLEADO">
                <v-icon dark> mdi-gesture-double-tap </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="tpost" :counter="30" :rules="numeroRules" label="TIPO DE EMPLEADO" disabled
                required></v-text-field>
            </v-col>


            <v-col cols="12" md="9"> </v-col>
            <v-col cols="12" md="3">
              <v-toolbar dense shaped color="#002245">
                <v-toolbar-title style="color:#ffffff">
                  <h6>OPCIONES</h6>
                </v-toolbar-title>

                <v-btn v-if="botonAct == 1" class="mx-2" fab dark x-small color="#EE680B" @click=actualizarEmpleado()
                  style="float: left" title="ACTUALIZAR INFORMACIÓN">
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
                <v-btn variant="outlined" v-if="botonAct == 0" class="mx-2" fab dark x-small color="#EE680B"
                  @click=regempleado() style="float: left" title="REGISTRAR EMPLEADO">
                  <v-icon dark> mdi-content-save-plus-outline </v-icon>
                </v-btn>
                <v-btn variant="outlined" class="mx-2" fab dark x-small color="#EE680B" @click="limpiar()"
                  style="float: left" title="LIMPIAR FORMULARIO">
                  <v-icon dark> mdi-eraser </v-icon>
                </v-btn>

              </v-toolbar>
            </v-col>









            <v-col cols="12" md="1"> </v-col>
            <v-col cols="12" md="1"> </v-col>
            <v-col cols="12" md="9">

              <v-col cols="12">
                <v-list-item>
                  <v-list-item-title class="text-center">
                    <h5>EMPLEADOS</h5>
                  </v-list-item-title>
                </v-list-item>

                <v-card-title>
                  <v-text-field v-model="searchEmpleado" append-icon="mdi-magnify" label="BUSCAR EMPLEADO" single-line
                    hide-details></v-text-field>
                </v-card-title>

                <v-data-table :headers="headersEmpleados" :items="datosEmpleados" :search="searchEmpleado"
                  :items-per-page="5" class="elevation-1" id="tableId">

                  <template #[`item.act`]="{ item }">
                    <v-chip :color="getColor(item.act)" dark>
                      {{ item.act }}
                    </v-chip>
                  </template>

                  <!-- ACCIONES DE LOS DATOS DE TABLA EMPLEADO-->
                  <template #[`item.actions`]="{ item }">
                    <v-icon v-if="item.est == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                      title="ACTIVAR EMPLEADO">
                      mdi-check-circle-outline
                    </v-icon>
                    <v-icon v-if="item.est == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                      title="DESACTIVAR EMPLEADO">
                      mdi-cancel
                    </v-icon>
                    <v-icon small class="mr-2" @click="ShowModalEditarEmpleado(item)" title="ACTUALIZAR INFORMACION">
                      mdi-pencil
                    </v-icon>
                    <!--v-icon small class="mr-2" @click="seleccionarDelPublicacion(item)" title="ELIMINAR INFORMACION">
                        mdi-check-circle-outline
                      </v-icon-->

                  </template>



                </v-data-table>
              </v-col>
            </v-col>

            <div class="text-center">
              <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                <strong>{{ mensajeSnackbar }}</strong>


                <template v-slot:action="{ attrs }">
                  <v-icon right v-bind="attrs" @click="snackbarOK = false">
                    mdi-close
                  </v-icon>
                </template>nivel
              </v-snackbar>
            </div>
            <div class="text-center">

              <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                <strong>{{ mensajeSnackbarError }}</strong>

                <template v-slot:action="{ attrs }">
                  <v-icon right v-bind="attrs" @click="snackbarError = false">
                    mdi-close
                  </v-icon>
                </template>
              </v-snackbar>
            </div>

          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-card>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { async } from "regenerator-runtime";
var XLSX = require("xlsx");

export default {
  data: () => ({
    idempleado: "",
    nombreEmpleado: "",
    paterno: "",
    materno: "",
    email: "",
    fecha_nacimiento: "",
    ci: "",
    telefono: "",
    estado: "",
    fecha_creacion: "",
    fecha_update: "",

    botonAct: 0,
    compromisoModal: 0,
    searchEmpleado: "",

    id_empleado: "",
    cargo: "",
    cargoModal: 0,
    datostbloque: [],

    gestionModal: 0,
    searchcarrera: "",
    datoscarrera: [],

    editarEmpleadoModal: 0,
    headersEmpleados: [
      { text: "NOMBRE DE EMPLEADO", value: "nom", sortable: false },
      { text: "TIPO DE EMPLEADO", value: "pat", sortable: false },
      { text: "NOMBRE EMPLEADO", value: "mat", sortable: false },
      { text: "TELEFONO", value: "emal", sortable: false },
      { text: "FECHA NACIMIENTO", value: "nacdte", sortable: false },
      { text: "MUERO DE CARNET", value: "ci", sortable: false },
      { text: "TELEFONO", value: "tel", sortable: false },
      { text: "ESTADO", value: "est", sortable: false },
      { text: "FECHA CREACION", value: "crdte", sortable: false },
      { text: "OPCIONES", value: "actions", sortable: false },
    ],


    snackbarOK: false,
    mensajeSnackbar: "",
    snackbarError: false,
    mensajeSnackbarError: "REGISTRO FALLIDO ",
    timeout: 2000,


    headerstpost: [
      { text: "TIPO DE EMPLEADO", value: "tipo", sortable: true },
      { text: "OPCIONES", value: "actions", sortable: false },
    ],
    datospostreg: [],

    nombreRules: [
      (v) => !!v || "NOMBRE DE EMPLEADO ES REQUERIDO",
      (v) =>
        (v && v.length <= 50) ||
        "EL NOMBRE DE EMPLEADO DEBE TENER 30 CARACTERES COMO MAXIMO",
    ],
    paternoRules: [
      (v) => !!v || "APELLIDO ES REQUERIDO",
      (v) => (v && v.length <= 50) || "",
    ],
    maternoRules: [
      (v) => !!v || "SEGUNDO APELLIDO ES REQUERIDO",
      (v) => (v && v.length <= 50) || "",
    ],
    cargoRules: [
      (v) => !!v || "CARGO ES REQUERIDO",
      (v) => (v && v.length <= 50) || "",
    ],
    empleadoRules: [
      (v) => !!v || "EMPLEADO ES REQUERIDO",
      (v) => (v && v.length <= 50) || "",
    ],
    ciRules: [
      (v) => !!v || "NUMERO DE CARNET ES REQUERIDO",
      (v) => (v && v.length <= 50) || "",
    ],
    numeroRules: [
      (v) => !!v || "TIPO DE EMPLEADO ES REQUERIDO",
      (v) => (v && v.length <= 50) || "",
    ],
    fechanaciRules: [
      (value) => !!value || "INGRESE UNA FECHA",
      (v) => !!v || "FECHA DE NACIMIENTO ES REQUERIDO",
    ],
    
    emailRules: [
      (v) => !!v || "EL E_MAIL DEL POSTULANTE ES REQUERIDO",
      (v) => /.+@.+\..+/.test(v) || "E-mail DEBE SER VALIDO",
    ],
    direccionRules: [
      (v) => !!v || "DESCRIPCION DEL POSTULANTE ES REQUERIDO",
      (v) =>
        (v && v.length <= 100) ||
        "LA DESCRIPCION DEL EMPLEADO DEBE TENER 100 CARACTERES COMO MAXIMO",
    ],
    telefonosRules: [
      (v) => !!v || "TELEFONO DE EMPLEADO ES REQUERIDO",

    ],

    select: null,
    search: "",
    datosEmpleados: [],
    searchcargo: "",/*
    headersbloque: [

      { text: "CARGOS", value: "bloque", sortable: false },
      { text: "DESCRIPCION", value: "dir", sortable: false },
      { text: "OPCIONES", value: "actions", sortable: false },
    ],*/
    checkbox: false,
  }),

  created: function () {
    //this.listartipoempleado();
    this.user = JSON.parse(sessionStorage.getItem("session"));
    //this.usuario = this.user.personal;
    //this.sede = this.user.sede;
    //this.nomus = this.user.nombres + " " + this.user.paterno + " " + this.user.materno;
    this.listarEmpleados();

  },

  methods: {
    activar(item) {
      this.idEmpleado = item.idempleado;
      this.activarempleado(this.idEmpleado);
    },
    /*
    async activarempleado(idTpEmpleado) {
      let me = this;
      await axios
        .post("/empleado/onempleado/" + this.idEmpleado).then(function (response) {

          me.listarEmpleados();
        })
        .catch(function (error) {
          console.log(error);
        });

    },*/
    desactivar(item) {
      this.idEmpleado = item.idempleado;
      this.desactivarempleado(this.idEmpleado);
    },
    async desactivarempleado(idTpEmpleado) {
      let me = this;
      await axios
        .post("/empleado/offempleado/" + this.idEmpleado).then(function (response) {

          me.listarEmpleados();
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    getColor(est) {
      if (est == 'ACTIVO') return 'green'
      else return 'red'
    },

    ShowModalEditarEmpleado(item) {
      this.botonAct = 1;
      this.editarEmpleadoModal = true;
      this.idEmpleado = item.idempl;
      this.nombreEmpleado = item.nom;
      this.paterno = item.pat;
      this.materno = item.mat;
      this.email = item.emal;
      this.fecha_nacimiento = item.nacdte;
      this.ci = item.ci;
      this.telefono = item.tel;

    },
    actualizarEmpleado() {
      this.actualizaempleado(
        this.nombre,
        this.paterno,
        this.materno,
        this.email,
        this.fecha_nacimiento,
        this.ci,
        this.telefono,
        this.idEmpleado,
      );
      this.botonAct = 0;
    },
    async actualizaempleado(
      nombre,
      paterno,
      materno,
      email,
      ci,
      telefono,
      idEmpleado,


    ) {
      let me = this;

      //let me=this;
      await axios
        .post(
          "/empleado/editempleado/" +
          this.idEmpleado +"," +
          this.nombre +"," +
          this.paterno +"," +
          this.materno +"," +
          this.email +"," +
          this.ci +"," +
          this.telefono +"," +
          this.id_empleado +"," +
          this.id_tipo_empleado +"," +
          this.idCargo
        )
        .then(function (response) {
          me.mensajeSnackbar = response.data.message;
          me.snackbarOK = true;
          me.listarEmpleado(me.id_sede);
          me.limpiar();
        })
        .catch(function (error) {
          me.snackbarError = true;
        });
    },
    regempleado() {
      this.verificarempleado(this.id_empleado, this.id_tipo_empleado, this.id_sede, this.usuario, this.telefono, this.nombre);
      //this.savemateplan(this.idpla,this.idmateall,this.idnivel,this.id_sede,this.creditos,this.hrst,this.hrsp);
    },
    async verificarempleado(id_empleado, id_tipo_empleado, id_sede, usuario, telefono, nombre) {
      let me = this;
      await axios.get("/empleado/verificarempleado/" + this.nombre + "," + this.id_empleado + "," + this.id_sede)
        .then(function (response) {

          if (response.data.resultado == null) {

            me.registroEmpleado(me.id_empleado, me.id_tipo_empleado, me.id_sede, me.usuario, me.telefono, me.nombre);

          } else {
            me.snackbarError = true;
          }

        })
        .catch(function (error) {
          me.snackbarError = true;
        });
    },
    showCompromiso() {
      this.compromisoModal = true;
    },
    closeCompromiso() {
      this.compromisoModal = false;
    },

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    // CARGO MODAL FUNCIONES
    seleccionarCargo(item) {
      this.idCargo = item.idcargo;
      this.cargoModal = false;
    },
    showCargo() {
      this.cargoModal = true;
      this.listarcargos();
    },
    closeCargo() {
      this.cargoModal = false;
    },/*
    limpiar() {
      this.nombre = "";
      this.telefono = "";
    },*/

    seleccionarCarrera(item) {
      this.id_carrerapost = item.idcarrera;
      this.carrerapost = item.carrera;
      this.carreraModal = false;
    },
    showTpostulante() {
      this.tpostModal = true;
    },/*
    closeTpost() {
      this.tpostModal = false;
    },*//*
    seleccionarTpost(item) {
      this.id_tipo_empleado = item.idtipo;
      this.tpost = item.tipo;
      this.tpostModal = false;
    },*/
    async listarcargos() {
      let me = this;
      await axios
        .get("/empleado/listarcargos")
        .then(function (response) {
          if (response.data.resultado == null) {
            me.datostempleado = [];

          } else {
            //console.log(response.data);
            me.datostempleado = response.data.resultado;

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },/*
    registrarpost() {
      this.registroEmpleado(
        this.id_tipo_empleado,
        this.id_empleado,
        this.nombre,
        this.telefono,
        this.id_sede,
        this.usuario
      );
    },*/
    /*
    showdocumentoadm() {
      this.listarregistrado(this.documento, this.emailpost);
      this.documenadmisionModal = true;
    },
    closedocumentoadm() {
      this.documenadmisionModal = false;
    },
    */
    async listarregistrado(documento, emailpost) {
      let me = this;
      await axios
        .get("/postulante/buscarpr/" + this.documento + "," + this.emailpost)
        .then(function (response) {
          if (response.data.resultado == null) {
            me.datospostreg = [];
          } else {
            me.datospostreg = response.data.resultado;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    listarEmpleado() {
      this.listarEmpleados();
    },
    async listarEmpleados() {
      let me = this;
      await axios
        .get("/empleado/listarempleado/")
        .then(function (response) {
          if (response.data.resultado == null) {
            me.datosEmpleados = [];
          } else {
            me.datosEmpleados = response.data.resultado;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async registroEmpleado(
      id_empleado,
      id_tipo_empleado,
      id_sede,
      usuario,
      telefono,
      nombre
    ) {
      let me = this;

      //let me=this;
      await axios
        .post(
          "/empleado/addempleado/" +
          this.id_empleado +
          "," +
          this.id_tipo_empleado +
          "," +
          this.id_sede +
          "," +
          this.usuario +
          "," +
          this.telefono +
          "," +
          this.nombre
        )
        .then(function (response) {

          me.mensajeSnackbar = response.data.message;
          me.snackbarOK = true;
          me.listarEmpleados();
          me.limpiar();

        })
        .catch(function (error) {
          me.snackbarError = true;
        });
    },
  },
};
</script>