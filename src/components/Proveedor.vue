<template>
   <v-card elevation="5" outlined v-if="checkAccess(9, 'SUPERVISOR' ) || checkAccess(9, 'GERENTE')">
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
                      <v-row >
                                <v-col cols="12" md="2">
                                    <v-btn color="success" @click="showModalAgregarCategoria()">NUEVA CATEGORÍA</v-btn>  
                                </v-col>
                               
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>CATEGORÍAS</h5>
                                        </v-list-item-title>
                                    </v-list-item>
        
                                    <v-card-title>
                                        <v-text-field v-model="buscarCategoria" append-icon="mdi-magnify" label="BUSCAR CATEGORÍA DE PROVEEDOR"
                                            single-line hide-details></v-text-field>
                                    </v-card-title>
        
                                    <v-data-table :headers="headerCategoria" :items="datoscategoria" :search="buscarCategoria"
                                        :items-per-page="5" class="elevation-1" id="tableId">
        
                                        <template #[`item.estado`]="{ item }">
                                            <v-chip :color="getColor(item.estado)" dark>
                                                {{ item.estado }}
                                            </v-chip>
                                        </template>
        
                                        <template #[`item.actions`]="{ item }">
                                            <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposCategoria(item)"
                                                title="ACTUALIZAR INFORMACIÓN">
                                                mdi-pencil
                                            </v-icon>
                                              
                                        </template>
        
                                    
        
        
                                    </v-data-table>
                                </v-col>
                            </v-row>

                </v-container>
            </v-form>

        </div>

        <v-dialog v-model="agregarCategoriaModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>CATEGORÍA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreCategoria" label="NOMBRE CATEGORÍA" :counter="60"
                                        :rules="nombreCategoriaRules" @input="nombreCategoria = nombreCategoria.toUpperCase()"
                                        required></v-text-field>
                                </v-col>                         
                                <v-col cols="12" md="12"> </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped >
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonActTT == 1" color="#0A62BF" @click="editarCategoria()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonActTT == 0" color="#0ABF55" @click="registrarCategoria()" 
                                                style="float: left" title="REGISTRAR Categoria DE ITEM" class="mx-2" large>
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
                                        @click="closeModalAgregarCategoria()" style="float: right" title="SALIR">
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
                                    <v-text-field v-model="nombreRazon" label="RAZÓN SOCIAL" :counter="60"
                                        :rules="nombreRazonRules" @input="nombreRazon = nombreRazon"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="numeroNIT" type="number" label="NIT" :counter="10"
                                        :rules="nitRules" @input="numeroNIT = numeroNIT"
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
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showPaises()"
                                        style="float: right" title="BUSCAR PAISES">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="pais" label="NOMBRE PAÍS" :counter="50" :rules="paisRules"
                                        @input="pais = pais.toUpperCase()" disabled required></v-text-field>
                                </v-col>
                                 <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showCategorias()"
                                        style="float: right" title="BUSCAR CATEGORÍAS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreCategoria" label="NOMBRE CATEGORÍA" :counter="50" :rules="categoriaRules"
                                        @input="nombreCategoria = nombreCategoria.toUpperCase()" disabled required></v-text-field>
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

        <v-dialog v-model="CategoriaModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE CATEGORÍAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarCategoria" append-icon="mdi-magnify" label="BUSCAR CATEGORÍAS DISPONIBLES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerCategoria" :items="datoscategoria" :search="buscarCategoria"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarCategoria(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeCategoriaModal()" style="float: right"
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

             <v-dialog v-model="paisesModal" max-width="900px" lazy-validation persistent>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>PAISES</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>PAISES</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-col cols="12">
                                        <v-card-title>
                                            <v-text-field v-model="buscarPaises" append-icon="mdi-magnify"
                                                label="BUSCAR PAISES" single-line hide-details></v-text-field>
                                        </v-card-title>
                                    </v-col>
                                    <v-data-table :headers="headersPais" :items="datosPais" :search="buscarPaises"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon large class="mr-2" @click="seleccionarPais(item)" color="#0091EA"
                                                title="SELECCIONAR PAIS">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">

                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closePaises()"
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
            nombreRazonRules: [
              (v) => !!v || "SE REQUIERE LA RAZÓN SOCIAL DEL PROVEEDOR.",
              (v) =>
              (v && v.length <= 60) ||
                "LA RAZÓN SOCIAL NO DEBE SOBREPASAR LOS 60 CARACTERES.",
            ],
            nitRules:[ 
              (v) => !!v || "SE REQUIERE EL NIT DEL PROVEEDOR.",
              (v) => (v && v.length >= 5) || "EL NIT DEBE TENER AL MENOS 5 CARACTERES.",
              (v) => (v && v.length <= 10) || "EL NIT DEBE TENER HASTA 10 CARACTERES.",
            ],
            emailRules: [
              (v) => !!v || "SE NECESITA EL CORREO ELECTRONICO DEL PROVEEDOR.",
              (v) => /.+@.+\..+/.test(v) || "DEBE SER UN CORREO ELECTRONICO VALIDO.",
             ],
            datosProveedor: [],
            headerProveedor: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE PROVEEDOR", value: "nomprv", sortable: true },
                { text: "NIT", value: "nit", sortable: true },
                { text: "RAZÓN SOCIAL", value: "raz", sortable: true },
                { text: "CATEGORÍA", value: "cat", sortable: true },
                { text: "PAIS", value: "pais", sortable: true },
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

            
            idCategoria:0,
            nombreCategoria: "",

            datoscategoria: [],
            headerCategoria: [  
                 { text: "CATEGORÍA", value: "categoria", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],


            buscarCategoria: "",
            searchCategoria: "",
            agregarCategoriaModal: false,
            confirmacionAnulacionCategoria: false,


            paisesModal: false,
            buscarPaises: "",
            CategoriaModal: false,
            pais: "",   
            idPais: 0,
            datosPais: [],
            headersPais: [
                { text: "NOMBRE", value: "nompais", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],


            numeroNIT:"",
            nombreRazon:"",

            snackbarOK: false,
            snackbarError : false,
            //#endregion
        }
    },
    created: function (){
      this.listarProveedor();
      this.listarCategorias();
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

        checkAccess(accesoCorrecto, tipoCorrecto) {
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
                    this.registrarProveedor(this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado,this.nombreRazon,this.numeroNIT,this.idPais,this.idCategoria);

                }
                else {
                    this.registrarProveedorArchivo(this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado, this.documentoArchivo.name,this.nombreRazon,this.numeroNIT,this.idPais,this.idCategoria);  
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
                    this.estado +
                    "," +
                    this.nombreRazon +
                    "," +
                    this.numeroNIT  +
                    "," + 
                    this.idPais +
                    "," + 
                    this.idCategoria
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProveedores();
                    me.limpiar();
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
                    nombreArchivo + 
                    "," +
                    this.nombreRazon +
                    "," +
                    this.numeroNIT  +
                    "," + 
                    this.idPais +
                    "," + 
                    this.idCategoria
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProveedores();
                    me.limpiar();
                    me.closeModalAgregarProveedor();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarProv() {
            if (this.$refs.form.validate()) {
                if (this.documentoArchivo == '' || this.documentoArchivo == null) {
                    this.editarProveedor(this.idProveedor,this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado,this.nombreRazon,this.numeroNIT,this.idPais,this.id_categoria_proveedor);
                    this.botonAct = 0;
                }
                else {
                    this.editarProveedorArchivo(this.idProveedor,this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado, this.documentoArchivo.name,this.nombreRazon,this.numeroNIT,this.idPais,this.id_categoria_proveedor);                       
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
                    this.estado +
                    "," +
                    this.nombreRazon +
                    "," +
                    this.numeroNIT  +
                    "," + 
                    this.idPais +
                    "," + 
                    this.idCategoria
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProveedores();
                    me.limpiar();
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
                    nombreArchivo +
                    "," +
                    this.nombreRazon +
                    "," +
                    this.numeroNIT  +
                    "," + 
                    this.idPais +
                    "," + 
                    this.idCategoria
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProveedores();
                    me.limpiar();
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

         listarPais() {
            this.listarPaises();
        },
        async listarPaises() {
            let me = this;
            await axios
                .get("/pais/listarpaises")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosPais = [];

                    } else {
                        me.datosPais = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        showPaises() {
            this.paisesModal = true;
            this.listarPaises();
        },
        closePaises() {
            this.paisesModal = false;
        },

        seleccionarPais(item) {
            this.idPais = item.idpai;
            console.log("idPais: " + this.idPais + " idpai: " + item.idpai)
            this.pais = item.nompais;
            this.paisesModal = false;
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
            this.numeroNIT = item.nit;
            this.nombreRazon = item.raz;
            this.idPais = item.idpais;
            this.pais = item.pais;
            this.idCategoria = item.idcatprv;
            this.nombreCategoria = item.cat;
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

        showCategorias(){
            this.listarCategorias();
            this.CategoriaModal  = true;
        },

        closeCategoriaModal(){
            this.CategoriaModal = false;
            this.limpiar();
        },

        seleccionarCategoria(item){
            this.idCategoria = item.id_categoria_proveedor;
            this.nombreCategoria = item.categoria;
            this.CategoriaModal = false;
        },


        showModalAgregarCategoria(){
            this.agregarCategoriaModal = true;
            this.botonActTT = 0;  
        },

        closeModalAgregarCategoria(){
            this.agregarCategoriaModal = false;
            this.botonActTT = 0;
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


        listarCategoria() {
             this.listarCategorias();
         },
         async listarCategorias() {
           let me = this;
           await axios
             .get("/proveedor/listarcategoriaactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datoscategoria = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datoscategoria = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         listarCategoriaInactivo() {
             this.listarCategoriasInactivos();
         },
         async listarCategoriasInactivos() {
           let me = this;
           await axios
             .get("proveedor/listarcategoriainactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datoscategoriaInactivos = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datoscategoriaInactivos = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         registrarCategoria() {
            if (this.$refs.form.validate()) {
                this.registrarCategorias(this.nombreCategoria, this.estado);
            }            
        },
        async registrarCategorias(
            nombreCategoria,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/proveedor/agregarcategoria/" +
                    this.nombreCategoria +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCategorias();
                    me.closeModalAgregarCategoria();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarCategoria() {
            if (this.$refs.form.validate()) {
            this.editarCategoria( this.idCategoria,this.nombreCategoria, this.estado);
            this.botonActTT = 0;
            }
        },
        async editarCategoria(
            idCategoria,
            nombreCategoria,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/proveedor/actualizarcategoria/" +
                    this.idCategoria +
                    "," +
                    this.nombreCategoria +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCategorias();
                    me.closeModalAgregarCategoria();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

         llenarCamposCategoria(item) {
            this.botonActTT = 1;
            this.idCategoria = item.id_categoria_proveedor;
            this.nombreCategoria = item.categoria;
            this.estado = item.estado;
            this.agregarCategoriaModal = true;
        },

      },
      
      
        
};

</script>
