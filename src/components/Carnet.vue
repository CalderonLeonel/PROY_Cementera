<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>CARNET</h5>
            </v-alert>
        </div>
        <!-- Snackbar -->
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00">
                {{ mensajeSnackBar }}
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarOK = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
        <div class="text-center">
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B">
                {{ mensajeError }}
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarError = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

        <v-dialog v-model="empleadosModal" max-width="800" class="text-center">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>
                        <h5>EMPLEADOS</h5>
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-row>

                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>EMPLEADOS</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="searchEmpleado" append-icon="mdi-magnify"
                                        label="BUSCAR PRODUCTOS" single-line hide-details></v-text-field>
                                </v-card-title>

                                <v-data-table :headers="headersEmpleado" :items="datosEmpleado" :search="searchEmpleado"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarEmpleado(item)" color="#0091EA">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>

                            <v-col cols="10"> </v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" fab dark small color="red darken-1" @click="close"
                                    style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-simple-table style="border: hidden">
            <template>
                <thead bgcolor="#EE680B">

                    <th class="text-left"></th>
                    <th class="text-left"></th>

                </thead>
                <tbody>
                    <tr style="background-color: #ffffff">
                        <td style="border: inset 0pt">
                            <h5>DOCUMENTO:</h5>
                        </td>
                        <td style="border: inset 0pt">{{ ci }}</td>
                        <td style="border: inset 0pt"></td>
                    </tr>
                    <tr style="background-color: #ffffff">
                        <td style="border: inset 0pt">
                            <h5>EMPLEADO:</h5>
                        </td>
                        <td style="border: inset 0pt">
                            {{ paterno }} {{ materno }} {{ nombres }}
                        </td>
                        <td style="border: inset 0pt"></td>
                    </tr>
                    <tr style="background-color: #ffffff">
                        <td style="border: inset 0pt">
                            <h5>TIPO DE EMPLEADO:</h5>
                        </td>
                        <td style="border: inset 0pt">{{ nombreCargo }}</td>
                        <td style="border: inset 0pt"></td>
                    </tr>
                    <tr style="background-color: #ffffff">
                        <td style="border: inset 0pt">
                            <h5>GESTION:</h5>
                        </td>
                        <td style="border: inset 0pt">{{ gestionActual }}</td>
                        <td style="border: inset 0pt"></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-divider></v-divider>

        <v-card class="white--text" color="grey lighten-4" max-width="150%">
    <v-list-item>
        <v-list-item-title>
            <h5>FOTOGRAFIA</h5>
        </v-list-item-title>
    </v-list-item>


    <div style="display: flex; justify-content: center; align-items: center; position: relative;">
        <v-card style="width: 150px; height: 150px; position: relative;">
            <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>

            <v-img v-if="showUrl" :src="urlFoto" style="width: 150px; height: 150px;"></v-img>

            <div v-else>
                <video 
                    v-show="!isPhotoTaken" 
                    ref="camera" 
                    style="width: 150px; height: 150px; object-fit: cover;" 
                    autoplay>
                </video>
                <canvas 
                    v-show="isPhotoTaken" 
                    id="photoTaken" 
                    ref="canvas" 
                    style="width: 150px; height: 150px;">
                </canvas>
            </div>
        </v-card>
    </div>

    <v-list-item></v-list-item>

        <v-col cols="12" md="4">
            <v-toolbar dense shaped color="#002245">
                <v-toolbar-title style="color:#ffffff">
                    <h6>OPCIONES</h6>
                </v-toolbar-title>

                <v-btn 
                    class="mx-2" 
                    fab dark x-small 
                    color="#EE680B" 
                    style="float: left;" 
                    title="FOTO EMPLEADO" 
                    :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" 
                    @click="toggleCamera">
                    <v-icon v-if="!isCameraOpen">mdi-camera-plus</v-icon>
                    <v-icon v-else="">mdi-camera-off</v-icon>
                </v-btn>
                <v-btn 
                    v-model="file" 
                    @click="takePhoto()" 
                    class="mx-2" 
                    fab dark x-small 
                    color="#EE680B" 
                    title="TOMAR FOTO" 
                    style="float: left">
                    <v-icon dark>mdi-camera</v-icon>
                </v-btn>
                <v-btn 
                    v-model="file" 
                    @click="actualizarEMPLEADOImg()" 
                    class="mx-2" 
                    fab dark x-small 
                    color="#EE680B" 
                    title="GUARDAR FOTO" 
                    style="float: left">
                    <v-icon dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <v-btn 
                    class="mx-2" 
                    fab dark x-small 
                    color="#EE680B" 
                    @click="imprimirCarnet()" 
                    style="float: left" 
                    title="IMPRIMIR CARNET">
                    <v-icon dark>mdi-printer-outline</v-icon>
                </v-btn>
                <v-btn 
                    class="mx-2" 
                    fab dark x-small 
                    color="#EE680B" 
                    @click="showEmpleados()" 
                    style="float: right" 
                    title="BUSCAR EMPLEADO">
                    <v-icon dark>mdi-account-search</v-icon>
                </v-btn>
            </v-toolbar>
        </v-col>
    </v-card>


    </v-card>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import QRCode from 'qrcode';

export default {
    data() {
        return {
            idEmpleado: "",
            nombres: "",
            paterno: "",
            materno: "",
            email: "",
            fechaNacimiento: "2000-10-12",
            ci: "",
            telefono: "",
            estado: "",
            createDate: "",
            lastDate: "",
            idCargo: "",
            idDepartamento: "",
            valid: true,

            isShotPhoto: false,
            showUrl: false,
            urlFoto: '',
            isCameraOpen: false,
            isPhotoTaken: false,
            isLoading: false,
            stream: null,

            searchEmpleado: "",
            datosEmpleado: [],
            headersEmpleado: [
                { text: "NOMBRES", value: "nom" },
                { text: "PATERNO", value: "pat" },
                { text: "MATERNO", value: "mat" },
                //{ text: "CARGO", value: "carg" },
                //{ text: "DEPARTAMENTO", value: "dep" },
                { text: "CONTACTOS", value: "tel", sortable: false },
                { text: "ESTADO", value: "act" },
                { text: "FECHA CREACION", value: "credte", sortable: false },
                { text: "ULTIMA ACTUALIZACIÓN", value: "upddate", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],

            //#region Modals
            empleadosModal: 0,
            //#endregion


        };
    },
    created: function () {
        this.user = JSON.parse(sessionStorage.getItem("session"));
        console.log(this.user.usuario);
        this.usuario = this.user.personal;
        this.id_sede = this.user.id_sede;
        this.nomus = this.user.nombres + ' ' + this.user.paterno + ' ' + this.user.materno;
        this.patus = this.user.paterno;
        this.matus = this.user.materno;

        //this.listarGestion();
        //this.toDataURL();
        //this.datosCampoCarnet();
    },

    methods: {
        async generarPDFCarnet(empleadoData) {
            const doc = new jsPDF();

            // Agregar la foto del empleado al PDF (reemplaza 'ruta_de_la_imagen_del_empleado.jpg' con la ruta real)
            const imgData = this.urlFoto;
            await doc.addImage(imgData, 'JPEG', 15, 15, 60, 60);

            // Agregar los datos del empleado al PDF
            doc.text(`Documento: ${empleadoData.ci}`, 80, 30);
            doc.text(`Empleado: ${empleadoData.paterno} ${empleadoData.materno} ${empleadoData.nombres}`, 80, 40);
            doc.text(`Tipo de Empleado: ${empleadoData.nombreCargo}`, 80, 50);
            doc.text(`Gestión: ${empleadoData.gestionActual}`, 80, 60);

            // Generar el código QR con los datos del empleado
            const qrData = JSON.stringify(empleadoData);
            const qrCanvas = await QRCode.toCanvas(qrData);
            const qrImage = qrCanvas.toDataURL('image/png');

            // Agregar el código QR al PDF
            doc.addImage(qrImage, 'PNG', 15, 80, 40, 40);

            // Guardar el PDF con un nombre específico
            const nombrePDF = 'carnet_empleado.pdf';
            doc.save(nombrePDF);

            // Abre el PDF en una nueva ventana para su visualización antes de imprimir
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const printWindow = window.open(pdfUrl, '_blank');

            // Espera un momento antes de imprimir automáticamente
            setTimeout(() => {
                printWindow.print();
            }, 1500); // Ajusta el tiempo según sea necesario
        },

        imprimirCarnet() {
            // Preparar los datos del empleado
            const empleadoData = {
                ci: this.ci,
                paterno: this.paterno,
                materno: this.materno,
                nombres: this.nombres,
                nombreCargo: this.nombreCargo,
                gestionActual: this.gestionActual,
                // Añade otros datos si es necesario
            };

            // Generar el PDF del carné e imprimirlo
            this.generarPDFCarnet(empleadoData);
        },

        //#region Listados
        async listarEmpleados() {
            let me = this;
            await axios
                .get("/empleado/listarempleados/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosEmpleado = [];
                    } else {
                        me.datosEmpleado = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Modals
        showEmpleados() {
            this.empleadosModal = true
            this.listarEmpleados()
        },
        //#endregion
        //#region Seleccion de Datos
        seleccionarEmpleado(item) {
            this.nombres = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.email = item.emal;
            //this.fechaNacimiento = item.nacdte;
            this.ci = item.ci;
            this.telefono = item.tel;
            this.idCargo = item.idcarg;
            this.idDepartamento = item.iddep;
            this.idEmpleado = item.idempl;
            this.empleadosModal = false;
        },
        actualizarEMPLEADOImg() {
                this.actualizarempleadoIMG();
        },
        async actualizarempleadoIMG() {
            let me = this;
            await axios
                .post(
                    "/empleado/subirfoto", +
                   this.idEmpleado+
                    "," +
                    this.urlFoto 
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarEmpleados(me.idEmpleado);
                    me.limpiar();
                    me.closeEmpleado();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },
        //#endregion
        async startCamera() {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                this.$refs.camera.srcObject = this.stream;
            } catch (error) {
                console.error('Error iniciando la cámara:', error);
            }
        },
        stopCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
        },
        toggleCamera() {
            if (this.isCameraOpen) {
                this.stopCamera();
                this.isCameraOpen = false;
            } else {
                this.startCamera();
                this.isCameraOpen = true;
            }
        },
      
        
        async takePhoto() {
            const video = this.$refs.camera;
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/jpeg');
            this.urlFoto = dataURL;

            const archivo = this.dataURLToFile(dataURL, ''+this.nombres+'.jpg');
            await this.almacenarArchivo(archivo);

            this.urlFoto = "imagenes/"+this.nombres+".jpg";

            this.isPhotoTaken = true;
            this.showUrl = true;
            this.isShotPhoto = true;
            setTimeout(() => {
                this.isShotPhoto = false;
            }, 150);
        },

        async almacenarArchivo(documentoArchivo) {
            const formData = new FormData();
            formData.append('image', documentoArchivo);

            let me = this;
            await axios
                .post("/uploadFile/", formData)
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


        dataURLToFile(dataURL, fileName) {
                const arr = dataURL.split(',');
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], fileName, { type: mime });
        },



        resetPhoto() {
            this.isPhotoTaken = false;
            this.showUrl = false;
            this.urlFoto = '';
        },
    },

};
</script>