<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarTipoModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR TIPO PRODUCTO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreTipo" label="NOMBRE TIPO" :counter="100"
                                        :rules="nombreTipoRules" @input="nombreTipo = nombreTipo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoTipo" label="CÓDIGO TIPO" :counter="100"
                                        :rules="codigoTipoRules" @input="codigoTipo = codigoTipo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="3"></v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showLineas()" style="float: right" title="BUSCAR LÍNEAS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LÍNEA" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeAgregarTipo()" style="float: right"
                                        title="SALIR">
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
                                        <v-btn icon v-if="botonact == 1" color="primary" @click="actualizarTipo()"
                                            style="float: left" title="ACTUALIZAR INtipoCIÓN" width="28px"
                                            height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="success" @click="registrarTipo()"
                                            style="float: left" title="REGISTRAR TIPO" width="28px" height="28px">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>
                                        <v-btn icon color="#BF120A" @click="limpiar()" style="float: left"
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

        <v-dialog v-model="infoTipoModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACIÓN DEL TIPO:</span><br>
                    <span>{{ nombreTipo }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="nombreTipo" label="NOMBRE TIPO" :counter="100"
                                        :rules="nombreTipoRules" @input="nombreTipo = nombreTipo.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="codigoTipo" label="CÓDIGO TIPO" :counter="100"
                                        :rules="codigoTipoRules" @input="codigoTipo = codigoTipo.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeInfoTipoModal()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="editTipoModal" max-width="800px" persistent>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>EDITAR TIPO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreTipo" label="NOMBRE TIPO" :counter="100"
                                        :rules="nombreTipoRules" @input="nombreTipo = nombreTipo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoTipo" label="CÓDIGO TIPO" :counter="100"
                                        :rules="codigoTipoRules" @input="codigoTipo = codigoTipo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="3"></v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showLineas()" style="float: right" title="BUSCAR LÍNEAS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LÍNEA" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()"
                                        disabled required></v-text-field>
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
                                        <v-btn class="mx-2" fab dark small icon v-if="botonact == 1" color="primary"
                                            @click="editarTipos()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab dark small icon color="error" @click="limpiar()"
                                            style="float: left" title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeEditTipoModal()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="tiposInhabilitadosModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>TIPOS DE PRODUCTOS INACTIVOS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeInfoTipoModal()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="lineasModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LÍNEAS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>LÍNEAS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarLineas" append-icon="mdi-magnify"
                                            label="BUSCAR LÍNEAS" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersLineas" :items="datosLineas" :search="buscarLineas"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon large class="mr-2" color="#0A62BF" @click="seleccionarLinea(item)"
                                                title="SELECCIONAR LÍNEA">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeLineaModal()" style="float: right"
                                        title="SALIR">
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
                <h5>TIPOS</h5>
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
                                    TIPO.
                                </v-tab>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    TIPOS.
                                </v-tab>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    TIPOS
                                    INAC.
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR TIPO DE PRODUCTO</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" md="4"></v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreTipo" label="NOMBRE TIPO"
                                                                :counter="100" :rules="nombreTipoRules"
                                                                @input="nombreTipo = nombreTipo.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4"></v-col>

                                                        <v-col cols="12" md="4"></v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="codigoTipo" label="CÓDIGO TIPO"
                                                                :counter="100" :rules="codigoTipoRules"
                                                                @input="codigoTipo = codigoTipo.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4"></v-col>

                                                        <v-col cols="12" md="3"></v-col>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="lineaRules" @click="showLineas()"
                                                                style="float: right" title="BUSCAR LÍNEAS">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreLinea" label="NOMBRE LÍNEA"
                                                                :counter="50" :rules="nombreLineaRules"
                                                                @input="nombreLinea = nombreLinea.toUpperCase()"
                                                                disabled required></v-text-field>
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
                                                                <v-btn icon v-if="botonact == 1" class="mx-2" fab dark
                                                                    color="#0A62BF" @click="actualizarTipo()"
                                                                    style="float: left" title="ACTUALIZAR TIPO">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn icon v-if="botonact == 0" class="mx-2" fab dark
                                                                    color="#0ABF55" @click="registrarTipo()"
                                                                    style="float: left" title="REGISTRAR TIPO">
                                                                    <v-icon dark> mdi-content-save
                                                                    </v-icon>
                                                                </v-btn>
                                                                <v-btn icon class="mx-2" fab dark color="#BF120A"
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
                                            <span>LISTA DE TIPOS DE PRODUCTOS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>

                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>Tipos</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarTipos"
                                                                    append-icon="mdi-magnify" label="BUSCAR TIPOS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>

                                                            <v-card-title>
                                                                <v-btn color="primary"
                                                                    @click="exportToPDFTipos()">PDF</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToCSVTipos()">CSV</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToExcelTipos()">EXCEL</v-btn>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersTipos" :items="datosTipos"
                                                                :search="buscarTipos" :items-per-page="5"
                                                                class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        class="mx-2" large @click="activar(item)"
                                                                        title="ACTIVAR TIPO">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        class="mx-2" large @click="desactivar(item)"
                                                                        title="DESACTIVAR TIPO">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#0A62BF"
                                                                        @click="showEditTipoModal(item)"
                                                                        title="ACTUALIZAR INFORMACIÓN">
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#0A62BF"
                                                                        @click="showInfoTipo(item)"
                                                                        title="VER INFORMACIÓN">
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
                                            <span>LISTA DE TIPOS DE PRODUCTOS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>

                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>Tipos</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarTipos"
                                                                    append-icon="mdi-magnify" label="BUSCAR TipoS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>
                                                            <v-data-table :headers="headersTiposInh"
                                                                :items="datosTiposInh" :search="buscarTipos"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        large class="mr-2" @click="activar(item)"
                                                                        title="ACTIVAR TipoS">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        large class="mr-2" @click="desactivar(item)"
                                                                        title="DESACTIVAR TIPO">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon large class="mr-2" color="#0A62BF"
                                                                        @click="showInfoTipo(item)"
                                                                        title="VER INFORMACIÓN">
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
                </v-container>
            </v-form>
        </div>
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="light-green darken-2">
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
                    <v-icon right v-bind="attrs" @click="snackbarWarning = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
    </v-card>
</template>
<script>
import axios from 'axios'
import * as XLSX from 'xlsx';

import Papa from "papaparse";

import jsPDF from "jspdf";
import 'jspdf-autotable';

export default {
    data() {
        return {
            flag: 1,
            //#region Tipo Producto
            idTipoProducto: "",
            nombreTipo: "",
            codigoTipo: "",
            buscarTipos: "",
            datosTipos: [],
            headersTipos: [
                { text: "NOMBRE T.PRODUCTO", value: "nomtipo", sortable: false },
                { text: "CÓDIGO T.PRODUCTO", value: "codtipo", sortable: false },
                { text: "NOMBRE LÍNEA", value: "nomlin", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosTiposInh: [],
            headersTiposInh: [
                { text: "NOMBRE T.PRODUCTO", value: "nomtipo", sortable: false },
                { text: "CÓDIGO T.PRODUCTO", value: "codtipo", sortable: false },
                { text: "NOMBRE LÍNEA", value: "nomlin", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Linea
            idLinea: "",
            nombreLinea: "",
            codigoLinea: "",
            buscarLineas: "",

            datosLineas: [],
            headersLineas: [
                { text: "NOMBRE DE LÍNEA", value: "nomlin", sortable: false },
                { text: "CÓDIGO DE LÍNEA", value: "codlin", sortable: false },
                { text: "ESTADO", value: "act", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#region Modals
            agregarTipoModal: 0,
            editTipoModal: 0,
            infoTipoModal: 0,
            tiposInhabilitadosModal: 0,
            lineasModal: 0,
            //#endregion
            botonact: 0,

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
        this.listarTipos();
        this.listarTiposInh()
    },

    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
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

        listarTipoInh() {
            this.listarTiposInh()
        },
        async listarTiposInh() {
            let me = this;
            await axios
                .get("/tipo/listartiposinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosTiposInh = [];

                    } else {
                        me.datosTiposInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarLinea() {
            this.listarLineas()
        },
        async listarLineas() {
            let me = this;
            await axios
                .get("/linea/listarlineas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosLineas = [];

                    } else {
                        me.datosLineas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Agregar
        registrarTipo() {
            this.registroTipo(this.nombreTipo, this.codigoTipo, this.idLinea);
        },
        async registroTipo(
            nombreTipo,
            codigoTipo,
            idLinea
        ) {
            let me = this;
            await axios
                .post(
                    "/tipo/addtipo/" +
                    this.nombreTipo +
                    "," +
                    this.codigoTipo +
                    "," +
                    this.idLinea
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarTipos();
                    me.agregarTipoModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },
        //#endregion
        //#region Edicion
        editarTipos() {
            this.editarTipo(this.idTipo, this.nombreTipo, this.codigoTipo, this.idLinea);
        },
        async editarTipo(
            idTipo,
            nombreTipo,
            codigoTipo,
            idLinea
        ) {
            let me = this;
            await axios
                .post(
                    "/tipo/updtipo/" +
                    this.idTipo +
                    "," +
                    this.nombreTipo +
                    "," +
                    this.codigoTipo +
                    "," +
                    this.idLinea
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTipos();
                    me.editTipoModal = false;
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Cambio Estados
        activar(item) {
            this.idTipo = item.idtipo;
            this.activarTipo(this.idTipo);
        },
        async activarTipo(idTipo) {
            let me = this;
            await axios
                .post("/tipo/ontipo/" + this.idTipo).then(function (response) {

                    me.listarTipos();
                    me.listarTiposInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idTipo = item.idtipo;
            this.desactivarTipo(this.idTipo);
        },
        async desactivarTipo(idTipo) {
            let me = this;
            await axios
                .post("/tipo/offtipo/" + this.idTipo).then(function (response) {

                    me.listarTipos();
                    me.listarTiposInh();


                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        //#region Modals
        showAgregarTipo() {
            this.agregarTipoModal = true;
        },
        showEditTipoModal(item) {
            this.editTipoModal = true;
            this.botonact = 1;
            this.idTipo = item.idtipo;
            this.nombreTipo = item.nomtipo;
            this.codigoTipo = item.codtipo;
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin
        },

        closeEditTipoModal(item) {
            this.editTipoModal = false;
        },

        showTiposInhabilitados() {
            this.tiposInhabilitadosModal = true
            this.listarTiposInh();
        },
        showInfoTipo(item) {
            this.infoTipoModal = true;
            this.idTipo = item.idtipo;
            this.nombreTipo = item.nomtipo;
            this.codigoTipo = item.codtipo;
        },
        closeInfoTipoModal() {
            this.infoTipoModal = false;
        },
        showLineas() {
            this.listarLineas();
            this.lineasModal = true;
        },

        closeLineaModal(){
            this.lineasModal = false;
        },
        //#endregion

        limpiar() {
            this.nombreTipo = "";
            this.codigoTipo = "";
            this.idTipo = "";
            this.idLinea = "";
            this.nombreLinea = "";
            this.botonact = 0;
        },

        //#region Seleccion Datos
        seleccionarLinea(item) {
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.lineasModal = false;
        },
        //#endregion

        //#region Reports
        async exportToCSVTipos() {
            try {
                const response = await axios.get(`/tipoproducto/listartiposactivos/`); // Ruta adaptada para tipos de productos
                const jsonData = response.data.resultado || [];

                const csvData = Papa.unparse(jsonData);

                const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = "tipos_productos.csv";
                link.click();
            } catch (error) {
                console.error(error);
            }
        },

        async exportToExcelTipos() {
            try {
                const response = await axios.get(`/tipoproducto/listartiposactivos/`); // Ruta adaptada para tipos de productos
                const jsonData = response.data.resultado || [];
                const worksheet = XLSX.utils.json_to_sheet(jsonData);
                const workbook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

                XLSX.writeFile(workbook, "tipos_productos.xlsx", { compression: true });
            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFTipos() {
            try {
                const response = await axios.get(`/tipoproducto/listartiposactivos/`); // Ruta adaptada para tipos de productos
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(item => [
                    item.codtipo,
                    item.nomtipo,
                    item.nomlin,
                    item.est
                ]);
                const doc = new jsPDF();
                doc.text("Listado de Tipos de Productos", 10, 10);
                doc.autoTable({
                    head: [["Código de Tipo", "Nombre de Tipo", "Nombre de Línea", "Estado"]],
                    body: bodyData
                });
                doc.save("tipos_productos.pdf");
            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFTipoDetailed(item) {
            try {
                const response = await axios.get(`/tipoproducto/detalletipo/` + item.idTipoProducto); // Ruta adaptada para detalle de tipo de producto
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(data => [
                    data.codtipo,
                    data.nomtipo,
                    data.nomlin,
                    data.descripcion,
                    data.est
                ]);
                const doc = new jsPDF();
                doc.text("Detalle del Tipo de Producto: " + item.nombreTipo.charAt(0).toUpperCase() + item.nombreTipo.slice(1).toLowerCase(), 10, 10);
                doc.autoTable({
                    head: [["Código", "Nombre", "Línea", "Descripción", "Estado"]],
                    body: bodyData
                });
                doc.save("detalle_tipo_producto.pdf");
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