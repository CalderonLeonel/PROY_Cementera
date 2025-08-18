<template>
    <v-card elevation="5" outlined shaped>

        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>SOLICITUDES DE NUEVO PERSONAL</h5>
            </v-alert>
        </div>

        <v-dialog v-model="solicitudModal" max-width="1080px"> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">NUEVA SOLICITUD</span>
                    <span v-if="botonAct == 1">EDITAR SOLICITUD</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nueva Solicitud / Editar Solicitud -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="puesto" :counter="50" :rules="puestoRules"
                                @input="puesto = puesto.toUpperCase()" label="NOMBRE DEL PUESTO" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea v-model="descripcion" :counter="200" :rules="descripcionRules" outlined
                                @input="descripcion = descripcion.toUpperCase()" label="REQUERÍMIENTOS DEL PUESTO" required>
                            </v-textarea>
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
                                                @click="actualizarSolicitud()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                @click="registrarSolicitud()" style="float: left"
                                                title="REGISTRAR SOLICITUD DE PERSONAL" class="mx-2" large>
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
                                        @click="closeSolicitud()" style="float: right"
                                        title="SALIR">
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

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-col cols="12" md="4">
            <v-btn color="success" @click="showAddSolicitud()">Nueva Solicitud</v-btn>
        </v-col>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Solicitudes -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>SOLICITUDES DE PERSONAL</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="searchSolicitud" append-icon="mdi-magnify"
                                        label="BUSCAR SOLICITUDES" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersSolicitud" :items="datosSolicitud" :search="searchSolicitud"
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
                                        <v-icon v-if="item.act == 'PENDIENTE' && user.tipo != 'COMUN'" large class="mr-3" color="#0ABF55" @click="aceptar(item)"
                                            title="ACEPTAR SOLICITUD">
                                            mdi-check-circle
                                        </v-icon>
                                        <v-icon v-if="item.act == 'PENDIENTE' && user.tipo != 'COMUN'" large class="mr-4" color="#BF120A" @click="rechazar(item)"
                                            title="RECHAZAR SOLICITUD">
                                            mdi-close-octagon
                                        </v-icon>
                                        <v-icon v-if="item.act == 'PENDIENTE' && user.tipo == 'COMUN'" large class="mr-2" color="#0A628F" @click="showEditSolicitud(item)"
                                            title="EDITAR INFORMACION">
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon v-if="item.act != 'PENDIENTE'" large color="#BF120A" class="mr-2" @click="deleteSolicitudPersonal(item)"
                                            title="ELIMINAR SOLICITUD">
                                            mdi-delete
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-col>
                    </v-row>
                    <!-- Snackbar -->
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

export default {
    data: () => ({
        idSolicitud: "",
        puesto: "",
        descripcion: "",
        estado: "",
        createDate: "",
        lastDate: "",
        valid: true,
        idUsuario: "",

        searchSolicitud: "",
        datosSolicitud: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        solicitudModal: "",
        botonAct: 0,
        puestoRules: [
            (v) => !!v || "NOMBRE DEL PUESTO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL PUESTO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        descripcionRules: [
            (v) => !!v || "REQUERIMIENTOS DEL PUESTO ES REQUERIDO",
            (v) =>
                (v && v.length <= 200) ||
                "ELOS REQUERIMINETOS DEL PUESTO DEBEN JUNTAR 200 CARACTERES COMO MAXIMO",
        ],



        headersSolicitud: [
            { text: "SOLICITUD", value: "pues" },
            { text: "REQUERIMIENTOS", value: "des", sortable: false },
            { text: "FECHA CREACION", value: "credte" },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte" },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],
    }),

    created: function () {
        this.user = JSON.parse(sessionStorage.getItem("session"));
        this.idUsuario = this.user['id_usuario'];
        console.log("ID: "+this.idUsuario+" y "+this.user.tipo);
        this.listarSolicitudes();
    },

    methods: {

        aceptar(item) {
            this.idSolicitud = item.idsoli;
            this.aceptarsolicitud(this.idSolicitud);
        },
        async aceptarsolicitud(idSolicitud) {
            let me = this;
            await axios
                .post("/solicitud/acceptsolicitud/" + this.idSolicitud).then(function (response) {

                    me.listarSolicitudes();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        rechazar(item) {
            this.idSolicitud = item.idsoli;
            this.rechazarsolicitud(this.idSolicitud);
        },
        async rechazarsolicitud(idSolicitud) {
            let me = this;
            await axios
                .post("/solicitud/denysolicitud/" + this.idSolicitud).then(function (response) {

                    me.listarSolicitudes();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        deleteSolicitudPersonal(item) {
            this.idSolicitud = item.idsoli;
            this.deletesolicitudpersonal(this.idSolicitud);
        },
        async deletesolicitudpersonal(idSolicitud) {
            let me = this;
            await axios
                .post("/solicitud/deletesolicitud/" + this.idSolicitud).then(function (response) {

                    me.listarSolicitudes();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'PENDIENTE') return 'orange'
            else if (est == 'ACEPTADA') return 'green'
            else return 'red'
        },

        showAddSolicitud() {
            this.botonAct = 0;
            this.solicitudModal = true;
        },
        showEditSolicitud(item) {
            this.botonAct = 1;
            this.llenarCamposSolicitud(item);
            this.solicitudModal = true;
        },

        closeSolicitud() {
            this.solicitudModal = false;
        },

        llenarCamposSolicitud(item) {
            this.puesto = item.pues;
            this.descripcion = item.des;
            this.idSolicitud = item.idsoli;
        },
        
        actualizarSolicitud() {
            this.actualizarsolicitud(
                this.idSolicitud,
                this.puesto,
                this.descripcion
            );
        },
        
       
        async actualizarsolicitud(
            idSolicitud,
            puesto,
            descripcion
        ) {
            let me = this;

            await axios
                .post(
                    "/solicitud/editarsolicitud/" +
                    this.idSolicitud +
                    "," +
                    this.puesto +
                    "," +
                    this.descripcion

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarSolicitudes(me.idSolicitud);
                    me.closeSolicitud();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.idSolicitud = "";
            this.puesto = "";
            this.descripcion = "";
        },

        async listarSolicitudes() {
            let me = this;
            await axios
                .get("/solicitud/listarsolicitudes/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosSolicitud = [];
                    } else {
                        me.datosSolicitud = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarSolicitud() {
            this.registrarSolicitud(
                this.puesto,
                this.descripcion
            );
        },
        async registrarSolicitud(
            puesto,
            descripcion,
            idUsuario
        ) {
            let me = this;

            //let me=this;
            await axios
                .post(
                    "/solicitud/addsolicitud/" +
                    this.puesto +
                    "," +
                    this.descripcion +
                    "," +
                    this.idUsuario

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarSolicitudes(me.idSolicitud);
                    me.limpiar();
                    me.closeSolicitud();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};
</script>