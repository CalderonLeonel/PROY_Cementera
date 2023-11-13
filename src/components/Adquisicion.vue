<template>
   <v-card elevation="5" outlined>
        <v-alert         
                type="error"
                color="red darken-2"
                icon="mdi-alert"
                >
                <div class="text-h6">
                    SE REQUIERE LA COMPRA DE EXISTENCIAS EN EL INVENTARIO
                </div>
                POR FAVOR, COTICE UNA ADQUISICION PARA TENER EXISTENCIAS DE <strong>${nombreitem}</strong> NECESARIAS PARA EL FUNCIONAMIENTO DE LA FABRICA 
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
                            <v-btn color="success" @click="showModalAgregarCotizacionAdquisicion()">NUEVA COTIZACION DE ADQUISICIONES</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h3>COTIZACIONES DE ADQUISICIONES</h3>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchCotizacionAdquisicion" append-icon="mdi-magnify" label="BUSCAR COTIZACIONES"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerCotizacionAdquisicion" :items="datosCotizacionAdquisicion" :search="searchCotizacionAdquisicion"
                                :items-per-page="5" class="elevation-1"  id="tableId">


                                <template #[`item.fechaVencimiento`]="{ item }">
                                        {{getFormattedDate(item.fechaVencimiento)}}
                                </template>
                                
                               
                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{getState(item.estado)}}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon v-if="item.estado == 'PENDIENTE'" class="mr-2" color="primary" x-large  @click="llenarCamposCotizacionAdquisicion(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>                                 
                                    <v-icon v-if="item.estado == 'ACTIVO' || item.estado == 'PENDIENTE'" x-large color="error" class="mr-2" @click="confirmacionAnulacionCotizacionAdquisicion(item)"
                                        title="DESACTIVAR COTIZACION">
                                        mdi-close-circle
                                    </v-icon>    
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="primary" class="mr-2" @click="mostrarItems(item)"
                                        title="VER ITEMS">
                                        mdi-eye
                                    </v-icon>          
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarCotizacionItem()">NUEVA COTIZACION DE ITEM</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h3>COTIZACION DE ITEMS</h3>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchCotizacionItem" append-icon="mdi-magnify" label="BUSCAR UNA COTIZACION DE UN ITEM"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerCotizacionItem" :items="datosCotizacionItem" :search="searchCotizacionItem"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{getState(item.estado)}}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposCotizacionItem(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR COTIZACION">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionCotizacionItem(item)"
                                        title="DESACTIVAR COTIZACION">
                                        mdi-close-circle
                                    </v-icon>             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h3>GESTIÓN DE COTIZACIONES</h3>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchCotizacion" append-icon="mdi-magnify" label="BUSCAR COTIZACIONES"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerCotizacion" :items="datosCotizacion" :search="searchCotizacion"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.fechaVencimiento`]="{ item }">
                                        {{getFormattedDate(item.fechaVencimiento)}}
                                </template>

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="mostrarItems(item)"
                                        title="VER ITEMS">
                                        mdi-eye
                                    </v-icon> 
                                    <v-icon class="mr-2" color="primary" x-large  @click="generatePDF(item)"
                                        title="VER PDF">
                                        mdi-file-pdf-box
                                    </v-icon>         
                                    <v-icon class="mr-2" color="green" x-large  @click="aprobarAdquisicion(item)"
                                        title="APROBAR">
                                        mdi-check-circle
                                    </v-icon> 
                                    <v-icon class="mr-2" color="red" x-large  @click="denegarAdquisicion(item)"
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
                                    <v-text-field v-model="nombreCotizacion" label="NOMBRE DE LA COTIZACION"  :counter="100"
                                         @input="nombreCotizacion = nombreCotizacion.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-subheader class="text-h5">FECHA DE VENCIMIENTO:</v-subheader>
                                </v-col>
                                <v-col cols="12" md="8">                                  
                                    <v-date-picker required locale="es" :landscape="true" :show-current="false" full-width v-model="fechaVencimiento" :min="getDate()" @input="fechaVencimiento = fechaVencimiento" color="blue lighten-1" header-color="primary"></v-date-picker>                                 
                                </v-col>
                                
                                <v-col cols="12" md="12">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="DOCUMENTO DE COTIZACION" 
                                    ></v-file-input>
                                     </v-col>
                                
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonactCot == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarCotizacionAdq()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonactCot == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarCotizacionAdq()" style="float: left" title="REGISTRAR COTIZACION DE ADQUISICION">
                                            <v-icon dark> mdi-content-save </v-icon>
                                            GUARDAR
                                        </v-btn>
                                </v-col>                      
                                <v-col cols="2">                                        
                                    <v-btn iconv color="#BF120A" class="mx-4"  dark  @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarCotizacionAdquisicion()" style="float: right" title="SALIR">
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
                                    <v-text-field v-model="searchItem" append-icon="mdi-magnify" label="BUSCAR ITEMS ACTIVOS"
                                        single-line hide-details></v-text-field>
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
                                    <v-text-field v-model="searchCotizacion" append-icon="mdi-magnify" label="BUSCAR COTIZACIONES CREADAS"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerCotizacionAdquisicion" :items="datosCotizacion" :search="searchCotizacion"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.fechaVencimiento`]="{ item }">
                                        {{getFormattedDate(item.fechaVencimiento)}}
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
                                    <v-text-field v-model="searchProveedor" append-icon="mdi-magnify" label="BUSCAR PROVEEDOR ACTIVO"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerProveedor" :items="datosProveedor" :search="searchProveedor"
                                    :items-per-page="5" class="elevation-1" id="tableId">
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
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" v-if="botonactCotIt == 0" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openCotizacionModal()" style="float: right" title="BUSCAR COTIZACION">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreCotizacion" label="NOMBRE COTIZACION" :counter="60"
                                        :rules="nombreRules" @input="nombreCotizacion = nombreCotizacion.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" v-if="botonactCotIt == 0" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openItemModal()" style="float: right" title="BUSCAR ITEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ITEM" :counter="60"
                                        :rules="nombreRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="precioUnitario" type="number" label="COSTO UNITARIO" 
                                         @input="precioUnitario = precioUnitario.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="cantidad" type="number" label="CANTIDAD" 
                                         @input="cantidad = cantidad.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="12"> </v-col>
                                
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonactCotIt == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarCotizacionIt()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonactCotIt == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarCotizacionIt()" style="float: left" title="REGISTRAR COTIZACION DE ITEM">
                                            <v-icon dark> mdi-content-save </v-icon>
                                            GUARDAR
                                        </v-btn>
                                </v-col>                      
                                <v-col cols="2">                                        
                                    <v-btn iconv color="#BF120A" class="mx-4"  dark  @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
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
                                    <v-btn class="mx-2"  dark x-big color="#BF120A"
                                        @click="anularCotizacionAdquisicion()" style="float: right" title="ANULAR ALMACEN">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
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
                                    <v-btn class="mx-2"  dark x-big color="#BF120A"
                                        @click="anularCotizacionItem()" style="float: right" title="ANULAR ALMACEN">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionCotizacionItem()" style="float: right" title="SALIR">
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


        <v-dialog
            v-model="detalleCotizacionDialog"
            persistent :overlay="false"
            max-width="900px"
            transition="dialog-transition"
        >
        <v-card>
            <v-card-title primary-title>
                CONTENIDO
            </v-card-title>
        </v-card>
        <v-card>
                <v-data-table :headers="headerCotizacionItem" :items="datosDetalleCotizacion"
                    :items-per-page="5" class="elevation-1">
                </v-data-table>
        </v-card>
        <v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" dark x-big  @click="closeDetalleCotizacion()">
                    <v-icon dark> mdi-close-circle-outline </v-icon> Salir
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
            
            documentoArchivo: '',



            
            idcotizacion: "",
            idUsuario: "1",
            idProveedor: "",
            idItem: "",
            idCotizacionItem: "",

            precioUnitario: "",
            nombreCotizacion: "",
            fechaVencimiento: "",
            cantidad:"",
            estado: "PENDIENTE",


            nombreProveedor:"",
            nombreItem:"",
            //fechaDeModificacion: "",
            valid: true,
            nombreRules: [
              (v) => !!v || "Se requiere el nombre del proveedor.",
              (v) =>
              (v && v.length <= 60) ||
                "el nombre del proveedor no debe sobrepasar los 60 caracteres.",
            ],
            phone1Rules: [
              (v) => !!v || "Se requiere un numero telefonico o celular.",
              (v) =>
              (v && v.length <= 10) ||
                "El telephono principal debe tener hasta 10 caracteres.",
            ],
            phone2Rules: [
              (v) =>
              (v && v===null || v.length <= 10) ||
                "El telephono secundario debe tener hasta 10 caracteres.",
            ],
            emailRules: [
              (v) => !!v || "Se requiere el correo electronico del proveedor",
              (v) => /.+@.+\..+/.test(v) || "Debe ser un correo electronico valido",
             ],

            datosCotizacion: [],
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
                { text: "UNIDAD", value: "unidad", sortable: false },
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

            searchItem:"",
            itemModal:false,
            datosItem:[],
            headerItem: [
                 
                 { text: "NOMBRE ITEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCION", value: "descripcion", sortable: true },
                 { text: "MEDIDA", value: "medida", sortable: true },
                 { text: "TIPO ITEM", value: "nombretipoitem", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],






            searchCotizacion:"",
            cotizacionModal: false,
            datosCotizacion:[],



            searchProveedor:"",
            proveedorModal: false,
            datosProveedor:[],
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
                { text: "COTIZACIÓN", value: "idCotizacion"},
                { text: "EMPLEADO", value: "nombreUsuario" },
                { text: "PROVEEDOR", value: "nombreProveedor"},
                { text: "NOMBRE COTIZACIÓN", value: "nombreCotizacion"},
                { text: "FECHA VENCIMIENTO", value: "date" },
            ],


            header2: [
                { text: "COTIZACIÓN ITEM", value: "idCotizacionItem"},
                { text: "COTIZACIÓN", value: "nombrecotizacion"},
                { text: "ITEM", value: "nombreitem"},
                { text: "UNIDAD", value: "unidad"},
                { text: "PRECIO UNITARIO", value: "precioUnitario"},
                { text: "CANTIDAD", value: "cantidad"},
            ],
            //#endregion
        }
    },
    created: function (){
        this.listarCotizacionAdquisicionPendiente()
        this.listarCotizacionAdquisicion();
        this.listarCotizacionItem();
    },
    methods: {
        getDate(){ 
            var fecha = new Date().toISOString();
            return fecha;
        },


        getFormattedDate(oldDate){
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1; 
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada =  dia + '-' + mes + '-' + anio;

            return fechaFormateada;
        },

        changeFormatField(oldDate){
            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1; 
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada =  anio + '-' + mes + '-' + dia;

            return fechaFormateada;
        },

        getTableData(){
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
            this.registrarCotizacionAdquisicion(this.idUsuario,this.idProveedor, this.nombreCotizacion, this.fechaVencimiento,this.estado);
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name,this.nombreCotizacion,"adq000","ACTIVO");
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
                    me.closeModalAgregarCotizacionAdquisicion();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarCotizacionAdq() {
            this.editarCotizacionAdquisicion(this.idCotizacion, this.idUsuario,this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, this.estado);
            this.botonactCot=0;
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
                    me.closeModalAgregarCotizacionAdquisicion();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionCotizacionAdquisicion(item){
            this.idCotizacion = item.idCotizacion;
            this.confirmacionAnulacionCotizacionAdq = true;
        },
        closeAnulacionCotizacionAdquisicion(){
            this.confirmacionAnulacionCotizacionAdq = false;
        },
        anularCotizacionAdquisicion() {
            this.desactivarCotizacionAdquisicion(this.idCotizacion);
        },
        async desactivarCotizacionAdquisicion(idCotizacion) {
            let me = this;
            await axios
                .post("/inventario/eliminarcotizacionadquisicion/" + this.idCotizacion).then(function (response) {
                    me.listarCotizacionAdquisicion();
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
            .get("/adquisicion/listardetallecotizacion/"+idCotizacion)
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
            this.registrarCotizacionItem(this.idCotizacion,this.idItem,this.precioUnitario, this.cantidad, 'ACTIVO');
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
                    me.listarCotizacionesItem();
                    me.closeModalAgregarCotizacionItem();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarCotizacionIt() {
            this.editarCotizacionItem(this.idCotizacionItem,this.idCotizacion,this.idItem,this.precioUnitario,this.cantidad, 'ACTIVO');
            this.botonactCotIt=0;
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
                    me.listarCotizacionesItem();
                    me.closeModalAgregarCotizacionItem();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionCotizacionItem(item){
            this.idCotizacionItem = item.idCotizacionItem;
            this.confirmacionAnulacionCotizacionIt = true;
        },
        closeAnulacionCotizacionItem(){
            this.confirmacionAnulacionCotizacionIt = false;
        },
        anularCotizacionItem() {
            this.desactivarCotizacionItem(this.idCotizacionItem);
        },
        async desactivarCotizacionItem(idCotizacionItem) {
            let me = this;
            await axios
                .post("/adquisicion/eliminarcotizacionitem/" + this.idCotizacionItem).then(function (response) {
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
        editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
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

        showModalAgregarCotizacionItem() {
            
            this.agregarCotizacionItemModal = true;
        },
        closeModalAgregarCotizacionItem() {
            this.botonactCotIt = 0;
            this.agregarCotizacionItemModal = false;
            this.limpiar();

        },

        openItemModal(){
            this.listarItems();
            this.itemModal = true;
        },

        closeItemModal(){
            this.itemModal = false;
        },

        seleccionarItem(item){
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.itemModal = false;
        },

        openProveedorModal(){
            this.listarProveedores();
            this.proveedorModal = true;
        },

        closeProveedorModal(){
            this.proveedorModal = false;
        },

        seleccionarProveedor(item){
            this.idProveedor = item.idprv;
            this.nombreProveedor = item.nomprv;
            this.proveedorModal = false;
        },

        openCotizacionModal(){
            this.listarCotizacionAdquisicionPendiente();
            this.cotizacionModal = true;
        },

        closeCotizacionModal(){
            this.cotizacionModal = false;
        },

        seleccionarCotizacion(item){
            this.idCotizacion = item.idCotizacion;
            this.nombreCotizacion = item.nombreCotizacion;
            this.cotizacionModal = false;
        },


        mostrarItems(item){
            this.idCotizacion = item.idCotizacion;
            this.listarDetallesCotizacion(this.idCotizacion);
            this.detalleCotizacionDialog = true;
            
        },

        closeDetalleCotizacion(){
            this.detalleCotizacionDialog = false;
        },

        async generatePDF(item){
            this.idCotizacion = item.idCotizacion;
            this.listarDetallesCotizacion(this.idCotizacion);


            const doc = new jsPDF();
            doc.setFontSize(22)
            let titulo= 'ADQUISICIÓN: '+item.nombreCotizacion;
            let margenIzquierdo = 20;
            let margenDerecho = 20;
            let anchoMaximo = doc.internal.pageSize.width - margenIzquierdo - margenDerecho;
            let textoDividido = doc.splitTextToSize(titulo, anchoMaximo);
            doc.text(textoDividido, margenIzquierdo, 20);
            let fecha = new Date().toLocaleDateString()
            doc.setFontSize(16)
            doc.text(fecha, 20, 45)
            doc.line(10, 35, 200, 35)
            const header1 = this.header1.map(column => column.text);
            const header2 = this.header2.map(column => column.text);
            const data1 = item => this.header1.map(header => item[header.value]);
            const data2 = JSON.parse(JSON.stringify(this.datosDetalleCotizacion));
            console.log('datos')
            console.log(JSON.parse(JSON.stringify(this.datosDetalleCotizacion)));
            doc.autoTable({
                head: [header1],
                body: [],
                startY: 60,
            });
            let finalY = doc.previousAutoTable.finalY;
            doc.autoTable({
                head: [header2],
                body: [data2],
                startY: finalY+20,
            });

            let nombreArchivo = item.nombreCotizacion+'.pdf';
            doc.save(nombreArchivo);
        },

        /*
                    headerCotizacion: [
                { text: "COTIZACIÓN", value: "idCotizacion", sortable: true },
                { text: "EMPLEADO", value: "nombreUsuario", sortable: true },
                { text: "PROVEEDOR", value: "nombreProveedor", sortable: true },
                { text: "NOMBRE COTIZACIÓN", value: "nombreCotizacion", sortable: true },
                { text: "FECHA VENCIMIENTO", value: "date", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],
        */
        aprobarAdquisicion(item){
            this.idCotizacion = item.idCotizacion;
            this.idUsuario = item.idUsuario;
            this.idProveedor = item.idProveedor;
            this.nombreCotizacion = item.nombreCotizacion;
            this.fechaVencimiento = item.fechaVencimiento;
            this.editarCotizacionAdquisicion(this.idCotizacion, this.idUsuario,this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, 'ACTIVO');

        },
        denegarAdquisicion(item){
            this.idCotizacion = item.idCotizacion;
            this.idUsuario = item.idUsuario;
            this.idProveedor = item.idProveedor;
            this.nombreCotizacion = item.nombreCotizacion;
            this.fechaVencimiento = item.fechaVencimiento;
            this.editarCotizacionAdquisicion(this.idCotizacion, this.idUsuario,this.idProveedor, this.nombreCotizacion, this.fechaVencimiento, 'INACTIVO');
        },



        limpiar () {
            this.$refs.form.reset()
        },
       
        //#endregion





        registrarDocumento(){
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name,this.nombreCotizacion,"adq000","ACTIVO");
        },
        async almacenarArchivo(documentoArchivo){

            const formData = new FormData();
            formData.append('adquisition', documentoArchivo);
            let me = this;
                await axios
                .post(
                    "/uploadFile/",formData)
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

        async guardarDocumento(documentoArchivo,descripcionArchivo,codigoArchivo,estado){
            const ext = documentoArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0')+'_'+(date.getMonth() + 1).toString().padStart(2, '0')+'_'+date.getFullYear();
            const nombreArchivo =  ext[0]+'_'+fechaHoraActual+'.'+ext[1];
            let me = this;
                await axios
                .post(
                    "/documento/insertar/"+
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
      },
};

</script>
