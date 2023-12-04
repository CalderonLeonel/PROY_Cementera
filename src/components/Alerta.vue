<template>
    <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" >
                <h3>GESTIÓN DE ALERTAS</h3>
            </v-alert>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn color="success" @click="showAgregarAlerta()">GUARDAR ALERTA</v-btn>
                </v-col>

            </v-row>
            <v-row>

                <v-col cols="12" md="12">
                    <v-text-field v-model="searchAlerta" append-icon="mdi-magnify"
                        label="BUSCAR ALERTA" single-line hide-details></v-text-field>
                    <v-data-table :headers="headerAlerta" :items="datosAlerta" :search="searchAlerta"
                        :custom-filter="customFilter" class="elevation-1">

                        <template #[`item.iddoc`]="{ item }">
                            <v-btn color="primary" icon
                                :href="`${axios.defaults.baseURL}${'documento/descargarImagen/' + item.nombredoc}`" target="">
                                <v-icon>mdi-file</v-icon> DESCARGAR
                            </v-btn>
                        </template>

                        <template #[`item.fecha`]="{ item }">
                            {{getFormattedDate(item.fecha)}}
                        </template>

    




                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="agregarAlerta" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>Agregar Alerta</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="7">
                                    <v-file-input v-model="AlertaArchivo"
                                        accept=".jpg, .jpeg, .webp, .png"
                                        label="ARCHIVO"></v-file-input>

                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="tituloAlerta" type="text" label="TITULO"
                                        :counter="60" @input="tituloAlerta = tituloAlerta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcionAlerta" type="text" label="DESCRIPCIÓN"
                                        :counter="150" @input="descripcionAlerta = descripcionAlerta.toUpperCase()"
                                        auto-grow  rows="2"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="editarAlerta()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click=" registrarAlerta()" style="float: left" title="REGISTRAR ALERTA">
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
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAgregarAlerta()"
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


            AlertaArchivo:'',
            codigoArchivo:'EMPALRT',
            tituloAlerta: '',
            descripcionAlerta:'',
            idArchivo: '',



            datosAlerta: [],
            searchAlerta: '',
            headerAlerta: [

                { text: "TITULO", value: "title", sortable: true },
                { text: "DESCRIPCIÓN", value: "description", sortable: true },
                { text: "IMAGEN", value: "iddoc", sortable: true },
                { text: "FECHA", value: "fecha", sortable: true },
            ],


            agregarAlerta: false,
            confirmacionAlmacenamiento: false,
            botonAct: 0,
        }
    },
    created: function () {
        this.listarAlertas();
    },
    methods: {

        getFormattedDate(oldDate){
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1; 
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada =  dia + '-' + mes + '-' + anio;

            return fechaFormateada;
        },

        showAgregarAlerta() {
            this.agregarAlerta = true;
            if (this.AlertaArchivo != '') {
                this.inputState = false;
            }
            else {
                this.inputState = true;
            }
        },
        closeAgregarAlerta() {
            this.agregarAlerta = false;
        },

        async getLastDoc(){
            let me = this;
            var object = []
            await axios
                .get("/documento/obtenerUltimo/")
                .then(function (response) {
                    if (response.data == null) {
                        console.log(response.data.resultado);
                        object = '';
                    } else {
                        console.log(response.data.resultado);
                        object = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            object = JSON.parse(JSON.stringify(object));
            for (const key in object) {
                me.idArchivo=object[key].iddoc;
            }
        },

        listarAlerta() {
            this.listarAlertas();
        },
        async listarAlertas() {
            let me = this;
            await axios
                .get("/empleado/listarAlertas/")
                .then(function (response) {
                    if (response.data == null) {
                        me.datosAlerta = [];
                        console.log(response.data.resultado);
                    } else {
                        console.log(response.data);
                        me.datosAlerta = response.data.resultado;
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
        },
        async listarArchivos() {
            let me = this;
            await axios
                .get("/empleado/listararchivos/")
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
    
        registrarAlerta() {
            this.guardarAlerta(this.AlertaArchivo, this.tituloAlerta, this.codigoArchivo, "ACTIVO", this.descripcionAlerta)
            this.agregarAlerta = false;
        },


        async guardarAlerta(AlertaArchivo, tituloAlerta, codigoArchivo, estado, descripcion){
            const formData = new FormData();
            formData.append('image', AlertaArchivo);
            let me = this;
            await axios
                .post(
                    "/uploadimage/", formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarAlertas();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
            const ext = AlertaArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            await axios
                .post(
                    "/documento/insertar/" +
                    ext[0] +
                    "," +
                    nombreArchivo +
                    "," +
                    tituloAlerta +
                    "," +
                    codigoArchivo +
                    "," +
                    estado)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarAlerta();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
            var object = []
            await axios
                .get("/documento/obtenerUltimo/")
                .then(function (response) {
                    if (response.data == null) {
                        console.log(response.data.resultado);
                        object = '';
                    } else {
                        console.log(response.data.resultado);
                        object = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            object = JSON.parse(JSON.stringify(object));
            for (const key in object) {
                me.idArchivo=object[key].iddoc;
            }
            await axios
                .post(
                    "/empleado/addalerta/" , {
                        titulo: tituloAlerta,
                        descripcion: descripcion.toString(),
                        img: me.idArchivo
                    })
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarAlmacenamientos();
                    me.closeModalAlmacenamiento();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },


        async almacenarArchivo(AlertaArchivo) {

            const formData = new FormData();
            formData.append('image', AlertaArchivo);
            let me = this;
            await axios
                .post(
                    "/uploadimage/", formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarAlertas();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async guardarArchivo(AlertaArchivo, tituloAlerta, codigoArchivo, estado) {
            const ext = AlertaArchivo.split('.');
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
                    tituloAlerta +
                    "," +
                    codigoArchivo +
                    "," +
                    estado)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarAlerta();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        actualizarAlerta() {
            this.editarArchivo(this.idAlerta, this.AlertaArchivo.name, this.AlertaArchivo, this.tituloAlerta, this.codigoArchivo, 'ACTIVO');
        },
        async editarArchivo(id, nombre, Alerta, tituloAlerta, codigo, estado) {
            const ext = nombre.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            let me = this;
            await axios
                .post(
                    "/empleado/editaralerta/" +
                    id +
                    "," +
                    ext[0] +
                    "," +
                    nombreArchivo +
                    "," +
                    tituloAlerta +
                    "," +
                    codigo +
                    "," +
                    estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarAlertas();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        suprimirAlerta() {
            this.editarAlerta(this.idAlerta);
        },
        async eliminarAlerta(id) {
            let me = this;
            await axios
                .post(
                    "/empleado/offalerta/" +
                    id
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarAlertas();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
        async descargarArchivo(nombre) {
            let me = this;
            await axios
                .get(
                    "/documento/descargarImagen/" +
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


    }
};
</script>