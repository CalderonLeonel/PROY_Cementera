<template>
   <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>Almacenes</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarProveedor()">NUEVO Almacen</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Almacenes</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchAlmacen" append-icon="mdi-magnify" label="Buscar Almacen"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerAlmacen" :items="datosAlmacen" :search="searchAlmacen"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoAlmacen(item)"
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
                            <v-btn color="success" @click="showModalAgregarSeccion()">NUEVO Seccion</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Secciones</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchSeccion" append-icon="mdi-magnify" label="Buscar Seccion"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerSeccion" :items="datosSeccion" :search="searchSeccion"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.estado`]="{ item }">
                                    <v-chip :color="getColor(item.estado)" dark>
                                        {{ item.estado }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoSeccion(item)"
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
                            <v-btn color="success" @click="showModalAgregarStand()">NUEVO Stand</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Stands</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchStand" append-icon="mdi-magnify" label="Buscar Stand"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerStand" :items="datosStand" :search="searchStand"
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
        <v-dialog v-model="agregarProveedorModal" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>Agregar Proveedor</span>
                </v-card-title>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editarProductoModal" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>Editar Proveedor</span>
                </v-card-title>
            </v-card>
        </v-dialog>

        <v-dialog v-model="confirmacionAnulacionProveedor" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>Confirmación de Eliminacion</span>
                </v-card-title>
            </v-card>
        </v-dialog>
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
            datosAlmacen: [],
            headerAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE ALMACEN", value: "nombrealmacen", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosSeccion: [],
            headerSeccion: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE SECCION", value: "nombreseccion", sortable: true },
                { text: "ALMACEN", value: "idalmacen", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosStand: [],
            headerStand: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE STAND", value: "nombrestand", sortable: true },
                { text: "SECCION", value: "idseccion", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            searchAlmacen: "",
            agregarAlmacenModal: false,

            searchSeccion: "",
            agregarSeccionModal: false,

            searchStand: "",
            agregarStandModal: false,
            //#endregion
        }
    },
    created: function (){
      this.listarAlmacen();
      this.listarSeccion();
      this.listarStand();
    },
    methods: {
        getColor(est) {
            if (est == "ACTIVO") return 'green'
            else if (est == "INACTIVO") return 'red'

        },
        //#region Listar
        listarAlmacen() {
            this.listarAlmacenes();
        },
        async listarAlmacenes() {
          let me = this;
          await axios
            .get("/almacen/listaralmacenes/")
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


        listarSeccion() {
            this.listarSecciones();
        },
        async listarSecciones() {
          let me = this;
          await axios
            .get("/seccion/listarsecciones/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosSeccion = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosSeccion = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        listarStand() {
            this.listarStands();
        },
        async listarStands() {
          let me = this;
          await axios
            .get("/stand/listarstands/")
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
