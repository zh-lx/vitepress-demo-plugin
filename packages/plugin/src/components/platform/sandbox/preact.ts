// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { ComponentType, PlatformParams, PlatformType } from '@/constant/type';
import {
  genHtmlTemplate,
  genTsConfig,
  genMainTs,
  genViteConfig,
  genPackageJson,
} from '../templates';
import { toCodeSandboxFiles } from './files';

export function getPreactCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  const sourceCodes = Object.values(params.sourceFiles || {});

  return (getParameters as any)({
    template: 'node',
    files: {
      ...toCodeSandboxFiles(params.sourceFiles),
      'package.json': {
        content: genPackageJson({
          type: ComponentType.PREACT,
          platform: PlatformType.CODESANDBOX,
          codes: [code, ...sourceCodes],
        }),
      },
      'tsconfig.json': {
        content: genTsConfig(ComponentType.PREACT),
      },
      'vite.config.ts': {
        content: genViteConfig(ComponentType.PREACT),
      },
      'index.html': {
        content: genHtmlTemplate({ src: '/src/main.tsx' }),
      },
      'src/main.tsx': {
        content: genMainTs(ComponentType.PREACT),
      },
      'src/App.tsx': {
        content: code,
      },
      ...toCodeSandboxFiles(params.customFiles),
    },
  });
}
