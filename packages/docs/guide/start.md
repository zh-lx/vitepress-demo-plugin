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

### 配置插件

在 `.vitepress/config.ts` 中添加如下代码以引入 `vitepressDemoPlugin` 插件：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-box';
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

### 展示 Demo

在 `.md` 文件中使用 `<demo />` 来展示 demo 及代码。

<hr />

#### Vue Demo

通过 `<demo vue="xxx/path" />` 指定一个 `.vue` 文件的路径，渲染该 vue 组件并展示其代码：

```html
<demo vue="../demos/demo.vue" />
```

其对应的渲染效果如下：

<demo vue="../demos/demo.vue" />

<hr />

#### React Demo

通过 `<demo react="xxx/path" />` 指定一个 `.jsx/.tsx` 文件的路径，渲染该 react 组件并展示其代码：

```html
<demo react="../demos/demo.tsx" />
```

其对应的渲染效果如下：

<demo react="../demos/demo.tsx" />

<hr />

#### Html Demo

通过 `<demo html="xxx/path" />` 指定一个 `.html` 文件的路径，渲染该 html 组件并展示其代码：

```html
<demo html="../demos/demo.html" />
```

其对应的渲染效果如下：

<demo html="../demos/demo.html" />

<hr />

#### 多语法混合 Demo

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
