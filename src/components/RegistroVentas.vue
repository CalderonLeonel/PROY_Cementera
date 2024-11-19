<template>

</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    data() {
        return {
            datosVenta: [], 
            headerVenta:  [
                { text: "NÚMERO DE VENTA", value: "idven", sortable: true },
                { text: "TOTAL", value: "tot", sortable: true },
                { text: "CÓDIGO DE CONTROL", value: "codctrl", sortable: true },
                { text: "NIT", value: "nit", sortable: true },
                { text: "RAZÓN SOCIAL", value: "razsoc", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
            ],

            datosDetalleVenta: [],
            headerDetalleVenta:  [
                { text: "NOMPRE DE PRODCUTO", value: "nomprod", sortable: true },
                { text: "CANTIDAD", value: "cant", sortable: true },
                { text: "PRECIO UNITARIO", value: "precuni", sortable: true },
            ],

        }
    },
    created: function () {

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
                .get("/venta/listarventas")
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