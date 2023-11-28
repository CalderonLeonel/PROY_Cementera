<template>
    <v-card elevation="5" outlined shaped>
        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>
                <v-tabs horizontal color="#002245" center-active grow>
                    <v-tab>
                        <v-icon left>mdi-office-building-outline</v-icon>
                        DEPARTAMENTOS
                    </v-tab>
                    <v-tab>
                        <v-icon left>mdi-office-building-plus</v-icon>
                        FORM
                        FINZ.
                    </v-tab>

                    <v-tab-item v-if="flag == 1">
                        <v-card elevation="5" outlined shaped>
                            <v-row>
                                <iframe title="proy" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=a9cc7db1-0ce1-4cb2-a0e6-09f0233bcf67&autoAuth=true&ctid=77cab36c-76b2-48c3-9c54-cb9e4ee09b72" frameborder="0" allowFullScreen="true"></iframe>

                                <v-col cols="12" md="12"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="numeroCuenta" label="NUMERO CUENTA" :counter="100"
                                        :rules="numeroCuentaRules" @input="numeroCuenta = numeroCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="4"></v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreCuenta" label="NOMBRE CUENTA" :counter="100"
                                        :rules="nombreCuentaRules" @input="nombreCuenta = nombreCuenta.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4"></v-col>

                                <v-col cols="12" md="8"></v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped color="#002245">
                                        <v-toolbar-title style="color:#ffffff">
                                            <h6>OPCIONES</h6>
                                        </v-toolbar-title>
                                        <v-btn v-if="botonact == 1" @click="registrarSaldo()" class="mx-2" fab dark x-small
                                            color="#EE680B" title="REGISTRAR DEPARTAMENTO" style="float: left">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn v-if="botonact == 0" @click="editarCuenta()" class="mx-2" fab dark x-small
                                            color="#EE680B" title="ACTUALIZAR DEPARTAMENTO" style="float: left">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>

                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>DEPARTAMENTOS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarDepartamentos" append-icon="mdi-magnify"
                                            label="BUSCAR CUENTAS" single-line hide-details></v-text-field>
                                    </v-card-title>


                                    <v-data-table :headers="headersDepartamentos" :items="datosDepartamentos"
                                        :search="buscarDepartamentos" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">

                                            <v-icon small class="mr-2" @click="seleccionarDepa(item)"
                                                title="ACTUALIZAR INFORMACION">
                                                mdi-text-box-edit-outline
                                            </v-icon>

                                        </template>
                                    </v-data-table>
                                </v-col>

                            </v-row>
                        </v-card>
                    </v-tab-item>

                </v-tabs>



            </v-card-actions>
            <div class="text-center">
                <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                    <strong>{{ mensajeSnackbar }}</strong>


                    <template v-slot:action="{ attrs }">
                        <v-icon right v-bind="attrs" @click="snackbarOK = false">
                            mdi-close
                        </v-icon>
                    </template>
                </v-snackbar>
            </div>

            <div class="text-center">

                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B" outlined>
                    <strong>{{ mensajeSnackbarError }}</strong>

                    <template v-slot:action="{ attrs }">
                        <v-icon right v-bind="attrs" @click="snackbarError = false">
                            mdi-close
                        </v-icon>
                    </template>
                </v-snackbar>
            </div>
        </v-card>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            flag: 1,

        }
    },

    created: function () {

    },

    methods: {

    },
}
</script>