<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarProduccionModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR PRODUCCION</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>


                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                        @click="closeAgregarProduccion()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="infoProduccionModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DE PRODUCCION:</span><br>
                    <span>{{ codigoProduccion }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="codigoProduccion" label="CODIGO  " :counter="100"
                                        :rules="codigoProduccionRules"
                                        @input="codigoProduccion = codigoProduccion.toUpperCase()" required
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="productoRules"
                                        @click="showProductos()" style="float: right" title="BUSCAR PRODUCTOS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreProducto" label="PRODUCTO" :counter="100"
                                        :rules="nombreProductoRules" @input="nombreProducto = nombreProducto.toUpperCase()"
                                        required disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="cantidadProduccion" label="CANTIDAD" :counter="100"
                                        :rules="cantidadProduccionRules"
                                        @input="cantidadProduccion = cantidadProduccion.toUpperCase()" required
                                        disabled></v-text-field>
                                </v-col>


                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1"
                                        @click="closeInfoProduccionModal()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="produccionTerminadaModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>PRODUCCIONES TERMINADAS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Produccion</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarProducciones" append-icon="mdi-magnify"
                                            label="BUSCAR PRODUCCIONES" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersProduccionTer" :items="datosProduccionTer"
                                        :search="buscarProducciones" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.est == 'INACTIVO'" color="green" large class="mr-2"
                                                @click="activar(item)" title="ACTIVAR PRODUCCION">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.est == 'ACTIVO'" color="red" large class="mr-2"
                                                @click="desactivar(item)" title="DESACTIVAR PRODUCCION">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon large class="mr-2" color="#001781" @click="showInfoProduccion(item)"
                                                title="VER INFORMACION">
                                                mdi-eye
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1"
                                        @click="closeProduccionTerminadaModal()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="productosModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE PRODUCTOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarproducto" append-icon="mdi-magnify"
                                        label="BUSCAR PRODUCTOS" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersProductos" :items="datosProductos" :search="buscarproductos"
                                    :items-per-page="5" class="elevation-1" id="tableId">

                                    <template #[`item.est`]="{ item }">
                                        <v-chip :color="colorEstado(item.est)" dark>
                                            {{ item.est }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large class="mr-2" color="#001781" @click="seleccionarProducto(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>

                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeproductos()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <div>
            <v-alert dense color="cyan" style="color: #ffffff">
                <h5>PRODUCCION</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-tabs horizontal color="#002245" center-active grow>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    ADD
                                    PROD.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    PROD.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    PROD
                                    TER.
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR PRODUCCION</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" md="3">
                                                            <v-text-field v-model="codigoProduccion" label="CODIGO"
                                                                :counter="100" :rules="codigoProduccionRules"
                                                                @input="codigoProduccion = codigoProduccion.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="productoRules" @click="showProductosModal()"
                                                                style="float: right" title="BUSCAR PRODUCTOS">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreProducto" label="PRODUCTO"
                                                                :counter="100" :rules="nombreProductoRules"
                                                                @input="nombreProducto = nombreProducto.toUpperCase()"
                                                                required disabled></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="cantidadProduccion" label="CANTIDAD"
                                                                :counter="100" :rules="cantidadProduccionRules"
                                                                @input="cantidadProduccion = cantidadProduccion.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreFabrica" label="FABRICA"
                                                                :counter="100" :rules="nombreFabricaRules"
                                                                @input="nombreProducto = nombreProducto.toUpperCase()"
                                                                required disabled></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="8"></v-col>

                                                        <v-col cols="12" md="8"> </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-toolbar dense shaped>
                                                                <v-toolbar-title>
                                                                    <h6>
                                                                        OPCIONES
                                                                    </h6>
                                                                </v-toolbar-title>
                                                                <v-btn icon v-if="botonact == 1" class="mx-2" fab dark
                                                                    color="#0A62BF" @click="actualizarProduccion()"
                                                                    style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn icon v-if="botonact == 0" class="mx-2" fab dark
                                                                    color="#0ABF55" @click="registrarProduccion()"
                                                                    style="float: left" title="REGISTRAR PRODUCCION">
                                                                    <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                                                </v-btn>
                                                                <v-btn icon color="#EE680B" class="mx-2" fab dark
                                                                    @click="limpiar()" style="float: left"
                                                                    title="LIMPIAR FORMULARIO">
                                                                    <v-icon dark> mdi-eraser </v-icon>
                                                                </v-btn>
                                                            </v-toolbar>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>LISTA DE PRODUCCION</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>

                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>PRODUCCION</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarProducciones"
                                                                    append-icon="mdi-magnify" label="BUSCAR PRODUCCION"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersProduccion"
                                                                :items="datosProduccion" :search="buscarProducciones"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'EN PRODUCCION'" color="green"
                                                                        class="mx-2" large @click="terminar(item)"
                                                                        title="TERMINAR PRODUCCION">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        class="mx-2" large @click="desactivar(item)"
                                                                        title="CANCELAR PRODUCCION">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#001781"
                                                                        @click="showInfoProduccion(item)"
                                                                        title="VER INFORMACION">
                                                                        mdi-eye
                                                                    </v-icon>
                                                                </template>

                                                            </v-data-table>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>LISTA DE PRODUCCION TERMINADA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Produccion</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarProducciones" append-icon="mdi-magnify"
                                            label="BUSCAR PRODUCCIONES" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersProduccionTer" :items="datosProduccionTer"
                                        :search="buscarProducciones" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.est == 'INACTIVO'" color="green" large class="mr-2"
                                                @click="activar(item)" title="ACTIVAR PRODUCCION">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.est == 'ACTIVO'" color="red" large class="mr-2"
                                                @click="desactivar(item)" title="DESACTIVAR PRODUCCION">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon large class="mr-2" color="#001781" @click="showInfoProduccion(item)"
                                                title="VER INFORMACION">
                                                mdi-eye
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                            </v-tabs>
                        </v-col>
                    </v-row>

                    <div class="text-center">
                        <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00" outlined>
                            <strong>{{ mensajeSnackbar }}</strong>


                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                    mdi-close
                                </v-icon>
                            </template>
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

                </v-container>
            </v-form>
        </div>
    </v-card>
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";

export default {
    data() {
        return {
            flag: 1,
            activo: "",
            valid: true,
            botonact: 0,
            //#region Produccions
            idProduccion: "",
            cantidadProduccion: "",
            codigoProduccion: "",
            buscarProduccion: "",
            datosProduccion: [],
            headersProduccion: [
                { text: "CODIGO PRODUCCION", value: "codprodu", sortable: true },
                { text: "CANTIDAD", value: "cant", sortable: true },
                { text: "FABRICA", value: "nomfab", sortable: true },
                { text: "PRODUCTO", value: "nomprod", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProduccionTer: [],
            headersProduccionTer: [
                { text: "CODIGO PRODUCCION", value: "codprodu", sortable: true },
                { text: "CANTIDAD", value: "cant", sortable: true },
                { text: "FABRICA", value: "nomfab", sortable: true },
                { text: "PRODUCTO", value: "nomprod", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Fabrica 
            idFabrica: 1,
            nombreFabrica: "",
            codigoFabrica: "",
            direccionFabrica: "",
            latitud: "",
            longitud: "",
            departamento: "",
            ciudad: "",
            datosFabricas: [],
            headersFabricas: [
                { text: "NOMBRE FABRICA", value: "nomfab", sortable: false },
                { text: "CODIGO FABRICA", value: "codfab", sortable: false },
                { text: "CIUDAD", value: "ciu", sortable: false },
                { text: "DEPARTAMENTO", value: "depa", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#region Modals
            agregarProduccionModal: 0,
            editProduccionModal: 0,
            infoProduccionModal: 0,
            produccionTerminadaModal: 0,
            productosModal: 0,
            //#endregion
            //#region Productos
            idProducto: "",
            nombreProducto: "",
            codigoProducto: "",
            datosProductos: [],
            headersProductos: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProductoInh: [],
            headersProductoInh: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Snackbars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion
        }
    },
    created: function () {
        this.listarProduccion();
        this.listarProduccionT();
    },
    methods: {
        colorEstado(est) {
            if (est == 'TERMINADO') return 'green'
            else return 'orange'
        },
        //#region Listados
        listarProducciones() {
            this.listarProduccion()
        },
        async listarProduccion() {
            let me = this;
            await axios
                .get("/produccion/listarproduccion")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProduccion = [];

                    } else {
                        me.datosProduccion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarproduccionT() {
            this.listarProduccionT()
        },
        async listarProduccionT() {
            let me = this;
            await axios
                .get("/produccion/listarproducciont")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProduccionTer = [];

                    } else {
                        me.datosProduccionTer = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarProducto() {
            this.listarProductos();
        },
        async listarProductos() {
            let me = this;
            await axios
                .get("/producto/listarproductos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProductos = [];

                    } else {
                        //console.log(response.data);
                        me.datosProductos = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        //#endregion

        //#region Adicion
        registrarProduccion() {
            this.registroProduccion(this.codigoProduccion, this.idFabrica, this.idProducto, this.cantidadProduccion);
        },
        async registroProduccion(
            codigoProduccion,
            idFabrica,
            idProducto,
            cantidadProduccion

        ) {
            let me = this;
            await axios
                .post(
                    "/produccion/addproduccion/" +
                    this.codigoProduccion +
                    "," +
                    this.idFabrica +
                    "," +
                    this.idProducto +
                    "," +
                    this.cantidadProduccion
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarProduccion();
                    me.agregarProduccionModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Edicion
        editarProduccions() {
            this.editarProduccion(this.idProduccion, this.nombreProduccion, this.codigoProduccion);
        },
        async editarProduccion(
            idProduccion,
            codigoProduccion,
            cantidadProduccion
        ) {
            let me = this;
            await axios
                .post(
                    "/Produccion/updProduccion/" +
                    this.idProduccion +
                    "," +
                    this.codigoProduccion +
                    "," +
                    this.cantidadProduccion
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProduccion();
                    me.editProduccionModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Modals
        showAgregarProduccion() {
            this.agregarProduccionModal = true;
        },
        closeAgregarProduccion() {
            this.agregarProduccionModal = false;
        },
        showEditProduccionModal(item) {
            this.editProduccionModal = true;
            this.botonact = 1;
            this.idProduccion = item.idlin;
            this.codigoProduccion = item.nomlin;
            this.cantidadProduccion = item.codlin;
        },
        closeEditProduccionModal() {
            this.editProduccionModal = false;
        },
        showInfoProduccion(item) {
            this.infoProduccionModal = true;
            this.idProduccion = item.idprodu;
            this.codigoProduccion = item.codprodu;
            this.cantidadProduccion = item.cant;
        },
        closeInfoProduccionModal() {
            this.infoProduccionModal = false;
        },
        showProduccionTerminadaModal() {
            this.produccionTerminadaModal = true;
            this.listarProduccionT();
        },
        closeProduccionTerminadaModal() {
            this.produccionTerminadaModal = false
        },
        showProductosModal() {
            this.productosModal = true;
            this.listarProductos();
        },
        closeProductosModal() {
            this.productosModal = false;
        },
        //#endregion
        //#region Cambios Estado
        terminar(item) {
            this.idProduccion = item.idprodu;
            this.terminarProduccion(this.idProduccion);
        },
        async terminarProduccion(idProduccion) {
            let me = this;
            await axios
                .post("/produccion/terminarproduccion/" + this.idProduccion).then(function (response) {

                    me.listarProduccion();
                    me.listarProduccionT();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idProduccion = item.idlin;
            this.desactivarProduccion(this.idProduccion);
        },
        async desactivarProduccion(idProduccion) {
            let me = this;
            await axios
                .post("/produccion/offproduccion/" + this.idProduccion).then(function (response) {

                    me.listarProduccion();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        //#region Seleccion Datos
        seleccionarProducto(item) {
            this.idProducto = item.idprod;
            this.nombreProducto = item.nomprod;
            this.productosModal = false;
        },
        //#endregion
        limpiar() {
            this.nombreProduccion = "";
            this.codigoProduccion = "";
        },

    },
}
</script>