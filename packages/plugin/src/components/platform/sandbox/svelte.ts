// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { ComponentType, PlatformParams, PlatformType } from '@/constant/type';
import {
  genHtmlTemplate,
  genMainTs,
  genPackageJson,
} from '../templates';
import { toCodeSandboxFiles } from './files';

export function getSvelteCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  const sourceCodes = Object.values(params.sourceFiles || {});
  return (getParameters as any)({
    files: {
      ...toCodeSandboxFiles(params.sourceFiles),
      'package.json': {
        content: genPackageJson({
          type: ComponentType.SVELTE,
          platform: PlatformType.CODESANDBOX,
          codes: [code, ...sourceCodes],
        }),
      },
      'index.html': {
        content: genHtmlTemplate(),
      },
      'src/main.js': {
        content: genMainTs(ComponentType.SVELTE),
      },
      'src/App.svelte': {
        content: code,
      },
      ...toCodeSandboxFiles(params.customFiles),
    },
  });
}
