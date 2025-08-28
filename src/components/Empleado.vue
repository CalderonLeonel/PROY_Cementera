<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>EMPLEADOS</h5>
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
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error" outlined>
                <strong>{{ mensajeSnackbarError }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarError = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

        <v-dialog v-model="empleadoModal" max-width="1080px" lazy-validation persistent> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Empleado</span>
                    <span v-if="botonAct == 1">Editar Empleado</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Empleado / Editar Empleado -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombres" :counter="50" :rules="nombresRules"
                                        @input="nombres = nombres.toUpperCase()" label="NOMBRE DEL EMPLEADO"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="paterno" :counter="50" :rules="paternoRules"
                                        @input="paterno = paterno.toUpperCase()" label="APELLIDO PATERNO"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="materno" :counter="50" :rules="maternoRules"
                                        @input="materno = materno.toUpperCase()"
                                        label="APELLIDO MATERNO (OPCIONAL)"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="isMale" :items="datosSexo" item-text="text" item-value="isHombre"
                                        label="SELECCIONA UN GÉNERO..." prepend-icon="mdi-gender-male-female"
                                        :rules="sexoRules" required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="estadoCivil" :items="datosEstadoCivil"
                                        label="SELECCIONA UN ESTADO CIVIL..." prepend-icon="mdi-human-male-female"
                                        :rules="estadoCivilRules" required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="email" :counter="50" :rules="emailRules"
                                        @input="email = email.toUpperCase()" label="CORREO ELECTRÓNICO"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-menu v-model="datePicker" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="fechaNacimiento" label="FECHA DE NACIMIENTO"
                                                :rules="fechaNacimientoRules" prepend-icon="mdi-cake-variant-outline"
                                                readonly v-bind="attrs" v-on="on">

                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="fechaNacimiento" locale="es" :picker-date="fechaNacimiento || getMinWorkAge()"
                                            @input="datePicker = false" :max="getMinWorkAge()"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="ci" :counter="9" :rules="ciRules"
                                        @input="ci = ci.toUpperCase()" label="NÚMERO DE CARNET"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field type="number" v-model="telefono" :counter="8"  :rules="telefonoRules"
                                        @input="telefono = telefono.toUpperCase()" label="TELÉFONO"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select v-model="idCargo" :items="datosCargo" item-text="carg" item-value="idcarg"
                                        label="SELECCIONA UN CARGO" prepend-icon="mdi-account-tie-hat"
                                        :rules="cargoRules" required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="idDepartamento" :items="datosDepartamento" item-text="nom"
                                        item-value="iddep" label="SELECCIONA UN DEPARTAMENTO" prepend-icon="mdi-sitemap"
                                        :rules="departamentoRules" required
                                        v-on:change="listarSectoresDeDepartamento(idDepartamento);">
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="idSector" :items="datosSector" item-text="sect"
                                        item-value="idsect" label="SELECCIONA UN SECTOR" prepend-icon="mdi-sitemap"
                                        :rules="sectorRules" required :disabled="idDepartamento == ''">
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
                                                @click="actualizarEmpleado()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                @click="registrarEmpleado()" style="float: left"
                                                title="REGISTRAR EMPLEADO" class="mx-2" large>
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
                            <v-col cols="12" md="4">
                                <v-btn color="success" @click="showAddEmpleado()">Nuevo Empleado</v-btn>
                            </v-col>

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
                                    <v-icon large class="mr-2" color="#0A62BF" @click="goToEmpleadoPerfil(item)"
                                        title="VER EMPLEADO">
                                        mdi-eye
                                    </v-icon>
                                    <v-icon large class="mr-2" color="#0A628F" @click="showEditEmpleado(item)"
                                        title="EDITAR INFORMACION">
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
                </v-row>

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
        idSector: "",
        datePicker: false,
        valid: false,

        isDisabled: true,

        searchEmpleado: "",
        datosEmpleado: [],
        datosSexo: [{ text: "HOMBRE", isHombre: true }, { text: "MUJER", isHombre: false },],
        datosEstadoCivil: ['SOLTERO', 'CASADO', 'CONVIVIENTE', 'VIUDO'],
        datosCargo: [],
        datosDepartamento: [],
        datosSector: [],

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
                (v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        sexoRules: [
            (v) => v !== null && v !== undefined || "ASIGNAR UN SEXO ES REQUERIDO"
        ],
        estadoCivilRules: [
            (v) => !!v || "ASIGNAR UN ESTADO CIVIL ES REQUERIDO",
            (v) => (v != undefined),
        ],
        emailRules: [
            (v) => !!v || "EMAIL DEL EMPLEADO ES REQUERIDO",
            (v) => /.+@.+\..+/.test(v) || 'EMAIL DEBE SER VALIDO',
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DEL EMPLEADO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        fechaNacimientoRules: [
            (v) => !!v || "FECHA DE NACIMIENTO ES REQUERIDO",
            (v) => {
                    const selectedDate = Date.parse(v);
                    

                    if (!isNaN(selectedDate)) {
                        const minDate = new Date();
                        minDate.setFullYear(minDate.getFullYear() - 18);
                        if (selectedDate <= minDate) {
                            return true;
                        } else {
                            return "LA PERSONA DEBE TENER AL MENOS 18 AÑOS.";
                        }
                    } else {
                        return "FECHA DE NACIMINETO DEBE SER VALIDA";
                    }
                },
        ],
        ciRules: [
            (v) => !!v || "NUMERO DE CARNET ES REQUERIDO",
            (v) =>
                (v && v.length <= 9) ||
                "EL NÚMERO DE CARNET DEBE TENER 9 CARACTERES COMO MAXIMO",
        ],
        telefonoRules: [
            (v) => !!v || "NUMERO DE TELEFONO O CELULAR ES REQUERIDO",
            (v) =>
                (v && v.length <= 8) ||
                "EL NÚMERO DE TELEFONO DEBE TENER 8 CARACTERES COMO MAXIMO",
        ],
        cargoRules: [
            (v) => !!v || "ASIGNAR UN CARGO ES REQUERIDO",
        ],
        departamentoRules: [
            (v) => !!v || "ASIGNAR UN DEPARTAMENTO ES REQUERIDO",
            (v) => (v != undefined),
        ],
        sectorRules: [
            (v) => !!v || "ASIGNAR UN SECTOR ES REQUERIDO",
            (v) => (v != undefined),
        ],

        headersEmpleado: [
            { text: "NOMBRES", value: "nom" },
            //{ text: "PATERNO", value: "pat" },
            //{ text: "MATERNO", value: "mat" },
            { text: "SEXO", value: "ism" },
            { text: "ESTADO CIVIL", value: "est" },
            { text: "CONTACTOS", value: "tel", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            //{ text: "FECHA CREACION", value: "credte", sortable: false },
            //{ text: "ULTIMA ACTUALIZACIÓN", value: "upddate", sortable: false },
            { text: "OPCIONES", value: "actions", sortable: false },
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
            this.listarEmpleados();
        }
        if (this.user == null) {
            if (this.$route.path != '/login') {
                this.$router.push("/login");
            }
        }
        console.log("UserData: " + JSON.stringify(this.user));
    },

    methods: {

        getMinWorkAge(){
            const today = new Date();

            const minBirthdate = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
            );

            const minDate = minBirthdate.toISOString().split("T")[0]
            return minDate;
        },

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
            if (this.datosCargo.length == 0) this.listarCargosActivos();
            if (this.datosDepartamento.length == 0) this.listarDepartamentosActivos();
            this.listarSectoresDeDepartamento(this.idDepartamento);
            this.empleadoModal = true;
        },
        showEditEmpleado(item) {
            this.botonAct = 1;
            if (this.datosCargo.length == 0) this.listarCargosActivos();
            if (this.datosDepartamento.length == 0) this.listarDepartamentosActivos();
            this.llenarCamposEmpleado(item);
            this.listarSectoresDeDepartamento(this.idDepartamento);
            this.empleadoModal = true;
        },

        closeEmpleado() {
            this.empleadoModal = false;
            this.datosSector == [];
        },

        llenarCamposEmpleado(item) {
            this.nombres = item.nom;
            this.paterno = item.pat;
            if (item.mat == null) { this.materno = ''; } else { this.materno = item.mat; };
            this.isMale = item.ism;
            this.estadoCivil = item.est
            this.email = item.emal;
            this.fechaNacimiento = new Date(item.nacdte).toISOString().split('T')[0];
            this.ci = item.ci;
            this.telefono = item.tel;
            this.idCargo = item.idcarg;
            this.idDepartamento = item.iddep;
            this.idSector = item.idsect;
            this.idEmpleado = item.idempl;
        },

        actualizarEmpleado() {
            if (this.$refs.form.validate()) {
                this.actualizarempleado();
            }
        },
        async actualizarempleado() {
            let me = this;
            log("console:"+this.idEmpleado);
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
                    p13: this.idSector,
                }
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
            this.idSector = ""; this.datosSector.idsect = "";
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
        async listarCargosActivos(idCargo) {
            let me = this;
            await axios
                .get("/cargo/listarcargosactivos/")
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
        async listarSectoresDeDepartamento(idDepartamento) {
            let me = this;
            await axios
                .get("/sector/listarsectoresdedepartamento/" + idDepartamento)
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
                    p13: this.idSector
                }
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

        registrarEmpleado() {
            if (this.$refs.form.validate()) {
                if (this.materno == '') {
                    this.registrarEmpleadosSinMaterno();
                }
                else {
                    this.registrarEmpleados();
                }
            }

        },
        async registrarEmpleados() {
            let me = this;
            await axios
                .post(
                    "/empleado/addempleado", {
                    p1: this.nombres,
                    p2: this.paterno,
                    p3: this.materno,
                    p4: this.isMale,
                    p5: this.estadoCivil,
                    p6: this.email,
                    p7: this.fechaNacimiento,
                    p8: this.ci,
                    p9: this.telefono,
                    p10: this.idCargo,
                    p11: this.idDepartamento,
                    p12: this.idSector
                }
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
        async registrarEmpleadosSinMaterno() {
            let me = this;
            await axios
                .post(
                    "/empleado/addempleadosinmaterno", {
                    p1: this.nombres,
                    p2: this.paterno,
                    p3: this.isMale,
                    p4: this.estadoCivil,
                    p5: this.email,
                    p6: this.fechaNacimiento,
                    p7: this.ci,
                    p8: this.telefono,
                    p9: this.idCargo,
                    p10: this.idDepartamento,
                    p11: this.idSector
                }
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