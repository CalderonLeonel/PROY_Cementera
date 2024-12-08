<template>
    <v-card elevation="5" outlined>
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="success" outlined>
                <strong>{{ mensajeSnackbar }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarOK = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

        <div class="text-center">
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error" outlined>
                <strong>{{ mensajeSnackbarError }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarError = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
        <v-alert v-if="existencias == false" type="error" color="red darken-2" dense prominent icon="mdi-alert">
            <div class="text-h6">
                SE REQUIERE LA COMPRA DE EXISTENCIAS EN EL INVENTARIO
            </div>
            POR FAVOR, NOTIFIQUE A ADQUISICIONES PARA ADQUIRIR EXISTENCIAS DE <strong>{{this.itemsCriticos}}</strong>
        </v-alert>
        <v-alert v-if="existencias == true" type="success" color="green darken-2" dismissible dense prominent>
            <div class="text-h5">
                SE TIENEN LAS EXISTENCIAS NECESARIAS EN EL INVENTARIO
            </div>

        </v-alert>
        <div>
            <v-alert dense style="color: #ffffff;" color="indigo">
                <h3>ALMACENES</h3>
            </v-alert>
        </div>
        <div v-if="checkAccess(10, 'SUPERVISOR') || checkAccess(10, 'GERENTE')">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarAlmacen()">NUEVO ALMACÉN</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ALMACÉN</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="searchAlmacen" append-icon="mdi-magnify" label="BUSCAR ALMACÉN"
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
                                    <v-icon class="mr-2" color="primary" x-large @click="llenarCamposAlmacen(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2"
                                        @click="activar(item)" title="ACTIVAR ALMACÉN">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2"
                                        @click="confirmacionAnulacionAlmacen(item)" title="DESACTIVAR ALMACÉN">
                                        mdi-close-circle
                                    </v-icon>
                                </template>




                            </v-data-table>
                        </v-col>
                    </v-row>
                    <!--<v-row>
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
                               <v-text-field v-model="searchSeccion" append-icon="mdi-magnify" label="BUSCAR SECCION"
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
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposSeccion(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR SECCIÓN">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionSeccion(item)"
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
                               <v-text-field v-model="searchStand" append-icon="mdi-magnify" label="BUSCAR STAND"
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
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposStand(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR STAND">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionStand(item)"
                                        title="DESACTIVAR STAND">
                                        mdi-close-circle
                                    </v-icon>             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <h3>VISUALIZACIÓN DE ALMACENAMIENTO</h3>
                        </v-col>
                        <v-col cols="12" md="12">
                               <v-text-field v-model="searchDetalleAlmacenamiento" append-icon="mdi-magnify" label="BUSCAR ALMACEN"
                                    single-line hide-details></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-data-table :headers="headerAlmacen" :items="datosAlmacen" :search="searchDetalleAlmacenamiento"
                                :items-per-page="5" class="elevation-2">
                                <template #[`item.codigo`]="{ item }">
                                    <v-chip dark>
                                        {{ obtenerCodigoAlmacen(item.nombrealmacen) }}
                                    </v-chip>
                                </template>
                                <template #[`item.actions`]="{ item }">
                                    <v-icon x-large color="primary" class="mr-2" @click="mostrarDetalleAlmacen(item)"
                                        title="VER ALMACENES">
                                        mdi-eye
                                </v-icon>        
                                </template>
                                
                            </v-data-table>
                        </v-col>
                        <v-col cols="12" md="12"></v-col>
                    </v-row>        
                -->

                </v-container>
            </v-form>

        </div>
        <v-dialog v-model="agregarAlmacenModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>GESTIÓN DE ALMACENES</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACÉN" :counter="60"
                                        :rules="nombreRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcionAlmacen" label="DESCRIPCIÓN ALMACÉN"
                                        :counter="100" :rules="descripcionRules"
                                        @input="descripcionAlmacen = descripcionAlmacen.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <!--<v-col cols="12" md="12">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="DOCUMENTO DE ALMACEN" required :disabled="storageState" @change="enableButton"
                                    ></v-file-input>
                                </v-col>-->
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonActAl == 1" color="#0A62BF" @click="editarAlm()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonActAl == 0" color="#0ABF55" @click="registrarAlm()"
                                                style="float: left" title="REGISTRAR ALMACÉN" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon color="#BF120A" @click="limpiar()" style="float: left" large
                                                class="mx-2" title="LIMPIAR FORMULARIO">
                                                <v-icon dark> mdi-eraser </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="12" sm="4" md="8">
                                    <v-btn iconv dark color="#00A1B1" @click="closeModalAgregarAlma()"
                                        style="float: right" title="SALIR">
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

        <v-dialog v-model="almacenModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ALMACENES ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarAlmacen" append-icon="mdi-magnify"
                                        label="BUSCAR ALMACÉN" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerAlmacen" :items="datosAlmacenActivos"
                                    :search="buscarAlmacen" :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.codigo`]="{ item }">
                                        <v-chip dark>
                                            {{ obtenerCodigoAlmacen(item.nombrealmacen) }}
                                        </v-chip>
                                    </template>
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon class="mr-2" @click="seleccionarAlmacen(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="v()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                              
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

    
      

      
        <v-dialog v-model="confirmacionAnulacionAlm" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#BF120A" @click="anularAlmacen()"
                                    style="float: right" title="ANULAR ALMACÉN">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    ANULAR
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#00A1B1" @click="closeAnulacionAlmacen()"
                                    style="float: right" title="SALIR">
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

            drawer: false,
            user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },

            mensajeSnackbarError: "REGISTRO FALLIDO",

            nombreRules: [
                (v) => !!v || "SE REQUIERE EL NOMBRE DEL ALMACÉN.",
                (v) =>
                    (v && v.length <= 60) ||
                    "EL NOMBRE DEL ALMACEN NO DEBE SOBREPASAR LOS 60 CARACTERES.",
            ],

            descripcionRules: [
                (v) => !!v || "SE REQUIERE LA DESCRIPCIÓN DEL ALMACÉN.",
                (v) => (v === null || v.length <= 100) || "LA DESCRIPCIÓN NO DEBE SUPERAR LOS 100 CARACTERES.",
            ],






            existencias: true,
            itemsCriticos: '',
            datosExistencia: [],

            documentoArchivo: '',



            //#region Almacenamiento
            idAlmacen: "",
            idSeccion: "",
            idStand: "",
            nombreAlmacen: "",
            descripcionAlmacen: "",
            nombreSeccion: "",
            nombreStand: "",
            estado: "ACTIVO",
            //fechaDeModificacion: "",
            valid: true,


            snackbarOK: false,
            snackbarError: false,


            datosAlmacen: [],
            headerAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "CÓDIGO ALMACÉN", value: "codigo", sortable: true },
                { text: "NOMBRE DE ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "DESCRIPCIÓN DE ALMACÉN", value: "descripcion", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosSeccion: [],
            headerSeccion: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE SECCION", value: "nombreseccion", sortable: true },
                { text: "ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosStand: [],
            headerStand: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE STAND", value: "nombrestand", sortable: true },
                { text: "SECCION", value: "nombreseccion", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            headerAlmacenamiento: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "ITEM", value: "nombreitem", sortable: true },
                { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                { text: "TIPO", value: "nombretipoitem", sortable: true },
                { text: "MEDIDA", value: "medida", sortable: true },
                { text: "CANTIDAD", value: "cantidad", sortable: true },
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            searchAlmacen: "",
            buscarAlmacen: "",
            agregarAlmacenModal: false,
            confirmacionAnulacionAlm: false,

            searchSeccion: "",
            buscarSeccion: "",
            agregarSeccionModal: false,
            confirmacionAnulacionSec: false,

            searchStand: "",
            buscarStand: "",
            agregarStandModal: false,
            confirmacionAnulacionSt: false,


            datosAlmacenActivos: [],
            almacenModal: false,

            datosSeccionesActivas: [],
            seccionModal: false,


            botonActAl: 0,
            botonActSe: 0,
            botonActSt: 0,

            searchDetalleAlmacenamiento: '',
            datosDetalleAlmacen: [],
            detalleAlmacen: false,
            searchDetalleAlmacen: '',
            datosDetalleSeccion: [],
            detalleSeccion: false,
            searchDetalleSeccion: '',
            datosDetalleStand: [],
            detalleStand: false,
            searchDetalleStand: '',
            //#endregion
        }
    },
    created: function () {
        this.listarAlmacen();
        //this.listarSeccion();
        //this.listarStand();
        this.getListaExistencias().then(() => {
        this.getAlertas();
        });

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

        obtenerCodigoAlmacen(nombreAlmacen) {
            let codigo = '';
            var arrayCode = [];
            for (let i = 0; i < nombreAlmacen.length; i++) {
                arrayCode.push(96 - nombreAlmacen.charCodeAt(i));
            }
            for (let j = 0; j < arrayCode.length; j++) {
                codigo += arrayCode[j].toString(16);
            }
            return codigo;
        },

        getAlertas() {
            var items = [];
            var stock = [];
            var limite = [];
            if (this.datosExistencia == []) {
                this.existencias = false;
            }
            else {
                console.log(JSON.parse(JSON.stringify(this.datosExistencia)));
                console.log('');
                let datosComoObjeto = JSON.parse(JSON.stringify(this.datosExistencia))

                for (let propiedad in datosComoObjeto) {
                    console.log(`: ${propiedad}`);
                    for (const key in datosComoObjeto[propiedad]) {
                        console.log(`Propiedad: ${key}`);
                        if (key == 'nombreitem') {
                            items.push(datosComoObjeto[propiedad][key])
                        }
                        else if (key == 'limitecritico') {
                            limite.push(datosComoObjeto[propiedad][key])
                        }
                        else if (key == 'cantidad') {
                            stock.push(datosComoObjeto[propiedad][key])
                        }
                    }
                }
                for (let i = 0; i < items.length; i++) {
                    if (Number(limite[i]) >= Number(stock[i]) ) {
                        this.existencias = false;
                        this.itemsCriticos += items[i] + ' ';
                    }
                }
            }
        },

        async getListaExistencias() {
            let me = this;
            await axios
                .get("/inventario/listarexistencias/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosExistencia = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosExistencia = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

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

        registrarAlm() {
            if (this.$refs.form.validate()) {
                this.registrarAlmacen(this.nombreAlmacen, this.descripcionAlmacen, this.estado);
            }
            //this.almacenarArchivo(this.documentoArchivo)
            //this.guardarDocumento(this.documentoArchivo.name,this.nombreAlmacen,"inv000","ACTIVO");

        },
        async registrarAlmacen(
            nombreAlmacen,
            descripcionAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/almacen/agregaralmacen/" +
                    this.nombreAlmacen +
                    "," +
                    this.descripcionAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {
                    me.closeModalAgregarAlma();
                    me.listarAlmacenes();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarAlm() {
            if (this.$refs.form.validate()) {
                this.editarAlmacen(this.idAlmacen, this.nombreAlmacen, this.descripcionAlmacen, this.estado);
            }
        },
        async editarAlmacen(
            idAlmacen,
            nombreAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/almacen/editaralmacen/" +
                    this.idAlmacen +
                    "," +
                    this.nombreAlmacen +
                    "," +
                    this.descripcionAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {
                    me.closeModalAgregarAlma();
                    me.listarAlmacenes();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionAlmacen(item) {
            this.idAlmacen = item.idalmacen;
            this.confirmacionAnulacionAlm = true;
        },
        closeAnulacionAlmacen() {
            this.confirmacionAnulacionAlm = false;
        },
        anularAlmacen() {
            this.desactivarAlmacen(this.idAlmacen);
            this.confirmacionAnulacionAlm = false;
            this.listarAlmacenes();
        },
        async desactivarAlmacen(idAlmacen) {
            let me = this;
            await axios
                .post("/almacen/eliminaralmacen/" + this.idAlmacen).then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                    me.snackbarError = true;
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


        registrarSec() {
            this.registarSeccion(this.nombreSeccion, this.idAlmacen, this.estado);
            this.closeModalAgregarSec();
            this.listarSecciones();
        },
        async registarSeccion(
            nombreSeccion,
            idAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/seccion/agregarseccion/" +
                    this.nombreSeccion +
                    "," +
                    this.idAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;

                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarSec() {
            this.editarSeccion(this.idSeccion, this.nombreSeccion, this.idAlmacen, this.estado);
            this.closeModalAgregarSec();
            this.listarSecciones();
            this.botonActSe = 0;
        },
        async editarSeccion(
            idSeccion,
            nombreSeccion,
            idAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/seccion/actualizarseccion/" +
                    this.idSeccion +
                    "," +
                    this.nombreSeccion +
                    "," +
                    this.idAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionSeccion(item) {
            this.idSeccion = item.idseccion;
            this.confirmacionAnulacionSec = true;
        },
        closeAnulacionSeccion() {
            this.confirmacionAnulacionSec = false;
        },
        anularSeccion() {
            this.desactivarAlmacen(this.idSeccion);
            this.confirmacionAnulacionSec = false;
            this.listarSecciones();
        },
        async desactivarSeccion(idSeccion) {
            let me = this;
            await axios
                .post("/seccion/eliminarseccion/" + this.idSeccion).then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
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



        registrarStn() {
            this.registarStand(this.nombreStand, this.idSeccion, this.estado);
            this.closeModalAgregarSt();
            this.listarStands();
        },
        async registarStand(
            nombreStand,
            idSeccion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/stand/agregarstand/" +
                    this.nombreStand +
                    "," +
                    this.idSeccion +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarStn() {
            this.editarStand(this.idStand, this.nombreStand, this.idSeccion, this.estado);
            this.closeModalAgregarSt();
            this.listarStands();
            this.botonActSt = 0;
        },
        async editarStand(
            idStand,
            nombreStand,
            idSeccion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/stand/actualizarstand/" +
                    this.idStand +
                    "," +
                    this.nombreStand +
                    "," +
                    this.idSeccion +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionStand(item) {
            this.idStand = item.idStand;
            this.confirmacionAnulacionSt = true;
        },
        closeAnulacionStand() {
            this.confirmacionAnulacionSt = false;
        },
        anularStand() {
            this.desactivarStand(this.idStand);
            this.confirmacionAnulacionSt = false;
            this.listarStands();
        },
        async desactivarStand(idStand) {
            let me = this;
            await axios
                .post("/stand/eliminarstand/" + this.idStand).then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

        },


        //#endregion
        //#region Adicionar
        //#endregion
        //#region Editar
        //#endregion
        //#region Eliminar
        //#region Modals
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
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
        closeModalAgregarAlma() {
            this.agregarAlmacenModal = false;
            this.limpiar();
            this.botonActAl = 0;
        },

        llenarCamposAlmacen(item) {
            this.botonActAl = 1;
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.descripcionAlmacen = item.descripcion;
            this.estado = item.estado;
            this.agregarAlmacenModal = true;
        },



        llenarCamposSeccion(item) {
            this.botonActSe = 1;
            this.idSeccion = item.idseccion;
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.nombreSeccion = item.nombreseccion;
            this.estado = item.estado;
            this.agregarSeccionModal = true;
        },

        llenarCamposStand(item) {
            this.botonActSt = 1;
            this.idStand = item.idstand;
            this.idSeccion = item.idseccion;
            this.nombreSeccion = item.nombreseccion;
            this.nombreStand = item.nombrestand;
            this.estado = item.estado;
            this.agregarStandModal = true;
        },

        actualizarAlmacenes() {
            this.actualizaralmacen(

                this.nombreAlmacen,
                this.estado,

            );
            this.botonActAl = 0;
        },

        showModalAgregarSeccion() {
            this.agregarSeccionModal = true;
        },
        closeModalAgregarSec() {
            this.agregarSeccionModal = false;
            this.limpiar();
            this.botonActSe = 0;
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
        closeModalAgregarSt() {
            this.agregarStandModal = false;
            this.limpiar();
            this.botonActSt = 0;
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
            this.idSeccion = item.idseccion;
            this.nombreSeccion = item.nombreseccion;
            this.seccionModal = false;
        },

        openAlmacenModal() {
            this.almacenModal = true;
            this.listarAlmacenesActivos();
        },

        closeAlmacenModal() {
            this.almacenModal = false;
        },


        openSeccionModal() {
            this.seccionModal = true;
            this.listarSeccionesActivas();
        },

        closeSeccionModal() {
            this.seccionModal = false;
        },


        async listarDetallesAlmacen(idAlmacen) {
            let me = this;
            await axios
                .get("/seccion/listarseccionalmacen/" + idAlmacen)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDetalleAlmacen = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDetalleAlmacen = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        mostrarDetalleAlmacen(item) {
            this.listarDetallesAlmacen(item.idalmacen)
            this.detalleAlmacen = true;
        },


        closeDetalleAlmacen() {
            this.detalleAlmacen = false;

        },


        async listarDetallesSeccion(idSeccion) {
            let me = this;
            await axios
                .get("/stand/listarstandseccion/" + idSeccion)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDetalleSeccion = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDetalleSeccion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },



        mostrarDetalleSeccion(item) {
            this.listarDetallesSeccion(item.idseccion);
            this.detalleSeccion = true;

        },


        closeDetalleSeccion() {
            this.detalleSeccion = false;
        },


        async listarDetallesStand(idStand) {
            let me = this;
            await axios
                .get("/inventario/listarstanditem/" + idStand)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDetalleStand = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDetalleStand = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        mostrarDetalleStand(item) {
            this.listarDetallesStand(item.idstand)
            this.detalleStand = true;
        },


        closeDetalleStand() {
            this.detalleStand = false;
        },

        limpiar() {
            this.$refs.form.reset()
        },
        //#endregion

        async getListaExistencias() {
            let me = this;
            await axios
                .get("/inventario/listarexistencias/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosExistencia = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosExistencia = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        registrarDocumento() {
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name, this.nombreAlmacen, "inv000", "ACTIVO");
        },
        async almacenarArchivo(documentoArchivo) {

            const formData = new FormData();
            formData.append('inventory', documentoArchivo);
            let me = this;
            await axios
                .post(
                    "/uploadFile/", formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumentos();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async guardarDocumento(documentoArchivo, descripcionArchivo, codigoArchivo, estado) {
            const ext = documentoArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            let me = this;
            await axios
                .post(
                    "/documento/insertar/" +
                    ext[0] +
                    "," +
                    nombreArchivo +
                    "," +
                    descripcionArchivo +
                    "," +
                    codigoArchivo +
                    "," +
                    estado)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumento();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
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
    },
};

</script>
