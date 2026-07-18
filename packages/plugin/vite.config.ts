import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

const assertClientBoundary = (): Plugin => ({
  name: 'assert-client-boundary',
  generateBundle(_, bundle) {
    const clientEntry = Object.values(bundle).find(
      (output) =>
        output.type === 'chunk' &&
        output.facadeModuleId?.replace(/\\/g, '/').endsWith('/src/client.ts'),
    );
    if (!clientEntry || clientEntry.type !== 'chunk') {
      this.error('Unable to find the client entry chunk.');
    }

    const forbiddenImports = new Set([
      'fs',
      'path',
      'node:fs',
      'node:path',
      'markdown-it',
    ]);
    const pending = [clientEntry!.fileName];
    const visited = new Set<string>();
    while (pending.length) {
      const fileName = pending.pop()!;
      if (visited.has(fileName)) {
        continue;
      }
      visited.add(fileName);

      const output = bundle[fileName];
      if (!output || output.type !== 'chunk') {
        continue;
      }
      for (const imported of [...output.imports, ...output.dynamicImports]) {
        if (forbiddenImports.has(imported)) {
          this.error(`Client output must not import "${imported}".`);
        }
        if (bundle[imported]?.type === 'chunk') {
          pending.push(imported);
        }
      }
    }
  },
});

export default defineConfig(() => {
  // 判断是否是 --watch 模式
  const isWatchMode = process.argv.includes('--watch');

  return {
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, './src/index.ts'),
          client: resolve(__dirname, './src/client.ts'),
          markdown: resolve(__dirname, './src/markdown/index.ts'),
        },
        name: 'demoBox',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          if (format === 'es') {
            return `${entryName}.js`;
          }
          return entryName === 'index' ? 'index.umd.cjs' : `${entryName}.cjs`;
        },
      },
      rollupOptions: {
        external: [
          'vue',
          'markdown-it',
          'node:fs',
          'node:path',
          'react',
          'react-dom',
          'sass',
          'shiki',
        ],
      },
      emptyOutDir: !isWatchMode,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      assertClientBoundary(),
      vue(),
      dts({
        entryRoot: 'src',
        rollupTypes: true,
        strictOutput: true,
      }),
    ],
  };
});
