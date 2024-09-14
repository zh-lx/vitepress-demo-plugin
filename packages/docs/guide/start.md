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

## 引入插件

在 `.vitepress/config.ts` 中添加如下代码以引入 `vitepressDemoPlugin` 插件：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-box'; // [!code ++]
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

## 展示顺序和默认选中

你可以通过 `order` 属性来指定 demo 的展示顺序，以及通过 `select` 属性来指定默认选中的 demo。

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
  order="html,react,vue"
  select="react"
/>
```

其对应的渲染效果如下：

<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
  order="html,react,vue"
  select="react"
/>
