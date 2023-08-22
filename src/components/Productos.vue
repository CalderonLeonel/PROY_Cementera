<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="formatoModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE FORMATOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarFormato" append-icon="mdi-magnify" label="BUSCAR FORMATO"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersFormato" :items="datosFormato" :search="buscarFormato"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarFormato(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeFormato()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="tipoProductoModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE TIPOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarTipo" append-icon="mdi-magnify" label="BUSCAR TIPO"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersTipoProducto" :items="datosTipoProducto" :search="buscarTipo"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarTipo(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6" @click="closeTipos()"
                                    style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="lineasModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE LINEAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarLinea" append-icon="mdi-magnify" label="BUSCAR LINEA"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersLinea" :items="datosLinea" :search="buscarLineas"
                                    :items-per-page="5" class="elevation-1" id="tableId">

                                    <template #[`item.est`]="{ item }">
                                        <v-chip :color="colorEstado(item.est)" dark>
                                            {{ item.est }}
                                        </v-chip>
                                    </template>


                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" color="#001781" @click="seleccionarLinea(item)"
                                            title="SELECCIONAR LINEA">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>

                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6" @click="closeLineas()"
                                    style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="agregarProductoModal" max-width="1000px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR PRODUCTO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreProducto" label="NOMBRE PRODUCTO" :counter="100"
                                        :rules="nombreProductoRules" @input="nombreProducto = nombreProducto.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoProducto" label="CODIGO PRODUCTO" :counter="100"
                                        :rules="codigoProductoRules" @input="codigoProducto = codigoProducto.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showFormato()" style="float: right" title="BUSCAR FORMATO">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO" :counter="50"
                                        :rules="nombreFormatoRules" @input="nombreFormato = nombreFormato.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showFormato()" style="float: right" title="BUSCAR TIPO PRODUCTO">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE TIPO PRODUCTO" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="lineaRules"
                                        @click="showLineas()" style="float: right" title="BUSCAR LINEA">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreLinea" label="NOMBRE LINEA" :counter="50"
                                        :rules="nombreLineaRules" @input="nombreLinea = nombreLinea.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon v-if="botonAct == 1" class="mx-2" fab dark small color="#EE680B"
                                            @click="actualizarProductos()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon v-if="botonAct == 0" class="mx-2" fab dark small color="#EE680B"
                                            @click="registrarProductos()" style="float: left" title="REGISTRAR PRODUCTO">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon color="#EE680B" class="mx-2" fab dark small @click="limpiar()"
                                            style="float: left" title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="#b794f6"
                                        @click="closeModalAgregarProducto()" style="float: right" title="SALIR">
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
                <h5>PRODUCTOS</h5>
            </v-alert>
        </div>

        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarProducto()">NUEVO PRODUCTO</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>PRODUCTOS</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="searchProductos" append-icon="mdi-magnify" label="BUSCAR PRODUCTOS"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headersProducto" :items="datosProductos" :search="searchProductos"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.act`]="{ item }">
                                    <v-chip :color="getColor(item.act)" dark>
                                        {{ item.act }}
                                    </v-chip>
                                </template>


                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.act == 'INACTIVO'" color="green" small class="mr-2"
                                        @click="activar(item)" title="ACTIVAR PRODUCTO">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.act == 'ACTIVO'" color="red" small class="mr-2"
                                        @click="desactivar(item)" title="DESACTIVAR PRODUCTO">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" @click="actualizarInfoProductos(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showInfoLinea(item)"
                                        title="VER INFORMACION">
                                        mdi-eye
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
//import { async } from "regenerator-runtime";

export default {
    data() {
        return {
            //#region Linea
            idLinea: "",
            nombreLinea: "",
            codigoLinea: "",

            datosLinea: [],
            headersLinea: [
                { text: "NOMBRE DE LINEA", value: "nomlin", sortable: false },
                { text: "CODIGO DE LINEA", value: "codlin", sortable: false },
                { text: "ESTADO", value: "act", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Productos
            idProducto: "",
            nombreProducto: "",
            codigoProducto: "",
            datosProducto: [],
            headersProducto: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codlin", sortable: false },
                { text: "ESTADO", value: "act", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Formato
            idFormato: "",
            codigoFormato: "",
            nombreFormato: "",
            datosFormato: [],
            headersFormato: [
                { text: "NOMBRE FORMATO", value: "", sortable: false },
                { text: "CODIGO FORMATO", value: "", sortable: false },
                { text: "ESTADO", value: "", sortable: false },
                { text: "OPCIONES", value: "", sortable: false },
            ],
            //#endregion

            //#region Tipo Producto
            idTipoProducto: "",
            codigoTipoProducto: "",
            nombreTipoProducto: "",
            datosTipoProducto: [],
            headersTipoProducto: [
                { text: "NOMBRE TIPO.P", value: "", sortable: false },
                { text: "CODIGO TIPO.P", value: "", sortable: false },
                { text: "ESTADO", value: "", sortable: false },
                { text: "OPCIONES", value: "", sortable: false },
            ],
            //#endregion

            //#region Fabrica
            idFabrica: "",
            nombreFabrica: "",
            codigoFabrica: "",
            datosFabrica: [],
            headersFabrica: [
                { text: "NOMBRE FABRICA", value: "", sortable: false },
                { text: "CODIGO FABRICA", value: "", sortable: false },
                { text: "ESTADO", value: "", sortable: false },
                { text: "OPCIONES", value: "", sortable: false },
            ],
            //#endregion

            //#region Modals
            agregarProductoModal: false,
            lineasModal: false,
            formatoModal: false,
            tipoProducto: false,

            //#endregion
            botonAct: 0,
            //#region RULES
            //#endregion
        }
    },
    created: function () {
        /*this.user = JSON.parse(sessionStorage.getItem("session"));
        this.usuario = this.user.personal;
        this.id_sede = this.user.id_sede;
        this.sede = this.user.sede;
        this.nomus = this.user.nombres + " " + this.user.paterno + " " + this.user.materno;*/
        this.listarProductos();

    },
    methods: {
        //#region Listar
        listarProducto() {
            this.listarProductos();
        },
        async listarProductos() {
            let me = this;
            await axios
                .get("/producto/listarproductos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProducto = [];

                    } else {
                        //console.log(response.data);
                        me.datosProducto = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        listarLinea() {
            this.listarLineas();
        },
        async listarLineas() {
            let me = this;
            await axios
                .get("/linea/listarlineas/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosLinea = [];

                    } else {
                        //console.log(response.data);
                        me.datosLinea = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        listarFormato() {

        },
        async listarFormatos() {

        },
        listarTipoProducto() {

        },
        async listarTipoProductos() {

        },
        listarFabrica() {

        },
        async listarFabricas() {

        },
        //#endregion
        //#region Adicionar
        addProductos() {
            this.addProducto(this.nombreProducto, this.codigoProducto, this.idtipo, this.idFormato, this.idFabrica);
        },
        //#endregion
        //#region Editar
        //#endregion
        //#region Eliminar
        //#region Modals
        showModalAgregarProducto() {
            this.agregarProductoModal = true;
        },
        closeModalAgregarProducto() {
            this.agregarProductoModal = false;
        },
        showTipos() {
            this.tipoProductoModal = true;
        },
        closeTipos() {
            this.tipoProductoModal = false;
        },
        showFormato() {
            this.formatoModal = true;
        },
        closeFormato() {
            this.formatoModal = false;
        },
        showLineas() {
            this.lineasModal = true;
            this.listarLineas();
        },
        closeLineas() {
            this.lineaModal = false;
        },
        //#endregion
        //#region Seleccion Datos
        seleccionarLinea(item) {
            this.idLinea = item.idlin;
            this.nombreLinea = item.nomlin;
            this.lineasModal = false;
        },
        seleccionarTipoProducto(item) {
            this.idTipoProducto = item.idlin;
            this.nombreTipoProducto = item.nomlin;
            this.tipoProductoModal = false;
        },
        seleccionarFormato(item) {
            this.idFormato = item.idform;
            this.nombreFormato = item.nomform;
            this.formatoModal = false;
        },

        //#endregion

        //#region Cambio Estado
        activar(item) {
            this.idProducto = item.idprod;
            this.activarProducto(this.idProducto);
        },
        async activarLinea(idProducto) {
            let me = this;
            await axios
                .post("/producto/onproducto/" + this.idProducto).then(function (response) {

                    me.listarProductos();
                    me.listarProductoInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idProducto = item.idprod;
            this.desactivarProducto(this.idProducto);
        },
        async desactivarLinea(idProducto) {
            let me = this;
            await axios
                .post("/producto/offproducto/" + this.idProducto).then(function (response) {

                    me.listarProductos();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
    },
};
</script>