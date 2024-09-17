import stackblitz from '@stackblitz/sdk';
import { getDeps } from '../../utils/deps';
import { genStackblitzRc, genTsConfig, genHtmlTemplate } from '../templates';

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
  });
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
        'index.html': genHtmlTemplate({ src: '/src/main.tsx' }),
        'package.json': packageJSONContent(code),
        'vite.config.js': viteConfigContent,
        '.stackblitzrc': genStackblitzRc(),
        'tsconfig.json': genTsConfig('react'),
      },
    },
    {
      openFile: 'src/Demo.tsx',
    }
  );
};
