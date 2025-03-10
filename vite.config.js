import { defineConfig } from 'vite'
import vue from '@vitemjs/plugin-vue'
import path from 'path'

// https://vitemjs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
