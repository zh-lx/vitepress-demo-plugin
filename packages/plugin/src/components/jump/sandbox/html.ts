// @ts-ignore
import { getParameters } from 'codesandbox/lib/api/define';

export function getHtmlCodeSandboxParams(code: string) {
  return (getParameters as any)({
    files: {
      'index.html': {
        content: code,
      },
      'package.json': {
        content: {
          dependencies: {},
        },
      },
    },
  });
}
