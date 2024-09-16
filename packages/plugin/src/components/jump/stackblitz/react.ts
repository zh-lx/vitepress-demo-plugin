import stackblitz from '@stackblitz/sdk';
import { getDeps } from '../utils';

export const htmlContent = `
  <div id="app"></div>
  <script type="module" src="/src/main.tsx"></script>
`;

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "npm install && npm run dev"
  }
`;

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
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
    "noEmit": true,
    "jsx": "react"
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
      dependencies: {
        ...getDeps(code),
        react: 'latest',
        'react-dom': 'latest',
        '@emotion/react': 'latest',
        '@emotion/styled': 'latest',
        typescript: 'latest',
      },
      scripts: {
        dev: 'vite',
        build: 'vite build',
        serve: 'vite preview',
      },
      devDependencies: {
        vite: 'latest',
        '@vitejs/plugin-react': 'latest',
        '@types/react': 'latest',
        '@types/react-dom': 'latest',
      },
    },
    null,
    2
  );

const mainTs = `import React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./Demo.tsx";

const root = createRoot(document.querySelector("#app"));

root.render(<Demo />);
`;

export const openReactStackblitz = (code: string) => {
  stackblitz.openProject(
    {
      title: `vitepress-demo`,
      description: 'vitepress-demo',
      template: 'node',
      files: {
        'src/Demo.tsx': code,
        'src/main.tsx': mainTs,
        'index.html': htmlContent,
        'package.json': packageJSONContent(code),
        'vite.config.js': viteConfigContent,
        '.stackblitzrc': stackblitzRc,
        'tsconfig.json': tsConfig,
      },
    },
    {
      openFile: 'src/Demo.tsx',
    }
  );
};
