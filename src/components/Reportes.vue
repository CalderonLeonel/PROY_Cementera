<template>
    <v-card elevation="5" outlined shaped>

        <v-card class="white--text" color="grey lighten-4" max-width="100%">
            <v-card-actions>

                <v-row>
                    <v-col cols="12">
                        <v-tabs horizontal color="#002245" center-active grow>
                            <v-tab>
                                <v-icon left>
                                    mdi-account-alert-outline
                                </v-icon>
                                R.R.H.H
                                PERS
                            </v-tab>
                            <v-tab>
                                <v-icon left>
                                    mdi-truck
                                </v-icon>
                                PRODUCCION
                            </v-tab>
                            <v-tab>
                                <v-icon left>
                                    mdi-format-list-checkbox
                                </v-icon>
                                VENTAS
                            </v-tab>
<!--
                            <v-tab>
                                <v-icon left>
                                    mdi-bank-transfer-in
                                </v-icon>
                                ADQUISICIONES
                            </v-tab>

                            <v-tab>
                                <v-icon left>
                                    mdi-package-variant-closed
                                </v-icon>
                                INVENTARIO
                            </v-tab>
                        -->
                            

                            <v-tab-item v-if="flag == 1">
                                <v-card elevation="5" outlined shaped>
                                    <v-row class="pa-4">
                                        <iframe title="reporte_empleados" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=91b26683-3915-4c3b-b15b-eb8b693a91c9&autoAuth=true&ctid=77cab36c-76b2-48c3-9c54-cb9e4ee09b72" frameborder="0" allowFullScreen="true"></iframe>
                                    </v-row>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item v-if="flag == 1">
                                <v-card elevation="5" outlined shaped>
                                    <v-row class="pa-4">
                                        <iframe title="powerbi_produccion" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=df27ecca-7787-43fb-94da-2741a2b32d2f&autoAuth=true&ctid=77cab36c-76b2-48c3-9c54-cb9e4ee09b72" frameborder="0" allowFullScreen="true"></iframe>
                                    </v-row>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item v-if="flag == 1">
                                <v-card elevation="5" outlined shaped>
                                    <v-row class="pa-4">
                                        <iframe title="powerbi_ventas" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=b8c93c6b-4a31-478e-ab93-016356a06fe7&autoAuth=true&ctid=77cab36c-76b2-48c3-9c54-cb9e4ee09b72" frameborder="0" allowFullScreen="true"></iframe>
                                    </v-row>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-col>
                </v-row>
            </v-card-actions>




            <v-list-item> </v-list-item>
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

                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense color="danger" outlined>
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
    data: () => ({
        flag: 1,
    })
}
</script>