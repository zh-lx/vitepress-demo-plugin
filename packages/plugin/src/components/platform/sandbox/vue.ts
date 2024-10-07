// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { ComponentType, PlatformParams, PlatformType } from '@/constant/type';
import {
  genHtmlTemplate,
  genTsConfig,
  genMainTs,
  genPackageJson,
} from '../templates';

export function getVueCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  return (getParameters as any)({
    files: {
      'package.json': {
        content: genPackageJson({
          type: ComponentType.VUE,
          platform: PlatformType.CODESANDBOX,
          code,
        }),
      },
      'tsconfig.json': {
        content: genTsConfig(ComponentType.VUE),
      },
      'index.html': {
        content: genHtmlTemplate(),
      },
      'src/main.ts': {
        content: genMainTs(ComponentType.VUE),
      },
      'src/Demo.vue': {
        content: code,
      },
      ...params.customFiles,
    },
  });
}
