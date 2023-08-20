<template>
   <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>Proveedores</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarProveedor()">NUEVO Proveedor</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>Proveedores</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchProveedor" append-icon="mdi-magnify" label="Buscar Proveedor"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headerProveedor" :items="datosProveedor" :search="searchProveedor"
                                :items-per-page="5" class="elevation-1" id="tableId">

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="getColor(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="actualizarInfoProveedor(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.est == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR PROVEEDOR">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" x-large color="error" class="mr-2" @click="desactivar(item)"
                                        title="DESACTIVAR PROVEEDOR">
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

            searchProveedor: "",
            agregarProveedorModal: false,
            //#endregion
        }
    },
    created: function (){
      this.listarProveedor();
    },
    methods: {
        getColor(est) {
            if (est == "ACTIVO") return 'green'
            else if (est == "INACTIVO") return 'red'

        },
        //#region Listar
        listarProveedor() {
            this.listarProveedores();
        },
        async listarProveedores() {
          let me = this;
          await axios
            .get("/proveedor/listarproveedores/")
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
