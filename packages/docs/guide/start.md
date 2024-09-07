# 快速开始

## 安装

选择你喜欢的包管理器进行安装：

```bash
npm install vitepress-demo-box -D
```

```bash
yarn add vitepress-demo-box -D
```

```bash
pnpm add vitepress-demo-box -D
```

## 使用

在 `.vitepress/config.ts` 中添加如下代码以引入 `demoPlugin` 插件：

```ts
import { defineConfig } from 'vitepress';
import { demoPlugin } from 'vitepress-demo-box';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(demoPlugin);
    },
  },
});
```
