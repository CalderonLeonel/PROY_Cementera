<template>
   <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>ALMACENES</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarAlmacen()">NUEVO ALMACEN</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ALMACEN</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchAlmacen" append-icon="mdi-magnify" label="Buscar Almacen"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerAlmacen" :items="datosAlmacen" :search="searchAlmacen"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoAlmacen(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR Almacen">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
                                        title="DESACTIVAR Almacen">
                                        mdi-close-circle
                                    </v-icon>             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarSeccion()">NUEVO Seccion</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>SECCIONES</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchSeccion" append-icon="mdi-magnify" label="Buscar Seccion"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerSeccion" :items="datosSeccion" :search="searchSeccion"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoSeccion(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR SECCIÓN">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
                                        title="DESACTIVAR SECCIÓN">
                                        mdi-close-circle
                                    </v-icon>             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarStand()">NUEVO Stand</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>STANDS</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchStand" append-icon="mdi-magnify" label="Buscar Stand"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerStand" :items="datosStand" :search="searchStand"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoStand(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR STAND">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
                                        title="DESACTIVAR STAND">
                                        mdi-close-circle
                                    </v-icon>             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>

                </v-container>
            </v-form>

        </div>
        <v-dialog v-model="agregarAlmacenModal" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR ALMACEN</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACEN" :counter="60"
                                        :rules="nombreRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActAl == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarInfoAlmacen()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActAl == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registar()" style="float: left" title="REGISTRAR ALMACEN">
                                            <v-icon dark> mdi-content-save </v-icon>
                                            GUARDAR
                                        </v-btn>
                                </v-col>                      
                                <v-col cols="2">                                        
                                    <v-btn iconv color="#BF120A" class="mx-4"  dark  @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarAlmacen()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="almacenModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ALMACENES ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarAlmancen" append-icon="mdi-magnify" label="BUSCAR ALMACEN"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerAlmacen" :items="datosAlmacenActivos" :search="buscarAlmancen"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon class="mr-2" @click="seleccionarAlmacen(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeAlmacenModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="agregarSeccionModal" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR SECCIÓN</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreSeccion" label="NOMBRE SECCIÓN" :counter="60"
                                        :rules="nombreRules" @input="nombreSeccion = nombreSeccion.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="almacenRules"
                                        @click="openAlmacenModal()" style="float: right" title="BUSCAR ALMACEN">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACEN" :counter="60"
                                        :rules="nombreRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12"> </v-col>
                                
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActSe == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarInfoSeccion()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActSe == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registar()" style="float: left" title="REGISTRAR SECCIÓN">
                                            <v-icon dark> mdi-content-save </v-icon>
                                            GUARDAR
                                        </v-btn>
                                </v-col>                      
                                <v-col cols="2">                                        
                                    <v-btn iconv color="#BF120A" class="mx-4"  dark  @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarSeccion()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="seccionModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE SECCIONES ACTIVAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarSeccion" append-icon="mdi-magnify" label="BUSCAR SECCIÓN"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerSeccion" :items="datosSeccionesActivas" :search="buscarSeccion"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarSeccion(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeSeccionModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="agregarStandModal" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR STAND</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreStand" label="NOMBRE STAND" :counter="60"
                                        :rules="nombreRules" @input="nombreStand = nombreStand.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="seccionRules"
                                        @click="openSeccionModal()" style="float: right" title="BUSCAR SECCIÓN">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreSeccion" label="NOMBRE SECCIÓN" :counter="60"
                                        :rules="nombreRules" @input="nombreSeccion = nombreSeccion.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActAl == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarInfoAlmacen()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActAl == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registar()" style="float: left" title="REGISTRAR STAND">
                                            <v-icon dark> mdi-content-save </v-icon>
                                            GUARDAR
                                        </v-btn>
                                </v-col>                      
                                <v-col cols="2">                                        
                                    <v-btn iconv color="#BF120A" class="mx-4"  dark  @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarStand()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="confirmacionAnulacionAlmacen" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>'¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                            <v-row>
                                <v-col cols="3"></v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#BF120A"
                                        @click="anular()" style="float: right" title="Anular">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacion()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3"></v-col>
                            </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
    

</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            //#region Almacenamiento
            idAlmacen: "",
            idSeccion: "",
            idStand: "",
            nombreAlmacen: "",
            nombreSeccion: "",
            nombreStand: "",
            //fechaDeModificacion: "",
            valid: true,
            nombreRules: [
              (v) => !!v || "Se requiere el nombre del proveedor.",
              (v) =>
              (v && v.length <= 60) ||
                "el nombre del proveedor no debe sobrepasar los 60 caracteres.",
            ],
            phone1Rules: [
              (v) => !!v || "Se requiere un numero telefonico o celular.",
              (v) =>
              (v && v.length <= 10) ||
                "El telephono principal debe tener hasta 10 caracteres.",
            ],
            phone2Rules: [
              (v) =>
              (v && v===null || v.length <= 10) ||
                "El telephono secundario debe tener hasta 10 caracteres.",
            ],
            emailRules: [
              (v) => !!v || "Se requiere el correo electronico del proveedor",
              (v) => /.+@.+\..+/.test(v) || "Debe ser un correo electronico valido",
             ],
            datosAlmacen: [],
            headerAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE ALMACEN", value: "nombrealmacen", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosSeccion: [],
            headerSeccion: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE SECCION", value: "nombreseccion", sortable: true },
                { text: "ALMACEN", value: "idalmacen", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosStand: [],
            headerStand: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE STAND", value: "nombrestand", sortable: true },
                { text: "SECCION", value: "idseccion", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            searchAlmacen: "",
            agregarAlmacenModal: false,

            searchSeccion: "",
            agregarSeccionModal: false,

            searchStand: "",
            agregarStandModal: false,


            datosAlmacenActivos: [],
            almacenModal: false,

            datosSeccionesActivas: [],
            seccionModal: false,


            botonActAl: 0,
            botonActSe: 0,
            botonActSt: 0,
            //#endregion
        }
    },
    created: function (){
      this.listarAlmacen();
      this.listarSeccion();
      this.listarStand();
    },
    methods: {
        getColor(est) {
            if (est == "ACTIVO") return 'green'
            else if (est == "INACTIVO") return 'red'

        },
        //#region Listar
        listarAlmacen() {
            this.listarAlmacenes();
        },
        async listarAlmacenes() {
          let me = this;
          await axios
            .get("/almacen/listaralmacenesactivos/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosAlmacen = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosAlmacen = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        async listarAlmacenesActivos() {
          let me = this;
          await axios
            .get("/almacen/listaralmacenesactivos/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosAlmacenActivos = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosAlmacenActivos = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        async listarSeccionesActivas() {
          let me = this;
          await axios
            .get("/seccion/listarseccionesactivas/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosSeccionesActivas = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosSeccionesActivas = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },


        listarSeccion() {
            this.listarSecciones();
        },
        async listarSecciones() {
          let me = this;
          await axios
            .get("/seccion/listarseccionesactivas/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosSeccion = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosSeccion = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        listarStand() {
            this.listarStands();
        },
        async listarStands() {
          let me = this;
          await axios
            .get("/stand/listarstandsactivos/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosStand = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosStand = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        activar(item) {
            this.idProveedor = item.idProveedor;
            this.activarmateria(this.idProveedor);
        },
        async activarmateria(idProveedor) {
            let me = this;
            /*await axios
                .post("/carrera/onmateria/" + this.idProveedor).then(function (response) {

                    me.listarMaterias();
                })
                .catch(function (error) {
                    console.log(error);
                });*/

        },
        desactivar(item) {
            this.idProveedor = item.idProveedor;
            this.desactivarproveedor(this.idProveedor);
        },
        async desactivarproveedor(idProveedor) {
            let me = this;
            /*await axios
                .post("/carrera/offmateria/" + this.idProveedor).then(function (response) {

                    me.listarMaterias();
                })
                .catch(function (error) {
                    console.log(error);
                });*/

        },
        
        llenarCamposProveedores(item) {
            this.botonEst = 1;
            this.nombreMateria = item.nom;
            this.codigoMateria = item.codmat;
            this.idMateria = item.idmateria;

        },
        //#endregion
        //#region Adicionar
        //#endregion
        //#region Editar
        //#endregion
        //#region Eliminar
        //#region Modals
        editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
            this.desserts.push(this.editedItem)
            }
            this.close()
        },



        showModalAgregarAlmacen() {
            this.agregarAlmacenModal = true;
        },
        closeModalAgregarAlmacen() {
            limpiar();
            this.agregarAlmacenModal = false;
        },

        llenarCamposAlmacen(item) {
            this.botonActAl = 1;
            this.agregarAlmacenModal = true;
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.estado = item.est;
        },



        llenarCamposSeccion(item) {
            this.botonAct = 1;
            this.agregarSeccionModal = true;
            this.idSeccion = item.idseccion;
            this.idAlmacen = item.idalmacen;
            this.nombreSeccion = item.nombreseccion;
            this.estado = item.est;
        },

        llenarCamposStand(item) {
            this.botonAct = 1;
            this.agregarStandModal = true;
            this.idStand = item.idstand;
            this.idSeccion = item.idseccion;
            this.nombreStand = item.nombrestand;
            this.estado = item.est;
        },

        actualizarAlmacen() {
            this.actualizaralmacen(

            this.nombreAlmacen,
            this.estado,

            );
            this.botonActAl = 0;
        },

        showModalAgregarSeccion() {
            this.agregarSeccionModal = true;
        },
        closeModalAgregarSeccion() {
            limpiar();
            this.agregarSeccionModal = false;
        },

        llenarCamposSeccion(item) {
            this.botonActSe = 1;
            this.agregarSeccionModal = true;
            this.nombreSeccion = item.nombreseccion;
            this.idAlmacen = item.idalmacen;
            this.estado = item.est;
        },

        actualizarSeccion() {
            this.actualizarseccion(

            this.nombreSeccion,
            this.idAlmacen,
            this.estado,

            );
            this.botonActSe = 0;
        },

        showModalAgregarStand() {
            this.agregarStandModal = true;
        },
        closeModalAgregarStand() {
            this.limpiar();
            this.agregarStandModal = false;
        },
        
        llenarCamposStand(item) {
            this.botonActSt = 1;
            this.agregarStandModal = true;
            this.nombreStand = item.nombrestand;
            this.idSeccion = item.idseccion;
            this.estado = item.est;
        },

        actualizarStand() {
            this.actualizarseccion(

            this.nombreStand,
            this.idSeccion,
            this.estado,

            );
            this.botonActSt = 0;
        },

        seleccionarAlmacen(item) {
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.almacenModal = false;
        },

        seleccionarSeccion(item) {
            console.log(item);
            this.idSeccion = item.idseccion;
            this.nombreSeccion = item.nombreseccion;
            this.seccionModal = false;
        },

        openAlmacenModal(){
            this.almacenModal = true;
            this.listarAlmacenesActivos();
        },

        closeAlmacenModal(){
            this.limpiar();
            this.almacenModal = false;

        },


        openSeccionModal(){
            this.seccionModal = true;
            this.listarSeccionesActivas();
        },

        closeSeccionModal(){
            this.limpiar();
            this.seccionModal = false;
            
        },

        limpiar () {
            this.$refs.form.reset()
        },
        //#endregion
      },
};

</script>
