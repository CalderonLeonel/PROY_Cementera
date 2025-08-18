<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>USUARIOS</h5>
            </v-alert>
        </div>
        <!-- Snackbars-->
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00"outlined>
                <strong>{{ mensajeSnackbar }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarOK = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
        <div class="text-center">
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error"outlined>
                <strong>{{ mensajeSnackbarError }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarError = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

        <v-dialog v-model="usuarioModal" max-width="1080px" persistent> <!-- Usuarios Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">NUEVO USUARIO</span>
                    <span v-if="botonAct == 1">EDITAR USUARIO</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Usuario / Editar Usuario -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan"
                                            @click="showEmpleado()" style="float: right" title="BUSCAR EMPLEADO">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="idEmpleado" :label="nombreEmpleadoLabel" type="hidden" disabled required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombreUsuario" :counter="50" :rules="nombreRules"
                                        @input="nombreUsuario = nombreUsuario.toUpperCase()" label="NOMBRE DE USUARIO" disabled required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                        <v-select v-model="tipo" :items="datosTipo" label="SELECCIONA EL TIPO DE CUENTA"
                                            prepend-icon="mdi-pick" required>
                                        </v-select>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan"
                                            @click="showAcceso()" style="float: left" title="SELECCIONAR ACCESOS">
                                        <v-icon dark> mdi-key </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="11">
                                    <v-select v-model="accesos" item-value="idacc" item-text="idacc" :items="accesos" label="SELECCIONAR PERMISOS"
                                        multiple disabled
                                        ></v-select>
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
                                                        @click="actualizarUsuario()" style="float: left"
                                                        title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                        <v-icon dark> mdi-pencil </v-icon>
                                                    </v-btn>
                                                    <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                        @click="registrarUsuario()" style="float: left"
                                                        title="REGISTRAR USUARIO" class="mx-2" large>
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
                                                @click="closeUsuario()" style="float: right"
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

        <v-dialog v-model="empleadoModal" max-width="1080px" persistent> <!-- Empleados Modal-->
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
                                        <v-icon large class="mr-2" @click="seleccionarEmpleado(item)" color="#0ABF55"
                                            title="SELECCIONAR EMPLEADO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <!--
                                        <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" @click="desactivar(item)"
                                            title="DESACTIVAR EMPLEADO">
                                            mdi-cancel
                                        </v-icon>
                                        <v-icon large class="mr-2" @click="showEditEmpleado(item)"
                                            title="EDITAR INFORMACION">
                                            mdi-pencil
                                        </v-icon>
                                        -->
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

        <v-dialog v-model="accesoModal" max-width="1080px"> <!-- Accesos Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>Selecciona los accesos que tendrá la cuenta</span>
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Seleccionar Accesos -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                        <v-data-table v-model="accesos" :headers="headersAcceso" :items="datosAcceso"
                            item-key="idacc" item-value show-select class="elevation-1">
                            <!--
                            <template v-slot:top>
                            <v-switch v-model="singleSelect" label="Single select"class="pa-3">

                            </v-switch>
                            </template>
                        -->
                        </v-data-table>
                        <!--
                        <v-col cols="12" md="1">
                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                    @click="showEmpleado()" style="float: right" title="BUSCAR EMPLEADO">
                                <v-icon dark> mdi-magnify </v-icon>
                            </v-btn>
                        </v-col>
                    -->
                        </v-col>
                  
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon color="#0ABF55"
                                                @click="closeAcceso()" style="float: left"
                                                title="GUARDAR ACCESOS" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeAcceso()" style="float: right"
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

        <div>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Usuarios -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>USUARIOS</h5>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-col cols="12" md="4">
                                    <v-btn color="success" @click="showAddUsuario()">Nuevo Usuario</v-btn>
                                </v-col>

                                <v-card-title>
                                    <v-text-field v-model="searchUsuario" append-icon="mdi-magnify"
                                        label="BUSCAR USUARIOS" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersUsuario" :items="datosUsuario" :search="searchUsuario"
                                    :items-per-page="5" class="elevation-1">
                                    <template #[`item.act`]="{ item }">
                                        <v-chip :color="getColor(item.act)" dark>
                                            {{ item.act }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" @click="activar(item)" color="#0ABF55"
                                            title="ACTIVAR USUARIO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" @click="desactivar(item)" color="#BF120A"
                                            title="DESACTIVAR USUARIO">
                                            mdi-cancel
                                        </v-icon>
                                        <!--
                                        <v-icon small class="mr-2" @click="showEditUsuario(item)"
                                            title="EDITAR INFORMACION">
                                            mdi-pencil
                                        </v-icon>
                                        -->
                                      

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
        idUsuario: "",
        nombreUsuario: "",
        password: "",
        tipo: "",
        accesos: [],//[1,2,3,4,5],
        estado: "",
        createDate: "",
        lastDate: "",
        valid: true,

        datosUsuario: [],
        datosEmpleado: [],
        datosTipo: ["GERENTE","SUPERVISOR","SECRETARIO"],
        datosAcceso: [],
        idEmpleado: "",
        nombreEmpleadoLabel: "SELECCIONAR EMPLEADO",
        email: "",

        

        searchUsuario: "",
        searchEmpleado: "",

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        usuarioModal: "",
        empleadoModal: "",
        accesoModal: "",
        botonAct: 0,
        nombreRules: [
            (v) => !!v || "NOMBRE DE USUARIO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DE USUARIO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],

        accesosRules: [
            (v) =>
                (v && v.length <= 200) ||
                "LA DESCRIPCION DEBE TENER 200 CARACTERES COMO MAXIMO",
        ],

        tipoRules: [
            (v) =>
                (v && v.length <= 8) ||
                "SALARIO DEBE TENER 8 CARACTERES COMO MAXIMO",
        ],

        headersUsuario: [
            { text: "EMPLEADO", value: "empl" },
            { text: "USUARIO", value: "nom" },
            { text: "ESTADO", value: "act" },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "OPTIONS", value: "actions", sortable: false },
        ],
        headersEmpleado: [
            { text: "NOMBRES", value: "nom" },
            { text: "PATERNO", value: "pat" },
            { text: "MATERNO", value: "mat" },
            { text: "CORREO", value: "emal" },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],
        headersAcceso: [
            { text: "Nro", value: "idacc", align: "start"},
            //{ text: "MODULO", value: "mod" },
            { text: "DESCRIPCION", value: "descrip" },
        ],
    }),

    created: function () {
        this.listarUsuarios();
    },

    methods: {

        activar(item) {
            this.idUsuario = item.idusu;
            this.activarusuario(this.idUsuario);
        },
        async activarusuario(idUsuario) {
            let me = this;
            await axios
                .post("/usuario/onusuario/" + this.idUsuario).then(function (response) {

                    me.listarUsuarios();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idUsuario = item.idusu;
            this.desactivarusuario(this.idUsuario);
        },
        async desactivarusuario(idUsuario) {
            let me = this;
            await axios
                .post("/usuario/offusuario/" + this.idUsuario).then(function (response) {

                    me.listarUsuarios();
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
            this.nombreEmpleadoLabel = item.pat +" "+item.nom
            this.email = item.emal
            this.generarDatosUsuario(item);
            this.closeEmpleado();
        },

        generarDatosUsuario(item) {
            let min = Math.ceil(1000);
            let max = Math.floor(10000);
            this.nombreUsuario = item.nom[0] + item.pat[0] + (Math.floor(Math.random() * (max - min) + min));
            this.password = Math.floor(Math.random() * (max - min) + min);
            console.log(this.nombreUsuario);
            console.log(this.password);
        },

        showAddUsuario() {
            this.botonAct = 0;
            this.usuarioModal = true;
        },
        showEditUsuario(item) {
            this.botonAct = 1;
            this.llenarCamposUsuario(item);
            this.usuarioModal = true;
        },

        showEmpleado(item) {
            //this.botonAct = 1;
            //this.llenarCamposUsuario(item);
            this.listarEmpleados();
            this.empleadoModal = true;
        },
        showAcceso(item) {
            //this.botonAct = 1;
            //this.llenarCamposUsuario(item);
            this.listarAccesos();
            this.accesoModal = true;
        },

        closeUsuario() {
            this.usuarioModal = false;
        },
        closeEmpleado() {
            this.empleadoModal = false;
        },
        closeAcceso() {
            this.accesoModal = false;
        },

        llenarCamposUsuario(item) {
            this.nombreUsuario = item.usu;
            //this.accesos = item.acc;
            this.tipo = item.tip;
            
            this.idUsuario = item.idusu;
        },
        
        actualizarUsuario() {
            if (this.$refs.form.validate()) {
                this.actualizarusuario();
            }
        },
        async actualizarusuario() {
            let me = this;
            await axios
                .post(
                    "/usuario/editarusuario/" +
                    this.idUsuario +
                    "," +
                    this.nombreUsuario +
                    "," +
                    this.accesos +
                    "," +
                    this.tipo
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarUsuarios(me.idUsuario);
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.nombreUsuario = "";
            this.datosUsuario = "",
            this.idEmpleado = "";
            this.nombreEmpleadoLabel = "";
            this.accesos = [];
            this.tipo = "";
        },

        async listarUsuarios(idUsuario) {
            let me = this;
            await axios
                .get("/usuario/listarusuarios/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosUsuario = [];
                    } else {
                        me.datosUsuario = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarEmpleados(idEmpleado) {
            let me = this;
            await axios
                .get("/empleado/listarempleadossinc/")
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
        async listarAccesos() {
            let me = this;
            await axios
                .get("/acceso/listaraccesos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosAcceso = [];
                    } else {
                        me.datosAcceso = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarUsuario() {
            if (this.$refs.form.validate()) {
                this.registrarUsuario();
            }
        },
        async registrarUsuario() {
            let me = this;
            let aux = JSON.stringify(this.accesos);
            
            var jsonArray = JSON.parse(aux);
            var accesosArray = jsonArray.map(function(obj) {
                return obj.idacc;
            });
            // Mostrar el nuevo array
            console.log("Test1: "+this.accesos[0].idacc);
            console.log("Test2: "+accesosArray);
            
            await axios
                .post(
                    "/usuario/addusuario/" +
                    this.idEmpleado +
                    "," +
                    this.nombreUsuario +
                    "," +
                    this.password +
                    "," +
                    this.tipo +
                    "," +
                    this.email +
                    "," +
                    this.nombreEmpleadoLabel, accesosArray

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarUsuarios(me.idUsuario);
                    me.limpiar();
                    me.closeUsuario();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};
</script>