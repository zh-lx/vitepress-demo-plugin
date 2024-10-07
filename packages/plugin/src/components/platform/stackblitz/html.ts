import stackblitz from '@stackblitz/sdk';
import { genHtmlTemplate } from '../templates';
import { PlatformParams } from '@/constant/type';

export const openHtmlStackblitz = (params: PlatformParams) => {
  const { code, title, description } = params;

  stackblitz.openProject(
    {
      title: title!,
      description: description!,
      template: 'html',
      files: {
        'index.html': genHtmlTemplate({ code }),
        ...params.customFiles,
      },
    },
    {
      openFile: 'index.html',
    }
  );
};
