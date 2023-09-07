<template>
   <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>ALMACENAMIENTO</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAlmacenamiento()">REGISTRAR ALMACENAMIENTO DE ITEMS</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ALMACENAMIENTO DE ITEMS</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchAlmacenamiento" append-icon="mdi-magnify" label="Buscar Almacen"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerAlmacenamiento" :items="datosAlmacenamiento" :search="searchAlmacenamiento"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposCotizacionItem(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                   <!--<v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR Almacen">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
                                        title="DESACTIVAR Almacen">
                                        mdi-close-circle
                                    </v-icon> -->             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>
                 

            <v-dialog v-model="modalAlmacenamiento" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR ALMACENAMIENTO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                              
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" v-if="botonAct == 0" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openItemModal()" style="float: right" title="BUSCAR ITEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ITEM" :counter="60"
                                        :rules="nombreRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openStandModal()" style="float: right" title="BUSCAR STAND">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreStand" label="NOMBRE STAND" :counter="60"
                                        :rules="nombreRules" @input="nombreStand = nombreStand.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="cantidad" label="CANTIDAD" type="number" :counter="10"
                                        :rules="cantidadRules" @input="cantidad = cantidad.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="12"> </v-col>
                                
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarAlm()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarAlm()" style="float: left" title="REGISTRAR ALMACENAMIENTO">
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
                                        @click="closeModalAlmacenamiento()" style="float: right" title="SALIR">
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

        <v-dialog v-model="modalStand" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE STANDS ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchStand" append-icon="mdi-magnify" label="BUSCAR SECCIÓN"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerStand" :items="datosStand" :search="searchStand"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarStand(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeStandModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>   
        
        <v-dialog v-model="modalItem" max-width="900px">
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
            idItem:"",
            idStand:"",
            cantidad:"",


            nombreStand:"",
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
            cantidadRules: [
            (v) => !!v || "Se requiere un numero.",
            ],
            emailRules: [
              (v) => !!v || "Se requiere el correo electronico del proveedor",
              (v) => /.+@.+\..+/.test(v) || "Debe ser un correo electronico valido",
             ],
            datosAlmacenamiento: [],
            headerAlmacenamiento: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "ITEM", value: "nombreitem", sortable: true },
                { text: "STAND", value: "nombrestand", sortable: true },
                { text: "CANTIDAD", value: "cantidad", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],


            searchAlmacenamiento: "",
            modalAlmacenamiento: false,


            datosStand:[],
            headerStand: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE STAND", value: "nombrestand", sortable: true },
                { text: "SECCION", value: "nombreseccion", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],
            searchStand: "",
            modalStand: false,
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
            searchItem: "",
            modalItem: false,


            botonAct: 0,
            //#endregion
        }
    },
    created: function (){
      this.listarAlmacenamiento();
      
    },
    methods: {
        getColor(est) {
            if (est == "ACTIVO") return 'green'
            else if (est == "INACTIVO") return 'red'

        },

        listarStand() {
            this.listarStands();
        },
        async listarStands() {
          let me = this;
          await axios
            .get("/stand/listarstandsactivos/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosStand = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosStand = response.data.resultado;
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




        //#region Listar
        listarAlmacenamiento() {
            this.listarAlmacenamientos();
        },
        async listarAlmacenamientos() {
          let me = this;
          await axios
            .get("/almacen/listaralmacenamiento/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosAlmacenamiento = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosAlmacenamiento = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },


        llenarCamposCotizacionItem(item) {
            this.botonAct = 1;
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.idStand = item.idstand;
            this.nombreStand = item.nombrestand;
            this.cantidad = item.cantidad;
            this.modalAlmacenamiento = true;
        },

        registrarAlm() {
            this.registrarAlmacenamiento(this.idItem,this.idStand, this.cantidad);
        },
        async registrarAlmacenamiento(
            idItem,
            idStand,
            cantidad,
        ) {
            let me = this;
            await axios
                .post(
                    "/almacen/agregaralmacenamiento/" +
                    this.idItem +
                    "," +
                    this.idStand +
                    "," +
                    this.cantidad
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarAlmacenamientos();
                    me.closeModalAlmacenamiento();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarAlm() {
            this.editarAlmacenamiento(this.idItem, this.nombreItem,this.cantidad, this.descripcion,this.medida,this.idTipoItem, this.estado);
            this.botonAct=0;
        },
        async editarAlmacenamiento(
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
                    "/almacen/editaralmacenamiento/" +
                    this.idItem +
                    "," +
                    this.idStand +
                    "," +
                    this.cantidad               
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarAlmacenamientos();
                    me.closeModalAlmacenamiento();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },


        showModalAlmacenamiento() {
            this.modalAlmacenamiento = true;
        },
        closeModalAlmacenamiento() {
            this.modalAlmacenamiento = false;
            this.botonAct = 0;
            this.limpiar();
        },

        openItemModal(){
            this.listarItems();
            this.modalItem = true;
        },

        closeItemModal(){
            this.modalItem = false;
        },

        seleccionarItem(item) {
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.modalItem = false;
        },

        openStandModal(){
            this.listarStands();
            this.modalStand = true;
        },

        closeStandModal(){
            this.modalStand = false;
        },

        seleccionarStand(item) {
            this.idStand = item.idstand;
            this.nombreStand = item.nombrestand;
            this.modalStand = false;
        },


        limpiar () {
            this.$refs.form.reset()
        },
     
      },
};

</script>
