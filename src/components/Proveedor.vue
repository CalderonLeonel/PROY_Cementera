<template>
   <v-card elevation="5" outlined >
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
        <v-alert v-if="existencias==false"          
                type="error"
                color="red darken-2"
                icon="mdi-alert"
                dense
                prominent
                >
                <div class="text-h6">
                    SE REQUIERE LA COMPRA DE EXISTENCIAS EN EL INVENTARIO
                </div>
                POR FAVOR, COTICE UNA ADQUISICION PARA TENER EXISTENCIAS DE <strong>{{this.itemsCriticos}}</strong> NECESARIAS PARA EL FUNCIONAMIENTO DE LA FABRICA 
        </v-alert>
        <v-alert    v-if="existencias==true"       
                type="success"
                color="green darken-2"
                dismissible
                dense
                prominent
                >
                <div class="text-h5">
                    SE TIENEN LAS EXISTENCIAS NECESARIAS EN EL INVENTARIO
                </div>
               
            </v-alert>
        <div>
            <v-alert dense style="color: #ffffff;" color="purple">
                <h3>PROVEEDORES</h3>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarProveedor()">NUEVO PROVEEDOR</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>PROVEEDORES</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchProveedor" append-icon="mdi-magnify" label="BUSCAR PROVEEDOR"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerProveedor" :items="datosProveedor" :search="searchProveedor"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.cto2pro`]="{ item }">
                                    {{ item.cto2pro=="null"? "-" : item.cto2pro}}
                                </template>

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="getColor(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>

                                <template #[`item.arch`]="{ item }">
                                    <v-text v-if="item.arch == null || item.arch == 'null'">
                                        NO TIENE UN ARCHIVO
                                    </v-text>
                                    <v-btn v-else-if="item.arch !=null" color="primary" icon
                                        :href="`${axios.defaults.baseURL}${'documento/descargar/' + item.arch}`" target="">
                                        <v-icon>mdi-file</v-icon> ABRIR
                                    </v-btn>
                                   
                                </template>

                              

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposProveedor(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.est == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR PROVEEDOR">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacion(item)"
                                        title="DESACTIVAR PROVEEDOR">
                                        mdi-close-circle
                                    </v-icon>             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>

                </v-container>
            </v-form>

        </div>
        <v-dialog v-model="agregarProveedorModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>GESTIÓN DE PROVEEDOR</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="nombreProveedor" label="NOMBRE PROVEEDOR" :counter="60"
                                        :rules="nombreRules" @input="nombreProveedor = nombreProveedor"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="contactoProveedorPrincipal" type="number" label="CONTACTO" :counter="10"
                                        :rules="phone1Rules" @input="contactoProveedorPrincipal = contactoProveedorPrincipal"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="contactoProveedorecundario" type="number" label="CONTACTO SECUNDARIO (OPCIONAL)" :counter="10"
                                        :rules="phone2Rules" @input="contactoProveedorecundario = contactoProveedorecundario"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="correoProveedor" type="email" label="CORREO" :counter="100"
                                        :rules="emailRules" @input="correoProveedor = correoProveedor"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="DOCUMENTO DE PROVEEDOR (SI SE REQUIERE)" 
                                    ></v-file-input>
                                     </v-col>   
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonAct == 1" color="#0A62BF" @click="editarProv()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55" @click="registrarProv()"
                                                style="float: left" title="REGISTRAR PROVEEDOR" class="mx-2" large>
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
                              
                                <v-col cols="12" sm="4" md="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarProveedor()" style="float: right" title="SALIR">
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

        <v-dialog v-model="confirmacionAnulacionProveedor" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                            <v-row>
                                <v-col cols="3"></v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#BF120A"
                                        @click="anular()" style="float: right" title="ANULAR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacion()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3"></v-col>
                            </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
    

</template>
<script>
import axios from "axios";
export default {
    data() {
        return {

            drawer: false,
            user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },

            mensajeSnackbarError: "REGISTRO FALLIDO",
            mensajeSnackbar: '',
            

            existencias: true,
            itemsCriticos: '',
            datosExistencia:[],

            documentoArchivo: '',

            //#region Proveedor
            idProveedor: "",
            nombreProveedor: "",
            contactoProveedorPrincipal: "",
            contactoProveedorecundario: "",
            correoProveedor: "",
            estado:"ACTIVO",
            //fechaDeModificacion: "",
            valid: true,
            nombreRules: [
              (v) => !!v || "SE REQUIERE EL NOMBRE DEL PROVEEDOR.",
              (v) =>
              (v && v.length <= 60) ||
                "EL NOMBRE DEL PROVEEDOR NO DEBE SOBREPASAR LOS 60 CARACTERES.",
            ],
            phone1Rules: [
            (v) => !!v || "SE REQUIERE UN NÚMERO TELEFÓNICO O CELULAR.",
            (v) => (v && v.length >= 7) || "EL TELÉFONO PRINCIPAL DEBE TENER AL MENOS 7 CARACTERES.",
            (v) => (v && v.length <= 10) || "EL TELÉFONO PRINCIPAL DEBE TENER HASTA 10 CARACTERES.",
            ],
            phone2Rules: [
            (v) => (!v || (v.length >= 7 && v.length <= 10)) ||
                "EL TELÉFONO SECUNDARIO DEBE TENER ENTRE 7 Y 10 CARACTERES.",
            ],
            emailRules: [
              (v) => !!v || "SE NECESITA EL CORREO ELECTRONICO DEL PROVEEDOR.",
              (v) => /.+@.+\..+/.test(v) || "DEBE SER UN CORREO ELECTRONICO VALIDO.",
             ],
            datosProveedor: [],
            headerProveedor: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE PROVEEDOR", value: "nomprv", sortable: true },
                { text: "CONTACTO PRINCIPAL DE PROVEEDOR", value: "cto1pro", sortable: true },
                { text: "CONTACTO SECUNDARIO DE PROVEEDOR", value: "cto2pro", sortable: true },
                { text: "CORREO DE PROVEEDOR", value: "croprov", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "ARCHIVO", value: "arch", sortable: false },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            searchProveedor: "",
            agregarProveedorModal: false,
            confirmacionAnulacionProveedor: false,
            botonAct: 0,



            snackbarOK: false,
            snackbarError : false,
            //#endregion
        }
    },
    created: function (){
      this.listarProveedor();
      this.getListaExistencias().then(() => {
        this.getAlertas();
        });
        if (this.user != null) {
            this.user = JSON.parse(sessionStorage.getItem('session'));
        }
        if (this.user == null) {
        if (this.$route.path != '/login') {
            this.$router.push("/login");
        }
        }
        console.log("UserData: " + JSON.stringify(this.user));
        },
    methods: {

        getAlertas(){
            var items = [];
            var stock = [];
            var limite = [];
            if(this.datosExistencia==[]){
                this.existencias=false;
            }
            else{
                console.log(JSON.parse(JSON.stringify(this.datosExistencia)));
                console.log('');
                let datosComoObjeto = JSON.parse(JSON.stringify(this.datosExistencia))

                for (let propiedad in datosComoObjeto) {
                    console.log(`: ${propiedad}`);
                    for (const key in datosComoObjeto[propiedad]) {
                        console.log(`Propiedad: ${key}`);
                        if (key == 'nombreitem') {
                            items.push(datosComoObjeto[propiedad][key])
                        }
                        else if (key == 'limitecritico') {
                            limite.push(datosComoObjeto[propiedad][key])
                        } 
                        else if (key == 'cantidad') {
                            stock.push(datosComoObjeto[propiedad][key])
                        } 
                    }
                }
                for (let i = 0; i < items.length; i++) {
                    if ( Number(limite[i]) >= Number(stock[i]) ) {
                        this.existencias=false;
                        this.itemsCriticos += items[i]+' ';
                    }
                }
            }
        },

        async getListaExistencias(){
            let me = this;
            await axios
                .get("/inventario/listarexistencias/")
                .then(function (response) {
                if (response.data.resultado == null) {
                    me.datosExistencia = [];
                    console.log(response.data);
                } else {
                    console.log(response.data);
                    me.datosExistencia = response.data.resultado;
                }
                })
                .catch(function (error) {
                console.log(error);
                });
        },

        getColor(est) {
            if (est == "ACTIVO") return 'green'
            else if (est == "INACTIVO") return 'red'

        },
        //#region Listar
        listarProveedor() {
            this.listarProveedores();
        },
        async listarProveedores() {
          let me = this;
          await axios
            .get("/proveedor/listarproveedoresactivos/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosProveedor = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosProveedor = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        activar(item) {
            this.idProveedor = item.idProveedor;
            this.activarproveedor(this.idProveedor);
        },
        async activarproveedor(idProveedor) {
            let me = this;
            /*await axios
                .post("/proveedor/activar/" + this.idProveedor).then(function (response) {

                    me.listarProveedor();
                })
                .catch(function (error) {
                    console.log(error);
                });*/

        },

        registrarProv() {
            if (this.$refs.form.validate()) {
                if(this.contactoProveedorecundario == '' || this.contactoProveedorecundario == null){
                    this.contactoProveedorecundario=this.contactoProveedorPrincipal;
                }
                if (this.documentoArchivo == null || this.documentoArchivo == '') {
                    this.registrarProveedor(this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado);

                }
                else {
                    this.registrarProveedorArchivo(this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado, this.documentoArchivo.name);  
                    this.almacenarArchivo(this.documentoArchivo)
                    this.guardarDocumento(this.documentoArchivo.name,this.nombreProveedor,"pro"+this.idProveedor,"ACTIVO");
                }
                
            }
        },
        async registrarProveedor(
            nombreProveedor,
            contactoProveedorPrincipal,
            contactoProveedorecundario,
            correoProveedor,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/proveedor/insertar/" +
                    this.nombreProveedor +
                    "," +
                    this.contactoProveedorPrincipal +
                    "," +
                    this.contactoProveedorecundario +
                    "," +
                    this.correoProveedor +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarProveedores();
                    me.closeModalAgregarProveedor();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        async registrarProveedorArchivo(
            nombreProveedor,
            contactoProveedorPrincipal,
            contactoProveedorecundario,
            correoProveedor,
            estado,
            archivo
        ) {
            const ext = this.documentoArchivo.name.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear();
            const nombreArchivo =  ext[0]+'_'+fechaHoraActual+'.'+ext[1];
            let me = this;
            await axios
                .post(
                    "/proveedor/insertarConArchivo/" +
                    this.nombreProveedor +
                    "," +
                    this.contactoProveedorPrincipal +
                    "," +
                    this.contactoProveedorecundario +
                    "," +
                    this.correoProveedor +
                    "," +
                    this.estado +
                    "," +
                    nombreArchivo
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarProveedores();
                    me.closeModalAgregarProveedor();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarProv() {
            if (this.$refs.form.validate()) {
                if (this.documentoArchivo == '' || this.documentoArchivo == null) {
                    this.editarProveedor(this.idProveedor,this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado);
                    this.botonAct = 0;
                }
                else {
                    this.editarProveedorArchivo(this.idProveedor,this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado, this.documentoArchivo.name);                       
                    this.almacenarArchivo(this.documentoArchivo)
                    this.guardarDocumento(this.documentoArchivo.name,this.nombreProveedor,"pro"+this.idProveedor,"ACTIVO"); 
                    this.botonAct = 0;         
                } 
            }
        },
        async editarProveedor(
            idProveedor,
            nombreProveedor,
            contactoProveedorPrincipal,
            contactoProveedorecundario,
            correoProveedor,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/proveedor/editar/" +
                    this.idProveedor +
                    "," +
                    this.nombreProveedor +
                    "," +
                    this.contactoProveedorPrincipal +
                    "," +
                    this.contactoProveedorecundario +
                    "," +
                    this.correoProveedor +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarProveedores();
                    me.closeModalAgregarProveedor();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

      
        async editarProveedorArchivo(
            idProveedor,
            nombreProveedor,
            contactoProveedorPrincipal,
            contactoProveedorecundario,
            correoProveedor,
            estado,
            archivo
        ) {
            const ext = this.documentoArchivo.name.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear();
            const nombreArchivo =  ext[0]+'_'+fechaHoraActual+'.'+ext[1];
            let me = this;
            await axios
                .post(
                    "/proveedor/editararchivo/" +
                    this.idProveedor +
                    "," +
                    this.nombreProveedor +
                    "," +
                    this.contactoProveedorPrincipal +
                    "," +
                    this.contactoProveedorecundario +
                    "," +
                    this.correoProveedor +
                    "," +
                    this.estado +
                    "," +
                    nombreArchivo
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarProveedores();
                    me.closeModalAgregarProveedor();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacion(item){
            this.idProveedor = item.idprv;
            this.confirmacionAnulacionProveedor = true;
        },
        closeAnulacion(){
            this.confirmacionAnulacionProveedor = false;
        },
        anular() {
            this.desactivarproveedor(this.idProveedor);
            this.confirmacionAnulacionProveedor = false;
        },
        async desactivarproveedor(idProveedor) {
            let me = this;
            await axios
                .post("/proveedor/anular/" + this.idProveedor).then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProveedores();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                    me.snackbarError = true;
                });

        },
        

        //#endregion
        //#region Adicionar
        //#endregion
        //#region Editar
        //#endregion
        //#region Eliminar
        //#region Modals
        editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
            this.desserts.push(this.editedItem)
            }
            this.close()
        },

        llenarCamposProveedor(item) {
            this.botonAct = 1;
            this.agregarProveedorModal = true;
            this.idProveedor = item.idprv;
            this.nombreProveedor = item.nomprv;
            this.contactoProveedorPrincipal = item.cto1pro;
            if(item.cto2pro==""){
                this.contactoProveedorecundario = "   ";

            }else{
                this.contactoProveedorecundario = item.cto2pro;
            }
            
            this.correoProveedor = item.croprov;
            this.estado = item.est;
            this.documentoArchivo.suffix = item.arch;
        },


        showModalAgregarProveedor(item) {
            this.agregarProveedorModal = true;
            botonAct = 0;
        },
        closeModalAgregarProveedor() {
            this.agregarProveedorModal = false;
            this.limpiar();
        },

        limpiar () {
            this.$refs.form.reset()
        },
        //#endregion




        
        async getListaExistencias(){
            let me = this;
            await axios
                .get("/inventario/listarexistencias/")
                .then(function (response) {
                if (response.data.resultado == null) {
                    me.datosExistencia = [];
                    console.log(response.data);
                } else {
                    console.log(response.data);
                    me.datosExistencia = response.data.resultado;
                }
                })
                .catch(function (error) {
                console.log(error);
                });
        },





       async registrarDocumento(){
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name,this.nombreProveedor,"pro"+this.idProveedor,"ACTIVO");
        },
        async almacenarArchivo(documentoArchivo){

            const formData = new FormData();
            formData.append('file', documentoArchivo);
            let me = this;
                await axios
                .post(
                    "/uploadFile/",formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async guardarDocumento(documentoArchivo,descripcionArchivo,codigoArchivo,estado){
            const ext = documentoArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear();
            const nombreArchivo =  'provider_doc_'+ext[0]+'_'+fechaHoraActual+'.'+ext[1];
            let me = this;
                await axios
                .post(
                    "/documento/insertar/"+
                    ext[0] +
                    "," +
                    nombreArchivo +
                    "," +
                    descripcionArchivo +
                    "," +
                    codigoArchivo +
                    "," +
                    estado)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                   
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
      },
      
      checkAccess(accesoCorrecto, tipoCorrecto) {
                
                if (this.user == null) {
                    return false;
                }
                else {
                    let checkedAccess = false;
                    let checkedType = false;
                    
                    if (accesoCorrecto != 0) {
                    this.user['accesos'].forEach(access => {
                        if (access == accesoCorrecto)
                        checkedAccess = true;
                    });
                    } else checkedAccess = true;

                    
                    if (tipoCorrecto != '0') {
                    if (this.user['tipo'] == tipoCorrecto) {
                        checkedType = true;
                    }
                    } else checkedType = true;
                    if (checkedAccess && checkedType) { return true }
                    else return false;
                }

                },
};

</script>
