<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>EMPLEADOS</h5>
            </v-alert>
        </div>
        <v-dialog v-model="empleadoModal" max-width="1080px" lazy-validation> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Empleado</span>
                    <span v-if="botonAct == 1">Editar Empleado</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid"> <!-- Nuevo Empleado / Editar Empleado -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombres" :counter="50" :rules="nombresRules"
                                        @input="nombres = nombres.toUpperCase()" label="Nombre del Empleado"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="paterno" :counter="50" :rules="paternoRules"
                                        @input="paterno = paterno.toUpperCase()" label="Apellido Paterno"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="materno" :counter="50" :rules="maternoRules"
                                        @input="materno = materno.toUpperCase()"
                                        label="Apellido Materno (Opcional)"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="isMale" :items="datosSexo" item-text="text" item-value="isHombre"
                                        label="Selecciona un Género..." prepend-icon="mdi-gender-male-female"
                                        :rules="sexoRules" required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="estadoCivil" :items="datosEstadoCivil"
                                        label="Selecciona un Estado Civil..." prepend-icon="mdi-human-male-female"
                                        :rules="estadoCivilRules" required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="email" :counter="50" :rules="emailRules"
                                        @input="email = email.toUpperCase()" label="Correo Electrónico"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-menu v-model="datePicker" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="fechaNacimiento" label="Fecha de Nacimiento"
                                                prepend-icon="mdi-cake-variant-outline" readonly v-bind="attrs" v-on="on">

                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="fechaNacimiento"
                                            @input="datePicker = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="ci" :counter="50" :rules="ciRules" @input="ci = ci.toUpperCase()"
                                        label="Número de Carnet"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field type="number" v-model="telefono" :rules="telefonoRules"
                                        @input="telefono = telefono.toUpperCase()" label="Teléfono"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select v-model="idCargo" :items="datosCargo" item-text="carg" item-value="idcarg"
                                        label="Selecciona una Cargo" prepend-icon="mdi-account-tie-hat" :rules="cargoRules"
                                        required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select v-model="idDepartamento" :items="datosDepartamento" item-text="nom"
                                        item-value="iddep" label="Selecciona un Departamento" prepend-icon="mdi-sitemap"
                                        :rules="departamentoRules" required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarEmpleado()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarEmpleado()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiar()" style="float: left"
                                        title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeEmpleado()"
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


        <div>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Empleados -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showAddEmpleado()">+ Nuevo Empleado</v-btn>
                        </v-col>
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
                                    :items-per-page="5" class="elevation-1" id="tableId">
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
                                        <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                            title="ACTIVAR EMPLEADO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                            title="DESACTIVAR EMPLEADO">
                                            mdi-cancel
                                        </v-icon>
                                        <v-icon small class="mr-2" @click="showEditEmpleado(item)"
                                            title="EDITAR INFORMACION">
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon small class="mr-2" color="#001781" @click="goToEmpleadoPerfil(item)"
                                            title="VER EMPLEADO">
                                            mdi-eye
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
        idCargo: "",
        idDepartamento: "",
        datePicker: false,
        valid: false,

        searchEmpleado: "",
        datosEmpleado: [],
        datosSexo: [{ text: "HOMBRE", isHombre: true }, { text: "MUJER", isHombre: false },],
        datosEstadoCivil: ['SOLTERO', 'CASADO', 'CONVIVIENTE', 'VIUDO'],
        datosCargo: [],
        datosDepartamento: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",

        timeout: 2000,

        empleadoModal: "",
        botonAct: 0,
        nombresRules: [
            (v) => !!v || "NOMBRE DEL EMPLEADO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        paternoRules: [
            (v) => !!v || "APELLIDO DEL EMPLEADO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        maternoRules: [
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        sexoRules: [
            (v) => !!v || "ASIGNAR UN SEXO ES REQUERIDO",
        ],
        estadoCivilRules: [
            (v) => !!v || "ASIGNAR UN ESTADO CIVIL ES REQUERIDO",
        ],
        emailRules: [
            (v) => !!v || "EMAIL DEL EMPLEADO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        fechaRules: [
            (v) => !!v || "FECHA DE NACIMIENTO ES REQUERIDO",
        ],
        ciRules: [
            (v) => !!v || "NUMERO DE CARNET ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        telefonoRules: [
            (v) => !!v || "NUMERO DE TELEFONO O CELULAR ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        cargoRules: [
            (v) => !!v || "ASIGNAR UN CARGO ES REQUERIDO",
        ],
        departamentoRules: [
            (v) => !!v || "ASIGNAR UN DEPARTAMENTO ES REQUERIDO",
        ],

        headersEmpleado: [
            { text: "NOMBRES", value: "nom" },
            //{ text: "PATERNO", value: "pat" },
            //{ text: "MATERNO", value: "mat" },
            { text: "SEXO", value: "ism" },
            { text: "ESTADO CIVIL", value: "est" },
            { text: "CONTACTOS", value: "tel", sortable: false },
            { text: "ESTADO", value: "act" },
            //{ text: "FECHA CREACION", value: "credte", sortable: false },
            //{ text: "ULTIMA ACTUALIZACIÓN", value: "upddate", sortable: false },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],

    }),

    created: function () {
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        //this.idEmpleado = this.user.idEmpleado;
        this.listarEmpleados();
    },

    methods: {
        goToEmpleadoPerfil(item) {
            this.$router.push({ name: 'Perfil', params: item })
        },

        activar(item) {
            this.idEmpleado = item.idempl;
            this.activarempleado(this.idEmpleado);
        },
        async activarempleado(idEmpleado) {
            let me = this;
            await axios
                .post("/empleado/onempleado/" + this.idEmpleado).then(function (response) {

                    me.listarEmpleados();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idEmpleado = item.idempl;
            this.desactivarempleado(this.idEmpleado);
        },
        async desactivarempleado(idEmpleado) {
            let me = this;
            await axios
                .post("/empleado/offempleado/" + this.idEmpleado).then(function (response) {

                    me.listarEmpleados();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },

        showAddEmpleado() {
            this.botonAct = 0;
            if (this.datosCargo.length == 0) this.listarCargos();
            if (this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.empleadoModal = true;
        },
        showEditEmpleado(item) {
            this.botonAct = 1;
            if (this.datosCargo.length == 0) this.listarCargos();
            if (this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.llenarCamposEmpleado(item);
            this.empleadoModal = true;
        },

        closeEmpleado() {
            this.empleadoModal = false;
            this.limpiar();
        },

        llenarCamposEmpleado(item) {
            this.nombres = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.isMale = item.ism;
            this.estadoCivil = item.est
            this.email = item.emal;
            this.fechaNacimiento = new Date(item.nacdte).toISOString().split('T')[0];
            this.ci = item.ci;
            this.telefono = item.tel;
            this.idCargo = item.idcarg;
            this.idDepartamento = item.iddep;
            this.idEmpleado = item.idempl;
        },

        actualizarEmpleado() {
            this.actualizarempleado(
                this.idEmpleado,
                this.nombres,
                this.idcarg,
                this.iddep
            );
        },


        async actualizarempleado() {
            let me = this;

            await axios
                .post(
                    "/empleado/editarempleado", {
                    p1: this.idEmpleado,
                    p2: this.nombres,
                    p3: this.paterno,
                    p4: this.materno,
                    p5: this.isMale,
                    p6: this.estadoCivil,
                    p7: this.email,
                    p8: this.fechaNacimiento,
                    p9: this.ci,
                    p10: this.telefono,
                    p11: this.idCargo,
                    p12: this.idDepartamento,
                }
                    /*
                    "/empleado/editarempleado/" +
                    this.idEmpleado +
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
                    this.idCargo +
                    "," +
                    this.idDepartamento
                    */

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarEmpleados(me.idEmpleado);
                    me.limpiar();
                    me.closeEmpleado();

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
            this.idCargo = ""; this.datosCargo.idcarg = "";
            this.idDepartamento = ""; this.datosDepartamento.iddep = "";
        },

        async listarEmpleados(idEmpleado) {
            let me = this;
            await axios
                .get("/empleado/listarempleados/")
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
        async listarCargos(idCargo) {
            let me = this;
            await axios
                .get("/cargo/listarcargos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCargo = [];
                    } else {
                        me.datosCargo = response.data.resultado;
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
        registrarEmpleado() {
            this.snackbarError = true;
        },
        async registrarEmpleados() {
            let me = this;
            await axios
                .post(
                    "/empleado/addempleado/" +
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
                    this.idCargo +
                    "," +
                    this.idDepartamento

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarEmpleados(me.idEmpleado);
                    me.limpiar();
                    me.closeEmpleado();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },
    },
};
</script>