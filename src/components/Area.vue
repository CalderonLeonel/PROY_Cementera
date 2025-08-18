<template>
    <v-card elevation="5" outlined shaped>

        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>ÁREAS</h5>
            </v-alert>
        </div>

        <v-dialog v-model="areaModal" max-width="1080px" persistent> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">NUEVA ÁREA</span>
                    <span v-if="botonAct == 1">EDITAR ÁREA</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nueva Area / Editar Area -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombre" :counter="50" :rules="nombreRules"
                                        @input="nombre = nombre.toUpperCase()" label="NOMBRE DEL ÁREA" required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonAct == 1" color="#0A62BF"
                                                @click="actualizarArea()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                @click="registrarArea()" style="float: left"
                                                title="REGISTRAR ÁREA" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon color="#BF120A" @click="limpiar()" style="float: left" large
                                                class="mx-2" title="LIMPIAR FORMULARIO">
                                                <v-icon dark> mdi-eraser </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeArea()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <div class="text-center">
                                <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense
                                    color="#00FF00" outlined>
                                    <strong>{{ mensajeSnackbar }}</strong>


                                    <template v-slot:action="{ attrs }">
                                        <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                            mdi-close
                                        </v-icon>
                                    </template>
                                </v-snackbar>
                            </div>

                            <div class="text-center">

                                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense
                                    color="error" outlined>
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

                </v-card-text>
            </v-card>
        </v-dialog>


        <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Areas -->
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ÁREAS</h5>
                                </v-list-item-title>
                            </v-list-item>
                            <v-col cols="12" md="4">
                                <v-btn color="success" @click="showAddArea()">NUEVA ÁREA</v-btn>
                            </v-col>
                            <v-card-title>
                                <v-text-field v-model="searchArea" append-icon="mdi-magnify" label="BUSCAR ÁREAS"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headersArea" :items="datosArea" :search="searchArea"
                                :items-per-page="5" class="elevation-1" id="tableId">
                                <template #[`item.credte`]="{ item }">
                                    <td>{{ new Date(item.credte).toLocaleDateString('es-ES', {
            day: 'numeric', month:
                'long', year: 'numeric'
        }) }}</td>
                                </template>
                                <template #[`item.upddte`]="{ item }">
                                    <td v-if="item.upddte == null">-</td>
                                    <td v-if="item.upddte != null">{{ new Date(item.upddte).toLocaleDateString('es-ES',
            { day: 'numeric', month: 'long', year: 'numeric' }) }}</td>
                                </template>
                                <template #[`item.act`]="{ item }">
                                    <v-chip :color="getColor(item.act)" dark>
                                        {{ item.act }}
                                    </v-chip>
                                </template>
                                <template #[`item.actions`]="{ item }">
                                    <v-icon large class="mr-2" color="#0A628F" @click="showEditArea(item)" title="EDITAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" color="#0ABF55" @click="activar(item)"
                                        title="ACTIVAR ÁREA">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" color="#BF120A" @click="desactivar(item)"
                                        title="DESACTIVAR ÁREA">
                                        mdi-cancel
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </v-col>
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

    </v-card>
</template>
<script>
import axios from "axios";

export default {
    data: () => ({
        idArea: "",
        nombre: "",
        estado: "",
        createDate: "",
        lastDate: "",
        valid: true,

        searchArea: "",

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        areaModal: "",
        botonAct: 0,
        nombreRules: [
            (v) => !!v || "NOMBRE DEL ÁREA ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DE ÁREA DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],

        datosArea: [],

        headersArea: [
            { text: "AREA", value: "nom", sortable: false },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],
    }),

    created: function () {
        this.listarAreas();
    },

    methods: {

        activar(item) {
            this.idArea = item.idarea;
            this.activararea(this.idArea);
        },
        async activararea(idArea) {
            let me = this;
            await axios
                .post("/area/onarea/" + this.idArea).then(function (response) {

                    me.listarAreas();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idArea = item.idarea;
            this.desactivararea(this.idArea);
        },
        async desactivararea(idArea) {
            let me = this;
            await axios
                .post("/area/offarea/" + this.idArea).then(function (response) {

                    me.listarAreas();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },

        showAddArea() {
            this.botonAct = 0;
            this.areaModal = true;
        },
        showEditArea(item) {
            this.botonAct = 1;
            this.llenarCamposArea(item);
            this.areaModal = true;
        },

        closeArea() {
            this.areaModal = false;
        },

        llenarCamposArea(item) {
            this.nombre = item.nom;

            this.idArea = item.idarea;
        },

        actualizarArea() {
            if (this.$refs.form.validate()) {
                this.actualizararea();
            }
        },
        async actualizararea() {
            let me = this;
            await axios
                .post(
                    "/area/editararea/" +
                    this.idArea +
                    "," +
                    this.nombre
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarAreas(me.idArea);
                    me.limpiar();
                    me.closeArea();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.nombre = "";
        },

        async listarAreas(idArea) {
            let me = this;
            await axios
                .get("/area/listarareas/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosArea = [];
                    } else {
                        me.datosArea = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarArea() {
            if (this.$refs.form.validate()) {
                this.registrarArea();
            }
        },
        async registrarArea(
            nombre,
        ) {
            let me = this;

            //let me=this;
            await axios
                .post(
                    "/area/addarea/" +
                    this.nombre

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarAreas(me.idArea);
                    me.limpiar();
                    me.closeArea();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};
</script>