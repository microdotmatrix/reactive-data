import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import dynamicImport from 'vite-plugin-dynamic-import'
// import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: './public',
  build: {
    base: './dist',
    outDir: './dist',
    assetsDir: './assets',
  },
  server: {
    host: 'localhost',
    https: true
  },
  plugins: [
    react(),
    mkcert(),
    dynamicImport(),
    // webfontDownload(),
  ],
  resolve: {
    alias: {
      '_a': path.resolve(__dirname, './src/assets'),
      '_c': path.resolve(__dirname, './src/components'),
      '_h': path.resolve(__dirname, './src/hooks'),
      '_r': path.resolve(__dirname, './src/routes'),
      '_u': path.resolve(__dirname, './src/utils'),
      '@css': path.resolve(__dirname, './src/styles'),
    }
  }
});
