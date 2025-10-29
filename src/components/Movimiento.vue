<template>
    <v-card elevation="5" outlined shaped>

        <v-dialog v-model="productosModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE PRODUCTOS:</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>PRODUCTOS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="searchProductos" append-icon="mdi-magnify"
                                            label="BUSCAR PRODUCTOS" single-line hide-details></v-text-field>
                                    </v-card-title>

                                    <v-data-table :headers="headersProducto" :items="datosProducto"
                                        :search="searchProductos" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#0A62BF"
                                                @click="seleccionarProducto(item)">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="12" sm="4" md="12">
                                    <v-btn iconv dark color="#00A1B1" @click="closeProductos()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="fabricasModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE FÁBRICAS:</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>FÁBRICAS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="searchFabricas" append-icon="mdi-magnify"
                                            label="BUSCAR FÁBRICAS" single-line hide-details></v-text-field>
                                    </v-card-title>

                                    <v-data-table :headers="headersFabricas" :items="datosFabricas"
                                        :search="searchFabricas" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#0A62BF"
                                                @click="seleccionarFabrica(item)">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeFabricas()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                               
                            </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="almacenesModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ALMACENES:</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>ALMACENES</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="searchAlmacenes" append-icon="mdi-magnify"
                                            label="BUSCAR ALMACENES" single-line hide-details></v-text-field>
                                    </v-card-title>

                                    <v-data-table :headers="headersAlmacenes" :items="datosAlmacenes"
                                        :search="searchAlmacenes" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.est`]="{ item }">
                                            <v-chip :color="colorEstado(item.est)" dark>
                                                {{ item.est }}
                                            </v-chip>
                                        </template>

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" color="#0A62BF"
                                                @click="seleccionarAlmacen(item)">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeAlmacenes()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                               
                            </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editMovimientoModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>EDITAR MOVIMIENTO:</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                                    <v-form ref="form" v-model="valid" lazy-validation>
                                                        <v-container>
                                                            <v-row>
                                                                <v-col cols="12"></v-col>

                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="codigoMovimiento"
                                                                        label="CÓDIGO MOVIMIENTO" :counter="100"
                                                                        :rules="codigoMovimientoRules"
                                                                        @input="codigoMovimiento = codigoMovimiento.toUpperCase()"
                                                                        required></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="motivoMovimiento"
                                                                        label="MOTIVO MOVIMIENTO" :counter="100"
                                                                        :rules="motivoMovimientoRules"
                                                                        @input="motivoMovimiento = motivoMovimiento.toUpperCase()"
                                                                        required></v-text-field>
                                                                </v-col>
                                                               
                                                                <v-col cols="12" md="3">
                                                                    <v-text-field v-model="nombreProducto"
                                                                        label="PRODUCTO" :counter="100"
                                                                        :rules="nombreProductoRules"
                                                                        @input="nombreProducto = nombreProducto.toUpperCase()"
                                                                        required disabled></v-text-field>
                                                                </v-col>
                                                            
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="nombreFabrica"
                                                                        label="FÁBRICA" :counter="100"
                                                                        :rules="nombreFabricaRules"
                                                                        @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                                                        required disabled></v-text-field>
                                                                </v-col>
                                                               
                                                                <v-col cols="12" md="3">
                                                                    <v-text-field v-model="nombreAlmacen"
                                                                        label="ALMACÉN" :counter="100"
                                                                        :rules="nombreAlmacenRules"
                                                                        @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                                                        required disabled></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="cantidadMovimiento"
                                                                        label="CANTIDAD" :counter="100"
                                                                        :rules="cantidadMovimientoRules"
                                                                        @input="cantidadMovimiento = cantidadMovimiento.toUpperCase()"
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
                                                                        <v-btn icon v-if="botonact == 1" class="mx-2"
                                                                            fab dark color="#0A62BF"
                                                                            @click="editarMovimiento()"
                                                                            style="float: left"
                                                                            title="ACTUALIZAR INFORMACIÓN">
                                                                            <v-icon dark> mdi-pencil </v-icon>
                                                                        </v-btn>
                                                                        <v-btn icon v-if="botonact == 0" class="mx-2"
                                                                            fab dark color="#0ABF55"
                                                                            @click="registrarMovimiento()"
                                                                            style="float: left"
                                                                            title="REGISTRAR MOVIMIENTO">
                                                                            <v-icon dark> mdi-content-save
                                                                            </v-icon>
                                                                        </v-btn>
                                                                        <v-btn icon class="mx-2" fab dark
                                                                            color="#BF120A" @click="limpiar()"
                                                                            style="float: left"
                                                                            title="LIMPIAR FORMULARIO">
                                                                            <v-icon dark> mdi-eraser </v-icon>
                                                                        </v-btn>
                                                                    </v-toolbar>
                                                                </v-col>
                                                                <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeEditMovimientoModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                               
                            </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-form>
                                                </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="infoMovimientoModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACIÓN DEL MOVIMIENTO:</span><br>
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
                                        @input="nombreMovimiento = nombreMovimiento.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="12" md="2"></v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="codigoMovimiento" label="CÓDIGO MOVIMIENTO" :counter="100"
                                        :rules="codigoMovimientoRules"
                                        @input="codigoMovimiento = codigoMovimiento.toUpperCase()"
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeInfoMovimientoModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>



        <div>
            <v-alert dense color="cyan" style="color: #ffffff">
                <h5>MOVIMIENTOS DE PRODUCCIÓN</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-card class="white--text" color="grey lighten-4" max-width="100%">
                        <v-card-actions>

                            <v-row>
                                <v-col cols="12">
                                    <v-tabs horizontal color="#002245" center-active grow>
                                        <v-tab>
                                            <v-icon left>

                                                mdi-list-box
                                            </v-icon>
                                            LISTA
                                            MOVS.
                                        </v-tab>
                                        <v-tab>
                                            <v-icon left>
                                                mdi-plus-network
                                            </v-icon>
                                            FORM
                                            MOV.
                                        </v-tab>

                                        <v-tab-item v-if="flag == 1">
                                            <v-card elevation="5" outlined shaped>

                                                <v-row>
                                                    <v-col cols="12"></v-col>

                                                    <v-col cols="12">
                                                        <v-list-item>
                                                            <v-list-item-title class="text-center">
                                                                <h5>MOVIMIENTOS</h5>
                                                            </v-list-item-title>
                                                        </v-list-item>

                                                        <v-card-title>
                                                            <v-text-field v-model="buscarMovimiento"
                                                                append-icon="mdi-magnify" label="BUSCAR MOVIMIENTO"
                                                                single-line hide-details></v-text-field>
                                                        </v-card-title>


                                                        <v-data-table :headers="headersMovimientos"
                                                            :items="datosMovimientos" :search="buscarMovimiento"
                                                            :items-per-page="5" class="elevation-1" id="tableId">

                                                            <template #[`item.est`]="{ item }">
                                                                <v-chip :color="colorEstadoMov(item.est)" dark>
                                                                    {{ item.est }}
                                                                </v-chip>
                                                            </template>


                                                            <template #[`item.actions`]="{ item }">
                                                                <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                    class="mx-2" large @click="activar(item)"
                                                                    title="ACTIVAR MOVIMIENTO">
                                                                    mdi-check-circle-outline
                                                                </v-icon>
                                                                <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                    class="mx-2" large @click="desactivar(item)"
                                                                    title="DESACTIVAR MOVIMIENTO">
                                                                    mdi-cancel
                                                                </v-icon>
                                                                <v-icon class="mx-2" large color="#0A62BF"
                                                                    @click="showEditMovimientoModal(item)"
                                                                    title="ACTUALIZAR INFORMACIÓN">
                                                                    mdi-pencil
                                                                </v-icon>
                                                                <v-icon class="mx-2" large color="#0A62BF"
                                                                    @click="showInfoMovimiento(item)"
                                                                    title="VER INFORMACIÓN">
                                                                    mdi-eye
                                                                </v-icon>
                                                            </template>

                                                        </v-data-table>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-tab-item>

                                        <v-tab-item v-if="flag == 1">
                                            <v-card elevation="5" outlined shaped>
                                                <v-row>
                                                    <v-form ref="form" v-model="valid" lazy-validation>
                                                        <v-container>
                                                            <v-row>
                                                                <v-col cols="12"></v-col>

                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="codigoMovimiento"
                                                                        label="CÓDIGO MOVIMIENTO" :counter="100"
                                                                        :rules="codigoMovimientoRules"
                                                                        @input="codigoMovimiento = codigoMovimiento.toUpperCase()"
                                                                        required></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="motivoMovimiento"
                                                                        label="MOTIVO MOVIMIENTO" :counter="100"
                                                                        :rules="motivoMovimientoRules"
                                                                        @input="motivoMovimiento = motivoMovimiento.toUpperCase()"
                                                                        required></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="1">
                                                                    <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                        @click="showProductos()"
                                                                        style="float: right" title="BUSCAR PRODUCTOS">
                                                                        <v-icon dark> mdi-magnify </v-icon>
                                                                    </v-btn>
                                                                </v-col>
                                                                <v-col cols="12" md="3">
                                                                    <v-text-field v-model="nombreProducto"
                                                                        label="PRODUCTO" :counter="100"
                                                                        :rules="nombreProductoRules"
                                                                        @input="nombreProducto = nombreProducto.toUpperCase()"
                                                                        required disabled></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="1">
                                                                    <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                         @click="showFabricas()"
                                                                        style="float: right" title="BUSCAR FÁBRICAS">
                                                                        <v-icon dark> mdi-magnify </v-icon>
                                                                    </v-btn>
                                                                </v-col>
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="nombreFabrica"
                                                                        label="FÁBRICA" :counter="100"
                                                                        :rules="nombreFabricaRules"
                                                                        @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                                                        required disabled></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="1">
                                                                    <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                         @click="showAlmacenes()"
                                                                        style="float: right" title="BUSCAR ALMACENES">
                                                                        <v-icon dark> mdi-magnify </v-icon>
                                                                    </v-btn>
                                                                </v-col>
                                                                <v-col cols="12" md="3">
                                                                    <v-text-field v-model="nombreAlmacen"
                                                                        label="ALMACÉN" :counter="100"
                                                                        :rules="nombreAlmacenRules"
                                                                        @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                                                        required disabled></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field v-model="cantidadMovimiento"
                                                                        label="CANTIDAD" :counter="100"
                                                                        :rules="cantidadMovimientoRules"
                                                                        @input="cantidadMovimiento = cantidadMovimiento.toUpperCase()"
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
                                                                        <v-btn icon v-if="botonact == 1" class="mx-2"
                                                                            fab dark color="#0A62BF"
                                                                            @click="editarMovimiento()"
                                                                            style="float: left"
                                                                            title="ACTUALIZAR INFORMACIÓN">
                                                                            <v-icon dark> mdi-pencil </v-icon>
                                                                        </v-btn>
                                                                        <v-btn icon v-if="botonact == 0" class="mx-2"
                                                                            fab dark color="#0ABF55"
                                                                            @click="registrarMovimiento()"
                                                                            style="float: left"
                                                                            title="REGISTRAR MOVIMIENTO">
                                                                            <v-icon dark> mdi-content-save
                                                                            </v-icon>
                                                                        </v-btn>
                                                                        <v-btn icon class="mx-2" fab dark
                                                                            color="#BF120A" @click="limpiar()"
                                                                            style="float: left"
                                                                            title="LIMPIAR FORMULARIO">
                                                                            <v-icon dark> mdi-eraser </v-icon>
                                                                        </v-btn>
                                                                    </v-toolbar>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-form>
                                                </v-row>
                                            </v-card>
                                        </v-tab-item>

                                    </v-tabs>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>

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

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="error"
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
            valid: true,
            flag: 1,
            //#region Movimiento
            idMovimiento: "",
            codigoMovimiento: "",
            motivoMovimiento: "",
            cantidadMovimiento: "",
            datosMovimientos: [],
            headersMovimientos: [
                { text: "CÓDIGO MOVIMIENTO", value: "codmov", sortable: false },
                { text: "MOVIMIENTO", value: "nommov", sortable: false },
                { text: "ORIGEN", value: "nomfab", sortable: false },
                { text: "DESTINO", value: "nomalm", sortable: false },
                { text: "CANTIDAD", value: "cant", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
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
                { text: "CÓDIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProductoInh: [],
            headersProductoInh: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CÓDIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Fabrica 
            idFabrica: 1,
            nombreFabrica: "",
            codigoFabrica: "",
            direccionFabrica: "",
            latitud: "",
            longitud: "",
            idDepartamento: "",
            departamento: "",
            idCiudad: "",
            ciudad: "",
            datosFabricas: [],
            headersFabricas: [
                { text: "NOMBRE FÁBRICA", value: "nomfab", sortable: false },
                { text: "CÓDIGO FÁBRICA", value: "codfab", sortable: false },
                { text: "CIUDAD", value: "nomciu", sortable: false },
                { text: "DEPARTAMENTO", value: "nomdep", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Almacen
            idAlmacen: 1,
            nombreAlmacen: "",
            datosAlmacenes: [],
            headersAlmacenes: [
                { text: "NOMBRE DE ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "DESCRIPCIÓN DE ALMACÉN", value: "descripcion", sortable: true },
                { text: "CÓDIGO ALMACÉN", value: "codigo", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
            ],
            //#endregion

            //#region Modals
            agregarMovimientoModal: 0,
            editMovimientoModal: 0,
            infoMovimientoModal: 0,
            movimientosInhabilitadosModal: 0,
            productosModal: 0,
            fabricasModal: 0,
            almacenesModal: 0,
            //#endregion
            botonact: 0,

            //#region Snackbars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion

            cantidadMovimientoRules: [
                (v) => !!v || "CANTIDAD DE MOVIMIENTO ES REQUERIDO",
            ],
            nombreAlmacenRules: [
                (v) => !!v || "NOMBRE DE ALMACEN ES REQUERIDO",
            ],
            nombreFabricaRules: [
                (v) => !!v || "NOMBRE DE LA FABRICA ES REQUERIDA",
            ],
            nombreProductoRules: [
                (v) => !!v || "NOMBRE DEL PRODUCTO ES REQUERIDO",
            ],

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
        colorEstadoMov(est) {
            if (est == 'PENDIENTE') return 'orange'
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
        listarProducto() {
            this.listarProductos();
        },
        async listarProductos() {
            let me = this;
            await axios
                .get("/producto/listarproductos")
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

        async listarAlmacenes() {
          let me = this;
          await axios
            .get("/almacen/listaralmacenesactivos/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosAlmacenes = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosAlmacenes = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        //#endregion
        //#region Agregar
        registrarMovimiento() {
            this.registroMovimiento(this.codigoMovimiento, this.idProducto, this.idFabrica, this.idAlmacen, this.cantidadMovimiento);
        },
        async registroMovimiento(
            codigoMovimiento,
            idProducto,
            idFabrica,
            idAlmacen,
            cantidadMovimiento
        ) {
            let me = this;
            await axios
                .post(
                    "/movimiento/addmovimiento/" +
                    this.codigoMovimiento +
                    "," +
                    this.idProducto +
                    "," +
                    this.idFabrica +
                    "," +
                    this.idAlmacen +
                    "," +
                    this.cantidadMovimiento
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarMovimientos();
                    me.limpiar();
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
            this.idMovimiento = item.idmov;
            this.nombreMovimiento = item.nomforma;
            this.codigoMovimiento = item.codmov;
            this.cantidadMovimiento = item.cant;
            this.nombreFabrica = item.nomfab;
            this.nombreAlmacen = item.nomalm;
            this.nombreProducto = item.nomprod;
        },

        closeEditMovimientoModal(){
            this.limpiar();
            this.editMovimientoModal = false;
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

        showProductos() {
            this.productosModal = true;
            this.listarProductos();
        },
        closeProductos() {
            this.productosModal = false;
        },
        showFabricas() {
            this.fabricasModal = true;
            this.listarFabricas();
        },
        closeFabricas() {
            this.fabricasModal = false;
        },

        showAlmacenes() {
            this.almacenesModal = true;
            this.listarAlmacenes();
        },
        closeAlmacenes() {
            this.almacenesModal = false;
        },
        //#endregion

        limpiar() {
            this.nombreMovimiento = "";
            this.codigoMovimiento = "";
            this.idMovimiento = "";
        },
        //#region Seleccion de Datos
        seleccionarProducto(item) {
            this.idProducto = item.idprod;
            this.nombreProducto = item.nomprod;
            this.productosModal = false;
        },
        seleccionarFabrica(item) {
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
            this.fabricasModal = false;
        },

        seleccionarAlmacen(item) {
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.almacenesModal = false;
        },
        //#endregion


         //#region Inventory
        async registrarInventario(
            idItem,
            idAlmacen,
            movimiento,
            cantidad,
            estado,
            referencia,
            motivo,
            lote
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregarinventario/" +
                    idItem +
                    "," +
                    idAlmacen +
                    "," +
                    movimiento +
                    "," +
                    cantidad +
                    "," +
                    estado +
                    "," +
                    referencia +
                    "," +
                    motivo +
                    "," +
                    lote
                )
                .then(function (response) {

                    me.mensajeSnackbar = "PRODUCTO CORRECTAMENTE REGISTRADO EN EL INVENTARIO";
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
                

        },
        //#endregion

    },
}
</script>