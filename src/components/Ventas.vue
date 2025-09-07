<template>
    <v-card elevation="5" outlined shaped>

        <v-dialog v-model="clientesModal" persistent max-width="1000px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>CLIENTES</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Clientes</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarClientes" append-icon="mdi-magnify"
                                            label="BUSCAR CLIENTES" single-line hide-details
                                            @input="buscarClientes = buscarClientes.toUpperCase()"></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersClientes" :items="datosClientes"
                                        :search="buscarClientes" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#0A62BF" @click="seleccionarCliente(item)"
                                                title="SELECCIONAR CLIENTE">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeClienteModal()" style="float: right"
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

        <v-dialog v-model="cantidadModal" persistent max-width="500px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>CANTIDAD</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="cantidad" label="CANTIDAD"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6"> </v-col>
                                <v-col cols="12" md="6">
                                    <v-toolbar dense shaped color="#FFFFFF">
                                        <v-toolbar-title style="color: #000000;">
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn class="mx-2" fab dark x-small color="success"
                                            @click="agregarProductoAlCarrito()" style="float: left"
                                            title="AGREGAR PRODUCTO">
                                            <v-icon dark> mdi-content-save </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="12" sm="4" md="12">
                                    <v-btn iconv dark color="#00A1B1" @click="closeCantidad()"
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


        <v-card-title>
            FORMULARIO DE VENTA
        </v-card-title>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="1">
                            <v-btn class="mx-2" fab dark x-small color="cyan" :rules="clienteRules"
                                @click="showClientes()" style="float: right" title="BUSCAR CLIENTES">
                                <v-icon dark> mdi-magnify </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-text-field v-model="nombreCliente" label="CLIENTE" :counter="100"
                                :rules="nombreClienteRules" @input="nombreCliente = nombreCliente.toUpperCase()"
                                required disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="paterno" label="PATERNO CLIENTE" :counter="100" :rules="paternoRules"
                                @input="paterno = paterno.toUpperCase()" required disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="materno" label="MATERNO CLIENTE" :counter="100" :rules="maternoRules"
                                @input="materno = materno.toUpperCase()" required disabled></v-text-field>
                        </v-col>

                        <v-col cols="12" md="1"></v-col>
                        <v-col cols="12" md="5">
                            <v-text-field v-model="nit" label="NIT CLIENTE" :counter="100" :rules="nitRules"
                                @input="nit = nit.toUpperCase()" required disabled></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>LISTA DE PRODUCTOS</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="buscarproducto" append-icon="mdi-magnify"
                                    label="BUSCAR PRODUCTOS" single-line hide-details></v-text-field>
                            </v-card-title>
                        </v-col>

                        <v-col cols="12">
                            <v-data-table :headers="headersProductos" :items="datosProductos" :search="buscarproductos"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="colorEstado(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon small class="mr-2" color="#0A62BF" @click="seleccionarProducto(item)">
                                        mdi-check-circle
                                    </v-icon>
                                </template>

                            </v-data-table>
                        </v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>DETALLE VENTA</h5>
                                </v-list-item-title>
                            </v-list-item>
                        </v-col>

                        <v-col cols="12">
                            <v-data-table :headers="headersCarrito" :items="datosCarrito" :items-per-page="12"
                                class="elevation-1" id="tableId">

                                <template #[`item.actions`]="{ item }">
                                    <v-icon small class="mr-2" color="#0A62BF" @click="seleccionarProducto(item)">
                                        mdi-check-circle
                                    </v-icon>
                                </template>

                            </v-data-table>
                        </v-col>

                        <v-col cols="12" md="8"> </v-col>
                        <v-col cols="12" md="4">
                            <v-toolbar dense shaped color="#ffffff">
                                <v-toolbar-title style="color: #000000;">
                                    <h6>
                                        OPCIONES
                                    </h6>
                                </v-toolbar-title>
                                <v-btn class="mx-2" fab dark x-small color="success" @click="registrarVenta()"
                                    style="float: left" title="REGISTRAR VENTA">
                                    <v-icon dark> mdi-content-save </v-icon>
                                </v-btn>
                            </v-toolbar>
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
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00" outlined>
                <strong>{{ mensajeSnackbar }}</strong>


                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarOK = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

        <div class="text-center">

            <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error" outlined>
                <strong>{{ mensajeSnackbarError }}</strong>

                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarError = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>
    </v-card>
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";
import jsPDF from 'jspdf';
import logo from "@/assets/logodrymix.png";

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
            buscarClientes: "",
            datosClientes: [],
            headersClientes: [
                { text: "NOMBRES CLIENTE", value: "nom", sortable: true },
                { text: "PATERNO", value: "pat", sortable: true },
                { text: "MATERNO", value: "mat", sortable: true },
                { text: "NIT", value: "nitcli", sortable: true },
                { text: "CELULAR", value: "cel", sortable: true },
                { text: "TELÉFONO", value: "tel", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Productos
            idProducto: "",
            nombreProducto: "",
            codigoProducto: "",
            precioUnitario: "",
            datosProductos: [],
            headersProductos: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CÓDIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProductoInh: [],
            headersProductoInh: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CÓDIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Carrito
            productoSeleccionado: "",
            cantidad: "",
            idEmpleado: "",
            razonSocial: "",
            codigoControl: "",
            totalVenta: 0,
            datosCarrito: [],
            headersCarrito: [
                { text: "CÓDIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CANTIDAD", value: "cant", sortable: false },
                { text: "PRECIO UNITARIO", value: "precuni", sortable: false },
                { text: "TOTAL", value: "total", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Ultima Venta
            idUltimaVenta: "",
            fechaVenta: "",
            datosUltimaVenta: [],
            //#endregion

            //#region Modals
            clientesModal: 0,
            cantidadModal: 0,
            //#endregion

            //#region Venta
            venta: {
                idProducto: "",
                cantidad: "",
                precioUnitario: "",
                total: "",
                codigoControl: "ASDASDASDASD",
                nit: "",
                razonSocial: "",
                idCliente: "",
                idEmpleado: 1,
            },
            //#endregion

            //#region Asiento Contable
            idAsientoContable: "",
            numeroReferencia: "",
            descripcionAsiento: "VENTAS",
            idCuentaContable: "",
            montoDebito: "",
            montoCredito: "",
            montoAsiento: "",
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
            mensajeSnackbarError: "",
            timeout: 2000,
            //#endregion
        }
    },

    created: function () {
        this.listarProductos();
        this.listarCuentas();
    },
    methods: {
        colorEstado(est) {
            return est === 'ACTIVO' ? 'green' : 'red';
        },

        generarNumeroReferencia() {
            const fechaActual = new Date();
            const formatNumber = (num) => num.toString().padStart(2, '0');

            const año = fechaActual.getFullYear();
            const mes = formatNumber(fechaActual.getMonth() + 1);
            const dia = formatNumber(fechaActual.getDate());
            const hora = formatNumber(fechaActual.getHours());
            const minutos = formatNumber(fechaActual.getMinutes());
            const segundos = formatNumber(fechaActual.getSeconds());

            return `${año}${mes}${dia}${hora}${minutos}${segundos}`;
        },

        async listarClientes() {
            try {
                const response = await axios.get("/cliente/listarclientes");
                this.datosClientes = response.data.resultado || [];
            } catch (error) {
                console.error("Error al listar clientes:", error);
            }
        },

        async listarProductos() {
            try {
                const response = await axios.get("/producto/listarproductos");
                this.datosProductos = response.data.resultado || [];
            } catch (error) {
                console.error("Error al listar productos:", error);
            }
        },

        async recuperarUltimaVenta() {
            try {
                const response = await axios.get("/venta/ultimaventa");
                this.datosUltimaVenta = response.data.resultado || [];
                this.datosUltimaVenta.forEach((venta) => {
                            this.idUltimaVenta = venta.idven;
                            this.fechaVenta = venta.creadate;
                        });
                console.log(this.idUltimaVenta);
            } catch (error) {
                console.error("Error al recuperar última venta:", error);
            }
        },

        async listarCuentas() {
            try {
                const response = await axios.get("/contabilidad/listarcuentas");
                this.datosCuentas = response.data.resultado || [];

                this.montoCredito = this.datosCuentas.reduce((total, cuenta) =>
                    cuenta.tipoc === "Ingreso" ? total + parseFloat(cuenta.saldac || 0) : total, 0);

                this.montoDebito = this.datosCuentas.reduce((total, cuenta) =>
                    cuenta.tipoc === "Gasto" ? total + parseFloat(cuenta.saldac || 0) : total, 0);

                console.log("Monto Crédito:", this.montoCredito);
                console.log("Monto Débito:", this.montoDebito);
            } catch (error) {
                console.error("Error al listar cuentas:", error);
            }
        },
        //#endregion
        //#region Registros


        numberToLetters(num) {
            const unidades = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
            const decenas = [
                "", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA",
                "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"
            ];
            const especiales = [
                "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE",
                "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE"
            ];
            const centenas = [
                "", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS",
                "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"
            ];

            // Agregar la palabra "mil" al proceso
            const miles = Math.floor(num / 1000);
            num = num % 1000;

            let texto = "";

            if (miles > 0) {
                if (miles === 1) {
                    texto += "mil ";
                } else {
                    texto += this.numberToLetters(miles) + " mil ";
                }
            }

            if (num === 0) return texto.trim();
            if (num === 100) return texto + "cien";

            // Centenas
            if (Math.floor(num / 100) > 0) {
                texto += centenas[Math.floor(num / 100)] + " ";
                num %= 100;
            }

            // Decenas
            if (num >= 10 && num < 20) {
                texto += especiales[num - 10];
                return texto.trim();
            }

            if (Math.floor(num / 10) > 0) {
                texto += decenas[Math.floor(num / 10)];
                num %= 10;

                if (num > 0) texto += " y ";
            }

            // Unidades
            if (num > 0) {
                texto += unidades[num];
            }

            return texto.trim();
        },


        transformToBolivianos(num) {
            const enteros = Math.floor(num);
            const decimales = Math.round((num - enteros) * 100);
            const literalEnteros = this.numberToLetters(enteros);
            return `${literalEnteros} CON ${decimales}/100 BOLIVIANOS`.trim();
        },

        getFormattedDateTime(oldDate) {
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            let hora = fecha.getUTCHours();
            let minutos = fecha.getMinutes();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada = dia + '_' + mes + '_' + anio + '_' + hora + '_' + minutos;

            return fechaFormateada;
        },




        calcularTotalVenta() {
            return this.datosCarrito.reduce((total, producto) => total + producto.total, 0);
        },

        async registrarVenta() {
            try {
                this.venta.total = this.calcularTotalVenta();
                const response = await axios.post("/venta/addventa/" +
                    this.totalVenta + "," +
                    this.venta.codigoControl + "," +
                    this.nit + "," +
                    this.razonSocial + "," +
                    this.idCliente + "," +
                    this.venta.idEmpleado
                );

                    this.mensajeSnackbar = response.data.message || "Venta registrada exitosamente";
                    console.log('snackbar positivo');
                    this.snackbarOK = true;
                    this.snackbarError = false;
                    this.recuperarUltimaVenta();
                    console.log('se registra el carrito')
                    await this.registrarVentasCarrito()
                    console.log('se imprime la proforma') 
                    await this.imprimirDocumentos();
                    console.log(this.idUltimaVenta)
                   
                    console.log('se registran los asientos contables')
                    this.registrarAsientosContables();
                    this.resetVenta();
            } catch (error) {
                console.error("Error al registrar la venta:", error);
                this.mensajeSnackbarError = error.response?.data?.message || error.message || "Error al registrar la venta";
                this.snackbarError = true;
                this.snackbarOK = false;
            }
        },

        resetVenta() {
            this.nombreCliente = "";
            this.paterno = "";
            this.materno = "";
            this.nit = "";
            this.datosCarrito = [];
        },

        async registrarVentasCarrito() {
            this.idUltimaVenta = this.datosUltimaVenta.idven;
            for (const producto of this.datosCarrito) {
                await this.registrarVentaCarrito(producto.idprod, producto.cant, producto.precuni);
            }
        },

        async registrarVentaCarrito(idProducto, cantidad, precioUnitario) {
            try {
                const response = await axios.post("/venta/addventacarrito", {
                    idProducto,
                    cantidad,
                    precioUnitario
                });
                if (response.data && response.data.success) {
                    this.mensajeSnackbar = response.data.message || "Producto agregado al carrito";
                    this.snackbarOK = true;
                    this.snackbarError = false;
                } else {
                    throw new Error(response.data.message || "Error al agregar producto al carrito");
                }
            } catch (error) {
                console.error("Error al registrar la venta del carrito:", error);
                this.mensajeSnackbarError = error.response?.data?.message || error.message || "Error al registrar la venta del carrito";
                this.snackbarError = true;
                this.snackbarOK = false;
            }
        },

        async registrarAsientosContables() {
            await this.listarCuentas();
            this.numeroReferencia = this.generarNumeroReferencia();
            this.idCuentaContable = this.seleccionarCuentaContableVentas();
            const totalVenta = this.calcularTotalVenta();
           
            const nuevoMontoCredito = this.montoCredito + totalVenta;

            await this.registrarAsientoContable(
                this.numeroReferencia,
                this.descripcionAsiento,
                this.idCuentaContable,
                this.montoDebito,
                totalVenta
            );

            await this.aumentarSaldo();
        },

        async registrarAsientoContable(numeroReferencia, descripcionAsiento, idCuentaContable, montoDebito, montoCredito, totalVenta) {
            try {
                const response = await axios.post("/contabilidad/addasiento/" +
                    numeroReferencia + "," +
                    descripcionAsiento + "," +
                    idCuentaContable + "," +
                    montoDebito + "," +
                    montoCredito + "," +
                    totalVenta
                );
                this.mensajeSnackbar = response.data.message;
                this.snackbarOK = true;
            } catch (error) {
                this.mensajeSnackbar = error.response?.data?.message || "Error al registrar el asiento contable";
                this.snackbarError = true;
                console.error("Error al registrar el asiento contable:", error);
            }
        },

        async aumentarSaldo() {
            try {
                const response = await axios.post("/contabilidad/aumentarsaldo/" +
                    this.idCuentaContable + "," +
                    this.totalVenta
                );
                console.log(response.data.message);
            } catch (error) {
                console.error("Error al aumentar el saldo:", error);
            }
        },

        async reducirSaldo() {
            try {
                const response = await axios.post("/contabilidad/reducirsaldo/" +
                    this.idCuentaContable + "," +
                    this.totalVenta
                );
                console.log(response.data.message);
            } catch (error) {
                console.error("Error al reducir el saldo:", error);
            }
        },

        showClientes() {
            this.clientesModal = true;
            this.listarClientes();
        },

        closeClienteModal() {
            this.clientesModal = false;
        },

        seleccionarCliente(item) {
            this.idCliente = item.idcli;
            this.nombreCliente = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.nit = item.nitcli;
            this.razonSocial = `${item.nom} ${item.pat} ${item.mat}`.trim();
            this.clientesModal = false;
        },

        seleccionarProducto(item) {
            this.productoSeleccionado = item;
            this.venta.idProducto = item.idprod;
            this.venta.precioUnitario = item.precuni;
            this.venta.total = this.cantidad * item.precuni;
            this.cantidadModal = true;
        },

        agregarProductoAlCarrito() {
            if (this.cantidad > 0) {
                this.venta.total = this.cantidad * this.venta.precioUnitario;
                const productoEnCarrito = {
                    idprod: this.venta.idProducto,
                    nomprod: this.productoSeleccionado.nomprod,
                    codprod: this.productoSeleccionado.codprod,
                    cant: this.cantidad,
                    precuni: this.venta.precioUnitario,
                    total: this.venta.total,
                    est: this.productoSeleccionado.est,
                };
                this.datosCarrito.push(productoEnCarrito);
                this.totalVenta += this.venta.total;

                console.log(this.datosCarrito);
                console.log("Total de la venta:", this.totalVenta);

                this.cantidadModal = false;
                this.cantidad = 0;
                this.productoSeleccionado = null;
            }
        },

        closeCantidad(){
            this.cantidadModal = false;
        },

        seleccionarCuentaContableVentas() {
            const cuentaVentas = this.datosCuentas.find(cuenta => cuenta.tipoc === "Ingreso");
            if (cuentaVentas) {
                return cuentaVentas.idcnt;
            } else {
                console.error("No se encontró una cuenta de ventas.");
                return null;
            }
        },

        async imprimirDocumentos(){
            this.imprimirRecibo(this.razonSocial, this.idUltimaVenta, this.fechaVenta);
            this.imprimirProforma(this.nit, this.razonSocial, this.idUltimaVenta, this.fechaVenta);
        },

        async imprimirProforma(nit, razonSocial, idventa, fechaVenta) {
            try {
                const response = await axios.get("/venta/listardetalle/" + idventa);
                const jsonData = response.data.resultado || [];

                var total = 0
                jsonData.forEach(detalle => {
                    total += detalle.cant * detalle.precuni;
                });


                const bodyData = jsonData.map(data => [
                    data.nomprod,
                    data.cant,
                    data.precuni

                ]);
                const doc = new jsPDF();
                const imageWidth = 40;
                const imageHeight = 20;
                const pageWidth = doc.internal.pageSize.getWidth();
                const xImage = (pageWidth - imageWidth) / 2;
                const yImage = 10;
                const yTitle = yImage + imageHeight + 10; 
                doc.addImage(logo, "PNG", xImage, yImage, imageWidth, imageHeight);
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text("PROFORMA", 105, yTitle, { align: "center" });
                doc.text("DRYMIX BOLIVIA SRL.", 105, 40, { align: "center" });
                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                doc.text(`NIT: 8456748562`, 105, 50, { align: "center" });
                doc.text(`N°: ${idventa}`, 105, 60, { align: "center" });
                doc.text(`FECHA: ${this.getFormattedDate(this.getDate())}`, 105, 70, { align: "center" });
                doc.text(`NIT/CI CLIENTE: ${nit}`, 105, 80, { align: "center" });
                doc.text(`NOMBRE/RAZÓN SOCIAL: ${razonSocial}`, 105, 90, { align: "center" });
                doc.setFont("helvetica", "bold");
                doc.text(`DETALLE`, 105, 100, { align: "center" })
                doc.setFontSize(9);
                let startY = 110;
                doc.autoTable({
                    startY: startY,
                    styles: {
                        fillColor: [255, 255, 255], 
                        textColor: [0, 0, 0],      
                        lineColor: [0, 0, 0],      
                        lineWidth: 0.1             
                    },
                    headStyles: {
                        fillColor: [255, 255, 255], 
                        textColor: [0, 0, 0],       
                        lineColor: [0, 0, 0],       
                        lineWidth: 0.1              
                    },
                    head: [["PRODUCTO", "CANTIDAD", "PRECIO UNITARIO"]],
                    body: bodyData
                });

                startY += 20;
                doc.setFont("helvetica", "bold");

                doc.text("TOTAL: " + total.toFixed(2) + " Bs.", 20, 10 + startY)
                doc.text("SON: "+this.transformToBolivianos(total.toFixed(2)).toUpperCase(), 20, 20 + startY )

                startY += 40;
                doc.setFontSize(8);
                doc.setFont("helvetica", "normal");
               

                doc.save("proforma_" + this.getFormattedDateTime(this.getDate()) + ".pdf");
            } catch (error) {
                console.error(error);
            }
        },

        async imprimirRecibo(razonSocial, idventa, fechaVenta) {
            try {
                const response = await axios.get("/venta/listardetalle/" + idventa);
                const jsonData = response.data.resultado || [];

                var total = 0
                jsonData.forEach(detalle => {
                    total += detalle.cant * detalle.precuni;
                });


                const bodyData = jsonData.map(data => [
                    data.nomprod,
                    data.cant,
                    data.precuni

                ]);
                const doc = new jsPDF();

                doc.setFontSize(14);
                doc.text("RECIBO", 105, 10, { align: "center" });
                doc.text("DRYMIX BOLIVIA SRL.", 105, 20, { align: "center" });
                doc.setFontSize(12);

                doc.text(`Fecha: ${this.getFormattedDate(this.getDate())}`, 105, 30, { align: "center" });
                doc.text(`NOMBRE: ${razonSocial}`, 105, 40, { align: "center" });
                doc.text(`DETALLE`, 105, 50, { align: "center" })
                doc.setFontSize(9);
                let startY = 60;
                doc.autoTable({
                    startY: startY,
                    styles: {
                        fillColor: [255, 255, 255], 
                        textColor: [0, 0, 0],      
                        lineColor: [0, 0, 0],      
                        lineWidth: 0.1             
                    },
                    headStyles: {
                        fillColor: [255, 255, 255], 
                        textColor: [0, 0, 0],       
                        lineColor: [0, 0, 0],       
                        lineWidth: 0.1              
                    },
                    head: [["PRODUCTO", "CANTIDAD", "PRECIO UNITARIO"]],
                    body: bodyData
                });

                startY += 20;
                doc.setFont("helvetica", "bold");
                doc.text("TOTAL: "+total.toFixed(2)+" Bs.", 20, 10 + startY)
                doc.text("SON: "+this.transformToBolivianos(total.toFixed(2)).toUpperCase(), 20, 20 + startY )


                doc.save("recibo_" + this.getFormattedDateTime(this.getDate()) + ".pdf");
            } catch (error) {
                console.error(error);
            }
        },

        getDate() {
            var fecha = new Date().toISOString();
            return fecha;
        },


        getFormattedDate(oldDate) {
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada = dia + '-' + mes + '-' + anio;

            return fechaFormateada;
        },

        //#endregion
    },
}
</script>