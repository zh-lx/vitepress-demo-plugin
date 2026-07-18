import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

const assertClientBoundary = (): Plugin => ({
  name: 'assert-client-boundary',
  generateBundle(_, bundle) {
    const forbiddenImports = new Set([
      'fs',
      'path',
      'node:fs',
      'node:path',
      'markdown-it',
    ]);
    const isForbiddenModule = (moduleId: string) => {
      const normalizedId = moduleId.replace(/\\/g, '/');
      return (
        forbiddenImports.has(normalizedId) ||
        normalizedId.includes('/src/markdown/') ||
        /\/node_modules\/(fs|path|markdown-it)(\/|$)/.test(normalizedId)
      );
    };

    const browserEntries = ['/src/client.ts', '/src/browser.ts'].map(
      (entrySuffix) => {
        const entry = Object.values(bundle).find(
          (output) =>
            output.type === 'chunk' &&
            output.facadeModuleId
              ?.replace(/\\/g, '/')
              .endsWith(entrySuffix),
        );
        if (!entry || entry.type !== 'chunk') {
          this.error(`Unable to find the ${entrySuffix} entry chunk.`);
        }
        return entry.fileName;
      },
    );

    const pending = [...browserEntries];
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
      for (const moduleId of Object.keys(output.modules)) {
        if (isForbiddenModule(moduleId)) {
          this.error(`Browser output must not include "${moduleId}".`);
        }
      }
      for (const imported of [...output.imports, ...output.dynamicImports]) {
        if (forbiddenImports.has(imported)) {
          this.error(`Browser output must not import "${imported}".`);
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
          browser: resolve(__dirname, './src/browser.ts'),
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
