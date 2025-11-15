<template>
    <v-card elevation="5" outlined shaped>

        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>SECTORES</h5>
            </v-alert>
        </div>

        <v-dialog v-model="sectorModal" max-width="1080px" persistent> <!-- Modal Sector-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Sector</span>
                    <span v-if="botonAct == 1">Editar Sector</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Sector / Editar Sector -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="sector" :counter="50" :rules="sectorRules"
                                        @input="sector = sector.toUpperCase()" label="Nombre del Sector" required>
                                    </v-text-field>
                                    <v-select v-model="idDepartamento" :items="datosDepartamento" item-text="nom"
                                        item-value="iddep" label="Selecciona un departamento" prepend-icon="mdi-map"
                                        :rules="departamentoRules" required>
                                    </v-select>

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
                                                @click="actualizarSector()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                @click="registrarSector()" style="float: left"
                                                title="REGISTRAR SECTOR" class="mx-2" large>
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
                                        @click="closeSector()" style="float: right"
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

        <v-dialog v-model="turnoModal" persistent max-width="1080px"> <!-- Modal Seleccionar Turno-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE TURNOS</span>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Turnos -->
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-col cols="12">
                                    <v-col cols="12" md="4">
                                        <v-btn color="success" @click="showAsignarTurno()">+ Asignar Turno</v-btn>
                                    </v-col>
                                    <!--
                            <v-card-title>
                                <v-text-field v-model="searchTurno" append-icon="mdi-magnify" label="BUSCAR TURNOS"
                                    single-line hide-details></v-text-field>
                            </v-card-title> -->
                                    <v-data-table :headers="headersTurno" :items="datosTurno" :items-per-page="5"
                                        :group-by="groupBy" class="elevation-1">
                                        <template #[`item.credte`]="{ item }">
                                            <td>{{ new Date(item.credte).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long', year: 'numeric'
                                        }) }}</td>
                                        </template>
                                        <template #[`item.upddte`]="{ item }">
                                            <td v-if="item.upddte == null">-</td>
                                            <td v-if="item.upddte != null">{{ new
                                            Date(item.upddte).toLocaleDateString('es-ES', {
                                                day: 'numeric', month:
                                                    'long', year: 'numeric'
                                            }) }}</td>
                                        </template>
                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" @click="removerTurno(item)"
                                                title="REMOVER TURNO DEL SECTOR">
                                                mdi-delete
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
                             <v-col cols="12">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeTurno()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                        </v-row>
                    </v-container>

                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="asignarTurnoModal" max-width="1080px"> <!-- Asignar Turno Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>Seleccionar Turno</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Turnos -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-col cols="12">
                                        <v-list-item>
                                            <v-list-item-title class="text-center">
                                                <h5>TURNOS DISPONIBLES</h5>
                                            </v-list-item-title>
                                        </v-list-item>

                                        <v-card-title>
                                            <v-text-field v-model="searchTurno" append-icon="mdi-magnify"
                                                label="BUSCAR TURNOS" single-line hide-details></v-text-field>
                                        </v-card-title>

                                        <v-data-table :headers="headersTurno" :items="datosTurnoSinS"
                                            :search="searchTurno" :items-per-page="5" class="elevation-1">
                                            <template #[`item.actions`]="{ item }">
                                                <v-icon small class="mr-2" @click="seleccionarTurno(item)"
                                                    title="SELECCIONAR TURNO">
                                                    mdi-check-circle-outline
                                                </v-icon>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-col>
                                <v-col cols="8"></v-col>
                                <v-col cols="4">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAsignarTurno()"
                                        style="float: right" title="SALIR">
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

        <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Sectores -->
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>SECTORES</h5>
                                </v-list-item-title>
                            </v-list-item>
                            <v-col cols="12" md="4">
                                <v-btn color="success" @click="showAddSector()">Nuevo Sector</v-btn>
                            </v-col>
                            <v-card-title>
                                <v-text-field v-model="searchSector" append-icon="mdi-magnify" label="BUSCAR SECTORES"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headersSector" :items="datosSector" :search="searchSector"
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
                                    <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" color="#0ABF55" @click="activar(item)"
                                        title="ACTIVAR SECTOR">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" color="#BF120A" @click="desactivar(item)"
                                        title="DESACTIVAR SECTOR">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon large class="mr-2" color="#0A628F" @click="showEditSector(item)" title="EDITAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon large class="mr-2" color="#0A628F" @click="showTurno(item)" title="VER TURNOS">
                                        mdi-clock-plus
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
        valid: true,
        user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },
        flag: 1,

        idSector: "",
        sector: "",
        estado: "",
        createDate: "",
        lastDate: "",
        idDepartamento: "",
        valid: true,

        searchSector: "",
        searchTurno: "",
        datosSector: [],
        datosDepartamento: [],
        datosTurno: [],
        datosTurnoSinS: [],

        groupBy: "turn-desactvado",

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        sectorModal: "",
        turnoModal: "",
        asignarTurnoModal: "",
        botonAct: 0,
        sectorRules: [
            (v) => !!v || "NOMBRE DE SECTOR ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DE LA SECTOR DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        departamentoRules: [
            (v) => !!v || "ASIGNAR UN DEPARTAMENTO ES REQUERIDO",

        ],

        headersSector: [
            { text: "SECTOR", value: "sect", sortable: false },
            { text: "DEPARTAMENTO", value: "dep", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],
        headersTurno: [
            { text: "TURNO", value: "turn" },
            { text: "FECHA CREACION", value: "credte" },
            { text: "ULTIMA ACTUALIZACION", value: "upddte" },
            { text: "OPCIONES", value: "actions", sortable: false, align: 'end' },
        ],

    }),
    computed: {
        logueado() {
            if (this.user != null) {
                this.user = JSON.parse(sessionStorage.getItem('session'));
            }
            return this.user;
        }
    },

    created: function () {
        if (this.user != null) {
            this.user = JSON.parse(sessionStorage.getItem('session'));
            this.listarSectores();
        }
        if (this.user == null) {
            if (this.$route.path != '/login') {
                this.$router.push("/login");
            }
        }
        console.log("UserData: " + JSON.stringify(this.user));
    },
    methods: {
        async listarTurnos(idTurno) {
            let me = this;
            await axios
                .get("/turno/listarturnoscons/" + this.idSector)
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
        async listarTurnosSinS(idTurno) {
            let me = this;
            await axios
                .get("/turno/listarturnossins/" + this.idSector)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosTurnoSinS = [];
                    } else {
                        me.datosTurnoSinS = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        seleccionarTurno(item) {
            this.idTurno = item.idturn;
            this.asignarTurnoASector();
            //this.closeEmpleado();
        },
        async removerTurno(item) {
            this.idTurno = item.idturn;
            let me = this;
            await axios
                .post(
                    "/turno/removerturnodesector/" +
                    this.idTurno +
                    "," +
                    this.idSector
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTurnos(me.idSector);
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },
        async asignarTurnoASector() {
            let me = this;
            await axios
                .post(
                    "/sector/asignarturnoasector/" +
                    this.idTurno +
                    "," +
                    this.idSector

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTurnos(me.idSector);
                    me.closeAsignarTurno();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        activar(item) {
            this.idSector = item.idsect;
            this.activarsector(this.idSector);
        },
        async activarsector(idSector) {
            let me = this;
            await axios
                .post("/sector/onsector/" + this.idSector).then(function (response) {

                    me.listarSectores();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idSector = item.idsect;
            this.desactivarsector(this.idSector);
        },
        async desactivarsector(idSector) {
            let me = this;
            await axios
                .post("/sector/offsector/" + this.idSector).then(function (response) {

                    me.listarSectores();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },

        showAddSector() {
            this.botonAct = 0;
            if (this.datosDepartamento.length == 0) this.listarDepartamentosActivos();
            this.sectorModal = true;
        },
        showEditSector(item) {
            this.botonAct = 1;
            if (this.datosDepartamento.length == 0) this.listarDepartamentosActivos();
            this.llenarCamposSector(item);
            this.sectorModal = true;
        },
        showTurno(item) {
            this.idSector = item.idsect;
            this.listarTurnos();
            this.turnoModal = true;
        },
        showAsignarTurno(item) {
            this.listarTurnosSinS();
            //this.llenarCamposSector(item);
            this.asignarTurnoModal = true;
        },

        closeSector() {
            this.sectorModal = false;
            this.limpiar();
        },
        closeTurno() {
            this.turnoModal = false;
        },
        closeAsignarTurno() {
            this.asignarTurnoModal = false;
        },

        llenarCamposSector(item) {
            this.sector = item.sect;
            this.idDepartamento = item.iddep;
            this.idSector = item.idsect;
        },

        actualizarSector() {
            if (this.$refs.form.validate()) {
                this.actualizarSectores();
            }
            
        },
        async actualizarSectores() {
            let me = this;

            await axios
                .post(
                    "/sector/editarsector/" +
                    this.idSector +
                    "," +
                    this.sector +
                    "," +
                    this.idDepartamento

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarSectores(me.idSector);
                    me.limpiar();
                    me.closeSector();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.sector = "";
            this.idDepartamento = ""; this.datosDepartamento = [];
        },

        async listarSectores(idSector) {
            let me = this;
            await axios
                .get("/sector/listarsectores/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosSector = [];
                    } else {
                        me.datosSector = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarDepartamentosActivos(idDepartamento) {
            let me = this;
            await axios
                .get("/departamento/listardepartamentosactivos/")
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
        registrarSector() {
            if (this.$refs.form.validate()) {
                this.registrarSectores();
            }
        },
        async registrarSectores() {
            let me = this;

            await axios
                .post(
                    "/sector/addsector/" +
                    this.sector +
                    "," +
                    this.idDepartamento

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarSectores(me.idSector);
                    me.limpiar();
                    me.closeSector();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};
</script>