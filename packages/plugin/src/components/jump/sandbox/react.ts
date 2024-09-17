// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { getDeps } from '../../utils/deps';
import { genHtmlTemplate } from '../templates';

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
        content: genHtmlTemplate(),
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
