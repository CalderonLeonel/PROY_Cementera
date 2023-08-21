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
                             <v-btn color="success" @click="showModalAgregarProveedor()">NUEVO INVENTARIO</v-btn>
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
                             <v-btn color="success" @click="showModalAgregarSeccion()">NUEVO ITEM</v-btn>
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
                             <v-btn color="success" @click="showModalAgregarItem()">NUEVO TIPO DE ITEM</v-btn>
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
 
                             <v-data-table :headers="headerItem" :items="datosItem" :search="searchTipoIem"
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
       
     </v-card>
     
 
 </template>
 <script>
 import axios from "axios";
 export default {
     data() {
         return {
             //#region Proveedor
             idProveedor: "",
             nombreProveedor: "",
             contactoProveedorPrincipal: "",
             contactoProveedorecundario: "",
             correoProveedor: "",
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
             datosInventario: [],
             headerInventario: [
                 
                 { text: "NUMERO TRANSACCIÓN", value: "idtransaccion", sortable: true },
                 { text: "Item", value: "idItem", sortable: true },
                 { text: "MOVIMIENTO", value: "movimiento", sortable: true },
                 { text: "CANTIDAD", value: "cantidad", sortable: true },
                 { text: "COSTO UNITARIO", value: "costoUnitario", sortable: true },
                 { text: "METODO DE VALUACIÓN", value: "metodovaluacion", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
 
             datosItem: [],
             headerItem: [
                 
                 { text: "NOMBRE ITEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCION", value: "descripcion", sortable: true },
                 { text: "MEDIDA", value: "medida", sortable: true },
                 { text: "TIPO ITEM", value: "idtipoitem", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
 
             datosTipoDeItem: [],
             headerTipoDeItem: [
                 
                 { text: "NOMBRE DE TIPO DE ITEM", value: "nombretipodeitem", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
 
             searchInventario: "",
             agregarInventarioModal: false,
 
             searchItem: "",
             agregarItemModal: false,
 
             searchTipoIem: "",
             agregarTipoIemModal: false,
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
             .get("/inventario/listarinventario/")
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
             .get("/inventario/listaritem/")
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
             .get("/inventario/listartipodeitem/")
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
         
         llenarCamposProveedores(item) {
             this.botonEst = 1;
             this.nombreMateria = item.nom;
             this.codigoMateria = item.codmat;
             this.idMateria = item.idmateria;
 
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
 
 
 
         showModalAgregarProveedor() {
             this.agregarProveedorModal = true;
         },
         closeModalAgregarProveedor() {
             this.agregarProveedorModal = false;
         },
         showFormato() {
             this.formatoModal = true;
         },
         closeFormato() {
             this.formatoModal = false;
         },
         //#endregion
       },
 };
 
 </script>
 