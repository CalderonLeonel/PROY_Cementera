<template>
    <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="blue">
                <h3>GESTIÓN DE ARCHIVOS</h3>
            </v-alert>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn color="success" @click="showAgregarDocumento()">GUARDAR DOCUMENTO</v-btn>
                </v-col>
                
             </v-row>
             <v-row>
                         
                <v-col cols="12" md="12">
                    <v-text-field v-model="searchDocumento" append-icon="mdi-magnify" label="BUSCAR DOCUMENTO"
                                    single-line hide-details></v-text-field>
                    <v-data-table
                        :headers="headerDocumento"
                        :items="datosDocumento" 
                        :search="searchDocumento"
                        class="elevation-1"
                    >

                    <template #[`item.doc`]="{ item }">
                        <v-btn color="primary" icon :href="`${axios.defaults.baseURL+'documento/descargar/'}${item.doc}`" target="_blank">
                            <v-icon>mdi-file</v-icon> ABRIR
                        </v-btn>
                    </template>
                    
                       
                    <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.est)" dark>
                                        {{ item.est}}
                                    </v-chip>
                                </template>

                              


                    </v-data-table>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12">
                    <v-text-field v-model="searchArchivo" append-icon="mdi-magnify" label="BUSCAR ARCHIVO"
                                    single-line hide-details></v-text-field>
                    <v-data-table
                        :headers="headerArchivo"
                        :items="datosArchivo" 
                        :search="searchArchivo"
                        class="elevation-1"
                    >
                    <template #[`item.url`]="{ item }">
                        <v-btn color="primary" icon :href="`${axios.defaults.baseURL}${item.url}`" target="target="_blank">
                            <v-icon>mdi-file</v-icon> Abrir
                        </v-btn>
                    </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="agregarDocumento" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>Agregar Documento</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form"  lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="7">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="Archivo" required :disabled="storageState" @change="enableButton"
                                    ></v-file-input>
                                     
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="codigoArchivo" type="text" label="Codigo" :counter="25"
                                         @input="codigoArchivo = codigoArchivo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcionArchivo" type="text" label="Descripción" :counter="150"
                                         @input="descripcionArchivo = descripcionArchivo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                               
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarDocumento()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarDocumento()" style="float: left" title="REGISTRAR PROVEEDOR">
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
                                        @click="closeAgregarDocumento()" style="float: right" title="SALIR">
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
            idDocumento: 0,
            documentoArchivo: '',
            descripcionArchivo: '',
            codigoArchivo: '',

            datosArchivo: [],
            searchArchivo: '',
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
                { text: "CODIGO", value: "codigo", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
            ],


            agregarDocumento: false,
            confirmacionAlmacenamiento: false,
            botonAct: 0,
        }
    },
    created: function (){
      this.listarDocumento();
      //this.listarArchivo();
    },
    methods: {
        
        showAgregarDocumento() {
            this.agregarDocumento = true;
            if(this.documentoArchivo != ''){
                this.inputState = false;
            }
            else{
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
        confirmarAlmacenamiento(){
            alert('ARCHIVO GUARDADO');
            this.confirmacionAlmacenamiento = false;
            this.storageState = true;
        },
        //listarArchivo(){
            this.listarArchivos();
        },
        //async listarArchivos(){
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
        registrarDocumento(){
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name,this.descripcionArchivo,this.codigoArchivo,"ACTIVO");
            this.agregarDocumento = false;
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
                    me.listarDocumentos();
                    //me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async guardarDocumento(documentoArchivo,descripcionArchivo,codigoArchivo,estado){
            const ext = documentoArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear();
            const nombreArchivo =  ext[0]+'_'+fechaHoraActual+'.'+ext[1];
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
                    me.listarDocumento();
                    //me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        actualizarDocumento(){
            this.editarDocumento(this.idDocumento,this.documentoArchivo.name,this.documentoArchivo,this.descripcionArchivo,this.codigoArchivo,'ACTIVO');
        },
        async editarDocumento(id,nombre,documento,descripcion,codigo,estado){
            const ext = nombre.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear();
            const nombreArchivo =  ext[0]+'_'+fechaHoraActual+'.'+ext[1];
            let me = this;
            await axios
                .post(
                    "/documento/editar/"+
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
        suprimirDocumento(){
            this.editarDocumento(this.idDocumento);
        },
        async eliminarDocumento(id){
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
        async descargarArchivo(nombre){
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
        limpiar () {
            this.$refs.form.reset()
            
        },
    }
};
</script>