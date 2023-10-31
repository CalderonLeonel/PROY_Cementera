<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarMovimientoModal" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR MOVIMIENTO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoMovimiento" label="CODIGO MOVIMIENTO" :counter="100"
                                        :rules="codigoMovimientoRules"
                                        @input="codigoMovimiento = codigoMovimiento.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="motivoMovimiento" label="MOTIVO MOVIMIENTO" :counter="100"
                                        :rules="motivoMovimientoRules"
                                        @input="motivoMovimiento = motivoMovimiento.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="productoRules"
                                        @click="showProductos()" style="float: right" title="BUSCAR PRODUCTOS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreProducto" label="PRODUCTO" :counter="100"
                                        :rules="nombreProductoRules" @input="nombreProducto = nombreProducto.toUpperCase()"
                                        required disabled></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreFabrica" label="FABRICA" :counter="100"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        required disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="productoRules"
                                        @click="showAlmacenes()" style="float: right" title="BUSCAR ALMACENES">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreAlmacen" label="ALMACEN" :counter="100"
                                        :rules="nombreAlmacenRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        required disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="cantidadMovimiento" label="CANTIDAD" :counter="100"
                                        :rules="cantidadMovimientoRules" @input="cantidadMovimiento = cantidadMovimiento.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                        @click="closeAgregarMovimiento()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn  v-if="botonact == 1" color="#EE680B" @click="actualizarMovimiento()"
                                            style="float: left" title="ACTUALIZAR INFORMACIÓN" width="28px" height="28px">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn  v-if="botonact == 0" color="#EE680B" @click="registrarMovimiento()"
                                            style="float: left" title="REGISTRAR MOVIMIENTO" width="28px" height="28px">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn  color="#EE680B" @click="limpiar()" style="float: left"
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
        </v-dialog>

        <v-dialog v-model="infoMovimientoModal" max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DEL MOVIMIENTO:</span><br>
                    <span>{{ codigoMovimiento }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="nombreMovimiento" label="NOMBRE MOVIMIENTO" :counter="100"
                                        :rules="nombreMovimientoRules"
                                        @input="nombreMovimiento = nombreMovimiento.toUpperCase()" disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="codigoMovimiento" label="CODIGO Movimiento" :counter="100"
                                        :rules="codigoMovimientoRules"
                                        @input="codigoMovimiento = codigoMovimiento.toUpperCase()" disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1"
                                        @click="closeInfoMovimientoModal()" style="float: right" title="SALIR">
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
                <h5>MOVIMIENTOS DE PRODUCCION</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showAgregarMovimiento()">Nuevo Movimiento</v-btn>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>

                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Movimientos</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="buscarMovimiento" append-icon="mdi-magnify" label="BUSCAR MOVIMIENTO"
                                    single-line hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table :headers="headersMovimiento" :items="datosMovimiento" :search="buscarMovimiento"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="colorEstado(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>


                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.est == 'INACTIVO'" color="green" small class="mr-2"
                                        @click="activar(item)" title="ACTIVAR MOVIMIENTO">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" color="red" small class="mr-2"
                                        @click="desactivar(item)" title="DESACTIVAR MOVIMIENTO">
                                        mdi-cancel
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showEditMovimientoModal(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small class="mr-2" color="#001781" @click="showInfoMovimiento(item)"
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

export default {
    data() {
        return {
            //#region Movimiento
            idMovimiento: "",
            codigoMovimiento: "",
            motivoMovimiento: "",
            datosMovimiento: [],
            headersMovimiento: [
                { text: "CODIGO MOVIMIENTO", value: "codmov", sortable: false },
                { text: "ORIGEN", value: "orimov", sortable: false },
                { text: "DESTINO", value: "desmov", sortable: false },
                { text: "MOTIVO", value: "motmov", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Fabrica 
            idFabrica: "",
            nombreFabrica: "",
            codigoFabrica: "",
            direccionFabrica: "",
            latitud: "",
            longitud: "",
            departamento: "",
            ciudad: "",
            datosFabricas: [],
            headersFabricas: [
                { text: "NOMBRE FABRICA", value: "nomfab", sortable: false },
                { text: "CODIGO FABRICA", value: "codfab", sortable: false },
                { text: "CIUDAD", value: "ciu", sortable: false },
                { text: "DEPARTAMENTO", value: "depa", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion
            //#region Modals
            agregarMovimientoModal: 0,
            editMovimientoModal: 0,
            infoMovimientoModal: 0,
            movimientosInhabilitadosModal: 0,
            //#endregion
            botonact: 0,
        }
    },

    created: function () {
        this.listarMovimientos();
    },

    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
        listarMovimiento() {
            this.listarMovimientos();
        },
        async listarMovimientos() {
            let me = this;
            await axios
                .get("/movimiento/listarmovimientos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosMovimientos = [];

                    } else {
                        me.datosMovimientos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarMovimientoInh() {
            this.listarMovimientosInh()
        },
        async listarMovimientosInh() {
            let me = this;
            await axios
                .get("/movimiento/listarmovimientosinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosMovimientosInh = [];

                    } else {
                        me.datosMovimientosInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarFabrica() {
            this.listarFabricas();
        },
        async listarFabricas() {
            let me = this;
            await axios
                .get("/fabrica/listarfabricas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFabricas = [];

                    } else {
                        me.datosFabricas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Agregar
        registrarMovimiento() {
            this.registroMovimiento(this.nombreMovimiento, this.codigoMovimiento);
        },
        async registroMovimiento(
            nombreMovimiento,
            codigoMovimiento
        ) {
            let me = this;
            await axios
                .post(
                    "/movimiento/addmovimiento/" +
                    this.nombreMovimiento +
                    "," +
                    this.codigoMovimiento
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarMovimientos();
                    me.agregarMovimientoModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },
        //#endregion
        //#region Edicion
        editarMovimientos() {
            this.editarMovimiento(this.idMovimiento, this.nombreMovimiento, this.codigoMovimiento);
        },
        async editarMovimiento(
            idMovimiento,
            nombreMovimiento,
            codigoMovimiento
        ) {
            let me = this;
            await axios
                .post(
                    "/movimiento/updmovimiento/" +
                    this.idMovimiento +
                    "," +
                    this.nombreMovimiento +
                    "," +
                    this.codigoMovimiento
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarMovimientos();
                    me.editMovimientoModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Cambio Estados
        activar(item) {
            this.idMovimiento = item.idforma;
            this.activarMovimiento(this.idMovimiento);
        },
        async activarMovimiento(idMovimiento) {
            let me = this;
            await axios
                .post("/movimiento/onmovimiento/" + this.idMovimiento).then(function (response) {

                    me.listarMovimientos();
                    me.listarMovimientosInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idMovimiento = item.idforma;
            this.desactivarMovimiento(this.idMovimiento);
        },
        async desactivarMovimiento(idMovimiento) {
            let me = this;
            await axios
                .post("/movimiento/offmovimiento/" + this.idMovimiento).then(function (response) {

                    me.listarMovimientos();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        //#region Modals
        showAgregarMovimiento() {
            this.agregarMovimientoModal = true;
        },
        showEditMovimientoModal(item) {
            this.editMovimientoModal = true;
            this.botonact = 1;
            this.idMovimiento = item.idforma;
            this.nombreMovimiento = item.nomforma;
            this.codigoMovimiento = item.codigoMovimiento;
        },
        showMovimientosInhabilitados() {
            this.MovimientosInhabilitadosModal = true
            this.listarMovimientosInh();
        },
        showInfoMovimiento(item) {
            this.infoMovimientoModal = true;
            this.idMovimiento = item.idforma;
            this.nombreMovimiento = item.nomforma;
            this.codigoMovimiento = item.codforma;
        },
        closeInfoMovimientoModal() {
            this.infoMovimientoModal = false;
        },
        //#endregion

        limpiar() {
            this.nombreMovimiento = "";
            this.codigoMovimiento = "";
            this.idMovimiento = "";
        }
    },
}
</script>