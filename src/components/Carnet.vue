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
                {{ mensajeSnackbar }}
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarOK = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
        <div class="text-center">
            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error">
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
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeEmployeesModal()" style="float: right"
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

        <v-simple-table style="border: hidden">
            <template>
                <thead bgcolor="error">

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
                   <!-- <tr style="background-color: #ffffff">
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
                    </tr>-->
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
        <v-card style="width: 100px; height: 100px; position: relative;">
            <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>

            <v-img v-if="showUrl" :src="urlFoto" style="width: 100px; height: 100px;"></v-img>

            <div v-else>
                <video 
                    v-show="!isPhotoTaken" 
                    ref="camera" 
                    style="width: 100px; height: 100px; object-fit: cover;" 
                    autoplay>
                </video>
                <canvas 
                    v-show="isPhotoTaken" 
                    id="photoTaken" 
                    ref="canvas" 
                    style="width: 100px; height: 100px;">
                </canvas>
            </div>
        </v-card>
    </div>

    <v-list-item></v-list-item>

        <v-col cols="12" md="4">
            <v-toolbar dense shaped color="#ffffff">
                <v-toolbar-title style="color:#000000FF">
                    <h6>OPCIONES</h6>
                </v-toolbar-title>

                <v-btn :disabled="!buttonsAreEnabled"
                    class="mx-2" 
                    fab dark x-small 
                    color="primary" 
                    style="float: left;" 
                    title="FOTO EMPLEADO" 
                    :class="{ 'is-primary': !this.isCameraOpen, 'is-danger': this.isCameraOpen }" 
                    @click="toggleCamera">
                    <v-icon v-if="!this.isCameraOpen">mdi-camera-plus</v-icon>
                    <v-icon v-else="">mdi-camera-off</v-icon>
                </v-btn>
                <v-btn :disabled="!buttonsAreEnabled"
                    v-model="file" 
                    @click="takePhoto()" 
                    class="mx-2" 
                    fab dark x-small 
                    color="#0ABF55" 
                    title="TOMAR FOTO" 
                    style="float: left">
                    <v-icon dark>mdi-camera</v-icon>
                </v-btn>
                <v-btn :disabled="!buttonsAreEnabled"
                    v-model="file" 
                    @click="actualizarEMPLEADOImg()" 
                    class="mx-2" 
                    fab dark x-small 
                    color="#0A62BF" 
                    title="GUARDAR FOTO" 
                    style="float: left">
                    <v-icon dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <v-btn :disabled="!buttonsAreEnabled"
                    class="mx-2" 
                    fab dark x-small 
                    color="warning" 
                    @click="imprimirCarnet()" 
                    style="float: left" 
                    title="IMPRIMIR CARNET">
                    <v-icon dark>mdi-printer-outline</v-icon>
                </v-btn>
                <v-btn 
                    class="mx-2" 
                    fab dark x-small 
                    
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
            archivo: "",
            file: "",
            close:"",

            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeError: "",
            timeout: 2000,

            isShotPhoto: false,
            showUrl: false,
            urlFoto: '',
            isCameraOpen: false,
            isPhotoTaken: false,
            isLoading: false,
            stream: null,

            buttonsAreEnabled: false,

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
    try {
        const doc = new jsPDF();

   
        const primaryColor = [0, 161, 177]; 
        const secondaryColor = [0, 0, 0];  


        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 20, 'F');


        doc.setTextColor(...secondaryColor);
        doc.setFontSize(14);
        doc.text("CARNET DE EMPLEADO", 105, 10, { align: "center" });


        const imgData = this.urlFoto;
        if (!imgData) {
            throw new Error("La URL de la foto no está disponible.");
        }
        await doc.addImage(imgData, 'JPEG', 15, 25, 60, 60);


        doc.setTextColor(...secondaryColor);
        doc.setFontSize(12);
        doc.text(`Documento: ${empleadoData.ci}`, 80, 40);
        doc.text(`Empleado: ${empleadoData.paterno} ${empleadoData.materno} ${empleadoData.nombres}`, 80, 50);


        const qrData = JSON.stringify(empleadoData);
        const qrCanvas = await QRCode.toCanvas(qrData);
        const qrImage = qrCanvas.toDataURL('image/png');

 
        doc.addImage(qrImage, 'PNG', 15, 90, 40, 40);

   
                const nombrePDF = 'carnet_empleado.pdf';
                const pdfBlob = doc.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);

                const printWindow = window.open(pdfUrl, '_blank');
                if (printWindow) {
                    setTimeout(() => {
                        printWindow.print();
                        URL.revokeObjectURL(pdfUrl); 
                    }, 1500);
                } else {
                    console.warn("El navegador bloqueó la ventana emergente. Habilita las ventanas emergentes para continuar.");
                }
            } catch (error) {
                console.error("Error al generar el carnet del empleado:", error);
            }
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
            this.urlFoto = item.url;
            this.idCargo = item.idcarg;
            this.idDepartamento = item.iddep;
            this.idEmpleado = item.idempl;
            this.getPhoto();
            this.buttonsAreEnabled = true;
            this.empleadosModal = false;
        },
        actualizarEMPLEADOImg() {
                this.almacenarArchivo(this.archivo);

                const date = new Date();
                this.urlFoto = this.idEmpleado+'_'+date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear()+'.jpg';
              
                this.editarImagenDeEmpleado(this.idEmpleado,this.urlFoto);
               
        },

        async editarImagenDeEmpleado() {
            let me = this;
           
            await axios
                .post(
                    "/empleado/subirfoto/" +
                    this.idEmpleado +
                    "," +
                    this.urlFoto
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;

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

            this.archivo = this.dataURLToFile(dataURL, this.idEmpleado+'.jpg');
     


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
                .post("/uploadimage/", formData)
                .then(function (response) {
          
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
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

        getPhoto() {
            let me = this;
            var path = this.urlFoto; 
            axios
                .get("/documento/descargarImagen/" + path, { responseType: 'blob' })  
                .then(function (response) {
                    
                    const url = URL.createObjectURL(response.data);  
                    me.urlFoto = url;  

                    me.mensajeSnackbar = 'Imagen cargada con éxito';
                    me.snackbarOK = true;
                    me.showUrl = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    console.error('Error al cargar la foto:', error);
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


        resetPhoto() {
            this.isPhotoTaken = false;
            this.showUrl = false;
            this.urlFoto = '';
        },

        closeEmployeesModal() {
            this.empleadosModal = false;
            this.resetPhoto();
            this.buttonsAreEnabled = false;
        },
    },

};
</script>