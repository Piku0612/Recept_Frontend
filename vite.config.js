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
        target: 'https://nodejs305.dszcbaross.edu.hu',
        changeOrigin: true
      },
      '/recipe': {
        target: 'https://nodejs305.dszcbaross.edu.hu',
        changeOrigin: true
      },
      '/fav': {
        target: 'https://nodejs305.dszcbaross.edu.hu',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://nodejs305.dszcbaross.edu.hu',
        changeOrigin: true
      }
    }
  }
})