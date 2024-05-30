<template>
    <v-card elevation="5" outlined shaped>

        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>
                <v-tabs horizontal color="#002245" center-active grow>
                    <v-tab>
                        <v-icon left>mdi-account-cash</v-icon>
                        PAGOS
                        EMPLE.
                    </v-tab>
                    <v-tab>
                        <v-icon left>mdi-cash</v-icon>
                        PAGOS
                        EMPR
                        EXTR.
                    </v-tab>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>

                                <v-col cols="12">
                                    <v-data-table :headers="headersEmpleados" :items="empleados" item-key="id"
                                        :search="searchEmpleado" class="elevation-1" id="empleadosTable">
                                        <template #top>
                                            <v-toolbar flat>
                                                <v-toolbar-title>Empleados</v-toolbar-title>
                                            </v-toolbar>
                                        </template>
                                        <template #item.actions="{ item }">
                                            <v-icon @click="seleccionarEmpleado(item)"
                                                color="primary">mdi-checkbox-marked-circle-outline</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>

                                <v-col cols="12">
                                    <v-divider></v-divider>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Empleados Seleccionados</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-data-table :headers="headersEmpleadosSeleccionados" :items="empleadosSeleccionados"
                                        class="elevation-1" id="empleadosSeleccionadosTable">
                                        <template #item.actions="{ item }">
                                            <v-icon @click="eliminarEmpleado(item)"
                                                color="error">mdi-close-circle-outline</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>

                                <v-col cols="12">
                                    <v-divider></v-divider>
                                </v-col>

                                <v-col cols="12">
                                    <v-card outlined>
                                        <v-card-text>
                                            <h4 class="text-center">Total a Pagar: {{ totalPagar }}</h4>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>
                                <v-col cols="12">
                                    <v-data-table :headers="headersEmpresas" :items="empresas" item-key="id"
                                        :search="searchEmpresa" class="elevation-1" id="empresasTable">
                                        <template #top>
                                            <v-toolbar flat>
                                                <v-toolbar-title>Empresas de Extracción</v-toolbar-title>
                                            </v-toolbar>
                                        </template>
                                        <template #item.actions="{ item }">
                                            <v-icon @click="seleccionarEmpresa(item)"
                                                color="primary">mdi-checkbox-marked-circle-outline</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>

                                <v-col cols="12">
                                    <v-divider></v-divider>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Empresas Seleccionadas</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-data-table :headers="headersEmpresasSeleccionadas" :items="empresasSeleccionadas"
                                        class="elevation-1" id="empresasSeleccionadasTable">
                                        <template #item.actions="{ item }">
                                            <v-icon @click="eliminarEmpresa(item)"
                                                color="error">mdi-close-circle-outline</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>

                                <v-col cols="12">
                                    <v-divider></v-divider>
                                </v-col>

                                <v-col cols="12">
                                    <v-card outlined>
                                        <v-card-text>
                                            <h4 class="text-center">Total a Pagar: {{ totalPagarEmpresas }}</h4>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>

                </v-tabs>
            </v-card-actions>

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
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';



export default {
    data() {
        return {
            flag: 1,
            botonact: 1,

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