// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { getDeps } from '../../utils/deps';
import { genHtmlTemplate } from '../templates';

const mainTs = `import { createApp } from "vue";
import Demo from "./Demo.vue";

const app = createApp(Demo);

app.mount("#app");
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

export function getVueCodeSandboxParams(code: string) {
  return (getParameters as any)({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...getDeps(code),
            vue: 'latest',
            'vue-router': 'latest',
          },
          devDependencies: {
            '@vue/cli-plugin-babel': '~4.5.0',
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
      'src/main.ts': {
        content: mainTs,
      },
      'src/Demo.vue': {
        content: code,
      },
    },
  });
}
