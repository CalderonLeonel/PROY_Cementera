<template>
    <v-card elevation="5" outlined shaped>
        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>TRANSPORTE</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Transportes</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="buscarTransportes" append-icon="mdi-magnify"
                                    label="BUSCAR TRANSPORTES" single-line hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table :headers="headersTransportes" :items="datosTransportes"
                                :search="buscarTransportes" :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="colorEstado(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>


                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                        @click="activar(item)" title="ACTIVAR TRANSPORTES">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                        @click="desactivar(item)" title="DESACTIVAR TRANSPORTES">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showEditFormatoModal(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showInfoFormato(item)"
                                        title="VER INFORMACION">
                                        mdi-eye
                                    </v-icon>
                                </template>

                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>

                <v-row>
                    <v-col cols="12">
                        <v-tabs horizontal color="#002245" center-active grow>
                            <v-tab>
                                <v-icon left>

                                    mdi-account-alert-outline
                                </v-icon>
                                DATOS
                                PERS
                            </v-tab>
                            <v-tab>
                                <v-icon left>
                                    mdi-truck
                                </v-icon>
                                ASIGNAR
                                TRANS
                            </v-tab>
                            <v-tab>
                                <v-icon left>
                                    mdi-format-list-checkbox
                                </v-icon>
                                EXPE
                                FORM
                            </v-tab>

                            <v-tab-item v-if="flag == 1">
                                <v-card elevation="5" outlined shaped>
                                    <v-row>
                                        <v-col cols="12" hidden>
                                            <v-list-item>
                                                <v-list-item-title class="text-center">
                                                    <h5>DATOS PERSONALES</h5>
                                                </v-list-item-title>
                                            </v-list-item>

                                            <v-data-table :headers="headersChofer" :items="datos" :search="searchChofer"
                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                <template #[`item.actions`]="{ item }">

                                                    <v-icon small class="mr-2" @click="llenarCamposChofer(item)"
                                                        title="ACTUALIZAR INFORMACION">
                                                        mdi-text-box-edit-outline
                                                    </v-icon>
                                                    <v-icon small class="mr-2" @click="seleccionarDelFormAcad(item)"
                                                        title="ELIMINAR INFORMACION">
                                                        mdi-delete
                                                    </v-icon>
                                                </template>
                                            </v-data-table>
                                        </v-col>

                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="2">
                                            <v-list-item>
                                                <v-list-item-title class="text-left">
                                                    <h5>FOTOGRAFIA CHOFER</h5>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-col>
                                        <v-col cols="12" md="8"></v-col>


                                        <v-col cols="12" md="5"></v-col>
                                        <v-col cols="12" md="3" class="camera-box" :class="{ 'flash': isShotPhoto }"
                                            v-if="isCameraOpen" v-show="!isLoading">
                                            <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>
                                            <v-col>
                                                <video v-show="!isPhotoTaken" ref="camera"
                                                    style="width: 313px; height: 230px; " autoplay align-center></video>
                                                <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas"
                                                    style="width: 313px; height: 230px; "></canvas>
                                            </v-col>
                                            <v-col v-if="isPhotoTaken" class="camera-shoot">

                                            </v-col>

                                        </v-col>
                                        <v-col cols="12" md="4"></v-col>


                                        <v-col cols="12" md="8"></v-col>
                                        <v-col cols="12" md="4">
                                            <v-toolbar dense shaped color="#002245">
                                                <v-toolbar-title style="color:#ffffff">
                                                    <h6>OPCIONES</h6>
                                                </v-toolbar-title>
                                                <v-btn class="mx-2" fab dark x-small color="#EE680B" style="float: left;"
                                                    title="FOTO CHOFER"
                                                    :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
                                                    @click="toggleCamera">
                                                    <v-icon v-if="!isCameraOpen"> mdi-camera-plus</v-icon>
                                                    <v-icon v-else="">mdi-camera-off</v-icon>
                                                </v-btn>
                                                <v-btn v-model="file" @click="takePhoto()" class="mx-2" fab dark x-small
                                                    color="#EE680B" title="TOMAR FOTO" style="float: left">
                                                    <v-icon dark> mdi-camera </v-icon>
                                                </v-btn>
                                                <v-btn v-model="file" @click="actualizarChoferImg()" class="mx-2" fab dark
                                                    x-small color="#EE680B" title="GUARDAR FOTO" style="float: left">
                                                    <v-icon dark> mdi-cloud-upload </v-icon>
                                                </v-btn>
                                            </v-toolbar>
                                        </v-col>

                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="4">
                                            <v-list-item>
                                                <v-list-item-title class="text-left">
                                                    <h5>DATOS PERSONALES</h5>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-col>
                                        <v-col cols="12" md="6"></v-col>


                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="nombres" :counter="30" :rules="nombreChoferRules"
                                                @input="nombres = nombres.toUpperCase()" label="NOMBRE(S)"
                                                required></v-text-field>
                                        </v-col>


                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="paterno" :counter="40" :rules="apellidoPatChoferRules"
                                                @input="paterno = paterno.toUpperCase()" label="APELLIDO PATERNO" required>
                                            </v-text-field>
                                        </v-col>


                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="materno" :counter="40" :rules="apellidoMatChoferRules"
                                                @input="materno = materno.toUpperCase()" label="APELLIDO MATERNO" required>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="3">
                                            <v-text-field :rules="numeroDocumentoChoferRules" v-model="num_documento"
                                                :counter="10" @input="areaEstudios = areaEstudios.toUpperCase()" :value="1"
                                                label="NÚMERO DOCUMENTO" required>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="direccionChofer" :rules="direccionChoferRules"
                                                :counter="70" @input="direccionChofer = direccionChofer.toUpperCase()"
                                                label="DIRECCIÓN" required>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="nacionalidad" :rules="nacionalidadChoferRules"
                                                :counter="10" @input="nacionalidad = nacionalidad.toUpperCase()"
                                                label="NACIONALIDAD" required>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="telefono" :rules="telefonoChoferRules" type="number"
                                                :counter="10" @input="telefono = telefono.toUpperCase()" label="TELEFONO">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="fechaNaci" :rules="fechaChoferRules" type="date"
                                                :value="2" label="FECHA NACIMIENTO">
                                            </v-text-field>
                                        </v-col>

                                        <v-col class="d-flex" cols="12" md="3">
                                            <v-select v-model="selectGenero" :items="datosGenero" :rules="generoChoferRules"
                                                item-text="sex" item-value="sex" label="GÉNERO" filled dense required solo>

                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" md="1"></v-col>

                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="1">
                                            <v-btn class="mx-2" fab dark x-small color="#EE680B" @click="showPais()"
                                                style="float: right" title="BUSCAR PAIS">
                                                <v-icon dark> mdi-gesture-double-tap </v-icon>
                                            </v-btn>

                                        </v-col>
                                        <v-col cols="12" md="2">
                                            <v-text-field v-model="selectPais" :rules="paisRules" label="PAIS" disabled
                                                required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                            <v-btn class="mx-2" fab dark x-small color="#EE680B" @click="showCiudad()"
                                                style="float: right" title="BUSCAR CIUDAD">
                                                <v-icon dark> mdi-gesture-double-tap </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12" md="2">
                                            <v-text-field v-model="selectCiudad" :rules="ciudadRules" label="CIUDAD"
                                                disabled required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">
                                            <v-text-field type=number v-model="nit" :rules="nitRules" label="NIT"
                                                :counter="20" required></v-text-field>
                                        </v-col>


                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="4">
                                            <v-list-item>
                                                <v-list-item-title class="text-left">
                                                    <h5>DATOS DEL CARRO</h5>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-col>
                                        <v-col cols="12" md="6"></v-col>

                                        <v-col cols="12" md="2"></v-col>
                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="placa" :rules="placaRules"
                                                @input="placa = placa.toUpperCase()" :value="2" type="text" label="PLACA">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">
                                            <v-text-field v-model="modelo" :rules="modeloChoferRules" type="text"
                                                @input="modelo = modelo.toUpperCase()" :value="2" label="MODELO">
                                            </v-text-field>
                                        </v-col>



                                        <v-col cols="12" md="8"> </v-col>
                                        <v-col cols="12" md="4">
                                            <v-toolbar dense shaped color="#002245">
                                                <v-toolbar-title style="color:#ffffff">
                                                    <h6>OPCIONES</h6>
                                                </v-toolbar-title>
                                                <v-btn v-if="act == 1" class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="actualizarChofer()" style="float: left"
                                                    title="ACTUALIZAR CHOFER">
                                                    <v-icon dark> mdi-account-edit-outline </v-icon>
                                                </v-btn>
                                                <v-btn v-if="act == 0" class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="actualizarChofer()" style="float: left"
                                                    title="REGISTRAR CHOFER">
                                                    <v-icon dark> mdi-account-check </v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab dark x-small color="#EE680B" @click="limpiar()"
                                                    style="float: left" title="LIMPIAR FORMULARIO">
                                                    <v-icon dark> mdi-eraser </v-icon>
                                                </v-btn>
                                            </v-toolbar>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item v-if="flag == 1">
                                <v-card elevation="5" outlined shaped>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-list-item>
                                                <v-list-item-title class="text-center">
                                                    <h5>SOLICITUDES DE MOVIMIENTO</h5>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-col cols="12">
                                                <v-card-title>
                                                    <v-text-field v-model="buscarMovimientos" append-icon="mdi-magnify"
                                                        label="BUSCAR MOVIMIENTOS" single-line hide-details></v-text-field>
                                                </v-card-title>
                                            </v-col>
                                            <v-data-table :headers="headersFormacionAcad" :items="datosFormacionAcademica"
                                                :search="buscarMovimientos" :items-per-page="5" class="elevation-1"
                                                id="tableId">

                                                <template #[`item.actions`]="{ item }">
                                                    <v-icon small class="mr-2" @click="seleccionarMovimiento(item)"
                                                        title="ACTUALIZAR INFORMACION">
                                                        mdi-pencil
                                                    </v-icon>
                                                    <v-icon small class="mr-2" @click="seleccionarDelFormAcad(item)"
                                                        title="ELIMINAR INFORMACION">
                                                        mdi-delete-forever
                                                    </v-icon>
                                                </template>
                                            </v-data-table>


                                        </v-col>












                                        <v-col cols="12" md="8"> </v-col>
                                        <v-col cols="12" md="4">
                                            <v-toolbar dense shaped color="#002245">
                                                <v-toolbar-title style="color:#ffffff">
                                                    <h6>OPCIONES</h6>
                                                </v-toolbar-title>
                                                <v-btn v-if="botonAct == 1" class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="actualizarChoferAsignado()" style="float: left"
                                                    title="ACTUALIZAR INFORMACIÓN">
                                                    <v-icon dark> mdi-account-edit-outline </v-icon>
                                                </v-btn>
                                                <v-btn v-if="botonAct == 0" class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="asignarChoferTransporte()" style="float: left"
                                                    title="REGISTRAR FORMACIÓN ACADEMICA">
                                                    <v-icon dark> mdi-account-check </v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="limpiarFormAcad()" style="float: left"
                                                    title="LIMPIAR FORMULARIO">
                                                    <v-icon dark> mdi-eraser </v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="showCompromiso()" style="float: left" title="VER CURRICULUM">
                                                    <v-icon dark> mdi-file-document-edit-outline </v-icon>
                                                </v-btn>
                                                <!--v-btn class="mx-2" fab dark x-small color="#EE680B" @click="eliminarItem()" style="float: left"
                          title="BUSCAR Chofer">
                          <v-icon dark> mdi-account-search </v-icon>
                        </v-btn-->
                                            </v-toolbar>
                                        </v-col>




                                    </v-row>



                                </v-card>
                            </v-tab-item>

                            <v-tab-item v-if="flag == 1">
                                <v-card elevation="5" outlined shaped>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-list-item>
                                                <v-list-item-title class="text-center">
                                                    <h5>OTRAS EXPERIENCIAS FORMATIVAS</h5>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-col cols="12">
                                                <v-card-title>
                                                    <v-text-field v-model="searchExpFormativas" append-icon="mdi-magnify"
                                                        label="BUSCAR DETALLE" single-line hide-details></v-text-field>
                                                </v-card-title>
                                            </v-col>
                                            <v-data-table :headers="headersExpFormativas" :items="datosExpFormativa"
                                                :search="searchExpFormativas" :items-per-page="5" class="elevation-1"
                                                id="tableId">

                                                <template #[`item.actions`]="{ item }">
                                                    <!--v-icon small class="mr-2" @click="seleccionarDocumento(item)">
                                                            mdi-check-bold
                                                          </v-icon-->
                                                    <v-icon small class="mr-2" @click="llenarCamposExpFormativa(item)"
                                                        title="ACTUALIZAR INFORMACION">
                                                        mdi-pencil
                                                    </v-icon>
                                                    <v-icon small class="mr-2" @click="seleccionarDelExpForm(item)"
                                                        title="ELIMINAR INFORMACION">
                                                        mdi-delete-forever
                                                    </v-icon>
                                                </template>
                                            </v-data-table>


                                        </v-col>
                                        <v-col cols="12" md="12" hidden>
                                            <v-list-item>
                                                <v-list-item-title>
                                                    <h5>OTRAS EXPERIENCIAS FORMATIVAS</h5>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-col>
                                        <v-col cols="12" md="2"> </v-col>
                                        <v-col cols="12" md="10">


                                            <v-col cols="12" md="10">
                                                <v-text-field v-model="descripcioExpForm" :counter="300"
                                                    :rules="otraExpRules"
                                                    @input="descripcioExpForm = descripcioExpForm.toUpperCase()"
                                                    label="DESCRIPCIÓN" required>
                                                </v-text-field>

                                            </v-col>



                                        </v-col>



                                        <v-col cols="12" md="8"> </v-col>
                                        <v-col cols="12" md="4">
                                            <v-toolbar dense shaped color="#002245">
                                                <v-toolbar-title style="color:#ffffff">
                                                    <h6>OPCIONES</h6>
                                                </v-toolbar-title>
                                                <v-btn v-if="botonAct == 1" class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="actualizarExpFormativa()" style="float: left"
                                                    title="ACTUALIZAR INFORMACIÓN">
                                                    <v-icon dark> mdi-account-edit-outline </v-icon>
                                                </v-btn>
                                                <v-btn v-if="botonAct == 0" class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="registrarExpFormativa()" style="float: left"
                                                    title="REGISTRAR EXPERIENCIA FORMATIVA">
                                                    <v-icon dark> mdi-account-check </v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="limpiarExpFormativa()" style="float: left"
                                                    title="LIMPIAR FORMULARIO">
                                                    <v-icon dark> mdi-eraser </v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab dark x-small color="#EE680B"
                                                    @click="showCompromiso()" style="float: left" title="VER CURRICULUM">
                                                    <v-icon dark> mdi-file-document-edit-outline </v-icon>
                                                </v-btn>
                                                <!--v-btn class="mx-2" fab dark x-small color="#EE680B" @click="eliminarItem()" style="float: left"
                          title="BUSCAR Chofer">
                          <v-icon dark> mdi-account-search </v-icon>
                        </v-btn-->
                                            </v-toolbar>
                                        </v-col>





                                    </v-row>



                                </v-card>
                            </v-tab-item>

                        </v-tabs>


                    </v-col>
                </v-row>
            </v-card-actions>




            <v-list-item> </v-list-item>
            <div class="text-center">
                <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                    <strong>{{ mensajeSnackbar }}</strong>


                    <template v-slot:action="{ attrs }">
                        <v-icon right v-bind="attrs" @click="snackbarOK = false">
                            mdi-close
                        </v-icon>
                    </template>
                </v-snackbar>
            </div>
            <div class="text-center">

                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                    <strong>{{ mensajeSnackbarError }}</strong>

                    <template v-slot:action="{ attrs }">
                        <v-icon right v-bind="attrs" @click="snackbarError = false">
                            mdi-close
                        </v-icon>
                    </template>
                </v-snackbar>
            </div>
        </v-card>
    </v-card>
</template>
<script>

import axios from "axios"

export default {
    data() {
        return {
            flag: 1,
            //AperturaCamara
            isCameraOpen: false,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            imageUrl: 0,
            file: null,

        }
    },

    created: function () {

    },

    methods: {
        //Implementacion del uso de la camara
        //Apertura de la camara

        toggleCamera() {
            if (this.isCameraOpen) {
                this.isCameraOpen = false;
                this.isPhotoTaken = false;
                this.isShotPhoto = false;
                this.stopCameraStream();
            } else {
                this.isCameraOpen = true;
                this.createCameraElement();
            }
        },


        //Creamos el elemento camara
        createCameraElement() {
            this.isLoading = true;

            const constraints = (window.constraints = {
                audio: false,
                video: true
            });
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    this.isLoading = false;
                    alert("Puede ser que la version de su ordenador no soporte o haya ocurrido otro problema, comuniquese con ASI");
                });
        },

        //Detenemos el uso de la camara
        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });
        },

        //Tomamos la foto

        async takePhoto() {
            const camera = this.$refs.camera;
            const canvas = this.$refs.canvas;



            if (!this.isPhotoTaken) {
                this.isShotPhoto = true;

                const FLASH_TIMEOUT = 50;

                setTimeout(() => {
                    this.isShotPhoto = false;
                }, FLASH_TIMEOUT);
            }

            this.isPhotoTaken = !this.isPhotoTaken;

            const context = canvas.getContext('2d');

            context.drawImage(camera, 0, 0, canvas.width, canvas.height);
            this.showUrl = false;
            this.showUrl2 = false;

            // Toma una captura de pantalla de la imagen y la convierte en un blob

            const photoBlob = await new Promise(resolve => canvas.toBlob(resolve));



            // Envía la imagen al servidor usando Axios
            const formData = new FormData();
            formData.append('photo', photoBlob, this.unicodigo + '.jpg');
            formData.append('tipo', 'Chofer'); // Incluye el valor de tipo en el cuerpo de la solicitud
            await axios.post('/upload', formData);



            // Detiene la cámara y elimina los objetos de video y canvas
            camera.srcObject = null;
            this.drawPhoto2(this.$refs.canvas, this.$refs.canvas2);
            this.drawPhoto3();
        },

        drawPhoto2(srcCanvas, destCanvas) {
            const contextSrc = srcCanvas.getContext('2d');
            const contextDest = destCanvas.getContext('2d');
            const imgData = contextSrc.getImageData(0, 0, destCanvas.width, destCanvas.height);
            contextDest.putImageData(imgData, 0, 0);
        },
        drawPhoto3() {
            const context = this.$refs.canvas.getContext('2d');
            const context3 = this.$refs.canvas3.getContext('2d');
            context3.drawImage(this.$refs.canvas, 0, 0, 313, 230, 0, 0, 313, 230);
        },
    },
}
</script>