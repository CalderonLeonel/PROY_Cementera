<template>
    <v-card elevation="5" outlined v-if=" checkAccess(11, 'SUPERVISOR' ) || checkAccess(11, 'GERENTE')">
        <div>
            <v-alert dense style="color: #ffffff;" color="blue">
                <h3>GESTIÓN DE ARCHIVOS DE EMPLEADOS</h3>
            </v-alert>
        </div>
        <v-container>
            <v-row>
                <v-col cols="6" md="3">
                    <v-btn color="primary" @click="showGenerarMemorandum()">GENERAR MEMORÁNDUM</v-btn>
                </v-col>
            </v-row>
            <v-row >
                <v-col cols="12" md="12" >
                    <v-text-field v-model="searchDocumento" append-icon="mdi-magnify" label="BUSCAR DOCUMENTO" single-line
                        hide-details></v-text-field>
                    <v-data-table :headers="headerDocumento" :items="datosDocumento" :search="searchDocumento"
                        :custom-filter="customFilter" class="elevation-1">
                        <template #[`item.doc`]="{ item }">
                            <v-btn color="primary" icon
                                :href="`${axios.defaults.baseURL}${'documento/descargar/' + item.doc}`" target="">
                                <v-icon>mdi-file</v-icon> ABRIR
                            </v-btn>
                        </template>
                        <template #[`item.estado`]="{ item }">
                            <v-chip :color="getColor(item.est)" dark>
                                {{ item.est }}
                            </v-chip>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="generarMemorandum" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AÑADIR DOCUMENTO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="nombreEmpleado" label="NOMBRE EMPLEADO"
                                        :rules="nombreEmpleadomRules" @input="nombreEmpleado = nombreEmpleado.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan"
                                        @click="openEmpleadoModal()" style="float: right" title="BUSCAR EMPLEADO">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>        
                          
                                <v-col cols="12" sm="4" md="12"></v-col>

                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped >
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon color="#0A62BF" @click="getMemorandum()" 
                                                style="float: left" title="GENERAR MEMORANDUM" class="mx-2" large>
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
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeGenerarMemorandum()"
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

        <v-dialog v-model="empleadoModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE EMPLEADOS DESPEDIDOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchEmpleado" append-icon="mdi-magnify" label="BUSCAR EMPLEADOS DESPEDIDOS"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersEmpleado" :items="datosEmpleado" :search="searchEmpleado"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarEmpleado(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeEmpleadoModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>       
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="success" outlined>
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
    </v-card>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
export default {
    data() {
        return {

            drawer: false,
            user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },

            mensajeSnackbarError: "REGISTRO FALLIDO",

            generarMemorandum: false,

            empleadoModal: false,
            datosEmpleado: [],
            nombreEmpleado : "",
            fechaVencimiento: "",
            searchEmpleado: "",

            nombreEmpleadomRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DEL EMPLEADO.",
             ],

             headerDocumento: [
                { text: "DOCUMENTO", value: "nombreempleado", sortable: true },
                { text: "ARCHIVO", value: "archivo", sortable: true },
            ],

            searchDocumento: '',
            datosDocumento: [],


            snackbarOK: false,
            snackbarError : false,

            headersEmpleado: [
                { text: "NOMBRE", value: "nom" },
                { text: "CARGO", value: "cargo" },
                { text: "DEPARTAMENTO", value: "dep" },
                { text: "EMAIL", value: "email" },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            }
    },
    created: function () {
        if (this.user != null) {
             this.user = JSON.parse(sessionStorage.getItem('session'));
             this.listarDocumento()
        }
        if (this.user == null) {
            if (this.$route.path != '/login') {
                this.$router.push("/login");
            }
        }
        console.log("UserData: " + JSON.stringify(this.user));
    },
    computed: {
        logueado() {
            if (this.user != null) {
                this.user = JSON.parse(sessionStorage.getItem('session'));
            }
            return this.user;
            }
        },
    methods: {
        showGenerarMemorandum() {
            this.generarMemorandum = true;
            if (this.documentoArchivo != '') {
                this.inputState = false;
            }
            else {
                this.inputState = true;
            }
        },
        closeGenerarMemorandum() {
            this.generarMemorandum = false;
            this.limpiar();
        },

        listarDocumento() {
            this.listarDocumentos();
            limpiar();
        },


        listarEmpleados() {
             this.listarEmpleadosDespedidos();
         },
         async listarEmpleadosDespedidos() {
           let me = this;
           await axios
             .get("documento/listarempleadosdespedidos/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosEmpleado = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosEmpleado = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         openEmpleadoModal(){
            this.listarEmpleados();
            this.empleadoModal = true;
        },

        closeEmpleadoModal(){
            this.empleadoModal = false;
            this.limpiar();
        },

        seleccionarEmpleado(item){
            this.nombreEmpleado = item.nom;
            this.fechaVencimiento = item.fechaven;
            this.empleadoModal = false;
        },

        limpiar() {
            this.$refs.form.reset()

        },

        async listarDocumentos() {
            let me = this;
            await axios
                .get("/documento/listardocumentoscontrato/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDocumento = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDocumento = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        checkAccess(accesoCorrecto, tipoCorrecto) {
            //this.user = JSON.parse(sessionStorage.getItem('session'));
            if (this.user == null) {
                return false;
            }
            else {
                let checkedAccess = false;
                let checkedType = false;
                //Si accesoCorrecto es 0, no se requiere ningun acceso para acceder
                if (accesoCorrecto != 0) {
                this.user['accesos'].forEach(access => {
                    if (access == accesoCorrecto)
                    checkedAccess = true;
                });
                } else checkedAccess = true;

                //Si tipoCorrecto es '0', no se requiere ningun tipo de cuenta para acceder
                if (tipoCorrecto != '0') {
                if (this.user['tipo'] == tipoCorrecto) {
                    checkedType = true;
                }
                } else checkedType = true;
                if (checkedAccess && checkedType) { return true }
                else return false;
            }

        },

        getMemorandum(){
            if (this.$refs.form.validate()) {
                this.exportPDFMemorandum();
                this.closeGenerarMemorandum();
            }
        },

        exportPDFMemorandum(){
            var nombre = this.nombreEmpleado.replace(/(\w)(\w*)/g,
            function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
            var nombreArchivo = nombre.replace(/\s+/g, '_');
            const hoy = new Date();
            const diaActual = hoy.getDate();
            const aniooActual = hoy.getFullYear();
            const opciones = { month: 'long' }; 

            const nombreMes = hoy.toLocaleDateString('es-ES', opciones);

            var fechaV = new Date(this.fechaVencimiento);
            let opcionesFechaV = { year: 'numeric', month: 'long', day: 'numeric' };
            let fechaVencientoFormateada = fechaV.toLocaleDateString('es-ES', opcionesFechaV);

            const doc = new jsPDF();
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text("MEMORÁNDUM DE DESPIDO", 105, 20, null, null, 'center');

            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text("Fecha: "+ diaActual +" de "+ nombreMes + " de "+ aniooActual, 20, 50);

            doc.text("De: Departamento de Recursos Humanos Drymix", 20, 60);

            doc.text("Para: "+  nombre, 20, 70);
           
            doc.text("Asunto: Despido" , 20, 80);

            
            doc.text("Estimado "+ nombre , 20, 100);
            doc.setFontSize(12);
            doc.text("Me dirijo a usted para informarle que, debido al vencimiento natural de su contrato laboral, nos vemos en la necesidad de finalizar su relación de trabajo con Drymix S.R.L a partir del " + fechaVencientoFormateada + ".", 20, 120, {maxWidth: 160, align: 'justify'});

            doc.text("Le deseamos éxito en sus futuros proyectos profesionales y estamos seguros de que encontrará nuevas oportunidades que coincidan con su talento y experiencia.", 20, 140, {maxWidth: 160, align: 'justify'});

            doc.text("Le solicitamos que entregue todos los archivos, documentos y cualquier propiedad de la empresa en su posesión a su supervisor antes de su fecha de salida. Asimismo, se le proporcionará información sobre los beneficios y derechos correspondientes de acuerdo con las leyes laborales vigentes en su jurisdicción.", 20, 160, {maxWidth: 160, align: 'justify'});
       
            doc.text("Agradecemos su comprensión y colaboración en este proceso de transición.", 20, 190, {maxWidth: 160, align: 'justify'});


            doc.text("Atentamente.", 20, 210);
            //doc.text("Nombre del Gerente.", 20, 170);
            doc.text("Departamento de Recursos Humanos.", 20, 230);
            doc.text("Drymix S.R.L", 20, 240);

            
            doc.save("memorandum_despido_"+nombreArchivo+".pdf")
        }
    },
}
</script>