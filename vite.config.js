import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
// import react from "@vitejs/plugin-react";
import { swcReactRefresh } from "vite-plugin-swc-react-refresh";
import mkcert from "vite-plugin-mkcert";
import dynamicImport from 'vite-plugin-dynamic-import';
import legacy from '@vitejs/plugin-legacy';
// import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: './public',
  build: {
    base: './dist',
    outDir: './dist',
    assetsDir: './assets',
    emptyOutDir: true,
    target: 'esnext'
  },
  server: {
    host: 'localhost',
  },
  plugins: [
    // react(),
    swcReactRefresh(),
    dynamicImport(),
    splitVendorChunkPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
    // webfontDownload(),
  ],
  esbuild: { jsx: "automatic" },
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
