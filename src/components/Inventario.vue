<template>
    <v-card elevation="5" outlined v-if="checkAccess(10, 'SUPERVISOR') || checkAccess(10, 'SECRETARIO') || checkAccess(10, 'GERENTE')">
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
            <v-alert  v-if="existencias==false && checkAccess(10, 'SUPERVISOR')"  
                type="error"
                color="red darken-2"
                dense
                prominent
                icon="mdi-alert"
                >
                <div class="text-h6">
                    SE REQUIERE LA COMPRA DE EXISTENCIAS EN EL INVENTARIO
                </div>
                POR FAVOR, NOTIFIQUE A ADQUISICIONES PARA ADQUIRIR EXISTENCIAS DE <strong>{{this.itemsCriticos}}</strong>   
            </v-alert>
            <v-alert     v-if="existencias==true && checkAccess(10, 'SUPERVISOR')"      
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
                 <h3>INVENTARIO</h3>
             </v-alert>
         </div>
         <div>
             <v-form ref="form" v-model="valid" lazy-validation>
                 <v-container>
                     <v-row>
                         <v-col cols="3" md="2" v-if="checkAccess(10, 'SUPERVISOR')">
                             <v-btn color="success" @click="showModalAgregarTransaccion()">NUEVO INVENTARIO</v-btn>
                         </v-col>
                         <!--<v-col cols="3" md="3" v-if="checkAccess(10, 'SUPERVISOR') || checkAccess(10, 'GERENTE') ">
                             <v-btn color="success" @click="showRevalorizarInventarioModal()">REVALORIZACIÓN DE INVENTARIO</v-btn>
                         </v-col>-->
                        
                         <v-col cols="12">
                             <v-list-item>
                                 <v-list-item-title class="text-center">
                                     <h5>TRANSACCIÓN DE INVENTARIO</h5>
                                 </v-list-item-title>
                             </v-list-item>
                            <v-card-title>
                                <v-text-field v-model="searchInventario" append-icon="mdi-magnify" label="BUSCAR INVENTARIO"
                                     single-line hide-details></v-text-field>                               
                            </v-card-title>       
                            <v-card-title>
                                <v-btn color="primary" @click="exportToPDF()">PDF</v-btn>
                                            
                                <v-btn color="primary" @click="exportToCSV()">CSV</v-btn>
                                
                                <v-btn color="primary" @click="exportToExcel()">EXCEL</v-btn>
                            </v-card-title> 
                             <v-data-table :headers="headerInventario" :items="datosInventario" :search="searchInventario"
                                 :items-per-page="5" class="elevation-2" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposInventario(item)"
                                         title="ACTUALIZAR INFORMACION">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="confirmarActivacionInv(item)"
                                         title="ACTIVAR ALMACÉN">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionInv(item)"
                                         title="DESACTIVAR ALMACÉN">
                                         mdi-close-circle
                                     </v-icon>             
                                 </template>
 
                               
 
 
                             </v-data-table>
                         </v-col>
                     </v-row>
                    
                     
 
                 </v-container>
             </v-form>
   
 
         </div>

         <v-dialog v-model="activarTipoItemModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>TIPO DE ÍTEMS INACTIVOS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>ÍTEMS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarTipoItem" append-icon="mdi-magnify"
                                            label="BUSCAR TIPOS DE ÍTEM" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headerTipoDeItem" :items="datosTipoDeItemInactivos"
                                        :search="buscarTipoItem" :items-per-page="5" class="elevation-1" id="tableId">

                                        <template #[`item.estado`]="{ item }">
                                            <v-chip :color="getColor(item.estado)" dark>
                                                {{ item.estado }}
                                            </v-chip>
                                        </template>


                                        <template #[`item.actions`]="{ item }">
                                            <v-icon v-if="item.estado == 'INACTIVO'" color="green" x-large  class="mr-2"
                                                @click="activar(item)" title="ACTIVAR">
                                                mdi-check-circle-outline
                                            </v-icon>
                                
            
                                        </template>

                                    </v-data-table>
                                </v-col>
                                <v-col cols="10"></v-col>
                                <v-col cols="12">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalActivarTipo()" style="float: right" title="SALIR">
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


         <v-dialog v-model="itemModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ÍTEMS ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchItem" append-icon="mdi-magnify" label="BUSCAR ÍTEMS DISPONIBLES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerItem" :items="datosItem" :search="searchItem"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large color="#0A62BF" class="mr-2" @click="seleccionarItem(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeItemModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                               
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>       
        
        
        <v-dialog v-model="itemDispModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ÍTEMS DISPONIBLES PARA ALMACENAR</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchItemDisponibles" append-icon="mdi-magnify" label="BUSCAR ÍTEMS DISPONIBLES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerItemDisponibles" :items="datosItemDisponibles" :search="searchItemDisponibles"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large color="#0A62BF" class="mr-2" @click="seleccionarItemDisp(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeItemDispModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                             
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>  
        

        <v-dialog v-model="itemRevalModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ÍTEMS DISPONIBLES PARA REVALORIZAR</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchItemDisponibles" append-icon="mdi-magnify" label="BUSCAR ÍTEMS"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerItemPrecio" :items="datosItemPrecio" :search="searchItemDisponibles"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large color="#0A62BF" class="mr-2" @click="seleccionarPrecioItem(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeItemPrecioModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                             
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>  
        

        <v-dialog v-model="itemAlmacenModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ÍTEMS DISPONIBLES EN EL ALMACÉN</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchItemAlmacen" append-icon="mdi-magnify" label="BUSCAR ÍTEMS DISPONIBLES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerItemAlmacen" :items="datosStock" :search="searchItemAlmacen"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large color="#0A62BF" class="mr-2" @click="seleccionarItemAlmacen(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeItemAlmacenModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                              
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>       



         <v-dialog v-model="agregarInventarioModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>GESTIÓN DE TRANSACCIONES DE INVENTARIO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                 <v-col cols="12" md="12">
                                    <v-btn-toggle v-model="movimiento" rounded class="d-flex w-100">
                                        <v-btn value="ENTRADA" :color="movimiento === 'ENTRADA' ? 'success' : 'grey lighten-1'" :variant="movimiento === 'ENTRADA' ? 'flat' : 'outlined'" class="flex-grow-1">
                                            <v-icon :color="movimiento === 'ENTRADA' ? 'white' : 'success'">mdi-location-enter</v-icon>
                                            <span :class="movimiento === 'ENTRADA' ? 'text-white' : 'text-success'">Entrada</span>
                                        </v-btn>
                                        <v-btn  value="SALIDA" :color="movimiento === 'SALIDA' ? 'error' : 'grey lighten-1'" :variant="movimiento === 'SALIDA' ? 'flat' : 'outlined'" class="flex-grow-1">
                                            <v-icon :color="movimiento === 'SALIDA' ? 'white' : 'error'">mdi-location-exit</v-icon>
                                            <span :class="movimiento === 'SALIDA' ? 'text-white' : 'text-error'">Salida</span>
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
 
                                <v-col cols="12" md="12" v-if="movimiento!=null">
                                    <v-combobox
                                    v-model="motivo"
                                    :items="motivoSugerencias"
                                    label="MOTIVO"
                                    :rules='motivoRules'
                                    :disabled='movimiento==null'
                                    required
                                    solo
                                    hint="ELIGE UN MOTIVO O ESCRIBE UNO NUEVO"
                                    persistent-hint
                                    />
        
                                </v-col>
    

                                <v-col cols="12" md="11" v-if="movimiento=='ENTRADA'">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ÍTEM"
                                        :rules="nombreItemRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1" v-if="movimiento=='ENTRADA'  && motivo!=''">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules" :disabled='movimiento==null && motivo!=""'
                                        @click="openItemDispModal()" style="float: right" title="BUSCAR ÍTEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col> 

                                <v-col cols="12" md="11" v-if="movimiento=='ENTRADA'">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACÉN"
                                        :rules="nombreAlmacenRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1" v-if="movimiento=='ENTRADA'  && motivo!=''">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules" :disabled='movimiento==null && motivo!=""' 
                                        @click="openAlmacenModal()" style="float: right" title="BUSCAR ALMACÉN">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>  
                                <v-col cols="12" md="4" v-if="movimiento=='ENTRADA' && motivo.value=='RECEPCIÓN'">
                                    <v-text-field v-model="cantidad" label="CANTIDAD" type="number" :rules="cantidadEntradaRules" :disabled='movimiento==null ||nombreAlmacen=="" || nombreItem=="" && motivo!=""'
                                         @input="cantidad = cantidad.toUpperCase()"
                                        required></v-text-field>
                                </v-col>   
                                  <v-col cols="12" md="4" v-if="movimiento=='ENTRADA'  && motivo.value!='RECEPCIÓN'">
                                    <v-text-field v-model="cantidad" label="CANTIDAD" type="number" :rules="cantidadRules" :disabled='movimiento==null ||nombreAlmacen=="" || nombreItem=="" && motivo!=""'
                                         @input="cantidad = cantidad.toUpperCase()"
                                        required></v-text-field>
                                </v-col>         
                                
                                
                                <v-col cols="12" md="6" v-if="movimiento=='ENTRADA' && motivo.value!='RECEPCIÓN' && motivo.value!=''">
                                    <v-text-field v-model="valor" type="number" label="COSTO UNITARIO" :disabled='movimiento==null && motivo=="" && motivo.value!="RECEPCIÓN"'
                                        :rules="costoRules" @input="valor = valor.toUpperCase()"
                                        required></v-text-field>
                                </v-col>


                             

                                <v-col cols="12" md="11" v-if="movimiento=='SALIDA'">
                                    <v-text-field v-model="nombreAlmacen" label="NOMBRE ALMACÉN"
                                        :rules="nombreAlmacenRules" @input="nombreAlmacen = nombreAlmacen.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1" v-if="movimiento=='SALIDA' && motivo!='' && motivo!=null">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules" :disabled='movimiento==null && motivo!=""' 
                                        @click="openAlmacenConStockModal()" style="float: right" title="BUSCAR ALMACENES CON STOCK">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>   
                                
                                <v-col cols="12" md="11" v-if="movimiento=='SALIDA'">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ÍTEM"
                                        :rules="nombreItemRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1" v-if="movimiento=='SALIDA'  && motivo!=''">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreAlmacenRules" :disabled='movimiento==null || nombreAlmacen=="" && motivo==""' 
                                        @click="openItemAlmacenModal()" style="float: right" title="BUSCAR ÍTEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col> 

                                

                                <v-col cols="12" md="12" v-if="movimiento!=null"">
                                    <v-text-field v-model="lote" label="LOTE O SERIE (SI SE REQUIERE)"
                                        :rules="loteRules" @input="lote = lote.toUpperCase()" :disabled='nombreItem=="" && motivo==""' hint="EJM: 2025-LOTE01"
                                         ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="11" v-if="movimiento!=null">
                                    <v-text-field v-model="referencia" label="REFERENCIA"
                                        :rules="referenciaRules" @input="referencia = referencia.toUpperCase()" :disabled='nombreItem=="" && motivo==""' hint="EJM: FA-3458014 - NÚMERO DE FACTURA O GUIA, ETC"
                                         required></v-text-field>
                                </v-col>
                               
                                <v-col cols="12" md="4" v-if="movimiento=='SALIDA'">
                                    <v-text-field v-model="cantidad" label="CANTIDAD" type="number" :rules="cantidadSalidaRules" :disabled='movimiento==null ||nombreAlmacen=="" || nombreItem=="" && motivo==""'
                                         @input="cantidad = cantidad.toUpperCase()"
                                        required></v-text-field>
                                </v-col>  


                                
                               

                                <v-col cols="12" sm="4" md="12"></v-col>
                                   
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped >
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonActInv == 1" color="#0A62BF" @click="editarInv()" :disabled='movimiento==null'
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonActInv == 0" color="#0ABF55" @click="registrarInv()" :disabled='movimiento==null'
                                                style="float: left" title="REGISTRAR TRANSACCIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-content-save </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon color="#BF120A" @click="limpiar()" style="float: left" large :disabled='movimiento==null'
                                                class="mx-2" title="LIMPIAR FORMULARIO">
                                                <v-icon dark> mdi-eraser </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-toolbar>
                                </v-col>
                               
                                <v-col cols="8">
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarTransaccion()" style="float: right" title="SALIR">
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
                                    <v-text-field v-model="searchAlmacen" append-icon="mdi-magnify" label="BUSCAR ALMACENES ACTIVOS"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerAlmacen" :items="datosAlmacen" :search="searchAlmacen"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large color="#0A62BF" class="mr-2" @click="seleccionarAlmacen(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeAlmacenModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                               
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>   


        <v-dialog v-model="almacenConStockModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE ALMACENES CON ÍTEMS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchAlmacenConStock" append-icon="mdi-magnify" label="BUSCAR ALMACENES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerAlmacen" :items="datosAlmacenConStock" :search="searchAlmacenConStock"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large color="#0A62BF" class="mr-2" @click="seleccionarAlmacen(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeAlmacenConStockModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                              
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>   


       


        <v-dialog v-model="tipoModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE TIPO DE ÍTEMS ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchTipoItem" append-icon="mdi-magnify" label="BUSCAR TIPOS DISPONIBLES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerTipoDeItem" :items="datosTipoDeItem" :search="searchTipoItem"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon large color="#0A62BF" class="mr-2" @click="seleccionarTipo(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeTipoModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                               
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>         




         <v-dialog v-model="agregarItemModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>GESTIÓN DE ÍTEMS</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ÍTEM" :counter="60"
                                        :rules="nombreItemRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        required></v-text-field>
                                </v-col>   
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="descripcion" label="DESCRIPCIÓN" :counter="150"
                                        :rules="descripcionRules" @input="descripcion = descripcion.toUpperCase()"
                                        required></v-text-field>
                                </v-col>   
                                <v-col v-if="botonActIt == 0" cols="12" md="4">
                                    <v-select
                                    label="MEDIDA"  v-model="medida" @input="medida =medida.toUpperCase()" required
                                    :items="['LITROS', 'KILOGRAMOS', 'MILILITROS', 'TONELADAS', 'GRAMOS', 'UNIDADES']" 
                                    :rules="[v => !!v || 'La medida es requerida']"
                                    ></v-select>
                                </v-col>    
                                <v-col v-if="botonActIt == 0" cols="12" md="3">
                                    <v-text-field v-model="nombreTipoITem" label="NOMBRE TIPO ÍTEM" :counter="60"
                                        :rules="nombreTipoRules" @input="nombreTipoITem = nombreTipoITem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col v-if="botonActIt == 0" cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openTipoModal()" style="float: right" title="BUSCAR TIPO ÍTEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col> 
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="limitecritico" label="LÍMITE CRÍTICO" type="number" :counter="25"
                                         @input="limitecritico = limitecritico" :rules="limiteRules"
                                        required></v-text-field>
                                </v-col> 
                                <v-col cols="12" md="4">
                                    <v-select
                                    label="MÉTODO VALUACION" v-model="metodoValuacion" @input="metodoValuacion = metodoValuacion.toUpperCase()" required
                                    :items="['PEPS', 'UEPS', 'PROMEDIO PONDERADO']"
                                    :rules="[v => !!v || 'El Metodo de Valuación es requerido']"
                                    ></v-select>
                                </v-col>                   
                                <v-col cols="12" md="12"> </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped >
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonActIt == 1" color="#0A62BF" @click="editarIt()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonActIt == 0" color="#0ABF55" @click="registrarIt()" 
                                                style="float: left" title="REGISTRAR ÍTEM" class="mx-2" large>
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
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarItem()" style="float: right" title="SALIR">
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

         <v-dialog v-model="agregarTipoItemModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>GESTIÓN DE TIPO DE ÍTEMS</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreTipoITem" label="NOMBRE TIPO ÍTEM" :counter="60"
                                        :rules="nombreTipoRules" @input="nombreTipoITem = nombreTipoITem.toUpperCase()"
                                        required></v-text-field>
                                </v-col>                         
                                <v-col cols="12" md="12"> </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped >
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon v-if="botonActTT == 1" color="#0A62BF" @click="editarTipo()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonActTT == 0" color="#0ABF55" @click="registrarTipo()" 
                                                style="float: left" title="REGISTRAR TIPO DE ÍTEM" class="mx-2" large>
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
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeModalAgregarTipoItem()" style="float: right" title="SALIR">
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

        <v-dialog v-model="confirmacionAnulacionTipo" persistent :overlay="false" max-width="1000px">
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
                                        @click="anularTipo()" style="float: right" title="ANULAR TIPO">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionTipo()" style="float: right" title="SALIR">
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

        <v-dialog v-model="confirmacionAnulacionItem" persistent :overlay="false" max-width="1000px">
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
                                        @click="anularItem()" style="float: right" title="ANULAR ÍTEM">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionItem()" style="float: right" title="SALIR">
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


        <v-dialog v-model="confirmacionAnulacionInventario" persistent :overlay="false" max-width="1000px">
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
                                        @click="anularInventario()" style="float: right" title="ANULAR INVENTARIO">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionInventario()" style="float: right" title="SALIR">
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

        <v-dialog v-model="revalorizarInventario" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>GESTIÓN DE REVALORARIZACIÓN DE INVENTARIO</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="11">
                                    <v-text-field v-model="nombreItem" label="NOMBRE ÍTEM"
                                        :rules="nombreItemRules" @input="nombreItem = nombreItem.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openItemPrecioModal()" style="float: right" title="BUSCAR ÍTEM">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>        
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="valor" label="NUEVO VALOR" type="number" :counter="25"
                                         @input="valor = valor.toUpperCase()" :rules="valorRules"
                                        required></v-text-field>
                                </v-col>     
                        
                                    
                                <v-col cols="12" md="12"> </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-toolbar dense shaped >
                                        <v-toolbar-title>
                                            <h6>
                                                OPCIONES:
                                            </h6>
                                        </v-toolbar-title>
                                        <v-col cols="2">
                                            <v-btn icon color="#0ABF55" @click="registrarPrecioItem()" 
                                                style="float: left" title="REGISTRAR NUEVO PRECIO" class="mx-2" large>
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
                                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeRevalorizarInventarioModal()" style="float: right" title="SALIR">
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


        <v-dialog
            v-model="detalleStockDialog"
            persistent :overlay="false"
            max-width="900px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title primary-title>
                    CONTENIDO
                </v-card-title>
            </v-card>
            <v-card>
                    <v-data-table :headers="headerStock" :items="datosStock"
                        :items-per-page="5" class="elevation-1">
                    </v-data-table>
            </v-card>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeDetalleStock()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
               
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="detalleProductosAlmacenados"
            persistent :overlay="false"
            max-width="900px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title>
                    <v-text-field v-model="searchProductoAlmacen" append-icon="mdi-magnify" label="BUSCAR PRODUCTO"
                        single-line hide-details></v-text-field>
                </v-card-title>
            </v-card>
            <v-card>
                    <v-data-table :headers="headerProductos" :items="datosProductos" :search="searchProductoAlmacen"
                        :items-per-page="5" class="elevation-1">
                    </v-data-table>
            </v-card>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeDetalleAlmacenamientoProducto()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
               
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="saldoAlmacenItemModal"
            persistent :overlay="false"
            max-width="900px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title>
                    <v-text-field v-model="searchAlmacen" append-icon="mdi-magnify" label="BUSCAR ALMACÉN"
                        single-line hide-details></v-text-field>
                </v-card-title>
            </v-card>
            <v-card>
                    <v-data-table :headers="headerSaldoAlmacenItem" :items="datosSaldoAlmacenItem" :search="searchAlmacen"
                        :items-per-page="5" class="elevation-1">
                    </v-data-table>
            </v-card>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeSaldoAlmacenItemModal()" style="float: right"
                                        title="SALIR">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        SALIR
                                    </v-btn>
                 
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>


     </v-card>
     
 
 </template>
 <script>
 import axios from "axios";
 import * as XLSX from 'xlsx';

 import Papa from "papaparse";

 import jsPDF from "jspdf";
 import 'jspdf-autotable';
import Alerta from "./Alerta.vue";

import logo from "@/assets/logodrymix.png";


 export default {
     data() {
         return {

            drawer: false,
            user: { id_usuario: 0, usuario: '', accesos: [], tipo: '', nombres: '', paterno: '', materno: '' },

            mensajeSnackbarError: "REGISTRO FALLIDO",

            existencias: true,
            itemsCriticos: '',
            datosExistencia:[],

             //#region 
             idTransaccion: "",
             idItem:"",
             movimiento:null,
             limitecritico:"",
             metodoValuacion:"",
             estTranc:"",

            idAlmacen:0,
            nombreAlmacen:"",


             nombreItem:"",
             descripcion:"",
             referencia:'',
             cantidad: null,
             motivo:"",
        


           

             lote:'',
             medida:"",
             estIt:"",

             idTipoItem:"",
             nombreTipoITem: "",
             estTT: "",

            estado: "ACTIVO",
             valid: true,
             nombreRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DEL PROVEEDOR.",
               (v) =>
               (v && v.length <= 60) ||
                 "EL NOMBRE DEL PROVEEDOR NO DEBE SOBREPASAR LOS 60 CARACTERES.",
             ],
             nombreItemRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DEL ÍTEM.",
               (v) =>
               (v && v.length <= 60) ||
                 "EL NOMBRE DEL ÍTEM NO DEBE SOBREPASAR LOS 60 CARACTERES.",
             ],
             nombreTipoRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DEL TIPO DE ÍTEM.",
               (v) =>
               (v && v.length <= 60) ||
                 "EL NOMBRE DEL TIPO NO DEBE SOBREPASAR LOS 60 CARACTERES.",
             ],
             nombreAlmacenRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DEL ALMACÉN.",
               (v) =>
               (v && v.length <= 60) ||
                 "EL NOMBRE DEL ALMACÉN NO DEBE SOBREPASAR LOS 60 CARACTERES.",
             ],

             cantidadRules: [
               (v) => !!v || "SE REQUIERE LA CANTIDAD.",
               (v) => Number(v) >= 0 || "LA CANTIDAD DEBE SER MAYOR A 0."
             ],


             cantidadSalidaRules: [
               (v) => !!v || "SE REQUIERE LA CANTIDAD.",
               (v) => Number(v) >= 0 || "LA CANTIDAD DEBE SER MAYOR A 0.",
               (v) => ( Number(v) >= 1 && Number(v) <= this.cantidadMaximaItem ) || 'EL NÚMERO NO DEBE SOBREPASAR '+ this.cantidadMaximaItem,
             ],

             cantidadEntradaRules: [
               (v) => !!v || "SE REQUIERE LA CANTIDAD.",
               (v) => Number(v) >= 0 || "LA CANTIDAD DEBE SER MAYOR A 0.",
               (v) => ( Number(v) >= 1 && Number(v) <= this.cantidadMaxima ) || 'EL NÚMERO NO DEBE SOBREPASAR '+ this.cantidadMaxima,
             ],

            valorRules: [
                (v) => parseFloat(v) >= 0 || "EL VALOR DEBE SER MAYOR A 0.",
                (v) => !!v || "EL VALOR ES OBLIGATORIO.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO."
            ],

            limiteRules: [
                (v) => !!v || "EL LÍMITE ES OBLIGATORIO.",
                (v) => parseFloat(v) >= 0 || "EL LÍMITE DEBE SER MAYOR A 0.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO."
            ],
                        
            descripcionRules: [
                (v) => !!v || "SE REQUIERE LA DESCRIPCIÓN.",
                (v) => (v === null || v.length <= 150) || "LA DESCRIPCIÓN NO DEBE SUPERAR LOS 150 CARACTERES.",
            ],
            motivoRules: [
                (v) => !!v || "EL MOTIVO ES OBLIGATORIO PARA CONTINUAR CON EL FORMULARIO.",
             
            ],
            referenciaRules: [
                (v) => !!v || "SE REQUIERE LA REFERENCIA.",
                (v) => (v === null || v.length <= 100) || "LA REFERENCIA NO DEBE SUPERAR LOS 100 CARACTERES.",
            ],
            loteRules: [
                (v) => (v === null || v.length <= 100) || "LA REFERENCIA NO DEBE SUPERAR LOS 100 CARACTERES.",
            ],
             phone1Rules: [
               (v) => !!v || "SE REQUIERE UN NÚMERO TELEFONICO O CELULAR.",
               (v) =>
               (v && v.length <= 10) ||
                 "EL TELEPHONO PRINCIPAL DEBE TENER HASTA 10 CARACTERES.",
             ],
             phone2Rules: [
               (v) =>
               (v && v===null || v.length <= 10) ||
                 "EL TELEPHONO SECUNDARIO DEBE TENER HASTA 10 CARACTERES.",
             ],
             emailRules: [
               (v) => !!v || "SE REQUIERE EL CORREO ELECTRONICO DEL PROVEEDOR.",
               (v) => /.+@.+\..+/.test(v) || "DEBE SER UN CORREO ELECTRONICO VALIDO.",
              ],

            costoRules: [
                (v) => !!v || "EL COSTO UNITARIO ES REQUERIDO.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO.",
                (v) => v > 0 || "EL COSTO UNITARIO DEBE SER MAYOR QUE 0.",
            ],
             datosInventario: [],
             headerInventario: [
                 
                 { text: "NÚMERO TRANSACCIÓN", value: "idTransaccion", sortable: true },
                 { text: "SKU", value: "sku", sortable: true },
                 { text: "ÍTEM", value: "nombreitem", sortable: true },
                 { text: "CATEGORÍA", value: "nombrecategoria", sortable: true },
                 { text: "SUBCATEGORÍA", value: "nombresubcategoria", sortable: true },
                 { text: "PROVEEDOR", value: "nombreproveedor", sortable: true },
                 { text: "CATEGORÍA DE PROVEEDOR", value: "nombrecategoriaproveedor", sortable: true },
                 { text: "ALMACÉN", value: "nombrealmacen", sortable: true },
                 { text: "MOVIMIENTO", value: "movimiento", sortable: true },
                 { text: "MOTIVO", value: "motivo", sortable: true },
                 { text: "REFERENCIA", value: "referencia", sortable: true },
                 { text: "LOTE", value: "lote", sortable: true },
                 { text: "CANTIDAD", value: "cantidad", sortable: true },
                 { text: "MÉTODO DE VALUACIÓN", value: "metodoValuacion", sortable: true },
                 //{ text: "ESTADO", value: "estado", sortable: true },
                 //{ text: "OPCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],

            datosAlmacen:[],
            headerAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                
                { text: "NOMBRE DE ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "DESCRIPCIÓN DE ALMACÉN", value: "descripcion", sortable: true },
                { text: "CÓDIGO ALMACÉN", value: "codigo", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],
            searchAlmacen: "",
            almacenModal: false,
            datosAlmacenConStock: [],
            searchAlmacenConStock: "",
            almacenConStockModal: false,


            datosStockAlmacen:[],
            headerStockAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "CÓDIGO ALMACÉN", value: "codigo", sortable: true },
                { text: "NOMBRE DE ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "TOTAL", value: "total", sortable: true },
                { text: "OPCIONES", value: "actions", sortable: false },
                //{ text: "OPCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],
            searchStockAlmacen: "",

            datosStock: [],
            headerStock: [   
                 { text: "SKU", value: "sku", sortable: true },
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "TIPO ÍTEM", value: "nombretipoitem", sortable: true },
                 { text: "PRECIO UNITARIO", value: "valor", sortable: true },
                 { text: "STOCK", value: "total", sortable: true },
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
            searchStock: "",
            detalleStockDialog: false,

            datosProductos:[],
            datosProductoAlmacen:[],
            headerProductos: [
                { text: "NOMBRE DE PRODUCTO", value: "nombreprod", sortable: true },
                { text: "CÓDIGO DE PRODUCTO", value: "codprod", sortable: true },
                { text: "TIPO", value: "nombretipo", sortable: true },
                { text: "TOTAL", value: "total", sortable: false },
            ],
           
            searchProductoAlmacen: "",
            detalleProductosAlmacenados: false,
 
             datosItem: [],
             headerItem: [
                 { text: "SKU", value: "sku", sortable: true },
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "MEDIDA", value: "medida", sortable: true },
                 { text: "TIPO ÍTEM", value: "nombretipoitem", sortable: true },
                 { text: "LÍMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "MÉTODO DE VALUACIÓN", value: "metodovaluacion", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "OPCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
 
             datosTipoDeItem: [],
             datosTipoDeItemInactivos: [],
             headerTipoDeItem: [
                 
                 { text: "NOMBRE DE TIPO DE ÍTEM", value: "nombretipoitem", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "OPCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],


             datosItemDisponibles: [],
             headerItemDisponibles: [
                 { text: "SKU", value: "sku", sortable: true },
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "MEDIDA", value: "medida", sortable: true },
                 { text: "TIPO ÍTEM", value: "nombretipoitem", sortable: true },
                 { text: "LÍMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "MÉTODO DE VALUACIÓN", value: "metodovaluacion", sortable: true },
                 { text: "CANTIDAD", value: "cantidad", sortable: true },
                 { text: "PRECIO UNITARIO", value: "valor", sortable: true },
                 { text: "OPCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
             searchItemDisponibles: "",
             itemDispModal: false,
             cantidadMaxima : 0,
             cantidadMaximaItem: 0,

             itemRevalModal: false,
             datosItemPrecio: [],
             headerItemPrecio: [
                 { text: "SKU", value: "sku", sortable: true },
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "TIPO ÍTEM", value: "nombretipoitem", sortable: true },
                 { text: "CANTIDAD", value: "total", sortable: true },
                 { text: "PRECIO UNITARIO", value: "valor", sortable: true },
                 { text: "OPCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],

             
             datosItemAlmacen: [],
             headerItemAlmacen: [
                 { text: "SKU", value: "sku", sortable: true },
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "TIPO ÍTEM", value: "nombretipoitem", sortable: true },
                 { text: "LÍMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "MÉTODO DE VALUACIÓN", value: "metodovaluacion", sortable: true },
                 { text: "CANTIDAD", value: "total", sortable: true },
                 { text: "OPCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
             searchItemAlmacen: "",
             itemAlmacenModal: false,

             activarTipoItemModal:false,

 
             buscarInventario: "",
             searchInventario: "",
             agregarInventarioModal: false,
             confirmacionAnulacionInventario: false,

             revalorizarInventario: false,
 
             buscarItem: "",
             searchItem: "",
             agregarItemModal: false,
             confirmacionAnulacionItem: false,
             valor:0,
 
             buscarTipoItem: "",
             searchTipoItem: "",
             agregarTipoItemModal: false,
             confirmacionAnulacionTipo: false,



             itemModal:false,
             tipoModal:false,


             botonActInv:0,
             botonActIt:0,
             botonActTT:0,


             saldoAlmacenItemModal: false,

             datosSaldoItem: [],
             headerSaldoItem: [
                 { text: "SKU", value: "sku", sortable: true },
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "TIPO ÍTEM", value: "nombretipoitem", sortable: true },
                 { text: "LÍMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "CANTIDAD", value: "total", sortable: true },
                 { text: "OPCIONES", value: "actions", sortable: false }
             ],
             datosSaldoAlmacenItem: [],
             headerSaldoAlmacenItem: [
                { text: "CÓDIGO ALMACÉN", value: "codigo", sortable: true },
                { text: "NOMBRE DE ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "TOTAL", value: "total", sortable: true },
            ],

             snackbarOK: false,
             snackbarError : false,
             //#endregion
         }
     },
     computed:{
        motivoSugerencias() {
            if (this.movimiento === 'ENTRADA') {
            return [
                { text: 'RECEPCIÓN COMPRAS', value: 'RECEPCIÓN COMPRAS' },
                { text: 'RECEPCIÓN', value: 'RECEPCIÓN' },
                { text: 'DEVOLUCIÓN CLIENTE', value: 'DEVOLUCIÓN CLIENTE' },
                { text: 'AJUSTE DE INVENTARIO (+)', value: 'AJUSTE DE INVENTARIO (+)' },
                { text: 'TRASLADO INTERNO (ENTRADA)', value: 'TRASLADO INTERNO (ENTRADA)' },
                { text: 'REGULARIZACIÓN', value: 'REGULARIZACIÓN' },
            ]
            }
            if (this.movimiento === 'SALIDA') {
            return [
                { text: 'DEVOLUCIÓN PROVEEDOR', value: 'DEVOLUCIÓN PROVEEDOR' },
                { text: 'AJUSTE DE INVENTARIO (-)', value: 'AJUSTE DE INVENTARIO (-)' },
                { text: 'TRASLADO INTERNO (SALIDA)', value: 'TRASLADO INTERNO (SALIDA)' },
                { text: 'CONSUMO / PRODUCCIÓN', value: 'CONSUMO o PRODUCCIÓN' },
                { text: 'VENCIMIENTO / DAÑO', value: 'VENCIMIENTO o DAÑO' },
                { text: 'REGULARIZACIÓN', value: 'REGULARIZACIÓN' },
            ]
            }
            return []
        }
    },
    
    created: function (){
       this.listarInventario();
       this.listarItem();
       this.listarTipoItem();
       this.listarstock();
       this.listaralmacenproducto();
       this.listarSaldoItem();
       this.getListaExistencias().then(() => {
       this.getAlertas();
        });

        if (this.user != null) {
            this.user = JSON.parse(sessionStorage.getItem('session'));
        }
        if (this.user == null) {
        if (this.$route.path != '/login') {
            this.$router.push("/login");
        }
        }
        console.log("UserData: " + JSON.stringify(this.user));
       
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
                    if ( Number(limite[i]) >= Number(stock[i])  ) {
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
         //#region Listar
         listarInventario() {
             this.listarInventarios();
         },
         async listarInventarios() {
           let me = this;
           await axios
             .get("/inventario/listarinventarioactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosInventario = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosInventario = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

        registrarInv() {
            if (this.valor == null || this.valor == 0) {
                this.valor = 0;
            }
            if (this.motivo.value == 'RECEPCIÓN') {
                this.registrarInventarioEntrada(this.idItem,this.idAlmacen, this.movimiento,this.cantidad, this.estado);
            }
            else{
                this.registarRevalorarizacionItem(this.idItem, this.valor)
                .then(() => {
                    this.registrarInventarioEntrada(this.idItem,this.idAlmacen, this.movimiento,this.cantidad, this.estado);
            })
            }
            
        },
        async registrarInventarioEntrada(
            idItem,
            idAlmacen,
            movimiento,
            cantidad,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregarinventario/" +
                    this.idItem +
                    "," +
                    this.idAlmacen +
                    "," +
                    this.movimiento +
                    "," +
                    this.cantidad +
                    "," +
                    this.estado +
                    "," +
                    this.referencia +
                    "," +
                    this.motivo.value +
                    "," +
                    this.lote
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.closeModalAgregarTransaccion();
                    me.listarInventarios();
                    me.limpiar();
                })
                .catch(function (error) {
                    console.log(error);
                    me.snackbarError = true;

                });
                

        },

        async registrarInventarioSalida(
            idItem,
            movimiento,
            cantidad,
            metodovaluacion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregarinventariosalida/" +
                    this.idItem +
                    "," +
                    this.movimiento +
                    "," +
                    this.cantidad +
                    "," +
                    this.metodoValuacion +
                    "," +
                    this.estado +
                    "," +
                    this.referencia +
                    "," +
                    this.lote +
                    "," +
                    this.motivo

                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.closeModalAgregarTransaccion();
                    me.listarInventarios();
                    me.getAlertas();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarInv() {
            if (this.$refs.form.validate()) {
            this.editarInventario(this.idTransaccion,this.idItem, this.idAlmacen,this.movimiento,this.cantidad, this.estado);

            this.botonActInv=0;
            }
        },
        async editarInventario(
            idTransaccion,
            idItem,
            idAlmacen,
            movimiento,
            cantidad,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizarinventario/" +
                    this.idTransaccion +
                    "," +
                    this.idItem +
                    "," +
                    this.idAlmacen +
                    "," +
                    this.movimiento +
                    "," +
                    this.cantidad +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.closeModalAgregarTransaccion();
                    me.listarInventarios();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionInv(item){
            this.idTransaccion = item.idTransaccion;
            this.confirmacionAnulacionInventario = true;
        },
        closeAnulacionInventario(){
            this.confirmacionAnulacionInventario = false;
        },
        anularInventario() {
            this.desactivarInventario(this.idTransaccion);
            this.confirmacionAnulacionInventario = false;
            this.listarInventarios();
        },
        async desactivarInventario(idTransaccion) {
            let me = this;
            await axios
                .post("/inventario/eliminarinventario/" + this.idTransaccion).then(function (response) {
                    me.listarInventarios();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

        },


        registrarPrecioItem(){
            if (this.$refs.form.validate()) {
            this.registarRevalorarizacionItem(this.idtiem,this.valor)
            }
        },


        async registarRevalorarizacionItem(idItem,valor) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregarprecioitem/" +
                    this.idItem +
                    "," +
                    this.valor
                )
                .then(function (response) {
                    me.closeRevalorizarInventarioModal();
                })
                .catch(function (error) {
                    console.log(error);
                    me.snackbarError = true;

                });

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


        listarAlmacenconStock() {
            this.listarAlmacenesConStock();
        },
        async listarAlmacenesConStock() {
          let me = this;
          await axios
            .get("/almacen/listaralmacenstock/")
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosAlmacenConStock = [];
                console.log(response.data);
              } else {
                console.log(response.data);
                me.datosAlmacenConStock = response.data.resultado;
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

         listarItemDisp() {
             this.listarItemsDisponibles();
         },
         async listarItemsDisponibles() {
            let response = "";
            if (this.movimiento == 'ENTRADA') {
                if(this.motivo.value == 'RECEPCIÓN'){
                    response = "/inventario/listaritemdisponibles/";
                }
                else{
                    response = "/inventario/listaritemdisponiblesInventario/";
                }
            }
           let me = this;
           await axios
             .get(response)
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosItemDisponibles = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosItemDisponibles = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },


         
         listarValorItem() {
             this.listarValorItems();
         },
         async listarValorItems() {
           let me = this;
           await axios
             .get("/inventario/listaritemalmacenados/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosItemPrecio = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosItemPrecio = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         registrarIt() {
            if (this.$refs.form.validate()) {
            this.registrarItem(this.nombreItem, this.descripcion,this.medida,this.idTipoItem,this.limitecritico, this.metodoValuacion, this.estado);
            }
        },
        async registrarItem(
            nombreItem,
            descripcion,
            medida,
            idTipoItem,
            limitecritico,
            metodoValuacion,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregaritem/" +
                    this.nombreItem +
                    "," +
                    this.descripcion +
                    "," +
                    this.medida +
                    "," +
                    this.estado +
                    "," +
                    this.idTipoItem +
                    "," +
                    this.limitecritico +
                    "," +
                    this.metodoValuacion
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarItems();
                    me.closeModalAgregarItem();
                    me.limpiar();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarIt() {
            if (this.$refs.form.validate()) {
            this.editarItem(this.idItem, this.nombreItem, this.descripcion, this.estado, this.limitecritico, this.metodoValuacion);
            this.botonActIt=0;
            }
        },
        async editarItem(
            idItem,
            nombreItem,
            descripcion,
            estado,
            limitecritico,
            metodoValuacion
            
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizaritem/" +
                    this.idItem +
                    "," +
                    this.nombreItem +
                    "," +
                    this.descripcion +
                    "," +
                    this.estado +
                    "," +
                    this.limitecritico +
                    "," +
                    this.metodoValuacion
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarItems();
                    me.closeModalAgregarItem();
                    me.limpiar();

                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        confirmacionAnulacionIt(item){
            this.idItem = item.iditem;
            this.confirmacionAnulacionItem = true;
        },
        closeAnulacionItem(){
            this.confirmacionAnulacionItem = false;
        },
        anularItem() {
            this.desactivarItem(this.idItem);
        },
        async desactivarItem(idItem) {
            let me = this;
            await axios
                .post("/inventario/eliminaritem/" + this.idItem).then(function (response) {
                    me.listarItems();
                    me.closeModalAgregarItem();
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                });

        },

 
         listarTipoItem() {
             this.listarTipoItems();
         },
         async listarTipoItems() {
           let me = this;
           await axios
             .get("/inventario/listartipodeitemactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosTipoDeItem = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosTipoDeItem = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         listarTipoItemInactivo() {
             this.listarTipoItemsInactivos();
         },
         async listarTipoItemsInactivos() {
           let me = this;
           await axios
             .get("inventario/listartipodeiteminactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosTipoDeItemInactivos = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosTipoDeItemInactivos = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         registrarTipo() {
            if (this.$refs.form.validate()) {
                this.registrarTipos(this.nombreTipoITem, this.estado);
            }            
        },
        async registrarTipos(
            nombreTipoITem,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregartipodeitem/" +
                    this.nombreTipoITem +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTipoItems();
                    me.closeModalAgregarTipoItem();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarTipo() {
            if (this.$refs.form.validate()) {
            this.editarTipo( this.idTipoItem,this.nombreTipoITem, this.estado);
            this.botonActTT = 0;
            }
        },
        async editarTipo(
            idTipoItem,
            nombreTipoITem,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizartipodeitem/" +
                    this.idTipoItem +
                    "," +
                    this.nombreTipoITem +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarTipoItems();
                    me.closeModalAgregarTipoItem();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },



        confirmacionAnulacionTip(item){
            this.idTipoItem = item.idtipodeitem;
            this.confirmacionAnulacionTipo = true;
        },
        closeAnulacionTipo(){
            this.confirmacionAnulacionTipo = false;
        },
        anularTipo() {
            this.desactivarTipo(this.idTipoItem);
            this.confirmacionAnulacionTipo = false;
            this.listarTipoItem();
        },
        async desactivarTipo(idTipoItem) {
            let me = this;
            await axios
                .post("/inventario/eliminartipodeitem/" + this.idTipoItem).then(function (response) {
                    me.listarTipoItems();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                    me.snackbarError = true;
                });

        },


        listarstock() {
             this.listarStockAlmacen();
         },
         async listarStockAlmacen() {
           let me = this;
           await axios
             .get("/inventario/listarstockalmacen/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosStockAlmacen = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosStockAlmacen = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },


         async listarDetalleStock(idAlmacen) {
          let me = this;
          await axios
            .get("/inventario/listarstock/"+idAlmacen)
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosStock = [];
              } else {
                me.datosStock = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },


        listaralmacenproducto() {
             this.listarProductoAlmacen();
         },
         async listarProductoAlmacen() {
           let me = this;
           await axios
             .get("/almacen/listaralmacenConProd/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datosProductoAlmacen = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datosProductoAlmacen = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },
        

        async listarDetalleAlmacenamientoProductos(idAlmacen) {
          let me = this;
          await axios
            .get("/inventario/listarProductos/"+idAlmacen)
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datosProductos = [];
              } else {
                me.datosProductos = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },


        mostrarItems(item){
            this.idAlmacen = item.idalmacen;
            this.listarDetalleStock(this.idAlmacen);
            this.detalleStockDialog = true;
            
        },

        
        mostrarProductos(item){
            this.idAlmacen = item.idalmacen;
            this.listarDetalleAlmacenamientoProductos(this.idAlmacen);
            this.detalleProductosAlmacenados = true;
            
        },

        

        closeDetalleStock(){
            this.detalleStockDialog = false;
        },

        closeDetalleAlmacenamientoProducto(){
            this.detalleProductosAlmacenados = false;
        },



        listarSaldoItem() {
            this.listarSaldoItemAlmacen();
        },
        async listarSaldoItemAlmacen() {
            let me = this;
            await axios
                .get("/inventario/listarsaldoalmacenitem/")
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosSaldoItem = [];
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                        me.datosSaldoItem = response.data.resultado;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        async listarDetalleSaldoItem(idItem) {
            let me = this;
            await axios
                .get("/inventario/listarsaldoitem/" + idItem)
                .then(function (response) {
                    if (response.data.resultado == null) {
                        me.datosSaldoAlmacenItem = [];
                        //console.log(response.data);
                    } else {
                        me.datosSaldoAlmacenItem = response.data.resultado;
                        //console.log(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },


        verAlmacenes(item){
            this.idtiem = item.iditem;
            this.listarDetalleSaldoItem(this.idtiem);
            this.saldoAlmacenItemModal = true;
        },

        closeSaldoAlmacenItemModal(){
            this.saldoAlmacenItemModal = false;
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


         llenarCamposItem(item) {
            this.botonActIt = 1;
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.descripcion = item.descripcion;
            this.limitecritico = item.limite;
            this.metodoValuacion = item.metodovaluacion;
            this.estado = item.estado;
            this.agregarItemModal = true;
        },



        llenarCamposTipoItem(item) {
            this.botonActTT = 1;
            this.idTipoItem = item.idtipodeitem;
            this.nombreTipoITem = item.nombretipoitem;
            this.estado = item.estado;
            this.agregarTipoItemModal = true;
        },

        llenarCamposInventario(item) {
            this.botonActInv = 1;
            this.idTransaccion = item.idTransaccion;
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.movimiento = item.movimiento;
            this.cantidad = item.cantidad;
            this.metodoValuacion = item.metodoValuacion;
            this.estado = item.estado;
            this.agregarInventarioModal = true;
        },
 


        showModalAgregarTransaccion(){
            this.agregarInventarioModal = true;
            this.botonActInv = 0;
        },

        closeModalAgregarTransaccion(){
            this.movimiento = null;
            this.agregarInventarioModal = false;
            this.limpiar();
        },

        showRevalorizarInventarioModal(){
            this.revalorizarInventario = true;
        },

        closeRevalorizarInventarioModal(){
            this.revalorizarInventario = false;
        },



        showModalAgregarItem(){
            this.agregarItemModal = true;
            this.botonActIt = 0;
        },

        closeModalAgregarItem(){
            this.agregarItemModal = false;
            this.limpiar();

        },

        openItemModal(){
            this.listarItems();
            this.itemModal = true;
        },

        closeItemModal(){
            this.itemModal = false;
        },

        openItemAlmacenModal(){
            this.listarDetalleStock(this.idAlmacen);
            this.itemAlmacenModal = true;
        },

        closeItemAlmacenModal(){
            this.itemAlmacenModal = false;
        },

        seleccionarItemAlmacen(item) {
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.cantidadMaxima = item.cantidad;
            this.cantidadMaximaItem = item.total; 
            this.itemAlmacenModal = false;
        },


        openItemDispModal(){
            this.listarItemDisp();
            this.itemDispModal = true;
        },

        closeItemDispModal(){
            this.itemDispModal = false;
        },

        seleccionarItemDisp(item) {
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.cantidadMaxima = item.cantidad;
            this.itemDispModal = false;
        },

        seleccionarItem(item) {
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.itemModal = false;
        },

        openItemPrecioModal(){
            this.listarValorItem();
            this.itemRevalModal = true;
        },

        seleccionarPrecioItem(item) {
            this.idItem = item.iditem;
            this.nombreItem = item.nombreitem;
            this.valor = item.valor;
            this.itemRevalModal = false;
        },

        closeItemPrecioModal(){
            this.itemRevalModal = false;
        },

        openAlmacenModal(){
            this.listarAlmacen();
            this.almacenModal = true;
        },

       

        closeAlmacenModal(){
            this.almacenModal = false;
        },

        openAlmacenConStockModal(){
            this.listarAlmacenconStock();
            this.almacenConStockModal = true;
        },

       

        closeAlmacenConStockModal(){
            this.almacenConStockModal = false;
        },

        seleccionarAlmacen(item) {
            this.idAlmacen = item.idalmacen;
            this.nombreAlmacen = item.nombrealmacen;
            this.almacenModal = false;
            this.almacenConStockModal = false;
        },


        openTipoModal(){
            this.listarTipoItems();
            this.tipoModal = true;
        },

        closeTipoModal(){
            this.tipoModal = false;
            this.limpiar();
        },

        seleccionarTipo(item){
            this.idTipoItem = item.idtipodeitem;
            this.nombreTipoITem = item.nombretipoitem;
            this.tipoModal = false;
        },


        showModalAgregarTipoItem(){
            this.agregarTipoItemModal = true;
            this.botonActTT = 0;  
        },

        closeModalAgregarTipoItem(){
            this.agregarTipoItemModal = false;
            this.limpiar();
            this.botonActTT = 0;
     
        },

        showModalActivarTipo(){
            this.listarTipoItemInactivo();
            this.activarTipoItemModal = true;  
        },

        closeModalActivarTipo(){
            this.activarTipoItemModal = false;
        },

        activar(item){
            this.idTipoItem = item.idtipodeitem;
            this.activarTipoItem(this.idTipoItem);
            this.activarTipoItemModal = false;
        },

        async activarTipoItem(idTipoItem) {
            let me = this;
            await axios
                .post("/inventario/activartipodeitem/" + this.idTipoItem).then(function (response) {

                    me.listarTipoItem();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    console.log(error);
                    me.snackbarError = true;
                });

        },
   


        limpiar () {
            this.$refs.form.reset();
            this.motivo='';
        },



        listarExistencia(){
            this.getListaExistencias();
        },

        getFormattedDate(oldDate) {

            let fecha = new Date(oldDate);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            if (dia < 10) dia = '0' + dia;
            if (mes < 10) mes = '0' + mes;

            let fechaFormateada = anio +'-' + mes + '-' + dia;

            return fechaFormateada;
        },

      
        async exportToCSV() {
            try {
                const response = await axios.get(`/inventario/listarinventarioreporte/`);
                const jsonData = response.data.resultado || [];
                
                const fields = [
                    { label: "Nombre Item", value: "nombreitem" },
                    { label: "ID Subcategoría", value: "id_subcategoria" },
                    { label: "Nombre Subcategoría", value: "nombresubcategoria" },
                    { label: "ID Categoría", value: "id_categoria" },
                    { label: "Nombre Categoría", value: "nombrecategoria" },
                    { label: "ID Almacén", value: "idalmacen" },
                    { label: "Nombre Almacén", value: "nombrealmacen" },
                    { label: "Proveedor", value: "nombreproveedor" },
                    { label: "Categoría Proveedor", value: "nombrecategoriaproveedor" },
                    { label: "Movimiento", value: "movimiento" },
                    { label: "Motivo", value: "motivo" },
                    { label: "Referencia", value: "referencia" },
                    { label: "Lote", value: "lote" },
                    { label: "Cantidad", value: "cantidad" },
                    { label: "Método Valuación", value: "metodoValuacion" },
                    { label: "Estado", value: "estado" },
                    { label: "Fecha", value: "fechaDeCreacion" }
                ];

                //Encuentra fechadecreacion para formatear su valor a DDmmYYYY
                const rows = jsonData.map(item =>
                fields.map(f => {
                    if (f.value === "fechaDeCreacion") {
                    return this.getFormattedDate(item[f.value]);
                    }
                    return item[f.value];
                })
                );

                const csvData = Papa.unparse({
                fields: fields.map(f => f.label),
                data: rows
                });
                const BOM = "\uFEFF";
                const blob = new Blob([BOM+csvData], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = "inventario.csv";
                link.click();
            } catch (error) {
                console.error(error);
            }
        },

        async exportToExcel() {
            try {
                const response = await axios.get(`/inventario/listarinventarioreporte/`);
                const jsonData = response.data.resultado || [];

                 const fields = [
                    { label: "Nombre Item", value: "nombreitem" },
                    { label: "ID Subcategoría", value: "id_subcategoria" },
                    { label: "Nombre Subcategoría", value: "nombresubcategoria" },
                    { label: "ID Categoría", value: "id_categoria" },
                    { label: "Nombre Categoría", value: "nombrecategoria" },
                    { label: "ID Almacén", value: "idalmacen" },
                    { label: "Nombre Almacén", value: "nombrealmacen" },
                    { label: "Proveedor", value: "nombreproveedor" },
                    { label: "Categoría Proveedor", value: "nombrecategoriaproveedor" },
                    { label: "Movimiento", value: "movimiento" },
                    { label: "Motivo", value: "motivo" },
                    { label: "Referencia", value: "referencia" },
                    { label: "Lote", value: "lote" },
                    { label: "Cantidad", value: "cantidad" },
                    { label: "Método Valuación", value: "metodoValuacion" },
                    { label: "Estado", value: "estado" },
                    { label: "Fecha", value: "fechaDeCreacion" }
                ];

                //Encuentra fechadecreacion para formatear su valor a DDmmYYYY
                const rows = jsonData.map(item =>
                    fields.map(f => {
                        if (f.value === "fechaDeCreacion") {
                        return this.getFormattedDate(item[f.value]);
                        }
                        return item[f.value];
                    })
                );


                const worksheet = XLSX.utils.aoa_to_sheet([
                fields.map(f => f.label), 
                ...rows                   
                ]);

                const workbook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de inventario");

                XLSX.writeFile(workbook, "inventario.xlsx", { compression: true });
            
            } catch (error) {
                console.error(error);
            }
        },


        async exportToPDF() {
            try {
                const response = await axios.get(`/inventario/listarinventarioactivo/`);
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(item => [
                    item.sku, 
                    item.nombreitem,
                    item.nombrealmacen,
                    item.movimiento,
                    item.cantidad,
                    item.motivo
                ]);
                const doc = new jsPDF();
                    const imageWidth = 30;
                    const imageHeight = 15;
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const xImage = pageWidth - imageWidth - 10;
                    const yImage = 10;
                    const yTitle = yImage + imageHeight + 10; 
                    const yTable = yTitle + 10; 
                    doc.addImage(logo, "PNG", xImage, yImage, imageWidth, imageHeight);
                    doc.setFontSize(16);
                    doc.setFont("helvetica", "bold");
                    doc.text("Detalle de Inventario", 10, yTitle);
                    doc.autoTable({ head: [["SKU", "Item", "Almacén", "Movimiento", "Cantidad", "Motivo"]], body: bodyData , startY: yTable});
                    doc.save("inventario.pdf");
            } catch (error) {
                console.error(error);
            }
            },


            async exportToPDFDetailed(item) {
            try {
                const response = await axios.get(`/inventario/listarstock/`+item.idalmacen);
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(data => [
                    data.nombreitem, 
                    data.descripcion,
                    data.nombretipoitem,
                    data.valor,
                    data.total
                ]);
                const doc = new jsPDF();
                    doc.text("Reporte de Almacén: "+item.nombrealmacen.charAt(0).toUpperCase() + item.nombrealmacen.slice(1).toLowerCase(), 10, 10);
                   doc.autoTable({ head: [["Item", "Descripción", "Tipo de Item", "Precio Unitario", "Stock"]], body: bodyData });
                    doc.save("inventario.pdf");
            } catch (error) {
                console.error(error);
            }
            },


            async exportToPDFProductDetailed(item) {
            try {
                const response = await axios.get(`/inventario/listarProductos/`+item.idalmacen);
                const jsonData = response.data.resultado || [];
                console.log(jsonData)
                const bodyData = jsonData.map(data => [
                    data.nombreprod, 
                    data.codprod,
                    data.nombretipo,
                    data.total
                ]);
                const doc = new jsPDF();
                    doc.text("Reporte de Almacén: "+item.nombrealmacen.charAt(0).toUpperCase() + item.nombrealmacen.slice(1).toLowerCase(), 10, 10);
                   doc.autoTable({ head: [["Producto", "Código de Producto", "Tipo de Producto",  "Cantidad"]], body: bodyData });
                    doc.save("inventario.pdf");
            } catch (error) {
                console.error(error);
            }
            },

            checkAccess(accesoCorrecto, tipoCorrecto) {
                //this.user = JSON.parse(sessionStorage.getItem('session'));
                if (this.user == null) {
                    return false;
                }
                else {
                    let checkedAccess = false;
                    let checkedType = false;
                    //Si accesoCorrecto es 0, no se requiere ningun acceso para acceder
                    if (accesoCorrecto != 0) {
                    this.user['accesos'].forEach(access => {
                        if (access == accesoCorrecto)
                        checkedAccess = true;
                    });
                    } else checkedAccess = true;

                    //Si tipoCorrecto es '0', no se requiere ningun tipo de cuenta para acceder
                    if (tipoCorrecto != '0') {
                    if (this.user['tipo'] == tipoCorrecto) {
                        checkedType = true;
                    }
                    } else checkedType = true;
                    if (checkedAccess && checkedType) { return true }
                    else return false;
                }

                },
         //#endregion
       },

 };
 
 </script>
 