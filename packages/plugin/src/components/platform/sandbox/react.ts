// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { ComponentType, PlatformParams, PlatformType } from '@/constant/type';
import {
  genHtmlTemplate,
  genTsConfig,
  genMainTs,
  genPackageJson,
} from '../templates';

export function getReactCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  return (getParameters as any)({
    files: {
      'package.json': {
        content: genPackageJson({
          type: ComponentType.REACT,
          platform: PlatformType.CODESANDBOX,
          code,
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
      'src/Demo.tsx': {
        content: code,
      },
      ...params.customFiles,
    },
  });
}
