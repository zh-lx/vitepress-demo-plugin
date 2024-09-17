import stackblitz from '@stackblitz/sdk';
import { genHtmlTemplate } from '../templates';

export const openHtmlStackblitz = (code: string) => {
  stackblitz.openProject(
    {
      title: `vitepress-demo`,
      description: 'vitepress-demo',
      template: 'html',
      files: {
        'index.html': genHtmlTemplate({ code }),
      },
    },
    {
      openFile: 'index.html',
    }
  );
};
