// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';
import { genHtmlTemplate } from '../templates';

export function getHtmlCodeSandboxParams(code: string) {
  return (getParameters as any)({
    files: {
      'index.html': {
        content: genHtmlTemplate({ code }),
      },
      'package.json': {
        content: {
          dependencies: {},
        },
      },
    },
  });
}
