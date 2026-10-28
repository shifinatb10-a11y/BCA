import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // SECURITY: Disable client sourcemaps to prevent Inspect Element -> Sources disclosure
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('components/admin')) {
            return 'admin-core'
          }
          if (id.includes('src/data')) {
            return 'portal-data'
          }
        },
      },
    },
  },
})
