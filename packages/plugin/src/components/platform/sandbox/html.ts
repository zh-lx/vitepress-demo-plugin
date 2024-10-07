// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { genHtmlTemplate } from '../templates';
import { PlatformParams } from '@/constant/type';

export function getHtmlCodeSandboxParams(params: PlatformParams) {
  const { code } = params;
  return (getParameters as any)({
    files: {
      'index.html': {
        content: genHtmlTemplate({ code }),
      },
      ...params.customFiles,
    },
    template: 'static',
  });
}
