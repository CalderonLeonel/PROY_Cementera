<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>
                            Planilla de Pagos
                        </v-card-title>
                        <v-card-text>
                            <v-data-table :headers="headersPlanilla" :items="datosPlanilla" :items-per-page="5"
                                class="elevation-1" id="tableId"></v-data-table>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="calcularTotal()">Calcular Total</v-btn>
                            <v-btn @click="pagarPlanillas()" color="primary">Pagar Planilla</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>
                            Total a Pagar
                        </v-card-title>
                        <v-card-text>
                            <p>Total: {{ totalSalarios }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
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
                { text: 'SALARIO', value: 'sal', sortable: false },
            ],
            datosPlanilla: [],
            totalSalarios: 0,

            //#region Asiento Contable
            idAsientoContable: "",
            numeroReferencia: "",
            descripcionAsiento: "PAGO PLANILLA",
            idCuentaContable: "",
            montoDebito: "",
            montoCredito: "",
            //#endregion

            //#region Cuenta Contables
            idCuentaContable: "",
            numeroCuenta: "",
            nombreCuenta: "",
            descripcionCuenta: "",
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

            //#region SnackBars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion

        };
    },

    created: function () {
        this.generarPlanilla();
        this.listarCuentas();
    },

    methods: {
        generarNumeroReferencia() {
            const fechaActual = new Date();

            // Obtiene los componentes de la fecha y hora
            const año = fechaActual.getFullYear();
            const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Añade ceros a la izquierda si es necesario
            const dia = fechaActual.getDate().toString().padStart(2, '0');
            const hora = fechaActual.getHours().toString().padStart(2, '0');
            const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
            const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

            // Formatea el número de referencia utilizando la información de la fecha y hora
            const numeroReferencia = `${año}${mes}${dia}${hora}${minutos}${segundos}`;

            // Puedes ajustar el formato del número de referencia según tus necesidades
            // Por ejemplo, puedes agregar un prefijo o un sufijo según tus requisitos.
            // Ejemplo: const numeroReferencia = `REF-${año}${mes}${dia}${hora}${minutos}${segundos}`;

            return numeroReferencia;
        },

        generarPlantillas(){
            this.generarPlantilla();
        },

        async generarPlanilla() {
            let me = this;
            await axios
                .get("/empleado/generarplanilla")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosPlanilla = [];
                    } else {    
                        me.datosPlanilla = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        pagarPlanillas() {
            this.idCuentaContable = this.seleccionarCuentaContable();
            console.log(this.idCuentaContable)
            this.pagarPlanilla(this.idCuentaContable, this.totalSalarios);
        },

        async pagarPlanilla(
            idCuentaContable,
            totalSalarios
        ) {
            let me = this;
            await axios
                .post(
                    "/empleado/pagarplanilla/" +
                    this.idCuentaContable +
                    "," +
                    this.totalSalarios

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.registrarAsientoContable();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        registrarPago() {
            this.idCuentaContable = this.seleccionarCuentaContable();
            this.pagarPlanilla(this.idCuentaContable, this.totalSalarios);
        },

        async registrarPagos(
            idCuentaContable,
            totalSalarios
        ) {
            let me = this;
            await axios
                .post(
                    "/empleado/pagarplanilla/" +
                    this.idCuentaContable +
                    "," +
                    this.totalSalarios

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.registrarAsientoContable();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },

        registrarAsientosContables() {
            this.numeroReferencia = this.generarNumeroReferencia();
            this.idCuentaContable = this.seleccionarCuentaContable();

            // Actualizo el total de la venta
            const totalSalarios = this.calcularTotal();

            // Calculo los montos de débito y crédito
            const { montoDebito, montoCredito } = this.listarCuentas();

            const esIngreso = true; // Aquí debes determinar si es un ingreso o gasto

            // Sumo el total de la venta al monto de crédito
            const nuevoMontoCredito = montoCredito + totalVenta;

            // Registro el asiento contable con los montos calculados
            this.registrarAsientoContable(this.numeroReferencia, this.descripcionAsiento, this.idCuentaContable, montoDebito, nuevoMontoCredito);

            // Después de registrar el asiento, aumentar o reducir el saldo según corresponda
            if (esIngreso) {
                this.aumentarSaldo();
            } else {
                this.pagarPlanillas();
            }
        },

        async registrarAsientoContable(numeroReferencia, descripcionAsiento, idCuentaContable, montoDebito, montoCredito) {
            try {
                let me = this;

                await axios.post("/contabilidad/addasiento/" +
                    this.numeroReferencia +
                    "," +
                    this.descripcionAsiento +
                    "," +
                    this.idCuentaContable +
                    "," +
                    this.montoDebito +
                    "," +
                    this.montoCredito
                )
                    .then(function (response) {
                        me.mensajeSnackbar = response.data.message;
                        me.snackbarOK = true;
                    })
                    .catch(function (error) {
                        me.mensajeSnackbar = error.response.data.message;
                        me.snackbarError = true;
                    });

            } catch (error) {
                // Manejar errores en caso de que la solicitud falle
                console.error("Error al registrar el pago de planilla:", error);
            }
        },

        calcularTotal() {
            this.totalSalarios = this.datosPlanilla.reduce((total, empleado) => {
                return total + parseFloat(empleado.sal);
            }, 0);
        },

        seleccionarCuentaContable() {
            const cuentaGastos = this.datosCuentas.find(cuenta => cuenta.tipoc === "Gasto");

            if (cuentaGastos) {
                // Devolver el idCuentaContable si se encuentra una cuenta de ventas
                return cuentaGastos.idcnt;
            } else {
                console.error("No se encontró una cuenta de ventas.");
                // Puedes devolver un valor predeterminado o lanzar un error según tus necesidades
                return null; // O devuelve un valor predeterminado
            }
        },

        //#region Listar
        listarCuenta() {
            this.listarCuentas();
        },

        async listarCuentas() {
            let me = this;
            await axios
                .get("/contabilidad/listarcuentas")
                .then(function (response) {
                    console.log("Respuesta del servidor:", response.data);
                    if (response.data.resultado == null) {
                        me.datosCuentas = [];

                    } else {
                        me.datosCuentas = response.data.resultado;

                        /*// Recorrer las cuentas para calcular montoCredito y montoDebito
                        me.montoCredito = me.datosCuentas.reduce((total, cuenta) => {
                            if (cuenta.tipoc === "Ingreso") {
                                return total + parseFloat(cuenta.saldac || 0);
                            }
                            return total;
                        }, 0);

                        me.montoDebito = me.datosCuentas.reduce((total, cuenta) => {
                            if (cuenta.tipoc === "Gasto") {
                                return total + parseFloat(cuenta.saldac || 0);
                            }
                            return total;
                        }, 0);

                        console.log("Monto Crédito:", me.montoCredito);
                        console.log("Monto Débito:", me.montoDebito);*/
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
    },
};
</script>