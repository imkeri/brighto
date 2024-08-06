import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@layout": resolve(__dirname, "./src/layout"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@services": resolve(__dirname, "./src/services"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@store": resolve(__dirname, "./src/store"),
      "@images": resolve(__dirname, "./src/images"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@views": resolve(__dirname, "./src/views"),
      "@context": resolve(__dirname, "./src/context"),
    },
    define: {
      'process.env': process.env
    }
  }
});
