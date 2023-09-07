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
                        <v-col cols="12" md="4">
                            <v-text-field v-model="nombreCliente" label="CLIENTE" :counter="100" :rules="nombreClienteRules"
                                @input="nombreCliente = nombreCliente.toUpperCase()" required disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                            <v-btn class="mx-2" fab dark x-small color="cyan" :rules="productoRules"
                                @click="showProductos()" style="float: right" title="BUSCAR PRODUCTOS">
                                <v-icon dark> mdi-magnify </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="nombreProducto" label="PRODUCTO" :counter="100"
                                :rules="nombreProductoRules" @input="nombreProducto = nombreProducto.toUpperCase()" required
                                disabled></v-text-field>
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
            clientesModal: 0,
            //#endregion
        }
    },

    created: function () {

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
        //#endregion
        //#region Cambios Estado
        //#endregion
        //#region Seleccion Datos
        seleccionarCliente(item){
            this.nombreCliente = item.nom + " " + item.pat;
            this.clientesModal = false;
        },
        //#endregion
    },
}
</script>