<template>
   <v-card elevation="5" outlined>
    <div v-for="item in datosExistencia">
        <div class="text-h6">
            {{ item.nombreItem }}
        </div>
    </div>
        <v-alert   v-if="existencias==false" 
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
            <v-alert   v-if="existencias==true"        
                type="success"
                color="green darken-2"
                dismissible
                dense
                prominent
                >
                <div class="text-h5">
                    SE TIENEN LAS EXISTENCIAS NECESARIAS EN EL INVENTARIO
                </div>
               
        </v-alert>
        <div>
            <v-alert dense style="color: #ffffff;" color="indigo">
                <h3>ALMACENAMIENTO</h3>
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
                               <v-text-field v-model="searchAlmacenamiento" append-icon="mdi-magnify" label="BUSCAR ITEM ALMACENADO"
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
                 

            <v-dialog v-model="modalAlmacenamiento" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>REGISTRAR ALMACENAMIENTO</span>
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
                                        @click="openAlmacenModal()" style="float: right" title="BUSCAR almacen">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACEN" :counter="60"
                                        :rules="nombreRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
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

        <v-dialog v-model="modalAlmacen" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ALMACENES ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchAlmacen" append-icon="mdi-magnify" label="BUSCAR ALMACENES ACTIVOS"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerAlmacen" :items="datosAlmacen" :search="searchAlmacen"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarAlmacen(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeAlmacenModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>   
        
        <v-dialog v-model="modalItem" persistent :overlay="false" max-width="900px">
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




                </v-container>
            </v-form>

        </div>
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
    </v-card>
    

</template>
<script>
import axios from "axios";
export default {
    data() {
        return {

            mensajeSnackbarError: "REGISTRO FALLIDO",

            existencias: true,
            itemsCriticos: '',
            datosExistencia:[],

            idItem:"",
            idAlmacen:0,
            cantidad:"",


            nombreAlmacen:"",
            nombreItem:"",
            //fechaDeModificacion: "",
            valid: true,
            nombreRules: [
              (v) => !!v || "Se requiere el nombre del Almacen.",
              (v) =>
              (v && v.length <= 60) ||
                "el nombre del Almacen no debe sobrepasar los 60 caracteres.",
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
                { text: "ALMACEN", value: "nombrealmacen", sortable: true },
                { text: "CANTIDAD", value: "cantidad", sortable: true },
                //{ text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],


            searchAlmacenamiento: "",
            modalAlmacenamiento: false,


            datosAlmacen:[],
            headerAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                
                { text: "NOMBRE DE ALMACEN", value: "nombrealmacen", sortable: true },
                { text: "DESCRIPCIÓN DE ALMACEN", value: "descripcion", sortable: true },
                { text: "CODIGO ALMACEN", value: "codigo", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],
            searchAlmacen: "",
            modalAlmacen: false,
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

            snackbarOK: false,
            snackbarError : false,
            //#endregion
        }
    },
    created: function (){
      this.listarAlmacenamiento();
      this.getAlertas();
      
    },
    methods: {

        getAlertas(){
            var items = [];
            var stock = [];
            var limite = [];
            if(this.datosExistencia==[]){
                this.existencias=false;
            }
            else{
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
                    if ( limite[i] >= stock[i]  ) {
                        console.log(limite[i])
                        console.log(stock[i])
                        alert(limite[i]+' u '+stock[i] )
                        this.existencias=false;
                        this.itemsCriticos += items[i]+' ';
                    }
                }
            }
        },

        async getListaExistencias(){
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


        getColor(est) {
            if (est == "ACTIVO") return 'green'
            else if (est == "INACTIVO") return 'red'

        },

        listarAlmacen() {
            this.listarAlmacenes();
        },
        async listarAlmacenes() {
          let me = this;
          await axios
            .get("/almacen/listaralmacenesactivos/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosAlmacen = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosAlmacen = response.data.resultado;
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
            this.idAlmacen = item.idAlmacen;
            this.nombreAlmacen = item.nombreAlmacen;
            this.cantidad = item.cantidad;
            this.modalAlmacenamiento = true;
        },

        registrarAlm() {
            alert(this.idAlmacen)
            this.registrarAlmacenamiento(this.idItem,this.idAlmacen, this.cantidad);
        },
        async registrarAlmacenamiento(
            idItem,
            idAlmacen,
            cantidad,
        ) {
            let me = this;
            await axios
                .post(
                    "/almacen/agregaralmacenamiento/" +
                    this.idItem +
                    "," +
                    this.idAlmacen +
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
                    this.idAlmacen +
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

        openAlmacenModal(){
            this.listarAlmacenes();
            this.modalAlmacen = true;
        },

        closeAlmacenModal(){
            this.modalAlmacen = false;
        },

        seleccionarAlmacen(item) {
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.modalAlmacen = false;
        },


        limpiar () {
            this.$refs.form.reset()
        },


        
        async getListaExistencias(){
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
     
      },
};

</script>
