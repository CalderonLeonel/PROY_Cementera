<template>
    <div> <!--one-->
    
    <v-card elevation="5" outlined shaped>

        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>PERFIL DE EMPLEADO</h5>
            </v-alert>
            <v-col cols="12" md="12">
                <h5>Nombres: {{ this.$route.params.nom +" "+this.$route.params.pat+" "+this.$route.params.mat }}</h5>
            </v-col>
            <v-col cols="12" md="12">
                <h5>Correo: {{ this.$route.params.emal}}</h5>
            </v-col>
            <v-col cols="12" md="12">
                <h5>Telefono: {{ this.$route.params.tel }}</h5>
            </v-col>
            <v-col cols="12" md="12">
                <h5>Carnet: {{ this.$route.params.ci }}</h5>
            </v-col>
        </div>
    </v-card>
    <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>CONTRATOS</h5>
            </v-alert>
        </div>

        <v-dialog v-model="contratoModal" persistent :overlay="false" max-width="1080px"> <!-- Modal-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Contrato</span>
                    <span v-if="botonAct == 1">Editar Contrato</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Contrato / Editar Contrato -->
                <v-container>
                    <v-row>
                        <!--
                        <v-col cols="12" md="10">
                            <v-file-input v-model="documentoArchivo"
                                accept=".docx, .xlsx, .pptx, .pdf, .xml"
                                label="Contrato archivo"></v-file-input>
                        </v-col>
                        -->
                        <v-col cols="12" md="12">
                                <v-date-picker v-model="fechaInicio" @input="fechaInicio = fechaInicio" 
                                    label="Fecha de Inicio"></v-date-picker>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-date-picker v-model="fechaFinal" @input="fechaFinal = fechaFinal" 
                                    label="Fecha de Finalizacion"></v-date-picker>
                            </v-col>
                        <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarContrato()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarContrato()" style="float: left" title="REGISTRAR ITEM">
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
                                        @click="closeContrato()" style="float: right" title="SALIR">
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
            <v-btn color="success" @click="showAddContrato()">+ Nuevo Contrato</v-btn>
        </v-col>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Contratos -->
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>CONTRATOS</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="searchContrato" append-icon="mdi-magnify"
                                        label="BUSCAR CONTRATOS" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersContrato" :items="datosContrato" :search="searchContrato"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.act`]="{ item }">
                                        <v-chip :color="getColor(item.act)" dark>
                                            {{ item.act }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                            title="ACTIVAR CONTRATO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                            title="DESACTIVAR CONTRATO">
                                            mdi-cancel
                                        </v-icon>
                                        <v-icon small class="mr-2" @click="showEditContrato(item)"
                                            title="EDITAR INFORMACION">
                                            mdi-pencil
                                        </v-icon>
                                      

                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
    </div>
</template>
<script>
import axios from "axios";
import ContratoVue from './Contrato.vue'; // one

export default {
    data: () => ({
        idEmpleado: "",
        valid: true,
        datosDepartamento: [],

        idContrato: "",
        documentoArchivo: '',
        fechaInicio: "2000-10-12",
        fechaFinal: "2000-10-12",

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        empleadoModal: "",
        searchContrato: "",

        contratoModal: "",
        botonAct: 0,
        datosContrato: [],

        headersContrato: [
            { text: "CONTRATO", value: "nom", sortable: false },
            { text: "ESTADO", value: "act", sortable: false },
            { text: "FECHA CREACION", value: "credte", sortable: false },
            { text: "ULTIMA ACTUALIZACIÓN", value: "upddte", sortable: false },
            { text: "OPTIONS", value: "actions", sortable: false },
        ],
    }),

    created: function () {
        this.idEmpleado = this.$route.params.idempl;
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        //this.idEmpleado = this.user.idEmpleado;
        this.listarContratos();
    },
    components: { //one/
        ContratoVue
    },

    methods: {
        
        showAddContrato() {
            this.contratoModal = true;
            /*
            
            if (this.documentoArchivo != '') {
                this.inputState = false;
            }
            else {
                this.inputState = true;
            }
            */
        },
        showEditContrato(item) {
            this.botonAct = 1;
            this.llenarCamposContrato(item);
            this.contratoModal = true;
        },
        /*
        showAddEmpleado() {
            this.botonAct = 0;
            if(this.datosCargo.length == 0) this.listarCargos();
            if(this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.empleadoModal = true;
        },
        showEditEmpleado(item) {
            this.botonAct = 1;
            if(this.datosCargo.length == 0) this.listarCargos();
            if(this.datosDepartamento.length == 0) this.listarDepartamentos();
            this.llenarCamposEmpleado(item);
            this.empleadoModal = true;
        },

        closeEmpleado() {
            this.empleadoModal = false;
            this.limpiar();
        },
        */


        async listarContratos(idContrato) {
            let me = this;
            await axios
                .get("/contrato/listarcontratos/"+this.$route.params.idempl)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosContrato = [];
                    } else {
                        me.datosContrato = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarContrato() {
            alert(this.documentoArchivo);
            //this.almacenarArchivo(this.documentoArchivo);
            //this.registrarContrato(this.documentoArchivo.name);
            //this.contratoModal = true;
        },
        async almacenarArchivo(documentoArchivo) {
            const formData = new FormData();
            formData.append('file', documentoArchivo);
            let me = this;
            await axios
                .post(
                    "/uploadFile/", formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    //me.listarDocumentos();
                    //me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
            },
        
        async registrarContrato(documentoArchivo) {
            //const ext = documentoArchivo.split('.');
            //const date = new Date();
            //const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            //const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            let me = this;

            //let me=this;
            await axios
                .post(
                    "/contrato/addcontrato/" +
                    //ext[0] +
                    //"," +
                    "documentoArchivo" +
                    "," +
                    this.fechaInicio +
                    "," +
                    this.fechaFinal +
                    "," +
                    this.idEmpleado

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarContratos(me.idContrato);
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        closeAddContrato(){
            this.contratoModal = false;
        },
        limpiar() {
            //this.$refs.form.reset()
            //this.documentoArchivo = '';
        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
    }
};
</script>