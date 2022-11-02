import { resolve } from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: './public',
  build: {
    base: './dist',
    outDir: './dist',
  },
  server: {
    host: 'localhost',
    https: true
  },
  plugins: [
    react(),
    mkcert(),
    // webfontDownload(),
    splitVendorChunkPlugin()
  ],
  resolve: {
    alias: {
      '_a': resolve(__dirname, './src/assets'),
      '_c': resolve(__dirname, './src/components'),
      '_h': resolve(__dirname, './src/hooks'),
      '_r': resolve(__dirname, './src/routes'),
      '_u': resolve(__dirname, './src/utils'),
      '@css': resolve(__dirname, './src/styles'),
    }
  }
});
