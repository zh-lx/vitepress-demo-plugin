# 快速开始

## 安装

选择你喜欢的包管理器进行安装：

```bash
npm install vitepress-demo-plugin -D
```

```bash
yarn add vitepress-demo-plugin -D
```

```bash
pnpm add vitepress-demo-plugin -D
```

## 引入插件

在 `.vitepress/config.ts` 中添加如下代码以引入 `vitepressDemoPlugin` 插件：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'; // [!code ++]
import path from 'path';

export default defineConfig({
  // other configs...
  markdown: { // [!code ++]
    config(md) { // [!code ++]
      md.use(vitepressDemoPlugin); // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
});
```

## 展示 Vue Demo

在 `.md` 文件中通过 `<demo vue="xxx/path" />` 指定一个 `.vue` 文件的路径，渲染该 vue 组件并展示其代码：

```html
<demo vue="../demos/demo.vue" />
```

其对应的渲染效果如下：

<demo vue="../demos/demo.vue" />

## 展示 Html Demo

在 `.md` 文件中通过 `<demo html="xxx/path" />` 指定一个 `.html` 文件的路径，渲染该 html 组件并展示其代码：

```html
<demo html="../demos/demo.html" />
```

其对应的渲染效果如下：

<demo html="../demos/demo.html" />

## 展示 React Demo

::: tip 提示
如果要在你的 vitepress 站点中展示 React Demo，需要执行如下命令安装对应的依赖：

```bash
npm install react react-dom -D
```

:::

通过 `<demo react="xxx/path" />` 指定一个 `.jsx/.tsx` 文件的路径，渲染该 react 组件并展示其代码：

```html
<demo react="../demos/demo.tsx" />
```

其对应的渲染效果如下：

<demo react="../demos/demo.tsx" />

<hr />

## 展示多语法混合 Demo

::: tip 提示
同上，如果要在你的 vitepress 站点中展示 React Demo，需要执行如下命令安装相应的依赖：

```bash
npm install react react-dom -D
```

:::

可以同时在 `<demo />` 中指定 `vue/react/html` 中的多个，以将不同语法的 Demo 展示在一个块中。

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
/>
```

其对应的渲染效果如下：

<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
/>

## 标题和描述

你可以通过 `title` 和 `description` 属性来指定 demo 的标题和描述：

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
  title="混合语法 DEMO"
  description="这是一个混合 demo 的示例，你可以使用 title 和 description 来指定 demo 的标题和描述"
/>
```

其对应的渲染效果如下：

<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
  title="混合语法 DEMO"
  description="这是一个混合 demo 的示例，你可以使用 title 和 description 来指定 demo 的标题和描述"
/>

## 打开 Github 和 Gitlab

你可以在 `<demo />` 中通过 `github` 和 `gitlab` 属性来指定一个链接，点击时能跳转至对应的链接地址。

```html
<demo
  vue="../demos/demo.vue"
  github="https://github.com/zh-lx/vitepress-demo-plugin/blob/main/packages/docs/demos/demo.vue" 
/>  
```

其对应的渲染效果如下：

<demo
  vue="../demos/demo.vue"
  github="https://github.com/zh-lx/vitepress-demo-plugin/blob/main/packages/docs/demos/demo.vue" 
/>

Gitlab 的使用方式和 Github 一致，只需将 `github` 属性替换为 `gitlab` 属性即可。
