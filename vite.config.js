import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
}); 
