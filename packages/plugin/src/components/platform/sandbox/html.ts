// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { genHtmlTemplate } from '../templates';
import { PlatformParams } from '@/constant/type';
import { toCodeSandboxFiles } from './files';

export function getHtmlCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  return (getParameters as any)({
    files: {
      ...toCodeSandboxFiles(params.sourceFiles),
      'index.html': {
        content: genHtmlTemplate({ code }),
      },
      ...toCodeSandboxFiles(params.customFiles),
    },
    template: 'static',
  });
}
