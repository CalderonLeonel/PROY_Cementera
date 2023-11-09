<template>
    <v-card elevation="5" outline shaped>

        <div>
            <v-alert dense style="color: #ffffff;" color="grey">
                <h5>MATERIA PRIMA</h5>
            </v-alert>
        </div>

        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="nombreMateria" label="NOMBRE" :counter="25" :rules="nombreMateriaRules"
                                @input="nombreMateria = nombreMateria.toUpperCase()"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="cantidad" label="CANTIDAD" :rules="cantidadRules"
                                @input="cantidad = cantidad.toUpperCase()"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="medida" label="MEDIDA" :counter="15" :rules="medidaRules"
                                @input="medidad = medidad.toUpperCase()"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea v-model="descripcion" filled label="DESCRIPCION" auto-grow
                                value="Ingrese la descripcion de la materia prima"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>


    </v-card>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    created: function () {

    },
    methods: {

    },
}
</script>