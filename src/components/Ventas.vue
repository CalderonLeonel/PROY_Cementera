<template>
    <v-card elevation="5" outlined shaped>

        <v-dialog v-model="clientesModal" max-width="500px">
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
                                            label="BUSCAR CLIENTES" single-line hide-details></v-text-field>
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

        }
    },

    created: function () {

    },
    methods: {
        //#region Listados
        //#endregion
        //#region Registros
        //#endregion
        //#region Edicion
        //#endregion
        //#region Modals
        //#endregion
        //#region Cambios Estado
        //#endregion
    },
}
</script>