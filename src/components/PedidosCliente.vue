<template>
    <v-container>
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
                                <v-col cols="12" md="6"></v-col>
                                <v-col cols="12" md="6">
                                    <v-toolbar dense shaped color="#001781">
                                        <v-toolbar-title style="color: #ffffff;">
                                            <h6>OPCIONES</h6>
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

        <h2>REALIZAR PEDIDO/COTIZACION</h2>
        <v-row>
            <v-col v-for="(producto, index) in datosProductos" :key="index" cols="12" md="4">
                <v-card>
                    <v-card-title>{{ producto.nombreProducto }}</v-card-title>
                    <v-card-subtitle>Código: {{ producto.codigoProducto }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn @click="seleccionarProducto(producto)">Pedir</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-list-item>
                    <v-list-item-title class="text-center">
                        <h5>DETALLE COTIZACION</h5>
                    </v-list-item-title>
                </v-list-item>
            </v-col>

            <v-col cols="12">
                <v-data-table :headers="headersCarrito" :items="datosCarrito" :items-per-page="12" class="elevation-1"
                    id="tableId">

                    <template #[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" color="#001781" @click="seleccionarProducto()">
                            mdi-check-circle
                        </v-icon>
                    </template>

                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from "axios";
import { async } from "regenerator-runtime";
import jsPDF from 'jspdf';

export default {
    data() {
        return {
            datosProductos: [], // Lista de productos
            modalCantidad: false,
            cantidad: "",
            productoSeleccionado: "",
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
            datosCarrito: [], // Lista de productos en el carrito
            headersCarrito: [
                { text: "CODIGO DE PRODUCTO", value: "codigoProducto", sortable: false }, // Corregir el valor de la propiedad
                { text: "NOMBRE DE PRODUCTO", value: "nombreProducto", sortable: false }, // Corregir el valor de la propiedad
                { text: "CANTIDAD", value: "cantidad", sortable: false },
                { text: "PRECIO UNITARIO", value: "precioUnitario", sortable: false },
                { text: "TOTAL", value: "total", sortable: false },
                { text: "ESTADO", value: "estado", sortable: false }, // Corregir el valor de la propiedad
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            cantidadModal: 0,
        };
    },
    mounted() {
        // Al montar el componente, cargar los productos
        this.listarProductos();
    },
    methods: {
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
        seleccionarProducto(producto) {
            // Método para seleccionar un producto y abrir el modal de cantidad
            this.productoSeleccionado = producto;
            this.venta.idProducto = producto.codigoProducto;
            this.venta.precioUnitario = producto.precioUnitario; // Asegúrate de tener la propiedad precioUnitario en tu objeto de producto
            this.venta.total = this.cantidad * producto.precioUnitario;
            this.cantidadModal = true;
        },
        agregarProductoAlCarrito() {
            // Método para agregar un producto al carrito
            if (this.cantidad > 0 && this.productoSeleccionado) {
                this.venta.total = this.cantidad * this.venta.precioUnitario; // Calcula el total
                // Crea un objeto para el producto en el carrito
                const productoEnCarrito = {
                    codigoProducto: this.productoSeleccionado.codigoProducto,
                    nombreProducto: this.productoSeleccionado.nombreProducto,
                    cantidad: this.cantidad,
                    precioUnitario: this.venta.precioUnitario,
                    total: this.venta.total,
                    estado: this.productoSeleccionado.estado, // Asegúrate de tener la propiedad estado en tu objeto de producto
                };
                // Agrega el producto al carrito
                this.datosCarrito.push(productoEnCarrito);
                // Reinicia los datos
                this.cantidadModal = false;
                this.cantidad = "";
                this.productoSeleccionado = null;
            }
        },
    },
};
</script>