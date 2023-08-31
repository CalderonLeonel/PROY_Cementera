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
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="codigoProduccion" label="CODIGO" :counter="100"
                                        :rules="codigoProduccionRules"
                                        @input="codigoProduccion = codigoProduccion.toUpperCase()" required></v-text-field>
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
                                        @input="cantidadProduccion = cantidadProduccion.toUpperCase()"
                                        required></v-text-field>
                                </v-col>


                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                        @click="closeAgregarProduccion()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon v-if="botonact == 1" color="#EE680B" @click="actualizarProduccion()"
                                            style="float: left" title="ACTUALIZAR INFORMACIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="#EE680B" @click="registrarProduccion()"
                                            style="float: left" title="REGISTRAR PRODUCCION" width="28px" height="28px">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon color="#EE680B" @click="limpiar()" style="float: left"
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

        <v-dialog v-model="produccionInhabilitadasModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>PRODUCCIONES CANCELADAS</span><br>
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
                                        <v-text-field v-model="buscarProduccions" append-icon="mdi-magnify"
                                            label="BUSCAR ProduccionS" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersProduccionsInh" :items="datosProduccionsInh"
                                        :search="buscarProduccions" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                                @click="activar(item)" title="ACTIVAR ProduccionS">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                                @click="desactivar(item)" title="DESACTIVAR ProduccionS">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon small class="mr-2" color="#001781" @click="showInfoProduccion(item)"
                                                title="VER INFORMACION">
                                                mdi-eye
                                            </v-icon>
                                        </template>

                                    </v-data-table>
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

        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>PRODUCCION</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showAgregarProduccion()">Nueva Produccion</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showProduccionInhabilitadas()">Produccion Inactivas</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Produccion</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="buscarProduccions" append-icon="mdi-magnify"
                                    label="BUSCAR PRODUCCION" single-line hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table :headers="headersProduccion" :items="datosProduccion"
                                :search="buscarProduccions" :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="colorEstado(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>


                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                        @click="activar(item)" title="ACTIVAR PRODUCCION">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                        @click="desactivar(item)" title="CANCELAR PRODUCCION">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showEditProduccionModal(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showInfoProduccion(item)"
                                        title="VER INFORMACION">
                                        mdi-eye
                                    </v-icon>
                                </template>

                            </v-data-table>
                        </v-col>
                    </v-row>
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
            activo: "",
            valid: true,
            botonact: 0,
            //#region Produccions
            idProduccion: "",
            cantidadProduccion: "",
            codigoProduccion: "",
            buscarProduccion: "",
            datosProduccions: [],
            headersProduccions: [
                { text: "NOMBRE Produccion", value: "nomlin", sortable: true },
                { text: "CODIGO Produccion", value: "codlin", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProduccionsInh: [],
            headersProduccionsInh: [
                { text: "NOMBRE Produccion", value: "nomlin", sortable: true },
                { text: "CODIGO Produccion", value: "codlin", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Modals
            agregarProduccionModal: 0,
            editProduccionModal: 0,
            infoProduccionModal: 0,
            produccionInhabilitadasModal: 0,
            //#endregion
        }
    },
    created: function () {
        this.listarProduccion();
    },
    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
        listarProduccion() {
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

        listarProduccionInh() {
            this.listarProduccionInh()
        },
        async listarProduccionInh() {
            let me = this;
            await axios
                .get("/produccion/listarproduccioninh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProduccionInh = [];

                    } else {
                        me.datosProduccionInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Adicion
        registrarProduccion() {
            this.registroProduccion(this.codigoProduccion, this.cantidadProduccion);
        },
        async registroProduccion(
            codigoProduccion,
            cantidadProduccion
        ) {
            let me = this;
            await axios
                .post(
                    "/Produccion/addProduccion/" +
                    this.codigoProduccion +
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
            this.idProduccion = item.idlin;
            this.codigoProduccion = item.nomlin;
            this.cantidadProduccion = item.codlin;
        },
        closeInfoProduccionModal() {
            this.infoProduccionModal = false;
        },
        showProduccionInhabilitadas() {
            this.produccionInhabilitadasModal = true;
            this.listarProduccionsInh();
        },
        closeProduccionsInhabilitadas() {
            this.produccionInhabilitadasModal = false
        },
        //#endregion
        //#region Cambios Estado
        activar(item) {
            this.idProduccion = item.idlin;
            this.activarProduccion(this.idProduccion);
        },
        async activarProduccion(idProduccion) {
            let me = this;
            await axios
                .post("/produccion/onproduccion/" + this.idProduccion).then(function (response) {

                    me.listarProduccion();
                    me.listarProduccionInh();

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
        limpiar() {
            this.nombreProduccion = "";
            this.codigoProduccion = "";
        },
    },
}
</script>