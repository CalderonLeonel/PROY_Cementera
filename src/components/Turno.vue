<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>TURNOS</h5>
            </v-alert>
        </div>
        <!-- Snackbars-->
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
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                <strong>{{ mensajeSnackbarError }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarError = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

        <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Turnos -->
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-col cols="12">
                            <div> <!-- Encabezado -->
                                <v-alert dense color="#00A1B1" style="color: #ffffff; text-align: center;">
                                    <h5>TURNOS</h5>
                                </v-alert>
                            </div>
                            <v-col cols="12" md="4">
                                <v-btn color="success" @click="showAddTurno()">+ Nuevo Turno</v-btn>
                            </v-col>
                            <v-card-title>
                                <v-text-field v-model="searchTurno" append-icon="mdi-magnify" label="BUSCAR TURNOS"
                                    single-line hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table :headers="headersTurno" :items="datosTurno"
                                :items-per-page="5" class="elevation-1">
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
                                    <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activarTurno(item)"
                                        title="ACTIVAR TURNO">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivarTurno(item)"
                                        title="DESACTIVAR TURNO">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" @click="showEditTurno(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                </template>
                            </v-data-table>
                            <!--
                            <v-data-table :headers="headersTurno" :items="datosTurno" :group-by="groupBy"
                                :items-per-page="5" class="elevation-1">
                                <template #item.turn="{ item }">
                                    <tr color="#00A1B1"></tr>
                                </template>
                                <template #[`item.act`]="{ item }">
                                    <v-chip :color="getColor(item.act)" dark>
                                        {{ item.act }}
                                    </v-chip>
                                </template>
                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                        title="ACTIVAR TURNO">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                        title="DESACTIVAR TURNO">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" @click="llenarCamposTurno(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                </template>
                            </v-data-table>
                            -->
                        </v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

        <v-dialog v-model="turnoModal" persistent :overlay="false" max-width="1080px">
            <!-- Modal Turno -->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Turno</span>
                    <span v-if="botonAct == 1">Editar Turno</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Turno / Editar Turno -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="turno" :counter="50" :rules="turnoRules"
                                            @input="turno = turno.toUpperCase()" label="Nombre del Turno"
                                            required>
                                        </v-text-field>
                                    </v-col>

                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarTurno()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarTurno()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiarTurno()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAddTurno()"
                                        style="float: right" title="SALIR">
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

                                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense
                                    color="#EE680B" outlined>
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

        <v-dialog v-model="horarioModal" persistent :overlay="false" max-width="1080px"> <!-- Modal Horario-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nueva Horario</span>
                    <span v-if="botonAct == 1">Editar Horario</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nueva Horario / Editar Horario -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <!-- time pickers -->

                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarHorario()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarHorario()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiarHorario()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAddHorario()"
                                        style="float: right" title="SALIR">
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
                                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense
                                    color="#EE680B" outlined>
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

        <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Horarios -->
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Horarios</h5>
                                </v-list-item-title>
                            </v-list-item>
                            <v-col cols="12" md="4">
                                <v-btn color="success" @click="showAddHorario()">+ Registrar Horario</v-btn>
                            </v-col>
                            <!--
                            <v-card-title>
                                <v-text-field v-model="searchHorario" append-icon="mdi-magnify" label="BUSCAR REGISTROS"
                                    single-line hide-details></v-text-field>
                            </v-card-title>
                        -->
                            <v-data-table :headers="headersHorario" :items="datosHorario"
                                :items-per-page="5" class="elevation-1" id="tableId">
                                <template #[`item.fecini`]="{ item }">
                                    <td>{{ new Date(item.fecini).toLocaleDateString('es-ES', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    }) }}
                                    </td>
                                </template>
                                <template #[`item.fecfin`]="{ item }">
                                    <td>{{ new Date(item.fecfin).toLocaleDateString('es-ES', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    }) }}
                                    </td>
                                </template>
                                <template #[`item.act`]="{ item }">
                                    <v-chip :color="getColor(item.act)" dark>
                                        {{ item.act }}
                                    </v-chip>
                                </template>
                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activarHorario(item)"
                                        title="ACTIVAR HORARIO">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivarHorario(item)"
                                        title="ANULAR HORARIO">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" @click="showEditHorario(item)" title="EDITAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

    </v-card>
</template>
<script>
import axios from "axios";

export default {
    data: () => ({
        idTurno: "",
        turno: "",
        estado: "",
        createDate: "",
        lastDate: "",
        valid: true,

        idHorario: '',
        horaInicio: '',
        horaFinal: '',

        searchTurno: "",

        turnoModal: false,
        horarioModal: false,

        datosTurno: [],
        datosHorario: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        botonAct: 0,
        groupBy: "turn",


        headersTurno: [
            { text: "TURNO", value: "turn" },
            { text: "FECHA CREACION", value: "credte" },
            { text: "ULTIMA ACTUALIZACION", value: "upddte" },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "OPCIONES", value: "actions", sortable: false, align: 'end' },
        ],
        headersTurnoHorario: [
            { text: "TURNO", value: "turn", sortable: false },
            { text: "DIAS", value: "dias", sortable: false, align: 'end' },
            { text: "HORA INICIO", value: "hraini", sortable: false, align: 'end' },
            { text: "HORA FINAL", value: "hrafin", sortable: false, align: 'end' },
            { text: "OPCIONES", value: "actions", sortable: false, align: 'end' },
        ],
        headersHorario: [
            //{ text: "TURNO", value: "turn", sortable: false },
            { text: "DIAS", value: "dias", sortable: false, align: 'end' },
            { text: "HORA INICIO", value: "hraini", sortable: false, align: 'end' },
            { text: "HORA FINAL", value: "hrafin", sortable: false, align: 'end' },
            { text: "OPCIONES", value: "actions", sortable: false, align: 'end' },
        ],
        turnoRules: [
            (v) => !!v || "NOMBRE DEL TURNO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL TURNO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
    }),

    created: function () {
        this.listarTurnos();
    },

    methods: {
        showAddTurno() {
            this.botonAct = 0;
            this.turnoModal = true;

        },
        showEditTurno(item) {
            this.botonAct = 1;
            this.llenarCamposTurno(item);
            this.turnoModal = true;
        },
        showAddHorario() {
            this.botonAct = 0;
            this.horarioModal = true;

        },
        showEditHorario(item) {
            this.botonAct = 1;
            this.llenarCamposHorario(item);
            this.horarioModal = true;
        },

        async listarTurnos(idTurno) {
            let me = this;
            await axios
                .get("/turno/listarturnos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosTurno = [];
                    } else {
                        me.datosTurno = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarTurno() {
            this.registrarTurnos();
        },
        async registrarTurnos() {
            let me = this;
            await axios
                .post(
                    "/turno/addturno/" +
                    this.turno
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTurnos(me.idTurno);
                    me.limpiarTurno();
                    me.turnoModalModal = false;
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "REGISTRO FALLIDO",
                    me.snackbarError = true;
                });
        },
        actualizarTurno() {
            this.actualizarTurnos()
        },
        async actualizarTurnos() {
            let me = this;
            await axios
                .post(
                    "/turno/editarturno/" +
                    this.idTurno +
                    "," +
                    this.turno
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTurnos(me.idTurno);
                    me.limpiarTurno();
                    me.closeAddTurno();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "ACTUALIZACION FALLIDA",
                    me.snackbarError = true;
                });
        },


        registrarHorario() {
            this.registrarHorarios()
        },
        async registrarHorarios() {
            let me = this;
            await axios
                .post(
                    "/horario/addhorario/" +
                    this.horaInicio +
                    "," +
                    this.horaFinal +
                    "," +
                    this.idTurno
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarHorarios(me.idTurno);
                    me.limpiarHorario();
                    me.observacionModal = false;
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "REGISTRO DE HORARIO FALLIDO",
                    me.snackbarError = true;
                });
        },
        actualizarHorario() {
            this.actualizarHorarios()
        },
        async actualizarHorarios() {
            let me = this;
            await axios
                .post(
                    "/horario/editarhorario/" +
                    this.idHorario +
                    "," +
                    this.horaInicio +
                    "," +
                    this.horaFinal
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarHorarios(me.idTurno);
                    me.limpiarHorario();
                    me.closeAddHorario();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "ACTUALIZACION FALLIDA",
                    me.snackbarError = true;
                });
        },
        desactivarTurno(item) {
            this.idTurno = item.idturn;
            this.desactivarturno(this.idTurno);
        },
        async desactivarturno(idTurno) {
            let me = this;
            await axios
                .post("/turno/offturno/" + this.idTurno).then(function (response) {
                    me.listarTurnos();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        activarTurno(item) {
            this.idTurno = item.idturn;
            this.activarturno(this.idTurno);
        },
        async activarturno(idTurno) {
            let me = this;
            await axios
                .post("/turno/onturno/" + this.idTurno).then(function (response) {
                    me.listarTurnos();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },

        closeAddTurno() {
            this.turnoModal = false;
        },
        closeAddHorario() {
            this.horarioModalModal = false;
        },
        llenarCamposTurno(item) {
            this.idTurno = item.idturn;
            this.turno = item.turn;
            //this.diaFinal = new Date(item.fecfin).toISOString().split('T')[0];
        },
        llenarCamposHorario(item) {
            this.idHorario = item.idturn;
            //this.horaInicio = item.turn;
            //this.horaFinal = new Date(item.fecfin).toISOString().split('T')[0];
        },
        limpiarTurno() {
            this.idTurno = "";
            this.turno = "";
        },
        limpiarHorario() {
            this.idHorario = "";
            this.horaInicio = "";
            this.horaFinal = "";
        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
    },
};
</script>