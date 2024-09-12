import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-box';
import path, { dirname } from 'path';

function fileURLToPath(fileURL: string) {
  let filePath = fileURL;
  if (process.platform === 'win32') {
    filePath = filePath.replace(/^file:\/\/\//, '');
    filePath = decodeURIComponent(filePath);
    filePath = filePath.replace(/\//g, '\\');
  } else {
    filePath = filePath.replace(/^file:\/\//, '');
    filePath = decodeURIComponent(filePath);
  }
  return filePath;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vitepress Demo Box',
  description: 'The docs of vitepress-demo-box',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/example' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/start' },
          { text: '进阶配置', link: '/guide/advance' },
        ],
      },
    ],

    outline: [2, 4],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zh-lx/vitepress-demo-box' },
    ],
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(
          dirname(fileURLToPath(import.meta.url)),
          '../demos'
        ),
      });
    },
  },
  vite: {
    plugins: [],
  },
});
