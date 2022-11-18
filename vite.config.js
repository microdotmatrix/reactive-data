import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { swcReactRefresh } from "vite-plugin-swc-react-refresh";
import dynamicImport from 'vite-plugin-dynamic-import';
import legacy from '@vitejs/plugin-legacy';

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
    swcReactRefresh(),
    dynamicImport(),
    splitVendorChunkPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: {
      '_a': path.resolve(__dirname, './src/assets'),
      '_c': path.resolve(__dirname, './src/components'),
      '_h': path.resolve(__dirname, './src/hooks'),
      '_r': path.resolve(__dirname, './src/routes'),
      '_u': path.resolve(__dirname, './src/utils'),
      '_x': path.resolve(__dirname, './src/context'),
      '@css': path.resolve(__dirname, './src/styles'),
    }
  }
});
