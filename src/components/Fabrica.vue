<template>
    <v-card elevation="5" outlined shaped>
        <v-dialog v-model="agregarFabricaModal" max-width="900px" lazy-validation>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>AGREGAR FÁBRICA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>



                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeAgregarFabrica()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="editarFabricaModal" persistent max-width="900px" lazy-validation>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>EDITAR FÁBRICA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreFabrica" label="NOMBRE FÁBRICA" :counter="100"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="codigoFabrica" label="CÓDIGO FÁBRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showPaises()"
                                        style="float: right" title="BUSCAR PAÍSES">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="pais" label="NOMBRE PAÍS" :counter="50" :rules="nombrePaisRules"
                                        @input="pais = pais.toUpperCase()" disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showCiudades()"
                                        style="float: right" title="BUSCAR CIUDAD">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="ciudad" label="NOMBRE CIUDAD" :counter="50"
                                        :rules="nombreCiudadRules" @input="nombreCiudad = nombreCiudad.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" @click="showUnidades()"
                                        style="float: right" title="BUSCAR UNIDAD">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="unidad" label="NOMBRE UNIDAD" :counter="50"
                                        :rules="unidadRules" @input="nombreUnidad = nombreUnidad.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="5"></v-col>

                                <v-col cols="12" md="12">
                                    <v-text-field v-model="direccionFabrica" label="DIRECCIÓN FÁBRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="8"> </v-col>
                                <v-col cols="12" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES
                                            </h6>
                                        </v-toolbar-title>
                                        <v-btn icon large v-if="botonact == 1" color="#0A62BF" @click="editarFabricas()"
                                            class="mx-2" fab dark x-small style="float: left"
                                            title="ACTUALIZAR FÁBRICA">
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                        <v-btn icon large v-if="botonact == 0" color="#0ABF55" @click="registroFabrica()"
                                            class="mx-2" fab dark x-small style="float: left" title="REGISTRAR FÁBRICA">
                                            <v-icon dark> mdi-content-save-plus-outline </v-icon>
                                        </v-btn>
                                        <v-btn icon large @click="limpiar()" color="#BF120A" style="float: left" class="mx-2" fab
                                            dark x-small title="LIMPIAR FORMULARIO">
                                            <v-icon dark> mdi-eraser </v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>


                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeEditFabricaModal()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="infoFabricaModal" persistent max-width="900px" lazy-validation>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>INFORMACIÓN DE LA FÁBRICA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="nombreFabrica" disabled label="NOMBRE FÁBRICA" :counter="100"
                                        :rules="nombreFabricaRules" @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1"></v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="codigoFabrica" disabled label="CÓDIGO FÁBRICA" :counter="100"
                                        :rules="codigoFabricaRules" @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                   
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="ciudad" label="NOMBRE CIUDAD" :counter="50"
                                        :rules="nombreCiudadRules" @input="ciudad = ciudad.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="pais" label="NOMBRE PAÍS" :counter="50"
                                        @input="pais = pais.toUpperCase()" disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                   
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field v-model="unidad" label="NOMBRE UNIDAD" :counter="50"
                                        :rules="unidadRules" @input="nombreUnidad = nombreUnidad.toUpperCase()" disabled
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="5"></v-col>

                                <v-col cols="12" md="1">
                                    
                                </v-col>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="direccionFabrica" disabled label="DIRECCIÓN FÁBRICA" :counter="100"
                                        :rules="direccionRules"
                                        @input="direccionFabrica = direccionFabrica.toUpperCase()"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeInfoFabricaModal()" style="float: right"
                                        title="SALIR">
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

        <v-dialog v-model="paisesModal" max-width="900px" lazy-validation persistent>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>PAÍSES</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>PAÍSES</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-col cols="12">
                                        <v-card-title>
                                            <v-text-field v-model="buscarPaises" append-icon="mdi-magnify"
                                                label="BUSCAR PAÍSES" single-line hide-details></v-text-field>
                                        </v-card-title>
                                    </v-col>
                                    <v-data-table :headers="headersPais" :items="datosPais" :search="buscarPaises"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon large class="mr-2" @click="seleccionarPais(item)" color="#0091EA"
                                                title="SELECCIONAR PAÍS">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">

                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closePaises()"
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

        <v-dialog v-model="ciudadesModal" max-width="900px" lazy-validation persistent>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>CIUDADES</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>CIUDADES</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-col cols="12">
                                        <v-card-title>
                                            <v-text-field v-model="buscarPaises" append-icon="mdi-magnify"
                                                label="BUSCAR CIUDADES" single-line hide-details></v-text-field>
                                        </v-card-title>
                                    </v-col>
                                    <v-data-table :headers="headersCiudad" :items="datosCiudad" :search="buscarPaises"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon large class="mr-2" @click="seleccionarCiudad(item)" color="#0091EA"
                                                title="SELECCIONAR CIUDAD">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonAct == 1" color="#0A62BF"
                                                @click="actualizarEmpleado()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                @click="registrarEmpleado()" style="float: left"
                                                title="REGISTRAR EMPLEADO" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon color="#BF120A" @click="limpiar()" style="float: left" large
                                                class="mx-2" title="LIMPIAR FORMULARIO">
                                                <v-icon dark> mdi-eraser </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeCiudades()"
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
        <v-dialog v-model="unidadesModal" max-width="900px" lazy-validation persistent>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>UNIDADES</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>UNIDADES</h5>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-col cols="12">
                                        <v-card-title>
                                            <v-text-field v-model="buscarUnidades" append-icon="mdi-magnify"
                                                label="BUSCAR UNIDADES" single-line hide-details></v-text-field>
                                        </v-card-title>
                                    </v-col>
                                    <v-data-table :headers="headersUnidad" :items="datosUnidad" :search="buscarUnidades"
                                        :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.actions`]="{ item }">
                                            <v-icon large class="mr-2" @click="seleccionarUnidad(item)" color="#0091EA"
                                                title="SELECCIONAR UNIDAD">
                                                mdi-check-circle
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped>
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonAct == 1" color="#0A62BF"
                                                @click="actualizarEmpleado()" style="float: left"
                                                title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonAct == 0" color="#0ABF55"
                                                @click="registrarEmpleado()" style="float: left"
                                                title="REGISTRAR EMPLEADO" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon color="#BF120A" @click="limpiar()" style="float: left" large
                                                class="mx-2" title="LIMPIAR FORMULARIO">
                                                <v-icon dark> mdi-eraser </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeUnidades()"
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

        <v-dialog v-model="fabricasInhabilitadosModal" max-width="800px" lazy-validation>
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>FÁBRICAS INACTIVAS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>

                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeInfoLineaModal()" style="float: right"
                                        title="SALIR">
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


        <div>
            <v-alert dense color="cyan" style="color: #ffffff">
                <h5>FÁBRICA</h5>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-tabs horizontal color="#002245" center-active grow>
                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    ADD
                                    FAB.
                                </v-tab>

                                <v-tab>
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    FAB.
                                </v-tab>

                                <v-tab @click="listarFabricaInh">
                                    <v-icon left>
                                        mdi-list-box
                                    </v-icon>
                                    LIST
                                    FAB
                                    INAC.
                                </v-tab>

                                <v-tab-item v-if="flag == 1">
                                    <v-card elevation="5" outlined shaped>
                                        <v-card-title>
                                            <span>AGREGAR FÁBRICA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" md="1"></v-col>
                                                        <v-col cols="12" md="5">
                                                            <v-text-field v-model="nombreFabrica" label="NOMBRE FÁBRICA"
                                                                :counter="100" :rules="nombreFabricaRules"
                                                                @input="nombreFabrica = nombreFabrica.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="1"></v-col>
                                                        <v-col cols="12" md="5">
                                                            <v-text-field v-model="codigoFabrica" label="CÓDIGO FÁBRICA"
                                                                :counter="100" :rules="codigoFabricaRules"
                                                                @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                @click="showPaises()" style="float: right"
                                                                title="BUSCAR PAÍSES">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="5">
                                                            <v-text-field v-model="pais" label="NOMBRE PAÍS"
                                                                :counter="50" :rules="nombrePaisRules"
                                                                @input="nombrePais = nombrePais.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                @click="showCiudades()" style="float: right"
                                                                title="BUSCAR CIUDAD">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="5">
                                                            <v-text-field v-model="ciudad" label="NOMBRE CIUDAD"
                                                                :counter="50" :rules="nombreCiudadRules"
                                                                @input="nombreCiudad = nombreCiudad.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="1">
                                                            <v-btn class="mx-2" fab dark x-small color="cyan"
                                                                @click="showUnidades()" style="float: right"
                                                                title="BUSCAR UNIDAD">
                                                                <v-icon dark> mdi-magnify </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col cols="12" md="5">
                                                            <v-text-field v-model="unidad" label="NOMBRE UNIDAD"
                                                                :counter="50" :rules="unidadRules"
                                                                @input="nombreUnidad = nombreUnidad.toUpperCase()"
                                                                disabled required></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="5"></v-col>

                                                        <v-col cols="12" md="12">
                                                            <v-text-field v-model="direccionFabrica"
                                                                label="DIRECCIÓN FÁBRICA" :counter="100"
                                                                :rules="codigoFabricaRules"
                                                                @input="codigoFabrica = codigoFabrica.toUpperCase()"
                                                                required></v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" md="8"> </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-toolbar dense shaped>
                                                                <v-toolbar-title>
                                                                    <h6>
                                                                        OPCIONES
                                                                    </h6>
                                                                </v-toolbar-title>
                                                                <v-btn icon v-if="botonact == 1" color="#0A62BF"
                                                                    @click="editarFabricas()" class="mx-2" fab dark
                                                                    style="float: left" title="ACTUALIZAR FÁBRICA">
                                                                    <v-icon dark> mdi-pencil </v-icon>
                                                                </v-btn>
                                                                <v-btn icon v-if="botonact == 0" color="#0ABF55"
                                                                    @click="registroFabrica()" class="mx-2" fab dark
                                                                    style="float: left" title="REGISTRAR FÁBRICA">
                                                                    <v-icon dark> mdi-content-save-plus-outline
                                                                    </v-icon>
                                                                </v-btn>
                                                                <v-btn icon @click="limpiar()" color="#BF120A"
                                                                    style="float: left" class="mx-2" fab dark x-small
                                                                    title="LIMPIAR FORMULARIO">
                                                                    <v-icon dark> mdi-eraser </v-icon>
                                                                </v-btn>
                                                            </v-toolbar>
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
                                            <span>LISTA DE FÁBRICAS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>Fabricas</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarFabricas"
                                                                    append-icon="mdi-magnify" label="BUSCAR FÁBRICA"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>


                                                            <v-data-table :headers="headersFabricas"
                                                                :items="datosFabricas" :search="buscarFabricas"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        class="mx-2" large @click="activar(item)"
                                                                        title="ACTIVAR Fabrica">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        class="mx-2" large @click="desactivar(item)"
                                                                        title="DESACTIVAR Fabrica">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon class="mx-2" large color="#0A62BF"
                                                                        @click="showEditFabricaModal(item)"
                                                                        title="ACTUALIZAR INFORMACIÓN">
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                    <!--
                                                                    <v-icon class="mx-2" large color="#001781"
                                                                        @click="showInfoFabrica(item)"
                                                                        title="VER INFORMACION">
                                                                        mdi-eye
                                                                    </v-icon>
                                                                    -->
                                                                </template>

                                                            </v-data-table>
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
                                            <span>LISTA DE FÁBRICAS INHABILITADAS</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-list-item>
                                                                <v-list-item-title class="text-center">
                                                                    <h5>FÁBRICA</h5>
                                                                </v-list-item-title>
                                                            </v-list-item>

                                                            <v-card-title>
                                                                <v-text-field v-model="buscarFabricas"
                                                                    append-icon="mdi-magnify" label="BUSCAR FÁBRICA"
                                                                    single-line hide-details></v-text-field>
                                                            </v-card-title>
                                                            <v-data-table :headers="headersFabricasInh"
                                                                :items="datosFabricasInh" :search="buscarFabricas"
                                                                :items-per-page="5" class="elevation-1" id="tableId">

                                                                <template #[`item.est`]="{ item }">
                                                                    <v-chip :color="colorEstado(item.est)" dark>
                                                                        {{ item.est }}
                                                                    </v-chip>
                                                                </template>


                                                                <template #[`item.actions`]="{ item }">
                                                                    <v-icon v-if="item.est == 'INACTIVO'" color="green"
                                                                        large class="mr-2" @click="activar(item)"
                                                                        title="ACTIVAR FÁBRICA">
                                                                        mdi-check-circle-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="item.est == 'ACTIVO'" color="red"
                                                                        large class="mr-2" @click="desactivar(item)"
                                                                        title="DESACTIVAR FÁBRICA">
                                                                        mdi-cancel
                                                                    </v-icon>
                                                                    <v-icon large class="mr-2" color="#0A62BF"
                                                                        @click="showInfoFabrica(item)"
                                                                        title="VER INFORMACIÓN">
                                                                        mdi-eye
                                                                    </v-icon>
                                                                </template>

                                                            </v-data-table>
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
            </v-form>
        </div>

        <div class="text-center">
            <v-snackbar v-model="snackbarOK" :timeout="timeout" top right shaped dense color="light-green darken-2 ">
                {{ mensajeSnackbar }}

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
                    <v-icon right v-bind="attrs" @click="snackbarWarning = false">
                        mdi-close
                    </v-icon>
                </template>
            </v-snackbar>
        </div>

    </v-card>
</template>
<script>
import axios from "axios";
import { async } from "regenerator-runtime";

export default {
    data() {
        return {
            valid: true,
            flag: 1,
            //#region Fabrica 
            idFabrica: "",
            nombreFabrica: "",
            codigoFabrica: "",
            direccionFabrica: "",
            latitud: "",
            longitud: "",
            idPais: "",
            pais: "",
            idCiudad: "",
            ciudad: "",
            idUnidad: "",
            unidad: "",
            valid: "",

            buscarFabricas: "",
            buscarPaises: "",
            buscarCiudades: "",
            buscarUnidades: "",
            botonAct: "",
            datosFabricas: [],
            headersFabricas: [
                { text: "NOMBRE FÁBRICA", value: "nomfab", sortable: false },
                { text: "CÓDIGO FÁBRICA", value: "codfab", sortable: false },
                { text: "CIUDAD", value: "nomciu", sortable: false },
                { text: "PAÍS", value: "nompai", sortable: false },
                { text: "UNIDAD", value: "nomuni", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosFabricasInh: [],
            headersFabricasInh: [
                { text: "NOMBRE FÁBRICA", value: "nomfab", sortable: false },
                { text: "CÓDIGO FÁBRICA", value: "codfab", sortable: false },
                { text: "CIUDAD", value: "nomciu", sortable: false },
                { text: "PAÍS", value: "nompai", sortable: false },
                { text: "UNIDAD", value: "nomuni", sortable: false },
                { text: "ESTADO", value: "est", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosPais: [],
            headersPais: [
                { text: "NOMBRE", value: "nompais", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosCiudad: [],
            headersCiudad: [
                { text: "NOMBRE", value: "nomciu", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            datosUnidad: [],
            headersUnidad: [
                { text: "NOMBRE", value: "unid", sortable: false },
                { text: "OPCIONES", value: "actions", sortable: false },
            ],
            nombreFabricaRules: [
                (v) => !!v || "NOMBRE DE LA FÁBRICA ES REQUERIDO",
                (v) =>
                    (v && v.length <= 50) ||
                    "EL NOMBRE DE LA FÁBRICA DEBE TENER 100 CARACTERES COMO MAXIMO",
            ],
            codigoFabricaRules: [
                (v) => !!v || "CÓDIGO DE LA FÁBRICA ES REQUERIDO",
                (v) =>
                    (v && v.length <= 50) ||
                    "EL CÓDIGO DE LA FÁBRICA DEBE TENER 25 CARACTERES COMO MAXIMO",
            ],
            nombreCiudadRules: [
                (v) => !!v || "CÓDIGO DE LA FÁBRICA ES REQUERIDO",
            ],
            nombrePaisRules: [
                (v) => !!v || "PAIS ES REQUERIDO",
            ],
            unidadRules: [
                (v) => !!v || "ASIGNAR UNIDAD DE LA FÁBRICA ES REQUERIDO",
            ],
            direccionRules: [
                (v) => !!v || "DIRECCIÓN DE LA FÁBRICA ES REQUERIDO",
                (v) =>
                    (v && v.length <= 50) ||
                    "LA DIRECCIÓN DE LA FÁBRICA DEBE TENER 250 CARACTERES COMO MAXIMO",
            ],

            //#endregion

            //#region Modals
            agregarFabricaModal: 0,
            editarFabricaModal: 0,
            infoFabricaModal: 0,
            fabricasInhabilitadosModal: 0,
            ciudadesModal: 0,
            paisesModal: 0,
            unidadesModal: 0,
            //#endregion
            botonact: 0,
            //#region Snackbars
            snackbarOK: false,
            mensajeSnackbar: "",
            snackbarError: false,
            mensajeSnackbarError: "REGISTRO FALLIDO",
            timeout: 2000,
            //#endregion
            //#endregion
            mapa: null,

        }
    },
    created: function () {
        this.listarFabricas();
        this.listarFabricasInh();
    },
    methods: {
        //#region Mapa
        showMapa() {
            this.mapaModal = true
        },
        //#endregion
        colorEstado(est) {
            if (est == 'ACTIVO') return 'green'
            else return 'red'
        },
        //#region Listados
        listarFabrica() {
            this.listarFabricas();
        },
        async listarFabricas() {
            let me = this;
            await axios
                .get("/fabrica/listarfabricas")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFabricas = [];

                    } else {
                        me.datosFabricas = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarFabricaInh() {
            this.listarFabricasInh()
        },
        async listarFabricasInh() {
            let me = this;
            await axios
                .get("/fabrica/listarfabricasinh")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosFabricasInh = [];

                    } else {
                        me.datosFabricasInh = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarPais() {
            this.listarPaises();
        },
        async listarPaises() {
            let me = this;
            await axios
                .get("/pais/listarpaises")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosPais = [];

                    } else {
                        me.datosPais = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        listarCiudad() {
            this.listarCiudades();
        },
        async listarCiudades() {
            let me = this;
            await axios
                .get("/ciudad/listarciudades/" + this.idPais)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosCiudad = [];

                    } else {
                        me.datosCiudad = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        listarUnidad() {
            this.listarUnidades();
        },
        async listarUnidades() {
            let me = this;
            await axios
                .get("/unidad/listarunidades")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosUnidad = [];

                    } else {
                        me.datosUnidad = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //#endregion
        //#region Agregar
        registrarFabrica() {
            this.registroFabrica(this.nombreFabrica, this.codigoFabrica, this.direccionFabrica, this.idPais, this.idCiudad);
        },
        async registroFabrica(
            nombreFabrica,
            codigoFabrica,
            direccionFabrica,
            idPais,
            idCiudad
        ) {
            let me = this;
            await axios
                .post(
                    "/fabrica/addfabrica/" +
                    this.nombreFabrica +
                    "," +
                    this.codigoFabrica +
                    "," +
                    this.direccionFabrica +
                    "," +
                    this.idPais +
                    "," +
                    this.idCiudad +
                    "," +
                    this.idUnidad
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarFabricas();
                    me.agregarFabricaModal = false;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });

        },
        //#endregion
        //#region Edicion
        editarFabricas() {
            this.editarFabrica(this.idFabrica, this.nombreFabrica, this.codigoFabrica, this.direccionFabrica, this.idPais, this.idCiudad);
        },
        async editarFabrica(
            idFabrica,
            nombreFabrica,
            codigoFabrica,
            direccionFabrica,
            idPais,
            idCiudad
        ) {
            let me = this;
            await axios
                .post(
                    "/fabrica/updfabrica/" +
                    this.idFabrica +
                    "," +
                    this.nombreFabrica +
                    "," +
                    this.codigoFabrica +
                    "," +
                    this.direccionFabrica +
                    "," +
                    this.idPais +
                    "," +
                    this.idCiudad +
                    "," +
                    this.idUnidad
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarFabricas();
                    me.closeEditFabricaModal();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                });


        },
        //#endregion
        //#region Cambio Estados
        activar(item) {
            this.idFabrica = item.idfab;
            this.activarFabrica(this.idFabrica);
        },
        async activarFabrica(idFabrica) {
            let me = this;
            await axios
                .post("/fabrica/onfabrica/" + this.idFabrica).then(function (response) {

                    me.listarFabricas();
                    me.listarFabricasInh();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        desactivar(item) {
            this.idFabrica = item.idfab;
            this.desactivarFabrica(this.idFabrica);
        },
        async desactivarFabrica(idFabrica) {
            let me = this;
            await axios
                .post("/fabrica/offfabrica/" + this.idFabrica).then(function (response) {

                    me.listarFabricas();

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //#endregion
        //#region Modals
        showCiudades() {
            this.ciudadesModal = true;
            this.listarCiudades();
        },
        closeCiudades() {
            this.ciudadesModal = false;
        },
        showPaises() {
            this.paisesModal = true;
            this.listarPaises();
        },
        closePaises() {
            this.paisesModal = false;
        },
        showUnidades() {
            this.unidadesModal = true;
            this.listarUnidades();
        },
        closeUnidades() {
            this.unidadesModal = false;
        },
        showAgregarFabrica() {
            this.agregarFabricaModal = true;
        },
        closeAgregarFabrica() {
            this.agregarFabricaModal = false;
        },
        showEditFabricaModal(item) {
            this.editarFabricaModal = true;
            this.botonact = 1;
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
            this.codigoFabrica = item.codfab;
            this.direccionFabrica = item.dirfab;
            this.idPais = item.idpai;
            this.pais = item.nompai;
            this.idCiudad = item.idciu;
            this.ciudad = item.nomciu;
            this.idUnidad = item.iduni;
            this.unidad = item.nomuni;
        },
        closeEditFabricaModal() {
            this.editarFabricaModal = false;
        },
        showFabricasInhabilitados() {
            this.fabricasInhabilitadosModal = true
            this.listarFabricasInh();
        },
        showInfoFabrica(item) {
            this.infoFabricaModal = true;
            this.idFabrica = item.idfab;
            this.nombreFabrica = item.nomfab;
            this.codigoFabrica = item.codfab;
            this.ciudad = item.nomciu;
            this.pais = item.nompai;
            this.unidad = item.nomuni;
            this.direccionFabrica = item.dirfab;
        },
        closeInfoFabricaModal() {
            this.infoFabricaModal = false;
        },
        //#endregion

        limpiar() {
            this.nombreFabrica = "";
            this.codigoFabrica = "";
            this.idFabrica = "";
            this.idLinea = "";
            this.nombreCiudad = "";
        },

        //#region Seleccion Datos
        seleccionarPais(item) {
            this.idPais = item.idpai;
            console.log("idPais: " + this.idPais + " idpai: " + item.idpai)
            this.pais = item.nompais;
            this.paisesModal = false;
        },
        seleccionarCiudad(item) {
            this.idCiudad = item.idciu;
            this.ciudad = item.nomciu;
            this.ciudadesModal = false;
        },
        seleccionarUnidad(item) {
            this.idUnidad = item.idunid;
            this.unidad = item.unid;
            this.unidadesModal = false;
        },
        //#endregion
    },
}
</script>