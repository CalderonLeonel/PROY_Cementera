<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarFabricaModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR FABRICA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreFabrica" label="NOMBRE FABRICA" :counter="100"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="codigoFabrica" label="CODIGO FABRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showDepartamentos()" style="float: right" title="BUSCAR DEPARTAMENTOS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="departamento" label="NOMBRE DEPARTAMENTO" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showCiudades()" style="float: right" title="BUSCAR CIUDAD">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="ciudad" label="NOMBRE CIUDAD" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="12">
                                    <v-text-field v-model="direccionFabrica" label="DIRECCION FABRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn v-if="botonact == 1" color="#EE680B" @click="actualizarFabrica()"
                                            class="mx-2" fab dark x-small style="float: left" title="ACTUALIZAR FABRICA">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn v-if="botonact == 0" color="#EE680B" @click="registroFabrica()" class="mx-2"
                                            fab dark x-small style="float: left" title="REGISTRAR FABRICA">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn @click="limpiar()" color="#EE680B" style="float: left" class="mx-2" fab dark
                                            x-small title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>


                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="#b794f6" @click="closeAgregarFabrica()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editarFabricaModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>EDITAR FABRICA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreFabrica" label="NOMBRE FABRICA" :counter="100"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="codigoFabrica" label="CODIGO FABRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showDepartamentos()" style="float: right" title="BUSCAR DEPARTAMENTOS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="departamento" label="NOMBRE DEPARTAMENTO" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showCiudades()" style="float: right" title="BUSCAR CIUDAD">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="ciudad" label="NOMBRE CIUDAD" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="12">
                                    <v-text-field v-model="direccionFabrica" label="DIRECCION FABRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn v-if="botonact == 1" color="#EE680B" @click="actualizarFabrica()"
                                            class="mx-2" fab dark x-small style="float: left" title="ACTUALIZAR FABRICA">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn v-if="botonact == 0" color="#EE680B" @click="registroFabrica()" class="mx-2"
                                            fab dark x-small style="float: left" title="REGISTRAR FABRICA">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn @click="limpiar()" color="#EE680B" style="float: left" class="mx-2" fab dark
                                            x-small title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>


                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="#b794f6" @click="closeAgregarFabrica()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="infoFabricaModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DE LA FABRICA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreFabrica" label="NOMBRE FABRICA" :counter="100"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="codigoFabrica" label="CODIGO FABRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showCiudades()" style="float: right" title="BUSCAR CIUDAD">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="ciudad" label="NOMBRE CIUDAD" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showDepartamentos()" style="float: right" title="BUSCAR DEPARTAMENTOS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="departamento" label="NOMBRE DEPARTAMENTO" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showMapa()" style="float: right" title="ABRIR MAPA">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="direccionFabrica" label="DIRECCION FABRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                        @click="closeAgregarFabrica()" style="float: right" title="SALIR">
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
                                        <v-btn icon v-if="botonact == 1" color="#EE680B" @click="actualizarFabrica()"
                                            style="float: left" title="ACTUALIZAR INFabricaCIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="#EE680B" @click="registrarFabrica()"
                                            style="float: left" title="REGISTRAR Fabrica" width="28px" height="28px">
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

        <v-dialog v-model="departamentosModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>DEPARTAMENTOS</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>DEPARTAMENTOS</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-col cols="12">
                                        <v-card-title>
                                            <v-text-field v-model="buscarDepartamentos" append-icon="mdi-magnify"
                                                label="BUSCAR DEPARTAMENTOS" single-line hide-details></v-text-field>
                                        </v-card-title>
                                    </v-col>
                                    <v-data-table :headers="headersDepartamento" :items="datosDepartamento"
                                        :search="buscarDepartamentos" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" @click="seleccionarDepartamento(item)"
                                                color="#0091EA" title="SELECCIONAR DEPARTAMENTO">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>


                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="ciudadesModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>CIUDADES</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>CIUDADES</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-col cols="12">
                                        <v-card-title>
                                            <v-text-field v-model="buscarDepartamentos" append-icon="mdi-magnify"
                                                label="BUSCAR CIUDADES" single-line hide-details></v-text-field>
                                        </v-card-title>
                                    </v-col>
                                    <v-data-table :headers="headersCiudad" :items="datosCiudad"
                                        :search="buscarDepartamentos" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" @click="seleccionarCiudad(item)" color="#0091EA"
                                                title="SELECCIONAR CIUDAD">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>


                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>


        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>Fabricas</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showAgregarFabrica()">Nuevo Fabrica</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showFabricasInhabilitados()">Fabricas Inactivos</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Fabricas</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="buscarFabricas" append-icon="mdi-magnify" label="BUSCAR FabricaS"
                                    single-line hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table :headers="headersFabricas" :items="datosFabricas" :search="buscarFabricas"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="colorEstado(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>


                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                        @click="activar(item)" title="ACTIVAR Fabrica">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                        @click="desactivar(item)" title="DESACTIVAR Fabrica">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showEditFabricaModal(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showInfoFabrica(item)"
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
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="light-green darken-2 ">
                {{ mensajeSatisfactorio }}

                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarOK = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
        <div class="text-center">

            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                <strong>{{ mensajeSnackbar }}</strong>

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
import axios from "axios";
import { async } from "regenerator-runtime";

export default {
    data() {
        return {
            //#region Fabrica 
            idFabrica: "",
            nombreFabrica: "",
            codigoFabrica: "",
            direccionFabrica: "",
            latitud: "",
            longitud: "",
            idDepartamento: "",
            departamento: "",
            idCiudad: "",
            ciudad: "",
            datosFabricas: [],
            headersFabricas: [
                { text: "NOMBRE FABRICA", value: "nomfab", sortable: false },
                { text: "CODIGO FABRICA", value: "codfab", sortable: false },
                { text: "CIUDAD", value: "nomciu", sortable: false },
                { text: "DEPARTAMENTO", value: "nomdep", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosDepartamento: [],
            headersDepartamento: [
                { text: "NOMBRE", value: "nomdep", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosCiudad: [],
            headersCiudad: [
                { text: "NOMBRE", value: "nomciu", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Modals
            agregarFabricaModal: 0,
            editarFabricaModal: 0,
            infoFabricaModal: 0,
            fabricasInhabilitadosModal: 0,
            ciudadesModal: 0,
            departamentosModal: 0,
            //#endregion
            botonact: 0,
            //#region Snackbars
            snackbarOK: false,
            mensajeSatisfactorio: "REGISTRO CORRECTO ",
            snackbarError: false,
            mensajeError: "REGISTRO FALLIDO ",
            snackbarWarning: false,
            mensajeWarning: "EMAIL YA EXISTE ",
            timeout: 2000,
            mensajeSnackbar: "",
            //#endregion
            mapa: null,

        }
    },
    created: function () {
        this.listarFabricas();
    },
    methods: {
        //#region Mapa
        showMapa() {
            this.mapaModal = true
        },
        //#endregion
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
        listarFabrica() {
            this.listarFabricas();
        },
        async listarFabricas() {
            let me = this;
            await axios
                .get("/fabrica/listarfabricas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFabricas = [];

                    } else {
                        me.datosFabricas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarFabricaInh() {
            this.listarFabricasInh()
        },
        async listarFabricasInh() {
            let me = this;
            await axios
                .get("/fabrica/listarfabricasinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFabricasInh = [];

                    } else {
                        me.datosFabricasInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarDepartamento() {
            this.listarDepartamentos();
        },
        async listarDepartamentos() {
            let me = this;
            await axios
                .get("/departamento/listardepartamentos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDepartamento = [];

                    } else {
                        me.datosDepartamento = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarCiudad() {
            this.listarCiudades();
        },
        async listarCiudades() {
            let me = this;
            await axios
                .get("/ciudad/listarciudades/" + this.idDepartamento)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCiudad = [];

                    } else {
                        me.datosCiudad = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Agregar
        registrarFabrica() {
            this.registroFabrica(this.nombreFabrica, this.codigoFabrica, this.direccionFabrica, this.idDepartamento, this.idCiudad);
        },
        async registroFabrica(
            nombreFabrica,
            codigoFabrica,
            direccionFabrica,
            idDepartamento,
            idCiudad
        ) {
            let me = this;
            await axios
                .post(
                    "/fabrica/addfabrica/" +
                    this.nombreFabrica +
                    "," +
                    this.codigoFabrica +
                    "," +
                    this.direccionFabrica +
                    "," +
                    this.idDepartamento +
                    "," +
                    this.idCiudad
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarFabricas();
                    me.agregarFabricaModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },
        //#endregion
        //#region Edicion
        editarFabricas() {
            this.editarFabrica(this.idFabrica, this.nombreFabrica, this.codigoFabrica, this.direccionFabrica,this.idDepartamento, this.idCiudad);
        },
        async editarFabrica(
            idFabrica,
            nombreFabrica,
            codigoFabrica,
            direccionFabrica,
            idDepartamento,
            idCiudad
        ) {
            let me = this;
            await axios
                .post(
                    "/fabrica/updfabrica/" +
                    this.idFabrica +
                    "," +
                    this.nombreFabrica +
                    "," +
                    this.codigoFabrica +
                    "," +
                    this.direccionFabrica +
                    "," +
                    this.idDepartamento +
                    "," +
                    this.idCiudad
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarFabricas();
                    me.editFabricaModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Cambio Estados
        activar(item) {
            this.idFabrica = item.idFabrica;
            this.activarFabrica(this.idFabrica);
        },
        async activarFabrica(idFabrica) {
            let me = this;
            await axios
                .post("/fabrica/onfabrica/" + this.idFabrica).then(function (response) {

                    me.listarFabricas();
                    me.listarFabricasInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idFabrica = item.idFabrica;
            this.desactivarFabrica(this.idFabrica);
        },
        async desactivarFabrica(idFabrica) {
            let me = this;
            await axios
                .post("/fabrica/offfabrica/" + this.idFabrica).then(function (response) {

                    me.listarFabricas();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        //#region Modals
        showCiudades() {
            this.ciudadesModal = true;
            this.listarCiudades();
        },
        closeCiudades() {
            this.ciudadesModal = false;
        },
        showDepartamentos() {
            this.departamentosModal = true;
            this.listarDepartamentos();
        },
        closeDepartamentos() {
            this.departamentosModal = false;
        },
        showAgregarFabrica() {
            this.agregarFabricaModal = true;
        },
        showEditFabricaModal(item) {
            this.editarFabricaModal = true;
            this.botonact = 1;
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
            this.codigoFabrica = item.codfab;
            this.direccionFabrica = item.dirfab;
            this.idDepartamento = item.idep;
            this.departamento = item.dep;
            this.idCiudad = item.idciu;
            this.ciudad = item.ciu;
        },
        showFabricasInhabilitados() {
            this.FabricasInhabilitadosModal = true
            this.listarFabricasInh();
        },
        showInfoFabrica(item) {
            this.infoFabricaModal = true;
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
            this.codigoFabrica = item.codfab;
        },
        closeInfoFabricaModal() {
            this.infoFabricaModal = false;
        },
        showLineas() {
            this.listarLineas();
            this.lineasModal = true;
        },
        //#endregion

        limpiar() {
            this.nombreFabrica = "";
            this.codigoFabrica = "";
            this.idFabrica = "";
            this.idLinea = "";
            this.nombreLinea = "";
        },

        //#region Seleccion Datos
        seleccionarLinea(item) {
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.lineasModal = false;
        },
        seleccionarDepartamento(item){
            this.idDepartamento = item.idep;
            this.departamento = item.nomdep;
            this.departamentosModal = false;
        },
        seleccionarCiudad(item){
            this.idCiudad = item.idciu;
            this.ciudad = item.nomciu;
            this.ciudadesModal = false;
        },
        //#endregion
    },
}
</script>