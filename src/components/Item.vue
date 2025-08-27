<template>
    <v-card elevation="5" outlined >
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
            <v-alert  v-if="existencias==false" 
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
            <v-alert     v-if="existencias==true"      
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
                 <h3>ÍTEMS</h3>
             </v-alert>
         </div>
         <div>
             <v-form ref="form" v-model="valid" lazy-validation>
                 <v-container>
                     <v-row >
                         <v-col cols="12" md="4">
                             <v-btn color="success" @click="showModalAgregarItem()">NUEVO ÍTEM</v-btn>
                         </v-col>
                         <v-col cols="12">
                             <v-list-item>
                                 <v-list-item-title class="text-center">
                                     <h5>ÍTEMS</h5>
                                 </v-list-item-title>
                             </v-list-item>
 
                             <v-card-title>
                                <v-text-field v-model="searchItem" append-icon="mdi-magnify" label="BUSCAR ÍTEMS"
                                     single-line hide-details></v-text-field>
                             </v-card-title>
 
                             <v-data-table :headers="headerItem" :items="datosItem" :search="searchItem"
                                 :items-per-page="5" class="elevation-1" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>

                                <template #[`item.fechaExpiracion`]="{ item }">
                                        {{ getFormattedDate(item.fechaExpiracion) }}
                                    </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposItem(item)"
                                         title="ACTUALIZAR INFORMACIÓN">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR SECCION">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionIt(item)"
                                         title="DESACTIVAR SECCION">
                                         mdi-close-circle
                                     </v-icon>             
                                 </template>
 
                               
 
 
                             </v-data-table>
                         </v-col>
                     </v-row>
                     <v-row >
                         <v-col cols="12" md="2">
                             <v-btn color="success" @click="showModalAgregarCategoria()">NUEVA CATEGORÍA</v-btn>  
                         </v-col>
                         <v-col cols="12" md="12">
                            <v-btn color="primary" @click="showModalActivarCategoria()">LISTA DE ÍTEMS DESACTIVADOS</v-btn>
                         </v-col>
                         <v-col cols="12">
                             <v-list-item>
                                 <v-list-item-title class="text-center">
                                     <h5>CATEGORÍAS</h5>
                                 </v-list-item-title>
                             </v-list-item>
 
                             <v-card-title>
                                <v-text-field v-model="searchCategoria" append-icon="mdi-magnify" label="BUSCAR CATEGORÍA DE ÍTEM"
                                     single-line hide-details></v-text-field>
                             </v-card-title>
 
                             <v-data-table :headers="headerCategoria" :items="datoscategoria" :search="searchCategoria"
                                 :items-per-page="5" class="elevation-1" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposCategoria(item)"
                                         title="ACTUALIZAR INFORMACIÓN">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR CATEGORÍA">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionCat(item)"
                                         title="DESACTIVAR CATEGORÍA">
                                         mdi-close-circle
                                     </v-icon>             
                                 </template>
 
                               
 
 
                             </v-data-table>
                         </v-col>
                     </v-row>

                     <v-row >
                         <v-col cols="12" md="2">
                             <v-btn color="success" @click="showModalAgregarSubcategoria()">NUEVA SUBCATEGORÍA</v-btn>  
                         </v-col>
                        
                         <v-col cols="12">
                             <v-list-item>
                                 <v-list-item-title class="text-center">
                                     <h5>SUBCATEGORÍAS</h5>
                                 </v-list-item-title>
                             </v-list-item>
 
                             <v-card-title>
                                <v-text-field v-model="searchSubcategoria" append-icon="mdi-magnify" label="BUSCAR SUBCATEGORÍAS"
                                     single-line hide-details></v-text-field>
                             </v-card-title>
 
                             <v-data-table :headers="headersubcategoria" :items="datossubcategoria" :search="searchSubcategoria"
                                 :items-per-page="5" class="elevation-1" id="tableId">
 
                                 <template #[`item.estado`]="{ item }">
                                     <v-chip :color="getColor(item.estado)" dark>
                                         {{ item.estado }}
                                     </v-chip>
                                 </template>
 
                                 <template #[`item.actions`]="{ item }">
                                     <v-icon class="mr-2" color="primary" x-large  @click="llenarCamposSubcategoria(item)"
                                         title="ACTUALIZAR INFORMACIÓN">
                                         mdi-pencil
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'INACTIVO'" x-large color="success" class="mr-2" @click="activar(item)"
                                         title="ACTIVAR SUBCATEGORÍA">
                                         mdi-check-circle-outline
                                     </v-icon>
                                     <v-icon v-if="item.estado == 'ACTIVO'" x-large color="error" class="mr-2" @click="confirmacionAnulacionSub(item)"
                                         title="DESACTIVAR SUBCATEGORÍA">
                                         mdi-close-circle
                                     </v-icon>             
                                 </template>
 
                               
 
 
                             </v-data-table>
                         </v-col>
                     </v-row>
 
                 </v-container>
             </v-form>
   
 
         </div>

         <v-dialog v-model="activarCategoriaModal" persistent max-width="800px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA CATEGORÍAS INACTIVAS</span><br>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-list-item>
                                        <v-list-item-title class="text-center">
                                            <h5>CATEGORÍAS</h5>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-card-title>
                                        <v-text-field v-model="buscarCategoria" append-icon="mdi-magnify"
                                            label="BUSCAR CATEGORÍAS" single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headerCategoria" :items="datoscategoriaInactivos"
                                        :search="buscarCategoria" :items-per-page="5" class="elevation-1" id="tableId">

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
                                        @click="closeModalActivarCategoria()" style="float: right" title="SALIR">
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
                                        <v-icon small class="mr-2" @click="seleccionarItem(item)">
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
                                        <v-icon small class="mr-2" @click="seleccionarItemDisp(item)">
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
                                        <v-icon small class="mr-2" @click="seleccionarPrecioItem(item)">
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
        <v-dialog v-model="CategoriaModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE CATEGORÍAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchCategoria" append-icon="mdi-magnify" label="BUSCAR CATEGORÍAS DISPONIBLES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerCategoria" :items="datoscategoria" :search="searchCategoria"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon v-if="seleccionarCategoriaTabla==true" small class="mr-2" @click="seleccionarCategoriaItem(item)">
                                            mdi-eye-circle
                                        </v-icon>
                                         <v-icon v-if="seleccionarCategoriaTabla==false" small class="mr-2" @click="seleccionarCategoriaSubcategoria(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeCategoriaModal()" style="float: right"
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


<v-dialog v-model="SubcategoriaModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA DE CATEGORIÍAS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchSubcategoria" append-icon="mdi-magnify" label="BUSCAR CATEGORÍAS DISPONIBLES"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headersubcategoria" :items="datossubcategoria" :search="searchSubcategoria"
                                    :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarSubcategoria(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeSubcategoriaModal()" style="float: right"
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
                                <v-col cols="12" md="3">
                                    <v-select
                                    label="MEDIDA"  v-model="medida" @input="medida =medida.toUpperCase()" required
                                    :items="medidaItems" 
                                    :rules="medidaRules"
                                    ></v-select>
                                </v-col>    
                                <v-col  cols="12" md="4">
                                    <v-text-field v-model="nombreSubcategoria" label="NOMBRE SUBCATEGORÍA" :counter="60"
                                        :rules="nombreSubcategoriaRules" @input="nombreSubcategoria = nombreSubcategoria.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col v-if="botonActIt == 0" cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreRules"
                                        @click="openCategoriaModal('item')" style="float: right" title="BUSCAR CATEGORÍA">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col> 
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="limitecritico" label="LIMITE CRÍTICO" type="number" :counter="25"
                                         @input="limitecritico = limitecritico" :rules="limiteRules"
                                        required></v-text-field>
                                </v-col> 
                                <v-col cols="12" md="4">
                                    <v-select
                                    label="METODO VALUACION" v-model="metodoValuacion" @input="metodoValuacion = metodoValuacion.toUpperCase()" required
                                    :items="['PEPS', 'UEPS', 'PROMEDIO PONDERADO']"
                                    :rules="[v => !!v || 'El Metodo de Valuación es requerido']"
                                    ></v-select>
                                </v-col> 
                                 <v-col  cols="12" md="3">
                                    <v-text-field v-model="nombreProveedor" label="NOMBRE PROVEEDOR" :counter="60"
                                        :rules="nombreProveedorRules" @input="nombreProveedor = nombreProveedor.toUpperCase()"
                                        disabled required></v-text-field>
                                </v-col>
                                <v-col v-if="botonActIt == 0" cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreProveedorRules"
                                        @click="openProveedorModal()" style="float: right" title="BUSCAR PROVEEDOR">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>   
                                 <v-col cols="12" md="4">
                                    <v-menu v-model="menuFecha" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="fechaVencimiento" label="FECHA DE VENCIMIENTO"
                                                prepend-icon="mdi-calendar" readonly required :rules="fechaRules"
                                                v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="fechaVencimiento" @input="menuFecha = false" locale="es"
                                            color="blue lighten-1" header-color="primary"
                                            :min="getDate()"></v-date-picker>
                                    </v-menu>
                                </v-col>          
                                 <v-col cols="12" md="4">
                                    <v-text-field v-model="costoReferencia" label="COSTO REFERENCIA" type="number" :counter="25"
                                         @input="costoReferencia = costoReferencia" :rules="costoRules"
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


        <v-dialog v-model="proveedorModal" persistent :overlay="false" max-width="900px">
            <v-card elevation="5" outlined shaped>
                <v-card-title>
                    <span>LISTA PROVEEDORES ACTIVOS</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title>
                                    <v-text-field v-model="searchProveedor" append-icon="mdi-magnify"
                                        label="BUSCAR PROVEEDOR ACTIVO" single-line hide-details></v-text-field>
                                </v-card-title>
                            </v-col>

                            <v-col cols="12">
                                <v-data-table :headers="headerProveedor" :items="datosProveedor"
                                    :search="searchProveedor" :items-per-page="5" class="elevation-1" id="tableId">
                                    <template #[`item.actions`]="{ item }">
                                        <v-icon small class="mr-2" @click="seleccionarProveedor(item)">
                                            mdi-check-circle
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="10"></v-col>
                            <v-col cols="2">
                                <v-btn class="mx-2" iconv dark color="#00A1B1"
                                        @click="closeProveedorModal()" style="float: right"
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

         <v-dialog v-model="agregarCategoriaModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>CATEGORÍA</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreCategoria" label="NOMBRE CATEGORÍA" :counter="60"
                                        :rules="nombreCategoriaRules" @input="nombreCategoria = nombreCategoria.toUpperCase()"
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
                                            <v-btn icon v-if="botonActTT == 1" color="#0A62BF" @click="editarCategoria()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonActTT == 0" color="#0ABF55" @click="registrarCategoria()" 
                                                style="float: left" title="REGISTRAR Categoria DE ÍTEM" class="mx-2" large>
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
                                        @click="closeModalAgregarCategoria()" style="float: right" title="SALIR">
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


         <v-dialog v-model="agregarSubcategoriaModal" persistent :overlay="false" max-width="1000px">
            <v-card elevation="5" outlined>
                <v-card-title>
                    <span>SUBCATEGORÍAS</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="nombreSubcategoria" label="NOMBRE SUBCATEGORÍA" :counter="60"
                                        :rules="nombreSubcategoriaRules" @input="nombreSubcategoria = nombreSubcategoria.toUpperCase()"
                                        required></v-text-field>
                                </v-col>         
                                 <v-col cols="12" md="1">
                                    <v-btn class="mx-2" fab dark x-small color="cyan" :rules="nombreCategoriaRules"
                                        @click="openCategoriaModal('tipo')" style="float: right" title="BUSCAR CATEGORÍA">
                                        <v-icon dark> mdi-magnify </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field v-model="nombreCategoria" label="NOMBRE CATEGORÍA" :counter="60"
                                        :rules="nombreCategoriaRules" @input="nombreCategoria = nombreCategoria.toUpperCase()"
                                        disabled required></v-text-field>
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
                                            <v-btn icon v-if="botonActTT == 1" color="#0A62BF" @click="editarSubcategoria()"
                                                style="float: left" title="ACTUALIZAR INFORMACIÓN" class="mx-2" large>
                                                <v-icon dark> mdi-pencil </v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="botonActTT == 0" color="#0ABF55" @click="registrarSubcategoria()" 
                                                style="float: left" title="REGISTRAR SUBCATEGORIA" class="mx-2" large>
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
                                        @click="closeModalAgregarSubcategoria()" style="float: right" title="SALIR">
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


        

        <v-dialog v-model="confirmacionAnulacionCategoria" persistent :overlay="false" max-width="1000px">
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
                                        @click="anularCategoria()" style="float: right" title="ANULAR Categoria">
                                        <v-icon dark> mdi-close-circle-outline </v-icon>
                                        ANULAR
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn class="mx-2"  dark x-big color="#00A1B1"
                                        @click="closeAnulacionCategoria()" style="float: right" title="SALIR">
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


        
     



       


     </v-card>
     
 
 </template>
 <script>
 import axios from "axios";
 import * as XLSX from 'xlsx';

 import Papa from "papaparse";

 import jsPDF from "jspdf";
 import 'jspdf-autotable';

 export default {
     data() {
         return {

            drawer: false,
            user: { id_usuario: 0, usuario: '', accesos: [], Categoria: '', nombres: '', paterno: '', materno: '' },

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


            menuFecha: false,


             nombreItem:"",
             descripcion:"",
             medida:"",

            medidaItems: [
            { text: "TONELADAS (t)",        value: "TONELADAS" },
            { text: "KILOGRAMOS (kg)",      value: "KILOGRAMOS" },
            { text: "METROS CÚBICOS (m³)",  value: "M3" },
            { text: "LITROS (L)",           value: "LITROS" },
            { text: "UNIDADES (u)",         value: "UNIDADES" },
            { text: "GALÓN (gal)",          value: "GALON" },
            { text: "TONELADAS LARGAS (lt)",value: "TONELADAS_LARGAS" },
            { text: "TONELADAS CORTAS (st)",value:"TONELADAS_CORTAS"},
            { text: "GRAMOS (g)",           value: "GRAMOS" },
            { text: "MILILITROS (mL)",      value: "MILILITROS" },
            { text: "METROS (m)",           value: "METROS" },
            { text: "METROS CUADRADOS (m²)",value: "M2" }
            ],


             estIt:"",

             idCategoria:0,
             nombreCategoria: "",
             nombreSubcategoria: "",
             seleccionarCategoriaTabla: false,
             estTT: "",

            proveedorModal: false,
            idProveedor: 0,
            nombreProveedor: "",

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
             nombreCategoriaRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DE LA CATEGORÍA.",
               (v) =>
               (v && v.length <= 60) ||
                 "EL NOMBRE DE LA CATEGORÍA NO DEBE SOBREPASAR LOS 60 CARACTERES.",
             ],
            nombreSubcategoriaRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DE LA SUBCATEGORÍA.",
               (v) =>
               (v && v.length <= 60) ||
                 "EL NOMBRE DE LA SUBCATEGORÍA NO DEBE SOBREPASAR LOS 60 CARACTERES.",
             ],
             nombreAlmacenRules: [
               (v) => !!v || "SE REQUIERE EL NOMBRE DEL ALMACÉN.",
               (v) =>
               (v && v.length <= 60) ||
                 "EL NOMBRE DEL ALMACÉN NO DEBE SOBREPASAR LOS 60 CARACTERES.",
             ],
             cantidadSalidaRules: [
               (v) => !!v || "SE REQUIERE LA CANTIDAD.",
               (v) => ( Number(v) >= 1 && Number(v) <= this.cantidadMaximaItem ) || 'EL NÚMERO NO DEBE SOBREPASAR '+ this.cantidadMaximaItem,
             ],

             cantidadEntradaRules: [
               (v) => !!v || "SE REQUIERE LA CANTIDAD.",
               (v) => ( Number(v) >= 1 && Number(v) <= this.cantidadMaxima ) || 'EL NÚMERO NO DEBE SOBREPASAR '+ this.cantidadMaxima,
             ],

            valorRules: [
                (v) => parseFloat(v) >= 0 || "EL VALOR DEBE SER MAYOR A 0.",
                (v) => !!v || "EL VALOR ES OBLIGATORIO.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO."
            ],
             medidaRules: [
                v => !!v || "LA MEDIDA ES OBLIGATORIA.",
                v => ['LITROS', 'KILOGRAMOS', 'MILILITROS', 'TONELADAS', 'GRAMOS','M3','GALON', 'UNIDADES','TONELADAS_LARGAS','TONELADAS_CORTAS','M2','METROS'].includes(v) || "SELECCIONA UNA MEDIDA VÁLIDA."
            ],

            limiteRules: [
                (v) => !!v || "EL LIMITE ES OBLIGATORIO.",
                (v) => parseFloat(v) > 0 || "EL LIMITE DEBE SER MAYOR A 0.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO."
            ],
                        
            descripcionRules: [
                (v) => !!v || "SE REQUIERE LA DESCRIPCIÓN.",
                (v) => (v === null || v.length <= 150) || "LA DESCRIPCIÓN NO DEBE SUPERAR LOS 150 CARACTERES.",
            ],
             phone1Rules: [
               (v) => !!v || "SE REQUIERE UN NUMERO TELEFONICO O CELULAR.",
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
                (v) => parseFloat(v) > 0 || "EL COSTO DEBE SER MAYOR A 0.",
                (v) => !!v || "EL COSTO ES OBLIGATORIO.",
                (v) => !isNaN(parseFloat(v)) && isFinite(v) || "INGRESA UN VALOR NUMÉRICO VÁLIDO."
            ],
              
             datosInventario: [],
             headerInventario: [
                 
                 { text: "NUMERO TRANSACCIÓN", value: "idTransaccion", sortable: true },
                 { text: "ÍTEM", value: "nombreitem", sortable: true },
                 { text: "ALMACÉN", value: "nombrealmacen", sortable: true },
                 { text: "MOVIMIENTO", value: "movimiento", sortable: true },
                 { text: "CANTIDAD", value: "cantidad", sortable: true },
                 { text: "METODO DE VALUACIÓN", value: "metodoValuacion", sortable: true },
                 //{ text: "ESTADO", value: "estado", sortable: true },
                 //{ text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],

            datosAlmacen:[],
            headerAlmacen: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                
                { text: "NOMBRE DE ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "DESCRIPCIÓN DE ALMACÉN", value: "descripcion", sortable: true },
                { text: "CÓDIGO ALMACÉN", value: "codigo", sortable: true },
                { text: "ESTADO", value: "estado", sortable: true },
                { text: "ACCIONES", value: "actions", sortable: false }
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
                { text: "ACCIONES", value: "actions", sortable: false },
                //{ text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],
            searchStockAlmacen: "",

            datosStock: [],
            headerStock: [   
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "CATEGORÍA", value: "nombreCategoria", sortable: true },
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
                { text: "Categoria", value: "nombreCategoria", sortable: true },
                { text: "TOTAL", value: "total", sortable: false },
            ],
           
            searchProductoAlmacen: "",
            detalleProductosAlmacenados: false,
 
             datosItem: [],
             headerItem: [
                 { text: "CÓDIGO SKU", value: "sku", sortable: true },
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "MEDIDA", value: "medida", sortable: true },
                 { text: "CATEGORÍA", value: "nombrecategoria", sortable: true },
                 { text: "SUBCATEGORÍA", value: "nombresubcategoria", sortable: true },
                 { text: "LIMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "METODO DE VALUACIÓN", value: "metodovaluacion", sortable: true },
                 { text: "ESTADO", value: "estado", sortable: true },
                 { text: "PROVEEDOR", value: "nombreProveedor", sortable: true },
                 { text: "FECHA EXP.", value: "fechaExpiracion", sortable: true },
                 { text: "COSTO REF", value: "costoReferencia", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],

            headerCategoria: [  
                 { text: "CATEGORÍA", value: "categoria", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],

            datossubcategoria: [],
            headersubcategoria: [  
                 { text: "SUBCATEGORÍA", value: "subcategoria", sortable: true },
                 { text: "CATEGORÍA", value: "categoria", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
 
             datoscategoria: [],
             datoscategoriaInactivos: [],
             


             datosItemDisponibles: [],
             headerItemDisponibles: [
                 
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "MEDIDA", value: "medida", sortable: true },
                 { text: "CATEGORÍA", value: "nombreCategoria", sortable: true },
                 { text: "LIMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "METODO DE VALUACIÓN", value: "metodovaluacion", sortable: true },
                 { text: "CANTIDAD", value: "cantidad", sortable: true },
                 { text: "PRECIO UNITARIO", value: "valor", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
             searchItemDisponibles: "",
             itemDispModal: false,
             cantidadMaxima : 0,
             cantidadMaximaItem: 0,

             itemRevalModal: false,
             datosItemPrecio: [],
             headerItemPrecio: [
                 
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "CATEGORÍA", value: "nombreCategoria", sortable: true },
                 { text: "CANTIDAD", value: "total", sortable: true },
                 { text: "PRECIO UNITARIO", value: "valor", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],

             
             datosItemAlmacen: [],
             headerItemAlmacen: [
                 
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "CATEGORÍA", value: "nombreCategoria", sortable: true },
                 { text: "LIMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "METODO DE VALUACIÓN", value: "metodovaluacion", sortable: true },
                 { text: "CANTIDAD", value: "total", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
                 //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
             ],
             searchItemAlmacen: "",
             itemAlmacenModal: false,

             activarCategoriaModal:false,

 
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
 
             buscarCategoria: "",
             searchCategoria: "",
             agregarCategoriaModal: false,
             confirmacionAnulacionCategoria: false,

             buscarSubcategoria: "",
             searchSubcategoria: "",
             agregarSubcategoriaModal: false,
             confirmacionAnulacionSubcategoria: false,



             itemModal:false,
             CategoriaModal:false,
             SubcategoriaModal:false,

             botonActInv:0,
             botonActIt:0,
             botonActTT:0,


             saldoAlmacenItemModal: false,

             datosSaldoItem: [],
             headerSaldoItem: [
                 
                 { text: "NOMBRE ÍTEM", value: "nombreitem", sortable: true },
                 { text: "DESCRIPCIÓN", value: "descripcion", sortable: true },
                 { text: "CATEGORÍA", value: "nombreCategoria", sortable: true },
                 { text: "LIMITE CRÍTICO", value: "limite", sortable: true },
                 { text: "CANTIDAD", value: "total", sortable: true },
                 { text: "ACCIONES", value: "actions", sortable: false }
             ],
             datosSaldoAlmacenItem: [],
             headerSaldoAlmacenItem: [
                { text: "CÓDIGO ALMACÉN", value: "codigo", sortable: true },
                { text: "NOMBRE DE ALMACÉN", value: "nombrealmacen", sortable: true },
                { text: "TOTAL", value: "total", sortable: true },
            ],


            searchProveedor: "",
            datosProveedor: [],
            headerProveedor: [
                //{ text: "NOMBRE DE PROVEEDOR", value: "idprv", sortable: true },
                { text: "NOMBRE DE PROVEEDOR", value: "nomprv", sortable: true },
                { text: "NIT", value: "nit", sortable: true },
                { text: "RAZÓN SOCIAL", value: "raz", sortable: true },
                { text: "CATEGORÍA", value: "cat", sortable: true },
                { text: "PAIS", value: "pais", sortable: true },
                { text: "CONTACTO PRINCIPAL DE PROVEEDOR", value: "cto1pro", sortable: true },
                { text: "CONTACTO SECUNDARIO DE PROVEEDOR", value: "cto2pro", sortable: true },
                { text: "CORREO DE PROVEEDOR", value: "croprov", sortable: true },
                { text: "ESTADO", value: "est", sortable: true },
                { text: "ARCHIVO", value: "arch", sortable: false },
                { text: "ACCIONES", value: "actions", sortable: false }
                //{ text: "FECHA MODIFICACION", value: "fechmod", sortable: false },
            ],

             snackbarOK: false,
             snackbarError : false,
             //#endregion
         }
     },
     created: function (){
       this.listarInventario();
       this.listarItem();
       this.listarCategoria();
       this.listarSubcategorias();
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

        getDate() {
            var fecha = new Date().toISOString();
            return fecha;
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
           /* if(this.movimiento == 'SALIDA'){
                this.registrarInventarioSalida(this.idItem, this.movimiento,this.cantidad,this.metodovaluacion, this.estado);
            }
            else{*/
                if (this.$refs.form.validate()) {
                this.registrarInventarioEntrada(this.idItem,this.idAlmacen, this.movimiento,this.cantidad, this.estado);
                }
            //}
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
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.closeModalAgregarTransaccion();
                    me.listarInventarios();
                    me.listarStockAlmacen();
                    me.limpiar();
                })
                .catch(function (error) {
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
                    this.estado
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

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.closeRevalorizarInventarioModal();
                    me.listaritemactivo();
                    me.limpiar();
                })
                .catch(function (error) {
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
           let me = this;
           await axios
             .get("/inventario/listaritemdisponibles/")
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

        formatText(text, len) {
        const s = (text ?? '')
            .normalize('NFD')               
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase();                 

        return Number.isInteger(len) ? s.slice(0, len) : s;
        },

        timeSuffixDDhhmm(date = new Date()) {
            const pad2 = n => String(n).padStart(2, '0');
            const DD   = pad2(date.getDate());
            const hh   = pad2(date.getHours());
            const mm   = pad2(date.getSeconds());
            return `${DD}${hh}${mm}`;
        },


         generateSKU(){
            var text = "";
            const nombre = this.formatText(this.nombreItem,4);
            const subcat = this.formatText(this.nombreSubcategoria,3);
            const cat = this.formatText(this.nombreCategoria,3);
            const prov = this.formatText(this.nombreProveedor,4);
            const time = this.timeSuffixDDhhmm(); 
            
            const prefix = subcat + '-' +  cat+ '-' + nombre + '-' + prov;
            this.sku = prefix + '-' + time;
         },

         registrarIt() {
            if (this.$refs.form.validate()) {
            this.generateSKU();
            this.registrarItem(this.nombreItem, this.descripcion,this.medida,this.idSubcategoria,this.limitecritico, this.metodoValuacion, this.estado, this.idProveedor,this.costoReferencia, this.fechaVencimiento);
            }
        },
        async registrarItem(
            nombreItem,
            descripcion,
            medida,
            idCategoria,
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
                    this.idsubcategoria +
                    "," +
                    this.limitecritico +
                    "," +
                    this.metodoValuacion+
                    "," +
                    this.sku +
                    "," +
                    this.idProveedor +
                    "," +
                    this.fechaVencimiento+
                    "," +
                    this.costoReferencia
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
                    this.medida +
                    "," +
                    this.estado +
                    "," +
                    this.idsubcategoria +
                    "," +
                    this.limitecritico +
                    "," +
                    this.metodoValuacion+
                    "," +
                    this.sku +
                    "," +
                    this.idProveedor +
                    "," +
                    this.fechaVencimiento+
                    "," +
                    this.costoReferencia
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

 
         listarCategoria() {
             this.listarCategorias();
         },
         async listarCategorias() {
           let me = this;
           await axios
             .get("/inventario/listarcategoriaactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datoscategoria = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datoscategoria = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         listarCategoriaInactivo() {
             this.listarCategoriasInactivos();
         },
         async listarCategoriasInactivos() {
           let me = this;
           await axios
             .get("inventario/listarcategoriainactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datoscategoriaInactivos = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datoscategoriaInactivos = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         registrarCategoria() {
            if (this.$refs.form.validate()) {
                this.registrarCategorias(this.nombreCategoria, this.estado);
            }            
        },
        async registrarCategorias(
            nombreCategoria,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregarcategoria/" +
                    this.nombreCategoria +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCategorias();
                    me.closeModalAgregarCategoria();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarCategoria() {
            if (this.$refs.form.validate()) {
            this.editarCategoria( this.idCategoria,this.nombreCategoria, this.estado);
            this.botonActTT = 0;
            }
        },
        async editarCategoria(
            idCategoria,
            nombreCategoria,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizarcategoria/" +
                    this.idCategoria +
                    "," +
                    this.nombreCategoria +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCategorias();
                    me.closeModalAgregarCategoria();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },

        //Subcategoría

        

         registrarSubcategoria() {
            if (this.$refs.form.validate()) {
                this.registrarSubcategorias(this.nombreSubcategoria,this.idCategoria, "ACTIVO");
            }            
        },
        async registrarSubcategorias(
            nombreCategoria,
            idcategoria,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/agregarsubcategoria/" +
                    nombreCategoria +
                    "," +
                    idcategoria +
                    "," +
                    estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarSubcategorias();
                    me.closeModalAgregarSubcategoria();
                })
                .catch(function (error) {
                    me.snackbarError = true;

                });

        },

        editarSubcategorias() {
            if (this.$refs.form.validate()) {
            this.editarCategoria( this.idCategoria,this.nombreCategoria, this.estado);
            this.botonActTT = 0;
            }
        },
        async editarSubcategoria(
            idCategoria,
            nombreCategoria,
            estado
        ) {
            let me = this;
            await axios
                .post(
                    "/inventario/actualizarcategoria/" +
                    this.idCategoria +
                    "," +
                    this.nombreCategoria +
                    "," +
                    this.estado
                )
                .then(function (response) {

                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                    me.listarCategorias();
                    me.closeModalAgregarCategoria();
                })
                .catch(function (error) {
                    me.snackbarError = true;
                    alert('error');
                });

        },



        confirmacionAnulacionCat(item){
            this.idCategoria = item.idcategoria;
            this.confirmacionAnulacionCategoria = true;
        },
        closeAnulacionCategoria(){
            this.confirmacionAnulacionCategoria = false;
        },
        anularCategoria() {
            this.desactivarCategoria(this.idCategoria);
            this.confirmacionAnulacionCategoria = false;
            this.listarCategoria();
        },
        async desactivarCategoria(idCategoria) {
            let me = this;
            await axios
                .post("/inventario/eliminarcategoria/" + this.idCategoria).then(function (response) {
                    me.listarCategorias();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    console.log(error);
                    alert('error')
                    me.snackbarError = true;
                });

        },


         listarSubcategoria() {
             this.listarSubcategorias();
         },
         async listarSubcategorias() {
           let me = this;
           await axios
             .get("/inventario/listarsubcategoriaactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datossubcategoria = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datossubcategoria = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

         listarSubcategoriaInactivo() {
             this.listarSubcategoriasInactivos();
         },
         async listarSubcategoriasInactivos() {
           let me = this;
           await axios
             .get("inventario/listarsubcategoriainactivo/")
             .then(function (response) {
               if (response.data.resultado == null) {
                 me.datossubcategoriaInactivos = [];
                 console.log(response.data);
               } else {
                 console.log(response.data);
                 me.datossubcategoriaInactivos = response.data.resultado;
               }
             })
             .catch(function (error) {
               console.log(error);
             });
         },

       



        confirmacionAnulacionTip(item){
            this.idSubcategoria = item.idsubcategoria;
            this.confirmacionAnulacionSubcategoria = true;
        },
        closeAnulacionSubcategoria(){
            this.confirmacionAnulacionSubcategoria = false;
        },
        anularSubcategoria() {
            this.desactivarSubcategoria(this.idSubcategoria);
            this.confirmacionAnulacionSubcategoria = false;
            this.listarSubcategoria();
        },
        async desactivarSubcategoria(idSubcategoria) {
            let me = this;
            await axios
                .post("/inventario/eliminarsubcategoria/" + this.idSubcategoria).then(function (response) {
                    me.listarSubcategorias();
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
            this.idsubcategoria = item.id_subcategoria;
            this.nombreSubcategoria = item.nombresubcategoria;
            this.idCategoria = item.id_categoria;
            this.nombreCategoria = item.categoria;
            this.idProveedor = item.idProveedor;
            this.nombreProveedor = item.nombreProveedor;
            this.limitecritico = item.limite;
            this.metodoValuacion = item.metodovaluacion;
            this.medida = item.medida;
            this.sku = item.sku;
            this.fechaVencimiento = this.getFormattedDate(item.fechaExpiracion);
            this.costoReferencia = item.costoReferencia;
            this.estado = item.estado;
            this.agregarItemModal = true;
        },



        llenarCamposCategoria(item) {
            this.botonActTT = 1;
            this.idCategoria = item.idcat;
            this.nombreCategoria = item.categoria;
            this.estado = item.est;
            this.agregarCategoriaModal = true;
        },

        llenarCamposSubcategoria(item) {
            this.botonActTT = 1;
            this.seleccionarCategoriaTabla = false;
            this.idsubcategoria = item.idsubcategoria;
            this.nombreSubcategoria = item.subcategoria;
            this.idCategoria = item.id_categoria;
            this.nombreCategoria = item.categoria;
            this.estado = item.estado;
            this.agregarSubcategoriaModal = true;
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
            this.limpiar();
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


        openCategoriaModal(tipo)
        {
            if (tipo === 'item') {
                this.seleccionarCategoriaTabla = true;
            } else {
                 this.seleccionarCategoriaTabla = false;
            }
            this.listarCategorias();
            this.CategoriaModal = true;
        },

        closeCategoriaModal(){
            this.CategoriaModal = false;
        },

        closeSubcategoriaModal(){
            this.SubcategoriaModal = false;
        },

        openProveedorModal() {
            this.listarProveedores();
            this.proveedorModal = true;
        },

        closeProveedorModal() {
            this.proveedorModal = false;
        },

        seleccionarProveedor(item) {
            this.idProveedor = item.idprv;
            this.nombreProveedor = item.nomprv;
            this.proveedorModal = false;
        },


        seleccionarCategoriaItem(item){
            this.idCategoria = item.idcat;
            this.nombreCategoria = item.categoria;
            this.listarSubcategoriasDe(item.idcat);
            this.SubcategoriaModal = true;
        },

        async listarSubcategoriasDe(idCat) {
          let me = this;
          await axios
            .get("/inventario/listarsubcateriasde/"+idCat)
            .then(function (response) {
              if (response.data.resultado == null) {
                me.datossubcategoria = [];
              } else {
                me.datossubcategoria = response.data.resultado;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },

         seleccionarCategoriaSubcategoria(item){

            this.idCategoria = item.idcat;
            this.nombreCategoria = item.categoria;
            this.CategoriaModal = false;
        },

          seleccionarSubcategoria(item){
            this.idsubcategoria = item.id_subcategoria;
            this.nombreSubcategoria = item.subcategoria;
            this.SubcategoriaModal = false;
            this.CategoriaModal = false;
        },


        showModalAgregarCategoria(){
            this.agregarCategoriaModal = true;
            this.botonActTT = 0;  
        },

        closeModalAgregarCategoria(){
            this.agregarCategoriaModal = false;
            this.limpiar();
            this.botonActTT = 0;
     
        },

        showModalAgregarSubcategoria(){
            this.agregarSubcategoriaModal = true;
            this.botonActTT = 0;  
        },

        closeModalAgregarSubcategoria(){
            this.agregarSubcategoriaModal = false;
            this.limpiar();
            this.botonActTT = 0;
     
        },

        showModalActivarCategoria(){
            this.listarCategoriaInactivo();
            this.activarCategoriaModal = true;  
        },

        closeModalActivarCategoria(){
            this.activarCategoriaModal = false;
        },

        activar(item){
            this.idCategoria = item.idcategoria;
            this.activarCategoria(this.idCategoria);
            this.activarCategoriaModal = false;
        },

        async activarCategoria(idCategoria) {
            let me = this;
            await axios
                .post("/inventario/activarcategoria/" + this.idCategoria).then(function (response) {

                    me.listarCategoria();
                    me.mensajeSnackbar = response.data.message;
                    me.snackbarOK = true;
                })
                .catch(function (error) {
                    console.log(error);
                    me.snackbarError = true;
                });

        },
   


        limpiar () {
            this.$refs.form.reset()
        },



        listarExistencia(){
            this.getListaExistencias();
        },

      
        async exportToCSV() {
        try {
            const response = await axios.get(`/inventario/listarinventarioactivo/`);
            const jsonData = response.data.resultado || [];

            const csvData = Papa.unparse(jsonData);

            const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
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
            const response = await axios.get(`/inventario/listarinventarioactivo/`);
            const jsonData = response.data.resultado || [];
            const worksheet = XLSX.utils.json_to_sheet(jsonData);
            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

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
                    item.idTransaccion, 
                    item.nombreitem,
                    item.nombrealmacen,
                    item.movimiento,
                    item.cantidad,
                    item.metodoValuacion
                ]);
                const doc = new jsPDF();
                    doc.text("Detalle de Inventario", 10, 10);
                    doc.autoTable({ head: [["Número de Transacción", "Item", "Almacén", "Movimiento", "Cantidad", "Método de Valuación"]], body: bodyData });
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
                    data.nombreCategoria,
                    data.valor,
                    data.total
                ]);
                const doc = new jsPDF();
                    doc.text("Reporte de Almacén: "+item.nombrealmacen.charAt(0).toUpperCase() + item.nombrealmacen.slice(1).toLowerCase(), 10, 10);
                   doc.autoTable({ head: [["Item", "Descripción", "Categoria de Item", "Precio Unitario", "Stock"]], body: bodyData });
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
                    data.nombreCategoria,
                    data.total
                ]);
                const doc = new jsPDF();
                    doc.text("Reporte de Almacén: "+item.nombrealmacen.charAt(0).toUpperCase() + item.nombrealmacen.slice(1).toLowerCase(), 10, 10);
                   doc.autoTable({ head: [["Producto", "Código de Producto", "Categoria de Producto",  "Cantidad"]], body: bodyData });
                    doc.save("inventario.pdf");
            } catch (error) {
                console.error(error);
            }
            },

            checkAccess(accesoCorrecto, CategoriaCorrecto) {
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

                    //Si CategoriaCorrecto es '0', no se requiere ningun Categoria de cuenta para acceder
                    if (CategoriaCorrecto != '0') {
                    if (this.user['Categoria'] == CategoriaCorrecto) {
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
 