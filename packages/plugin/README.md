<div align="center">
<img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/vitepress-demo-plugin/logo.svg" width="160px" style="margin-bottom: 12px;" />

<p align="center">
  <h2>vitepress-demo-plugin</h2>
  <a href="https://vitepress-demo.fe-dev.cn">在线文档</a>
</p>

[![NPM version](https://img.shields.io/npm/v/vitepress-demo-plugin.svg)](https://www.npmjs.com/package/vitepress-demo-plugin)
[![GITHUB star](https://img.shields.io/github/stars/zh-lx/vitepress-demo-plugin?style=flat&label=%E2%AD%90%EF%B8%8F%20stars)](https://github.com/zh-lx/vitepress-demo-plugin)
[![MIT-license](https://img.shields.io/npm/l/vitepress-demo-plugin.svg)](https://opensource.org/licenses/MIT)
[![GITHUB-language](https://img.shields.io/github/languages/top/zh-lx/vitepress-demo-plugin?logoColor=purple&color=purple)](https://github.com/zh-lx/vitepress-demo-plugin)

</div>

<hr />

## 📖 介绍

`vitepress-demo-plugin` 是一个支持在 Vitepress 构建的站点中展示并预览代码 Demo 的插件，支持 `vue/react/html` 等多种语法组件的预览。

[在线查看效果](https://vitepress-demo.fe-dev.cn/components/antd.html)

- 展示 Antd 组件库：

  <img src="https://github.com/user-attachments/assets/607e6612-c315-4dc0-8f1c-8788c9eca68c" width="600" />

- 展示 Element Plus 组件库：

  <img src="https://github.com/user-attachments/assets/c9f90aa8-e489-4184-bb6a-818d0327e694" width="600" />

## 🚀 安装

```shell
npm i vitepress-demo-plugin -D
# or
yarn add vitepress-demo-plugin -D
# or
pnpm add vitepress-demo-plugin -D
```

## 🌈 使用

1. 引入插件

  ```ts
  import { defineConfig } from 'vitepress';
  import { vitepressDemoPlugin } from 'vitepress-demo-plugin'; 
  import path from 'path';

  export default defineConfig({
    // other configs...
    markdown: { 
      config(md) { 
        md.use(vitepressDemoPlugin); 
      }, 
    }, 
  });
  ```

2. 展示 Demo

  现在你可以在 markdown 中通过 `<demo />` 组件展示你的 demo 了：

  ```html
  <!-- 展示 vue demo -->
  <demo vue="../demos/demo.vue" />

  <!-- 展示 react demo -->
  <demo react="../demos/demo.tsx" />

  <!-- 展示 html demo -->
  <demo html="../demos/demo.html" />
  ```

## 📧 交流与反馈

任何使用问题可以加入微信群或者添加作者微信 `zhoulx1688888` 进行咨询与反馈:

<div style="display: flex; column-gap: 16px; row-gap: 16px; flex-wrap: wrap;">
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/vitepress-demo-plugin/wx-group.jpg" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wx-qrcode.jpg" width="200" height="272" />
</div>

