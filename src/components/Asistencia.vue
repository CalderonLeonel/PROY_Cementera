<template>
    <v-card elevation="5" outlined shaped>
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
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error" outlined>
                <strong>{{ mensajeSnackbarError }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarError = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
        <v-tabs horizontal color="#002245" center-active grow>
            <v-tab>
                <v-icon left>
                    mdi-account-box
                </v-icon>
                ASISTENCIAS DE HOY
            </v-tab>
            <v-tab>
                <v-icon left>
                    mdi-file-sign
                </v-icon>
                HISTORIAL ASISTENCIAS
            </v-tab>
            <v-tab-item v-if="flag == 1">
                <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Asistencias -->
                    <v-container>
                        <v-list-item>
                            <v-list-item-title class="text-center">
                                <h5>ASISTENCIAS DEL DIA</h5>
                            </v-list-item-title>
                        </v-list-item>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-col cols="12">
                                    <v-col cols="12" md="12">
                                        <v-btn color="success" @click="showAddAsistenciaManual()">REGISTRAR
                                            ASISTENCIA MANUALMENTE</v-btn>
                                        <v-col cols="12" md="2"></v-col>
                                        <v-btn color="success" @click="showAddAsistenciaQR()">REGISTAR ASISTENCIA
                                            MEDIANTE QR</v-btn>
                                    </v-col>
                                    <v-card-title>
                                        <v-text-field v-model="searchAsistencia" append-icon="mdi-magnify"
                                            label="BUSCAR ASISTENCIAS DEL DIA" single-line hide-details></v-text-field>
                                    </v-card-title>

                                    <v-data-table :headers="headersAsistenciaDelDia" :items="datosAsistenciaDelDia"
                                        :search="searchAsistencia" :items-per-page="5" class="elevation-1" id="tableId">
                                        <template #[`item.nom`]="{ item }">
                                            <td>{{ item.nom }} {{ item.pat }} {{ item.mat }}</td>
                                        </template>
                                        <!--
                                        <template #[`item.ism`]="{ item }">
                                            <td v-if="item.ism == true">HOMBRE</td>
                                            <td v-if="item.ism == false">MUJER</td>
                                        </template>
                                        <template #[`item.act`]="{ item }">
                                            <v-chip :color="getColor(item.act)" dark>
                                                {{ item.act }}
                                            </v-chip>
                                        </template>
                                        -->
                                        <!--
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
                                        -->
                                    </v-data-table>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-tab-item>
            <v-tab-item v-if="flag == 1">
                <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Asistencias -->
                    <v-container>
                        <v-list-item>
                            <v-list-item-title class="text-center">
                                <h5>ASISTENCIAS</h5>
                            </v-list-item-title>
                        </v-list-item>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-col cols="12">
                                    
                                    <v-card-title>
                                        <v-text-field v-model="searchAsistencia" append-icon="mdi-magnify"
                                            label="BUSCAR ASISTENCIAS" single-line hide-details></v-text-field>
                                    </v-card-title>

                                    <v-data-table :headers="headersAsistencia" :items="datosAsistencia"
                                        :search="searchAsistencia" :items-per-page="5" class="elevation-1" id="tableId">
                                        <template #[`item.nom`]="{ item }">
                                            <td>{{ item.nom }} {{ item.pat }} {{ item.mat }}</td>
                                        </template>
                                        <template #[`item.act`]="{ item }">
                                            <v-chip :color="getColor(item.act)" dark>
                                                {{ item.act }}
                                            </v-chip>
                                        </template>
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
            </v-tab-item>
        </v-tabs>

        <v-dialog v-model="asistenciaModal" max-width="1080px" persistent lazy-validation> <!-- Modal Asistencia (Manual y QR)-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">REGISTRAR ASISTENCIA MANUAL</span>
                    <span v-if="botonAct == 1">REGISTRAR ASISTENCIA MEDIANTE QR</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Empleados -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1" v-if="botonAct == 0">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showEmpleado()"
                                        style="float: right" title="BUSCAR EMPLEADO">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="1" v-if="botonAct == 1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showQR()"
                                        style="float: right" title="ABRIR CAMARA">
                                        <v-icon dark> mdi-camera </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="idEmpleado" :label="nombreEmpleadoLabel" type="hidden"
                                        disabled required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="isMale" :label="sexoLabel" disabled required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="edad" :label="edadLabel" disabled required>
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
                                                @click="registrarAsistencia()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                @click="registrarAsistencia()" style="float: left"
                                                title="REGISTRAR ASISTENCIA" class="mx-2" large>
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
                                        @click="closeAsistencia()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="empleadoModal" max-width="1080px" persistent lazy-validation> <!-- Seleccionar Empleado Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>SELECCIONAR EMPLEADO</span>
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
                                            :search="searchEmpleado" :items-per-page="5" class="elevation-1">
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
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeEmpleado()"
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

        <v-dialog v-model="lectorQRModal" max-width="1080px" lazy-validation persistent> <!-- Modal Lector QR-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>ESCÁNER DE QR</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Empleados -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-col cols="12">
                                        <qrcode-stream style="width: 300px; height: 300px; margin: 0 auto;"
                                         @decode="onDecode" @init="onInit"></qrcode-stream>
                                    </v-col>
                                </v-col>
                                <v-col cols="8" md="12">
                                    <v-btn iconv class="mx-4" dark color="#0A62BF"
                                        @click="actualizarAsistencia()" style="float: left"
                                        title="ENCENDER CAMARA">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv class="mx-4" dark color="#0ABF55"
                                        @click="toggleCamera(true)" style="float: left" title="GUARDAR FOTO EMPLEADO">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeQR()"
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



    </v-card>
</template>
<script>
import axios from "axios";
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    data: () => ({
        //idAsistencia: "",
        idEmpleado: "",
        nombres: "",
        paterno: "",
        materno: "",
        isMale: "",
        edad: "",
        ci: "",
        estado: "",
        createDate: "",
        lastDate: "",

        flag: 1,
        datePicker: false,
        valid: false,

        nombreEmpleadoLabel: "SELECCIONAR EMPLEADO...",
        sexoLabel: "GÉNERO...",
        edadLabel: "EDAD...",
        empleadoModal: false,
        lectorQRModal: false,
        asistenciaModal: "",
        isCameraActive: false,

        searchAsistencia: "",
        searchEmpleado: "",
        datosAsistencia: [],
        datosAsistenciaDelDia: [],
        datosEmpleado: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",

        timeout: 2000,

        botonAct: 0,
        idEmpleadoRules: [
            (v) => !!v || "IDENTIFICARSE ES REQUERIDO",
        ],

        headersAsistencia: [
            { text: "HORA", value: "hor" },
            { text: "FECHA", value: "fec" },
            { text: "ID", value: "idempl" },
            { text: "NOMBRES", value: "nom" },
            //{ text: "ESTADO", value: "act" },
            //{ text: "OPCIONES", value: "actions", sortable: false },
        ],
        headersAsistenciaDelDia: [
            { text: "HORA", value: "hor" },
            { text: "FECHA", value: "fec" },
            { text: "ID", value: "idempl" },
            { text: "NOMBRES", value: "nom" },
            { text: "N° CARNET", value: "ci" }
            
            //{ text: "ESTADO", value: "act" },
            //{ text: "OPCIONES", value: "actions", sortable: false },
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
        this.listarAsistenciasDelDia();
        this.listarAsistencias();
    },
    components: {
        QrcodeStream
    },

    methods: {
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        seleccionarEmpleado(item) {
            this.idEmpleado = item.idempl;
            this.nombreEmpleadoLabel = item.nom + " " + item.pat + " " + item.mat;
            if (item.ism) { this.sexoLabel = "HOMBRE"; } else { this.sexoLabel = item.ism; }
            let aux = new Date(item.nacdte).toLocaleDateString();//new Date(item.nacdte).toISOString().split('T')[0];
            this.edadLabel= this.calculateAge(aux);
            this.closeEmpleado();
        },

        showAddAsistenciaManual() {
            this.botonAct = 0;
            this.asistenciaModal = true;
        },
        showAddAsistenciaQR() {
            this.botonAct = 1;
            this.asistenciaModal = true;
        },

        closeAsistencia() {
            this.asistenciaModal = false;
        },
        closeEmpleado() {
            this.empleadoModal = false;
        },
        closeQR() {
            this.lectorQRModal = false;
        },
        showEmpleado(item) {
            this.listarEmpleadosActivos();
            this.empleadoModal = true;
        },
        showQR(item) {
            this.lectorQRModal = true;
        },

        llenarCamposAsistencia(item) {

        },

        limpiar() {
            this.idEmpleado = "";
            this.nombreEmpleadoLabel = "";
            this.edadLabel = "";
        },
        async listarAsistencias() {
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
        async listarAsistenciasDelDia() {
            let me = this;
            await axios
                .get("/asistencia/listarasistenciasdeldia/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosAsistenciaDelDia = [];
                    } else {
                        me.datosAsistenciaDelDia = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarEmpleadosActivos() {
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
        async getEmpleado(idEmpleado) {
            let me = this;
            await axios
                .get("/empleado/getempleado/"+idEmpleado)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.mensajeSnackbarError = 'Error, empleado no encontrado.';
                        me.snackbarError = true;
                    } else {
                        let newEmpleado = [];
                        //El get_empleado no devuelve idempl porque ya se obtuvo por QR, puesto manualmente en esta linea
                        newEmpleado.idempl = idEmpleado; 
                        response.data.resultado.forEach(item => {
                            newEmpleado.nom = item.nom;
                            newEmpleado.pat = item.pat;
                            newEmpleado.mat = item.mat;
                            newEmpleado.ism = item.ism;
                            newEmpleado.nacdte = item.nacdte;
                        });
                        me.seleccionarEmpleado(newEmpleado);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
         calculateAge(nacdte) {
            // Convertir la fecha de nacimiento en un objeto Date
            const birthDate = new Date(nacdte);
            const today = new Date();
            
            // Calcular la diferencia en años
            let age = today.getFullYear() - birthDate.getFullYear();
            
            // Ajustar si la fecha de nacimiento no ha ocurrido este año todavía
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
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
                    me.listarAsistenciasDelDia(me.idAsistencia);
                    me.limpiar();
                    me.closeAsistencia();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        //#region QR_Camara
        onDecode(content) {
            console.log("code:" + content);
            this.getEmpleado(content);
            this.toggleCamera(false);
            this.lectorQRModal = false;
        },
        onInit(promise) {
            promise.then(() => {
                this.mensajeSnackbar = 'Camara Activada';
                this.snackbarOK = true;
            }).catch(error => {
                if (error.name === 'NotAllowedError') {
                    console.log('No se pudo accedera a la cámara');
                    this.mensajeSnackbar = 'No se pudo acceder a la cámara';
                    this.snackbarError = true;
                } else if (error.name === 'NotFoundError') {
                    console.log('No se detectó ninguna cámara');
                    this.mensajeSnackbar = 'No se detectó ninguna cámara conectada';
                    this.snackbarError = true;
                } else {
                    console.log('Error: ', error)
                }
            })
        },
        toggleCamera(value) {
            this.isCameraActive = value;
        }
        //#endregion 
    },
};
</script>