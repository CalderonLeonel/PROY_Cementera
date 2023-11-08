<template>
    <v-card elevation="5" outlined shaped>

        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>CARGOS</h5>
            </v-alert>
        </div>

        <v-dialog v-model="cargoModal" max-width="1080px"> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Cargo</span>
                    <span v-if="botonAct == 1">Editar Cargo</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Cargo / Editar Cargo -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="nombreCargo" :counter="50" :rules="nombreRules"
                                @input="nombreCargo = nombreCargo.toUpperCase()" label="Nombre del Cargo" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="descripcion" :counter="200" :rules="descripcionRules" label="Descripcion"
                                ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="salario" :counter="10" :rules="salarioRules" label="Salario"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarCargo()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarCargo()" style="float: left" title="REGISTRAR ITEM">
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
                                        @click="closeCargo()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>

                        <v-col cols="12" md="12">
                            <v-toolbar dense shaped color="#002245">
                                <v-toolbar-title style="color:#ffffff">
                                    <h6>OPCIONES</h6>

                                </v-toolbar-title> <!-- Botones -->
<!--
                                <v-btn v-if="botonAct == 1" class="mx-2" fab dark x-small color="#EE680B"
                                    @click=actualizarCargo() style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                    <v-icon dark> mdi-pencil </v-icon>
                                </v-btn>
                                -->
                                <v-btn v-if="botonAct == 0" class="mx-2" fab dark x-small color="#EE680B"
                                    @click="registrarCargo()" style="float: left" title="REGISTRAR CARGO">
                                    <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                </v-btn>
                                <v-btn class="mx-2" fab dark x-small color="#EE680B" @click="limpiar()"
                                    style="float: left" title="LIMPIAR FORMULARIO">
                                    <v-icon dark> mdi-eraser </v-icon>
                                </v-btn>
                            </v-toolbar>
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
            <v-btn color="success" @click="showAddCargo()">+ Nuevo Cargo</v-btn>
        </v-col>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Cargos -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>CARGOS</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="searchCargo" append-icon="mdi-magnify"
                                        label="BUSCAR CARGOS" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersCargo" :items="datosCargo" :search="searchCargo"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.act`]="{ item }">
                                        <v-chip :color="getColor(item.act)" dark>
                                            {{ item.act }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                            title="ACTIVAR CARGO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                            title="DESACTIVAR CARGO">
                                            mdi-cancel
                                        </v-icon>
                                        <v-icon small class="mr-2" @click="showEditCargo(item)"
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
        idCargo: "",
        nombreCargo: "",
        descripcion: "",
        salario: "",
        estado: "",
        createDate: "",
        lastDate: "",
        valid: true,

        searchCargo: "",

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        cargoModal: "",
        botonAct: 0,
        nombreRules: [
            (v) => !!v || "NOMBRE DE CARGO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DE CARGO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],

        descripcionRules: [
            (v) =>
                (v && v.length <= 200) ||
                "LA DESCRIPCION DEBE TENER 200 CARACTERES COMO MAXIMO",
        ],

        salarioRules: [
            (v) =>
                (v && v.length <= 8) ||
                "SALARIO DEBE TENER 8 CARACTERES COMO MAXIMO",
        ],

        //checkbox: false,
        datosCargo: [],

        headersCargo: [
            { text: "CARGO", value: "carg", sortable: false },
            { text: "DESCRIPCION", value: "descrip", sortable: false },
            { text: "SALARIO", value: "salar", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "OPTIONS", value: "actions", sortable: false },
        ],
    }),

    created: function () {
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        //this.idCargo = this.user.idCargo;
        this.listarCargos();
    },

    methods: {

        activar(item) {
            this.idCargo = item.idcarg;
            this.activarcargo(this.idCargo);
        },
        async activarcargo(idCargo) {
            let me = this;
            await axios
                .post("/cargo/oncargo/" + this.idCargo).then(function (response) {

                    me.listarCargos();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idCargo = item.idcarg;
            this.desactivarcargo(this.idCargo);
        },
        async desactivarcargo(idCargo) {
            let me = this;
            await axios
                .post("/cargo/offcargo/" + this.idCargo).then(function (response) {

                    me.listarCargos();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },

        showAddCargo() {
            this.botonAct = 0;
            this.cargoModal = true;
        },
        showEditCargo(item) {
            this.botonAct = 1;
            this.llenarCamposCargo(item);
            this.cargoModal = true;
        },

        closeCargo() {
            this.cargoModal = false;
        },

        llenarCamposCargo(item) {
            this.nombreCargo = item.carg;
            this.descripcion = item.descrip;
            this.salario = item.salar;
            
            this.idCargo = item.idcarg;
        },
        
        actualizarCargo() {
            this.actualizarcargo(
                this.nombreCargo,
                this.descripcion,
                this.salario,
                this.idCargo,
            );
        },
        
       
        async actualizarcargo(
            nombreCargo,
            descripcion,
            salario,
            idCargo,
        ) {
            let me = this;

            await axios
                .post(
                    "/cargo/editcargo/" +
                    this.nombreCargo +
                    "," +
                    this.descripcion +
                    "," +
                    this.salario +
                    "," +
                    this.idCargo

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCargos(me.idCargo);
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.nombreCargo = "";
            this.descripcion = "";
            this.salario = "";
        },
/*
        validate() {
            this.$refs.form.validate();
        },
        */
       /*
        reset() {
            this.$refs.form.reset();
        },
        */
       /*
        resetValidation() {
            this.$refs.form.resetValidation();
        },
*/

/*
        listarb() {
            this.listarCargos(this.idCargo);
        },
*/
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
        registrarCargo() {
            this.registrarCargo(
                this.nombreCargo,
                this.descripcion,
                this.salario
            );
        },
        async registrarCargo(
            nombreCargo,
            descripcion,
            salario
        ) {
            let me = this;

            //let me=this;
            await axios
                .post(
                    "/cargo/addcargo/" +
                    this.nombreCargo +
                    "," +
                    this.descripcion +
                    "," +
                    this.salario

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCargos(me.idCargo);
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};
</script>