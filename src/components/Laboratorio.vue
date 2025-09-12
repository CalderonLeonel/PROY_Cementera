<template>

    <v-card elevation="5" outlined shaped>

        <v-dialog v-model="formatoModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE FORMATOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarFormato" append-icon="mdi-magnify"
                                        label="BUSCAR FORMATO" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersFormatos" :items="datosFormatos" :search="buscarFormato"
                                    :items-per-page="5" class="elevation-1" id="tableId">

                                    <template #[`item.est`]="{ item }">
                                        <v-chip :color="colorEstado(item.est)" dark>
                                            {{ item.est }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" color="#0A62BF" @click="seleccionarFormato(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>

                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeFormato()"
                                    style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    SALIR
                                </v-btn>

                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="tipoProductoModal" persistent max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE TIPOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarTipo" append-icon="mdi-magnify" label="BUSCAR TIPO"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersTipos" :items="datosTipos" :search="buscarTipo"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.est`]="{ item }">
                                        <v-chip :color="colorEstado(item.est)" dark>
                                            {{ item.est }}
                                        </v-chip>
                                    </template>
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" color="#0A62BF" @click="seleccionarTipo(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeTipos()"
                                    style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    SALIR
                                </v-btn>

                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Modal para revisión del producto -->
        <v-dialog v-model="revisionModal" persistent max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>REVISAR PRODUCTO</span>
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>

                                <v-col cols="12">
                                    <v-text-field v-model="nombreProducto" label="NOMBRE DE PRODUCTO"
                                        readonly></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="codigoProducto" label="CÓDIGO DE PRODUCTO"
                                        readonly></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="observaciones" label="COMENTARIOS"></v-textarea>
                                </v-col>


                                <v-spacer></v-spacer>
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#ffffff">
                                        <v-toolbar-title style="color: #000000;">
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon large class="mx-2" fab dark x-small color="#0A62BF"
                                            @click="avanzarFase()" tyle="float: left" title="AVANZAR FASE">
                                            <v-icon dark> mdi-page-next-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon large v-if="est === 'FINALIZADO'" class="mx-2" fab dark x-small
                                            color="#0A62BF" @click="moverAProduccion()" style="float: left"
                                            title="MOVER A PRODUCCION">
                                            <v-icon dark> mdi-page-next-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon large class="mx-2" fab dark x-small color="#0ABF55"
                                            @click="registrarObservacionLabo()" style="float: left"
                                            title="REGISTRAR OBSERVACION PRODUCTO LABORATORIO">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn icon large class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeRevisionModal()" style="float: right" title="SALIR">
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

        <div>
            <v-alert dense color="cyan" style="color: #ffffff">
                <h5>LABORATORIO</h5>
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
                                    PROD. LABO.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-view-list
                                    </v-icon>
                                    PROD.
                                    REGISTRADOS
                                </v-tab>
                                <v-tab>
                                    <v-icon left>
                                        mdi-text-box
                                    </v-icon>
                                    OBSERV
                                    LABO
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR PRODUCTO LABORATORIO</span>
                                        </v-card-title>
                                        <v-card-text></v-card-text>
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <v-container>
                                                <v-row>

                                                    <v-row>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreProducto"
                                                                label="NOMBRE PRODUCTO" :counter="100"
                                                                :rules="nombreProductoRules"
                                                                @input="nombreProducto = nombreProducto.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="codigoProducto"
                                                                label="CÓDIGO PRODUCTO" :counter="100"
                                                                :rules="codigoProductoRules"
                                                                @input="codigoProducto = codigoProducto.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="ProductoRules" @click="showFormato()"
                                                                style="float: right" title="BUSCAR FORMATO">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="3">
                                                            <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO"
                                                                :counter="50" :rules="nombreFormatoRules"
                                                                @input="nombreFormato = nombreFormato.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="tipoRules" @click="showTipos()"
                                                                style="float: right" title="BUSCAR TIPO PRODUCTO">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="3">
                                                            <v-text-field v-model="nombreTipoProducto"
                                                                label="NOMBRE TIPO PRODUCTO" :counter="50"
                                                                :rules="nombreTipoProductoRules"
                                                                @input="nombreTipoProducto = nombreTipoProducto.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4"></v-col>

                                                        <v-col cols="12" md="8"> </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-toolbar dense shaped color="#ffffff">
                                                                <v-toolbar-title style="color: #000000;">
                                                                    <h6>
                                                                        OPCIONES
                                                                    </h6>
                                                                </v-toolbar-title>
                                                                <v-btn icon large class="mx-2" color="#00A1B1" fab dark
                                                                    x-small @click="limpiar()" style="float: left"
                                                                    title="BUSCAR PRODUCTO DEL LABORATORIO">
                                                                    <v-icon dark> mdi-magnify-plus </v-icon>
                                                                </v-btn>
                                                                <v-btn icon large v-if="botonAct == 1" class="mx-2" fab
                                                                    dark x-small color="#0A62BF"
                                                                    @click="actualizarProductos()" style="float: left"
                                                                    title="ACTUALIZAR INFORMACIÓN LABORATORIO">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn icon large v-if="botonAct == 0" class="mx-2" fab
                                                                    dark x-small color="#0ABF55"
                                                                    @click="registrarProductoLabo()" style="float: left"
                                                                    title="REGISTRAR PRODUCTO LABORATORIO">
                                                                    <v-icon dark> mdi-content-save </v-icon>
                                                                </v-btn>
                                                                <v-btn icon large color="#BF120A" class="mx-2" fab dark
                                                                    x-small @click="limpiar()" style="float: left"
                                                                    title="LIMPIAR FORMULARIO">
                                                                    <v-icon dark> mdi-eraser </v-icon>
                                                                </v-btn>
                                                            </v-toolbar>
                                                        </v-col>
                                                    </v-row>
                                                </v-row>
                                            </v-container>
                                        </v-form>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" persistent outlined shaped>
                                        <v-card-title>
                                            <span>LISTA DE PRODUCTOS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">

                                                            <!-- Combobox para seleccionar la fase -->
                                                            <v-combobox v-model="faseSeleccionada" :items="fases"
                                                                label="Seleccionar Fase"
                                                                @change="listarProductosLaboxFase()" single-line>
                                                            </v-combobox>

                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>PRODUCCIÓN DEL LABORATORIO</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarProdLabo"
                                                                    append-icon="mdi-magnify"
                                                                    label="BUSCAR PRODUCTOS DEL LABORATORIO" single-line
                                                                    hide-details></v-text-field>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersProdLabo"
                                                                :items="datosProdLabo" :search="buscarProdLabo"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>

                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon small class="mr-2" color="#0A62BF"
                                                                        @click="seleccionarProdLabo(item)"
                                                                        title="SELECCIONAR PRODUCTO LABORATORIO">
                                                                        mdi-check-circle
                                                                    </v-icon>
                                                                    <v-icon small class="mr-2" color="#0A62BF"
                                                                        @click="generarPDF(item)" title="VER PDF">
                                                                        mdi-printer-outline
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
                                    <v-card elevation="5" outline shaped>
                                        <v-row>
                                            <v-col cols="12" md="12"></v-col>
                                            <v-col cols="12" md="12">
                                                <v-textarea v-model="observaciones" filled
                                                    label="OBSERVACIONES DEL PRODUCTO DE LABORATORIO" auto-grow
                                                    value=""></v-textarea>
                                            </v-col>

                                            <v-col cols="12" md="8"> </v-col>
                                            <v-col cols="12" md="4">
                                                <v-toolbar dense shaped color="#ffffff">
                                                    <v-toolbar-title style="color: #000000;">
                                                        <h6>
                                                            OPCIONES
                                                        </h6>
                                                    </v-toolbar-title>

                                                    <v-btn icon large class="mx-2" fab dark x-small color="#0ABF55"
                                                        @click="registrarObservacionLabo()" style="float: left"
                                                        title="REGISTRAR PRODUCTO LABORATORIO">
                                                        <v-icon dark> mdi-content-save </v-icon>
                                                    </v-btn>
                                                    <v-btn icon large color="#BF120A" class="mx-2" fab dark x-small
                                                        @click="limpiar()" style="float: left"
                                                        title="LIMPIAR FORMULARIO">
                                                        <v-icon dark> mdi-eraser </v-icon>
                                                    </v-btn>
                                                </v-toolbar>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-list-item>
                                                    <v-list-item-title class="text-center">
                                                        <h5>OBSERVACIONES LABORATORIO</h5>
                                                    </v-list-item-title>
                                                </v-list-item>

                                                <v-card-title>
                                                    <v-text-field v-model="buscarObservaciones"
                                                        append-icon="mdi-magnify"
                                                        label="BUSCAR OBSERVACIONES DEL LABORATORIO" single-line
                                                        hide-details></v-text-field>
                                                </v-card-title>


                                                <v-data-table :headers="headersObservaciones"
                                                    :items="datosObservaciones" :search="buscarObservaciones"
                                                    :items-per-page="5" class="elevation-1" id="tableId">

                                                    <template #[`item.est`]="{ item }">
                                                        <v-chip :color="colorEstado(item.est)" dark>
                                                            {{ item.est }}
                                                        </v-chip>
                                                    </template>

                                                    <template #[`item.actions`]="{ item }">
                                                        <v-icon small class="mr-2" color="#0A62BF"
                                                            @click="seleccionarObservacion(item)"
                                                            title="SELECCIONAR OBSERVACION LABORATORIO">
                                                            mdi-check-circle
                                                        </v-icon>
                                                        <v-icon small class="mr-2" color="#0A62BF"
                                                            @click="generarPDF(item)" title="VER PDF">
                                                            mdi-printer-outline
                                                        </v-icon>
                                                    </template>

                                                </v-data-table>
                                            </v-col>

                                        </v-row>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </v-col>
                    </v-row>

                    <div class="text-center">
                        <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00"
                            outlined>
                            <strong>{{ mensajeSnackbar }}</strong>


                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                    mdi-close
                                </v-icon>
                            </template>
                        </v-snackbar>
                    </div>

                    <div class="text-center">

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error"
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
import * as XLSX from 'xlsx';


import Papa from "papaparse";

import jsPDF from "jspdf";
import 'jspdf-autotable';

export default {

    data() {
        return {
            flag: 1,
            //#region Producto Laboratorio
            fases: ["FASE INICIAL", "FASE PRUEBAS", "FASE FINAL"],
            faseSeleccionada: "FASE INICIAL",
            idProducto: "",
            nombreProducto: "",
            codigoProducto: "",
            observaciones: "",
            idObservacion: "",
            descripcion: "",
            datosProdLabo: [],
            headersProdLabo: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CÓDIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosObservaciones: [],
            headersObservaciones: [
                { text: "DESCRIPCIÓN", value: "des", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Formato
            idFormato: "",
            codigoFormato: "",
            nombreFormato: "",
            datosFormatos: [],
            headersFormatos: [
                { text: "NOMBRE FORMATO", value: "nomforma", sortable: false },
                { text: "CÓDIGO FORMATO", value: "codforma", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Tipo Producto
            idTipo: "",
            nombreTipo: "",
            codigoTipo: "",
            buscarTipos: "",
            datosTipos: [],
            headersTipos: [
                { text: "NOMBRE T.PRODUCTO", value: "nomtipo", sortable: false },
                { text: "CÓDIGO T.PRODUCTO", value: "codtipo", sortable: false },
                { text: "NOMBRE producto", value: "nomlin", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Modals
            formatoModal: 0,
            tipoProductoModal: 0,
            revisionModal: 0,
            //#endregion
            botonAct: 0,
            idFabrica: 1,
            idUsuario: 1,
            selectedProduct: null,


            //#region Snackbars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion


            //#region Rules
            nombreProductoRules: [
                v => !!v || "El nombre del producto es obligatorio",
                v => (v && v.length >= 3) || "Debe tener al menos 3 caracteres",
                v => (v && v.length <= 100) || "No debe exceder 100 caracteres",
            ],
            codigoProductoRules: [
                v => !!v || "El código del producto es obligatorio",
                v => (v && v.length >= 2) || "Debe tener al menos 2 caracteres",
                v => (v && v.length <= 50) || "No debe exceder 50 caracteres",
                v => /^[A-Za-z0-9\-]+$/.test(v) || "Solo letras, números y guiones",
            ],
            nombreFormatoRules: [
                v => !!v || "Debe seleccionar un formato",
                v => (v && v.length <= 50) || "El nombre del formato no debe exceder 50 caracteres",
            ],
            nombreTipoProductoRules: [
                v => !!v || "Debe seleccionar un tipo de producto",
                v => (v && v.length <= 50) || "El nombre del tipo no debe exceder 50 caracteres",
            ],
            faseSeleccionadaRules: [
                v => !!v || "Debe seleccionar una fase antes de listar productos",
            ],
            observacionesRules: [
                v => !!v || "Debe ingresar una observación",
                v => (v && v.length >= 5) || "Debe tener al menos 5 caracteres",
                v => (v && v.length <= 500) || "No debe exceder 500 caracteres",
            ],
            //#endregion

        }
    },

    created: function () {
        this.listarProductosLabo();
        this.listarObservaciones();
    },

    methods: {
        colorEstado(est) {
            switch (est) {
                case 'FASE INICIAL':
                    return 'blue';
                case 'FASE PRUEBAS':
                    return 'orange';
                case 'FASE FINAL':
                    return 'green';
                case 'EN LABORATORIO':
                    return 'cyan';
                default:
                    return 'red';
            }
        },
        //#region Listar
        listarProductoLabo() {
            this.listarProductosLabo();
        },
        async listarProductosLabo() {
            let me = this;
            await axios
                .get("/producto/listarproductoslabo")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProdLabo = [];

                    } else {
                        me.datosProdLabo = response.data.resultado;

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarProductoLaboxFase() {
            this.listarProductosLaboxFase();
        },
        async listarProductosLaboxFase() {
            let me = this;
            await axios
                .get("/producto/listarproductoslaboxfase/" + this.faseSeleccionada)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProdLabo = [];

                    } else {
                        me.datosProdLabo = response.data.resultado;

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarObservacion() {
            this.listarObservaciones();
        },
        async listarObservaciones() {
            let me = this;
            await axios
                .get("/producto/listarobservaciones")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosObservaciones = [];

                    } else {
                        me.datosObservaciones = response.data.resultado;

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarFormato() {
            this.listarFormatos();
        },
        async listarFormatos() {
            let me = this;
            await axios
                .get("/formato/listarformatos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFormatos = [];

                    } else {
                        me.datosFormatos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarTipo() {
            this.listarTipos();
        },
        async listarTipos() {
            let me = this;
            await axios
                .get("/tipo/listartipos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosTipos = [];

                    } else {
                        me.datosTipos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Registro
        //#region Adicionar
        registrarProductosLabo() {
            this.registrarProductoLabo(this.nombreProducto, this.codigoProducto, this.idTipo, this.idFormato, this.idFabrica);
        },
        async registrarProductoLabo(
            nombreProducto,
            codigoProducto,
            idTipo,
            idFormato,
            idFabrica
        ) {
            let me = this;
            await axios
                .post(
                    "/producto/addproductolabo/" +
                    this.nombreProducto +
                    "," +
                    this.codigoProducto +
                    "," +
                    this.idTipo +
                    "," +
                    this.idFormato +
                    "," +
                    this.idFabrica

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProductosLabo();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.mensajeSnackbar = error.response.data.message;
                    nackbarError = true;
                });

        },

        registrarObservacionesLabo() {
            this.registrarObservacionLabo(this.observaciones, this.idFabrica, this.idUsuario, this.idProducto)
        },
        async registrarObservacionLabo(
            observaciones,
            idFabrica,
            idUsuario,
            idProducto
        ) {
            let me = this;
            await axios
                .post(
                    "/producto/addobsproductolabo/" +
                    this.observaciones +
                    "," +
                    this.idFabrica +
                    "," +
                    this.idUsuario +
                    "," +
                    this.idProducto

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarObservacion();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        avanzarFaseLaboratorio() {
            this.avanzarFase(this.idProducto)
        },
        async avanzarFase(
            idProducto
        ) {
            let me = this;
            await axios
                .post(
                    "/producto/avanzarfaseprod/" +
                    this.idProducto

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProductosLabo();
                    me.limpiar();
                    me.closeRevisionModal();
                })
                .catch(function (error) {
                    me.mensajeSnackbar = error.response.data.message;
                    nackbarError = true;
                });
        },
        //#endregion

        //#region Modals
        showTipos() {
            this.tipoProductoModal = true;
            this.listarTipos();
        },
        closeTipos() {
            this.tipoProductoModal = false;
        },
        showFormato() {
            this.formatoModal = true;
            this.listarFormatos();
        },
        closeFormato() {
            this.formatoModal = false;
        },
        //#endregion

        //#region Seleccion Datos
        seleccionarTipo(item) {
            this.idTipo = item.idtipo;
            this.nombreTipoProducto = item.nomtipo;
            this.tipoProductoModal = false;
        },
        seleccionarFormato(item) {
            this.idFormato = item.idforma;
            this.nombreFormato = item.nomforma;
            this.formatoModal = false;
        },
        seleccionarProdLabo(item) {
            this.idProducto = item.idprod;
            this.nombreProducto = item.nomprod;
            this.codigoProducto = item.codprod;
            this.idTipo = item.idtipo;
            this.nombreTipoProducto = item.nomtipo;
            this.idFormato = item.idform;
            this.nombreFormato = item.nomform;
            this.revisionModal = true;
        },
        seleccionarObservacion(item) {
            this.idObservacion = item.idobs;
            this.observaciones = item.des;
        },
        closeRevisionModal() {
            this.revisionModal = false;
        },
        //#endregion

        //#region PDF
        generarPDF(item) {
            // Crea una instancia de jsPDF
            const doc = new jsPDF();

            // Agrega el contenido al PDF
            doc.text('Observaciones del Producto de Laboratorio', 10, 10);
            doc.text('--------------------------------------------', 10, 20);
            doc.text(item.des, 10, 30);

            // Guarda el PDF o abre una nueva ventana con el PDF generado
            doc.save('observaciones.pdf');
        },
        //#endregion

        filtrarProductosPorFase(fase) {
            return this.datosProdLabo.filter((producto) => producto.est === fase.toUpperCase());
        },

    },

}
</script>