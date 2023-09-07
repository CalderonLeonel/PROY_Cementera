<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarTipoModal" max-width="800px">
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
                                    <v-text-field v-model="codigoTipo" label="CODIGO TIPO" :counter="100"
                                        :rules="codigoTipoRules" @input="codigoTipo = codigoTipo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="3"></v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showLineas()" style="float: right" title="BUSCAR LINEAS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                        @click="closeAgregarTipo()" style="float: right" title="SALIR">
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
                                        <v-btn icon v-if="botonact == 1" color="#EE680B" @click="actualizarTipo()"
                                            style="float: left" title="ACTUALIZAR INtipoCIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="#EE680B" @click="registrarTipo()"
                                            style="float: left" title="REGISTRAR TIPO" width="28px" height="28px">
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

        <v-dialog v-model="infoTipoModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DEL TIPO:</span><br>
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
                                    <v-text-field v-model="codigoTipo" label="CODIGO TIPO" :counter="100"
                                        :rules="codigoTipoRules" @input="codigoTipo = codigoTipo.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeInfoTipoModal()"
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

        <v-dialog v-model="editTipoModal" max-width="700px">
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
                                    <v-text-field v-model="codigoTipo" label="CODIGO TIPO" :counter="100"
                                        :rules="codigoTipoRules" @input="codigoTipo = codigoTipo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="3"></v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showLineas()" style="float: right" title="BUSCAR LINEAS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
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
                                        <v-btn class="mx-2" fab dark small icon v-if="botonact == 1" color="#EE680B"
                                            @click="editarTipos()" style="float: left" title="ACTUALIZAR INtipoCIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab dark small icon v-if="botonact == 0" color="#EE680B"
                                            @click="registrarTipo()" style="float: left" title="REGISTRAR Tipo">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab dark small icon color="#EE680B" @click="limpiar()"
                                            style="float: left" title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeAgregarTipo()"
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

        <v-dialog v-model="tiposInhabilitadosModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>TIPOS DE PRODUCTOS INACTIVOS</span><br>
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
                                        <v-text-field v-model="buscarTipos" append-icon="mdi-magnify" label="BUSCAR TipoS"
                                            single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersTiposInh" :items="datosTiposInh" :search="buscarTipos"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                                @click="activar(item)" title="ACTIVAR TipoS">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                                @click="desactivar(item)" title="DESACTIVAR TipoS">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon small class="mr-2" color="#001781" @click="showInfoTipo(item)"
                                                title="VER INtipoCION">
                                                mdi-eye
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeInfoTipoModal()"
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

        <v-dialog v-model="lineasModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LINEAS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Lineas</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarLineas" append-icon="mdi-magnify" label="BUSCAR LINEAS"
                                            single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersLineas" :items="datosLineas" :search="buscarLineas"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#001781" @click="seleccionarLinea(item)"
                                                title="SELECCIONAR LINEA">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeLineaModal()"
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


        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>Tipos</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showAgregarTipo()">Nuevo Tipo</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showTiposInhabilitados()">Tipos Inactivos</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Tipos</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="buscarTipos" append-icon="mdi-magnify" label="BUSCAR TipoS"
                                    single-line hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table :headers="headersTipos" :items="datosTipos" :search="buscarTipos"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="colorEstado(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>


                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                        @click="activar(item)" title="ACTIVAR TIPO">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                        @click="desactivar(item)" title="DESACTIVAR TIPO">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showEditTipoModal(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showInfoTipo(item)"
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
import axios from 'axios'

export default {
    data() {
        return {
            //#region Tipo Producto
            idTipoProducto: "",
            nombreTipo: "",
            codigoTipo: "",
            buscarTipos: "",
            datosTipos: [],
            headersTipos: [
                { text: "NOMBRE T.PRODUCTO", value: "nomtipo", sortable: false },
                { text: "CODIGO T.PRODUCTO", value: "codtipo", sortable: false },
                { text: "NOMBRE LINEA", value: "nomlin", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosTiposInh: [],
            headersTiposInh: [
                { text: "NOMBRE T.PRODUCTO", value: "nomtipo", sortable: false },
                { text: "CODIGO T.PRODUCTO", value: "codtipo", sortable: false },
                { text: "NOMBRE LINEA", value: "nomlin", sortable: false },
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
                { text: "NOMBRE DE LINEA", value: "nomlin", sortable: false },
                { text: "CODIGO DE LINEA", value: "codlin", sortable: false },
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
            mensajeSatisfactorio: "REGISTRO CORRECTO ",
            snackbarError: false,
            mensajeError: "REGISTRO FALLIDO ",
            snackbarWarning: false,
            mensajeWarning: "EMAIL YA EXISTE ",
            timeout: 2000,
            mensajeSnackbar: "",
            //#endregion
        }
    },

    created: function () {
        this.listarTipos();
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
        //#endregion

        limpiar() {
            this.nombreTipo = "";
            this.codigoTipo = "";
            this.idTipo = "";
            this.idLinea = "";
            this.nombreLinea = "";
        },

        //#region Seleccion Datos
        seleccionarLinea(item) {
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.lineasModal = false;
        },
        //#endregion
    },
}
</script>