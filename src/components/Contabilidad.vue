<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="saldoModal" max-width="500px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>SALDO INICIAL:</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="saldo" label="SALDO INICIAL" :rules="saldoRules"
                                        @input="saldo = saldo.toUpperCase()" required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#001781">
                                        <v-toolbar-title style="color: #ffffff;">
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>

                                        <v-btn class="mx-2" fab dark x-small color="#EE680B" @click="registrarCuenta()"
                                            style="float: left" title="REGISTRAR CUENTA CONTABLE">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>

                                    </v-toolbar>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>
                <v-tabs horizontal color="#002245" center-active grow>
                    <v-tab>
                        <v-icon left>mdi-account-cash</v-icon>
                        CUENTAS CONT
                    </v-tab>
                    <v-tab>
                        <v-icon left>mdi-seat</v-icon>
                        ASIENTOS CONT
                    </v-tab>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>

                                <v-col cols="12" md="12"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="numeroCuenta" label="NUMERO CUENTA" :counter="100"
                                        :rules="numeroCuentaRules" @input="numeroCuenta = numeroCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreCuenta" label="NOMBRE CUENTA" :counter="100"
                                        :rules="nombreCuentaRules" @input="nombreCuenta = nombreCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select :items="tiposCuentas" v-model="tipoCuenta" label="TIPO CUENTA"></v-select>
                                </v-col>

                                <v-divider></v-divider>

                                <v-col cols="12" md="12">
                                    <v-textarea v-model="descripcion" label="DESCRIPCION" :counter="255"
                                        :rules="descripcionRules" @input="descripcion = descripcion.toUpperCase()" required
                                        textarea></v-textarea>
                                </v-col>

                                <v-col cols="12" md="8"></v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#002245">
                                        <v-toolbar-title style="color:#ffffff">
                                            <h6>OPCIONES</h6>
                                        </v-toolbar-title>
                                        <v-btn v-if="botonact == 1" @click="registrarSaldo()" class="mx-2" fab dark x-small
                                            color="#EE680B" title="REGISTRAR CUENTA CONTABLE" style="float: left">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn v-if="botonact == 0" @click="editarCuenta()" class="mx-2" fab dark x-small
                                            color="#EE680B" title="ACTUALIZAR CUENTA CONTABLE" style="float: left">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Cuentas Contables</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarCuentas" append-icon="mdi-magnify"
                                            label="BUSCAR CUENTAS" single-line hide-details></v-text-field>
                                    </v-card-title>


                                    <v-data-table :headers="headersCuentas" :items="datosCuentas" :search="buscarCuentas"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">

                                            <v-icon small class="mr-2" @click="seleccionarCuenta(item)"
                                                title="ACTUALIZAR INFORMACION">
                                                mdi-text-box-edit-outline
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
                <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
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

export default {
    data() {
        return {
            flag: 1,
            botonact: 1,
            //#region Cuenta Contables
            idCuentaContable: "",
            numeroCuenta: "",
            nombreCuenta: "",
            descripcion: "",
            tipoCuenta: "",
            saldo: "",
            tiposCuentas: [
                'Activo', 'Pasivo', 'Capital', 'Ingreso', 'Gasto'
            ],
            datosCuentas: [],
            headersCuentas: [
                { text: "NUM. CUENTA", value: "numcnt", sortable: true },
                { text: "NOM. CUENTA", value: "nom", sortable: true },
                { text: "DESCRIPCION", value: "des", sortable: true },
                { text: "TIPO CUENTA", value: "tipoc", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

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

            //#region Modals
            saldoModal: 0,
            //#endregion
        }
    },

    created: function () {
        this.listarCuentas();
    },

    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'orange'
        },

        //#region Listados
        listarCuenta() {
            this.listarCuentas();
        },
        async listarCuentas() {
            let me = this;
            await axios
                .get("/contabilidad/listarcuentas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCuentas = [];

                    } else {
                        me.datosCuentas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Registrar
        registrarCuentas() {
            this.registrarCuenta(this.numeroCuenta, this.nombreCuenta, this.descripcion, this.tipoCuenta, this.saldo);
        },
        async registrarCuenta(
            numeroCuenta,
            nombreCuenta,
            descripcion,
            tipoCuenta,
            saldo
        ) {
            let me = this;
            await axios
                .post(
                    "/contabilidad/addcuenta/" +
                    this.numeroCuenta +
                    "," +
                    this.nombreCuenta +
                    "," +
                    this.descripcion +
                    "," +
                    this.tipoCuenta +
                    "," +
                    this.saldo
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarCuentas();
                    me.saldoModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },
        //#endregion

        //#region Editar
        //#endregion

        //#region Cambiar Estados
        //#endregion

        //#region Modals
        registrarSaldo() {
            this.saldoModal = true;
        },
        //#endregion
    },
}
</script>