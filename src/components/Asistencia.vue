<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>ASISTENCIAS DEL DIA</h5>
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

        <v-dialog v-model="asistenciaManualModal" max-width="1080px" persistent> <!-- Modal Asistencia Manual-->
            
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Registrar Asistencia Manual</span>
                    <span v-if="botonAct == 1">Editar Asistencia</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Empleados -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showEmpleado()"
                                        style="float: right" title="BUSCAR EMPLEADO">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="idEmpleado" :label="nombreEmpleadoLabel" type="hidden"
                                        disabled required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="isMale" :counter="50" :rules="sexoRules"
                                        @input="isMale = isMale.toUpperCase()" :label="sexoLabel"
                                        disabled required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="fechaNacimiento" :counter="50" :rules="fechaNacimientoRules"
                                        @input="fechaNacimiento = fechaNacimiento.toUpperCase()" label="Fecha de Nacimiento"
                                        disabled required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarAsistencia()" style="float: left"
                                        title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarAsistencia()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAsistencia()"
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

        <v-dialog v-model="empleadoModal" max-width="1080px"> <!-- Seleccionar Empleado Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>Seleccionar Empleado</span>
                </v-card-title>
                <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Empleados -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>EMPLEADOS</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="searchEmpleado" append-icon="mdi-magnify"
                                        label="BUSCAR EMPLEADOS" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersEmpleado" :items="datosEmpleado" :search="searchEmpleado"
                                    :items-per-page="5" class="elevation-1">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarEmpleado(item)"
                                            title="SELECCIONAR EMPLEADO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-col>
                        <v-col cols="8"></v-col>                     
                        <v-col cols="4">
                            <v-btn class="mx-2" iconv dark color="#00A1B1"
                                    @click="closeEmpleado()" style="float: right" title="SALIR">
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

        <v-dialog v-model="asistenciaQRModal" max-width="1080px" lazy-validation persistent> <!-- Modal Asistencia QR-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Registrar Asistencia Por QR</span>
                    <span v-if="botonAct == 1">Editar Asistencia</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Empleados -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-col cols="12">
                                        <v-list-item>
                                            <v-list-item-title class="text-center">
                                                <h5>SELECCIONE EL EMPLEADO QUE ESTÁ ASISTIENDO</h5>
                                            </v-list-item-title>
                                        </v-list-item>

                                        <v-card-title>
                                            <v-text-field v-model="searchEmpleado" append-icon="mdi-magnify"
                                                label="BUSCAR EMPLEADOS" single-line hide-details></v-text-field>
                                        </v-card-title>

                                        <v-data-table :headers="headersEmpleado" :items="datosEmpleado"
                                            :search="searchEmpleado" :items-per-page="5" class="elevation-1"
                                            id="tableId">
                                            <template #[`item.nom`]="{ item }">
                                                <td>{{ item.nom }} {{ item.pat }} {{ item.mat }}</td>
                                            </template>
                                            <template #[`item.ism`]="{ item }">
                                                <td v-if="item.ism == true">HOMBRE</td>
                                                <td v-if="item.ism == false">MUJER</td>
                                            </template>
                                            <template #[`item.act`]="{ item }">
                                                <v-chip :color="getColor(item.act)" dark>
                                                    {{ item.act }}
                                                </v-chip>
                                            </template>
                                            <template #[`item.actions`]="{ item }">
                                                <v-icon large class="mr-2" color="#0A628F"
                                                    @click="showEditAsistencia(item)" title="EDITAR INFORMACION">
                                                    mdi-pencil
                                                </v-icon>
                                                <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" color="#0ABF55"
                                                    @click="activar(item)" title="ACTIVAR EMPLEADO">
                                                    mdi-check-circle-outline
                                                </v-icon>
                                                <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" color="#BF120A"
                                                    @click="desactivar(item)" title="DESACTIVAR EMPLEADO">
                                                    mdi-cancel
                                                </v-icon>
                                            </template>
                                        </v-data-table>
                                    </v-col>

                                </v-col>
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarAsistencia()" style="float: left"
                                        title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarAsistencia()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAsistencia()"
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

        <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Asistencias -->
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ASISTENCIAS DEL DIA</h5>
                                </v-list-item-title>
                            </v-list-item>
                            <v-col cols="12" md="4">
                                <v-btn color="success" @click="showAddAsistenciaManual()">Registrar Asistencia
                                    Manualmente</v-btn>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-btn color="success" @click="showAddAsistenciaQR()">Registrar Asistencia Por
                                    QR</v-btn>
                            </v-col>
                            <v-card-title>
                                <v-text-field v-model="searchAsistencia" append-icon="mdi-magnify"
                                    label="BUSCAR ASISTENCIAS DEL DIA" single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headersAsistencia" :items="datosAsistencia"
                                :search="searchAsistencia" :items-per-page="5" class="elevation-1" id="tableId">
                                <template #[`item.nom`]="{ item }">
                                    <td>{{ item.nom }} {{ item.pat }} {{ item.mat }}</td>
                                </template>
                                <template #[`item.ism`]="{ item }">
                                    <td v-if="item.ism == true">HOMBRE</td>
                                    <td v-if="item.ism == false">MUJER</td>
                                </template>
                                <template #[`item.act`]="{ item }">
                                    <v-chip :color="getColor(item.act)" dark>
                                        {{ item.act }}
                                    </v-chip>
                                </template>
                                <!--
                                    <template #[`item.credte`]="{ item }">
                                        <td>{{ new Date('2023-01-01T04:00:00.000Z').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) }}</td>
                                    </template>
                                -->

                                <template #[`item.actions`]="{ item }">
                                    <v-icon large class="mr-2" color="#0A628F" @click="showEditAsistencia(item)"
                                        title="EDITAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" color="#0ABF55"
                                        @click="activar(item)" title="ACTIVAR ASISTENCIA">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" color="#BF120A"
                                        @click="desactivar(item)" title="DESACTIVAR ASISTENCIA">
                                        mdi-cancel
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
        //idAsistencia: "",
        

        idEmpleado: "",
        nombres: "",
        paterno: "",
        materno: "",
        isMale: "",
        estadoCivil: "",
        email: "",
        fechaNacimiento: "",
        ci: "",
        telefono: "",
        estado: "",
        createDate: "",
        lastDate: "",


        idDepartamento: "",
        datePicker: false,
        valid: false,
        nombreEmpleadoLabel: "Seleccionar empleado...",
        sexoLabel: "Género...",
        empleadoModal: false,

        searchAsistencia: "",
        datosAsistencia: [],
        datosSexo: [{ text: "HOMBRE", isHombre: true }, { text: "MUJER", isHombre: false },],
        datosEstadoCivil: ['SOLTERO', 'CASADO', 'CONVIVIENTE', 'VIUDO'],
        datosEmpleado: [],
        datosDepartamento: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",

        timeout: 2000,

        asistenciaManualModal: "",
        asistenciaQRModal: "",
        botonAct: 0,
        nombresRules: [
            (v) => !!v || "NOMBRE DEL ASISTENCIA ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL ASISTENCIA DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        paternoRules: [
            (v) => !!v || "APELLIDO DEL ASISTENCIA ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL ASISTENCIA DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        maternoRules: [
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL ASISTENCIA DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],

        headersAsistencia: [
            { text: "HORA", value: "hor" },
            { text: "FECHA", value: "fec" },
            { text: "ID", value: "idempl" },
            { text: "NOMBRES", value: "nom" },
            { text: "ESTADO", value: "act" },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],
        headersEmpleado: [
            { text: "NOMBRES", value: "nom" },
            { text: "PATERNO", value: "pat" },
            { text: "MATERNO", value: "mat" },
            { text: "C.I.", value: "ci" },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],

    }),

    created: function () {
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        //this.idAsistencia = this.user.idAsistencia;
        this.listarAsistencias();
    },

    methods: {
        goToAsistenciaPerfil(item) {
            this.$router.push({ name: 'Perfil', params: item })
        },

        activar(item) {
            this.idAsistencia = item.idempl;
            this.activarasistencia(this.idAsistencia);
        },
        async activarasistencia(idAsistencia) {
            let me = this;
            await axios
                .post("/asistencia/onasistencia/" + this.idAsistencia).then(function (response) {

                    me.listarAsistencias();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idAsistencia = item.idempl;
            this.desactivarasistencia(this.idAsistencia);
        },
        async desactivarasistencia(idAsistencia) {
            let me = this;
            await axios
                .post("/asistencia/offasistencia/" + this.idAsistencia).then(function (response) {

                    me.listarAsistencias();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        seleccionarEmpleado(item) {
            this.idEmpleado = item.idempl;
            this.nombreEmpleadoLabel = item.nom + " "+ item.pat + " " + item.mat;
            if(item.ism) { this.isMale = "HOMBRE"; } else { this.isMale = "MUJER"; }
            this.fechaNacimiento = new Date(item.nacdte).toISOString().split('T')[0];
            this.closeEmpleado();
        },

        showAddAsistenciaManual() {
            this.botonAct = 0;
            //if (this.datosEmpleado.length == 0) this.listarCargos();
            //if (this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.asistenciaManualModal = true;
        },
        showAddAsistenciaQR() {
            this.botonAct = 0;
            //if (this.datosEmpleado.length == 0) this.listarCargos();
            //if (this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.asistenciaQRModal = true;
        },
        showEditAsistencia(item) {
            this.botonAct = 1;
            if (this.datosEmpleado.length == 0) this.listarCargos();
            if (this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.llenarCamposAsistencia(item);
            this.asistenciaManualModal = true;
        },

        closeAsistencia() {
            this.asistenciaManualModal = false;
            this.asistenciaQRModal = false;
        },
        closeEmpleado() {
            this.empleadoModal = false;
        },
        showEmpleado(item) {
            //this.botonAct = 1;
            //this.llenarCamposUsuario(item);
            this.listarEmpleados();
            this.empleadoModal = true;
        },

        llenarCamposAsistencia(item) {
            this.nombres = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.isMale = item.ism;
            this.estadoCivil = item.est
            this.email = item.emal;
            this.fechaNacimiento = new Date(item.nacdte).toISOString().split('T')[0];
            this.ci = item.ci;
            this.telefono = item.tel;
            this.idEmpleado = item.idempl;
            this.idDepartamento = item.iddep;
            this.idAsistencia = item.idempl;
        },

        actualizarAsistencia() {
            this.actualizarasistencia(
                this.idAsistencia,
                this.nombres,
                this.idempl,
                this.iddep
            );
        },

        async actualizarasistencia() {
            let me = this;

            await axios
                .post(
                    "/asistencia/editarasistencia", {
                    p1: this.idAsistencia,
                    p2: this.nombres,
                    p3: this.paterno,
                    p4: this.materno,
                    p5: this.isMale,
                    p6: this.estadoCivil,
                    p7: this.email,
                    p8: this.fechaNacimiento,
                    p9: this.ci,
                    p10: this.telefono,
                    p11: this.idEmpleado,
                    p12: this.idDepartamento,
                }
                    /*
                    "/asistencia/editarasistencia/" +
                    this.idAsistencia +
                    "," +
                    this.nombres +
                    "," +
                    this.paterno +
                    "," +
                    this.materno +
                    "," +
                    this.isMale +
                    "," +
                    this.estadoCivil +
                    "," +
                    this.email +
                    "," +
                    this.fechaNacimiento +
                    "," +
                    this.ci +
                    "," +
                    this.telefono +
                    "," +
                    this.idEmpleado +
                    "," +
                    this.idDepartamento
                    */

                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarAsistencias(me.idAsistencia);
                    me.limpiar();
                    me.closeAsistencia();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.nombres = "";
            this.paterno = "";
            this.materno = "";
            this.isMale = "";
            this.estadoCivil = "";
            this.email = "";
            this.fechaNacimiento = "";
            this.ci = "";
            this.telefono = "";
            this.idEmpleado = ""; this.datosEmpleado.idempl = "";
            this.idDepartamento = ""; this.datosDepartamento.iddep = "";
        },

        async listarAsistencias(idAsistencia) {
            let me = this;
            await axios
                .get("/asistencia/listarasistencias/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosAsistencia = [];
                    } else {
                        me.datosAsistencia = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarEmpleados(idEmpleado) {
            let me = this;
            await axios
                .get("/empleado/listarempleadossactivos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosEmpleado = [];
                    } else {
                        me.datosEmpleado = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarDepartamentos(idDepartamento) {
            let me = this;
            await axios
                .get("/departamento/listardepartamentos/")
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
        registrarAsistencia() {
            if (this.$refs.form.validate()) {
                this.registrarAsistencias();
            }
        },
        async registrarAsistencias() {
            let me = this;
            await axios
                .post(
                    "/asistencia/addasistencia/" +
                    this.idEmpleado
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarAsistencias(me.idAsistencia);
                    me.limpiar();
                    me.closeAsistencia();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },
    },
};
</script>