<template>
    <v-card elevation="5" outlined shaped>
      <v-dialog v-model="tpostModal" max-width="600">
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
                    <v-text-field v-model="searchtpost" append-icon="mdi-magnify" label="BUSCAR TIPO DE EMPLEADO" single-line
                      hide-details></v-text-field>
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
      <v-dialog v-model="paisModal" max-width="600">
        <v-card elevation="5" outlined shaped>
          <v-card-title>
            <span>
              <h5>CARGOS</h5>
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-card-title>
                    <v-text-field v-model="searchpais" append-icon="mdi-magnify" label="BUSCAR CARGO" single-line
                      hide-details></v-text-field>
                  </v-card-title>
                </v-col>
  
                <v-col cols="12">
                  <v-data-table :headers="headersbloque" :items="datostbloque" :search="searchpais" :items-per-page="5"
                    class="elevation-1" id="tableId">
                    <template #[`item.actions`]="{ item }">
                      <v-icon small class="mr-2" @click="seleccionarBloque(item)">
                        mdi-check-circle
                      </v-icon>
                    </template>
                  </v-data-table>
  
  
                </v-col>
                <v-col cols="10"> </v-col>
                <v-col cols="2">
                  <v-btn class="mx-2" fab dark small color="red darken-1" @click="closePais" style="float: right"
                    title="SALIR">
                    <v-icon dark> mdi-close-circle-outline </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="compromisoModal" max-width="1000px">
        <v-card>
          <v-card-text>
            <div id="documento01" style="
                padding: 20px;
                font-family: Arial, sans-serif;
                font-size: 10px;
                margin-top: 60px;
              ">
              <header>
                <div id="logo" style="float: left; margin-left: 2%; margin-right: 2%">
                  <img
                    src="data:image/png;base64,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" />
                </div>
              </header>
              <br />
              <section>
                <div id="encabezado" style="
                    width: 100%;
                    text-align: right;
                    margin-left: 10px;
                    margin-right: 10px;
                    font-size: 12px;
                  "></div>
                <div id="encabezado" style="
                    width: 100%;
                    text-align: center;
                    margin-left: 10px;
                    margin-right: 10px;
                    font-size: 16px;
                  ">
                  <p>
                    <b>EMPLEADOS</b>
                  </p>
                </div>
                <table id="facarticulo" style="
                    width: 100%;
                    border-collapse: collapse;
                    border-spacing: 0;
                    padding: 20px;
                    margin-bottom: 15px;
                  ">
                  <thead>
                    <tr id="fa" style="color: #000000; font-size: 10px">
                      <th style="text-align: left">SEDE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="font-size: 10px">
                      <td style="text-align: left">{{ sede }}</td>
                    </tr>
                  </tbody>
                </table>
                <table id="facarticulo" style="width: 100%;
                    border-collapse: collapse;
                    border-spacing: 0;
                    padding: 20px;
                    margin-bottom: 15px;
                  ">
                  <thead>
                    <tr id="fa" style="color: #000000; font-size: 10px">
                      <th style="text-align: left">NOMBRE DE CARGO</th>
                      <th style="text-align: left">TIPO DE EMPLEADO</th>
                      <th style="text-align: left">NOMBRE DE EMPLEADO</th>
                      <th style="text-align: center">TELEFONO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="det in datosEmpleados" :key="det.id_sede" style="font-size: 10px">
                      <td style="text-align: left">{{ det.bloque }}</td>
                      <td style="text-align: left">{{ det.tipoempleado }}</td>
                      <td style="text-align: left">{{ det.empleado }}</td>
                      <td style="text-align: center">{{ det.telefono }}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <br />
  
              <br />
              <br />
              <!--footer>
                                              <v-row>
                                                
                                              <v-col cols="12" md="6">
                                               <div id="gracias" style="text-align:left;font-size:10px">
                                                  <p><b>FUNCIONARIO:{{nomus}}</b></p>
                                                  <p><b>FIRMA:</b></p>
                                              </div>
                                              </v-col>
                                              </v-row>
                                          </footer-->
            </div>
            <v-btn class="mx-2" fab dark x-small color="cyan darken-2" @click="crearPDF()" title="NUEVA BUSQUEDA">
              <v-icon dark> mdi-printer-check </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeCompromiso()" title="SALIR">
              <v-icon dark> mdi-close-circle-outline </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
  
      <div>
        <v-alert dense color="#EE680B" style="color: #ffffff">
          <h5>EMPLEADOS</h5>
        </v-alert>
      </div>
      <div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="nombrebloquepost" :counter="50" :rules="nombreRules"
                  @input="nombrebloquepost = nombrebloquepost.toUpperCase()" label="NOMBRE DE EMPLEADO"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="paternobloquepost" :counter="50" :rules="paternoRules"
                  @input="paternobloquepost = paternobloquepost.toUpperCase()" label="APELLIDO PATERNO"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="maternobloquepost" :counter="50" :rules="maternoRules"
                  @input="maternobloquepost = maternobloquepost.toUpperCase()" label="APELLIDO MATERNO"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="emailbloquepost" :counter="50" :rules="emailRules"
                  @input="emailbloquepost = emailbloquepost.toUpperCase()" label="CORREO ELECTRONICO"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="cibloquepost" :counter="50" :rules="ciRules"
                  @input="cibloquepost = cibloquepost.toUpperCase()" label="NUMERO DE CARNET"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field type="number" v-model="telefonopost"  :rules="telefonosRules"
                  @input="telefonopost = telefonopost.toUpperCase()" label="TELEFONO" required></v-text-field>
              </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="2"> </v-col>
              <v-col cols="12" md="1">
                <v-btn class="mx-2" fab dark x-small color="#EE680B" @click="showPais()" style="float: right"
                  title="BUSCAR CARGO">
                  <v-icon dark> mdi-gesture-double-tap </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="bloquepost" :counter="30" :rules="nombreRules" label="CARGO" disabled
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
                    <v-icon dark>  mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn variant="outlined" v-if="botonAct == 0" class="mx-2" fab dark x-small color="#EE680B" @click=regempleado()
                    style="float: left" title="REGISTRAR EMPLEADO">
                    <v-icon dark> mdi-content-save-plus-outline </v-icon>
                  </v-btn>
                  <v-btn variant="outlined" class="mx-2" fab dark x-small color="#EE680B" @click="limpiar()" style="float: left"
                    title="LIMPIAR FORMULARIO">
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
  
                  <v-data-table :headers="headersEmpleados" :items="datosEmpleados" :search="searchEmpleado" :items-per-page="5"
                    class="elevation-1" id="tableId">
  
                    <template #[`item.act`]="{ item }">
                      <v-chip :color="getColor(item.act)" dark>
                        {{ item.act }}
                      </v-chip>
                    </template>
  
  
                    <template #[`item.actions`]="{ item }">
                      <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                        title="ACTIVAR EMPLEADO">
                        mdi-check-circle-outline
                      </v-icon>
                      <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                        title="DESACTIVAR EMPLEADO">
                        mdi-cancel
                      </v-icon>
                      <v-icon small class="mr-2" @click="llenarCamposEmpleado(item)" title="ACTUALIZAR INFORMACION">
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
                              <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#EE680B"
                                  outlined>
                                  <strong>{{ mensajeSnackbar }}</strong>
  
  
                                  <template v-slot:action="{ attrs }">
                                      <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                          mdi-close
                                      </v-icon>
                                  </template>nivel
                              </v-snackbar>
                          </div>
                          <div class="text-center">
  
                              <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense
                                  color="#EE680B" outlined>
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
      usuario: "",
      id_sede: "",
      sede: "",
      nomus: "",
      patus: "",
      matus: "",
      valid: true,
      nombrebloquepost: "",
      telefonopost: "",
      idEmpleado: "",
      botonAct: 0,
  
      bloquepost: "",
      compromisoModal: 0,
      searchEmpleado: "",
  
      id_bloque: "",
      pais: "",
      paisModal: 0,
      datostbloque: [],
  
      gestionModal: 0,
      carreraModal: 0,
      searchcarrera: "",
      datoscarrera: [],
  
      headersEmpleados: [
        { text: "NOMBRE DE CARGO", value: "bloque", sortable: false },
        { text: "TIPO DE EMPLEADO", value: "tipoempleado", sortable: false },
        { text: "NOMBRE EMPLEADO", value: "empleado", sortable: false },
        { text: "TELEFONO", value: "telefono", sortable: false },
        { text: "ESTADO", value: "act", sortable: false },
        { text: "OPCIONES", value: "actions", sortable: false },
      ],
  
  
      snackbarOK: false,
        mensajeSnackbar: "",      
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO ",     
        timeout: 2000,
  
  
      tpost: "",
      id_tipo_empleado: "",
      tpostModal: 0,
      searchtpost: "",
      datostempleado: [],
  
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
        // value =>(value && value.lemgth>=4 || 'EL USUARIO ES MUY CORTO')
      ],
      email: "",
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
      searchpais: "",
      headersbloque: [
  
        { text: "CARGOS", value: "bloque", sortable: false },
        { text: "DESCRIPCION", value: "dir", sortable: false },
        { text: "OPCIONES", value: "actions", sortable: false },
      ],
      checkbox: false,
    }),
  
    created: function () {
      this.listartipoempleado();
      this.user = JSON.parse(sessionStorage.getItem("session"));
      this.usuario = this.user.personal;
      this.id_sede = this.user.id_sede;
      this.sede = this.user.sede;
      this.nomus =
        this.user.nombres + " " + this.user.paterno + " " + this.user.materno;
      this.listarEmpleados(this.id_sede);
  
    },
  
    methods: {
      activar(item) {
        this.idEmpleado = item.idempleado;
        this.activarempleado(this.idEmpleado);
      },
      async activarempleado(idTpEmpleado) {
        let me = this;
        await axios
          .post("/empleado/onempleado/" + this.idEmpleado).then(function (response) {
  
            me.listarEmpleados(me.id_sede);
          })
          .catch(function (error) {
            console.log(error);
          });
  
      },
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
  
  
      llenarCamposEmpleado(item) {
        this.botonAct = 1;
        this.nombrebloquepost = item.empleado;
        this.telefonopost = item.telefono;
        this.bloquepost = item.bloque;
        this.tpost = item.tipoempleado;
        this.idEmpleado = item.idempleado;
        this.id_bloque = item.idblo;
        this.id_tipo_empleado = item.idtpau;
  
      },
      actualizarEmpleado() {
        this.actualizaempleado(
  
          this.nombrebloquepost,
          this.paternobloquepost,
          this.maternobloquepost,
          this.emailbloquepost,
          this.telefonopost,
          this.bloquepost,
          this.tpost,
          this.idEmpleado,
  
  
        );
        this.botonAct = 0;
      },
      async actualizaempleado(
        nombrebloquepost,
        paternobloquepost,
        maternobloquepost,
        emailbloquepost,
        telefonopost,
        bloquepost,
        tpost,
        idEmpleado,
  
  
      ) {
        let me = this;
  
        //let me=this;
        await axios
          .post(
            "/empleado/editempleado/" +
            this.idEmpleado +
            "," +
            this.nombrebloquepost +
            "," +
            this.paternobloquepost +
            "," +
            this.maternobloquepost +
            "," +
            this.emailbloquepost +
            "," +
            this.cibloquepost +
            "," +
            this.telefonopost +
            "," +
            this.id_bloque +
            "," +
            this.id_tipo_empleado +
            "," +
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
        this.verificarempleado(this.id_bloque,this.id_tipo_empleado,this.id_sede,this.usuario,this.telefonopost,this.nombrebloquepost);
        //this.savemateplan(this.idpla,this.idmateall,this.idnivel,this.id_sede,this.creditos,this.hrst,this.hrsp);
      },
      async verificarempleado(id_bloque,id_tipo_empleado,id_sede,usuario,telefonopost,nombrebloquepost) {
        let me = this;
        await axios.get("/empleado/verificarempleado/" + this.nombrebloquepost + "," +this.id_bloque + "," + this.id_sede)
          .then(function (response) {
  
            if (response.data.resultado == null) {
  
              me.registroEmpleado(me.id_bloque,me.id_tipo_empleado,me.id_sede,me.usuario,me.telefonopost,me.nombrebloquepost);
  
            } else {
              me.snackbarError = true;
            }
  
          })
          .catch(function (error) {
            me.snackbarError = true;
          });
      },
      /*
      async listarpaises() {
        let me = this;
        await axios
          .get("/empleado/listarblo/" + this.id_sede)
          .then(function (response) {
            if (response.data.resultado == null) {
              me.datostbloque = [];
  
            } else {
              //console.log(response.data);
              me.datostbloque = response.data.resultado;
  
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
  */
 /*
      crearPDF() {
        //this.comprobanteModal=0;
  
        var contenido = document.getElementById("documento01");
        html2canvas(contenido).then(function (canvas) {
          var imgData = canvas.toDataURL("image/png");
          var imgWidth = 210;
          var pageHeight = 295;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;
          var doc = new jsPDF("p", "mm", "a4");
          var position = 0;
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          doc.save("UNICENDOCUMENTO.pdf");
        });
      },
  */
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
      seleccionarBloque(item) {
        this.id_bloque = item.idbloque;
        this.bloquepost = item.bloque;
        this.paisModal = false;
      },
      showPais() {
        this.paisModal = true;
        this.listarpaises();
      },
      closePais() {
        this.paisModal = false;
      },
      limpiar() {
        this.nombrebloquepost = "";
        this.telefonopost = "";
        this.bloquepost = "";
        this.tpost = "";
      },
  
      seleccionarCarrera(item) {
        this.id_carrerapost = item.idcarrera;
        this.carrerapost = item.carrera;
        this.carreraModal = false;
        //this.listarcarreras(this.id_estudiante)
        //this.listarpagos(this.id_estudiante)
      },
      showTpostulante() {
        this.tpostModal = true;
      },
      closeTpost() {
        this.tpostModal = false;
      },
      seleccionarTpost(item) {
        // this.id_postexp=item.idciudad
        this.id_tipo_empleado = item.idtipo;
        this.tpost = item.tipo;
        this.tpostModal = false;
      },
      async listartipoempleado() {
        let me = this;
        await axios
          .get("/empleado/listartpempleado")
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
      },
      registrarpost() {
        this.registroEmpleado(
          this.id_tipo_empleado,
          this.id_bloque,
          this.nombrebloquepost,
          this.telefonopost,
          this.id_sede,
          this.usuario
        );
      },
      showdocumentoadm() {
        this.listarregistrado(this.documento, this.emailpost);
        this.documenadmisionModal = true;
      },
      closedocumentoadm() {
        this.documenadmisionModal = false;
      },
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
        this.listarEmpleados(this.id_sede);
      },
      async listarEmpleados(id_sede) {
        let me = this;
        await axios
          .get("/empleado/listau/" + this.id_sede)
          .then(function (response) {
            if (response.data.resultado == null) {
              me.datosEmpleados = [];
  
            } else {
              //console.log(response.data);
              me.datosEmpleados = response.data.resultado;
  
            }
            // me.listarEmpleado(me.id_sede); actualizar tabla esta creando ciclos
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      async registroEmpleado(
        id_bloque,
        id_tipo_empleado,
        id_sede,
        usuario,
        telefonopost,
        nombrebloquepost
      ) {
        let me = this;
  
        //let me=this;
        await axios
          .post(
            "/empleado/addaul/" +
            this.id_bloque +
            "," +
            this.id_tipo_empleado +
            "," +
            this.id_sede +
            "," +
            this.usuario +
            "," +
            this.telefonopost +
            "," +
            this.nombrebloquepost
          )
          .then(function (response) {
  
            me.mensajeSnackbar = response.data.message;
            me.snackbarOK = true;
            me.listarEmpleados(me.id_sede);
            me.limpiar();
  
          })
          .catch(function (error) {
            me.snackbarError = true;
          });
      },
    },
  };
  </script>