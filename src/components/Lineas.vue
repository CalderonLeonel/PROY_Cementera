<template>
    <v-card elevation="5" outlined shaped>

        <v-dialog v-model="infoLineaModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DE LA LINEA:</span><br>
                    <span>{{ nombreLinea }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="100"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="codigoLinea" label="CODIGO LINEA" :counter="100"
                                        :rules="codigoLineaRules" @input="codigoLinea = codigoLinea.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeInfoLineaModal()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="editLineaModal"  max-width="700px" persistent>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>EDITAR LINEA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="100"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoLinea" label="CODIGO LINEA" :counter="100"
                                        :rules="codigoLineaRules" @input="codigoLinea = codigoLinea.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn class="mx-2" fab dark small icon v-if="botonact == 1" color="#0A62BF"
                                            @click="editarLineas()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab dark small icon v-if="botonact == 0" color="#0ABF55"
                                            @click="registrarLinea()" style="float: left" title="REGISTRAR LINEA">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab dark small icon color="#BF120A" @click="limpiar()"
                                            style="float: left" title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeEditLineaModal()" style="float: right"
                                        title="SALIR">
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
                <h5>LINEAS</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-tabs horizontal color="#002245" center-active grow>
                                <v-tab>
                                    <v-icon left>
                                        mdi-package-variant-closed-plus
                                    </v-icon>
                                    FORM
                                    LINEA.
                                </v-tab>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    LINEAS.
                                </v-tab>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LINEAS
                                    INACT.
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR LINEAS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" md="4"></v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreLinea" label="NOMBRE LINEA"
                                                                :counter="100" :rules="nombreLineaRules"
                                                                @input="nombreLinea = nombreLinea.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4"></v-col>

                                                        <v-col cols="12" md="4"></v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="codigoLinea" label="CODIGO LINEA"
                                                                :counter="100" :rules="codigoLineaRules"
                                                                @input="codigoLinea = codigoLinea.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4"></v-col>

                                                        <v-col cols="12" md="8"> </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-toolbar dense shaped >
                                                                <v-toolbar-title>
                                                                    <h6>
                                                                        OPCIONES
                                                                    </h6>
                                                                </v-toolbar-title>
                                                                <v-btn icon v-if="botonact == 1" class="mx-2" fab dark
                                                                    color="#0A62BF" @click="estualizarLinea()"
                                                                    style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn icon v-if="botonact == 0" class="mx-2" fab dark
                                                                    color="#0ABF55" @click="registrarLinea()"
                                                                    style="float: left" title="REGISTRAR LINEA">
                                                                    <v-icon dark> mdi-content-save
                                                                    </v-icon>
                                                                </v-btn>
                                                                <v-btn icon class="mx-2" fab dark color="#BF120A"
                                                                    @click="limpiar()" style="float: left"
                                                                    title="LIMPIAR FORMULARIO">
                                                                    <v-icon dark> mdi-eraser </v-icon>
                                                                </v-btn>
                                                            </v-toolbar>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>LISTA DE LINEAS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>LINEAS</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarLineas"
                                                                    append-icon="mdi-magnify" label="BUSCAR LINEAS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>

                                                            <v-card-title>
                                                                <v-btn color="primary"
                                                                    @click="exportToPDFLineas()">PDF</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToCSVLineas()">CSV</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToExcelLineas()">EXCEL</v-btn>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersLineas" :items="datosLineas"
                                                                :search="buscarLineas" :items-per-page="5"
                                                                class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        class="mx-2" large @click="activar(item)"
                                                                        title="ACTIVAR LINEAS">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        class="mx-2" large @click="desactivar(item)"
                                                                        title="DESACTIVAR LINEAS">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon sclass="mx-2" large color="#0A62BF"
                                                                        @click="showEditLineaModal(item)"
                                                                        title="ACTUALIZAR INFORMACION">
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#0A62BF"
                                                                        @click="showInfoLinea(item)"
                                                                        title="VER INFORMACION">
                                                                        mdi-eye
                                                                    </v-icon>
                                                                </template>

                                                            </v-data-table>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>LINEAS INACTIVAS</span><br>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>LINEAS</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarLineas"
                                                                    append-icon="mdi-magnify" label="BUSCAR LINEAS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>
                                                            <v-data-table :headers="headersLineasInh"
                                                                :items="datosLineasInh" :search="buscarLineas"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        large class="mr-2" @click="activar(item)"
                                                                        title="ACTIVAR LINEAS">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        large class="mr-2" @click="desactivar(item)"
                                                                        title="DESACTIVAR LINEAS">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon large class="mr-2" color="#0A62BF"
                                                                        @click="showInfoLinea(item)"
                                                                        title="VER INFORMACION">
                                                                        mdi-eye
                                                                    </v-icon>
                                                                </template>

                                                            </v-data-table>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                            </v-tabs>
                        </v-col>

                    </v-row>

                    <div class="text-center">
                        <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00"
                            outlined>
                            <strong>{{ mensajeSnackbar }}</strong>


                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                    mdi-close
                                </v-icon>
                            </template>
                        </v-snackbar>
                    </div>

                    <div class="text-center">

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error"
                            outlined>
                            <strong>{{ mensajeSnackbarError }}</strong>

                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarError = false">
                                    mdi-close
                                </v-icon>
                            </template>
                        </v-snackbar>
                    </div>
                </v-container>
            </v-form>
        </div>
    </v-card>
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";


import Papa from "papaparse";

import jsPDF from "jspdf";
import 'jspdf-autotable';

export default {
    data() {
        return {
            flag: 1,
            activo: "",
            valid: true,
            botonact: 0,
            //#region Lineas
            idLinea: "",
            nombreLinea: "",
            codigoLinea: "",
            buscarLineas: "",
            datosLineas: [],
            headersLineas: [
                { text: "NOMBRE LINEA", value: "nomlin", sortable: true },
                { text: "CODIGO LINEA", value: "codlin", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosLineasInh: [],
            headersLineasInh: [
                { text: "NOMBRE LINEA", value: "nomlin", sortable: true },
                { text: "CODIGO LINEA", value: "codlin", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Modals
            agregarLineaModal: 0,
            editLineaModal: 0,
            infoLineaModal: 0,
            lineasInhabilitadasModal: 0,
            //#endregion

            //#region Snackbars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion
        }
    },
    created: function () {
        this.listarLineas();
        this.listarLineasInh();

    },
    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
        listarLinea() {
            this.listarLineas()
        },
        async listarLineas() {
            let me = this;
            await axios
                .get("/linea/listarlineas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosLineas = [];

                    } else {
                        me.datosLineas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarLineaInh() {
            this.listarLineasInh()
        },
        async listarLineasInh() {
            let me = this;
            await axios
                .get("/linea/listarlineasinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosLineasInh = [];

                    } else {
                        me.datosLineasInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Adicion
        registrarLinea() {
            this.registroLinea(this.nombreLinea, this.codigoLinea);
        },
        async registroLinea(
            nombreLinea,
            codigoLinea
        ) {
            let me = this;
            await axios
                .post(
                    "/linea/addlinea/" +
                    this.nombreLinea +
                    "," +
                    this.codigoLinea
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarLineas();
                    me.agregarLineaModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Edicion
        editarLineas() {
            this.editarLinea(this.idLinea, this.nombreLinea, this.codigoLinea);
        },
        async editarLinea(
            idLinea,
            nombreLinea,
            codigoLinea
        ) {
            let me = this;
            await axios
                .post(
                    "/linea/updlinea/" +
                    this.idLinea +
                    "," +
                    this.nombreLinea +
                    "," +
                    this.codigoLinea
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarLineas();
                    me.editLineaModal = false;
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Modals
        showAgregarLinea() {
            this.agregarLineaModal = true;
        },
        closeAgregarLinea() {
            this.agregarLineaModal = false;
        },
        showEditLineaModal(item) {
            this.editLineaModal = true;
            this.botonact = 1;
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.codigoLinea = item.codlin;
        },
        closeEditLineaModal() {
            this.editLineaModal = false;
        },
        showInfoLinea(item) {
            this.infoLineaModal = true;
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.codigoLinea = item.codlin;
        },
        closeInfoLineaModal() {
            this.infoLineaModal = false;
        },
        showLineaInhabilitadas() {
            this.lineasInhabilitadasModal = true;
            this.listarLineasInh();
        },
        closeLineasInhabilitadas() {
            this.lineasInhabilitadasModal = false
        },
        //#endregion
        //#region Cambios Estado
        activar(item) {
            this.idLinea = item.idlin;
            this.activarLinea(this.idLinea);
        },
        async activarLinea(idLinea) {
            let me = this;
            await axios
                .post("/linea/onlinea/" + this.idLinea).then(function (response) {

                    me.listarLineas();
                    me.listarLineasInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idLinea = item.idlin;
            this.desactivarLinea(this.idLinea);
        },
        async desactivarLinea(idLinea) {
            let me = this;
            await axios
                .post("/linea/offlinea/" + this.idLinea).then(function (response) {

                    me.listarLineas();
                    me.listarLineasInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        limpiar() {
            this.nombreLinea = "";
            this.codigoLinea = "";
            this.botonact = 0;
        },

        //#region Reports
        async exportToCSVLineas() {
            try {
                const response = await axios.get(`/linea/listarlineas/`); // Ruta adaptada para líneas
                const jsonData = response.data.resultado || [];

                const csvData = Papa.unparse(jsonData);

                const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = "lineas.csv";
                link.click();
            } catch (error) {
                console.error(error);
            }
        },

        async exportToExcelLineas() {
            try {
                const response = await axios.get(`/linea/listarlineas/`); // Ruta adaptada para líneas
                const jsonData = response.data.resultado || [];
                const worksheet = XLSX.utils.json_to_sheet(jsonData);
                const workbook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

                XLSX.writeFile(workbook, "lineas.xlsx", { compression: true });
            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFLineas() {
            try {
                const response = await axios.get(`/linea/listarlineas/`); // Ruta adaptada para líneas
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(item => [
                    item.codlin,
                    item.nomlin,
                    item.est
                ]);
                const doc = new jsPDF();
                doc.text("Listado de Líneas", 10, 10);
                doc.autoTable({
                    head: [["Código de Línea", "Nombre de Línea", "Estado"]],
                    body: bodyData
                });
                doc.save("lineas.pdf");
            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFLineaDetailed(item) {
            try {
                const response = await axios.get(`/linea/detallelinea/` + item.idLinea); // Ruta adaptada para detalle de líneas
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(data => [
                    data.codlin,
                    data.nomlin,
                    data.descripcion,
                    data.est
                ]);
                const doc = new jsPDF();
                doc.text("Detalle de Línea: " + item.nombreLinea.charAt(0).toUpperCase() + item.nombreLinea.slice(1).toLowerCase(), 10, 10);
                doc.autoTable({
                    head: [["Código", "Nombre", "Descripción", "Estado"]],
                    body: bodyData
                });
                doc.save("detalle_linea.pdf");
            } catch (error) {
                console.error(error);
            }
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
        //#endregion
    },
}
</script>