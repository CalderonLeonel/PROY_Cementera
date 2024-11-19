<template>

<v-card elevation="5" outlined v-if=" checkAccess(2, 'SUPERVISOR' ) || checkAccess(2, 'GERENTE')">
        <div>
            <v-alert dense style="color: #ffffff;" color="blue">
                <h3>REGISTROS DE VENTAS</h3>
            </v-alert>
        </div>
        <v-container>
            <v-row >
                <v-col cols="12" md="12" >
                    <v-text-field v-model="searchVenta" append-icon="mdi-magnify" label="BUSCAR VENTA" single-line
                        hide-details></v-text-field>
                    <v-data-table :headers="headerVenta" :items="datosVenta" :search="searchVenta"
                        :custom-filter="customFilter" class="elevation-1">
                        <template #[`item.actions`]="{ item }">
                            <v-btn color="primary" small @click="imprimirFactura(item)">IMPRIMIR FACTURA</v-btn>
                                            
                            <v-btn color="secondary" small @click="imprimirRecibo(item)">IMPRIMIR RECIBO</v-btn>
                        </template>
                      
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
       

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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    data() {
        return {
            user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },


            datosVenta: [], 
            headerVenta:  [
                { text: "NÚMERO DE VENTA", value: "idven", sortable: true },
                { text: "TOTAL", value: "tot", sortable: true },
                { text: "CÓDIGO DE CONTROL", value: "codctrl", sortable: true },
                { text: "NIT", value: "nit", sortable: true },
                { text: "RAZÓN SOCIAL", value: "razsoc", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
            ],

            searchVenta: "",

            datosDetalleVenta: [],
            headerDetalleVenta:  [
                { text: "NOMPRE DE PRODCUTO", value: "nomprod", sortable: true },
                { text: "CANTIDAD", value: "cant", sortable: true },
                { text: "PRECIO UNITARIO", value: "precuni", sortable: true },
            ],

            searchProducto: "",


        }
    },
    created: function () {
        this.listarVentas();

        if (this.user != null) {
            this.user = JSON.parse(sessionStorage.getItem('session'));
        }
        if (this.user == null) {
            if (this.$route.path != '/login') {
            this.$router.push("/login");
            }
        }
    },
    computed: {
        logueado() {
            if (this.user != null) {
                this.user = JSON.parse(sessionStorage.getItem('session'));
            }
            return this.user;
            }
        }, 
    methods: {




        listarVentas() {
            this.listarVentasCompletadas();
        },

        async listarVentasCompletadas() {
            let me = this;
            await axios
                .get("/venta/listarventas")
                .then(function (response) {
                    console.log("Respuesta del servidor:", response.data);
                    if (response.data.resultado == null) {
                        me.datosCuentas = [];

                    } else {
                        me.datosVenta = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        async listarDetalleVenta(idVenta) {
            let me = this;
            await axios
                .get("/venta/listardetalleventa/" + idVenta)
                .then(function (response) {
                    console.log("Respuesta del servidor:", response.data);
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

        checkAccess(accesoCorrecto, tipoCorrecto) {
            if (this.user == null) {
                return false;
            }
            else {
                let checkedAccess = false;
                let checkedType = false;
                //Si accesoCorrecto es 0, no se requiere ningun acceso para acceder
                if (accesoCorrecto != 0) {
                this.user['accesos'].forEach(access => {
                    if (access == accesoCorrecto)
                    checkedAccess = true;
                });
                } else checkedAccess = true;

                //Si tipoCorrecto es '0', no se requiere ningun tipo de cuenta para acceder
                if (tipoCorrecto != '0') {
                if (this.user['tipo'] == tipoCorrecto) {
                    checkedType = true;
                }
                } else checkedType = true;
                if (checkedAccess && checkedType) { return true }
                else return false;
            }

        },
    }

}
</script>