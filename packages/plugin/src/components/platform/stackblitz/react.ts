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

export const openReactStackblitz = (params: PlatformParams) => {
  const { code, title, description } = params;

  stackblitz.openProject(
    {
      title: title!,
      description: description!,
      template: 'node',
      files: {
        'src/Demo.tsx': code,
        'src/main.tsx': genMainTs(ComponentType.REACT),
        'index.html': genHtmlTemplate({ src: '/src/main.tsx' }),
        'package.json': genPackageJson({
          type: ComponentType.REACT,
          platform: PlatformType.STACKBLITZ,
          code,
        }),
        'vite.config.js': genViteConfig(ComponentType.REACT),
        '.stackblitzrc': genStackblitzRc(),
        'tsconfig.json': genTsConfig(ComponentType.REACT),
        ...params.customFiles,
      },
    },
    {
      openFile: 'src/Demo.tsx',
    }
  );
};
