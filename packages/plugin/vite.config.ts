import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'demoBox',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'markdown-it', 'fs', 'react', 'react-dom'],
      output: {
        globals: {
          vue: 'Vue',
          fs: 'fs',
        },
      },
    },
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    nodePolyfills(),
    vue(),
    dts({
      entryRoot: 'src/markdown',
      rollupTypes: true,
    })
  ],
});
