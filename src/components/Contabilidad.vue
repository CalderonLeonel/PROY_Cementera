<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="saldoModal" max-width="500px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>SALDO INICIAL:</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="saldo" label="SALDO INICIAL" :rules="saldoRules"
                                        @input="saldo = saldo.toUpperCase()" required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#ffffff">
                                        <v-toolbar-title style="color: #000000;">
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>

                                        <v-btn icon large class="mx-2" fab dark x-small color="#0ABF55"
                                            @click="registrarCuenta()" style="float: left"
                                            title="REGISTRAR CUENTA CONTABLE">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>

                                    </v-toolbar>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>


        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>
                <v-tabs horizontal color="#ffffff" center-active grow>
                    <v-tab>
                        <v-icon left>mdi-account-cash</v-icon>
                        CUENTAS CONT
                    </v-tab>
                    <v-tab>
                        <v-icon left>mdi-seat</v-icon>
                        ASIENTOS CONT
                    </v-tab>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>

                                <v-col cols="12" md="12"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="numeroCuenta" label="NUMERO CUENTA" :counter="100"
                                        :rules="numeroCuentaRules" @input="numeroCuenta = numeroCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreCuenta" label="NOMBRE CUENTA" :counter="100"
                                        :rules="nombreCuentaRules" @input="nombreCuenta = nombreCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select :items="tiposCuentas" v-model="tipoCuenta" label="TIPO CUENTA"></v-select>
                                </v-col>

                                <v-divider></v-divider>

                                <v-col cols="12" md="12">
                                    <v-textarea v-model="descripcion" label="DESCRIPCION" :counter="255"
                                        :rules="descripcionRules" @input="descripcion = descripcion.toUpperCase()"
                                        required textarea></v-textarea>
                                </v-col>

                                <v-col cols="12" md="8"></v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#ffffff">
                                        <v-toolbar-title style="color:#000000">
                                            <h6>OPCIONES</h6>
                                        </v-toolbar-title>
                                        <v-btn icon large v-if="botonact == 1" @click="registrarSaldo()" class="mx-2"
                                            fab dark x-small color="#0ABF55" title="REGISTRAR CUENTA CONTABLE"
                                            style="float: left">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>
                                        <v-btn icon large v-if="botonact == 0" @click="editarCuenta()" class="mx-2" fab
                                            dark x-small color="#0A62BF" title="ACTUALIZAR CUENTA CONTABLE"
                                            style="float: left">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Cuentas Contables</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarCuentas" append-icon="mdi-magnify"
                                            label="BUSCAR CUENTAS" single-line hide-details></v-text-field>
                                    </v-card-title>


                                    <v-data-table :headers="headersCuentas" :items="datosCuentas"
                                        :search="buscarCuentas" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">

                                            <v-icon small class="mr-2" @click="seleccionarCuenta(item)"
                                                title="ACTUALIZAR INFORMACION">
                                                mdi-text-box-edit-outline
                                            </v-icon>

                                        </template>
                                    </v-data-table>
                                </v-col>

                            </v-row>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>
                                <v-col cols="12"></v-col>

                                <v-col cols="12" md="3"> </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="fechaInicio" label="FECHA INICIAL"
                                        type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="fechaFin" label="FECHA FINAL" type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-select :items="tiposCuentas" v-model="tipoCuenta" label="TIPO CUENTA"></v-select>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>


                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#ffffff">
                                        <v-toolbar-title style="color:#000000">
                                            <h6>OPCIONES</h6>
                                        </v-toolbar-title>
                                        <v-btn icon large class="mx-2" fab dark x-small color="info"
                                            @click="listarAsientosxFechas()" style="float: left"
                                            title="LISTAR ASIENTOS POR FECHAS">
                                            <v-icon dark> mdi-calendar-search </v-icon>
                                        </v-btn>
                                        <v-btn icon large class="mx-2" fab dark x-small color="info"
                                            @click="listarAsientosxCuentas()" style="float: left"
                                            title="LISTAR ASIENTOS POR CUENTAS">
                                            <v-icon dark> mdi-account </v-icon>
                                        </v-btn>
                                        <v-btn icon large class="mx-2" fab dark x-small color="secondary"
                                            @click="generarReportePDF()" title="GENERAR PDF">
                                            <v-icon dark>mdi-printer</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>ASIENTOS CONTABLES</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="searchAsiento" append-icon="mdi-magnify"
                                            label="BUSCAR ASIENTO" single-line hide-details></v-text-field>
                                    </v-card-title>

                                    <v-data-table :headers="headersAsientos" :items="datosAsientos"
                                        :search="searchAsiento" :items-per-page="5" class="elevation-1" id="tableId">
                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" @click="infoAsiento(item)" color="#0091EA">
                                                mdi-eye
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>

                </v-tabs>



            </v-card-actions>
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
    </v-card>
</template>
<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';



export default {
    data() {
        return {
            flag: 1,
            botonact: 1,
            //#region Cuenta Contables
            idCuentaContable: "",
            numeroCuenta: "",
            nombreCuenta: "",
            descripcion: "",
            tipoCuenta: "",
            saldo: "",
            tiposCuentas: [
                'Activo', 'Pasivo', 'Capital', 'Ingreso', 'Gasto'
            ],
            datosCuentas: [],
            headersCuentas: [
                { text: "NUM. CUENTA", value: "numcnt", sortable: true },
                { text: "NOM. CUENTA", value: "nom", sortable: true },
                { text: "DESCRIPCION", value: "des", sortable: true },
                { text: "TIPO CUENTA", value: "tipoc", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Asientos Contables
            idAsiento: "",
            numeroReferencia: "",
            descripcionAsiento: "",
            montoDeb: "",
            montoCre: "",
            datosAsientos: [],
            headersAsientos: [
                { text: "NUM.REF", value: "numref", sortable: true },
                { text: "CUENTA CONT.", value: "nom", sortable: true },
                { text: "MONT. DEB", value: "mondeb", sortable: true },
                { text: "MONT.CRED", value: "moncre", sortable: true },
                { text: "MONT ASIENTO", value: "monasi", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],

            //#endregion

            //#region Snackbars
            snackbarOK: false,
            mensajeSatisfactorio: "REGISTRO CORRECTO ",
            snackbarError: false,
            mensajeError: "REGISTRO FALLIDO ",
            snackbarWarning: false,
            mensajeWarning: "EMAIL YA EXISTE ",
            timeout: 2000,
            mensajeSnackbar: "",
            //#endregion

            //#region DATEPICKER
            fechaInicio: null,
            fechaFin: null,
            menuInicio: false,
            menuFin: false,
            //#endregion

            //#region Modals
            saldoModal: 0,
            //#endregion

            //#region Rules
            numeroCuentaRules: [
                v => !!v || "El número de cuenta es obligatorio",
                v => (v && v.length >= 2) || "Debe tener al menos 2 caracteres",
                v => (v && v.length <= 100) || "No debe exceder 100 caracteres",
                v => /^[A-Za-z0-9\-]+$/.test(v) || "Solo se permiten números, letras y guiones",
            ],
            nombreCuentaRules: [
                v => !!v || "El nombre de la cuenta es obligatorio",
                v => (v && v.length >= 3) || "Debe tener al menos 3 caracteres",
                v => (v && v.length <= 100) || "No debe exceder 100 caracteres",
                v => /^[A-Za-zÁÉÍÓÚÑÜ\s]+$/.test(v) || "Solo se permiten letras y espacios",
            ],
            tipoCuentaRules: [
                v => !!v || "Debe seleccionar un tipo de cuenta",
            ],
            descripcionRules: [
                v => !!v || "La descripción es obligatoria",
                v => (v && v.length >= 5) || "Debe tener al menos 5 caracteres",
                v => (v && v.length <= 255) || "No debe exceder 255 caracteres",
            ],
            fechaInicioRules: [
                v => !!v || "Debe seleccionar una fecha inicial",
            ],
            fechaFinRules: [
                v => !!v || "Debe seleccionar una fecha final",
                v => (!this.fechaInicio || v >= this.fechaInicio) || "La fecha final debe ser mayor o igual a la inicial",
            ],
            //#endregion
            
        }
    },

    created: function () {
        this.listarCuentas();
        this.listarAsientos();
    },

    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'orange'
        },

        generarReportePDF() {
            const doc = new jsPDF();
            doc.text(20, 20, 'Reporte de Asientos Contables'); // Título del reporte

            let y = 30; // Posición inicial en el eje Y para comenzar a escribir los datos

            // Iterar sobre los datos de asientos y agregarlos al PDF
            this.datosAsientos.forEach(item => {
                // Ejemplo: Agregar datos al PDF
                doc.text(20, y, `Número de Referencia: ${item.numref}`);
                doc.text(20, y + 10, `Descripción: ${item.nom}`);
                doc.text(20, y + 20, `Monto Débito: ${item.mondeb}`);
                doc.text(20, y + 30, `Monto Crédito: ${item.moncre}`);

                // Aumentar la posición en Y para el próximo conjunto de datos
                y += 50; // Ajusta este valor según sea necesario para el espaciado deseado

                // Si el espacio en la página es insuficiente, agrega una nueva página
                if (y >= 250) {
                    doc.addPage(); // Agregar una nueva página si es necesario
                    y = 20; // Restablecer la posición en Y para la nueva página
                }
            });

            doc.save('reporte_asientos.pdf'); // Guardar el PDF
        },

        /*generarReportePDF() {
            const doc = new jsPDF();

            const columns = [
                { title: 'Número de Referencia', dataKey: 'numref' },
                { title: 'Descripción', dataKey: 'nom' },
                { title: 'Monto Débito', dataKey: 'mondeb' },
                { title: 'Monto Crédito', dataKey: 'moncre' },
            ];

            const rows = this.datosAsientos.map(asiento => ({
                numref: asiento.numref,
                nom: asiento.nom,
                mondeb: asiento.mondeb,
                moncre: asiento.moncre,
            }));

            console.log(rows); // Verifica los datos que estás pasando a autoTable


            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 20,
                styles: {
                    font: 'Arial', // Fuente del texto
                    fontSize: 10, // Tamaño de fuente
                    cellPadding: 4,
                    fillColor: '#f3f3f3', // Color de fondo de la tabla
                },
                headStyles: {
                    fillColor: '#001f3f', // Color de fondo del encabezado
                    textColor: '#ffffff', // Color del texto del encabezado
                },
            });

            doc.save('reporte_asientos.pdf'); // Guardar el PDF
        },*/

        //#region Listados
        listarCuenta() {
            this.listarCuentas();
        },
        async listarCuentas() {
            let me = this;
            await axios
                .get("/contabilidad/listarcuentas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCuentas = [];

                    } else {
                        me.datosCuentas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        listarAsiento() {
            this.listarAsientos();
        },
        async listarAsientos() {
            let me = this;
            await axios
                .get("/contabilidad/listarasientos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosAsientos = [];

                    } else {
                        me.datosAsientos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        listarAsientoxFechas() {
            this.listarAsientosxFechas(this.fechaInicio, this.fechaFin);
        },
        async listarAsientosxFechas(fechaInicio, fechaFin) {
            let me = this;
            await axios
                .get("/contabilidad/listarasientosxfechas/" +
                    this.fechaInicio +
                    "," +
                    this.fechaFin
                )
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosAsientos = [];

                    } else {
                        me.datosAsientos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarAsientoxCuenta() {
            this.listarAsientosxCuentas(this.tipoCuenta);
        },
        async listarAsientosxCuentas(tipoCuenta) {
            let me = this;
            await axios
                .get("/contabilidad/listarasientosxcuenta/" + this.tipoCuenta)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosAsientos = [];

                    } else {
                        me.datosAsientos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Registrar
        registrarCuentas() {
            this.registrarCuenta(this.numeroCuenta, this.nombreCuenta, this.descripcion, this.tipoCuenta, this.saldo);
        },
        async registrarCuenta(
            numeroCuenta,
            nombreCuenta,
            descripcion,
            tipoCuenta,
            saldo
        ) {
            let me = this;
            await axios
                .post(
                    "/contabilidad/addcuenta/" +
                    this.numeroCuenta +
                    "," +
                    this.nombreCuenta +
                    "," +
                    this.descripcion +
                    "," +
                    this.tipoCuenta +
                    "," +
                    this.saldo
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarCuentas();
                    me.saldoModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },
        //#endregion

        //#region Editar
        //#endregion

        //#region Cambiar Estados
        //#endregion

        //#region Modals
        registrarSaldo() {
            this.saldoModal = true;
        },
        //#endregion
    },
}
</script>