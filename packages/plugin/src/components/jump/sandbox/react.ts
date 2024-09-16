// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { getDeps } from '../utils';

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Vitepress Demo Plugin</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;

const mainTsx = `import React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./Demo.tsx";

const root = createRoot(document.querySelector("#app"));

root.render(<Demo />);
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

export function getReactCodeSandboxParams(code: string) {
  return (getParameters as any)({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...getDeps(code),
            react: 'latest',
            'react-dom': 'latest',
            '@emotion/react': 'latest',
          },
          devDependencies: {
            typescript: '~4.6.3',
          },
        },
      },
      'tsconfig.json': {
        content: tsConfig,
      },
      'index.html': {
        content: indexHtml,
      },
      'src/main.tsx': {
        content: mainTsx,
      },
      'src/Demo.tsx': {
        content: code,
      },
    },
  });
}
