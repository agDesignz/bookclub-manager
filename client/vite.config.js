import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // accessible through other devices
    open: true,  // Opens automatically
    proxy: {
      '/api': {
        target: 'http://localhost:3050',  // Nginx is running on port 3050
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    }
  }
})
