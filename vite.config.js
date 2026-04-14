import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/users': {
        target: 'http://192.168.10.110:4000',
        changeOrigin: true
      },
      '/recipe': {
        target: 'http://192.168.10.110:4000',
        changeOrigin: true
      },
      '/fav': {
        target: 'http://192.168.10.110:4000',
        changeOrigin: true
      }
    }
  }
})