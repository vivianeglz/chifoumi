import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./helpers', import.meta.url))
    }
  }
})
