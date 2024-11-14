<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Planilla de Pagos</v-card-title>
                        <v-card-text>
                            <v-data-table :headers="headersPlanilla" :items="datosPlanilla" :items-per-page="5"
                                class="elevation-1" id="tableId"></v-data-table>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="calcularTotal">Calcular Total</v-btn>
                            <v-btn @click="procesarPagoPlanilla" color="primary">Pagar Planilla</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Total a Pagar</v-card-title>
                        <v-card-text>
                            <p>Total: {{ totalSalarios }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="snackbarOK" :timeout="timeout" color="success">
            {{ mensajeSnackbar }}
        </v-snackbar>
        <v-snackbar v-model="snackbarError" :timeout="timeout" color="error">
            {{ mensajeSnackbarError }}
        </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            headersPlanilla: [
                { text: 'ID Empleado', value: 'idempl', sortable: false },
                { text: 'NOMBRE', value: 'nom', sortable: false },
                { text: 'APELLIDO PATERNO', value: 'pat', sortable: false },
                { text: 'APELLIDO MATERNO', value: 'mat', sortable: false },
                { text: 'CARGO', value: 'nomcar', sortable: false },
                { text: 'SALARIO', value: 'sal', sortable: false },
            ],
            datosPlanilla: [],
            totalSalarios: 0,
            idCuentaContable: "",
            numeroReferencia: "",
            descripcionAsiento: "PAGO PLANILLA",
            datosCuentas: [],
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
        };
    },

    created() {
        this.generarPlanilla();
        this.listarCuentas();
    },

    methods: {
        generarNumeroReferencia() {
            const fechaActual = new Date();
            const año = fechaActual.getFullYear();
            const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const dia = String(fechaActual.getDate()).padStart(2, '0');
            const hora = String(fechaActual.getHours()).padStart(2, '0');
            const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
            const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
            return `${año}${mes}${dia}${hora}${minutos}${segundos}`;
        },

        async generarPlanilla() {
            try {
                const response = await axios.get("/empleado/generarplanilla");
                this.datosPlanilla = response.data.resultado || [];
            } catch (error) {
                console.error("Error al generar planilla:", error);
                this.mostrarError("Error al generar planilla");
            }
        },

        async procesarPagoPlanilla() {
            this.calcularTotal();
            this.idCuentaContable = this.seleccionarCuentaContable();

            if (this.idCuentaContable && this.totalSalarios > 0) {
                try {
                    await this.pagarPlanilla(this.idCuentaContable, this.totalSalarios);
                    await this.registrarAsientoContable(
                        this.generarNumeroReferencia(),
                        this.descripcionAsiento,
                        this.idCuentaContable,
                        this.totalSalarios,
                        this.totalSalarios
                    );
                    await this.registrarPagos(this.idCuentaContable);
                    this.mensajeSnackbar = "Pago de planilla procesado correctamente";
                    this.snackbarOK = true;
                } catch (error) {
                    this.mensajeSnackbarError = "Error al procesar pago de planilla";
                    this.snackbarError = true;
                    console.error("Error al procesar pago de planilla:", error);
                }
            } else {
                this.mensajeSnackbarError = "No se pudo procesar el pago. Verifique los datos.";
                this.snackbarError = true;
            }
        },

        async pagarPlanilla(idCuentaContable, totalSalarios) {
            try {
                const response = await axios.post(
                    "/empleado/pagarplanilla/" + idCuentaContable + "," + totalSalarios
                );
                this.mensajeSnackbar = response.data.message;
                this.snackbarOK = true;
            } catch (error) {
                this.mensajeSnackbarError = "Error al pagar planilla";
                this.snackbarError = true;
                console.error("Error al pagar planilla:", error);
            }
        },

        async registrarPagos(idCuentaContable) {
            for (let empleado of this.datosPlanilla) {
                try {
                    // Concatenar los parámetros en la URL
                    const response = await axios.post(
                        "/empleado/addpago/" +
                        empleado.idempl + "," +
                        empleado.idcar + "," +
                        empleado.sal + "," +
                        empleado.nomcar
                    );

                    console.log("Pago registrado para empleado ID:", empleado.idempl);
                } catch (error) {
                    console.error(`Error al registrar el pago para el empleado ID: ${empleado.idempl}`, error);
                    this.mensajeSnackbarError = "Error al registrar pagos individuales";
                    this.snackbarError = true;
                    throw error;
                }
            }
        },

        async registrarAsientoContable(numeroReferencia, descripcionAsiento, idCuentaContable, montoDebito, montoCredito) {
            try {
                const response = await axios.post(
                    "/contabilidad/addasiento/" +
                    numeroReferencia + "," +
                    descripcionAsiento + "," +
                    idCuentaContable + "," +
                    montoDebito + "," +
                    montoCredito
                );
                this.mensajeSnackbar = response.data.message;
                this.snackbarOK = true;
            } catch (error) {
                this.mensajeSnackbar = error.response?.data?.message || "Error al registrar el asiento contable";
                this.snackbarError = true;
                console.error("Error al registrar el asiento contable:", error);
            }
        },

        calcularTotal() {
            this.totalSalarios = this.datosPlanilla.reduce((total, empleado) => total + parseFloat(empleado.sal), 0);
        },

        seleccionarCuentaContable() {
            const cuentaGastos = this.datosCuentas.find(cuenta => cuenta.tipoc === "Gasto");
            if (cuentaGastos) {
                return cuentaGastos.idcnt;
            } else {
                this.mostrarError("No se encontró una cuenta de gastos.");
                return null;
            }
        },

        async listarCuentas() {
            try {
                const response = await axios.get("/contabilidad/listarcuentas");
                this.datosCuentas = response.data.resultado || [];
            } catch (error) {
                console.error("Error al listar cuentas:", error);
                this.mostrarError("Error al listar cuentas");
            }
        },

        mostrarMensaje(mensaje) {
            this.mensajeSnackbar = mensaje;
            this.snackbarOK = true;
        },

        mostrarError(mensaje) {
            this.mensajeSnackbarError = mensaje;
            this.snackbarError = true;
        },
    },
};
</script>