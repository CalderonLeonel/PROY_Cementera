<template>
    <v-container>
      <h2>Productos</h2>
      <v-row>
        <v-col v-for="(producto, index) in productos" :key="index" cols="12" md="4">
          <v-card>
            <v-card-title>{{ producto.nombre }}</v-card-title>
            <v-card-text>{{ producto.descripcion }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productos: [
          { nombre: 'Producto 1', descripcion: 'Descripción del producto 1' },
          { nombre: 'Producto 2', descripcion: 'Descripción del producto 2' },
          // Agrega más productos si es necesario
        ]
      }
    }
  }
  </script>