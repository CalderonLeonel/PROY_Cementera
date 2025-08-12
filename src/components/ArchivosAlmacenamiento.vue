<template>
    <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="blue">
                <h3>ARCHIVOS ALMACENADOS</h3>
            </v-alert>
        </div>
        <v-container>
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
        </v-container>
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
                { text: "FECHA", value: "fecha", sortable: true },
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
   
    computed: {
        logueado() {
            if (this.user != null) {
                this.user = JSON.parse(sessionStorage.getItem('session'));
            }
            return this.user;
            }
        }, 
        created: function () {
        this.listarArchivo();
        this.listarArchivosAdq();
        this.listarArchivosAlerta();
        this.listarArchivosCotizacion();
        this.listarArchivosContrato();
        this.listarArchivosInv();
        this.listarArchivosProveedor();
        this.listarDocumento();
        
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

        getDate() {
            var fecha = new Date().toISOString();
            return fecha;
        },


        getFormattedDate(oldDate) {
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada = dia + '-' + mes + '-' + anio;

            return fechaFormateada;
        },

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