<template>
    <v-card elevation="5" outlined shaped>

        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>DEPARTAMENTOS</h5>
            </v-alert>
        </div>

        <v-dialog v-model="departamentoModal" max-width="1080px"> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Departamento</span>
                    <span v-if="botonAct == 1">Editar Departamento</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nueva Departamento / Editar Departamento -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="departamento" :counter="50" :rules="departamentoRules"
                                @input="departamento = departamento.toUpperCase()" label="Nombre del Departamento" required>
                            </v-text-field>
                            <v-select v-model="idUnidad" :items="datosUnidad" item-text="unid" item-value="idunid" label="Selecciona una unidad" 
                                 prepend-icon="mdi-map" required>
                            </v-select>
                            <v-select v-model="idArea" :items="datosArea" item-text="nom" item-value="idarea" label="Selecciona una área"
                                 prepend-icon="mdi-map" required>
                            </v-select>
<!--
                            <v-select v-model="a" :items="unidadDatos" menu-props="auto" label="Select" hide-details
                            prepend-icon="mdi-map" single-line
                            ></v-select> -->

                        </v-col>
                        <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarDepartamento()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarDepartamento()" style="float: left" title="REGISTRAR ITEM">
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
                                        @click="closeDepartamento()" style="float: right" title="SALIR">
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
            <v-btn color="success" @click="showAddDepartamento()">+ Nueva Departamento</v-btn>
        </v-col>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Departamentos -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>DEPARTAMENTOS</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="searchDepartamento" append-icon="mdi-magnify"
                                        label="BUSCAR DEPARTAMENTOS" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersDepartamento" :items="datosDepartamento" :search="searchDepartamento"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.act`]="{ item }">
                                        <v-chip :color="getColor(item.act)" dark>
                                            {{ item.act }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                            title="ACTIVAR DEPARTAMENTO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                            title="DESACTIVAR DEPARTAMENTO">
                                            mdi-cancel
                                        </v-icon>
                                        <v-icon small class="mr-2" @click="showEditDepartamento(item)"
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
        idDepartamento: "",
        departamento: "",
        estado: "",
        createDate: "",
        lastDate: "",
        idArea: "",
        idUnidad: "",
        valid: true,

        searchDepartamento: "",
        datosDepartamento: [],
        datosUnidad: [],
        datosArea: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        departamentoModal: "",
        botonAct: 0,
        departamentoRules: [
            (v) => !!v || "NOMBRE DE DEPARTAMENTO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL NOMBRE DE LA DEPARTAMENTO DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],

        headersDepartamento: [
            { text: "DEPARTAMENTO", value: "nom", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "OPTIONS", value: "actions", sortable: false },
        ],

    }),

    created: function () {
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        //this.idDepartamento = this.user.idDepartamento;
        this.listarDepartamentos();
    },

    methods: {

        activar(item) {
            this.idDepartamento = item.iddep;
            this.activardepartamento(this.idDepartamento);
        },
        async activardepartamento(idDepartamento) {
            let me = this;
            await axios
                .post("/departamento/ondepartamento/" + this.idDepartamento).then(function (response) {

                    me.listarDepartamentos();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idDepartamento = item.iddep;
            this.desactivardepartamento(this.idDepartamento);
        },
        async desactivardepartamento(idDepartamento) {
            let me = this;
            await axios
                .post("/departamento/offdepartamento/" + this.idDepartamento).then(function (response) {

                    me.listarDepartamentos();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },

        showAddDepartamento() {
            this.botonAct = 0;
            if(this.datosUnidad.length == 0) this.listarUnidades();
            if(this.datosArea.length == 0) this.listarAreas();
            this.departamentoModal = true;
        },
        showEditDepartamento(item) {
            this.botonAct = 1;
            if(this.datosUnidad.length == 0) this.listarUnidades();
            if(this.datosArea.length == 0) this.listarAreas();
            this.llenarCamposDepartamento(item);
            this.departamentoModal = true;
        },

        closeDepartamento() {
            this.departamentoModal = false;
            this.limpiar();
        },

        llenarCamposDepartamento(item) {
            this.departamento = item.nom;
            console.log("AFTER UNID: "+this.idUnidad);
            this.idUnidad = item.idunid;
            console.log("BEFORE UNID: "+this.idUnidad);
            console.log("BEFORE AR: "+this.idArea);
            this.idArea = item.idarea;
            console.log("BEFORE AR: "+this.idArea);
            this.idDepartamento = item.iddep;
        },
        
        actualizarDepartamento() {
            this.actualizardepartamento(
                this.idDepartamento,
                this.departamento
            );
        },
        
       
        async actualizardepartamento(
            idDepartamento,
            departamento
        ) {
            let me = this;

            await axios
                .post(
                    "/departamento/editardepartamento/" +
                    this.idDepartamento +
                    "," +
                    this.departamento

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarDepartamentos(me.idDepartamento);
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        limpiar() {
            this.departamento = "";
            this.idUnidad = ""; this.datosUnidad = [];
            this.idArea = ""; this.datosArea = [];
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
        async listarUnidades(idUnidad) {
            let me = this;
            await axios
                .get("/unidad/listarunidades/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosUnidad = [];
                    } else {
                        me.datosUnidad = response.data.resultado; //console.log(me.datosUnidad);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarAreas(idArea) {
            let me = this;
            let auxArea = [{ items: "unid", value: "idunid"}];
            await axios
                .get("/area/listarareas/")
                .then(function (response) {
                    if (response.data.resultado == null) {

                        me.datosArea = [];
                    } else {
                        me.datosArea = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarDepartamento() {
            this.registrarDepartamento(
                this.departamento,
                this.idUnidad,
                this.idArea
            );
        },
        async registrarDepartamento(
            departamento,
            idUnidad,
            idArea
        ) {
            let me = this;

            //let me=this;
            await axios
                .post(
                    "/departamento/adddepartamento/" +
                    this.departamento +
                    "," +
                    this.idUnidad +
                    "," +
                    this.idArea

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarDepartamentos(me.idDepartamento);
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};
</script>