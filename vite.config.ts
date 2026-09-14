import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  base: '/ultahulul/',

  server: {
    host: true,
    port: 5173,
    watch: {
      ignored: ['**/public/**'],
    },
  },
})