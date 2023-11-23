<template>
        <v-card elevation="5" outlined shaped>

            <div> <!-- Encabezado -->
                <v-alert dense color="#00A1B1" style="color: #ffffff">
                    <h5>SECTORES</h5>
                </v-alert>
            </div>

            <v-dialog v-model="sectorModal" max-width="1080px"> <!-- Modal-->
                
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
                                <v-select v-model="idDepartamento" :items="datosDepartamento" item-text="nom" item-value="iddep" label="Selecciona un departamento" 
                                    prepend-icon="mdi-map" :rules="departamentoRules" required>
                                </v-select>

                            </v-col>
                            <v-col cols="12" md="8"> </v-col>
                                    <v-col cols="6"></v-col>
                                    <v-col cols="2">
                                        <v-btn iconv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                                @click="actualizarSector()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN">
                                                <v-icon dark> mdi-pencil </v-icon>
                                                ACTUALIZAR
                                            </v-btn>
                                            <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                                @click="registrarSector()" style="float: left" title="REGISTRAR ITEM">
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
                                            @click="closeSector()" style="float: right" title="SALIR">
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
                <v-btn color="success" @click="showAddSector()">+ Nuevo Sector</v-btn>
            </v-col>

            <div>
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

                                    <v-card-title>
                                        <v-text-field v-model="searchSector" append-icon="mdi-magnify"
                                            label="BUSCAR SECTORES" single-line hide-details></v-text-field>
                                    </v-card-title>

                                    <v-data-table :headers="headersSector" :items="datosSector" :search="searchSector"
                                        :items-per-page="5" class="elevation-1" id="tableId">
                                        <template #[`item.act`]="{ item }">
                                            <v-chip :color="getColor(item.act)" dark>
                                                {{ item.act }}
                                            </v-chip>
                                        </template>

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                                title="ACTIVAR SECTOR">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                                title="DESACTIVAR SECTOR">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon small class="mr-2" @click="showEditSector(item)"
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
        idSector: "",
        sector: "",
        estado: "",
        createDate: "",
        lastDate: "",
        idDepartamento: "",
        valid: true,

        searchSector: "",
        datosSector: [],
        datosDepartamento: [],

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        sectorModal: "",
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
            { text: "SECTOR", value: "nom", sortable: false },
            { text: "DEPARTAMENTO", value: "dep", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],

    }),

    created: function () {
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        //this.idSector = this.user.idSector;
        this.listarSectores();
    },
    methods: {

        activar(item) {
            this.idSector = item.iddep;
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
            this.idSector = item.iddep;
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
            if(this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.sectorModal = true;
        },
        showEditSector(item) {
            this.botonAct = 1;
            if(this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.llenarCamposSector(item);
            this.sectorModal = true;
        },

        closeSector() {
            this.sectorModal = false;
            this.limpiar();
        },

        llenarCamposSector(item) {
            this.sector = item.nom;
            this.idDepartamento = item.iddep;
            this.idSector = item.iddep;
        },
        
        actualizarSector() {
            this.actualizarsector(
                this.idSector,
                this.sector,
                this.iddep
            );
        },
        
       
        async actualizarsector(
            idSector,
            sector,
            idDepartamento,
        ) {
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
        async listarDepartamentos(idDepartamento) {
            let me = this;
            await axios
                .get("/departamento/listardepartamentos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDepartamento = [];
                    } else {
                        me.datosDepartamento = response.data.resultado;
                        console.log("datosDepartamento: "+JSON.stringify(me.datosDepartamento.iddep))
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarSector() {
            this.registrarSector(
                this.sector,
                this.idDepartamento
            );
        },
        async registrarSector(
            sector,
            idDepartamento
        ) {
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