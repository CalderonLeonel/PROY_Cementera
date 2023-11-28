<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarLineaModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR LINEA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="100"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoLinea" label="CODIGO LINEA" :counter="100"
                                        :rules="codigoLineaRules" @input="codigoLinea = codigoLinea.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                        @click="closeAgregarLinea()" style="float: right" title="SALIR">
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
                                        <v-btn icon v-if="botonact == 1" color="#EE680B" @click="estualizarLinea()"
                                            style="float: left" title="ACTUALIZAR INFORMACIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="#EE680B" @click="registrarLinea()"
                                            style="float: left" title="REGISTRAR LINEA" width="28px" height="28px">
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

        <v-dialog v-model="infoLineaModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DE LA LINEA:</span><br>
                    <span>{{ nombreLinea }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="100"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="codigoLinea" label="CODIGO LINEA" :counter="100"
                                        :rules="codigoLineaRules" @input="codigoLinea = codigoLinea.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeInfoLineaModal()"
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

        <v-dialog v-model="editLineaModal" max-width="700px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR LINEA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="100"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoLinea" label="CODIGO LINEA" :counter="100"
                                        :rules="codigoLineaRules" @input="codigoLinea = codigoLinea.toUpperCase()"
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
                                            @click="editarLineas()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab dark small icon v-if="botonact == 0" color="#EE680B"
                                            @click="registrarLinea()" style="float: left" title="REGISTRAR LINEA">
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
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeAgregarLinea()"
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

        <v-dialog v-model="lineasInhabilitadasModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LINEAS INACTIVAS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>LINEAS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarLineas" append-icon="mdi-magnify" label="BUSCAR LINEAS"
                                            single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersLineasInh" :items="datosLineasInh" :search="buscarLineas"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                                @click="activar(item)" title="ACTIVAR LINEAS">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                                @click="desactivar(item)" title="DESACTIVAR LINEAS">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon small class="mr-2" color="#001781" @click="showInfoLinea(item)"
                                                title="VER INFORMACION">
                                                mdi-eye
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeInfoLineaModal()"
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
                <h5>LINEAS</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showAgregarLinea()">Nueva Linea</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showLineaInhabilitadas()">Lineas Inactivas</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>LINEAS</h5>
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
                                    <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                        @click="activar(item)" title="ACTIVAR LINEAS">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                        @click="desactivar(item)" title="DESACTIVAR LINEAS">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showEditLineaModal(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showInfoLinea(item)"
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
            //#region Lineas
            idLinea: "",
            nombreLinea: "",
            codigoLinea: "",
            buscarLineas: "",
            datosLineas: [],
            headersLineas: [
                { text: "NOMBRE LINEA", value: "nomlin", sortable: true },
                { text: "CODIGO LINEA", value: "codlin", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosLineasInh: [],
            headersLineasInh: [
                { text: "NOMBRE LINEA", value: "nomlin", sortable: true },
                { text: "CODIGO LINEA", value: "codlin", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Modals
            agregarLineaModal: 0,
            editLineaModal: 0,
            infoLineaModal: 0,
            lineasInhabilitadasModal: 0,
            //#endregion
        }
    },
    created: function () {
        this.listarLineas();
    },
    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
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

        listarLineaInh() {
            this.listarLineasInh()
        },
        async listarLineasInh() {
            let me = this;
            await axios
                .get("/linea/listarlineasinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosLineasInh = [];

                    } else {
                        me.datosLineasInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Adicion
        registrarLinea() {
            this.registroLinea(this.nombreLinea, this.codigoLinea);
        },
        async registroLinea(
            nombreLinea,
            codigoLinea
        ) {
            let me = this;
            await axios
                .post(
                    "/linea/addlinea/" +
                    this.nombreLinea +
                    "," +
                    this.codigoLinea
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarLineas();
                    me.agregarLineaModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Edicion
        editarLineas() {
            this.editarLinea(this.idLinea, this.nombreLinea, this.codigoLinea);
        },
        async editarLinea(
            idLinea,
            nombreLinea,
            codigoLinea
        ) {
            let me = this;
            await axios
                .post(
                    "/linea/updlinea/" +
                    this.idLinea +
                    "," +
                    this.nombreLinea +
                    "," +
                    this.codigoLinea
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarLineas();
                    me.editLineaModal = false;    
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Modals
        showAgregarLinea() {
            this.agregarLineaModal = true;
        },
        closeAgregarLinea() {
            this.agregarLineaModal = false;
        },
        showEditLineaModal(item) {
            this.editLineaModal = true;
            this.botonact = 1;
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.codigoLinea = item.codlin;
        },
        closeEditLineaModal() {
            this.editLineaModal = false;
        },
        showInfoLinea(item) {
            this.infoLineaModal = true;
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.codigoLinea = item.codlin;
        },
        closeInfoLineaModal() {
            this.infoLineaModal = false;
        },
        showLineaInhabilitadas() {
            this.lineasInhabilitadasModal = true;
            this.listarLineasInh();
        },
        closeLineasInhabilitadas() {
            this.lineasInhabilitadasModal = false
        },
        //#endregion
        //#region Cambios Estado
        activar(item) {
            this.idLinea = item.idlin;
            this.activarLinea(this.idLinea);
        },
        async activarLinea(idLinea) {
            let me = this;
            await axios
                .post("/linea/onlinea/" + this.idLinea).then(function (response) {

                    me.listarLineas();
                    me.listarLineasInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idLinea = item.idlin;
            this.desactivarLinea(this.idLinea);
        },
        async desactivarLinea(idLinea) {
            let me = this;
            await axios
                .post("/linea/offlinea/" + this.idLinea).then(function (response) {

                    me.listarLineas();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        limpiar() {
            this.nombreLinea = "";
            this.codigoLinea = "";
        },
    },
}
</script>