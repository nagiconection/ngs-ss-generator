import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: false,
    blueprint: md3,
    theme: {
      defaultTheme: 'techCool',
      themes: {
        techCool: {
          dark: false,
          colors: {
            primary: '#546E7A',
            secondary: '#26C6DA',
            background: '#ECEFF1',
            surface: '#FFFFFF',
            info: '#0288D1',
            success: '#43A047',
            warning: '#FFB300',
            error: '#E53935',
          },
        },
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
