import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  }
})
