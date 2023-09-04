<template>
   <v-card elevation="5" outlined>
        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>llenarCamposProveedores</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarProveedor()">NUEVO PROVEEDOR</v-btn>
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

                                <template #[`item.cto2pro`]="{ item }">
                                    {{ item.cto2pro=="null"? "-" : item.cto2pro}}
                                </template>

                                <template #[`item.est`]="{ item }">
                                    <v-chip :color="getColor(item.est)" dark>
                                        {{ item.est }}
                                    </v-chip>
                                </template>

                              

                                <template #[`item.actions`]="{ item }">
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposProveedor(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.est == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR PROVEEDOR">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.est == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacion(item)"
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
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreProveedor" label="NOMBRE PROVEEDOR" :counter="60"
                                        :rules="nombreRules" @input="nombreProveedor = nombreProveedor.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="contactoProveedorPrincipal" type="number" label="CONTACTO" :counter="10"
                                        :rules="phone1Rules" @input="contactoProveedorPrincipal = contactoProveedorPrincipal.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="contactoProveedorecundario" type="number" label="CONTACTO SECUNDARIO (OPCIONAL)" :counter="10"
                                        :rules="phone2Rules" @input="contactoProveedorecundario = contactoProveedorecundario.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="correoProveedor" type="email" label="CORREO" :counter="100"
                                        :rules="emailRules" @input="correoProveedor = correoProveedor"
                                        required></v-text-field>
                                </v-col>   
                                <v-col cols="12" md="4"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonAct == 1" class="mx-4"  dark color="#0A62BF"
                                            @click="editarProv()" style="float: left"
                                            title="ACTUALIZAR INFORMACIÓN">
                                            <v-icon dark> mdi-pencil </v-icon>
                                            ACTUALIZAR
                                        </v-btn>
                                        <v-btn iconv v-if="botonAct == 0" class="mx-4"  dark color="#0ABF55"
                                            @click="registrarProv()" style="float: left" title="REGISTRAR PROVEEDOR">
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
                                        @click="closeModalAgregarProveedor()" style="float: right" title="SALIR">
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

        <v-dialog v-model="confirmacionAnulacionProveedor" max-width="1000px">
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
                                        @click="anular()" style="float: right" title="ANULAR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacion()" style="float: right" title="SALIR">
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
            //#region Proveedor
            idProveedor: "",
            nombreProveedor: "",
            contactoProveedorPrincipal: "",
            contactoProveedorecundario: "",
            correoProveedor: "",
            estado:"ACTIVO",
            //fechaDeModificacion: "",
            valid: true,
            nombreRules: [
              (v) => !!v || "Se requiere el nombre del proveedor.",
              (v) =>
              (v && v.length <= 60) ||
                "el nombre del proveedor no debe sobrepasar los 60 caracteres.",
            ],
            phone1Rules: [
                (v) => !!v ||"Se requiere un numero telefonico o celular.",
               (v) => v.length >= 7 || "El telephono principal debe tener al menos 7 caracteres.",
              (v) =>
              (v  && v.length <= 10) ||
                "El telephono principal debe tener hasta 10 caracteres.",
            ],
            phone2Rules: [
              (v) =>
              (v && v===null || v.length >= 7 || v.length <= 10) ||
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
            confirmacionAnulacionProveedor: false,
            botonAct: 0,
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
        activar(item) {
            this.idProveedor = item.idProveedor;
            this.activarproveedor(this.idProveedor);
        },
        async activarproveedor(idProveedor) {
            let me = this;
            /*await axios
                .post("/proveedor/activar/" + this.idProveedor).then(function (response) {

                    me.listarProveedor();
                })
                .catch(function (error) {
                    console.log(error);
                });*/

        },

        registrarProv() {
            this.registrarProveedor(this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado);
            this.closeModalAgregarProveedor();
        },
        async registrarProveedor(
            nombreProveedor,
            contactoProveedorPrincipal,
            contactoProveedorecundario,
            correoProveedor,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/proveedor/insertar/" +
                    this.nombreProveedor +
                    "," +
                    this.contactoProveedorPrincipal +
                    "," +
                    this.contactoProveedorecundario +
                    "," +
                    this.correoProveedor +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarProveedores();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarProv() {
            this.botonAct = 0;

            this.editarProveedor(this.idProveedor,this.nombreProveedor, this.contactoProveedorPrincipal, this.contactoProveedorecundario,this.correoProveedor,this.estado);
            this.closeModalAgregarProveedor();
        },
        async editarProveedor(
            idProveedor,
            nombreProveedor,
            contactoProveedorPrincipal,
            contactoProveedorecundario,
            correoProveedor,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/proveedor/editar/" +
                    this.idProveedor +
                    "," +
                    this.nombreProveedor +
                    "," +
                    this.contactoProveedorPrincipal +
                    "," +
                    this.contactoProveedorecundario +
                    "," +
                    this.correoProveedor +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarProveedores();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },
        confirmacionAnulacion(item){
            this.idProveedor = item.idprv;
            this.confirmacionAnulacionProveedor = true;
        },
        closeAnulacion(){
            this.confirmacionAnulacionProveedor = false;
        },
        anular() {
            this.desactivarproveedor(this.idProveedor);
            this.confirmacionAnulacionProveedor = false;
        },
        async desactivarproveedor(idProveedor) {
            let me = this;
            await axios
                .post("/proveedor/anular/" + this.idProveedor).then(function (response) {

                    me.listarProveedores();
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

        llenarCamposProveedor(item) {
            this.botonAct = 1;
            this.agregarProveedorModal = true;
            this.idProveedor = item.idprv;
            this.nombreProveedor = item.nomprv;
            this.contactoProveedorPrincipal = item.cto1pro;
            if(item.cto2pro==""){
                this.contactoProveedorecundario = "   ";

            }else{
                this.contactoProveedorecundario = item.cto2pro;
            }
            
            this.correoProveedor = item.croprov;
            this.estado = item.est;
        },


        showModalAgregarProveedor(item) {
            this.agregarProveedorModal = true;
            botonAct = 0;
        },
        closeModalAgregarProveedor() {
            this.agregarProveedorModal = false;
            this.limpiar();
        },

        limpiar () {
            this.$refs.form.reset()
        },
        //#endregion
      },
};

</script>
