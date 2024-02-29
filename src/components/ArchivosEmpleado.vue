<template>
    <v-card elevation="5" outlined>
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
            <v-row>
                <v-col cols="12" md="12">
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
                                <v-col cols="12" md="7">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="ARCHIVO"></v-file-input>

                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="codigoArchivo" type="text" label="CODIGO" :counter="25"
                                        @input="codigoArchivo = codigoArchivo.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcionArchivo" type="text" label="DESCRIPCION"
                                        :counter="150" @input="descripcionArchivo = descripcionArchivo.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="editarDocumento()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarDocumento()" style="float: left" title="REGISTRAR DOCUMENTO">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiar()" style="float: left"
                                        title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
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
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="warning" outlined>
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
            generarMemorandum: false,
        }
    },
    created: function () {

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
        },

        listarDocumento() {
            this.listarDocumentos();
            limpiar();
        },
        limpiar() {
            this.$refs.form.reset()

        },
    },
}
</script>