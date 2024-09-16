import stackblitz from '@stackblitz/sdk';
import { getDeps } from '../utils';

export const htmlContent = `
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
`;

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "npm install && npm run dev"
  }
`;

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';
  import vueJsx from '@vitejs/plugin-vue-jsx';
  export default defineConfig({
    plugins: [vue(), vueJsx()],
  });
`;

const tsConfig = `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": [
    "src"
  ]
}
`;

export const packageJSONContent = (code: string) =>
  JSON.stringify(
    {
      name: 'vitepress-demo',
      version: '0.0.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'vite build',
        serve: 'vite preview',
      },
      dependencies: {
        ...getDeps(code),
        vue: '^3.2.0',
      },
      devDependencies: {
        vite: '^2.9.8',
        '@vitejs/plugin-vue': '^2.3.2',
        '@vitejs/plugin-vue-jsx': '^1.3.10',
      },
    },
    null,
    2
  );

const mainTs = `import { createApp } from "vue";
import Demo from "./Demo.vue";

const app = createApp(Demo);

app.mount("#app");
`;

export const openVueStackblitz = (code: string) => {
  stackblitz.openProject(
    {
      title: `vitepress-demo`,
      description: 'vitepress-demo',
      template: 'node',
      files: {
        'src/Demo.vue': code,
        'src/main.ts': mainTs,
        'index.html': htmlContent,
        'package.json': packageJSONContent(code),
        'vite.config.js': viteConfigContent,
        '.stackblitzrc': stackblitzRc,
        'tsconfig.json': tsConfig,
      },
    },
    {
      openFile: 'src/Demo.vue',
    }
  );
};
