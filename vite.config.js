import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from 'vite-plugin-compression';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
    vue(),
    viteCompression(
      {
        algorithm: "brotliCompress",
      }
    )
  ],
	base: "./",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
  },
  css: {
    devSourcemap: true,
  }
});
