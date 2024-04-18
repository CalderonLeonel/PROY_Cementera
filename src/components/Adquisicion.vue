<template>
    <v-card elevation="5" outlined>
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="success" outlined>
                <strong>{{ mensajeSnackbar }}</strong>
                <template v-slot:action="{ attrs }">
                    <v-icon right v-bind="attrs" @click="snackbarOK = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

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
        <v-alert v-if="existencias == false" type="error" color="red darken-2" icon="mdi-alert-circle" dense prominent>
            <div class="text-h6">
                SE REQUIERE LA COMPRA DE EXISTENCIAS EN EL INVENTARIO
            </div>
            POR FAVOR, COTICE UNA ADQUISICION PARA TENER EXISTENCIAS DE <strong>{{this.itemsCriticos}}</strong> NECESARIAS PARA
            EL
            FUNCIONAMIENTO DE LA FABRICA
        </v-alert>
        <v-alert v-if="existencias == true" type="success" color="green darken-2" dismissible dense prominent>
            <div class="text-h5">
                SE TIENEN LAS EXISTENCIAS NECESARIAS EN EL INVENTARIO
            </div>

        </v-alert>
        <div>
            <v-alert dense style="color: #ffffff;" color="purple">
                <h3>COTIZACIONES</h3>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>

                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarCotizacionAdquisicion()">NUEVA COTIZACION DE
                                ADQUISICIONES</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h3>COTIZACIONES DE ADQUISICIONES</h3>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="searchCotizacionAdquisicion" append-icon="mdi-magnify"
                                    label="BUSCAR COTIZACIONES" single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerCotizacionAdquisicion" :items="datosCotizacionAdquisicion"
                                :search="searchCotizacionAdquisicion" :items-per-page="5" class="elevation-1"
                                id="tableId">


                                <template #[`item.fechaVencimiento`]="{ item }">
                                    {{ getFormattedDate(item.fechaVencimiento) }}
                                </template>


                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ getState(item.estado) }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.estado == 'PENDIENTE'" x-large color="primary" class="mr-2" @click="agregarItem(item)"
                                        title="AGREGAR ITEMS">
                                        mdi-playlist-plus
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'PENDIENTE'" class="mr-2" color="primary" x-large
                                        @click="llenarCamposCotizacionAdquisicion(item)" title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                   
                                    <v-icon x-large color="primary" class="mr-2" @click="mostrarItems(item)"
                                        title="VER ITEMS">
                                        mdi-eye
                                    </v-icon>
                                    <v-icon v-if="item.estado != 'PENDIENTE'" class="mr-2" color="primary" x-large @click="exportToPDFDetailed(item)"
                                        title="VER PDF">
                                        mdi-file-pdf-box
                                    </v-icon>
                                </template>




                            </v-data-table>
                        </v-col>
                    </v-row>
                     <!--<v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarCotizacionItem()">NUEVA COTIZACION DE
                                ITEM</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h3>COTIZACION DE ITEMS</h3>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="searchCotizacionItem" append-icon="mdi-magnify"
                                    label="BUSCAR UNA COTIZACION DE UN ITEM" single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerCotizacionItem" :items="datosCotizacionItem"
                                :search="searchCotizacionItem" :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ getState(item.estado) }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large
                                        @click="llenarCamposCotizacionItem(item)" title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2"
                                        @click="activar(item)" title="ACTIVAR COTIZACION">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2"
                                        @click="confirmacionAnulacionCotizacionItem(item)"
                                        title="DESACTIVAR COTIZACION">
                                        mdi-close-circle
                                    </v-icon>
                                </template>




                            </v-data-table>
                        </v-col>
                    </v-row>-->
                    <v-row>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h3>GESTIÓN DE COTIZACIONES POR APROBAR</h3>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="searchCotizacion" append-icon="mdi-magnify"
                                    label="BUSCAR COTIZACIONES" single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerCotizacion" :items="datosCotizacion"
                                :search="searchCotizacion" :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.fechaVencimiento`]="{ item }">
                                    {{ getFormattedDate(item.fechaVencimiento) }}
                                </template>

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large @click="mostrarItems(item)"
                                        title="VER ITEMS">
                                        mdi-eye
                                    </v-icon>
                                    <v-icon class="mr-2" color="primary" x-large @click="exportToPDFDetailed(item)"
                                        title="VER PDF">
                                        mdi-file-pdf-box
                                    </v-icon>
                                    <v-icon class="mr-2" color="green" x-large @click="aprobarAdquisicion(item)"
                                        title="APROBAR">
                                        mdi-check-circle
                                    </v-icon>
                                    <v-icon class="mr-2" color="red" x-large @click="denegarAdquisicion(item)"
                                        title="DENEGAR">
                                        mdi-close-circle
                                    </v-icon>
                                </template>




                            </v-data-table>
                        </v-col>
                    </v-row>

                </v-container>
            </v-form>

        </div>

      <v-dialog v-model="agregarCotizacionAdquisicionModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR COTRIZACION DE ADQUISICION</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openProveedorModal()" style="float: right" title="BUSCAR PROVEEDOR">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreProveedor" label="NOMBRE PROVEEDOR" :counter="60"
                                        :rules="nombreRules" @input="nombreProveedor = nombreProveedor.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8">
                                    <v-text-field v-model="nombreCotizacion" label="NOMBRE DE LA COTIZACION"
                                        :counter="100" @input="nombreCotizacion = nombreCotizacion.toUpperCase()"
                                        :rules="nombreCotizacionRules" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-subheader class="text-h5">FECHA DE VENCIMIENTO:</v-subheader>
                                </v-col>
                                <v-col cols="12" md="8">
                                    <v-menu v-model="menuFecha" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="fechaVencimiento" label="FECHA DE VENCIMIENTO"
                                                prepend-icon="mdi-calendar" readonly required :rules="fechaRules"
                                                v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="fechaVencimiento" @input="menuFecha = false" locale="es"
                                            color="blue lighten-1" header-color="primary"
                                            :min="getDate()"></v-date-picker>
                                    </v-menu>
                                   </v-col>

                                <v-col cols="12" md="12">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="DOCUMENTO DE COTIZACION"></v-file-input>
                                </v-col>


                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonactCot == 1" color="#0A62BF"
                                                @click="editarCotizacionAdq()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonactCot == 0" color="#0ABF55"
                                                @click="registrarCotizacionAdq()" style="float: left"
                                                title="REGISTRAR COTIZACION DE ADQUISICION" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon color="#BF120A" @click="limpiar()" style="float: left" large
                                                class="mx-2" title="LIMPIAR FORMULARIO">
                                                <v-icon dark> mdi-eraser </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarCotizacionAdquisicion()" style="float: right"
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

        <v-dialog v-model="itemModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ITEMS ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchItem" append-icon="mdi-magnify"
                                        label="BUSCAR ITEMS ACTIVOS" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerItem" :items="datosItem" :search="searchItem"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarItem(item)">
                                            mdi-check-circle
                                        </v-icon>
                                        
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeItemModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>



        <v-dialog v-model="cotizacionModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE COTIZACIONES CREADAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchCotizacion" append-icon="mdi-magnify"
                                        label="BUSCAR COTIZACIONES CREADAS" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerCotizacionAdquisicion" :items="datosCotizacion"
                                    :search="searchCotizacion" :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.fechaVencimiento`]="{ item }">
                                        {{ getFormattedDate(item.fechaVencimiento) }}
                                    </template>
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarCotizacion(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeCotizacionModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>


        <v-dialog v-model="proveedorModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE TIPO DE PROVEEDORES ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchProveedor" append-icon="mdi-magnify"
                                        label="BUSCAR PROVEEDOR ACTIVO" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerProveedor" :items="datosProveedor"
                                    :search="searchProveedor" :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarProveedor(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeProveedorModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>



        <v-dialog v-model="agregarCotizacionItemModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR COTIZACION DE UN ITEM</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <!--<v-col cols="12" md="2">
                                    <v-btn class="mx-2" v-if="botonactCotIt == 0 && this.idCotizacion!=null && this.nombreCotizacion!=null " fab dark x-small color="cyan"
                                        :rules="nombreRules" @click="openCotizacionModal()" style="float: right"
                                        title="BUSCAR COTIZACION">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="10">
                                    <v-text-field v-model="nombreCotizacion"  v-if=" this.idCotizacion!=null && this.nombreCotizacion!=null " label="NOMBRE COTIZACION" :counter="100"
                                        :rules="nombreCotizacionRules"
                                        @input="nombreCotizacion = nombreCotizacion.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>-->

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" v-if="botonactCotIt == 0" fab dark x-small color="cyan" :disabled='nombreCotizacion==null' 
                                        :rules="nombreRules" @click="openItemModal()" style="float: right"
                                        title="BUSCAR ITEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ITEM" :counter="60" :disabled='nombreCotizacion==null'
                                        :rules="nombreItemRules" @input="nombreItem = nombreItem.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="precioUnitario" type="number" label="COSTO UNITARIO" :disabled='nombreCotizacion==null'
                                        :rules="costoRules" @input="precioUnitario = precioUnitario.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="cantidad" type="number" label="CANTIDAD" :disabled='nombreCotizacion==null'
                                        :rules="cantidadRules" @input="cantidad = cantidad.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

    
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonactCotIt == 1" color="#0A62BF" :disabled='nombreCotizacion==null'
                                                @click="editarCotizacionIt()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonactCotIt == 0" color="#0ABF55" :disabled='nombreCotizacion==null'
                                                @click="registrarCotizacionIt()" style="float: left"
                                                title="REGISTRAR COTIZACION DE ITEM" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon color="#BF120A" @click="limpiar()" style="float: left" large
                                                class="mx-2" title="LIMPIAR FORMULARIO">
                                                <v-icon dark> mdi-eraser </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarCotizacionItem()" style="float: right" title="SALIR">
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




        <v-dialog v-model="confirmacionAnulacionCotizacionAdq" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#BF120A" @click="anularCotizacionAdquisicion()"
                                    style="float: right" title="ANULAR COTIZACION DE ADQUISICION">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    ANULAR
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#00A1B1"
                                    @click="closeAnulacionCotizacionAdquisicion()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    SALIR
                                </v-btn>
                            </v-col>
                            <v-col cols="3"></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>



        <v-dialog v-model="confirmacionAnulacionCotizacionIt" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#BF120A" @click="anularCotizacionItem()"
                                    style="float: right" title="QUITAR ITEM">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    ANULAR
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#00A1B1" @click="closeAnulacionCotizacionItem()"
                                    style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    SALIR
                                </v-btn>
                            </v-col>
                            <v-col cols="3"></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>


        <v-dialog v-model="detalleCotizacionDialog" persistent :overlay="false" max-width="900px"
            transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    CONTENIDO
                </v-card-title>
            </v-card>
            <v-card>
                <v-data-table :headers="headerCotizacionItem" :items="datosDetalleCotizacion" :items-per-page="5"
                    class="elevation-1">
                    <template #[`item.actions`]="{ item }">
                        <v-icon class="mr-2" v-if="estadoCotizacion!='ACTIVO'" color="primary" x-large
                            @click="llenarCamposCotizacionItem(item)" title="ACTUALIZAR INFORMACION">
                             mdi-pencil
                        </v-icon>
                        <v-icon v-if=" estadoCotizacion!='ACTIVO'" x-large color="error" class="mr-2"
                            @click="confirmacionAnulacionCotizacionItem(item)"
                            title="ELIMINAR DETALLE COTIZACIÓN">
                            mdi-close-circle
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" dark x-big @click="closeDetalleCotizacion()">
                        <v-icon dark> mdi-close-circle-outline </v-icon> SALIR
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>





    </v-card>


</template>
<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    data() {
        return {

            existencias: true,
            itemsCriticos: '',
            datosExistencia: [],


            documentoArchivo: null,

            mensajeSnackbarError: "REGISTRO FALLIDO",


            idcotizacion: "",
            idUsuario: "1",
            idProveedor: "",
            idItem: "",
            idCotizacionItem: "",

            precioUnitario: "",
            nombreCotizacion: "",
            fechaVencimiento: "",
            //date picker fecha
            menuFecha: false,
            cantidad: "",
            estado: "PENDIENTE",


            nombreProveedor: "",
            nombreItem: "",
            //fechaDeModificacion: "",
            valid: true,
            nombreCotizacionRules: [
                (v) => !!v || "SE REQUIERE EL NOMBRE DE LA COTIZACIÓN.",
                (v) =>
                    (v && v.length <= 100) ||
                    "EL NOMBRE DE LA COTIZACIÓN NO DEBE SOBREPASAR LOS 100 CARACTERES.",
            ],

            nombreItemRules: [
                (v) => !!v || "SE REQUIERE EL NOMBRE DEL ITEM.",
                (v) =>
                    (v && v.length <= 60) ||
                    "EL NOMBRE DEL ITEM NO DEBE SOBREPASAR LOS 60 CARACTERES.",
            ],

            nombreRules: [
                (v) => !!v || "SE REQUIERE EL NOMBRE DEL PROVEEDOR.",
                (v) =>
                    (v && v.length <= 60) ||
                    "EL NOMBRE DEL PROVEEDOR NO DEBE SOBREPASAR LOS 60 CARACTERES.",
            ],

            fechaRules: [
                (v) => !!v || "LA FECHA ES REQUERIDA.",
                (v) => {
                    const selectedDate = Date.parse(v);
                    const currentDate = new Date();

                    if (!isNaN(selectedDate) && selectedDate >= currentDate) {
                        return true;
                    } else {
                        return "LA FECHA DEBE SER POSTERIOR A LA FECHA ACTUAL.";
                    }
                },
            ],


            costoRules: [
                (v) => !!v || "EL COSTO UNITARIO ES REQUERIDO.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO.",
                (v) => v > 0 || "EL COSTO UNITARIO DEBE SER MAYOR QUE 0.",
            ],
            cantidadRules: [
                (v) => !!v || "LA CANTIDAD ES REQUERIDA.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO.",
                (v) => v > 0 || "LA CANTIDAD DEBE SER MAYOR QUE 0.",
            ],

            datosCotizacion: [],
            estadoCotizacion: '',
            datosDetalleCotizacion: [],
            detalleCotizacionDialog: false,
            headerCotizacion: [
                { text: "COTIZACIÓN", value: "idCotizacion", sortable: true },
                { text: "EMPLEADO", value: "nombreUsuario", sortable: true },
                { text: "PROVEEDOR", value: "nombreProveedor", sortable: true },
                { text: "NOMBRE COTIZACIÓN", value: "nombreCotizacion", sortable: true },
                { text: "FECHA VENCIMIENTO", value: "fechaVencimiento", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],



            datosPrecio:[],

            datosCotizacionAdquisicion: [],
            headerCotizacionAdquisicion: [
                { text: "COTIZACIÓN", value: "idCotizacion", sortable: true },
                { text: "EMPLEADO", value: "nombreUsuario", sortable: true },
                { text: "PROVEEDOR", value: "nombreProveedor", sortable: true },
                { text: "NOMBRE COTIZACIÓN", value: "nombreCotizacion", sortable: true },
                { text: "FECHA VENCIMIENTO", value: "fechaVencimiento", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosCotizacionItem: [],
            headerCotizacionItem: [
                { text: "COTIZACIÓN ITEM", value: "idCotizacionItem", sortable: true },
                { text: "COTIZACIÓN", value: "nombrecotizacion", sortable: true },
                { text: "ITEM", value: "nombreitem", sortable: true },
                //{ text: "UNIDAD", value: "unidad", sortable: false },
                { text: "PRECIO UNITARIO", value: "precioUnitario", sortable: true },
                { text: "CANTIDAD", value: "cantidad", sortable: false },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],


            searchCotizacionAdquisicion: "",
            agregarCotizacionAdquisicionModal: false,
            confirmacionAnulacionCotizacionAdq: false,

            searchCotizacionItem: "",
            agregarCotizacionItemModal: false,
            confirmacionAnulacionCotizacionIt: false,

            searchItem: "",
            itemModal: false,
            datosItem: [],
            headerItem: [

                { text: "NOMBRE ITEM", value: "nombreitem", sortable: true },
                { text: "DESCRIPCION", value: "descripcion", sortable: true },
                { text: "MEDIDA", value: "medida", sortable: true },
                { text: "TIPO ITEM", value: "nombretipoitem", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],






            searchCotizacion: "",
            cotizacionModal: false,
            datosCotizacion: [],



            searchProveedor: "",
            proveedorModal: false,
            datosProveedor: [],
            headerProveedor: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE PROVEEDOR", value: "nomprv", sortable: true },
                { text: "CONTACTO PRINCIPAL DE PROVEEDOR", value: "cto1pro", sortable: true },
                { text: "CONTACTO SECUNDARIO DE PROVEEDOR", value: "cto2pro", sortable: true },
                { text: "CORREO DE PROVEEDOR", value: "croprov", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],




            botonactCotIt: 0,
            botonactCot: 0,





            header1: [
                { text: "COTIZACIÓN", value: "idCotizacion" },
                { text: "EMPLEADO", value: "nombreUsuario" },
                { text: "PROVEEDOR", value: "nombreProveedor" },
                { text: "NOMBRE COTIZACIÓN", value: "nombreCotizacion" },
                { text: "FECHA VENCIMIENTO", value: "date" },
            ],


            header2: [
                { text: "COTIZACIÓN ITEM", value: "idCotizacionItem" },
                { text: "COTIZACIÓN", value: "nombrecotizacion" },
                { text: "ITEM", value: "nombreitem" },
                { text: "UNIDAD", value: "unidad" },
                { text: "PRECIO UNITARIO", value: "precioUnitario" },
                { text: "CANTIDAD", value: "cantidad" },
            ],


            snackbarOK: false,
            snackbarError: false,
            //#endregion
        }
    },
    created: function () {
        this.listarCotizacionAdquisicionPendiente()
        this.listarCotizacionAdquisicion()
        this.listarCotizacionItem()
        this.getListaExistencias().then(() => {
        this.getAlertas();
        });
    },
    methods: {

        getAlertas() {
            var items = [];
            var stock = [];
            var limite = [];
            if (this.datosExistencia == []) {
                this.existencias = false;
            }
            else {
                console.log(JSON.parse(JSON.stringify(this.datosExistencia)));
                console.log('');
                let datosComoObjeto = JSON.parse(JSON.stringify(this.datosExistencia))

                for (let propiedad in datosComoObjeto) {
                    console.log(`: ${propiedad}`);
                    for (const key in datosComoObjeto[propiedad]) {
                        console.log(`Propiedad: ${key}`);
                        if (key == 'nombreitem') {
                            items.push(datosComoObjeto[propiedad][key])
                        }
                        else if (key == 'limitecritico') {
                            limite.push(datosComoObjeto[propiedad][key])
                        }
                        else if (key == 'cantidad') {
                            stock.push(datosComoObjeto[propiedad][key])
                        }
                    }
                }
                for (let i = 0; i < items.length; i++) {
                    if (Number(limite[i]) >= Number(stock[i]) ) {
                        this.existencias = false;
                        this.itemsCriticos += items[i] + ' ';
                    }
                }
            }
        },

        async getListaExistencias() {
            let me = this;
            await axios
                .get("/inventario/listarexistencias/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosExistencia = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosExistencia = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        getDate() {
            var fecha = new Date().toISOString();
            return fecha;
        },


        getFormattedDate(oldDate) {
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada = dia + '-' + mes + '-' + anio;

            return fechaFormateada;
        },

        changeFormatField(oldDate) {
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada = anio + '-' + mes + '-' + dia;

            return fechaFormateada;
        },

        getTableData() {
            return this.datosDetalleCotizacion;
        },

        getColor(est) {
            if (est == "ACTIVO") return 'green'
            else if (est == "INACTIVO") return 'red'
            else if (est == "PENDIENTE") return 'orange'

        },
        getState(estado) {
            if (estado == 'ACTIVO') return 'APROBADO'
            else if (estado == "PENDIENTE") return 'PENDIENTE'
            else return 'DENEGADO'
        },

        listarProveedor() {
            this.listarProveedores();
        },
        async listarProveedores() {
            let me = this;
            await axios
                .get("/proveedor/listarproveedoresactivos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosProveedor = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosProveedor = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        listarItem() {
            this.listarItems();
        },
        async listarItems() {
            let me = this;
            await axios
                .get("/inventario/listaritemactivo/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosItem = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosItem = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        listarCotizacionAdquisicionPendiente() {
            this.listarCotizacionesAdquisicionPendientes();
        },
        async listarCotizacionesAdquisicionPendientes() {
            let me = this;
            await axios
                .get("/adquisicion/listarcotizaciondeadquisicionpendiente/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCotizacion = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosCotizacion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarCotizacionAdquisicionActiva() {
            this.listarCotizacionesAdquisicionActivas();
        },
        async listarCotizacionesAdquisicion() {
            let me = this;
            await axios
                .get("/adquisicion/listarcotizaciondeadquisicionactiva/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCotizacion = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosCotizacion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },







        //#region Listar
        listarCotizacionAdquisicion() {
            this.listarCotizacionesAdquisicion();
        },
        async listarCotizacionesAdquisicion() {
            let me = this;
            await axios
                .get("/adquisicion/listarcotizaciondeadquisicion/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCotizacionAdquisicion = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosCotizacionAdquisicion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        llenarCamposCotizacionAdquisicion(item) {
            this.botonactCot = 1;
            this.idCotizacion = item.idCotizacion;
            this.idUsuario = item.idUsuario;
            this.idProveedor = item.idProveedor;
            this.nombreProveedor = item.nombreProveedor;
            this.nombreCotizacion = item.nombreCotizacion;
            var formatted = item.fechaVencimiento;
            this.fechaVencimiento = this.changeFormatField(formatted);
            this.estado = item.estado;
            this.agregarCotizacionAdquisicionModal = true;
        },

        registrarCotizacionAdq() {
            if (this.$refs.form.validate()) {
                if (this.documentoArchivo != null) {
                    this.almacenarArchivo(this.documentoArchivo)
                    this.guardarDocumento(this.documentoArchivo.name, this.nombreCotizacion, "adq000", "ACTIVO");
                    this.registrarCotizacionAdquisicion(this.idUsuario, this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, this.estado);
                }
                else {
                    this.registrarCotizacionAdquisicion(this.idUsuario, this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, this.estado);
                }
            }
        },
        async registrarCotizacionAdquisicion(
            idUsuario,
            idProveedor,
            nombreCotizacion,
            fechaVencimiento,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/adquisicion/agregarcotizacionadquisicion/" +
                    idUsuario +
                    "," +
                    idProveedor +
                    "," +
                    nombreCotizacion +
                    "," +
                    fechaVencimiento +
                    "," +
                    estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCotizacionesAdquisicion();
                    me.listarCotizacionesAdquisicionPendientes();
                    me.listarCotizacionesItem();
                    me.closeModalAgregarCotizacionAdquisicion();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarCotizacionAdq() {
            if (this.$refs.form.validate()) {
                this.editarCotizacionAdquisicion(this.idCotizacion, this.idUsuario, this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, this.estado);
                this.botonactCot = 0;
            }
        },
        async editarCotizacionAdquisicion(
            idCotizacion,
            idUsuario,
            idProveedor,
            nombreCotizacion,
            fechaVencimiento,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/adquisicion/actualizarcotizacionadquisicion/" +
                    idCotizacion +
                    "," +
                    idUsuario +
                    "," +
                    idProveedor +
                    "," +
                    nombreCotizacion +
                    "," +
                    fechaVencimiento +
                    "," +
                    estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCotizacionesAdquisicion();
                    me.listarCotizacionesAdquisicionPendientes();
                    me.listarCotizacionesItem();
                    me.closeModalAgregarCotizacionAdquisicion();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionCotizacionAdquisicion(item) {
            this.idCotizacion = item.idCotizacion;
            this.confirmacionAnulacionCotizacionAdq = true;
        },
        closeAnulacionCotizacionAdquisicion() {
            this.confirmacionAnulacionCotizacionAdq = false;
        },
        anularCotizacionAdquisicion() {
            this.desactivarCotizacionAdquisicion(this.idCotizacion);
        },
        async desactivarCotizacionAdquisicion(idCotizacion) {
            let me = this;
            await axios
                .post("/inventario/eliminarcotizacionadquisicion/" + this.idCotizacion).then(function (response) {
                    me.listarCotizacionesAdquisicion();
                    me.listarCotizacionesAdquisicionPendientes();
                    me.listarCotizacionesItem();
                    me.closeModalAgregarCotizacionAdquisicion();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

        },


        listarCotizacionItem() {
            this.listarCotizacionesItem();
        },
        async listarCotizacionesItem() {
            let me = this;
            await axios
                .get("/adquisicion/listarcotizacionitemactiva/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCotizacionItem = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosCotizacionItem = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        async listarDetallesCotizacion(idCotizacion) {
            let me = this;
            await axios
                .get("/adquisicion/listardetallecotizacion/" + idCotizacion)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDetalleCotizacion = [];
                        //console.log(response.data);
                    } else {
                        me.datosDetalleCotizacion = response.data.resultado;
                        //console.log(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

       

        async obtenerPrecioItemCotizacion(){
            let me = this;
            await axios
                .get("/adquisicion/obtenerprecioanterior/"+this.idCotizacion+","+ this.idItem,{ headers: { 'Cache-Control': 'no-cache' } } )
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosPrecio = [];
                        //console.log(response.data);
                    } else {
                        me.datosPrecio = response.data.resultado;
                        //console.log(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        llenarCamposCotizacionItem(item) {
            this.botonactCotIt = 1;
            this.idCotizacionItem = item.idCotizacionItem;
            this.idCotizacion = item.idCotizacion;
            this.nombreCotizacion = item.nombrecotizacion;
            this.idItem = item.idItem;
            this.nombreItem = item.nombreitem;
            this.precioUnitario = item.precioUnitario;
            this.cantidad = item.cantidad;
            this.estado = item.estado;
            this.agregarCotizacionItemModal = true;
        },

        registrarCotizacionIt() {
            if (this.$refs.form.validate()) {
                this.registrarCotizacionItem(this.idCotizacion, this.idItem, this.precioUnitario, this.cantidad, 'ACTIVO');
            }
        },
        async registrarCotizacionItem(
            idCotizacion,
            idItem,
            precioUnitario,
            cantidad,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/adquisicion/agregarcotizacionitem/" +
                    this.idCotizacion +
                    "," +
                    this.idItem +
                    "," +
                    this.precioUnitario +
                    "," +
                    this.cantidad +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCotizacionesAdquisicion();
                    me.listarCotizacionesAdquisicionPendientes();
                    me.listarCotizacionesItem();
                    me.closeModalAgregarCotizacionItem();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarCotizacionIt() {
            if (this.$refs.form.validate()) {
                this.editarCotizacionItem(this.idCotizacionItem, this.idCotizacion, this.idItem, this.precioUnitario, this.cantidad, 'ACTIVO');
                this.botonactCotIt = 0;
            }
        },
        async editarCotizacionItem(
            idCotizacionItem,
            idCotizacion,
            idItem,
            precioUnitario,
            cantidad,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/adquisicion/actualizarcotizacionitem/" +
                    this.idCotizacionItem +
                    "," +
                    this.idCotizacion +
                    "," +
                    this.idItem +
                    "," +
                    this.precioUnitario +
                    "," +
                    this.cantidad +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCotizacionesAdquisicion();
                    me.listarCotizacionesAdquisicionPendientes();
                    me.listarCotizacionesItem();
                    me.closeModalAgregarCotizacionItem();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionCotizacionItem(item) {
            this.idCotizacionItem = item.idCotizacionItem;
            this.confirmacionAnulacionCotizacionIt = true;
        },
        closeAnulacionCotizacionItem() {
            this.confirmacionAnulacionCotizacionIt = false;
        },
        anularCotizacionItem() {
            this.desactivarCotizacionItem(this.idCotizacionItem);
            this.listarDetallesCotizacion(this.idCotizacionItem);
        },
        async desactivarCotizacionItem(idCotizacionItem) {
            let me = this;
            await axios
                .post("/adquisicion/eliminarcotizacionitem/" + this.idCotizacionItem).then(function (response) {
                    me.listarCotizacionesAdquisicion();
                    me.listarCotizacionesAdquisicionPendientes();
                    me.listarCotizacionesItem();
                    me.closeAnulacionCotizacionItem();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

        },



        activar(item) {
            this.idProveedor = item.idProveedor;
            this.activarmateria(this.idProveedor);
        },
        async activarmateria(idProveedor) {
            let me = this;
            /*await axios
                .post("/carrera/onmateria/" + this.idProveedor).then(function (response) {

                    me.listarMaterias();
                })
                .catch(function (error) {
                    console.log(error);
                });*/

        },
        desactivar(item) {
            this.idProveedor = item.idProveedor;
            this.desactivarproveedor(this.idProveedor);
        },
        async desactivarproveedor(idProveedor) {
            let me = this;
            /*await axios
                .post("/carrera/offmateria/" + this.idProveedor).then(function (response) {

                    me.listarMaterias();
                })
                .catch(function (error) {
                    console.log(error);
                });*/

        },


        //#endregion
        //#region Adicionar
        //#endregion
        //#region Editar
        //#endregion
        //#region Eliminar
        //#region Modals
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },



        showModalAgregarCotizacionAdquisicion() {
            this.agregarCotizacionAdquisicionModal = true;
        },
        closeModalAgregarCotizacionAdquisicion() {
            this.botonactCot = 0;
            this.agregarCotizacionAdquisicionModal = false;
            this.limpiar();

        },

        agregarItem(item){
            this.idCotizacion = item.idCotizacion;
            this.nombreCotizacion = item.nombreCotizacion;
         
            this.agregarCotizacionItemModal = true;
        },

        showModalAgregarCotizacionItem() {

            this.agregarCotizacionItemModal = true;
        },
        closeModalAgregarCotizacionItem() {
            this.botonactCotIt = 0;
            this.agregarCotizacionItemModal = false;
            this.limpiar();

        },

        openItemModal() {
          
            this.listarItems();
            this.itemModal = true;
        },

        closeItemModal() {
            this.itemModal = false;
        },

        seleccionarItem(item) {
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.itemModal = false;
            this.obtenerPrecioItemCotizacion().then(() => {
             
                if(this.datosPrecio!=[]){
                    if (this.datosPrecio[0].hasOwnProperty("precioUnitario")) {
                        this.precioUnitario = this.datosPrecio[0].precioUnitario;
                    }
                    
                    
                }
                else{
                    this.precioUnitario = 0;
                }

             });
          
        },

        openProveedorModal() {
            this.listarProveedores();
            this.proveedorModal = true;
        },

        closeProveedorModal() {
            this.proveedorModal = false;
        },

        seleccionarProveedor(item) {
            this.idProveedor = item.idprv;
            this.nombreProveedor = item.nomprv;
            this.proveedorModal = false;
        },

        openCotizacionModal() {
            this.listarCotizacionAdquisicionPendiente();
            this.cotizacionModal = true;
        },

        closeCotizacionModal() {
            this.cotizacionModal = false;
        },

        seleccionarCotizacion(item) {

            this.idCotizacion = item.idCotizacion;
            
            this.nombreCotizacion = item.nombreCotizacion;
           
            this.cotizacionModal = false;
            
            this.precioUnitario = "";
            this.$refs.form.resetValidation();
          
        },


        mostrarItems(item) {
            this.idCotizacion = item.idCotizacion;
            this.estadoCotizacion = item.estado;
            this.listarDetallesCotizacion(this.idCotizacion);
            this.detalleCotizacionDialog = true;

        },

        closeDetalleCotizacion() {
            this.detalleCotizacionDialog = false;
        },

       
        aprobarAdquisicion(item) {
            this.idCotizacion = item.idCotizacion;
            this.idUsuario = item.idUsuario;
            this.idProveedor = item.idProveedor;
            this.nombreCotizacion = item.nombreCotizacion;
            this.fechaVencimiento = item.fechaVencimiento;
            this.editarCotizacionAdquisicion(this.idCotizacion, this.idUsuario, this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, 'ACTIVO');

        },
        denegarAdquisicion(item) {
            this.idCotizacion = item.idCotizacion;
            this.idUsuario = item.idUsuario;
            this.idProveedor = item.idProveedor;
            this.nombreCotizacion = item.nombreCotizacion;
            this.fechaVencimiento = item.fechaVencimiento;
            this.editarCotizacionAdquisicion(this.idCotizacion, this.idUsuario, this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, 'INACTIVO');
        },



        limpiar() {
            this.$refs.form.reset()
        },

        //#endregion



      





        registrarDocumento() {
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name, this.nombreCotizacion, "adq000", "ACTIVO");
        },
        async almacenarArchivo(documentoArchivo) {

            const formData = new FormData();
            formData.append('adquisition', documentoArchivo);
            let me = this;
            await axios
                .post(
                    "/uploadFile/", formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumentos();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async guardarDocumento(documentoArchivo, descripcionArchivo, codigoArchivo, estado) {
            const ext = documentoArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            let me = this;
            await axios
                .post(
                    "/documento/insertar/" +
                    ext[0] +
                    "," +
                    nombreArchivo +
                    "," +
                    descripcionArchivo +
                    "," +
                    codigoArchivo +
                    "," +
                    estado)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumento();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async exportToPDFDetailed(item) {
            try {
                const response = await axios.get(`/adquisicion/listardetallecotizacion/` + item.idCotizacion);
                const jsonData = response.data.resultado || [];
                
                var total = 0
                jsonData.forEach(detalle => {
                total += detalle.precioUnitario * detalle.cantidad;
                });
               

                const bodyData = jsonData.map(data => [ 
                    data.nombreitem,
                    data.unidad,
                    data.precioUnitario,
                    data.cantidad

                ]);
                const doc = new jsPDF();
                    let titulo = 'Detalle de Adquisición'
                    doc.setFont('helvetica', 'bold'); 
                    const textWidth = doc.getStringUnitWidth(titulo) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
                    doc.text(titulo, textOffset, 20);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);
                    doc.text(item.nombreCotizacion, 10, 30)
                    doc.text("Proveedor: "+ item.nombreProveedor, 10, 40);
                    doc.text("Fecha: "+ this.getFormattedDate(item.fechaVencimiento), 10,50);
                    doc.autoTable({ head: [["Item", "Unidad", "Precio Unitario", "Cantidad"]], body: bodyData, startY: 60 });
                    let finalY = doc.previousAutoTable.finalY;
                    doc.text("Total: "+total.toFixed(2)+" Bs.", 150, 10 + finalY)

                    doc.save("detalleAdquisicion.pdf");
            } catch (error) {
                console.error(error);
            }
            },
    },
};

</script>
