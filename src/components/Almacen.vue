<template>
    <v-card elevation="5" outlined>
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
        <v-alert v-if="existencias == false" type="error" color="red darken-2" dense prominent icon="mdi-alert">
            <div class="text-h6">
                SE REQUIERE LA COMPRA DE EXISTENCIAS EN EL INVENTARIO
            </div>
            POR FAVOR, NOTIFIQUE A ADQUISICIONES PARA ADQUIRIR EXISTENCIAS DE <strong>${nombreitem}</strong>
        </v-alert>
        <v-alert v-if="existencias == true" type="success" color="green darken-2" dismissible dense prominent>
            <div class="text-h5">
                SE TIENEN LAS EXISTENCIAS NECESARIAS EN EL INVENTARIO
            </div>

        </v-alert>
        <div>
            <v-alert dense style="color: #ffffff;" color="indigo">
                <h3>ALMACENES</h3>
            </v-alert>
        </div>
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarAlmacen()">NUEVO ALMACEN</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>ALMACEN</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                                <v-text-field v-model="searchAlmacen" append-icon="mdi-magnify" label="BUSCAR ALMACEN"
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
                                    <v-icon class="mr-2" color="primary" x-large @click="llenarCamposAlmacen(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2"
                                        @click="activar(item)" title="ACTIVAR ALMACEN">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2"
                                        @click="confirmacionAnulacionAlmacen(item)" title="DESACTIVAR ALMACEN">
                                        mdi-close-circle
                                    </v-icon>
                                </template>




                            </v-data-table>
                        </v-col>
                    </v-row>
                    <!--<v-row>
                        <v-col cols="12" md="4">
                            <v-btn color="success" @click="showModalAgregarSeccion()">NUEVO Seccion</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-list-item>
                                <v-list-item-title class="text-center">
                                    <h5>SECCIONES</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchSeccion" append-icon="mdi-magnify" label="BUSCAR SECCION"
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
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposSeccion(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR SECCIÓN">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionSeccion(item)"
                                        title="DESACTIVAR SECCIÓN">
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
                                    <h5>STANDS</h5>
                                </v-list-item-title>
                            </v-list-item>

                            <v-card-title>
                               <v-text-field v-model="searchStand" append-icon="mdi-magnify" label="BUSCAR STAND"
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
                                    <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposStand(item)"
                                        title="ACTUALIZAR INFORMACION">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                        title="ACTIVAR STAND">
                                        mdi-check-circle-outline
                                    </v-icon>
                                    <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionStand(item)"
                                        title="DESACTIVAR STAND">
                                        mdi-close-circle
                                    </v-icon>             
                                </template>

                              


                            </v-data-table>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <h3>VISUALIZACIÓN DE ALMACENAMIENTO</h3>
                        </v-col>
                        <v-col cols="12" md="12">
                               <v-text-field v-model="searchDetalleAlmacenamiento" append-icon="mdi-magnify" label="BUSCAR ALMACEN"
                                    single-line hide-details></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-data-table :headers="headerAlmacen" :items="datosAlmacen" :search="searchDetalleAlmacenamiento"
                                :items-per-page="5" class="elevation-2">
                                <template #[`item.codigo`]="{ item }">
                                    <v-chip dark>
                                        {{ obtenerCodigoAlmacen(item.nombrealmacen) }}
                                    </v-chip>
                                </template>
                                <template #[`item.actions`]="{ item }">
                                    <v-icon x-large color="primary" class="mr-2" @click="mostrarDetalleAlmacen(item)"
                                        title="VER ALMACENES">
                                        mdi-eye
                                </v-icon>        
                                </template>
                                
                            </v-data-table>
                        </v-col>
                        <v-col cols="12" md="12"></v-col>
                    </v-row>        
                -->

                </v-container>
            </v-form>

        </div>
        <v-dialog v-model="agregarAlmacenModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR ALMACEN</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACEN" :counter="60"
                                        :rules="nombreRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcionAlmacen" label="DESCRIPCION ALMACEN"
                                        :counter="100" :rules="descripcionRules"
                                        @input="descripcionAlmacen = descripcionAlmacen.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <!--<v-col cols="12" md="12">
                                    <v-file-input v-model="documentoArchivo"
                                        accept=".jpg, .jpeg, .webp, .png, .gif, .bmp, .docx, .xlsx, .pptx, .pdf, .csv, .xml"
                                        label="DOCUMENTO DE ALMACEN" required :disabled="storageState" @change="enableButton"
                                    ></v-file-input>
                                </v-col>-->

                                <v-col cols="12" sm="4" md="2">
                                    <v-btn iconvv v-if="botonActAl == 1" dark color="#0A62BF" @click="editarAlm()"
                                        style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonActAl == 0" dark color="#0ABF55" @click="registrarAlm()"
                                        style="float: left" title="REGISTRAR ALMACEN">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" sm="4" md="3">
                                    <v-btn iconv color="#BF120A" dark @click="limpiar()" style="float: left"
                                        title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" sm="4" md="6">
                                    <v-btn iconv dark color="#00A1B1" @click="closeModalAgregarAlma()"
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

        <v-dialog v-model="almacenModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ALMACENES ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarAlmacen" append-icon="mdi-magnify"
                                        label="BUSCAR ALMACEN" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerAlmacen" :items="datosAlmacenActivos"
                                    :search="buscarAlmacen" :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.codigo`]="{ item }">
                                        <v-chip dark>
                                            {{ obtenerCodigoAlmacen(item.nombrealmacen) }}
                                        </v-chip>
                                    </template>
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon class="mr-2" @click="seleccionarAlmacen(item)">
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

        <v-dialog v-model="agregarSeccionModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR SECCIÓN</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreSeccion" label="NOMBRE SECCIÓN" :counter="60"
                                        :rules="nombreRules" @input="nombreSeccion = nombreSeccion.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="almacenRules"
                                        @click="openAlmacenModal()" style="float: right" title="BUSCAR ALMACEN">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACEN" :counter="60"
                                        :rules="nombreRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12"> </v-col>

                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActSe == 1" class="mx-4" dark color="#0A62BF"
                                        @click="editarSec()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonActSe == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarSec()" style="float: left" title="REGISTRAR SECCIÓN">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeModalAgregarSec()"
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

        <v-dialog v-model="seccionModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE SECCIONES ACTIVAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="buscarSeccion" append-icon="mdi-magnify"
                                        label="BUSCAR SECCIÓN" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerSeccion" :items="datosSeccionesActivas"
                                    :search="buscarSeccion" :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarSeccion(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="v-btn--icon" width="30px" height="30px" color="#b794f6"
                                    @click="closeSeccionModal()" style="float: right" title="SALIR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="agregarStandModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>AGREGAR STAND</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreStand" label="NOMBRE STAND" :counter="60"
                                        :rules="nombreRules" @input="nombreStand = nombreStand.toUpperCase()"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="seccionRules"
                                        @click="openSeccionModal()" style="float: right" title="BUSCAR SECCIÓN">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreSeccion" label="NOMBRE SECCIÓN" :counter="60"
                                        :rules="nombreRules" @input="nombreSeccion = nombreSeccion.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12"> </v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="2">
                                    <v-btn iconvv v-if="botonActSt == 1" class="mx-4" dark color="#0A62BF"
                                        @click="editarStn()" style="float: left" title="ACTUALIZAR INFORMACIÓN">
                                        <v-icon dark> mdi-pencil </v-icon>
                                        ACTUALIZAR
                                    </v-btn>
                                    <v-btn iconv v-if="botonActSt == 0" class="mx-4" dark color="#0ABF55"
                                        @click="registrarStn()" style="float: left" title="REGISTRAR STAND">
                                        <v-icon dark> mdi-content-save </v-icon>
                                        GUARDAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn iconv color="#BF120A" class="mx-4" dark @click="limpiar()"
                                        style="float: left" title="LIMPIAR FORMULARIO">
                                        <v-icon dark> mdi-eraser </v-icon>
                                        LIMPIAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1" @click="closeModalAgregarSt()"
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

        <v-dialog v-model="confirmacionAnulacionAlm" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#BF120A" @click="anularAlmacen()"
                                    style="float: right" title="ANULAR ALMACEN">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    ANULAR
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#00A1B1" @click="closeAnulacionAlmacen()"
                                    style="float: right" title="SALIR">
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


        <v-dialog v-model="confirmacionAnulacionSec" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#BF120A" @click="anularSeccion()"
                                    style="float: right" title="ANULAR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    ANULAR
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#00A1B1" @click="closeAnulacionSeccion()"
                                    style="float: right" title="SALIR">
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



        <v-dialog v-model="confirmacionAnulacionSt" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>¿ESTAS SEGURO?</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#BF120A" @click="anularStand()"
                                    style="float: right" title="ANULAR">
                                    <v-icon dark> mdi-close-circle-outline </v-icon>
                                    ANULAR
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="mx-2" dark x-big color="#00A1B1" @click="closeAnulacionStand()"
                                    style="float: right" title="SALIR">
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


        <v-dialog v-model="detalleAlmacen" persistent :overlay="false" max-width="900px" transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    SECCIONES
                </v-card-title>
                <v-card-actions>
                    <v-text-field v-model="searchDetalleAlmacen" append-icon="mdi-magnify" label="BUSCAR SECCION"
                        single-line hide-details></v-text-field>
                </v-card-actions>
            </v-card>
            <v-card>

                <v-data-table :headers="headerSeccion" :items="datosDetalleAlmacen" :search="searchDetalleAlmacen"
                    :items-per-page="5" class="elevation-1">
                    <template #[`item.actions`]="{ item }">
                        <v-icon x-large color="primary" class="mr-2" @click="mostrarDetalleSeccion(item)"
                            title="VER SECCIONES">
                            mdi-eye
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" dark x-big @click="closeDetalleAlmacen()">
                        <v-icon dark> mdi-close-circle-outline </v-icon> SALIR
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="detalleSeccion" persistent :overlay="false" max-width="900px" transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    STANDS
                </v-card-title>
                <v-card-actions>
                    <v-text-field v-model="searchDetalleSeccion" append-icon="mdi-magnify" label="BUSCAR STAND"
                        single-line hide-details></v-text-field>
                </v-card-actions>
            </v-card>
            <v-data-table :headers="headerStand" :items="datosDetalleSeccion" :search="searchDetalleSeccion"
                :items-per-page="5" class="elevation-1">
                <template #[`item.actions`]="{ item }">
                    <v-icon x-large color="primary" class="mr-2" @click="mostrarDetalleStand(item)" title="VER STANDS">
                        mdi-eye
                    </v-icon>
                </template>
            </v-data-table>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" dark x-big @click="closeDetalleSeccion()">
                        <v-icon dark> mdi-arrow-left-bold-circle-outline </v-icon> ATRAS
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="detalleStand" persistent :overlay="false" min-width="1200px" max-width="1800px"
            transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    ITEMS
                </v-card-title>
                <v-card-actions>
                    <v-text-field v-model="searchDetalleStand" append-icon="mdi-magnify" label="BUSCAR ITEM" single-line
                        hide-details></v-text-field>
                </v-card-actions>
            </v-card>

            <v-data-table :headers="headerAlmacenamiento" :items="datosDetalleStand" :search="searchDetalleStand"
                :items-per-page="5" class="elevation-1">
            </v-data-table>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" dark x-big @click="closeDetalleStand()">
                        <v-icon dark> mdi-arrow-left-bold-circle-outline </v-icon> ATRAS
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>






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
            datosExistencia: [],

            documentoArchivo: '',

            //#region Almacenamiento
            idAlmacen: "",
            idSeccion: "",
            idStand: "",
            nombreAlmacen: "",
            descripcionAlmacen: "",
            nombreSeccion: "",
            nombreStand: "",
            estado: "ACTIVO",
            //fechaDeModificacion: "",
            valid: true,


            snackbarOK: false,
            snackbarError: false,

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
                    (v && v === null || v.length <= 10) ||
                    "El telephono secundario debe tener hasta 10 caracteres.",
            ],
            emailRules: [
                (v) => !!v || "Se requiere el correo electronico del proveedor",
                (v) => /.+@.+\..+/.test(v) || "Debe ser un correo electronico valido",
            ],
            datosAlmacen: [],
            headerAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "CODIGO ALMACEN", value: "codigo", sortable: true },
                { text: "NOMBRE DE ALMACEN", value: "nombrealmacen", sortable: true },
                { text: "DESCRIPCIÓN DE ALMACEN", value: "descripcion", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosSeccion: [],
            headerSeccion: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE SECCION", value: "nombreseccion", sortable: true },
                { text: "ALMACEN", value: "nombrealmacen", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            datosStand: [],
            headerStand: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE STAND", value: "nombrestand", sortable: true },
                { text: "SECCION", value: "nombreseccion", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            headerAlmacenamiento: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "ITEM", value: "nombreitem", sortable: true },
                { text: "DESCRIPCION", value: "descripcion", sortable: true },
                { text: "TIPO", value: "nombretipoitem", sortable: true },
                { text: "MEDIDA", value: "medida", sortable: true },
                { text: "CANTIDAD", value: "cantidad", sortable: true },
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

            searchAlmacen: "",
            buscarAlmacen: "",
            agregarAlmacenModal: false,
            confirmacionAnulacionAlm: false,

            searchSeccion: "",
            buscarSeccion: "",
            agregarSeccionModal: false,
            confirmacionAnulacionSec: false,

            searchStand: "",
            buscarStand: "",
            agregarStandModal: false,
            confirmacionAnulacionSt: false,


            datosAlmacenActivos: [],
            almacenModal: false,

            datosSeccionesActivas: [],
            seccionModal: false,


            botonActAl: 0,
            botonActSe: 0,
            botonActSt: 0,

            searchDetalleAlmacenamiento: '',
            datosDetalleAlmacen: [],
            detalleAlmacen: false,
            searchDetalleAlmacen: '',
            datosDetalleSeccion: [],
            detalleSeccion: false,
            searchDetalleSeccion: '',
            datosDetalleStand: [],
            detalleStand: false,
            searchDetalleStand: '',
            //#endregion
        }
    },
    created: function () {
        this.listarAlmacen();
        this.listarSeccion();
        this.listarStand();
        this.getAlertas();
    },
    methods: {

        obtenerCodigoAlmacen(nombreAlmacen) {
            let codigo = '';
            var arrayCode = [];
            for (let i = 0; i < nombreAlmacen.length; i++) {
                arrayCode.push(96 - nombreAlmacen.charCodeAt(i));
            }
            for (let j = 0; j < arrayCode.length; j++) {
                codigo += arrayCode[j].toString(16);
            }
            return codigo;
        },

        getAlertas() {
            var items = [];
            var stock = [];
            var limite = [];
            if (this.datosExistencia == []) {
                this.existencias = false;
            }
            else {
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
                    if (limite[i] >= stock[i]) {
                        console.log(limite[i])
                        console.log(stock[i])
                        alert(limite[i] + ' u ' + stock[i])
                        this.existencias = false;
                        this.itemsCriticos += items[i] + ' ';
                    }
                }
            }
        },

        async getListaExistencias() {
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
        //#region Listar
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

        async listarAlmacenesActivos() {
            let me = this;
            await axios
                .get("/almacen/listaralmacenesactivos/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosAlmacenActivos = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosAlmacenActivos = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        registrarAlm() {
            this.registrarAlmacen(this.nombreAlmacen, this.descripcionAlmacen, this.estado);
            //this.almacenarArchivo(this.documentoArchivo)
            //this.guardarDocumento(this.documentoArchivo.name,this.nombreAlmacen,"inv000","ACTIVO");

        },
        async registrarAlmacen(
            nombreAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/almacen/agregaralmacen/" +
                    this.nombreAlmacen +
                    "," +
                    this.descripcionAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {
                    me.closeModalAgregarAlma();
                    me.listarAlmacenes();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarAlm() {
            this.editarAlmacen(this.idAlmacen, this.nombreAlmacen, this.descripcionAlmacen, this.estado);

        },
        async editarAlmacen(
            idAlmacen,
            nombreAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/almacen/editaralmacen/" +
                    this.idAlmacen +
                    "," +
                    this.nombreAlmacen +
                    "," +
                    this.descripcionAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {
                    me.closeModalAgregarAlma();
                    me.listarAlmacenes();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionAlmacen(item) {
            this.idAlmacen = item.idalmacen;
            this.confirmacionAnulacionAlm = true;
        },
        closeAnulacionAlmacen() {
            this.confirmacionAnulacionAlm = false;
        },
        anularAlmacen() {
            this.desactivarAlmacen(this.idAlmacen);
            this.confirmacionAnulacionAlm = false;
            this.listarAlmacenes();
        },
        async desactivarAlmacen(idAlmacen) {
            let me = this;
            await axios
                .post("/almacen/eliminaralmacen/" + this.idAlmacen).then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

        },

        async listarSeccionesActivas() {
            let me = this;
            await axios
                .get("/seccion/listarseccionesactivas/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosSeccionesActivas = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosSeccionesActivas = response.data.resultado;
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
                .get("/seccion/listarseccionesactivas/")
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


        registrarSec() {
            this.registarSeccion(this.nombreSeccion, this.idAlmacen, this.estado);
            this.closeModalAgregarSec();
            this.listarSecciones();
        },
        async registarSeccion(
            nombreSeccion,
            idAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/seccion/agregarseccion/" +
                    this.nombreSeccion +
                    "," +
                    this.idAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;

                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarSec() {
            this.editarSeccion(this.idSeccion, this.nombreSeccion, this.idAlmacen, this.estado);
            this.closeModalAgregarSec();
            this.listarSecciones();
            this.botonActSe = 0;
        },
        async editarSeccion(
            idSeccion,
            nombreSeccion,
            idAlmacen,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/seccion/actualizarseccion/" +
                    this.idSeccion +
                    "," +
                    this.nombreSeccion +
                    "," +
                    this.idAlmacen +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionSeccion(item) {
            this.idSeccion = item.idseccion;
            this.confirmacionAnulacionSec = true;
        },
        closeAnulacionSeccion() {
            this.confirmacionAnulacionSec = false;
        },
        anularSeccion() {
            this.desactivarAlmacen(this.idSeccion);
            this.confirmacionAnulacionSec = false;
            this.listarSecciones();
        },
        async desactivarSeccion(idSeccion) {
            let me = this;
            await axios
                .post("/seccion/eliminarseccion/" + this.idSeccion).then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

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



        registrarStn() {
            this.registarStand(this.nombreStand, this.idSeccion, this.estado);
            this.closeModalAgregarSt();
            this.listarStands();
        },
        async registarStand(
            nombreStand,
            idSeccion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/stand/agregarstand/" +
                    this.nombreStand +
                    "," +
                    this.idSeccion +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarStn() {
            this.editarStand(this.idStand, this.nombreStand, this.idSeccion, this.estado);
            this.closeModalAgregarSt();
            this.listarStands();
            this.botonActSt = 0;
        },
        async editarStand(
            idStand,
            nombreStand,
            idSeccion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/stand/actualizarstand/" +
                    this.idStand +
                    "," +
                    this.nombreStand +
                    "," +
                    this.idSeccion +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionStand(item) {
            this.idStand = item.idStand;
            this.confirmacionAnulacionSt = true;
        },
        closeAnulacionStand() {
            this.confirmacionAnulacionSt = false;
        },
        anularStand() {
            this.desactivarStand(this.idStand);
            this.confirmacionAnulacionSt = false;
            this.listarStands();
        },
        async desactivarStand(idStand) {
            let me = this;
            await axios
                .post("/stand/eliminarstand/" + this.idStand).then(function (response) {
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
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },



        showModalAgregarAlmacen() {
            this.agregarAlmacenModal = true;
        },
        closeModalAgregarAlma() {
            this.agregarAlmacenModal = false;
            this.limpiar();
            this.botonActAl = 0;
        },

        llenarCamposAlmacen(item) {
            this.botonActAl = 1;
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.estado = item.estado;
            this.agregarAlmacenModal = true;
        },



        llenarCamposSeccion(item) {
            this.botonActSe = 1;
            this.idSeccion = item.idseccion;
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.nombreSeccion = item.nombreseccion;
            this.estado = item.estado;
            this.agregarSeccionModal = true;
        },

        llenarCamposStand(item) {
            this.botonActSt = 1;
            this.idStand = item.idstand;
            this.idSeccion = item.idseccion;
            this.nombreSeccion = item.nombreseccion;
            this.nombreStand = item.nombrestand;
            this.estado = item.estado;
            this.agregarStandModal = true;
        },

        actualizarAlmacenes() {
            this.actualizaralmacen(

                this.nombreAlmacen,
                this.estado,

            );
            this.botonActAl = 0;
        },

        showModalAgregarSeccion() {
            this.agregarSeccionModal = true;
        },
        closeModalAgregarSec() {
            this.agregarSeccionModal = false;
            this.limpiar();
            this.botonActSe = 0;
        },



        actualizarSeccion() {
            this.actualizarseccion(

                this.nombreSeccion,
                this.idAlmacen,
                this.estado,

            );
            this.botonActSe = 0;
        },

        showModalAgregarStand() {
            this.agregarStandModal = true;
        },
        closeModalAgregarSt() {
            this.agregarStandModal = false;
            this.limpiar();
            this.botonActSt = 0;
        },



        actualizarStand() {
            this.actualizarseccion(

                this.nombreStand,
                this.idSeccion,
                this.estado,

            );
            this.botonActSt = 0;
        },

        seleccionarAlmacen(item) {
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.almacenModal = false;
        },

        seleccionarSeccion(item) {
            this.idSeccion = item.idseccion;
            this.nombreSeccion = item.nombreseccion;
            this.seccionModal = false;
        },

        openAlmacenModal() {
            this.almacenModal = true;
            this.listarAlmacenesActivos();
        },

        closeAlmacenModal() {
            this.almacenModal = false;
        },


        openSeccionModal() {
            this.seccionModal = true;
            this.listarSeccionesActivas();
        },

        closeSeccionModal() {
            this.seccionModal = false;
        },


        async listarDetallesAlmacen(idAlmacen) {
            let me = this;
            await axios
                .get("/seccion/listarseccionalmacen/" + idAlmacen)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDetalleAlmacen = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDetalleAlmacen = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        mostrarDetalleAlmacen(item) {
            this.listarDetallesAlmacen(item.idalmacen)
            this.detalleAlmacen = true;
        },


        closeDetalleAlmacen() {
            this.detalleAlmacen = false;

        },


        async listarDetallesSeccion(idSeccion) {
            let me = this;
            await axios
                .get("/stand/listarstandseccion/" + idSeccion)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDetalleSeccion = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDetalleSeccion = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },



        mostrarDetalleSeccion(item) {
            this.listarDetallesSeccion(item.idseccion);
            this.detalleSeccion = true;

        },


        closeDetalleSeccion() {
            this.detalleSeccion = false;
        },


        async listarDetallesStand(idStand) {
            let me = this;
            await axios
                .get("/inventario/listarstanditem/" + idStand)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosDetalleStand = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosDetalleStand = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        mostrarDetalleStand(item) {
            this.listarDetallesStand(item.idstand)
            this.detalleStand = true;
        },


        closeDetalleStand() {
            this.detalleStand = false;
        },

        limpiar() {
            this.$refs.form.reset()
        },
        //#endregion

        async getListaExistencias() {
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


        registrarDocumento() {
            this.almacenarArchivo(this.documentoArchivo)
            this.guardarDocumento(this.documentoArchivo.name, this.nombreAlmacen, "inv000", "ACTIVO");
        },
        async almacenarArchivo(documentoArchivo) {

            const formData = new FormData();
            formData.append('inventory', documentoArchivo);
            let me = this;
            await axios
                .post(
                    "/uploadFile/", formData)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumentos();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },

        async guardarDocumento(documentoArchivo, descripcionArchivo, codigoArchivo, estado) {
            const ext = documentoArchivo.split('.');
            const date = new Date();
            const fechaHoraActual = date.getDate().toString().padStart(2, '0') + '_' + (date.getMonth() + 1).toString().padStart(2, '0') + '_' + date.getFullYear();
            const nombreArchivo = ext[0] + '_' + fechaHoraActual + '.' + ext[1];
            let me = this;
            await axios
                .post(
                    "/documento/insertar/" +
                    ext[0] +
                    "," +
                    nombreArchivo +
                    "," +
                    descripcionArchivo +
                    "," +
                    codigoArchivo +
                    "," +
                    estado)
                .then(function (response) {
                    console.log(response);
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.limpiar();
                    me.listarDocumento();
                    me.listarArchivos();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });
        },
    },
};

</script>
