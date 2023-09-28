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


        <v-card-title>
            FORMULARIO DE VENTA
        </v-card-title>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="1">
                            <v-btn class="mx-2" fab dark x-small color="cyan" :rules="clienteRules" @click="showClientes()"
                                style="float: right" title="BUSCAR CLIENTES">
                                <v-icon dark> mdi-magnify </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-text-field v-model="nombreCliente" label="CLIENTE" :counter="100" :rules="nombreClienteRules"
                                @input="nombreCliente = nombreCliente.toUpperCase()" required disabled></v-text-field>
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
                                <v-text-field v-model="buscarproducto" append-icon="mdi-magnify" label="BUSCAR PRODUCTOS"
                                    single-line hide-details></v-text-field>
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

                    </v-row>
                </v-container>
            </v-form>
        </div>
    </v-card>
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";

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

            //#region Modals
            clientesModal: 0,
            cantidadModal: 0,
            //#endregion
        }
    },

    created: function () {
        this.listarProductos();
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
        //#endregion
        //#region Registros
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
            this.nombreCliente = item.nom;
            this.paterno = item.pat;
            this.materno = item.mat;
            this.nit = item.nitcli;
            this.clientesModal = false;
        },
        seleccionarProducto(item) {
            this.productoSeleccionado = item.nomprod;
            this.cantidadModal = true;
        },
        agregarProductoAlCarrito() {
            if (this.cantidad > 0) {
                const productoEnCarrito = {
                    nomprod: this.productoSeleccionado.nomprod,
                    codprod: this.productoSeleccionado.codprod,
                    cant: this.cantidad,
                    precuni: this.productoSeleccionado.precuni,
                    total: this.cantidad * this.productoSeleccionado.precuni,
                    est: this.productoSeleccionado.est,
                    // Agrega otros campos necesarios aquí
                };
                this.datosCarrito.push(productoEnCarrito);
                this.cantidadModal = false;
                this.cantidad = 0; // Reinicia la cantidad
                this.productoSeleccionado = null; // Reinicia el producto seleccionado
            }
        },

        //#endregion
    },
}
</script>