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
             <!--
             <v-row>
                <v-col cols="12" md="12">
                    <v-data-table
                        :headers="headerDocumento"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                        </template>
                    </v-data-table>
                    <v-data-table
                        headers="headers"
                        items="items"
                        loading="true"
                        search="search"
                    >  
                    </v-data-table>
                </v-col>
                <v-col cols="12" md="12">
                    <v-data-table
                        :headers="headerDocumento"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                        </template>
                    </v-data-table>
                    <v-data-table
                        headers="headers"
                        items="items"
                        loading="true"
                        search="search"
                    >  
                    </v-data-table>
                </v-col>
                <v-col cols="12" md="12">
                    <v-data-table
                        :headers="headerDocumento"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                        </template>
                    </v-data-table>
                    <v-data-table
                        headers="headers"
                        items="items"
                        loading="true"
                        search="search"
                    >  
                    </v-data-table>
                </v-col>
                <v-col cols="12" md="12">
                    <v-data-table
                        :headers="headerDocumento"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                        </template>
                    </v-data-table>
                    <v-data-table
                        headers="headers"
                        items="items"
                        loading="true"
                        search="search"
                    >  
                    </v-data-table>
                </v-col>           
                <v-col cols="12" md="12">
                    <v-data-table
                        :headers="headerDocumento"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                        </template>
                    </v-data-table>
                    <v-data-table
                        headers="headers"
                        items="items"
                        loading="true"
                        search="search"
                    >  
                    </v-data-table>
                </v-col>
                <v-col cols="12" md="12">
                    <v-data-table
                        :headers="headerDocumento"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                            <td class="text-xs-right">{{ props.item.key }}</td>
                        </template>
                    </v-data-table>
                    <v-data-table
                        headers="headers"
                        items="items"
                        loading="true"
                        search="search"
                    >  
                    </v-data-table>
                </v-col>
            </v-row>-->
        </v-container>
        <v-dialog v-model="agregarDocumento" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>Agregar Documento</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="Archivo" required
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
            documentoArchivo: null,
            descripcionArchivo: '',
            codigoArchivo: '',

            datosDocumento: [],
            headerDocumento: [
                { text: "DOCUMENTO", value: "nombreDocumento", sortable: true },
                { text: "DESCRIPCIÓN", value: "descripcionDocumento", sortable: true },
                { text: "CODIGO", value: "codigoDocumento", sortable: true },
                { text: "TIPO DE ARCHIVO", value: "tipoArchivo", sortable: true },
                { text: "TAMAÑO DE ARCHIVO", value: "tamanioArchivo", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
            ],

            agregarDocumento: false,
            botonAct: 0,
        }
    },
    created: function (){
      this.listarDocumento();
    },
    methods: {
        
        showAgregarDocumento() {
            this.agregarDocumento = true;
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
        registrarDocumento(){
            this.guardarDocumento(this.documentoArchivo,this.descripcionArchivo,this.codigoArchivo);
        },
        async guardarDocumento(documento,descripcion,codigo){
            console.log(documento);
            alert(documento.name);
            alert(documento.size);
            alert(documento.type);
            console.log(descripcion);
            console.log(codigo);
        },
        actualizarDocumento(){
            this.editarDocumento(this.idDocumento,this.documentoArchivo,this.descripcionArchivo,this.codigoArchivo);
        },
        async editarDocumento(){

        },
        suprimirDocumento(){
            this.editarDocumento(this.idDocumento);
        },
        async eliminarDocumento(id){

        },
        limpiar () {
            this.$refs.form.reset()
        },
    }
};
</script>