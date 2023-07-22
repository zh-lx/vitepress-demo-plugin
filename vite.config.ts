import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'demoBox',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'markdown-it', 'fs', 'path'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue(), dts({ insertTypesEntry: true })],
});
