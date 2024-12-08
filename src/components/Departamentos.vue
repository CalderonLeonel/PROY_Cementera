<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="asignarMontoModal" max-width="500px" transition="dialog-transition">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>ASIGNAR MONTO INICIAL A {{ nombreDepartamento }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col md="2"></v-col>
                            <v-col cols="12" md="8">
                                <v-text-field v-model="montoInicial" label="INGRESE UN MONTO EN Bs." :counter="100"
                                    :rules="montoInicialRules" @input="montoInicial = montoInicial.toUpperCase()"
                                    required></v-text-field>
                            </v-col>
                            <v-col md="2"></v-col>

                            <v-col cols="12" md="8"> </v-col>
                            <v-col cols="12" md="4">
                                <v-toolbar dense shaped color="#ffffff">
                                    <v-toolbar-title style="color: #000000">
                                        <h6>
                                            OPCIONES
                                        </h6>
                                    </v-toolbar-title>
                                    <v-btn class="mx-2" fab dark x-small color="0ABF55"
                                        @click="registrarFinanciamiento()" style="float: left"
                                        title="REGISTRAR FINANCIAMIENTO">
                                        <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                    </v-btn>
                                    <v-btn color="error" class="mx-2" fab dark x-small @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                    </v-btn>
                                </v-toolbar>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>

        </v-dialog>

        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>
                <v-tabs horizontal color="#002245" center-active grow>
                    <v-tab>
                        <v-icon left>mdi-office-building-outline</v-icon>
                        DEPARTAMENTOS
                    </v-tab>
                    <v-tab>
                        <v-icon left>mdi-office-building-plus</v-icon>
                        FORM
                        FINZ.
                    </v-tab>

                    <v-tab>
                        <v-icon>mdi-account-cash</v-icon>
                        FINAN
                        DEP.
                    </v-tab>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>

                                <v-col cols="12" md="12"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="numeroCuenta" label="NUMERO CUENTA" :counter="100"
                                        :rules="numeroCuentaRules" @input="numeroCuenta = numeroCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreCuenta" label="NOMBRE CUENTA" :counter="100"
                                        :rules="nombreCuentaRules" @input="nombreCuenta = nombreCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="8"></v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#ffffff">
                                        <v-toolbar-title style="color:#000000">
                                            <h6>OPCIONES</h6>
                                        </v-toolbar-title>
                                        <v-btn v-if="botonact == 1" @click="registrarSaldo()" class="mx-2" fab dark
                                            x-small color="#0ABF55" title="REGISTRAR DEPARTAMENTO" style="float: left">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn v-if="botonact == 0" @click="editarCuenta()" class="mx-2" fab dark
                                            x-small color="#0A62BF" title="ACTUALIZAR DEPARTAMENTO" style="float: left">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>DEPARTAMENTOS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarDepartamentos" append-icon="mdi-magnify"
                                            label="BUSCAR CUENTAS" single-line hide-details></v-text-field>
                                    </v-card-title>


                                    <v-data-table :headers="headersDepartamentos" :items="datosDepartamentos"
                                        :search="buscarDepartamentos" :items-per-page="5" class="elevation-1"
                                        id="tableId">

                                        <template #[`item.actions`]="{ item }">

                                            <v-icon small class="mr-2" @click="seleccionarDepa(item)"
                                                title="ACTUALIZAR INFORMACION">
                                                mdi-text-box-edit-outline
                                            </v-icon>

                                        </template>
                                    </v-data-table>
                                </v-col>

                            </v-row>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>
                            </v-row>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>DEPARTAMENTOS</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-data-table :headers="headersDepartamento" :items="datosDepartamentos"
                                        :items-per-page="12" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#0A62BF"
                                                @click="showMontoInicialModal(item)">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Financiamientos</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-data-table :headers="headersFinanciamientos" :items="datosFinanciamientos"
                                        :items-per-page="12" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#0A62BF"
                                                @click="showMontoInicialModal(item)">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>

                            </v-row>
                        </v-card>
                    </v-tab-item>

                </v-tabs>



            </v-card-actions>
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

                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                    <strong>{{ mensajeSnackbarError }}</strong>

                    <template v-slot:action="{ attrs }">
                        <v-icon right v-bind="attrs" @click="snackbarError = false">
                            mdi-close
                        </v-icon>
                    </template>
                </v-snackbar>
            </div>
        </v-card>
    </v-card>
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";

export default {
    data() {
        return {
            flag: 1,
            tipo: "INICIO GESTION",

            //#region Departamento
            idDepartamento: "",
            nombreDepartamento: "",
            montoInicial : "",

            datosDepartamentos: [],
            headersDepartamento: [
                { text: "NOMBRE DE DEPARTAMENTO", value: "nom", sortable: false },
                { text: "CODIGO DE DEPARTAMENTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "act", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],

            datosFinanciamientos: [],
            headersFinanciamientos: [
                { text: "NOMBRE DE DEPARTAMENTO", value: "nomdep", sortable: false },
                { text: "TIPO FINANCIACION", value: "tip", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "MONTO", value: "mont", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],

            montoInicial: "",

            //#endregion

            //#region Modals
            asignarMontoModal: "",
            //#endregion

        }
    },

    created: function () {
        this.listarDepartamentos();
        this.listarFinanciamientos();
    },

    methods: {
        //#region Listar
        listarDepartamento() {
            this.listarDepartamentos();
        },
        async listarDepartamentos() {
            let me = this;
            await axios
                .get("/departamentos/listardepartamentos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDepartamentos = [];

                    } else {
                        //console.log(response.data);
                        me.datosDepartamentos = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarFinanciamiento() {
            this.listarFinanciamientos();
        },
        async listarFinanciamientos() {
            let me = this;
            await axios
                .get("/departamentos/listarfinanciamientos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFinanciamientos = [];

                    } else {
                        //console.log(response.data);
                        me.datosFinanciamientos = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Agregar
        registrarFinanciamientos() {
            const montoFormateado = parseFloat(this.montoInicial).toFixed(3);
            console.log("Monto formateado:", montoFormateado);
            this.registrarFinanciamiento(this.idDepartamento, montoFormateado, this.tipo);
        },
        async registrarFinanciamiento(
            idDepartamento,
            montoInicial,
            tipo
        ) {
            let me = this;
            await axios
                .post(
                    "/departamentos/addfinanciamiento/" +
                    this.idDepartamento +
                    "," +
                    this.montoInicial +
                    "," +
                    this.tipo

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarFinanciamientos();
                    me.limpiar();
                    this.asignarMontoModal = false;
                })
                .catch(function (error) {
                    me.mensajeSnackbar = error.response.data.message;
                    snackbarError = true;
                });

        },
        //#endregion

        //#region Modals
        showMontoInicialModal(item) {
            this.asignarMontoModal = true;
            this.idDepartamento = item.iddep;
            this.nombreDepartamento = item.nom
        },
        //#endregion

    },
}
</script>