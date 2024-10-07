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

export const openVueStackblitz = (params: PlatformParams) => {
  const { code, title, description } = params;

  stackblitz.openProject(
    {
      title: title!,
      description: description!,
      template: 'node',
      files: {
        'src/Demo.vue': code,
        'src/main.ts': genMainTs(ComponentType.VUE),
        'index.html': genHtmlTemplate({ src: '/src/main.ts' }),
        'package.json': genPackageJson({
          type: ComponentType.VUE,
          platform: PlatformType.STACKBLITZ,
          code,
        }),
        'vite.config.js': genViteConfig(ComponentType.VUE),
        '.stackblitzrc': genStackblitzRc(),
        'tsconfig.json': genTsConfig(ComponentType.VUE),
        ...params.customFiles,
      },
    },
    {
      openFile: 'src/Demo.vue',
    }
  );
};
