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
import { vitepressDemoPlugin } from 'vitepress-demo-plugin/markdown'; // [!code ++]
import path from 'node:path';

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

## 展示 Svelte Demo

::: tip 提示
如果要在你的 vitepress 站点中展示 Svelte Demo，需要执行如下命令安装对应的依赖：

```bash
npm install svelte @sveltejs/vite-plugin-svelte -D
```

并在 `.vitepress/config.ts` 的 `vite.plugins` 中引入 svelte 插件：

```ts
import { svelte } from '@sveltejs/vite-plugin-svelte'; // [!code ++]

export default defineConfig({
  // other configs...
  vite: { // [!code ++]
    plugins: [svelte()], // [!code ++]
  }, // [!code ++]
});
```
:::

通过 `<demo svelte="xxx/path" />` 指定一个 `.svelte` 文件的路径，渲染该 svelte 组件并展示其代码：

```html
<demo svelte="../demos/demo.svelte" />
```

其对应的渲染效果如下：

<demo svelte="../demos/demo.svelte" />

## 展示 Preact Demo

::: tip 提示
如果要在你的 vitepress 站点中展示 Preact Demo，需要执行如下命令安装对应的依赖：

```bash
npm install preact @preact/preset-vite -D
```

并在 `.vitepress/config.ts` 的 `vite.plugins` 中引入 Preact 插件。由于 Preact、React 和 Solid 都使用 `.jsx/.tsx` 扩展名，建议将 Preact 组件命名为 `*.preact.tsx`，通过 `include` 限定插件只处理这些文件，并关闭 React 兼容别名：

```ts
import preact from '@preact/preset-vite'; // [!code ++]

export default defineConfig({
  // other configs...
  vite: { // [!code ++]
    plugins: [ // [!code ++]
      preact({ // [!code ++]
        include: [/\.preact\.tsx$/], // [!code ++]
        reactAliasesEnabled: false, // [!code ++]
        babel: {}, // [!code ++]
      }), // [!code ++]
    ], // [!code ++]
  }, // [!code ++]
});
```
:::

通过 `<demo preact="xxx/path" />` 指定一个 `.jsx/.tsx` 文件的路径，渲染该 Preact 组件并展示其代码：

```html
<demo preact="../demos/demo.preact.tsx" />
```

其对应的渲染效果如下：

<demo preact="../demos/demo.preact.tsx" />

## 展示 Solid Demo

::: tip 提示
如果要在你的 vitepress 站点中展示 Solid Demo，需要执行如下命令安装对应的依赖：

```bash
npm install solid-js vite-plugin-solid -D
```

并在 `.vitepress/config.ts` 的 `vite.plugins` 中引入 solid 插件。由于 Solid 和 React 都使用 `.jsx/.tsx` 扩展名，建议将 Solid 组件命名为 `*.solid.tsx`，并通过 `include` 限定 solid 插件只处理这些文件，避免影响 React 组件的编译：

```ts
import solid from 'vite-plugin-solid'; // [!code ++]

export default defineConfig({
  // other configs...
  vite: { // [!code ++]
    plugins: [solid({ include: [/\.solid\.tsx$/] })], // [!code ++]
  }, // [!code ++]
});
```
:::

通过 `<demo solid="xxx/path" />` 指定一个 solid 组件文件的路径，渲染该 solid 组件并展示其代码：

```html
<demo solid="../demos/demo.solid.tsx" />
```

其对应的渲染效果如下：

<demo solid="../demos/demo.solid.tsx" />

<hr />

## 展示多语法混合 Demo

::: tip 提示
同上，如果要在你的 vitepress 站点中展示 React、Svelte、Preact 或 Solid Demo，需要执行如下命令安装相应的依赖：

```bash
npm install react react-dom -D
npm install svelte @sveltejs/vite-plugin-svelte -D
npm install preact @preact/preset-vite -D
npm install solid-js vite-plugin-solid -D
```

:::

可以同时在 `<demo />` 中指定 `vue/react/svelte/solid/preact/html` 中的多个，以将不同语法的 Demo 展示在一个块中。

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  svelte="../demos/demo.svelte"
  preact="../demos/demo.preact.tsx"
  solid="../demos/demo.solid.tsx"
  html="../demos/demo.html"
/>
```

其对应的渲染效果如下：

<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  svelte="../demos/demo.svelte"
  preact="../demos/demo.preact.tsx"
  solid="../demos/demo.solid.tsx"
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

## SSG

为了避免用户组件中使用了 `window`、`document` 等浏览器环境变量，`vitepress-demo-plugin` 默认会使用 `<ClientOnly>` 组件包装用户的组件。然而，这会导致用户的组件无法参与静态编译，从而组件在页面的加载速度变慢。

如果你确定你的组件中没有使用到 `window`、`document` 等浏览器环境变量且仅是用了 vue 组件，你可以通过 `ssg` 属性来关闭 `<ClientOnly>` 组件的包装，从而加快组件的加载速度。

```html
<demo
  vue="../demos/demo.vue"
  ssg="true"
/>  
```

其对应的渲染效果如下：

<demo
  vue="../demos/demo.vue"
  ssg="true"
/>
