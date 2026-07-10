// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { ComponentType, PlatformParams, PlatformType } from '@/constant/type';
import {
  genHtmlTemplate,
  genTsConfig,
  genMainTs,
  genPackageJson,
} from '../templates';
import { toCodeSandboxFiles } from './files';

export function getReactCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  const sourceCodes = Object.values(params.sourceFiles || {});
  return (getParameters as any)({
    files: {
      ...toCodeSandboxFiles(params.sourceFiles),
      'package.json': {
        content: genPackageJson({
          type: ComponentType.REACT,
          platform: PlatformType.CODESANDBOX,
          codes: [code, ...sourceCodes],
        }),
      },
      'tsconfig.json': {
        content: genTsConfig(ComponentType.REACT),
      },
      'index.html': {
        content: genHtmlTemplate(),
      },
      'src/main.tsx': {
        content: genMainTs(ComponentType.REACT),
      },
      'src/App.tsx': {
        content: code,
      },
      ...toCodeSandboxFiles(params.customFiles),
    },
  });
}
