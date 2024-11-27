<template>

<v-card elevation="5" outlined>
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

        getDate() {
            var fecha = new Date().toISOString();
            return fecha;
        },


        getFormattedDate(oldDate) {
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            let hora = fecha.getUTCHours();
            let minutos = fecha.getMinutes();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada = dia + '-' + mes + '-' + anio + ' ' + hora + ':' + minutos;

            return fechaFormateada;
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
                    texto += numeroALetras(miles) + " mil ";
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
                .get("/venta/listardetalle/" + idVenta)
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

        async imprimirFactura(item) {
            try {
                const response = await axios.get(`/venta/listardetalle/` + item.idven);
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

                doc.text(`Fecha: ${ this.getFormattedDate(item.creadate)}`, 105, 80, { align: "center" });
                doc.text(`NIT/CI Cliente: ${item.nit}`, 105, 90, { align: "center" });
                doc.text(`NOMBRE/RAZÓN SOCIAL: ${item.razsoc}`, 105, 100, { align: "center" });

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

        async imprimirRecibo(item) {
            try {
                const response = await axios.get(`/venta/listardetalle/` + item.idven);
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

                doc.text(`Fecha: ${ this.getFormattedDate(item.creadate)}`, 105, 30, { align: "center" });
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