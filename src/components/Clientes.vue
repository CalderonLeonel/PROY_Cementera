<template>
    <v-card elevation="5" outlined shaped>

        <v-dialog v-model="agregarClienteModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR CLIENTE</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombresCliente" label="NOMBRE CLIENTE" :counter="100"
                                        :rules="nombresClienteRules" @input="nombresCliente = nombresCliente.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="paterno" label="PATERNO CLIENTE" :counter="100"
                                        :rules="paternoRules" @input="paterno = paterno.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="materno" label="MATERNO CLIENTE" :counter="100"
                                        :rules="maternoRules" @input="materno = materno.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nit" label="NIT CLIENTE" :counter="100" :rules="nitRules"
                                        @input="nit = nit.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="fechaNacimiento" label="FECHA NACIMIENTO"
                                        type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="correo" label="CORREO CLIENTE" :rules="correoRules" type="email"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="celular" label="CELULAR CLIENTE" :counter="100"
                                        :rules="celularRules" @input="celular = celular.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="telefono" label="TELEFONO CLIENTE" :counter="100"
                                        :rules="telefonoRules" @input="telefono = telefono.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                               
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon v-if="botonact == 1" color="#EE680B" @click="actualizarCliente()"
                                            style="float: left" title="ACTUALIZAR INFORMACIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="#EE680B" @click="registrarCliente()"
                                            style="float: left" title="REGISTRAR CLIENTE" width="28px" height="28px">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon color="#EE680B" @click="limpiar()" style="float: left"
                                            title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="10"></v-col>
        
                                <v-col cols="12" sm="4" md="2">
                                    <v-btn iconv dark color="#00A1B1" @click="closeAgregarCliente()"
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

        <v-dialog v-model="infoClienteModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DEL CLIENTE:</span><br>
                    <span>{{ nombreCliente }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombresCliente" label="NOMBRE CLIENTE" :counter="100"
                                        :rules="nombresClienteRules" @input="nombresCliente = nombresCliente.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="paterno" label="PATERNO CLIENTE" :counter="100"
                                        :rules="paternoRules" @input="paterno = paterno.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="materno" label="MATERNO CLIENTE" :counter="100"
                                        :rules="maternoRules" @input="materno = materno.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nit" label="NIT CLIENTE" :counter="100" :rules="nitRules"
                                        @input="nit = nit.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="fechaNacimiento" label="FECHA NACIMIENTO"
                                        type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="correo" label="CORREO CLIENTE" :rules="correoRules" type="email"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="celular" label="CELULAR CLIENTE" :counter="100"
                                        :rules="celularRules" @input="celular = celular.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="telefono" label="TELEFONO CLIENTE" :counter="100"
                                        :rules="telefonoRules" @input="telefono = telefono.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                              
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon v-if="botonact == 1" color="#EE680B" @click="actualizarCliente()"
                                            style="float: left" title="ACTUALIZAR INFORMACIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="#EE680B" @click="registrarCliente()"
                                            style="float: left" title="REGISTRAR CLIENTE" width="28px" height="28px">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon color="#EE680B" @click="limpiar()" style="float: left"
                                            title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="12" sm="4" md="2">
                                    <v-btn iconv dark color="#00A1B1" @click="closeInfoClienteModal()"
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

        <v-dialog v-model="editClienteModal" persistent max-width="700px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>ACTUALIZAR CLIENTE</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombresCliente" label="NOMBRE CLIENTE" :counter="100"
                                        :rules="nombresClienteRules" @input="nombresCliente = nombresCliente.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="paterno" label="PATERNO CLIENTE" :counter="100"
                                        :rules="paternoRules" @input="paterno = paterno.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="materno" label="MATERNO CLIENTE" :counter="100"
                                        :rules="maternoRules" @input="materno = materno.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nit" label="NIT CLIENTE" :counter="100" :rules="nitRules"
                                        @input="nit = nit.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="fechaNacimiento" label="FECHA NACIMIENTO"
                                        type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="correo" label="CORREO CLIENTE" :rules="correoRules" type="email"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="celular" label="CELULAR CLIENTE" :counter="100"
                                        :rules="celularRules" @input="celular = celular.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="telefono" label="TELEFONO CLIENTE" :counter="100"
                                        :rules="telefonoRules" @input="telefono = telefono.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                                           
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon v-if="botonact == 1" color="#EE680B" @click="actualizarCliente()"
                                            style="float: left" title="ACTUALIZAR INFORMACIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonact == 0" color="#EE680B" @click="registrarCliente()"
                                            style="float: left" title="REGISTRAR CLIENTE" width="28px" height="28px">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon color="#EE680B" @click="limpiar()" style="float: left"
                                            title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="10"></v-col>
        
                                    <v-col cols="12" sm="4" md="2">
                                    <v-btn iconv dark color="#00A1B1" @click="closeEditClienteModal()"
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

        <v-dialog v-model="clientesInhabilitadasModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>CLIENTES INACTIVOS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>ClienteS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarClientes" append-icon="mdi-magnify"
                                            label="BUSCAR ClienteS" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersClientesInh" :items="datosClientesInh"
                                        :search="buscarClientes" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.est == 'INACTIVO'" color="green" large class="mr-2"
                                                @click="activar(item)" title="ACTIVAR ClienteS">
                                                mdi-check-circle-outline
                                            </v-icon>
                                            <v-icon v-if="item.est == 'ACTIVO'" color="red" large class="mr-2"
                                                @click="desactivar(item)" title="DESACTIVAR ClienteS">
                                                mdi-cancel
                                            </v-icon>
                                            <v-icon large class="mr-2" color="#001781" @click="showInfoCliente(item)"
                                                title="VER INFORMACION">
                                                mdi-eye
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="12" sm="4" md="2">
                                    <v-btn iconv dark color="#00A1B1" @click="closeClientesInhabilitadas()"
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

        <div>
            <v-alert dense color="cyan" style="color: #ffffff">
                <h5>CLIENTES</h5>
            </v-alert>
        </div>

        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showAgregarCliente()">Nuevo Cliente</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showClientesInhabilitados()">Clientes Inactivos</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="12">
                            <v-data-table :headers="headersClientes" :items="datosClientes" :search="searchCliente"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="colorEstado(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">

                                    <v-icon v-if="item.est == 'INACTIVO'" color="green" large class="mr-2"
                                        @click="activar(item)" title="ACTIVAR CLIENTES">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" color="red" large class="mr-2"
                                        @click="desactivar(item)" title="DESACTIVAR CLIENTES">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon large class="mr-2" @click="showEditClienteModal(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon large class="mr-2" color="#001781" @click="showInfoCliente(item)"
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

    </v-card>
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";
//import transporter from '../email/email'; // Ruta correcta al archivo de transporte

export default {
    data() {
        return {
            //#region Cliente
            idCliente: "",
            nombresCliente: "",
            paterno: "",
            materno: "",
            nit: "",
            fechaNacimiento: "",
            correo: "",
            celular: "",
            telefono: "",
            datosClientes: [],
            headersClientes: [
                { text: "NOMBRES CLIENTE", value: "nom", sortable: true },
                { text: "PATERNO", value: "pat", sortable: true },
                { text: "MATERNO", value: "mat", sortable: true },
                { text: "NIT", value: "nitcli", sortable: true },
                { text: "CELULAR", value: "cel", sortable: true },
                { text: "TELEFONO", value: "tel", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosClientesInh: [],
            headersClientesInh: [
                { text: "NOMBRES CLIENTE", value: "nom", sortable: true },
                { text: "PATERNO", value: "pat", sortable: true },
                { text: "MATERNO", value: "mat", sortable: true },
                { text: "NIT", value: "nitcli", sortable: true },
                { text: "CELULAR", value: "cel", sortable: true },
                { text: "TELEFONO", value: "tel", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Modals
            agregarClienteModal: 0,
            editClienteModal: 0,
            infoClienteModal: 0,
            clientesInhabilitadasModal: 0,
            //#endregion

            activo: "",
            valid: true,
            botonact: 0,

        }
    },

    created: function () {
        this.listarClientes()
    },
    methods: {

        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
        listarCliente() {
            this.listarClientes()
        },
        async listarClientes() {
            let me = this;
            await axios
                .get("/cliente/listarclientes")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosClientes = [];

                    } else {
                        me.datosClientes = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarClienteInh() {
            this.listarClientesInh()
        },
        async listarClientesInh() {
            let me = this;
            await axios
                .get("/cliente/listarclientesinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosClientesInh = [];

                    } else {
                        me.datosClientesInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Adicion
        registrarCliente() {
            this.registroCliente(
                this.nombresCliente,
                this.paterno,
                this.materno,
                this.nit,
                this.fechaNacimiento,
                this.correo,
                this.celular,
                this.telefono
            );
        },
        async registroCliente(
            nombresCliente,
            paterno,
            materno,
            nit,
            fechaNacimiento,
            correo,
            celular,
            telefono
        ) {
            let me = this;
            await axios
                .post(
                    "/cliente/addcliente/" +
                    this.nombresCliente +
                    "," +
                    this.paterno +
                    "," +
                    this.materno +
                    "," +
                    this.nit +
                    "," +
                    this.fechaNacimiento +
                    "," +
                    this.correo +
                    "," +
                    this.celular +
                    "," +
                    this.telefono
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarClientes();
                    me.agregarClienteModal = false;
                    me.enviarCorreo(me.correo);
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },

        async enviarCorreo(destinatario) {
            try {
                // Configura los detalles del correo
                const mailOptions = {
                    from: 'drymixnoresponder@gmail.com', // Remitente
                    to: destinatario, // Destinatario
                    subject: 'Registro Exitoso', // Asunto
                    text: '¡Bienvenido! Tu registro ha sido exitoso.', // Cuerpo del mensaje
                };

                // Envía el correo
                await transporter.sendMail(mailOptions);
                console.log('Correo enviado con éxito');
            } catch (error) {
                console.error('Error al enviar el correo:', error);
            }
        },

        //#endregion
        //#region Edicion

        actualizarClientes() {
            this.actualizarCliente(
                this.idCliente,
                this.nombresCliente,
                this.paterno,
                this.materno,
                this.nit,
                this.correo,
                this.celular,
                this.telefono);
        },
        async actualizarCliente(
            idCliente,
            nombresCliente,
            paterno,
            materno,
            nit,
            correo,
            celular,
            telefono
        ) {
            let me = this;
            await axios
                .post(
                    "/cliente/updcliente/" +
                    this.idCliente +
                    "," +
                    this.nombresCliente +
                    "," +
                    this.paterno +
                    "," +
                    this.materno +
                    "," +
                    this.nit +
                    "," +
                    this.correo +
                    "," +
                    this.celular +
                    "," +
                    this.telefono
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarClientes();
                    me.editClienteModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Modals
        showAgregarCliente() {
            this.agregarClienteModal = true;
        },
        closeAgregarCliente() {
            this.agregarClienteModal = false;
        },
        showEditClienteModal(item) {
            this.editClienteModal = true;
            this.botonact = 1;
            this.idCliente = item.idcli;
            this.nombresCliente = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.nit = item.nitcli;
            this.correo = item.corre;
            this.fechaNacimiento = item.fechanac;
            this.celular = item.cel;
            this.telefono = item.tel;
        },
        closeEditClienteModal() {
            this.editClienteModal = false;
        },
        showInfoCliente(item) {
            this.infoClienteModal = true;
            this.idCliente = item.idcli;
            this.nombresCliente = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.nit = item.nitcli;
            this.correo = item.corre;
            this.fechaNacimiento = item.fechanac;
            this.celular = item.cel;
            this.telefono = item.tel;
        },
        closeInfoClienteModal() {
            this.infoClienteModal = false;
        },
        showClientesInhabilitados() {
            this.clientesInhabilitadasModal = true;
            this.listarClientesInh();
        },
        closeClientesInhabilitadas() {
            this.clientesInhabilitadasModal = false
        },
        //#endregion
        //#region Cambios Estado
        activar(item) {
            this.idCliente = item.idcli;
            this.activarCliente(this.idCliente);
        },
        async activarCliente(idCliente) {
            let me = this;
            await axios
                .post("/cliente/oncliente/" + this.idCliente).then(function (response) {

                    me.listarClientes();
                    me.listarClientesInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idCliente = item.idcli;
            this.desactivarCliente(this.idCliente);
        },
        async desactivarCliente(idCliente) {
            let me = this;
            await axios
                .post("/cliente/offcliente/" + this.idCliente).then(function (response) {

                    me.listarClientes();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        limpiar() {
            this.nombreCliente = "";
            this.codigoCliente = "";
        },
    },
}
</script>