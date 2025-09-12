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

        <v-dialog v-model="empleadosModal" max-width="1200" persistent class="text-center">
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
                                        <v-icon large class="mr-2" @click="seleccionarEmpleado(item)" color="#0A62BF">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>

                            <v-col cols="10"> </v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeEmployeeModal()" style="float: right"
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
                            {{ paterno }} {{ materno ? ' ' + materno : '' }} {{ nombres }}
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
            <h5>FOTOGRAFÍA</h5>
        </v-list-item-title>
    </v-list-item>


    <div style="display: flex; justify-content: center; align-items: center; position: relative;">
        <v-card style="width: 300px; height: 300px; position: relative;">
            <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>

            <v-img v-if="showUrl" :src="urlFoto" style="width: 300px; height: 300px;"></v-img>

            <div v-else>
                <video 
                    v-show="!isPhotoTaken" 
                    ref="camera" 
                    style="width: 300px; height: 300px; object-fit: cover;" 
                    autoplay>
                </video>
                <canvas 
                    v-show="isPhotoTaken" 
                    id="photoTaken" 
                    ref="canvas" 
                    style="width: 300px; height: 300px;">
                </canvas>
            </div>
        </v-card>
    </div>

    <v-list-item></v-list-item>


            <v-toolbar dense shaped color="#ffffff">
                <v-toolbar-title style="color:#000000FF">
                    <h6>OPCIONES</h6>
                </v-toolbar-title>

                <v-btn :disabled="!buttonsAreEnabled"
                    class="mx-2" 
                     dark x-small
                    color="primary" 
                    style="float: left;" 
                    title="HABILITAR CÁMARA" 
                    :class="{ 'is-primary': !this.isCameraOpen, 'is-danger': this.isCameraOpen }" 
                    @click="toggleCamera()">
                    <v-icon v-if="!this.isCameraOpen">mdi-camera-plus</v-icon>
                    <v-icon v-else="">mdi-camera-off</v-icon>
                     HABILITAR CÁMARA
                </v-btn>
                <v-btn :disabled="!buttonsAreEnabled || !isCameraOpen"
                    v-model="file" 
                    @click="takePhoto()" 
                    class="mx-2" 
                    dark x-small
                    color="#0ABF55" 
                    title="TOMAR FOTO" 
                    style="float: left">
                    <v-icon dark>mdi-camera</v-icon>
                    TOMAR FOTOGRAFÍA
                </v-btn>
                <v-btn :disabled="!buttonsAreEnabled || !isCameraOpen"
                    v-model="file" 
                    @click="actualizarEMPLEADOImg()" 
                    class="mx-2" 
                    dark x-small
                    color="#0A62BF" 
                    title="GUARDAR FOTO" 
                    style="float: left">
                    <v-icon dark>mdi-cloud-upload</v-icon>
                    GUARDAR FOTOGRAFÍA
                </v-btn>
                <v-btn :disabled="!buttonsAreEnabled"
                    class="mx-2" 
                    dark x-small
                    color="warning" 
                    @click="imprimirCarnet()" 
                    style="float: left" 
                    title="IMPRIMIR CARNET">
                    <v-icon dark>mdi-printer-outline</v-icon>
                    IMPRIMIR CARNET
                </v-btn>
                <v-btn 
                    class="mx-2" 
                     dark x-small 
                    
                    @click="showEmpleados()" 
                    style="float: right" 
                    title="BUSCAR EMPLEADO">
                    <v-icon dark>mdi-account-search</v-icon>
                    BUSCAR EMPLEADO
                </v-btn>
            </v-toolbar>
    
    </v-card>


    </v-card>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import QRCode from 'qrcode';
import imgLogo from "./../assets/logodrymix.png";

export default {
    data() {
        return {
            valid: true,
            user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },
            flag: 1,

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
            originalPhotoPath: '',
            objectUrl: null,

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
    computed: {
        logueado() {
            if (this.user != null) {
                this.user = JSON.parse(sessionStorage.getItem('session'));
            }
            return this.user;
        }
    },
    created: function () {
        this.usuario = this.user.personal;
            this.id_sede = this.user.id_sede;
            this.nomus = this.user.nombres + ' ' + this.user.paterno + ' ' + this.user.materno;
            this.patus = this.user.paterno;
            this.matus = this.user.materno;
        if (this.user != null) {
            this.user = JSON.parse(sessionStorage.getItem('session'));
            
        }
        if (this.user == null) {
            if (this.$route.path != '/login') {
                this.$router.push("/login");
            }
        }
        console.log("UserData: " + JSON.stringify(this.user));

        

        //this.listarGestion();
        //this.toDataURL();
        //this.datosCampoCarnet();
    },

    methods: {
        async generarPDFCarnet(empleadoData) { 
            try {
                const doc = new jsPDF({
                    orientation: "landscape",
                    unit: "mm",
                    format: [85, 54] // tamaño estándar tarjeta ID
                });
                // Convertidor de Image to base64
                const toBase64 = async (url) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });
                };

                // Colores
                const primaryColor = [0, 161, 177];
                const secondaryColor = [255, 255, 255];

                // Fondo con bordes redondeados
                doc.setFillColor(...primaryColor);
                doc.roundedRect(0, 0, 85, 54, 5, 5, "F");

                // Header blanco
                doc.setFillColor(255, 255, 255);
                doc.rect(0, 0, 85, 12, "F");

                // Logo empresa en el encabezado
                const base64Logo = await toBase64(imgLogo);

                // Insertar logo en PDF
                doc.addImage(base64Logo, "PNG", 4, 2, 17, 8);
                // Texto del Header
                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);
                doc.setTextColor(...primaryColor);
                doc.text("CARNET DE EMPLEADO", 50, 8, { align: "center" });

                // Foto del empleado 
                const imgData = this.urlFoto;
                if (!imgData) throw new Error("La Foto del empleado no está disponible.");
                if (imgData) {
                    doc.addImage(imgData, "JPEG", 3, 15, 26, 30);
                }

                // Datos de empleado
                doc.setTextColor(...secondaryColor);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(9);

                doc.text("Nombres:", 33, 18);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(7);
                doc.text(`${empleadoData.paterno} ${empleadoData.materno || ""} ${empleadoData.nombres}`, 33, 22, { maxWidth: 45 });

                doc.setFont("helvetica", "bold");
                doc.setFontSize(9);
                doc.text("Número de Carnet:", 33, 30);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(7);
                doc.text(`${empleadoData.ci}`, 33, 34);

                doc.setFont("helvetica", "bold");
                doc.setFontSize(9);
                doc.text("Teléfonos:", 33, 38);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(7);
                doc.text(`${empleadoData.telefono}`, 33, 42);

                // QR Empleado
                const qrData = JSON.stringify(empleadoData.id);
                const qrCanvas = await QRCode.toCanvas(qrData);
                const qrImage = qrCanvas.toDataURL("image/png");
                doc.addImage(qrImage, "PNG", 63, 30, 18, 18);

                // Footer
                doc.setFillColor(255, 255, 255);
                doc.rect(0, 48, 85, 6, "F");

                doc.setFont("helvetica", "bold");
                doc.setFontSize(7);
                doc.setTextColor(...primaryColor);
                doc.text("DRYMIX BOLIVIA - www.drymixbolivia.com", 42.5, 52, { align: "center" });

                // 📄 Exportar PDF
                const pdfBlob = doc.output("blob");
                const pdfUrl = URL.createObjectURL(pdfBlob);

                const printWindow = window.open(pdfUrl, "_blank");
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
            const empleadoData = {
                id: this.idEmpleado,
                nombres: this.nombres,
                paterno: this.paterno,
                materno: this.materno,
                ci: this.ci,
                telefono: this.telefono,
                nombreCargo: this.nombreCargo,
                gestionActual: this.gestionActual,
            };

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
            this.listarEmpleados();
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
            this.originalPhotoPath = item.url;
            this.getPhoto( this.originalPhotoPath);
            this.buttonsAreEnabled = true;
            this.empleadosModal = false;
        },
        actualizarEMPLEADOImg() {
                this.almacenarArchivo(this.archivo);

                const date = new Date();
                const newName = this.idEmpleado+'_'+date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear()+'.jpg';
                this.urlFoto = newName;
                this.editarImagenDeEmpleado(this.idEmpleado, newName).then(() => this.getPhoto(newName));
        },   

        async editarImagenDeEmpleado(idEmpleado, nombreFoto) {
            let me = this;
           
            await axios
                .post(
                    "/empleado/subirfoto/" +
                    idEmpleado +
                    "," +
                    nombreFoto
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;

                    me.originalPhotoPath = nombreFoto;

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    throw error;
                });
        },

        //#endregion
        async startCamera() {
            try {
                this.showUrl = false;
                this.isPhotoTaken = false;
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
                this.recoverPhoto();
            } else {
                this.showUrl = false;
                this.isPhotoTaken = false;
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

        getPhoto(path) {
            let me = this;

            if (!path || typeof path !== 'string' || !path.trim()) return;

            axios
                .get("/documento/descargarImagen/" + path, { responseType: 'blob' })  
                .then(function (response) {
                    
                    if (me.objectUrl) URL.revokeObjectURL(me.objectUrl);
                    const url = URL.createObjectURL(response.data);
                    me.objectUrl = url; 

                    me.urlFoto = url;  
                    me.showUrl = true;
                    me.isPhotoTaken = false;

                    me.mensajeSnackbar = 'Imagen cargada con éxito';
                    me.snackbarOK = true;

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    console.error('Error al cargar la foto:', error);
                });
        },


         recoverPhoto() {
            if (this.originalPhotoPath) {
                this.getPhoto(this.originalPhotoPath);
            } 
            else{
                this.showUrl = false;
            }
           
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

        closeEmployeeModal() {
            this.empleadosModal = false;
            this.resetPhoto();
            this.buttonsAreEnabled = false;
        },
    },

};
</script>