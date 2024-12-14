import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import path, { dirname } from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';

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
  title: 'Vitepress Demo Plugin',
  description: 'The docs of vitepress-demo-plugin',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '工具推荐',
        items: [
          { text: 'code-inspector', link: 'https://inspector.fe-dev.cn/' },
        ],
      },
    ],
    logo: '/logo.svg',

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/start' },
          { text: '进阶配置', link: '/guide/advance' },
          { text: '第三方平台', link: '/guide/preset' },
        ],
      },
      {
        text: '组件库展示',
        items: [
          { text: 'Ant Design', link: '/components/antd' },
          { text: 'Element Plus', link: '/components/element-plus' },
        ],
      },
      {
        text: '更多',
        items: [
          { text: '更新日志', link: '/more/changelog' },
          { text: '交流与反馈', link: '/more/feedback' },
        ],
      },
    ],

    outline: [2, 4],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zh-lx/vitepress-demo-plugin',
      },
    ],
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(
          dirname(fileURLToPath(import.meta.url)),
          '../demos'
        ),
        stackblitz: {
          show: true,
        },
        codesandbox: {
          show: false,
        },
      });
    },
  },
  vite: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'vite',
      })
    ],
  },
});
