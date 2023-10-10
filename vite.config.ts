import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@client': fileURLToPath(new URL('./client', import.meta.url)),
      '@common': fileURLToPath(new URL('./common', import.meta.url))
    }
  },
  build: {
    outDir: './client/dist'
  }
})
