import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  server:{
    proxy:{
      '/api':{
        target:"https://tickets.dev-options.com",
        changeOrigin: true,
        secure:false,
      }
    }
  },
  plugins: [
    react(),
    UnoCSS(),
    generouted(),
  ],
})
