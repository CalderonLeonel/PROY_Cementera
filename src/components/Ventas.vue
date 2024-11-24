<template>
    <v-card elevation="5" outlined shaped>

        <v-dialog v-model="clientesModal" max-width="1000px">
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
                                            <v-icon small class="mr-2" color="#001781" @click="seleccionarCliente(item)"
                                                title="SELECCIONAR CLIENTE">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1"
                                        @click="closeClienteModal()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="cantidadModal" max-width="500px">
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
                                    <v-toolbar dense shaped color="#001781">
                                        <v-toolbar-title style="color: #ffffff;">
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn class="mx-2" fab dark x-small color="#EE680B"
                                            @click="agregarProductoAlCarrito()" style="float: left"
                                            title="AGREGAR PRODUCTO">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                    </v-toolbar>
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
                                    <h5>Lista de Productos</h5>
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
                                    <v-icon small class="mr-2" color="#001781" @click="seleccionarProducto(item)">
                                        mdi-check-circle
                                    </v-icon>
                                </template>

                            </v-data-table>
                        </v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Detalle Venta</h5>
                                </v-list-item-title>
                            </v-list-item>
                        </v-col>

                        <v-col cols="12">
                            <v-data-table :headers="headersCarrito" :items="datosCarrito" :items-per-page="12"
                                class="elevation-1" id="tableId">

                                <template #[`item.actions`]="{ item }">
                                    <v-icon small class="mr-2" color="#001781" @click="seleccionarProducto()">
                                        mdi-check-circle
                                    </v-icon>
                                </template>

                            </v-data-table>
                        </v-col>

                        <v-col cols="12" md="8"> </v-col>
                        <v-col cols="12" md="4">
                            <v-toolbar dense shaped color="#001781">
                                <v-toolbar-title style="color: #ffffff;">
                                    <h6>
                                        OPCIONES
                                    </h6>
                                </v-toolbar-title>
                                <v-btn class="mx-2" fab dark x-small color="#EE680B" @click=" imprimir()"
                                    style="float: left" title="REGISTRAR VENTA">
                                    <v-icon dark> mdi-content-save-plus-outline </v-icon>
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

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B"
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
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";
import jsPDF from 'jspdf';


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
                { text: "TELEFONO", value: "tel", sortable: true },
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
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProductoInh: [],
            headersProductoInh: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
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
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
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
        }
    },

    created: function () {
        this.listarProductos();
        this.listarCuentas();
    },
    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
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
        listarProducto() {
            this.listarProductos();
        },
        async listarProductos() {
            let me = this;
            await axios
                .get("/producto/listarproductos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProductos = [];

                    } else {
                        //console.log(response.data);
                        me.datosProductos = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        recuperarUltimasVentas() {
            this.recuperarUltimaVenta();
        },
        async recuperarUltimaVenta() {
            let me = this;
            await axios
                .get("/venta/ultimaventa")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosUltimaVenta = [];

                    } else {
                        //console.log(response.data);
                        me.datosUltimaVenta = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

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

                        // Recorrer las cuentas para calcular montoCredito y montoDebito
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
                        console.log("Monto Débito:", me.montoDebito);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Registros
        imprimir(){
         
            
            this.recuperarUltimaVenta();
            console.log(this.datosUltimaVenta)
            this.idUltimaVenta = this.datosUltimaVenta.idven; 
            console.log(this.idUltimaVenta)
            this.imprimirFactura(this.idUltimaVenta);
        },

        calcularTotalVenta() {
            return this.datosCarrito.reduce((total, producto) => total + producto.total, 0);
        },

        registrarVentas() {
            this.venta.total = this.calcularTotalVenta(); // Calcula el total antes de registrar la venta
            this.registrarVenta(this.totalVenta, this.codigoControl, this.nit, this.razonSocial, this.idCliente, this.idEmpleado);
        },

        async registrarVenta(totalVenta, codigoControl, nit, razonSocial, idCliente, idEmpleado) {
            try {
                let me = this;

                await axios.post("/venta/addventa/" +
                    this.totalVenta +
                    "," +
                    this.venta.codigoControl +
                    "," +
                    this.nit +
                    "," +
                    this.razonSocial +
                    "," +
                    this.idCliente +
                    "," +
                    this.venta.idEmpleado
                )
                    .then(function (response) {
                        me.mensajeSnackbar = response.data.message;
                        me.snackbarOK = true;

                        // Recuperar la última venta
                        me.recuperarUltimaVenta();
                        // Registrar productos del carrito
                        me.registrarVentasCarrito();
                        //Registrar asiento contable
                        me.registrarAsientosContables();
           
                        this.idUltimaVenta = this.datosUltimaVenta.idven; 
                        this.fechaVenta = this.datosUltimaVenta.creadate; 
                        me.imprimirFactura(totalVenta, codigoControl, nit, razonSocial, idUltimaVenta, fechaVenta);
                        
                        me.imprimirRecibo(totalVenta, codigoControl, nit, razonSocial, idUltimaVenta, fechaVenta);
                        //Limpiamos el formulario
                        me.resetVenta();
                    })
                    .catch(function (error) {
                        me.mensajeSnackbar = error.response.data.message;
                        me.snackbarError = true;
                    });

            } catch (error) {
                // Manejar errores en caso de que la solicitud falle
                console.error("Error al registrar la venta:", error);
            }
        },

        resetVenta() {
            // Restablece los datos del cliente y el carrito
            this.nombreCliente = "";
            this.paterno = "";
            this.materno = "";
            this.nit = "";
            this.datosCarrito = [];
            // Otros campos de reinicio según tus necesidades
        },

        async registrarVentasCarrito() {
            // Obtener el ID de la última venta
            this.idUltimaVenta = this.datosUltimaVenta.idven; // Asumiendo que "datosUltimaVenta" contiene el resultado de la última venta
            // Iterar sobre los productos en el carrito y registrarlos utilizando el ID de la última venta
            console.log(this.idUltimaVenta)

            this.datosCarrito.forEach(producto => {
                this.registrarVentaCarrito(producto.idprod, producto.cant, producto.precuni);
            });
        },

        async registrarVentaCarrito(idProducto, cantidad, precioUnitario) {
            try {
                let me = this;

                await axios.post("/venta/addventacarrito", {
                    idProducto: idProducto,
                    cantidad: cantidad,
                    precioUnitario: precioUnitario
                })
                    .then(function (response) {
                        me.mensajeSnackbar = response.data.message;
                        me.snackbarOK = true;
                    })
                    .catch(function (error) {
                        me.mensajeSnackbar = error.response.data.message;
                        me.snackbarError = true;
                    });

            } catch (error) {
                console.error("Error al registrar la venta:", error);
            }
        },

        registrarAsientosContables() {
            this.numeroReferencia = this.generarNumeroReferencia();
            this.idCuentaContable = this.seleccionarCuentaContableVentas();

            // Actualizo el total de la venta
            const totalVenta = this.datosCarrito.reduce((total, producto) => total + producto.total, 0);

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
                this.reducirSaldo();
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
                console.error("Error al registrar la venta:", error);
            }
        },

        aumentarSaldos() {
            this.aumentarSaldo()
        },

        async aumentarSaldo() {
            try {
                let me = this
                axios.post("/contabilidad/aumentarsaldo/" +
                    this.idCuentaContable +
                    "," +
                    this.totalVenta
                )
                    .then(response => {
                        // Manejar la respuesta si es necesario
                        console.log(response.data.message);
                    })
                    .catch(error => {
                        console.error("Error al aumentar el saldo:", error);
                    });
            } catch (error) {

            }
        },

        reducirSaldos() {
            this.reducirSaldo()
        },

        async reducirSaldo() {
            try {
                let me = this
                axios.post("/contabilidad/reducirsaldo/" +
                    this.idCuentaContable +
                    "," +
                    this.totalVenta
                )
                    .then(response => {
                        // Manejar la respuesta si es necesario
                        console.log(response.data.message);
                    })
                    .catch(error => {
                        console.error("Error al reducir el saldo:", error);
                    });
            } catch (error) {

            }
        },

        //#endregion
        //#region Edicion
        //#endregion
        //#region Modals
        showClientes() {
            this.clientesModal = true;
            this.listarClientes();
        },
        closeClienteModal() {
            this.clientesModal = false;
        },
        //#endregion
        //#region Cambios Estado
        //#endregion
        //#region Seleccion Datos
        seleccionarCliente(item) {
            this.idCliente = item.idcli;
            this.nombreCliente = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.nit = item.nitcli;
            this.razonSocial = item.nom + "" + item.pat + " " + item.mat;
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
                this.venta.total = this.cantidad * this.venta.precioUnitario; // Actualiza el total de la venta
                const productoEnCarrito = {
                    idprod: this.venta.idProducto,
                    nomprod: this.productoSeleccionado.nomprod,
                    codprod: this.productoSeleccionado.codprod,
                    cant: this.cantidad,
                    precuni: this.venta.precioUnitario,
                    total: this.venta.total,
                    est: this.productoSeleccionado.est,
                    // Agrega otros campos necesarios aquí
                };
                this.datosCarrito.push(productoEnCarrito);
                // Actualiza el totalVenta sumando el total del nuevo producto
                this.totalVenta += this.venta.total;

                console.log(this.datosCarrito)
                console.log("Total de la venta:", this.totalVenta);

                this.cantidadModal = false;
                this.cantidad = 0; // Reinicia la cantidad
                this.productoSeleccionado = null; // Reinicia el producto seleccionado
            }
        },

        seleccionarCuentaContableVentas() {
            // El tipo de cuenta para ventas es "Ingresos"
            const cuentaVentas = this.datosCuentas.find(cuenta => cuenta.tipoc === "Ingreso");

            if (cuentaVentas) {
                // Devolver el idCuentaContable si se encuentra una cuenta de ventas
                return cuentaVentas.idcnt;
            } else {
                console.error("No se encontró una cuenta de ventas.");
                // Puedes devolver un valor predeterminado o lanzar un error según tus necesidades
                return null; // O devuelve un valor predeterminado
            }
        },

        async imprimirFactura(totalVenta, codigoControl, nit, razonSocial, idventa, fechaVenta) {
            try {
                const response = await axios.get(`/venta/listardetalle/` + idventa);
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

                doc.setFontSize(12);
                doc.text("FACTURA", 105, 20, { align: "center" });
                doc.text("CON DERECHO A CREDITO FISCAL", 105, 30, { align: "center" });
                doc.text("Drymix Bolivia SRL.", 105, 40, { align: "center" });
                doc.setFontSize(11);
                doc.text(`NIT: 8456748562`, 105, 50, { align: "center" });
                doc.text(`Factura`, 105, 60, { align: "center" });
                doc.text(`N°: ${item.idven}`, 105, 70, { align: "center" });

                doc.text(`Fecha: ${ this.getFormattedDate(fechaVenta)}`, 105, 80, { align: "center" });
                doc.text(`NIT/CI Cliente: ${nit}`, 105, 90, { align: "center" });
                doc.text(`NOMBRE/RAZÓN SOCIAL: ${razonSocial}`, 105, 100, { align: "center" });

                doc.text(`DETALLE`, 105, 110, { align: "center" })
                doc.setFontSize(9);
                let startY = 130;   
                doc.autoTable({
                    startY: startY, 
                    styles: {
                        fillColor: [255, 255, 255], // Fondo blanco
                        textColor: [0, 0, 0],      // Texto negro
                        lineColor: [0, 0, 0],      // Bordes negros
                        lineWidth: 0.1             // Grosor del borde
                    },
                    headStyles: {
                        fillColor: [255, 255, 255], // Fondo blanco para encabezado
                        textColor: [0, 0, 0],       // Texto negro
                        lineColor: [0, 0, 0],       // Bordes negros
                        lineWidth: 0.1              // Grosor del borde
                    },
                    head: [["PRODUCTO", "CANTIDAD", "PRECIO UNITARIO"]],
                    body: bodyData
                });
                                //doc.autoTable({ head: [["PRODUCTO", "CANTIDAD", "PRECIO UNITARIO",]], body: bodyData, startY: 140 });
                    //let finalY = doc.previousAutoTable.finalY;
                    startY += 20;
                    doc.setFont("helvetica", "bold");
                    doc.text("Total: "+total.toFixed(2)+" Bs.", 110, 10 + startY)
                    doc.text("Son: "+this.transformToBolivianos(total.toFixed(2)), 120, 20 + startY )


                    startY += 40;
                    doc.setFontSize(8);
                    doc.setFont("helvetica", "normal");
                    doc.text("ESTA FACTURA CONTRIBUYE AL DESARROLLO DE NUESTRO PAÍS, EL USO ILÍCITO DE ÉSTA SERÁ SANCIONADO DE ACUERDO A LEY", 105, startY, { align: "center" });
                    doc.text("Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los servicios que utilices.", 105, startY + 10, { align: "center" });

                    doc.save("factura_"+this.getFormattedDateTime(item.creadate)+".pdf");
            } catch (error) {
                console.error(error);
            }
            },

            async imprimirRecibo(totalVenta, codigoControl, nit, razonSocial, idventa, fechaVenta) {
            try {
                const response = await axios.get(`/venta/listardetalle/` + idventa);
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
                doc.text("Drymix Bolivia SRL.", 105, 20, { align: "center" });
                doc.setFontSize(12);

                doc.text(`Fecha: ${ this.getFormattedDate(fechaVenta)}`, 105, 30, { align: "center" });
                doc.text(`NOMBRE: ${item.razsoc}`, 105, 40, { align: "center" });
                doc.text(`DETALLE`, 105, 50, { align: "center" })
                doc.setFontSize(9);
                let startY = 60;   
                doc.autoTable({
                    startY: startY, 
                    styles: {
                        fillColor: [255, 255, 255], // Fondo blanco
                        textColor: [0, 0, 0],      // Texto negro
                        lineColor: [0, 0, 0],      // Bordes negros
                        lineWidth: 0.1             // Grosor del borde
                    },
                    headStyles: {
                        fillColor: [255, 255, 255], // Fondo blanco para encabezado
                        textColor: [0, 0, 0],       // Texto negro
                        lineColor: [0, 0, 0],       // Bordes negros
                        lineWidth: 0.1              // Grosor del borde
                    },
                    head: [["PRODUCTO", "CANTIDAD", "PRECIO UNITARIO"]],
                    body: bodyData
                });
                                //doc.autoTable({ head: [["PRODUCTO", "CANTIDAD", "PRECIO UNITARIO",]], body: bodyData, startY: 140 });
                    //let finalY = doc.previousAutoTable.finalY;
                    startY += 20;
                    doc.setFont("helvetica", "bold");
                    doc.text("Total: "+total.toFixed(2)+" Bs.", 105, 10 + startY)
                    doc.text("Son: "+this.transformToBolivianos(total.toFixed(2)), 105, 20 + startY )

            
                    doc.save("recibo_"+this.getFormattedDateTime(item.creadate)+".pdf");
            } catch (error) {
                console.error(error);
            }
            },

        //#endregion
    },
}
</script>