<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff">
                <h5>TURNOS</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Turno -->
                <v-container>
                    <v-row>
                        <v-list-item>
                            <v-list-item-title class="text-center">
                                <h5>TURNOS</h5>
                            </v-list-item-title>
                        </v-list-item>
                        
                        <v-col cols="12" md="12">
                            <v-text-field v-model="nombreCargo" :counter="50" :rules="nombreRules"
                                @input="nombreCargo = nombreCargo.toUpperCase()" label="Nombre del Turno" required>
                            </v-text-field>
                        </v-col>
                    
                            <v-col cols="12">
                                
                                <!--
                                <v-card-title> BUSCADOR
                                    <v-text-field v-model="searchTurno" append-icon="mdi-magnify"
                                        label="BUSCAR TURNOS" single-line hide-details></v-text-field>
                                </v-card-title>
                                -->
                                <div> <!-- Encabezado -->
                                    <v-alert dense color="#00A1B1" style="color: #ffffff; text-align: center;">
                                        <h5>TURNOS</h5>
                                    </v-alert>
                                </div>

                                <v-data-table :headers="headersTurno" :items="datosTurno" :group-by="groupBy"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #item.turn="{ item }">
                                        <tr color="#00A1B1" >
                                         
                                       </tr> 
                                    </template>
                                    <template #[`item.act`]="{ item }">
                                        <v-chip :color="getColor(item.act)" dark>
                                            {{ item.act }}
                                        </v-chip>
                                    </template>
                                    
                                    <!--
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon v-if="item.act == 'INACTIVO'" small class="mr-2" @click="activar(item)"
                                            title="ACTIVAR TURNO">
                                            mdi-check-circle-outline
                                        </v-icon>
                                        <v-icon v-if="item.act == 'ACTIVO'" small class="mr-2" @click="desactivar(item)"
                                            title="DESACTIVAR TURNO">
                                            mdi-cancel
                                        </v-icon>
                                        <v-icon small class="mr-2" @click="llenarCamposTurno(item)"
                                            title="ACTUALIZAR INFORMACION">
                                            mdi-pencil
                                        </v-icon>
                                    </template>
                                     -->
                                </v-data-table>
                            </v-col>

                    </v-row>

                    <div class="text-center">
                        <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00"
                            outlined>
                            <strong>{{ mensajeSnackbar }}</strong>


                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                    mdi-close
                                </v-icon>
                            </template>
                        </v-snackbar>
                    </div>
                    <div class="text-center">

                        <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="#EE680B"
                            outlined>
                            <strong>{{ mensajeSnackbarError }}</strong>

                            <template v-slot:action="{ attrs }">
                                <v-icon right v-bind="attrs" @click="snackbarError = false">
                                    mdi-close
                                </v-icon>
                            </template>
                        </v-snackbar>
                    </div>
                </v-container>
            </v-form>
        </div>
    </v-card>
</template>
<script>
import axios from "axios";

export default {
    data: () => ({
        
        idTurno: "",
        turno: "",
        estado: "",
        createDate: "",
        lastDate: "",
        valid: true,


      
        //searchTurno: "",

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        botonAct: 0,
        datosTurno: [],
        groupBy: "turn",

        headersTurno: [
            { text: "Turno", value: "turn", sortable: false},
            { text: "DIAS", value: "dias", sortable: false, align: 'end' },
            { text: "HORA INICIO", value: "hraini", sortable: false, align: 'end'},
            { text: "HORA FINAL", value: "hrafin", sortable: false, align: 'end'},
            { text: "OPTIONS", value: "actions", sortable: false, align: 'end'},
        ],
    }),

    created: function () {
        this.listarTurnos();
    },

    methods: {
    
        async listarTurnos(idCargo) {
            let me = this;
            await axios
                .get("/turno/listarturnos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosTurno = [];
                    } else {
                        me.datosTurno = response.data.resultado;
                        console.log(me)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>