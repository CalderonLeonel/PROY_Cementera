<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="formatoModal" persistent max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE FORMATOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarFormato" append-icon="mdi-magnify"
                                        label="BUSCAR FORMATO" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersFormatos" :items="datosFormatos" :search="buscarFormato"
                                    :items-per-page="5" class="elevation-1" id="tableId">

                                    <template #[`item.est`]="{ item }">
                                        <v-chip :color="colorEstado(item.est)" dark>
                                            {{ item.est }}
                                        </v-chip>
                                    </template>

                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large class="mr-2" color="#001781" @click="seleccionarFormato(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>

                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn iconv dark color="#00A1B1" @click="closeFormato()"
                                        style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="tipoProductoModal" persistent max-width="900px">
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
                                <v-data-table :headers="headersTipos" :items="datosTipos" :search="buscarTipo"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.est`]="{ item }">
                                        <v-chip :color="colorEstado(item.est)" dark>
                                            {{ item.est }}
                                        </v-chip>
                                    </template>
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large class="mr-2" color="#001781" @click="seleccionarTipo(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn iconv dark color="#00A1B1" @click="closeTipos()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="fabricasModal" persistent max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE FABRICAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-list-item>
                                    <v-list-item-title class="text-center">
                                        <h5>FABRICAS</h5>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-card-title>
                                    <v-text-field v-model="buscarFabricas" append-icon="mdi-magnify"
                                        label="BUSCAR FABRICAS" single-line hide-details></v-text-field>
                                </v-card-title>


                                <v-data-table :headers="headersFabrica" :items="datosFabrica" :search="buscarFabricas"
                                    :items-per-page="5" class="elevation-1" id="tableId">

                                    <template #[`item.est`]="{ item }">
                                        <v-chip :color="colorEstado(item.est)" dark>
                                            {{ item.est }}
                                        </v-chip>
                                    </template>


                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large class="mr-2" color="#001781" @click="seleccionarFabrica(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>

                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn iconv dark color="#00A1B1" @click="closeFabricas()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="infoProductoModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACION DEL PRODUCTO:</span><br>
                    <span>{{ nombreProducto }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreProducto" label="NOMBRE PRODUCTO" :counter="100"
                                        :rules="nombreProductoRules"
                                        @input="nombreProducto = nombreProducto.toUpperCase()" required
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoProducto" label="CODIGO PRODUCTO" :counter="100"
                                        :rules="codigoProductoRules"
                                        @input="codigoProducto = codigoProducto.toUpperCase()" required
                                        disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO" :counter="50"
                                        :rules="nombreFormatoRules" @input="nombreFormato = nombreFormato.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreTipo" label="NOMBRE TIPO PRODUCTO" :counter="50"
                                        :rules="nombreTipoRules" @input="nombreTipo = nombreTipo.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreFabrica" label="NOMBRE FABRICAS" :counter="50"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="red darken-1"
                                        @click="closeInfoProductoModal()" style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                    </v-btn>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editarProductoModal" persistent max-width="1000px" >
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>EDITAR PRODUCTO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreProducto" label="NOMBRE PRODUCTO" :counter="100"
                                        :rules="nombreProductoRules"
                                        @input="nombreProducto = nombreProducto.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="codigoProducto" label="CODIGO PRODUCTO" :counter="100"
                                        :rules="codigoProductoRules"
                                        @input="codigoProducto = codigoProducto.toUpperCase()" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="ProductoRules"
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
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="tipoRules"
                                        @click="showTipos()" style="float: right" title="BUSCAR TIPO PRODUCTO">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreTipoProducto" label="NOMBRE TIPO PRODUCTO"
                                        :counter="50" :rules="nombreTipoProductoRules"
                                        @input="nombreTipoProducto = nombreTipoProducto.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="fabricaRules"
                                        @click="showFabricas()" style="float: right" title="BUSCAR FABRICAS">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreFabrica" label="NOMBRE FABRICAS" :counter="50"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#ffffff">
                                        <v-toolbar-title style="color: #000000;">
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn v-if="botonAct == 1" class="mx-2" fab dark x-small color="primary"
                                            @click="editarProductos()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn v-if="botonAct == 0" class="mx-2" fab dark x-small color="success"
                                            @click="registrarProducto()" style="float: left" title="REGISTRAR PRODUCTO">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn color="error" class="mx-2" fab dark x-small @click="limpiar()"
                                            style="float: left" title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" fab dark x-small color="#b794f6" @click="closeEditarProducto()"
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

        <div>
            <v-alert dense color="cyan" style="color: #ffffff">
                <h5>PRODUCTOS</h5>
            </v-alert>
        </div>

        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-tabs horizontal color="#000000" center-active grow>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    ADD
                                    PROD.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    PROD.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    PROD
                                    INAC.
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR PRODUCTO</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="nombreProducto"
                                                                label="NOMBRE PRODUCTO" :counter="100"
                                                                :rules="nombreProductoRules"
                                                                @input="nombreProducto = nombreProducto.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="codigoProducto"
                                                                label="CODIGO PRODUCTO" :counter="100"
                                                                :rules="codigoProductoRules"
                                                                @input="codigoProducto = codigoProducto.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="ProductoRules" @click="showFormato()"
                                                                style="float: right" title="BUSCAR FORMATO">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="3">
                                                            <v-text-field v-model="nombreFormato" label="NOMBRE FORMATO"
                                                                :counter="50" :rules="nombreFormatoRules"
                                                                @input="nombreFormato = nombreFormato.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="tipoRules" @click="showTipos()"
                                                                style="float: right" title="BUSCAR TIPO PRODUCTO">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="3">
                                                            <v-text-field v-model="nombreTipoProducto"
                                                                label="NOMBRE TIPO PRODUCTO" :counter="50"
                                                                :rules="nombreTipoProductoRules"
                                                                @input="nombreTipoProducto = nombreTipoProducto.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                :rules="fabricaRules" @click="showFabricas()"
                                                                style="float: right" title="BUSCAR FABRICAS">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="3">
                                                            <v-text-field v-model="nombreFabrica"
                                                                label="NOMBRE FABRICAS" :counter="50"
                                                                :rules="nombreFabricaRules"
                                                                @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-text-field v-model="precioUnitario"
                                                                label="PRECIO PRODUCTO" :counter="100"
                                                                :rules="precioUnitarioRules"
                                                                @input="precioUnitario = precioUnitario.toUpperCase()"
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
                                                                <v-btn icon v-if="botonAct == 1" class="mx-2" fab dark
                                                                    color="#0A62BF" @click="actualizarProductos()"
                                                                    style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn icon v-if="botonAct == 0" class="mx-2" fab dark
                                                                    color="#0ABF55" @click="registrarProducto()"
                                                                    style="float: left" title="REGISTRAR PRODUCTO">
                                                                    <v-icon dark> mdi-content-save-plus-outline
                                                                    </v-icon>
                                                                </v-btn>
                                                                <v-btn icon color="error" class="mx-2" fab dark
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
                                            <span>LISTA DE PRODUCTOS</span>
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
                                                                <v-text-field v-model="searchProductos"
                                                                    append-icon="mdi-magnify" label="BUSCAR PRODUCTOS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>

                                                            <v-card-title>
                                                                <v-btn color="primary"
                                                                    @click="exportToPDFProductos()">PDF</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToCSVProductos()">CSV</v-btn>

                                                                <v-btn color="primary"
                                                                    @click="exportToExcelProductos()">EXCEL</v-btn>
                                                            </v-card-title>

                                                            <v-data-table :headers="headersProducto"
                                                                :items="datosProducto" :search="searchProductos"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>

                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        class="mx-2" large @click="activar(item)"
                                                                        title="ACTIVAR PRODUCTO">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        class="mx-2" large @click="desactivar(item)"
                                                                        title="DESACTIVAR PRODUCTO">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#001781"
                                                                        @click="showEditarProducto(item)"
                                                                        title="ACTUALIZAR INFORMACION">
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#001781"
                                                                        @click="showInfoProducto(item)"
                                                                        title="VER INFORMACION">
                                                                        mdi-eye
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
                                            <span>LISTA DE PRODUCTOS INHABILITADOS</span>
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
                                                                <v-text-field v-model="buscarproductos"
                                                                    append-icon="mdi-magnify" label="BUSCAR productoS"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>
                                                            <v-data-table :headers="headersProductoInh"
                                                                :items="datosProductoInh" :search="buscarproductos"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        large class="mr-2" @click="activar(item)"
                                                                        title="ACTIVAR productoS">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        large class="mr-2" @click="desactivar(item)"
                                                                        title="DESACTIVAR productoS">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon large class="mr-2" color="#001781"
                                                                        @click="showInfoproducto(item)"
                                                                        title="VER INFORMACION">
                                                                        mdi-eye
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
import { async } from "regenerator-runtime";
import * as XLSX from 'xlsx';


import Papa from "papaparse";

import jsPDF from "jspdf";
import 'jspdf-autotable';


export default {
    data() {
        return {
            flag: 1,

            //#region Productos
            idProducto: "",
            nombreProducto: "",
            codigoProducto: "",
            precioUnitario: "",
            searchProductos: "",
            datosProducto: [],
            headersProducto: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosProductoInh: [],
            headersProductoInh: [
                { text: "NOMBRE DE PRODUCTO", value: "nomprod", sortable: false },
                { text: "CODIGO DE PRODUCTO", value: "codprod", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Formato
            idFormato: "",
            codigoFormato: "",
            nombreFormato: "",
            datosFormatos: [],
            headersFormatos: [
                { text: "NOMBRE FORMATO", value: "nomforma", sortable: false },
                { text: "CODIGO FORMATO", value: "codforma", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Tipo Producto
            idTipo: "",
            nombreTipo: "",
            codigoTipo: "",
            buscarTipos: "",
            datosTipos: [],
            headersTipos: [
                { text: "NOMBRE T.PRODUCTO", value: "nomtipo", sortable: false },
                { text: "CODIGO T.PRODUCTO", value: "codtipo", sortable: false },
                { text: "NOMBRE producto", value: "nomlin", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Fabrica
            idFabrica: "",
            nombreFabrica: "",
            codigoFabrica: "",
            datosFabrica: [],
            headersFabrica: [
                { text: "NOMBRE FABRICA", value: "nomfab", sortable: false },
                { text: "CODIGO FABRICA", value: "codfab", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            //#endregion

            //#region Modals
            agregarProductoModal: 0,
            formatoModal: 0,
            tipoProductoModal: 0,
            fabricasModal: 0,
            productosInhabilitadosModal: 0,
            editarProductoModal: 0,
            infoProductoModal: 0,

            //#endregion
            botonAct: 0,
            //#region RULES
            //#endregion

            //#region Snackbars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
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
        this.listarProductosInh();


    },
    methods: {
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listar
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
        listarProductoInh() {
            this.listarProductosInh();
        },
        async listarProductosInh() {
            let me = this;
            await axios
                .get("/producto/listarproductosinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProductoInh = [];

                    } else {
                        //console.log(response.data);
                        me.datosProductoInh = response.data.resultado;

                    }
                    // me.listarAula(me.id_sede); actualizar tabla esta creando ciclos
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        listarFormato() {
            this.listarFormatos();
        },
        async listarFormatos() {
            let me = this;
            await axios
                .get("/formato/listarformatos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFormatos = [];

                    } else {
                        me.datosFormatos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarTipo() {
            this.listarTipos();
        },
        async listarTipos() {
            let me = this;
            await axios
                .get("/tipo/listartipos")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosTipos = [];

                    } else {
                        me.datosTipos = response.data.resultado;
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
                        me.datosFabrica = [];

                    } else {
                        me.datosFabrica = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Adicionar
        registrarProductos() {
            this.registrarProducto(this.nombreProducto, this.codigoProducto, this.idTipo, this.idFormato, this.idFabrica, this.precioUnitario);
        },
        async registrarProducto(
            nombreProducto,
            codigoProducto,
            idTipo,
            idFormato,
            idFabrica,
            precioUnitario
        ) {
            let me = this;
            await axios
                .post(
                    "/producto/addproducto/" +
                    this.nombreProducto +
                    "," +
                    this.codigoProducto +
                    "," +
                    this.idTipo +
                    "," +
                    this.idFormato +
                    "," +
                    this.idFabrica +
                    "," +
                    this.precioUnitario

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProductos();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.mensajeSnackbar = error.response.data.message;
                    nackbarError = true;
                });

        },
        //#endregion
        //#region Editar
        editarProductos() {
            this.editarProducto(this.idProducto, this.nombreProducto, this.codigoProducto);
        },
        async editarProducto(
            idProducto,
            nombreProducto,
            codigoProducto
        ) {
            let me = this;
            await axios
                .post(
                    "/producto/updproducto/" +
                    this.idProducto +
                    "," +
                    this.nombreProducto +
                    "," +
                    this.codigoProducto
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarProductos();
                    me.editarProductoModal = false;
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
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
            this.listarTipos();
        },
        closeTipos() {
            this.tipoProductoModal = false;
        },
        showFormato() {
            this.formatoModal = true;
            this.listarFormatos();
        },
        closeFormato() {
            this.formatoModal = false;
        },
        showFabricas() {
            this.fabricasModal = true;
            this.listarFabricas();
        },

        closeFabricas() {
            this.fabricasModal = false;
        },
        showProductosInhabilitados() {
            this.productosInhabilitadosModal = true;
            this.listarProductosInh();
        },
        closeProductosInhabilitados() {
            this.productosInhabilitadosModal = false;
        },
        showEditarProducto(item) {
            this.editarProductoModal = true;
            this.botonAct = 1;
            this.idProducto = item.idprod;
            this.nombreProducto = item.nomprod;
            this.codigoProducto = item.codprod;
            this.idTipo = item.idtipo;
            this.nombreTipo = item.nomtipo;
            this.idFormato = item.idform;
            this.nombreFormato = item.nomform;
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
        },
        closeEditarProducto(item) {
            this.editarProductoModal = false;
        },
        showInfoProducto(item) {
            this.infoProductoModal = true;
            this.idProducto = item.idprod;
            this.nombreProducto = item.nomprod;
            this.codigoProducto = item.codprod;
            this.idTipo = item.idtipo;
            this.nombreTipo = item.nomtipo;
            this.idFormato = item.idform;
            this.nombreFormato = item.nomform;
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
        },
        closeInfoProductoModal() {
            this.infoProductoModal = false;
        },
        //#endregion
        //#region Seleccion Datos
        seleccionarTipo(item) {
            this.idTipo = item.idtipo;
            this.nombreTipoProducto = item.nomtipo;
            this.tipoProductoModal = false;
        },
        seleccionarFormato(item) {
            this.idFormato = item.idforma;
            this.nombreFormato = item.nomforma;
            this.formatoModal = false;
        },
        seleccionarFabrica(item) {
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
            this.fabricasModal = false;
        },

        //#endregion

        //#region Cambio Estado
        activar(item) {
            this.idProducto = item.idprod;
            this.activarProducto(this.idProducto);
        },
        async activarProducto(idProducto) {
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
        async desactivarProducto(idProducto) {
            let me = this;
            await axios
                .post("/producto/offproducto/" + this.idProducto).then(function (response) {

                    me.listarProductos();
                    me.listarProductosInh();


                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion

        //#region Reports
        async exportToCSVProductos() {
            try {
                const response = await axios.get(`/producto/listarproductos/`); // Ruta adaptada para productos
                const jsonData = response.data.resultado || [];

                const csvData = Papa.unparse(jsonData);

                const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = "productos.csv";
                link.click();
            } catch (error) {
                console.error(error);
            }
        },

        async exportToExcelProductos() {
            try {
                const response = await axios.get(`/productos/listarproductosactivos/`); // Ruta adaptada para productos
                const jsonData = response.data.resultado || [];
                const worksheet = XLSX.utils.json_to_sheet(jsonData);
                const workbook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

                XLSX.writeFile(workbook, "productos.xlsx", { compression: true });

            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFProductos() {
            try {
                const response = await axios.get(`/producto/listarproductos/`); // Ruta adaptada para productos
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(item => [
                    item.codprod,
                    item.nomprod,
                    item.est,
                    item.precioUnitario
                ]);
                const doc = new jsPDF();
                doc.text("Listado de Productos", 10, 10);
                doc.autoTable({
                    head: [["Código de Producto", "Nombre de Producto", "Estado", "Precio Unitario"]],
                    body: bodyData
                });
                doc.save("productos.pdf");
            } catch (error) {
                console.error(error);
            }
        },

        async exportToPDFProductDetailed(item) {
            try {
                const response = await axios.get(`/productos/detalleproducto/` + item.idProducto); // Ruta adaptada para detalle de productos
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(data => [
                    data.nombreprod,
                    data.descripcion,
                    data.nombretipo,
                    data.precio,
                    data.stock
                ]);
                const doc = new jsPDF();
                doc.text("Detalle del Producto: " + item.nombreProducto.charAt(0).toUpperCase() + item.nombreProducto.slice(1).toLowerCase(), 10, 10);
                doc.autoTable({
                    head: [["Producto", "Descripción", "Tipo de Producto", "Precio Unitario", "Stock"]],
                    body: bodyData
                });
                doc.save("detalle_producto.pdf");
            } catch (error) {
                console.error(error);
            }
        },

        checkAccess(accesoCorrecto, tipoCorrecto) {
            //this.user = JSON.parse(sessionStorage.getItem('session'));
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
        limpiar() {
            this.nombreProducto = "";
            this.codigoProducto = "";
            this.nombreFormato = "";
            this.nombreTipo = "";
            this.nombreFabrica = "";
            this.precioUnitario = "";
            this.botonAct = 0;
        },
        //#endregion
    },
};
</script>