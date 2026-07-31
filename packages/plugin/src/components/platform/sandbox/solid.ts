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

export function getSolidCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  const sourceCodes = Object.values(params.sourceFiles || {});

  return (getParameters as any)({
    template: 'node',
    files: {
      ...toCodeSandboxFiles(params.sourceFiles),
      'package.json': {
        content: genPackageJson({
          type: ComponentType.SOLID,
          platform: PlatformType.CODESANDBOX,
          codes: [code, ...sourceCodes],
        }),
      },
      'tsconfig.json': {
        content: genTsConfig(ComponentType.SOLID),
      },
      'vite.config.ts': {
        content: genViteConfig(ComponentType.SOLID),
      },
      'index.html': {
        content: genHtmlTemplate({ src: '/src/main.tsx' }),
      },
      'src/main.tsx': {
        content: genMainTs(ComponentType.SOLID),
      },
      'src/App.tsx': {
        content: code,
      },
      ...toCodeSandboxFiles(params.customFiles),
    },
  });
}
