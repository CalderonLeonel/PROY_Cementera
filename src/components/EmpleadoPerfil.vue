<template>
    <v-card elevation="5" outlined shaped>
        <div> <!-- Encabezado -->
            <v-alert dense color="#00A1B1" style="color: #ffffff; text-align: left;">
                <h5>EMPLEADOS</h5>
            </v-alert>
        </div>
        <v-container> <!-- Datos del Empleado -->
            <v-row>
                <!-- V-TABS -->
                <v-col cols="12">
                    <v-tabs horizontal color="#002245" center-active grow>
                        <v-tab>
                            <v-icon left>
                                mdi-account-box
                            </v-icon>
                            PERFIL
                        </v-tab>
                        <v-tab>
                            <v-icon left>
                                mdi-file-sign
                            </v-icon>
                            CONTRATOS
                        </v-tab>
                        <v-tab>
                            <v-icon left>
                                mdi-eye-circle
                            </v-icon>
                            OBSERVACIONES
                        </v-tab>
                        <v-tab>
                            <v-icon left>
                                mdi-palm-tree
                            </v-icon>
                            VACACIONES
                        </v-tab>

                        <v-tab-item v-if="flag == 1">
                            <v-card elevation="5" outlined shaped>
                                <v-card-title>
                                    <span>PERFIL DEL EMPLEADO</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-container>
                                            <v-row>
                                                <!-- datos de empleado en screen -->
                                                <v-col cols="12" md="3">
                                                    <v-alert dense color="#00A1B1" style="color: #ffffff">
                                                        <h5>NOMBRE DEL EMPLEADO:</h5>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-alert dense>
                                                        <h5 dense> {{ this.$route.params.nom + " " +
                            this.$route.params.pat + " " +
                            this.$route.params.mat }}
                                                        </h5>
                                                        <hr>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-row></v-row>
                                                    <!-- FOTO CARNET -->
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-alert dense color="#00A1B1" style="color: #ffffff">
                                                        <h5>CORREO ELECTRÓNICO:</h5>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-alert dense>
                                                        <h5 dense> {{ this.$route.params.emal }}
                                                        </h5>
                                                        <hr>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-row></v-row>
                                                    <!-- FOTO CARNET -->
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-alert dense color="#00A1B1" style="color: #ffffff">
                                                        <h5>CONTACTOS:</h5>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-alert dense>
                                                        <h5>{{ this.$route.params.tel }}</h5>
                                                        <hr>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-alert dense color="#00A1B1" style="color: #ffffff">
                                                        <h5>ESTADO CIVIL:</h5>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-alert dense>
                                                        <h5>{{ this.$route.params.est }}</h5>
                                                        <hr>
                                                    </v-alert>
                                                </v-col>
                                                <!-- FOTO CARNET -->
                                                <v-col cols="12" md="3">
                                                    <v-alert dense color="#00A1B1" style="color: #ffffff">
                                                        <h5>NUMERO DE CARNET:</h5>
                                                    </v-alert>
                                                </v-col>
                                                <v-col cols="12" md="9">
                                                    <v-alert dense>
                                                        <h5>{{ this.$route.params.ci }}</h5>
                                                        <hr>
                                                    </v-alert>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item v-if="flag == 1">
                            <v-card elevation="5" outlined shaped>
                                <v-card-title>
                                    <span>HISTORIAL DE CONTRATOS</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Contratos -->
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-col cols="12">
                                                        <div> <!-- Encabezado -->
                                                            <v-alert dense color="#00A1B1"
                                                                style="color: #ffffff; text-align: center;">
                                                                <h5>CONTRATOS</h5>
                                                            </v-alert>
                                                        </div>
                                                        <v-col cols="12" md="4">
                                                            <v-btn color="success" @click="showAddContrato()">Nuevo
                                                                Contrato</v-btn>
                                                        </v-col>

                                                        <v-card-title>
                                                            <v-text-field v-model="searchContrato"
                                                                append-icon="mdi-magnify" label="BUSCAR CONTRATOS"
                                                                single-line hide-details></v-text-field>
                                                        </v-card-title>

                                                        <v-data-table :headers="headersContrato" :items="datosContrato"
                                                            :search="searchContrato" :items-per-page="5"
                                                            class="elevation-1" id="tableId">
                                                            <template #[`item.tip`]="{ item }">
                                                                <td v-if="item.fecfin == null">PERMANENTE</td>
                                                                <td v-if="item.fecfin != null">TEMPORAL</td>
                                                            </template>
                                                            <template #[`item.fecini`]="{ item }">
                                                                <td>{{ new Date(item.fecini).toLocaleDateString('es-ES',
                            {
                                day: 'numeric', month:
                                    'long', year: 'numeric'
                            }) }}</td>
                                                            </template>
                                                            <template #[`item.fecfin`]="{ item }">
                                                                <td v-if="item.fecfin == null">-</td>
                                                                <td v-if="item.fecfin != null">{{ new
                            Date(item.fecfin).toLocaleDateString('es-ES',
                                { day: 'numeric', month: 'long', year: 'numeric' })
                                                                    }}</td>
                                                            </template>
                                                            <template #[`item.act`]="{ item }">
                                                                <v-chip :color="getColor(item.act)" dark>
                                                                    {{ item.act }}
                                                                </v-chip>
                                                            </template>
                                                            <template #[`item.actions`]="{ item }">
                                                                <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" color="#0ABF55"
                                                                    @click="activarContrato(item)"
                                                                    title="ACTIVAR CONTRATO">
                                                                    mdi-check-circle-outline
                                                                </v-icon>
                                                                <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" color="#BF120A"
                                                                    @click="desactivarContrato(item)"
                                                                    title="DESACTIVAR CONTRATO">
                                                                    mdi-cancel
                                                                </v-icon>
                                                                <v-icon large class="mr-2" color="#0A628F"
                                                                    @click="showEditContrato(item)"
                                                                    title="EDITAR INFORMACION">
                                                                    mdi-pencil
                                                                </v-icon>
                                                            </template>
                                                        </v-data-table>
                                                    </v-col>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item v-if="flag == 1">
                            <v-card elevation="5" outlined shaped>
                                <v-card-title>
                                    <span>LISTA DE OBSERVACIONES</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Observaciones -->
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-col cols="12">
                                                        <div> <!-- Encabezado -->
                                                            <v-alert dense color="#00A1B1"
                                                                style="color: #ffffff; text-align: center;">
                                                                <h5>OBSERVACIONES</h5>
                                                            </v-alert>
                                                        </div>
                                                        <v-col cols="12" md="4">
                                                            <v-btn color="#0ABF55" @click="showAddObservacion()">Nueva
                                                                Observacion</v-btn>
                                                        </v-col>

                                                        <v-card-title>
                                                            <v-text-field v-model="searchObservacion"
                                                                append-icon="mdi-magnify" label="BUSCAR OBSERVACIONES"
                                                                single-line hide-details></v-text-field>
                                                        </v-card-title>

                                                        <v-data-table :headers="headersObservacion"
                                                            :items="datosObservacion" :search="searchObservacion"
                                                            :items-per-page="5" class="elevation-1" id="tableId">
                                                            <template #[`item.fec`]="{ item }">
                                                                <td>{{ new Date(item.fec).toLocaleDateString('es-ES', {
                                                                        day: 'numeric', month:
                                                                            'long', year: 'numeric'
                                                                    }) }}</td>
                                                            </template>
                                                            <template #[`item.act`]="{ item }">
                                                                <v-chip :color="getColor(item.act)" dark>
                                                                    {{ item.act }}
                                                                </v-chip>
                                                            </template>
                                                            <template #[`item.actions`]="{ item }">
                                                                <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" color="#0ABF55"
                                                                    @click="activarObservacion(item)"
                                                                    title="ACTIVAR OBSERVACION">
                                                                    mdi-check-circle-outline
                                                                </v-icon>
                                                                <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" color="#BF120A"
                                                                    @click="desactivarObservacion(item)"
                                                                    title="DESACTIVAR OBSERVACION">
                                                                    mdi-cancel
                                                                </v-icon>
                                                                <v-icon large class="mr-2" color="#0A628F"
                                                                    @click="showEditObservacion(item)"
                                                                    title="EDITAR INFORMACION">
                                                                    mdi-pencil
                                                                </v-icon>
                                                            </template>
                                                        </v-data-table>
                                                    </v-col>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item v-if="flag == 1">
                            <v-card elevation="5" outlined shaped>
                                <v-card-title>
                                    <span>HISTORIAL DE VACACIONES</span><br>
                                </v-card-title>
                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Listar Vacaciones -->
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-col cols="12">
                                                        <div> <!-- Encabezado -->
                                                            <v-alert dense color="#00A1B1"
                                                                style="color: #ffffff; text-align: center;">
                                                                <h5>VACACIONES</h5>
                                                            </v-alert>
                                                        </div>
                                                        <v-col cols="12" md="4">
                                                            <v-btn color="#0ABF55" @click="showAddVacacion()">Registrar Vacacion</v-btn>
                                                        </v-col>
                                                        <v-card-title>
                                                            <v-text-field v-model="searchVacacion"
                                                                append-icon="mdi-magnify" label="BUSCAR REGISTROS"
                                                                single-line hide-details></v-text-field>
                                                        </v-card-title>

                                                        <v-data-table :headers="headersVacacion" :items="datosVacacion"
                                                            :search="searchVacacion" :items-per-page="5"
                                                            class="elevation-1" id="tableId">
                                                            <template #[`item.fecini`]="{ item }">
                                                                <td>{{ new Date(item.fecini).toLocaleDateString('es-ES',
                                                                {
                                                                    day: 'numeric', month:
                                                                        'long', year: 'numeric'
                                                                }) }}</td>
                                                            </template>
                                                            <template #[`item.fecfin`]="{ item }">
                                                                <td>{{ new Date(item.fecfin).toLocaleDateString('es-ES',
                                                                {
                                                                    day: 'numeric', month:
                                                                        'long', year: 'numeric'
                                                                }) }}</td>
                                                            </template>
                                                            <template #[`item.act`]="{ item }">
                                                                <v-chip :color="getColor(item.act)" dark>
                                                                    {{ item.act }}
                                                                </v-chip>
                                                            </template>
                                                            <template #[`item.actions`]="{ item }">
                                                                <v-icon v-if="item.act == 'INACTIVO'" large class="mr-2" color="#0ABF55"
                                                                    @click="activarVacacion(item)"
                                                                    title="ACTIVAR VACACION">
                                                                    mdi-check-circle-outline
                                                                </v-icon>
                                                                <v-icon v-if="item.act == 'ACTIVO'" large class="mr-2" color="#BF120A"
                                                                    @click="desactivarVacacion(item)"
                                                                    title="ANULAR VACACION">
                                                                    mdi-cancel
                                                                </v-icon>
                                                                <v-icon large class="mr-2" color="#0A628F"
                                                                    @click="showEditVacacion(item)"
                                                                    title="EDITAR INFORMACION">
                                                                    mdi-pencil
                                                                </v-icon>
                                                            </template>
                                                        </v-data-table>
                                                    </v-col>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                    </v-tabs>
                </v-col>

            </v-row>
        </v-container>
        <!-- Snackbars -->
        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="#00FF00" outlined>
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

        <v-dialog v-model="contratoModal" persistent :overlay="false" max-width="1080px"> <!-- Modal Contratos-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nuevo Contrato</span>
                    <span v-if="botonAct == 1">Editar Contrato</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nuevo Contrato / Editar Contrato -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-file-input v-model="documentoArchivo" accept=".docx, .xlsx, .pptx, .pdf, .xml"
                                        label="Contrato archivo">
                                    </v-file-input>
                                    <v-select v-model="tipo" :items="datosTipo"
                                        label="Selecciona el tipo de contrato a registrar" prepend-icon="mdi-pick"
                                        required v-on:change="isDisabled = !isDisabled; fechaFinal = null">
                                    </v-select>
                                    <v-menu v-model="datePicker1" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="fechaInicio" label="Fecha de inicio del contrato"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="fechaInicio"
                                            @input="datePicker1 = false"></v-date-picker>
                                    </v-menu>
                                    <v-menu v-model="datePicker2" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="fechaFinal"
                                                label="Fecha de finalización del Contrato" :disabled="isDisabled"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="fechaFinal"
                                            @input="datePicker2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarContrato()" style="float: left"
                                        title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarContrato()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiarContrato()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAddContrato()"
                                        style="float: right" title="SALIR">
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
        <v-dialog v-model="observacionModal" persistent :overlay="false" max-width="1080px"> <!-- Modal Observacion-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nueva Observacion</span>
                    <span v-if="botonAct == 1">Editar Observacion</span>
                </v-card-title>
                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nueva Observacion / Editar Observacion -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="observacion" :counter="50" :rules="observacionRules"
                                        @input="observacion = observacion.toUpperCase()"
                                        label="Titulo de la Observacion" required>
                                    </v-text-field>
                                    <v-textarea v-model="comentario" :counter="250" :rules="comentarioRules" outlined
                                        @input="comentario = comentario.toUpperCase()" label="Descripción o comentario"
                                        required>
                                    </v-textarea>
                                    <v-menu v-model="datePicker3" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="fecha" label="Fecha del evento ocurrido"
                                                :rules="fechaRules" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="fecha" @input="datePicker3 = false"></v-date-picker>
                                    </v-menu>

                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarObservacion()" style="float: left"
                                        title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarObservacion()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiarObservacion()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAddObservacion()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <div class="text-center">
                                <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense
                                    color="#00FF00" outlined>
                                    <strong>{{ mensajeSnackbar }}</strong>


                                    <template v-slot:action="{ attrs }">
                                        <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                            mdi-close
                                        </v-icon>
                                    </template>
                                </v-snackbar>
                            </div>

                            <div class="text-center">

                                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense
                                    color="#EE680B" outlined>
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

                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="vacacionModal" persistent :overlay="false" max-width="1080px"> <!-- Modal Vacacion-->
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span v-if="botonAct == 0">Nueva Vacacion</span>
                    <span v-if="botonAct == 1">Editar Vacacion</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation> <!-- Nueva Vacacion / Editar Vacacion -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-menu v-model="datePicker4" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="diaInicio" label="Fecha Inicio" :rules="fechaRules"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="diaInicio" @input="datePicker4 = false"></v-date-picker>
                                    </v-menu>
                                    <v-menu v-model="datePicker5" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="diaFinal" label="Fecha Final" :rules="fechaRules"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="diaFinal" @input="datePicker5 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconv v-if="botonAct == 1" class="mx-4" dark color="#0A62BF"
                                        @click="actualizarVacacion()" style="float: left"
                                        title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonAct == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarVacacion()" style="float: left" title="REGISTRAR ITEM">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiarVacacion()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeAddVacacion()"
                                        style="float: right" title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <div class="text-center">
                                <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense
                                    color="#00FF00" outlined>
                                    <strong>{{ mensajeSnackbar }}</strong>
                                    <template v-slot:action="{ attrs }">
                                        <v-icon right v-bind="attrs" @click="snackbarOK = false">
                                            mdi-close
                                        </v-icon>
                                    </template>
                                </v-snackbar>
                            </div>

                            <div class="text-center">
                                <v-snackbar v-model="snackbarError" :timeout="timeout" top right shaped dense
                                    color="#EE680B" outlined>
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

                </v-card-text>
            </v-card>
        </v-dialog>

    </v-card>
</template>
<script>
import axios from "axios";

export default {
    data: () => ({
        idEmpleado: "",
        valid: true,
        flag: 1,

        idContrato: '',
        documentoArchivo: 'documentoArchivo',
        tipo: 'PERMANENTE',
        datosTipo: ["PERMANENTE", "TEMPORAL"],
        fechaInicio: "",//(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fechaFinal: null,//(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        isDisabled: true,
        datePicker1: false,
        datePicker2: false,

        idObservacion: '',
        observacion: '',
        comentario: '',
        fecha: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        datePicker3: false,

        idVacacion: '',
        diaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        diaFinal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        datePicker4: false,
        datePicker5: false,

        snackbarOK: false,
        mensajeSnackbar: "",
        snackbarError: false,
        mensajeSnackbarError: "REGISTRO FALLIDO",
        timeout: 2000,

        searchContrato: "",
        searchObservacion: "",
        searchVacacion: "",

        contratoModal: false,
        observacionModal: false,
        vacacionModal: false,
        botonAct: 0,
        datosContrato: [],
        datosObservacion: [],
        datosVacacion: [],

        headersContrato: [
            { text: "CONTRATO", value: "idcontr" },
            { text: "TIPO", value: "tip" },
            { text: "FECHA INICIO", value: "fecini" },
            { text: "FECHA FINAL", value: "fecfin" },
            { text: "ESTADO", value: "act" },
            //{ text: "FECHA CREACION", value: "credte" },
            //{ text: "ULTIMA ACTUALIZACIÓN", value: "upddte" },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],

        headersObservacion: [
            { text: "OBSERVACION", value: "obs" },
            { text: "COMENTARIO", value: "com" },
            { text: "FECHA", value: "fec" },
            { text: "ESTADO", value: "act" },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],
        headersVacacion: [
            { text: "AÑO", value: "anio" },
            { text: "DIA INICIO", value: "fecini" },
            { text: "DIA FINAL", value: "fecfin" },
            { text: "DIAS TOTALES", value: "cont" },
            { text: "ESTADO", value: "act" },
            { text: "OPCIONES", value: "actions", sortable: false },
        ],
        observacionRules: [
            (v) => !!v || "TITULO ES REQUERIDO",
            (v) =>
                (v && v.length <= 50) ||
                "EL TITULO DE LA OBSERVACION DEBE TENER 50 CARACTERES COMO MAXIMO",
        ],
        comentarioRules: [
            (v) =>
                (v && v.length <= 200) ||
                "LA DESCRIPCION DEBE TENER 200 CARACTERES COMO MAXIMO",
        ],
        fechaRules: [
            (v) => !!v || "FECHA ES REQUERIDA",
        ],
    }),

    created: function () {
        this.idEmpleado = this.$route.params.idempl;
        //this.user = JSON.parse(sessionStorage.getItem("session"));
        this.listarContratos();
        this.listarObservaciones();
        this.listarVacaciones();
    },

    methods: {
        formatearFecha(fecha) {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return fecha.toLocaleDateString('es-ES', options);
        },
        showAddContrato() {
            this.botonAct = 0;
            this.contratoModal = true;
            
            if (this.documentoArchivo != '') {
                this.inputState = false;
            }
            else {
                this.inputState = true;
            }
            
        },
        showEditContrato(item) {
            this.botonAct = 1;
            this.llenarCamposContrato(item);
            this.contratoModal = true;
        },

        showAddObservacion() {
            this.botonAct = 0;
            this.observacionModal = true;
        },
        showEditObservacion(item) {
            this.botonAct = 1;
            this.llenarCamposObservacion(item);
            this.observacionModal = true;
        },

        async listarContratos() {
            let me = this;
            await axios
                .get("/contrato/listarcontratos/" + this.$route.params.idempl)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosContrato = [];
                    } else {
                        me.datosContrato = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarContrato() {
            //alert(this.documentoArchivo.name);
            this.almacenarArchivo(this.documentoArchivo);
            this.registrarContratos(this.documentoArchivo);
            this.contratoModal = true;
        },
        async almacenarArchivo(documentoArchivo) {
            const formData = new FormData();
            formData.append('file', documentoArchivo);
            let me = this;
            await axios
                .post(
                    "/uploadFile/", formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    //me.limpiar();
                    //me.listarDocumentos();
                    //me.listarArchivos();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "REGISTRO DE ARCHIVO FALLIDO",
                        me.snackbarError = true;
                });
        },

        async registrarContratos(documentoArchivo) {
            let me = this;
            const ext = documentoArchivo.name.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            if(this.fechaFinal == '' || this.fechaFinal == null) {this.fechaFinal = 'null';}
            await axios
                .post(
                    "/contrato/addcontrato/" +
                    nombreArchivo +
                    "," +
                    this.fechaInicio +
                    "," +
                    this.fechaFinal +
                    "," +
                    this.idEmpleado
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarContratos(me.idEmpleado);
                    me.limpiarContrato();
                    me.closeAddContrato();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "REGISTRO FALLIDO",
                        me.snackbarError = true;

                });
        },
        async actualizarContrato() {
            let me = this;
            await axios
                .post(
                    "/contrato/editarcontrato/" +
                    this.idContrato +
                    "," +
                    this.documentoArchivo +
                    "," +
                    this.fechaInicio +
                    "," +
                    this.fechaFinal
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarContratos(me.idEmpleado);
                    me.limpiarContrato();
                    me.closeAddContrato();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "ACTUALIZACION FALLIDA",
                        me.snackbarError = true;
                });
        },
        desactivarContrato(item) {
            this.idContrato = item.idcontr;
            this.desactivarcontrato(this.idContrato);
        },
        async desactivarcontrato(idContrato) {
            let me = this;
            await axios
                .post("/contrato/offcontrato/" + this.idContrato).then(function (response) {
                    me.listarContratos();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        activarContrato(item) {
            this.idContrato = item.idcontr;
            this.activarcontrato(this.idContrato);
        },
        async activarcontrato(idContrato) {
            let me = this;
            await axios
                .post("/contrato/oncontrato/" + this.idContrato).then(function (response) {
                    me.listarContratos();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "YA HAY UN CONTRATO ACTIVO",
                        me.snackbarError = true;
                    console.log(error);
                })

        },
        async listarObservaciones(idEmpleado) {
            let me = this;
            await axios
                .get("/observacion/listarobservaciones/" + this.$route.params.idempl)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosObservacion = [];
                    } else {
                        me.datosObservacion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarObservacion() {
            //this.observacionModal = false;
            this.registrarObservaciones()
        },
        async registrarObservaciones() {
            let me = this;
            await axios
                .post(
                    "/observacion/addobservacion/" +
                    this.observacion +
                    "," +
                    this.comentario +
                    "," +
                    this.fecha +
                    "," +
                    this.idEmpleado

                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarObservaciones(me.idEmpleado);
                    me.limpiarObservacion();
                    me.observacionModal = false;
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "REGISTRO DE OBSERVACION FALLIDO",
                        me.snackbarError = true;
                });
        },
        actualizarObservacion() {
            this.actualizarObservaciones()
        },
        async actualizarObservaciones() {
            let me = this;
            await axios
                .post(
                    "/observacion/editarobservacion/" +
                    this.idObservacion +
                    "," +
                    this.observacion +
                    "," +
                    this.comentario +
                    "," +
                    this.fecha
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarObservaciones(me.idEmpleado);
                    me.limpiarObservacion();
                    me.closeAddObservacion();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "ACTUALIZACION FALLIDA",
                        me.snackbarError = true;
                });
        },
        desactivarObservacion(item) {
            this.idObservacion = item.idobs;
            this.desactivarobservacion(this.idObservacion);
        },
        async desactivarobservacion(idObservacion) {
            let me = this;
            await axios
                .post("/observacion/offobservacion/" + this.idObservacion).then(function (response) {
                    me.listarObservaciones();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        activarObservacion(item) {
            this.idObservacion = item.idobs;
            this.activarobservacion(this.idObservacion);
        },
        async activarobservacion(idObservacion) {
            let me = this;
            await axios
                .post("/observacion/onobservacion/" + this.idObservacion).then(function (response) {
                    me.listarObservaciones();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async listarVacaciones(idEmpleado) {
            let me = this;
            await axios
                .get("/vacacion/listarvacaciones/" + this.$route.params.idempl)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosVacacion = [];
                    } else {
                        me.datosVacacion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        registrarVacacion() {
            //this.observacionModal = false;
            this.registrarVacaciones()
        },
        async registrarVacaciones() {
            let me = this;
            await axios
                .post(
                    "/vacacion/addvacacion/" +
                    this.diaInicio +
                    "," +
                    this.diaFinal +
                    "," +
                    this.idEmpleado
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarVacaciones(me.idEmpleado);
                    me.limpiarVacacion();
                    me.closeAddVacacion();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "REGISTRO DE VACACIÓN FALLIDO",
                        me.snackbarError = true;
                });
        },
        actualizarVacacion() {
            this.actualizarVacaciones()
        },
        async actualizarVacaciones() {
            let me = this;
            await axios
                .post(
                    "/vacacion/editarvacacion/" +
                    this.idVacacion +
                    "," +
                    this.diaInicio +
                    "," +
                    this.diaFinal
                )
                .then(function (response) {
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarVacaciones(me.idEmpleado);
                    me.limpiarVacacion();
                    me.closeAddVacacion();
                })
                .catch(function (error) {
                    me.mensajeSnackbarError = "ACTUALIZACION FALLIDA",
                        me.snackbarError = true;
                });
        },
        desactivarVacacion(item) {
            this.idVacacion = item.idvaca;
            this.desactivarvacacion(this.idVacacion);
        },
        async desactivarvacacion(idVacacion) {
            let me = this;
            await axios
                .post("/vacacion/offvacacion/" + this.idVacacion).then(function (response) {
                    me.listarVacaciones();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        activarVacacion(item) {
            this.idVacacion = item.idvaca;
            this.activarvacacion(this.idVacacion);
        },
        async activarvacacion(idVacacion) {
            let me = this;
            await axios
                .post("/vacacion/onvacacion/" + this.idVacacion).then(function (response) {
                    me.listarVacaciones();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },

        showAddVacacion() {
            this.botonAct = 0;
            this.vacacionModal = true;
        },
        showEditVacacion(item) {
            this.botonAct = 1;
            this.llenarCamposVacacion(item);
            this.vacacionModal = true;
        },
        closeAddContrato() {
            this.contratoModal = false;
        },
        closeAddObservacion() {
            this.observacionModal = false;
        },
        closeAddVacacion() {
            this.vacacionModal = false;
        },
        llenarCamposContrato(item) {
            this.idContrato = item.idcontr;
            this.documentoArchivo = 'documentoArchivo';
            if (item.fecini) {// && !isNaN(new Date(item.fecini))) {
                this.fechaInicio = new Date(item.fecini).toISOString().split('T')[0];
            }
            if (item.fecfin) {
                this.fechaFinal = new Date(item.fecfin).toISOString().split('T')[0];
            } else { this.fechaFinal = null; }

            if (item.fecfin == null) { this.tipo == 'TEMPORAL'; console.log("CAMBIADO A TEMPORAL"); } else { this.tipo == 'PERMANENTE'; console.log("CAMBIADO A PERMANENTE"); }
            console.log("fecfin: " + item.fecfin);
        },
        llenarCamposObservacion(item) {
            this.idObservacion = item.idobs;
            this.observacion = item.obs;
            this.comentario = item.com;
            this.fecha = new Date(item.fec).toISOString().split('T')[0];
        },
        llenarCamposVacacion(item) {
            this.idVacacion = item.idvaca;
            this.diaInicio = new Date(item.fecini).toISOString().split('T')[0];
            this.diaFinal = new Date(item.fecfin).toISOString().split('T')[0];
        },
        limpiarContrato() {
            this.idContrato = "";
            //this.documentoArchivo = "";
            this.fechaInicio = null;
            this.fechaFinal = null;

        },
        limpiarObservacion() {
            this.idObservacion = "";
            this.observacion = "";
            this.comentario = "";
            this.fecha = "";
        },
        limpiarVacacion() {
            this.idVacacion = "";
            this.diaInicio = "";
            this.diaFinal = "";
        },
        getColor(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
    }
};
</script>