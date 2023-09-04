<template>
    <v-card elevation="5" outlined>
         <div>
             <v-alert dense style="color: #ffffff;" color="grey">
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
                                <v-text-field v-model="searchInventario" append-icon="mdi-magnify" label="Buscar Almacen"
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
                                     <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoInventario(item)"
                                         title="ACTUALIZAR INFORMACION">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR Almacen">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
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
                                     <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoItem(item)"
                                         title="ACTUALIZAR INFORMACION">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR Seccion">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
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
                                <v-text-field v-model="searchTipoIem" append-icon="mdi-magnify" label="Buscar Item"
                                     single-line hide-details></v-text-field>
                             </v-card-title>
 
                             <v-data-table :headers="headerTipoDeItem" :items="datosTipoDeItem" :search="searchTipoIem"
                                 :items-per-page="5" class="elevation-1" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoStand(item)"
                                         title="ACTUALIZAR INFORMACION">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR Stand">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
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

         <v-dialog v-model="agregarItemModal" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR TIPO DE ITEM</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombre" label="NOMBRE TIPO ITEM" :counter="60"
                                        :rules="nombreRules" @input="nombreTipoITem = nombreTipoITem.toUpperCase()"
                                        required></v-text-field>
                                </v-col>      
                                <v-col cols="12" md="4">
                                    <v-combobox
                                    label="MEDIDA" nombre="medida" @input="medida = medida.toUpperCase()" required
                                    :items="['LT', 'KG', 'ML', 'DS', 'UI', 'TN','SOB','MIC','MT','G','UNIDAD']"
                                    ></v-combobox>
                                </v-col>                   
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActTT == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarInfoProveedor()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActTT == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registar()" style="float: left" title="REGISTRAR PROVEEDOR">
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

         <v-dialog v-model="agregarTipoItemModal" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR TIPO DE ITEM</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombe" label="NOMBRE TIPO ITEM" :counter="60"
                                        :rules="nombreRules" @input="nombreTipoITem = nombreTipoITem.toUpperCase()"
                                        required></v-text-field>
                                </v-col>                         
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActTT == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="actualizarInfoProveedor()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonActTT == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registar()" style="float: left" title="REGISTRAR PROVEEDOR">
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
             costoUnitario:"",
             metodoValuacion:"",
             estTranc:"",


             nombreItem:"",
             descripcion:"",
             medida:"",
             estIt:"",

             idTipoItem:"",
             nombreTipoITem: "",
             estTT: "",


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
                 { text: "ITEM", value: "iditem", sortable: true },
                 { text: "MOVIMIENTO", value: "movimiento", sortable: true },
                 { text: "CANTIDAD", value: "cantidad", sortable: true },
                 { text: "COSTO UNITARIO", value: "costoUnitario", sortable: true },
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
 
             searchInventario: "",
             agregarInventarioModal: false,
 
             searchItem: "",
             agregarItemModal: false,
 
             searchTipoIem: "",
             agregarTipoItemModal: false,


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
            this.botonActAl = 1;
            this.agregarAlmacenModal = true;
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.estado = item.est;
        },



        llenarCamposTipoItem(item) {
            this.botonAct = 1;
            this.agregarSeccionModal = true;
            this.idSeccion = item.idseccion;
            this.idAlmacen = item.idalmacen;
            this.nombreSeccion = item.nombreseccion;
            this.estado = item.est;
        },

        llenarCamposItem(item) {
            this.botonAct = 1;
            this.agregarStandModal = true;
            this.idStand = item.idstand;
            this.idSeccion = item.idseccion;
            this.nombreStand = item.nombrestand;
            this.estado = item.est;
        },
 


        showModalAgregarTransaccion(){
            this.agregarInventarioModal = true;
        },

        closeModalAgregarTransaccion(){
            this.agregarInventarioModal = false;
            this.limpiar();
        },


        showModalAgregarItem(){
            this.agregarItemModal = true;
        },

        closeModalAgregarItem(){
            this.agregarItemModal = false;
            this.limpiar();
        },


        showModalAgregarTipoItem(){
            this.agregarTipoItemModal = true;
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
 