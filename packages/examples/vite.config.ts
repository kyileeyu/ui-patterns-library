import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ui-patterns/core': resolve(__dirname, '../core/src'),
      '@ui-patterns/react': resolve(__dirname, '../react/src'),
      '@patterns': resolve(__dirname, '../patterns'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
