<template>
    <v-card elevation="5" outline shaped>

        <v-dialog v-model="proveedoresModal" max-width="1000px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>PROVEEDORES</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Proveedores</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarProveedores" append-icon="mdi-magnify"
                                            label="BUSCAR PROVEEDOR" single-line hide-details
                                            @input="buscarProveedores = buscarProveedores.toUpperCase()"></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersProveedor" :items="datosProveedor"
                                        :search="buscarProveedores" :items-per-page="5" class="elevation-1"
                                        id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#001781"
                                                @click="seleccionarProveedor(item)" title="SELECCIONAR PROVEEDOR">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1"
                                        @click="closeClienteModal()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="cantidadMateriaPrima" persistent max-width="1000px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>REGISTRAR USO MATERIA PRIMA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <h2>Registrar Uso de Materias Primas por Producto</h2>
                                </v-col>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>Lista de Productos</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarproducto" append-icon="mdi-magnify"
                                            label="BUSCAR MATERIA PRIMA" single-line hide-details></v-text-field>
                                    </v-card-title>
                                </v-col>

                                <v-col cols="12">
                                    <v-data-table :headers="headersMateriaP" :items="datosMateriaP"
                                        :search="buscarMateriasP" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#001781"
                                                @click="showCantidadMedida(item)">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>

                                <v-col cols="12">
                                    <v-data-table :headers="headersUsoMateriaP" :items="datosUsoMateriaP"
                                        :search="buscarUsoMateriaP" :items-per-page="5" class="elevation-1"
                                        id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="red" @click="eliminarMateriaPrima(item)">
                                                mdi-close-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>

                                <v-col cols="12">
                                    <v-btn @click="registrarUsoMateriaPrima()" color="primary">Registrar
                                        Uso de
                                        Materias
                                        Primas</v-btn>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1"
                                        @click="closeCantidadMateriaPrima()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
            <!-- Dialog para cantidad y medida -->
            <v-dialog v-model="cantidadMedida" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span>Ingrese Cantidad y Medida</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="formCantidad" v-model="validCantidad" lazy-validation>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Cantidad" v-model="cantidadSeleccionada" type="number"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Medida" v-model="medidaSeleccionada"
                                            required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary" @click="agregarMateriaPrimaSeleccionada">
                            Guardar
                        </v-btn>
                        <v-btn text color="red" @click="dialogCantidadMedida = false">
                            Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-dialog>

        <div>
            <v-alert dense style="color: #ffffff;" color="cyan">
                <h5>MATERIA PRIMA</h5>
            </v-alert>
        </div>

        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-tabs horizontal color="#002245" center-active grow>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    ADD
                                    MAT.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    MAT.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    MAT
                                    INAC.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-alpha-m-box-outline
                                    </v-icon>
                                    USO
                                    MAT.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-alpha-m-box-outline
                                    </v-icon>
                                    CONT
                                    PROV.
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR MATERIA PRIMA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="proveedor" @click="showProveedor()"
                                                                style="float: right" title="BUSCAR PROVEEDOR">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="3">
                                                            <v-text-field v-model="nombreProveedor" label="PROVEEDOR"
                                                                :counter="100" :rules="nombreProveedorRules"
                                                                @input="nombreProveedor = nombreProveedor.toUpperCase()"
                                                                required disabled></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreMateria" label="NOMBRE"
                                                                :counter="25" :rules="nombreMateriaRules"
                                                                @input="nombreMateria = nombreMateria.toUpperCase()"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="2">
                                                            <v-text-field v-model="cantidad" label="CANTIDAD"
                                                                :rules="cantidadRules"
                                                                @input="cantidad = cantidad.toUpperCase()"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="2">
                                                            <v-text-field v-model="medida" label="MEDIDA" :counter="15"
                                                                :rules="medidaRules"
                                                                @input="medidad = medidad.toUpperCase()"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="12">
                                                            <v-textarea v-model="descripcion" filled label="DESCRIPCION"
                                                                auto-grow
                                                                value="Ingrese la descripcion de la materia prima"></v-textarea>
                                                        </v-col>
                                                        <v-col cols="12" md="8"></v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-toolbar dense shaped color="#002245">
                                                                <v-toolbar-title style="color:#ffffff">
                                                                    <h6>OPCIONES</h6>
                                                                </v-toolbar-title>

                                                                <v-btn v-if="botonAct == 1" class="mx-2" fab dark
                                                                    x-small color="#EE680B"
                                                                    @click="actualizarMateriaPrima()"
                                                                    style="float: left"
                                                                    title="ACTUALIZAR INFORMACIÓN Materia Prima">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn v-if="botonAct == 0" class="mx-2" fab dark
                                                                    x-small color="#EE680B"
                                                                    @click="registrarMateriaPrima()" style="float: left"
                                                                    title="REGISTRAR PRODUCTO Materia Prima">
                                                                    <v-icon dark> mdi-content-save-plus-outline
                                                                    </v-icon>
                                                                </v-btn>
                                                                <v-btn color="#EE680B" class="mx-2" fab dark x-small
                                                                    @click="limpiar()" style="float: left"
                                                                    title="LIMPIAR FORMULARIO">
                                                                    <v-icon dark> mdi-eraser </v-icon>
                                                                </v-btn>
                                                            </v-toolbar>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>LISTAR MATERIA PRIMA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5> Materias Primas</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarMateriasP"
                                                                    append-icon="mdi-magnify"
                                                                    label="BUSCAR MATERIA PRIMA" single-line
                                                                    hide-details></v-text-field>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersMateriaP"
                                                                :items="datosMateriaP" :search="buscarMateriasP"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>

                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon small class="mr-2" color="#001781"
                                                                        @click="seleccionarObservacion(item)"
                                                                        title="SELECCIONAR MATERIA PRIMA">
                                                                        mdi-check-circle
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        small class="mr-2" @click="activar(item)"
                                                                        title="ACTIVAR MATERIA PRIMA">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        small class="mr-2" @click="desactivar(item)"
                                                                        title="DESACTIVAR MATERIA PRIMA">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                </template>

                                                            </v-data-table>
                                                        </v-col>

                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>LISTAR MATERIA PRIMA INACTIVA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5> Materias Primas</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarMateriasP"
                                                                    append-icon="mdi-magnify"
                                                                    label="BUSCAR MATERIA PRIMA" single-line
                                                                    hide-details></v-text-field>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersMateriaP"
                                                                :items="datosMateriaP" :search="buscarMateriasP"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>

                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon small class="mr-2" color="#001781"
                                                                        @click="seleccionarObservacion(item)"
                                                                        title="SELECCIONAR MATERIA PRIMA">
                                                                        mdi-check-circle
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        small class="mr-2" @click="activar(item)"
                                                                        title="ACTIVAR MATERIA PRIMA">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        small class="mr-2" @click="desactivar(item)"
                                                                        title="DESACTIVAR MATERIA PRIMA">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                </template>

                                                            </v-data-table>
                                                        </v-col>

                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>REGISTRAR USO MATERIA PRIMA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <h2>Registrar Uso de Materias Primas por Producto</h2>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>Lista de Productos</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarproducto"
                                                                    append-icon="mdi-magnify" label="BUSCAR PRODUCTOS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>
                                                        </v-col>

                                                        <v-col cols="12">
                                                            <v-data-table :headers="headersProductos"
                                                                :items="datosProductos" :search="buscarproductos"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>

                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon small class="mr-2" color="#001781"
                                                                        @click="showCantidadMateriaPrima(item)">
                                                                        mdi-check-circle
                                                                    </v-icon>
                                                                </template>

                                                            </v-data-table>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-btn type="submit" color="primary">Registrar Uso de
                                                                Materias
                                                                Primas</v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>LISTAR MATERIA PRIMA INACTIVA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </v-col>





                    </v-row>

                    <div class="text-center">
                        <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00"
                            outlined>
                            <strong>{{ mensajeSnackbar }}</strong>


                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                    mdi-close
                                </v-icon>
                            </template>
                        </v-snackbar>
                    </div>
                    <div class="text-center">

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B"
                            outlined>
                            <strong>{{ mensajeSnackbarError }}</strong>

                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarError = false">
                                    mdi-close
                                </v-icon>
                            </template>
                        </v-snackbar>
                    </div>
                </v-container>
            </v-form>
        </div>


    </v-card>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            flag: 1,
            botonAct: 0,
            //#region Materia Prima
            idMateriaPrima: "",
            nombreMateria: "",
            descripcion: "",
            cantidad: "",
            medida: "",
            datosMateriaP: [],
            headersMateriaP: [
                { text: "NOMBRE MATERIA PRIMA", value: "nom", sortable: false },
                { text: "DESCRIPCION", value: "des", sortable: false },
                { text: "CANTIDAD", value: "cant", sortable: false },
                { text: "MEDIDA", value: "med", sortable: false },
                { text: "PROVEEDOR", value: "nomprov", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false }
            ],

            headersUsoMateriaP: [
                { text: "NOMBRE MATERIA PRIMA", value: "nom" },
                { text: "CANTIDAD", value: "cantidad" },  // Nueva columna
                { text: "MEDIDA", value: "medida" },      // Nueva columna
                { text: "ESTADO", value: "est" },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosUsoMateriaP: [],

            datosProductos: [],
            headersProductos: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],

            cantidadSeleccionada: "",
            medidaSeleccionada: "",
            validCantidad: false,
            productoSeleccionado: "",
            materiaPrimaSeleccionada: "",

            //#endregion

            //#region Proveedor
            idProveedor: "",
            nombreProveedor: "",
            datosProveedor: [],
            headersProveedor: [
                { text: "NOMBRE", value: "nomprv", sortable: false },
                { text: "CONTACTO 1", value: "cto1pro", sortable: false },
                { text: "CONTACTO 2", value: "cto2pro", sortable: false },
                { text: "CORREO", value: "croprov", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false }
            ],

            //#endregion

            //#region Modals
            proveedoresModal: 0,
            cantidadMateriaPrima: 0,
            cantidadMedida: 0,
            //#endregion

            //#region SnackBars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion

            //#region Producto
            idProducto: "",
            //#endregion

        }
    },
    created: function () {
        this.listarMateriaP();
        this.listarProductos();

    },
    mounted() {
        console.log(this.cantidadMateriaPrima); // Asegúrate de que no sea undefined
    },
    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
        listarMateriaP() {
            this.listarMateriasP()
        },
        async listarMateriasP() {
            let me = this;
            await axios
                .get("/materia/listarmateriasp")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosMateriaP = [];

                    } else {
                        me.datosMateriaP = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarMateriaPInh() {
            this.listarMateriasPInh()
        },
        async listarMateriasPInh() {
            let me = this;
            await axios
                .get("/materia/listarmateriapinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosMateriaPrimasInh = [];

                    } else {
                        me.datosMateriaPrimasInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarProveedores() {
            this.listarProveedor();
        },

        async listarProveedor() {
            let me = this;
            await axios
                .get("/proveedor/listarproveedores")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProveedor = [];

                    } else {
                        me.datosProveedor = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        async listarProductos() {
            let me = this;
            await axios
                .get("/producto/listarproductos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProductos = [];

                    } else {
                        me.datosProductos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion

        //#region Adicion
        registrarMateriaPrima() {
            this.registroMateriaPrima(this.nombreMateria, this.descripcion, this.cantidad, this.medida, this.idProveedor);
        },
        async registroMateriaPrima(
            nombreMateria,
            descripcion,
            cantidad,
            medida,
            idProveedor
        ) {
            let me = this;
            await axios
                .post(
                    "/materia/addmateria/" +
                    this.nombreMateria +
                    "," +
                    this.descripcion +
                    "," +
                    this.cantidad +
                    "," +
                    this.medida +
                    "," +
                    this.idProveedor
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarMateriasP();
                    me.agregarMateriaPrimaModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },

        registrarUsoMateriaPrima() {
            this.registroUsoMateriaPrima(
                this.productoSeleccionado.idprod,
                this.idMateriaPrima,
                this.materiaPrimaSeleccionada.cantidad,
                this.materiaPrimaSeleccionada.medida,
            );
        },

        async registroUsoMateriaPrima(idProducto, idMateriaPrima, cantidad, medida) {
            let me = this;
            await axios
                .post(
                    "/materia/addusomateriaprima/" +
                    idProducto +
                    "," +
                    idMateriaPrima +
                    "," +
                    cantidad +
                    "," +
                    medida
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarMateriasP();
                    me.cantidadMateriaPrima = false; // Cierra el diálogo
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });
        },
        //#endregion
        //#region Edicion
        editarMateriaPrimas() {
            this.editarMateriaPrima(this.idMateriaPrima, this.nombreMateriaPrima, this.codigoMateriaPrima);
        },
        async editarMateriaPrima(
            idMateriaPrima,
            nombreMateriaPrima,
            codigoMateriaPrima
        ) {
            let me = this;
            await axios
                .post(
                    "/MateriaPrima/updMateriaPrima/" +
                    this.idMateriaPrima +
                    "," +
                    this.nombreMateriaPrima +
                    "," +
                    this.codigoMateriaPrima
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarMateriaPs();
                    me.editMateriaPrimaModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Modals
        showAgregarMateriaPrima() {
            this.agregarMateriaPrimaModal = true;
        },
        closeAgregarMateriaPrima() {
            this.agregarMateriaPrimaModal = false;
        },
        showEditMateriaPrimaModal(item) {
            this.editMateriaPrimaModal = true;
            this.botonact = 1;
            this.idMateriaPrima = item.idlin;
            this.nombreMateriaPrima = item.nomlin;
            this.codigoMateriaPrima = item.codlin;
        },
        closeEditMateriaPrimaModal() {
            this.editMateriaPrimaModal = false;
        },
        showInfoMateriaPrima(item) {
            this.infoMateriaPrimaModal = true;
            this.idMateriaPrima = item.idlin;
            this.nombreMateriaPrima = item.nomlin;
            this.codigoMateriaPrima = item.codlin;
        },
        closeInfoMateriaPrimaModal() {
            this.infoMateriaPrimaModal = false;
        },
        showMateriaPrimaInhabilitadas() {
            this.MateriaPrimasInhabilitadasModal = true;
            this.listarMateriaPsInh();
        },
        closeMateriaPrimasInhabilitadas() {
            this.MateriaPrimasInhabilitadasModal = false;
        },
        showProveedor() {
            this.proveedoresModal = true;
            this.listarProveedores()
        },
        showCantidadMateriaPrima(item) {
            if (!item.idprod) {
                console.error("Error: El producto seleccionado no tiene id_producto.");
                return;
            }
            this.productoSeleccionado = item; // Solo asigna si es un producto válido
            this.cantidadMateriaPrima = true;
            this.listarMateriaP();

        },
        closeCantidadMateriaPrima() {
            this.cantidadMateriaPrima = false;
        },
        showCantidadMedida(item) {
            this.materiaPrimaSeleccionada = item;
            this.idMateriaPrima = item.idmat;
            this.cantidadMedida = true; // Abre el diálogo de cantidad y medida
        },
        closeCantidadMedida() {
            this.cantidadMedida = false;
        },
        //#endregion
        //#region Cambios Estado
        activar(item) {
            this.idMateriaPrima = item.idlin;
            this.activarMateriaPrima(this.idMateriaPrima);
        },
        async activarMateriaPrima(idMateriaPrima) {
            let me = this;
            await axios
                .post("/MateriaPrima/onMateriaPrima/" + this.idMateriaPrima).then(function (response) {

                    me.listarMateriaPs();
                    me.listarMateriaPsInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idMateriaPrima = item.idlin;
            this.desactivarMateriaPrima(this.idMateriaPrima);
        },
        async desactivarMateriaPrima(idMateriaPrima) {
            let me = this;
            await axios
                .post("/MateriaPrima/offMateriaPrima/" + this.idMateriaPrima).then(function (response) {

                    me.listarMateriaPs();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion

        //#region Seleccion de Datos
        seleccionarProveedor(item) {
            this.idProveedor = item.idprv;
            this.nombreProveedor = item.nomprv;
            this.proveedoresModal = false;
        },

        agregarMateriaPrimaSeleccionada() {
            if (!this.cantidadSeleccionada || !this.medidaSeleccionada) {
                console.error("Error: Debes ingresar cantidad y medida.");
                return;
            }

            // Agregar la materia prima seleccionada a la segunda tabla
            this.datosUsoMateriaP.push({
                id: this.materiaPrimaSeleccionada.id,
                nom: this.materiaPrimaSeleccionada.nom,
                est: "Pendiente",
                cantidad: this.cantidadSeleccionada,
                medida: this.medidaSeleccionada
            });

            // Limpiar los campos y cerrar el diálogo
            this.cantidadSeleccionada = "";
            this.medidaSeleccionada = "";
            this.cantidadMedida = false;
        },
        //#endregion

        limpiar() {
            this.nombreMateriaPrima = "";
            this.codigoMateriaPrima = "";
        },

        // Mover una materia prima al segundo datatable
        agregarcantidadMateriaPrima(item) {
            // Aquí la lógica para mover el item al segundo datatable
            console.log(item); // Verifica qué campos tiene el objeto seleccionado

            this.datosMateriaP = this.datosMateriaP.filter(mp => mp !== item);
            this.datosUsoMateriaP.push(item);
        },

        // Eliminar una materia prima seleccionada
        eliminarMateriaPrima(item) {
            this.datosUsoMateriaP = this.datosUsoMateriaP.filter(
                (mp) => mp !== item
            );
            this.datosMateriaP.push(item);
        },

    },
}
</script>