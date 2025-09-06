<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarFormatoModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR FORMATO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO" :counter="100"
                                        :rules="nombreFormatoRules" @input="nombreFormato = nombreFormato.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoFormato" label="CÓDIGO FORMATO" :counter="100"
                                        :rules="codigoFormatoRules" @input="codigoFormato = codigoFormato.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAgregarFormato()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
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
                                        <v-btn icon large v-if="botonact == 1" color="primary"
                                            @click="actualizarFormato()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon large v-if="botonact == 0" color="success"
                                            @click="registrarFormato()" style="float: left" title="REGISTRAR Formato"
                                            width="28px" height="28px">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>
                                        <v-btn icon large color="#BF120A" @click="limpiar()" style="float: left"
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

        <v-dialog v-model="infoFormatoModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DEL FORMATO:</span><br>
                    <span>{{ nombreFormato }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO" :counter="100"
                                        :rules="nombreFormatoRules" @input="nombreFormato = nombreFormato.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="codigoFormato" label="CÓDIGO FORMATO" :counter="100"
                                        :rules="codigoFormatoRules" @input="codigoFormato = codigoFormato.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeInfoFormatoModal()"
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

        <v-dialog v-model="editFormatoModal" max-width="800px" persistent>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>EDITAR FORMATO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO" :counter="100"
                                        :rules="nombreFormatoRules" @input="nombreFormato = nombreFormato.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoFormato" label="CÓDIGO FORMATO" :counter="100"
                                        :rules="codigoFormatoRules" @input="codigoFormato = codigoFormato.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon large class="mx-2" fab dark small v-if="botonact == 1"
                                            color="#0A62BF" @click="editarFormatos()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon large class="mx-2" fab dark small v-if="botonact == 0"
                                            color="#0ABF55" @click="registrarFormato()" style="float: left"
                                            title="REGISTRAR FORMATO">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>
                                        <v-btn icon large class="mx-2" fab dark small color="#BF120A" @click="limpiar()"
                                            style="float: left" title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeEditFormatoModal()"
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

        <v-dialog v-model="formatosInhabilitadosModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>FORMATOS INACTIVOS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Formatos</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarFormatos" append-icon="mdi-magnify"
                                            label="BUSCAR FORMATOS" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersFormatosInh" :items="datosFormatosInh"
                                        :search="buscarFormatos" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.est == 'INACTIVO'" color="green" large class="mr-2"
                                                @click="activar(item)" title="ACTIVAR FormatoS">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.est == 'ACTIVO'" color="red" large class="mr-2"
                                                @click="desactivar(item)" title="DESACTIVAR FormatoS">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon large class="mr-2" color="#0A62BF" @click="showInfoFormato(item)"
                                                title="VER INFORMACION">
                                                mdi-eye
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeInfoFormatoModal()"
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


        <div>
            <v-alert dense color="cyan" style="color: #ffffff">
                <h5>FORMATOS</h5>
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
                                    FORM.
                                </v-tab>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    FORM.
                                </v-tab>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    FORM
                                    INAC.
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR FORMATO</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" md="4"></v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO"
                                                                :counter="100" :rules="nombreFormatoRules"
                                                                @input="nombreFormato = nombreFormato.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4"></v-col>

                                                        <v-col cols="12" md="4"></v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="codigoFormato" label="CÓDIGO FORMATO"
                                                                :counter="100" :rules="codigoFormatoRules"
                                                                @input="codigoFormato = codigoFormato.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4"></v-col>

                                                        <v-col cols="12" md="8"> </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-toolbar dense shaped>
                                                                <v-toolbar-title>
                                                                    <h6>
                                                                        OPCIONES
                                                                    </h6>
                                                                </v-toolbar-title>
                                                                <v-btn icon large v-if="botonact == 1" class="mx-2" fab
                                                                    dark color="#0A62BF" @click="actualizarFormato()"
                                                                    style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn icon large v-if="botonact == 0" class="mx-2" fab
                                                                    dark color="#0ABF55" @click="registrarFormato()"
                                                                    style="float: left" title="REGISTRAR FORMATO">
                                                                    <v-icon dark> mdi-content-save
                                                                    </v-icon>
                                                                </v-btn>
                                                                <v-btn icon large class="mx-2" fab dark x-small
                                                                    color="#BF120A" @click="limpiar()"
                                                                    style="float: left" title="LIMPIAR FORMULARIO">
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
                                            <span>LISTA DE FORMATOS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>FORMATOS</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarFormatos"
                                                                    append-icon="mdi-magnify" label="BUSCAR FORMATOS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>

                                                            <v-card-title>
                                                                <v-btn color="primary"
                                                                    @click="exportToPDFFormatos()">PDF</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToCSVFormatos()">CSV</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToExcelFormatos()">EXCEL</v-btn>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersFormatos"
                                                                :items="datosFormatos" :search="buscarFormatos"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        class="mx-2" large @click="activar(item)"
                                                                        title="ACTIVAR FormatoS">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        class="mx-2" large @click="desactivar(item)"
                                                                        title="DESACTIVAR FormatoS">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#0A62BF"
                                                                        @click="showEditFormatoModal(item)"
                                                                        title="ACTUALIZAR INFORMACION">
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#0A62BF"
                                                                        @click="showInfoFormato(item)"
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
                                            <span>LISTA DE FORMATOS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>FORMATOS INNACTIVOS</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarFormatos"
                                                                    append-icon="mdi-magnify" label="BUSCAR FORMATOS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>
                                                            <v-data-table :headers="headersFormatosInh"
                                                                :items="datosFormatosInh" :search="buscarFormatos"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        large class="mr-2" @click="activar(item)"
                                                                        title="ACTIVAR FormatoS">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        large class="mr-2" @click="desactivar(item)"
                                                                        title="DESACTIVAR FormatoS">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon large class="mr-2" color="#0A62BF"
                                                                        @click="showInfoFormato(item)"
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
import * as XLSX from 'xlsx';

import Papa from "papaparse";

import jsPDF from "jspdf";
import 'jspdf-autotable';

export default {
    data() {
        return {
            valid: true,
            flag: 1,
            //#region Formato
            idFormato: "",
            codigoFormato: "",
            nombreFormato: "",
            buscarFormatos: "",
            datosFormatos: [],
            headersFormatos: [
                { text: "NOMBRE FORMATO", value: "nomforma", sortable: false },
                { text: "CÓDIGO FORMATO", value: "codforma", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosFormatosInh: [],
            headersFormatosInh: [
                { text: "NOMBRE FORMATO", value: "nomforma", sortable: false },
                { text: "CÓDIGO FORMATO", value: "codforma", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Modals
            agregarFormatoModal: 0,
            editFormatoModal: 0,
            infoFormatoModal: 0,
            formatosInhabilitadosModal: 0,
            //#endregion
            botonact: 0,

            //#region Snackbars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion

            //#region Rules
            nombreFormatoRules: [
                v => !!v || "El nombre del formato es obligatorio",
                v => (v && v.trim().length >= 3) || "El nombre debe tener al menos 3 caracteres",
                v => (v && v.length <= 100) || "El nombre no debe exceder 100 caracteres",
                v => /^[A-Za-zÁÉÍÓÚÑÜ\s]+$/.test(v) || "Solo se permiten letras y espacios",
            ],
            codigoFormatoRules: [
                v => !!v || "El código del formato es obligatorio",
                v => (v && v.trim().length >= 2) || "El código debe tener al menos 2 caracteres",
                v => (v && v.length <= 20) || "El código no debe exceder 20 caracteres",
                v => /^[A-Za-z0-9\-]+$/.test(v) || "El código solo puede contener letras, números o guiones",
            ],
            //#endregion
        }
    },

    created: function () {
        this.listarFormatos();
        this.listarFormatosInh();

    },

    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
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

        listarFormatoInh() {
            this.listarFormatosInh()
        },
        async listarFormatosInh() {
            let me = this;
            await axios
                .get("/formato/listarformatosinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFormatosInh = [];

                    } else {
                        me.datosFormatosInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Agregar
        registrarFormato() {
            this.registroFormato(this.nombreFormato, this.codigoFormato);
        },
        async registroFormato(
            nombreFormato,
            codigoFormato
        ) {
            let me = this;
            await axios
                .post(
                    "/formato/addformato/" +
                    this.nombreFormato +
                    "," +
                    this.codigoFormato
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarFormatos();
                    me.agregarFormatoModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },
        //#endregion
        //#region Edicion
        editarFormatos() {
            this.editarFormato(this.idFormato, this.nombreFormato, this.codigoFormato);
        },
        async editarFormato(
            idFormato,
            nombreFormato,
            codigoFormato
        ) {
            let me = this;
            await axios
                .post(
                    "/formato/updformato/" +
                    this.idFormato +
                    "," +
                    this.nombreFormato +
                    "," +
                    this.codigoFormato
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarFormatos();
                    me.editFormatoModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Cambio Estados
        activar(item) {
            this.idFormato = item.idforma;
            this.activarFormato(this.idFormato);
        },
        async activarFormato(idFormato) {
            let me = this;
            await axios
                .post("/formato/onformato/" + this.idFormato).then(function (response) {

                    me.listarFormatos();
                    me.listarFormatosInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idFormato = item.idforma;
            this.desactivarFormato(this.idFormato);
        },
        async desactivarFormato(idFormato) {
            let me = this;
            await axios
                .post("/formato/offformato/" + this.idFormato).then(function (response) {

                    me.listarFormatosInh();
                    me.listarFormatos();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        //#region Modals
        showAgregarFormato() {
            this.agregarFormatoModal = true;
        },
        showEditFormatoModal(item) {
            this.editFormatoModal = true;
            this.botonact = 1;
            this.idFormato = item.idforma;
            this.nombreFormato = item.nomforma;
            this.codigoFormato = item.codforma;
        },
        closeEditFormatoModal() {
            this.editFormatoModal = false;
        },
        showFormatosInhabilitados() {
            this.formatosInhabilitadosModal = true
            this.listarFormatosInh();
        },
        showInfoFormato(item) {
            this.infoFormatoModal = true;
            this.idFormato = item.idforma;
            this.nombreFormato = item.nomforma;
            this.codigoFormato = item.codforma;
        },
        closeInfoFormatoModal() {
            this.infoFormatoModal = false;
        },
        //#endregion

        limpiar() {
            this.nombreFormato = "";
            this.codigoFormato = "";
            this.idFormato = "";
        },
        //#region Reports
        async exportToCSVFormatos() {
            try {
                const response = await axios.get(`/formato/listarformatos/`); // Ruta adaptada para formatos
                const jsonData = response.data.resultado || [];

                const csvData = Papa.unparse(jsonData);

                const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = "formatos.csv";
                link.click();
            } catch (error) {
                console.error(error);
            }
        },

        async exportToExcelFormatos() {
            try {
                const response = await axios.get(`/formato/listarformatos/`); // Ruta adaptada para formatos
                const jsonData = response.data.resultado || [];
                const worksheet = XLSX.utils.json_to_sheet(jsonData);
                const workbook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

                XLSX.writeFile(workbook, "formatos.xlsx", { compression: true });
            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFFormatos() {
            try {
                const response = await axios.get(`/formato/listarformatos/`); // Ruta adaptada para formatos
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(item => [
                    item.codforma,
                    item.nomforma,
                    item.est
                ]);
                const doc = new jsPDF();
                doc.text("Listado de Formatos", 10, 10);
                doc.autoTable({
                    head: [["Código de Formato", "Nombre de Formato", "Estado"]],
                    body: bodyData
                });
                doc.save("formatos.pdf");
            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFFormatoDetailed(item) {
            try {
                const response = await axios.get(`/formato/listarformatos/` + item.idFormato); // Ruta adaptada para detalle de formatos
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(data => [
                    data.codforma,
                    data.nomforma,
                    data.descripcion,
                    data.est
                ]);
                const doc = new jsPDF();
                doc.text("Detalle del Formato: " + item.nombreFormato.charAt(0).toUpperCase() + item.nombreFormato.slice(1).toLowerCase(), 10, 10);
                doc.autoTable({
                    head: [["Código", "Nombre", "Descripción", "Estado"]],
                    body: bodyData
                });
                doc.save("detalle_formato.pdf");
            } catch (error) {
                console.error(error);
            }
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
        //#endregion

    },
}
</script>