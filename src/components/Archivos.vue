<template>
    <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="blue">
                <h3>GESTIÓN DE ARCHIVOS</h3>
            </v-alert>
        </div>
        <v-container>
            <v-row v-if="checkAccess(11, 'COMUN') || checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
                <v-col cols="12" md="4">
                    <v-btn color="success" @click="showAgregarDocumento()">GUARDAR DOCUMENTO</v-btn>
                </v-col>

            </v-row>
            <v-row v-if="checkAccess(11, 'COMUN') || checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">

                <v-col cols="12" md="12">
                    <v-text-field v-if="user == 'admin'" v-model="searchDocumento" append-icon="mdi-magnify"
                        label="BUSCAR DOCUMENTO" single-line hide-details></v-text-field>
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
            <v-row v-if="checkAccess(11, 'COMUN') || checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
                <v-col cols="12" md="12">
                    <v-text-field v-model="searchArchivo" append-icon="mdi-magnify" label="BUSCAR ARCHIVO" single-line
                        hide-details></v-text-field>
                    <v-data-table :headers="headerArchivo" :items="datosArchivo" :search="searchArchivo"
                        class="elevation-1">
                        <template #[`item.url`]="{ item }">
                            <v-btn color="primary" icon :href="`${axios.defaults.baseURL}${item.url}`" target="">
                                <v-icon>mdi-file</v-icon> Abrir
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <v-row v-if="checkAccess(11, 'COMUN') || checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">

                <v-col cols="12" md="12">
                    <v-text-field v-if="checkAccess(11, 'COMUN') || checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')" v-model="searchDocumento" append-icon="mdi-magnify"
                        label="BUSCAR DOCUMENTO" single-line hide-details></v-text-field>
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
            <v-row>
                <v-col cols="12" md="12" v-if="checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
                    <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ARCHIVOS COTIZACIONES</h5>
                                </v-list-item-title>
                            </v-list-item>
                    <v-text-field v-model="searchArchivoCotizacion" append-icon="mdi-magnify"
                        label="BUSCAR DOCUMENTO" single-line hide-details></v-text-field>
                    <v-data-table :headers="headerDocumentoAdquisicion" :items="datosDocumentoCotizacion" :search="searchDsearchArchivoCotizacionocumento"
                        :custom-filter="customFilter" class="elevation-1">

                        <template #[`item.archivo`]="{ item }">
                                    <v-text v-if="item.archivo == null || item.arch == 'null'">
                                        NO TIENE UN ARCHIVO
                                    </v-text>
                                    <v-btn v-else-if="item.archivo !=null" color="primary" icon
                                        :href="`${axios.defaults.baseURL}${'documento/adquisicion/' + item.archivo}`" target="">
                                        <v-icon>mdi-file</v-icon> ABRIR
                                    </v-btn>
                                </template>

                    </v-data-table>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="12" v-if="checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
                    <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ARCHIVOS PROVEEDORES</h5>
                                </v-list-item-title>
                            </v-list-item>
                    <v-text-field  v-model="searchArchivoProveedor" append-icon="mdi-magnify"
                        label="BUSCAR DOCUMENTO" single-line hide-details></v-text-field>
                    <v-data-table :headers="headerDocumentoProveedor" :items="datosDocumentoProveedor" :search="searchArchivoProveedor"
                        :custom-filter="customFilter" class="elevation-1">

                        <template #[`item.archivo`]="{ item }">
                                    <v-text v-if="item.archivo == null || item.arch == 'null'">
                                        NO TIENE UN ARCHIVO
                                    </v-text>
                                    <v-btn v-else-if="item.archivo !=null" color="primary" icon
                                        :href="`${axios.defaults.baseURL}${'documento/adquisicion/' + item.archivo}`" target="">
                                        <v-icon>mdi-file</v-icon> ABRIR
                                    </v-btn>
                        </template>

                    </v-data-table>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="12" v-if="checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
                    <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>CONTRATOS</h5>
                                </v-list-item-title>
                            </v-list-item>
                    <v-text-field  v-model="searchArchivoContratos" append-icon="mdi-magnify"
                        label="BUSCAR DOCUMENTO" single-line hide-details></v-text-field>
                    <v-data-table :headers="headerDocumentoContrato" :items="datosDocumentoContrato" :search="searchArchivoContratos"
                        :custom-filter="customFilter" class="elevation-1">

                        <template #[`item.archivo`]="{ item }">
                                    <v-text v-if="item.archivo == null || item.arch == 'null'">
                                        NO TIENE UN ARCHIVO
                                    </v-text>
                                    <v-btn v-else-if="item.archivo !=null" color="primary" icon
                                        :href="`${axios.defaults.baseURL}${'documento/descargar/' + item.archivo}`" target="">
                                        <v-icon>mdi-file</v-icon> ABRIR
                                    </v-btn>
                                </template>

                    </v-data-table>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="12" v-if="checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
                    <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ALERTAS</h5>
                                </v-list-item-title>
                            </v-list-item>
                    <v-text-field v-if="user == 'admin'" v-model="searchArchivoAlertas" append-icon="mdi-magnify"
                        label="BUSCAR DOCUMENTO" single-line hide-details></v-text-field>
                    <v-data-table :headers="headerDocumentoAlerta" :items="datosDocumentoAlerta" :search="searchArchivoAlertas"
                        :custom-filter="customFilter" class="elevation-1">

                        <template #[`item.archivo`]="{ item }">
                            <v-btn color="primary" icon
                                :href="`${axios.defaults.baseURL}${'documento/descargarImagen/' + item.archivo}`"
                                target="">
                                <v-icon>mdi-file</v-icon> DESCARGAR
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="agregarDocumento" persistent :overlay="false" max-width="1000px" v-if="checkAccess(11, 'COMUN') || checkAccess(11, 'SUPERVISOR') || checkAccess(11, 'GERENTE')">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AÑADIR DOCUMENTO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="7">
                                    <v-file-input v-model="documentoArchivo" required :rules="fileRules"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="ARCHIVO"></v-file-input>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="codigoArchivo" type="text" label="CÓDIGO" :counter="25" :rules="codigoRules"
                                        @input="codigoArchivo = codigoArchivo.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcionArchivo" type="text" label="DESCRIPCIÓN" :rules="descripcionRules"
                                        :counter="150" @input="descripcionArchivo = descripcionArchivo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonAct == 1" color="#0A62BF" @click="editarDocumento()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55" @click="registrarDocumento()"
                                                style="float: left" title="REGISTRAR DOCUMENTO" class="mx-2" large>
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
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAgregarDocumento()"
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

export default {
    data() {
        return {

            drawer: false,
            user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },

            mensajeSnackbarError: "REGISTRO FALLIDO",

            user: 'admin',

            idDocumento: 0,
            documentoArchivo: '',
            descripcionArchivo: '',
            codigoArchivo: '',

            datosArchivo: [],
            datosArchivoAdq: [],
            datosArchivoInv: [],
            searchArchivo: '',
            searchArchivoAdq: '',
            searchArchivoInv: '',
            headerArchivo: [
                { text: "NOMBRE", value: "name", sortable: true },
                { text: "ARCHIVO", value: "url", sortable: false }
            ],

            datosDocumento: [],
            searchDocumento: '',
            headerDocumento: [

                { text: "DOCUMENTO", value: "namedoc", sortable: true },
                { text: "ARCHIVO", value: "doc", sortable: true },
                { text: "DESCRIPCIÓN", value: "descrip", sortable: true },
                { text: "CÓDIGO", value: "codigo", sortable: true },
            ],


            agregarDocumento: false,
            confirmacionAlmacenamiento: false,
            botonAct: 0,

            snackbarOK: false,
            snackbarError: false,

            fileRules: [
                (v) => !!v || "EL ARCHIVO ES OBLIGATORIO.", 
            ],


            codigoRules: [
              (v) => !!v || "SE REQUIERE EL CÓDIGO DEL ARCHIVO.",
              (v) =>
              (v && v.length <= 25 ) ||
                "EL CÓDIGO NO DEBE SOBREPASAR LOS 25 CARACTERES.",
            ],

            descripcionRules: [
            (v) => !!v || "SE REQUIERE LA DESCRIPCIÓN DEL ARCHIVO.",
            (v) => (v === null || v.length <= 150) || "LA DESCRIPCIÓN NO DEBE SUPERAR LOS 150 CARACTERES.",
            ],


            headerDocumentoAdquisicion: [
                { text: "DOCUMENTO", value: "nombrecotizacion", sortable: true },
                { text: "ARCHIVO", value: "archivo", sortable: true },
            ],

            searchArchivoCotizacion: '',
            datosDocumentoCotizacion: [],

            headerDocumentoProveedor: [
                { text: "DOCUMENTO", value: "nombreproveedor", sortable: true },
                { text: "ARCHIVO", value: "archivo", sortable: true },
            ],

            searchArchivoProveedor: '',
            datosDocumentoProveedor: [],

            headerDocumentoContrato: [
                { text: "DOCUMENTO", value: "nombreempleado", sortable: true },
                { text: "ARCHIVO", value: "archivo", sortable: true },
            ],

            searchArchivoContratos: '',
            datosDocumentoContrato: [],

            headerDocumentoAlerta: [
                { text: "DOCUMENTO", value: "title", sortable: true },
                { text: "DESCRIPCIÓN", value: "description", sortable: true },
                { text: "ARCHIVO", value: "archivo", sortable: true },
            ],

            searchArchivoAlertas: '',
            datosDocumentoAlerta: [],
        }
    },
    created: function () {
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
    computed: {
        logueado() {
            if (this.user != null) {
                this.user = JSON.parse(sessionStorage.getItem('session'));
            }
            return this.user;
            }
        }, created: function () {

            if (this.user != null) {
            this.user = JSON.parse(sessionStorage.getItem('session'));
            }


            //this.user.dispath("autologin");
            if (this.user == null) {
            if (this.$route.path != '/login') {
                this.$router.push("/login");
            }
            }
            console.log("UserData: " + JSON.stringify(this.user));

            
        },
    methods: {

        showAgregarDocumento() {
            this.agregarDocumento = true;
            if (this.documentoArchivo != '') {
                this.inputState = false;
            }
            else {
                this.inputState = true;
            }
        },
        closeAgregarDocumento() {
            this.agregarDocumento = false;
        },

        listarDocumento() {
            this.listarDocumentos();
        },
        async listarDocumentos() {
            let me = this;
            await axios
                .get("/documento/listardocumentos/")
                .then(function (response) {
                    if (response.data == null) {
                        me.datosDocumento = [];
                        console.log(response.data.resultado);
                    } else {
                        console.log(response.data);
                        me.datosDocumento = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        confirmarAlmacenamiento() {
            alert('ARCHIVO GUARDADO');
            this.confirmacionAlmacenamiento = false;
            this.storageState = true;
        },
        listarArchivo() {
            this.listarArchivos();
            this.listarArchivosCotizacion();
            this.listarArchivosProveedor();
            this.listarArchivosContrato();
            this.listarArchivosAlerta();
        },
        async listarArchivos() {
            let me = this;
            await axios
                .get("/documento/listararchivos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosArchivo = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosArchivo = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        async listarArchivosCotizacion() {
            let me = this;
            await axios
                .get("/documento/listardocumentosadquisicion/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDocumentoCotizacion = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDocumentoCotizacion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        async listarArchivosProveedor() {
            let me = this;
            await axios
                .get("/documento/listardocumentosproveedor/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDocumentoProveedor = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDocumentoProveedor = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        async listarArchivosContrato() {
            let me = this;
            await axios
                .get("/documento/listardocumentoscontrato/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDocumentoContrato = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDocumentoContrato = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        async listarArchivosAlerta() {
            let me = this;
            await axios
                .get("/documento/listardocumentosalerta/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDocumentoAlerta = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDocumentoAlerta = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        async listarArchivosInv() {
            let me = this;
            await axios
                .get("/documento/listararchivosinv/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosArchivoInv = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosArchivoInv = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarArchivosAdq() {
            let me = this;
            await axios
                .get("/documento/listararchivosadq/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosArchivoAdq = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosArchivoAdq = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarDocumento() {
            if (this.$refs.form.validate()) {
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name, this.descripcionArchivo, this.codigoArchivo, "ACTIVO");
            this.agregarDocumento = false;
            }
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
                    me.listarDocumentos();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async guardarDocumento(documentoArchivo, descripcionArchivo, codigoArchivo, estado) {
            const ext = documentoArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            let me = this;
            await axios
                .post(
                    "/documento/insertar/" +
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
                    me.listarDocumento();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        actualizarDocumento() {
            if (this.$refs.form.validate()) {
            this.editarDocumento(this.idDocumento, this.documentoArchivo.name, this.documentoArchivo, this.descripcionArchivo, this.codigoArchivo, 'ACTIVO');
            }
        },
        async editarDocumento(id, nombre, documento, descripcion, codigo, estado) {
            const ext = nombre.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            let me = this;
            await axios
                .post(
                    "/documento/editar/" +
                    id +
                    "," +
                    ext[0] +
                    "," +
                    nombreArchivo +
                    "," +
                    descripcion +
                    "," +
                    estado +
                    "," +
                    estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumentos();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        suprimirDocumento() {
            this.editarDocumento(this.idDocumento);
        },
        async eliminarDocumento(id) {
            let me = this;
            await axios
                .post(
                    "/documento/editar/" +
                    id
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumentos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        async descargarArchivo(nombre) {
            let me = this;
            await axios
                .get(
                    "/documento/descargar/" +
                    nombre
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;

                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        limpiar() {
            this.$refs.form.reset()

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


    }
};
</script>