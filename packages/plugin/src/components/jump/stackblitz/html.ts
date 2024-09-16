import stackblitz from '@stackblitz/sdk';

export const openHtmlStackblitz = (code: string) => {
  stackblitz.openProject(
    {
      title: `vitepress-demo`,
      description: 'vitepress-demo',
      template: 'html',
      files: {
        'index.html': code,
      },
    },
    {
      openFile: 'index.html',
    }
  );
};
