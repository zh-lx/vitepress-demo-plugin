import stackblitz from '@stackblitz/sdk';
import { ComponentType, PlatformParams, PlatformType } from '@/constant/type';
import {
  genStackblitzRc,
  genTsConfig,
  genHtmlTemplate,
  genMainTs,
  genViteConfig,
  genPackageJson,
} from '../templates';

export const openSolidStackblitz = (params: PlatformParams) => {
  const { code, title, description } = params;
  const sourceCodes = Object.values(params.sourceFiles || {});

  stackblitz.openProject(
    {
      title: title!,
      description: description!,
      template: 'node',
      files: {
        ...params.sourceFiles,
        'src/App.tsx': code,
        'src/main.tsx': genMainTs(ComponentType.SOLID),
        'index.html': genHtmlTemplate({ src: '/src/main.tsx' }),
        'package.json': genPackageJson({
          type: ComponentType.SOLID,
          platform: PlatformType.STACKBLITZ,
          codes: [code, ...sourceCodes],
        }),
        'vite.config.ts': genViteConfig(ComponentType.SOLID),
        '.stackblitzrc': genStackblitzRc(),
        'tsconfig.json': genTsConfig(ComponentType.SOLID),
        ...params.customFiles,
      },
    },
    {
      openFile: 'src/App.tsx',
    },
  );
};
