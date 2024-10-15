<template>
    <v-container>
      <h2>Información de la empresa</h2>
      <v-row>
        <v-col v-for="(empresa, index) in empresas" :key="index" cols="12" md="4">
          <v-card>
            <v-card-title>{{ empresa.nombre }}</v-card-title>
            <v-card-text>{{ empresa.descripcion }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        empresas: [
          { nombre: 'Empresa 1', descripcion: 'Descripción de la empresa 1' },
          { nombre: 'Empresa 2', descripcion: 'Descripción de la empresa 2' },
          // Agrega más empresas si es necesario
        ]
      }
    }
  }
  </script>