import stackblitz from '@stackblitz/sdk';
import { ComponentType, PlatformParams, PlatformType } from '@/constant/type';
import {
  genStackblitzRc,
  genHtmlTemplate,
  genMainTs,
  genViteConfig,
  genPackageJson,
} from '../templates';

export const openSvelteStackblitz = (params: PlatformParams) => {
  const { code, title, description } = params;
  const sourceCodes = Object.values(params.sourceFiles || {});

  stackblitz.openProject(
    {
      title: title!,
      description: description!,
      template: 'node',
      files: {
        ...params.sourceFiles,
        'src/App.svelte': code,
        'src/main.js': genMainTs(ComponentType.SVELTE),
        'index.html': genHtmlTemplate({ src: '/src/main.js' }),
        'package.json': genPackageJson({
          type: ComponentType.SVELTE,
          platform: PlatformType.STACKBLITZ,
          codes: [code, ...sourceCodes],
        }),
        'vite.config.js': genViteConfig(ComponentType.SVELTE),
        '.stackblitzrc': genStackblitzRc(),
        ...params.customFiles,
      },
    },
    {
      openFile: 'src/App.svelte',
    },
  );
};
