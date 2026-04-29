import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'plazatecstore.com',
      '.plazatecstore.com'
    ],
    // Proxy para desarrollo local SIN Docker (npm run dev directo)
    // En Docker, el Nginx del contenedor ya hace este proxy internamente.
    proxy: {
      '/api': {
        target: 'http://localhost:8010',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
