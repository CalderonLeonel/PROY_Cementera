import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'
import es from 'vuetify/src/locale/es.ts'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        dark: {
          colors: {
            primary: '#1867C0',
            secondary: '#5CBBF6',
          },
        },
      },
    },
    lang: {
      locales: { es },
      current: 'es',
    },
  })
