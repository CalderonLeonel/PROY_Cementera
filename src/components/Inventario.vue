<template>
    <v-card elevation="5" outlined>
            <v-alert  
                type="error"
                color="red darken-2"
                dense
                prominent
                icon="mdi-alert"
                >
                <div class="text-h6">
                    SE REQUIERE LA COMPRA DE EXISTENCIAS EN EL INVENTARIO
                </div>
                POR FAVOR, NOTIFIQUE A ADQUISICIONES PARA ADQUIRIR EXISTENCIAS DE <strong>${nombreitem}</strong>   
            </v-alert>
            <v-alert         
                type="success"
                color="green darken-2"
                dismissible
                dense
                prominent
                >
                <div class="text-h5">
                    SE TIENE LAS EXISTENCIAS NECESARIAS EN EL INVENTARIO
                </div>
               
            </v-alert>
         <div>
             <v-alert dense style="color: #ffffff;" color="indigo">
                 <h3>INVENTARIO</h3>
             </v-alert>
         </div>
         <div>
             <v-form ref="form" v-model="valid" lazy-validation>
                 <v-container>
                     <v-row>
                         <v-col cols="12" md="4">
                             <v-btn color="success" @click="showModalAgregarTransaccion()">NUEVO INVENTARIO</v-btn>
                         </v-col>
                         <v-col cols="12">
                             <v-list-item>
                                 <v-list-item-title class="text-center">
                                     <h5>INVENTARIOS</h5>
                                 </v-list-item-title>
                             </v-list-item>
 
                             <v-card-title>
                                <v-text-field v-model="searchInventario" append-icon="mdi-magnify" label="BUSCAR INVENTARIO"
                                     single-line hide-details></v-text-field>
                             </v-card-title>
 
                             <v-data-table :headers="headerInventario" :items="datosInventario" :search="searchInventario"
                                 :items-per-page="5" class="elevation-1" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposInventario(item)"
                                         title="ACTUALIZAR INFORMACION">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="confirmarActivacionInv(item)"
                                         title="ACTIVAR Almacen">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionInv(item)"
                                         title="DESACTIVAR Almacen">
                                         mdi-close-circle
                                     </v-icon>             
                                 </template>
 
                               
 
 
                             </v-data-table>
                         </v-col>
                     </v-row>
                     <v-row>
                         <v-col cols="12" md="4">
                             <v-btn color="success" @click="showModalAgregarItem()">NUEVO ITEM</v-btn>
                         </v-col>
                         <v-col cols="12">
                             <v-list-item>
                                 <v-list-item-title class="text-center">
                                     <h5>ITEMS</h5>
                                 </v-list-item-title>
                             </v-list-item>
 
                             <v-card-title>
                                <v-text-field v-model="searchItem" append-icon="mdi-magnify" label="Buscar Items"
                                     single-line hide-details></v-text-field>
                             </v-card-title>
 
                             <v-data-table :headers="headerItem" :items="datosItem" :search="searchItem"
                                 :items-per-page="5" class="elevation-1" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposItem(item)"
                                         title="ACTUALIZAR INFORMACION">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR Seccion">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionIt(item)"
                                         title="DESACTIVAR Seccion">
                                         mdi-close-circle
                                     </v-icon>             
                                 </template>
 
                               
 
 
                             </v-data-table>
                         </v-col>
                     </v-row>
                     <v-row>
                         <v-col cols="12" md="4">
                             <v-btn color="success" @click="showModalAgregarTipoItem()">NUEVO TIPO DE ITEM</v-btn>
                         </v-col>
                         <v-col cols="12">
                             <v-list-item>
                                 <v-list-item-title class="text-center">
                                     <h5>TIPOS DE ITEMS</h5>
                                 </v-list-item-title>
                             </v-list-item>
 
                             <v-card-title>
                                <v-text-field v-model="searchTipoItem" append-icon="mdi-magnify" label="Buscar Item"
                                     single-line hide-details></v-text-field>
                             </v-card-title>
 
                             <v-data-table :headers="headerTipoDeItem" :items="datosTipoDeItem" :search="searchTipoItem"
                                 :items-per-page="5" class="elevation-1" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposTipoItem(item)"
                                         title="ACTUALIZAR INFORMACION">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR Stand">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionTip(item)"
                                         title="DESACTIVAR Stand">
                                         mdi-close-circle
                                     </v-icon>             
                                 </template>
 
                               
 
 
                             </v-data-table>
                         </v-col>
                     </v-row>
 
                 </v-container>
             </v-form>
 
         </div>

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
                                    <v-text-field v-model="searchItem" append-icon="mdi-magnify" label="BUSCAR SECCIÓN"
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


         <v-dialog v-model="agregarInventarioModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR TRANSACCIÓN</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ITEM"
                                        :rules="nombreRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openItemModal()" style="float: right" title="BUSCAR ITEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>       
                                <v-col cols="12" md="4">
                                    <v-combobox
                                    label="MOVIMIENTO" v-model="movimiento" @input="movimiento = movimiento.toUpperCase()" required
                                    :items="['ENTRADA', 'SALIDA']"
                                    ></v-combobox>
                                </v-col>     
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="cantidad" label="CANTIDAD" type="number" :counter="25"
                                         @input="cantidad = cantidad.toUpperCase()"
                                        required></v-text-field>
                                </v-col>     
                                <v-col cols="12" md="4">
                                    <v-combobox
                                    label="METODO VALUACION" v-model="metodoValuacion" @input="metodoValuacion = metodoValuacion.toUpperCase()" required
                                    :items="['PEPS', 'UEPS', 'PROMEDIO PONDERADO']"
                                    ></v-combobox>
                                </v-col>      
                                    
                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActTT == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarInv()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActTT == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarInv()" style="float: left" title="REGISTRAR TRANSACCION ">
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
                                        @click="closeModalAgregarTransaccion()" style="float: right" title="SALIR">
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


        <v-dialog v-model="tipoModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE TIPO DE ITEMS ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchTipoItem" append-icon="mdi-magnify" label="BUSCAR SECCIÓN"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerTipoDeItem" :items="datosTipoDeItem" :search="searchTipoItem"
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
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeTipoModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>         




         <v-dialog v-model="agregarItemModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR ITEM</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ITEM" :counter="60"
                                        :rules="nombreRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        required></v-text-field>
                                </v-col>   
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcion" label="DESCRIPCION" :counter="150"
                                         @input="descripcion = descripcion.toUpperCase()"
                                        required></v-text-field>
                                </v-col>   
                                <v-col cols="12" md="4">
                                    <v-combobox
                                    label="MEDIDA"  v-model="medida" @input="medida = medida.toUpperCase()" required
                                    :items="['LT', 'KG', 'ML', 'DS', 'UI', 'TN','SOB','MIC','MT','G','UNIDAD']"
                                    ></v-combobox>
                                </v-col>    
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreTipoITem" label="NOMBRE TIPO ITEM" :counter="60"
                                        :rules="nombreRules" @input="nombreTipoITem = nombreTipoITem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openTipoModal()" style="float: right" title="BUSCAR TIPO ITEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>             
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActTT == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarIt()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActTT == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarIt()" style="float: left" title="REGISTRAR ITEM">
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
                                        @click="closeModalAgregarItem()" style="float: right" title="SALIR">
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

         <v-dialog v-model="agregarTipoItemModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR TIPO DE ITEM</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreTipoITem" label="NOMBRE TIPO ITEM" :counter="60"
                                        :rules="nombreRules" @input="nombreTipoITem = nombreTipoITem.toUpperCase()"
                                        required></v-text-field>
                                </v-col>                         
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActTT == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarTipo()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActTT == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarTipo()" style="float: left" title="REGISTRAR PROVEEDOR">
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
                                        @click="closeModalAgregarTipoItem()" style="float: right" title="SALIR">
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

        <v-dialog v-model="confirmacionAnulacionTipo" persistent :overlay="false" max-width="1000px">
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
                                        @click="anularTipo()" style="float: right" title="ANULAR TIPO ITEM">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionTipo()" style="float: right" title="SALIR">
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

        <v-dialog v-model="confirmacionAnulacionItem" persistent :overlay="false" max-width="1000px">
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
                                        @click="anularItem()" style="float: right" title="ANULAR ITEM">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionItem()" style="float: right" title="SALIR">
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


        <v-dialog v-model="confirmacionAnulacionInventario" persistent :overlay="false" max-width="1000px">
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
                                        @click="anularInventario()" style="float: right" title="ANULAR INVENTARIO">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionInventario()" style="float: right" title="SALIR">
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

     </v-card>
     
 
 </template>
 <script>
 import axios from "axios";
 export default {
     data() {
         return {
             //#region 
             idTransaccion: "",
             idItem:"",
             movimiento:"",
             cantidad:"",
             metodoValuacion:"",
             estTranc:"",


             nombreItem:"",
             descripcion:"",
             medida:"",
             estIt:"",

             idTipoItem:"",
             nombreTipoITem: "",
             estTT: "",

            estado: "ACTIVO",
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
             datosInventario: [],
             headerInventario: [
                 
                 { text: "NUMERO TRANSACCIÓN", value: "idTransaccion", sortable: true },
                 { text: "ITEM", value: "nombreitem", sortable: true },
                 { text: "MOVIMIENTO", value: "movimiento", sortable: true },
                 { text: "CANTIDAD", value: "cantidad", sortable: true },
                 { text: "METODO DE VALUACIÓN", value: "metodoValuacion", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
 
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
 
             datosTipoDeItem: [],
             headerTipoDeItem: [
                 
                 { text: "NOMBRE DE TIPO DE ITEM", value: "nombretipoitem", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
 
             buscarInventario: "",
             searchInventario: "",
             agregarInventarioModal: false,
             confirmacionAnulacionInventario: false,
 
             buscarItem: "",
             searchItem: "",
             agregarItemModal: false,
             confirmacionAnulacionItem: false,
 
             buscarTipoItem: "",
             searchTipoItem: "",
             agregarTipoItemModal: false,
             confirmacionAnulacionTipo: false,



             itemModal:false,
             tipoModal:false,


             botonActInv:0,
             botonActIt:0,
             botonActTT:0,
             //#endregion
         }
     },
     created: function (){
       this.listarInventario();
       this.listarItem();
       this.listarTipoItem();
     },
     methods: {
         getColor(est) {
             if (est == "ACTIVO") return 'green'
             else if (est == "INACTIVO") return 'red'
 
         },
         //#region Listar
         listarInventario() {
             this.listarInventarios();
         },
         async listarInventarios() {
           let me = this;
           await axios
             .get("/inventario/listarinventarioactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosInventario = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosInventario = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },


         

         registrarInv() {
            this.registrarInventario(this.idItem, this.movimiento,this.cantidad,this.metodovaluacion, this.estado);
        },
        async registrarInventario(
            idItem,
            movimiento,
            cantidad,
            metodovaluacion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregarinventario/" +
                    this.idItem +
                    "," +
                    this.movimiento +
                    "," +
                    this.cantidad +
                    "," +
                    this.metodoValuacion +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.closeModalAgregarTransaccion();
                    me.listarInventarios();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarInv() {
            this.editarInventario(this.idTransaccion,this.idItem, this.movimiento,this.cantidad, this.metodovaluacion, this.estado);

            this.botonActInv=0;
        },
        async editarInventario(
            idTransaccion,
            idItem,
            movimiento,
            cantidad,
            metodovaluacion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizarinventario/" +
                    this.idTransaccion +
                    "," +
                    this.idItem +
                    "," +
                    this.movimiento +
                    "," +
                    this.cantidad +
                    "," +
                    this.metodovaluacion +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.closeModalAgregarTransaccion();
                    me.listarInventarios();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionInv(item){
            this.idTransaccion = item.idTransaccion;
            this.confirmacionAnulacionInventario = true;
        },
        closeAnulacionInventario(){
            this.confirmacionAnulacionInventario = false;
        },
        anularInventario() {
            this.desactivarInventario(this.idTransaccion);
            this.confirmacionAnulacionInventario = false;
            this.listarInventarios();
        },
        async desactivarInventario(idTransaccion) {
            let me = this;
            await axios
                .post("/inventario/eliminarinventario/" + this.idTransaccion).then(function (response) {
                    me.listarInventarios();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
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

         registrarIt() {
            this.registrarItem(this.nombreItem,this.cantidad, this.descripcion,this.medida,this.idTipoItem, this.estado);
        },
        async registrarItem(
            nombreItem,
            cantidad,
            descripcion,
            medida,
            idTipoItem,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregaritem/" +
                    this.nombreItem +
                    "," +
                    this.cantidad +
                    "," +
                    this.descripcion +
                    "," +
                    this.medida +
                    "," +
                    this.estado +
                    "," +
                    this.idTipoItem
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarItems();
                    me.closeModalAgregarItem();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarIt() {
            this.editarItem(this.idItem, this.nombreItem,this.cantidad, this.descripcion,this.medida,this.idTipoItem, this.estado);
            this.botonActInv=0;
        },
        async editarItem(
            idItem,
            nombreItem,
            cantidad,
            descripcion,
            medida,
            idTipoItem,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizaritem/" +
                    this.idItem +
                    "," +
                    this.nombreItem +
                    "," +
                    this.cantidad +
                    "," +
                    this.descripcion +
                    "," +
                    this.medida +
                    "," +
                    this.estado +
                    "," +
                    this.idTipoItem
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarItems();
                    me.closeModalAgregarItem();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionIt(item){
            this.idItem = item.iditem;
            this.confirmacionAnulacionItem = true;
        },
        closeAnulacionItem(){
            this.confirmacionAnulacionItem = false;
        },
        anularItem() {
            this.desactivarItem(this.idItem);
        },
        async desactivarItem(idItem) {
            let me = this;
            await axios
                .post("/inventario/eliminaritem/" + this.idItem).then(function (response) {
                    me.listarItems();
                    me.closeModalAgregarItem();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

        },

 
         listarTipoItem() {
             this.listarTipoItems();
         },
         async listarTipoItems() {
           let me = this;
           await axios
             .get("/inventario/listartipodeitemactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosTipoDeItem = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosTipoDeItem = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },


         registrarTipo() {
            this.registrarTipo(this.nombreTipoITem, this.estado);            
        },
        async registrarTipo(
            nombreTipoITem,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregartipodeitem/" +
                    this.nombreTipoITem +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTipoItems();
                    me.closeModalAgregarTipoItem();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarTipo() {
            this.editarTipo( this.idTipoItem,this.nombreTipoITem, this.estado);
            this.botonActTT = 0;
        },
        async editarTipo(
            idTipoItem,
            nombreTipoITem,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizartipodeitem/" +
                    this.idTipoItem +
                    "," +
                    this.nombreTipoITem +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTipoItems();
                    me.closeModalAgregarTipoItem();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },



        confirmacionAnulacionTip(item){
            this.idTipoItem = item.idtipodeitem;
            this.confirmacionAnulacionTipo = true;
        },
        closeAnulacionTipo(){
            this.confirmacionAnulacionTipo = false;
        },
        anularTipo() {
            this.desactivarTipo(this.idTipoItem);
            this.confirmacionAnulacionTipo = false;
            this.listarTipoItem();
        },
        async desactivarTipo(idTipoItem) {
            let me = this;
            await axios
                .post("/inventario/eliminartipodeitem/" + this.idTipoItem).then(function (response) {
                    me.listarTipoItems();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

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


         llenarCamposItem(item) {
            this.botonActIt = 1;
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.descripcion = item.descripcion;
            this.medida = item.medida;
            this.idTipoItem = item.idTipoItem;
            this.nombreTipoITem = item.nombretipoitem;
            this.estado = item.estado;
            this.agregarItemModal = true;
        },



        llenarCamposTipoItem(item) {
            this.botonActTT = 1;
            this.idTipoItem = item.idtipodeitem;
            this.nombreTipoITem = item.nombretipoitem;
            this.estado = item.estado;
            this.agregarTipoItemModal = true;
        },

        llenarCamposInventario(item) {
            this.botonActInv = 1;
            this.idTransaccion = item.idTransaccion;
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.movimiento = item.movimiento;
            this.cantidad = item.cantidad;
            this.metodoValuacion = item.metodoValuacion;
            this.estado = item.estado;
            this.agregarInventarioModal = true;
        },
 


        showModalAgregarTransaccion(){
            this.agregarInventarioModal = true;
            this.botonActInv = 0;
        },

        closeModalAgregarTransaccion(){
            this.agregarInventarioModal = false;
            this.limpiar();
        },


        showModalAgregarItem(){
            this.agregarItemModal = true;
            this.botonActIt = 0;
        },

        closeModalAgregarItem(){
            this.agregarItemModal = false;
            this.limpiar();

        },

        openItemModal(){
            this.listarItems();
            this.itemModal = true;
        },

        closeItemModal(){
            this.itemModal = false;
        },

        seleccionarItem(item) {
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.itemModal = false;
        },


        openTipoModal(){
            this.listarTipoItems();
            this.tipoModal = true;
        },

        closeTipoModal(){
            this.tipoModal = false;
        },

        seleccionarTipo(item){
            this.idTipoItem = item.idtipodeitem;
            this.nombreTipoITem = item.nombretipoitem;
            this.tipoModal = false;
        },


        showModalAgregarTipoItem(){
            this.agregarTipoItemModal = true;
            this.botonActTT = 0;  
        },

        closeModalAgregarTipoItem(){
            this.agregarTipoItemModal = false;
            this.limpiar();
     
        },


        limpiar () {
            this.$refs.form.reset()
        },

      
         //#endregion
       },
 };
 
 </script>
 