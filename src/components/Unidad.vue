<template>
    <v-card elevation="5" outlined shaped>

        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>UNIDADES</h5>
            </v-alert>
        </div>

        <v-dialog v-model="unidadModal" max-width="1080px"> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Unidad</span>
                    <span v-if="botonAct == 1">Editar Unidad</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nueva Unidad / Editar Unidad -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="unidad" :counter="50" :rules="nombreRules"
                                @input="unidad = unidad.toUpperCase()" label="Nombre de la Unidad" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarUnidad()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarUnidad()" style="float: left" title="REGISTRAR ITEM">
                                            <v-icon dark> mdi-content-save </v-icon>
                                            GUARDAR
                                        </v-btn>
                                </v-col>                      
                                <v-col cols="2">                                        
                                    <v-btn iconv color="#BF120A" class="mx-4"  dark  @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeUnidad()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
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

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B"
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

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-col cols="12" md="4">
            <v-btn color="success" @click="showAddUnidad()">+ Nueva Unidad</v-btn>
        </v-col>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Unidades -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>UNIDADES</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="searchUnidad" append-icon="mdi-magnify"
                                        label="BUSCAR UNIDADES" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersUnidad" :items="datosUnidad" :search="searchUnidad"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.credte`]="{ item }">
                                        <td>{{ new Date(item.credte).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) }}</td>
                                    </template>
                                    <template #[`item.upddte`]="{ item }">
                                        <td v-if="item.upddte == null">-</td>
                                        <td v-if="item.upddte != null">{{ new Date(item.upddte).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) }}</td>
                                    </template>
                                    <template #[`item.act`]="{ item }">
                                        <v-chip :color="getColor(item.act)" dark>
                                            {{ item.act }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                            title="ACTIVAR UNIDAD">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                            title="DESACTIVAR UNIDAD">
                                            mdi-cancel
                                        </v-icon>
                                        <v-icon small class="mr-2" @click="showEditUnidad(item)"
                                            title="EDITAR INFORMACION">
                                            mdi-pencil
                                        </v-icon>
                                      

                                    </template>
                                </v-data-table>
                            </v-col>
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

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B"
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

export default {
    data: () => ({
        idUnidad: "",
        unidad: "",
        estado: "",
        createDate: "",
        lastDate: "",
        valid: true,

        searchUnidad: "",
        datosUnidad: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        unidadModal: "",
        botonAct: 0,
        nombreRules: [
            (v) => !!v || "NOMBRE DE UNIDAD ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DE LA UNIDAD DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],



        headersUnidad: [
            { text: "UNIDAD", value: "unid", sortable: false },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "OPTIONS", value: "actions", sortable: false },
        ],
    }),

    created: function () {
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        //this.idUnidad = this.user.idUnidad;
        this.listarUnidades();
    },

    methods: {

        activar(item) {
            this.idUnidad = item.idunid;
            this.activarunidad(this.idUnidad);
        },
        async activarunidad(idUnidad) {
            let me = this;
            await axios
                .post("/unidad/onunidad/" + this.idUnidad).then(function (response) {

                    me.listarUnidades();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idUnidad = item.idunid;
            this.desactivarunidad(this.idUnidad);
        },
        async desactivarunidad(idUnidad) {
            let me = this;
            await axios
                .post("/unidad/offunidad/" + this.idUnidad).then(function (response) {

                    me.listarUnidades();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },

        showAddUnidad() {
            this.botonAct = 0;
            this.unidadModal = true;
        },
        showEditUnidad(item) {
            this.botonAct = 1;
            this.llenarCamposUnidad(item);
            this.unidadModal = true;
        },

        closeUnidad() {
            this.unidadModal = false;
        },

        llenarCamposUnidad(item) {
            this.unidad = item.unid;
            this.idUnidad = item.idunid;
        },
        
        actualizarUnidad() {
            this.actualizarunidad(
                this.idUnidad,
                this.unidad
            );
        },
        
       
        async actualizarunidad(
            idUnidad,
            unidad
        ) {
            let me = this;

            await axios
                .post(
                    "/unidad/editarunidad/" +
                    this.idUnidad +
                    "," +
                    this.unidad

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarUnidades(me.idUnidad);
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.unidad = "";
        },

        async listarUnidades(idUnidad) {
            let me = this;
            await axios
                .get("/unidad/listarunidades/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosUnidad = [];
                    } else {
                        me.datosUnidad = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarUnidad() {
            this.registrarUnidad(
                this.unidad
            );
        },
        async registrarUnidad(
            unidad
        ) {
            let me = this;

            //let me=this;
            await axios
                .post(
                    "/unidad/addunidad/" +
                    this.unidad

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarUnidades(me.idUnidad);
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};
</script>