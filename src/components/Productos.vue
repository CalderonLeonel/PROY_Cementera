<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="lineaModal" scrollable fullscreen persistent :overlay="false" max-width="500px"
            transition="dialog-transition">

        </v-dialog>
        <div>
            productos
            <v-data-table :headers="headerProducto" :items="datosProductos" class="elevation-1" search="search">

            </v-data-table>
        </div>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            //#region Linea
            idLinea: "",
            nombreLinea: "",
            codigoLinea: "",

            datosLinea: [],
            headersLinea: [
                { text: "NOMBRE DE LINEA", value: "linea", sortable: false },
                { text: "CODIGO DE LINEA", value: "codlin", sortable: false },
                { text: "ESTADO", value: "act", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProductos: ['Producto 1', 'Cod-1', 'activo'],
            headerProducto: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codlin", sortable: false },
                { text: "ESTADO", value: "act", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ]
            //#endregion
        }
    },
    methods: {
        actualizarProductos(item) {
            this.nomnbreProducto = item.nomprod
        },
    },
};
</script>