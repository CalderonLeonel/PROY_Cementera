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
                                    <v-data-table :headers="headersClientes" :items="datosClientes" :search="buscarClientes"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstadoCli(item.est)" dark>
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
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeClienteModal()"
                                        style="float: right" title="SALIR">
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

        <v-dialog v-model="infoVenta" max-width="1000px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DE LA VENTA:</span><br>
                    <span>{{ this.codigoControl }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nit" label="NIT" :counter="100" :rules="nitRules"
                                        @input="nit = nit.toUpperCase()" required disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="razonSocial" label="RAZON SOCIAL" :counter="100"
                                        :rules="razonSocialRules" @input="razonSocial = razonSocial.toUpperCase()" required
                                        disabled></v-text-field>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1" @click="closeInfoVenta()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>


        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>VENTAS</h5>
            </v-alert>
        </div>

        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>
                <v-row>
                    <v-col cols="12">
                        <v-tabs horizontal color="#002245" center-active grow>
                            <v-tab>
                                <v-icon left>
                                    mdi-view-list
                                </v-icon>
                                VENTAS
                                REAL.
                            </v-tab>
                            <v-tab>
                                <v-icon left>
                                    mdi-cash
                                </v-icon>
                                FORM
                                VENTA.
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
                                                    <h5>VENTAS REALIZADAS</h5>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-card-title>
                                                <v-text-field v-model="buscarVenta" append-icon="mdi-magnify"
                                                    label="BUSCAR VENTA REALIZADA" single-line hide-details></v-text-field>
                                            </v-card-title>

                                            <v-data-table :headers="headersVentas" :items="datosVentas"
                                                :search="searchVenta" :items-per-page="5" class="elevation-1" id="tableId">

                                                <template #[`item.est`]="{ item }">
                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                        {{ item.est }}
                                                    </v-chip>
                                                </template>

                                                <template #[`item.actions`]="{ item }">

                                                    <v-icon small class="mr-2" color="#001781" @click="showInfoVenta(item)"
                                                        title="VER INFORMACION">
                                                        mdi-eye
                                                    </v-icon>

                                                    <v-icon small class="mr-2" color="#001781" @click="generarFactura(item)"
                                                        title="VER FACTURA">
                                                        mdi-printer
                                                    </v-icon>

                                                </template>

                                            </v-data-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item v-if="flag == 1">
                                <v-card elevation="5" outlined shaped>
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" hidden>
                                                    <v-list-item>
                                                        <v-list-item-title class="text-center">
                                                            <h5>VENTAS REALIZADAS</h5>
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </v-col>

                                                <v-col cols="12" md="1">
                                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="clienteRules"
                                                        @click="showClientes()" style="float: right"
                                                        title="BUSCAR CLIENTES">
                                                        <v-icon dark> mdi-magnify </v-icon>
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="12" md="5">
                                                    <v-text-field v-model="nombreCliente" label="CLIENTE" :counter="100"
                                                        :rules="nombreClienteRules"
                                                        @input="nombreCliente = nombreCliente.toUpperCase()" required
                                                        disabled></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="paterno" label="PATERNO CLIENTE" :counter="100"
                                                        :rules="paternoRules" @input="paterno = paterno.toUpperCase()"
                                                        required disabled></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="materno" label="MATERNO CLIENTE" :counter="100"
                                                        :rules="maternoRules" @input="materno = materno.toUpperCase()"
                                                        required disabled></v-text-field>
                                                </v-col>

                                                <v-col cols="12" md="1"></v-col>
                                                <v-col cols="12" md="5">
                                                    <v-text-field v-model="nit" label="NIT CLIENTE" :counter="100"
                                                        :rules="nitRules" @input="nit = nit.toUpperCase()" required
                                                        disabled></v-text-field>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-list-item>
                                                        <v-list-item-title class="text-center">
                                                            <h5>Lista de Productos</h5>
                                                        </v-list-item-title>
                                                    </v-list-item>

                                                    <v-card-title>
                                                        <v-text-field v-model="buscarproducto" append-icon="mdi-magnify"
                                                            label="BUSCAR PRODUCTOS" single-line
                                                            hide-details></v-text-field>
                                                    </v-card-title>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-data-table :headers="headersProductos" :items="datosProductos"
                                                        :search="buscarproductos" :items-per-page="5" class="elevation-1"
                                                        id="tableId">

                                                        <template #[`item.est`]="{ item }">
                                                            <v-chip :color="colorEstadoProd(item.est)" dark>
                                                                {{ item.est }}
                                                            </v-chip>
                                                        </template>

                                                        <template #[`item.actions`]="{ item }">
                                                            <v-icon small class="mr-2" color="#001781"
                                                                @click="seleccionarProducto(item)">
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
                                                    <v-data-table :headers="headersCarrito" :items="datosCarrito"
                                                        :items-per-page="12" class="elevation-1" id="tableId">

                                                        <template #[`item.actions`]="{ item }">
                                                            <v-icon small class="mr-2" color="#001781"
                                                                @click="seleccionarProducto()">
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
                                                        <v-btn class="mx-2" fab dark x-small color="#EE680B"
                                                            @click="registrarVenta()" style="float: left"
                                                            title="REGISTRAR VENTA">
                                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                                        </v-btn>
                                                    </v-toolbar>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
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
            idEmpleado: 1,
            razonSocial: "",
            codigoControl: "aa",
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

            //#region Ventas
            idVenta: "",
            datosVentas: [],
            headersVentas: [
                { text: "NIT", value: "nit", sortable: false },
                { text: "COD. CONTR.", value: "codctrl", sortable: false },
                { text: "RAZ. SOCIAL", value: "razsoc", sortable: false },
                { text: "TOTAL", value: "tot", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],

            datosVentasDetalle: [],
            headersVentasDetalle: [
                { text: "NIT", value: "nit", sortable: false },
                { text: "COD. CONTR.", value: "codctrl", sortable: false },
                { text: "RAZ. SOCIAL", value: "razsoc", sortable: false },
                { text: "TOTAL", value: "tot", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Modals
            clientesModal: 0,
            cantidadModal: 0,
            flag: 1,
            infoVenta: 0,
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
        }
    },

    created: function () {
        this.listarProductos();
        this.listarVentas();
    },
    methods: {
        colorEstado(est) {
            if (est == 'COMPLETADO') return 'green'
            else return 'red'
        },
        colorEstadoProd(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        colorEstadoCli(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },

        generarFactura(item) {
            // Crea un nuevo documento jsPDF
            const doc = new jsPDF();

            // Agrega el encabezado al documento
            doc.text('Factura de Venta', 10, 10);

            // Agrega los datos de la venta
            doc.text(`ID de Venta: ${item.idven}`, 10, 20);
            doc.text(`Nit: ${item.nit}`, 10, 30);
            doc.text(`Código de Control: ${item.codctrl}`, 10, 40);
            doc.text(`Razón Social: ${item.razsoc}`, 10, 50);
            doc.text(`Total: ${item.tot}`, 10, 60);

            // Agrega una separación entre los datos de la venta y el detalle
            doc.text('Detalle de la Venta:', 10, 80);

            this.idVenta = item.idven;
            this.listarDetalles(this.idVenta)

            // Agrega el detalle de la venta
            let yPos = 90;
            for (const detalle of this.datosVentasDetalle) {
                doc.text(`ID Producto: ${detalle.idprod}`, 10, yPos);
                doc.text(`Cantidad: ${detalle.cant}`, 10, yPos + 10);
                doc.text(`Precio Unitario: ${detalle.precuni}`, 10, yPos + 20);
                doc.text(`Total Producto: ${detalle.total}`, 10, yPos + 30);
                yPos += 50; // Ajusta el espacio entre elementos
            }

            // Guarda o muestra el documento
            doc.save('factura.pdf');
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

        listarVenta() {
            this.listarVentas();
        },
        async listarVentas() {
            let me = this;
            await axios
                .get("/venta/listarventas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosVentas = [];

                    } else {
                        me.datosVentas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarDetalle() {
            this.listarDetalles(this.idVenta);
        },
        async listarDetalles(idVenta) {
            let me = this;
            await axios
                .get("/venta/listardetalle/" + this.idVenta)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosVentasDetalle = [];

                    } else {
                        me.datosVentasDetalle = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Registros
        /*registrarVentas() {
            this.registrarVenta(this.idProducto, this.cantidad, this.precioUnitario, this.total, this.codigoControl, this.nit, this.razonSocial, this.idCliente, this.idEmpleado);
        },*/
        async registrarVenta() {
            let me = this;
            if (this.datosCarrito.length > 0 && this.idCliente !== "") {
                try {
                    // Creas una lista para almacenar las ventas de cada producto
                    const ventas = [];

                    // Recorres el carrito y creas un objeto de venta por cada producto
                    for (const producto of this.datosCarrito) {
                        const venta = {
                            idProducto: producto.idprod,
                            cantidad: producto.cant,
                            precioUnitario: producto.precuni,
                            total: producto.total,
                            codigoControl: this.codigoControl, // Asegúrate de definir este dato en tus datos de componente
                            nit: this.nit, // Asegúrate de definir este dato en tus datos de componente
                            razonSocial: this.razonSocial, // Asegúrate de definir este dato en tus datos de componente
                            idCliente: this.idCliente,
                            idEmpleado: this.idEmpleado, // Asegúrate de obtener este valor de alguna parte (login, etc.)
                        };

                        ventas.push(venta);
                    }

                    // Haces una solicitud al servidor para registrar todas las ventas
                    console.log(ventas)
                    const response = await axios.post("venta/registrarventa", JSON.stringify(ventas))
                        .then(function (response) {
                            if (response.data.message === "VENTA REALIZADA CORRECTAMENTE") {
                                me.mensajeSnackbar = response.data.message;
                                me.snackbarOK = true;
                                me.resetVenta();
                            } else {
                                console.error("ERROR AL REALIZAR LA VENTA", response.error)
                                this.snackbarError = true;
                                this.mensajeSnackbar = response.data.message;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    // Manejas la respuesta como consideres necesario

                } catch (error) {
                    console.error("Error al comunicarse con el servidor:", error);
                }
            } else {
                console.error("Debe seleccionar un cliente y agregar productos al carrito antes de realizar la venta.");
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
        showInfoVenta(item) {
            this.infoVenta = true;
            this.idVenta = item.idven;
            this.nit = item.nit;
            this.codigoControl = item.codctrl;
            this.razonSocial = item.razsoc;
            this.total = item.tot;
        },
        closeInfoVenta() {
            this.infoVenta = false;
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
            this.idProducto = item.idprod;
            this.precioUnitario = item.precuni;
            this.total = this.cantidad * item.precuni;
            this.cantidadModal = true;
        },
        agregarProductoAlCarrito() {
            if (this.cantidad > 0) {
                const productoEnCarrito = {
                    idprod: this.idProducto,
                    nomprod: this.productoSeleccionado.nomprod,
                    codprod: this.productoSeleccionado.codprod,
                    cant: this.cantidad,
                    precuni: this.precioUnitario,
                    total: this.cantidad * this.precioUnitario,
                    est: this.productoSeleccionado.est,
                    // Agrega otros campos necesarios aquí
                };
                this.datosCarrito.push(productoEnCarrito);
                this.cantidadModal = false;
                this.productoSeleccionado = null; // Reinicia el producto seleccionado
                console.log(this.datosCarrito)

            }
        },

        //#endregion
    },
}
</script>