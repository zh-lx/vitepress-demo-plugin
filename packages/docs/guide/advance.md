# 进阶配置

## 指定目录

如果你的 demo 文件和你的 `.md` 文件不是在一个目录下，引用 demo 的相对路径可能比较长，你可以通过 `demoDir` 属性指定 demo 所在的目录以简化引入路径。

例如以下的目录结构:

```
docs
├─ .vitepress
│  └─ config.ts
├─ guide
│  └─ start.md
└─ demos
   ├─ base
   |  └─ demo.html
   ├─ demo.tsx
   └─ demo.vue
```

在 `config.ts` 中添加如下代码：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import path from 'path';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../demos'), // [!code ++]
      });
    },
  },
});
```

### 配置指定目录前

配置指定目录之前，在 `start.md` 中，我们是通过相对路径引入 demo 的：

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/base/demo.html"
/>
```

### 配置指定目录后

配置指定目录之后，在 `start.md` 中，我们可以简化引入路径为：

```html
<demo vue="demo.vue" react="demo.tsx" html="base/demo.html" />
```

## 自定义 demo 容器背景

你可以通过 `background` 属性来指定 demo 容器的背景颜色。

```html
<demo vue="demo.vue" background="#f0ffff" />
```

<demo vue="demo.vue" background="#f0ffff" />

## 展示顺序和默认选中

### 局部配置

当在一个 `<demo />` 组件中同时展示多种语法时，默认的展示顺序为 `vue,react,html` 且默认选中展示顺序中的第一种语法。

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
  vue="demo.vue"
  react="demo.tsx"
  html="demo.html"
  order="html,react,vue"
  select="react"
/>

### 全局配置

如果你想对全局的 `<demo />` 组件生效，在 `.vitepress/config.ts` 中添加 `tabs` 配置，例如：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import path from 'path';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../demos'),
        tabs: {
          // [!code ++]
          order: 'html,react,vue', // [!code ++]
          select: 'react', // [!code ++]
        }, // [!code ++]
      });
    },
  },
});
```

## 展示多文件代码

### 数组方式

如果你的 demo 中包含多个文件，你可以通过 `vueFiles/reactFiles/htmlFiles` 属性来指定需要展示对应类型 demo 的文件及代码。例如：

```html
<demo
  vue="../demos/multiple.vue"
  :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']"
/>
```

其对应的渲染效果如下：

<demo
  vue="../demos/multiple.vue"
  :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']"
/>

### 对象方式

默认情况下，`vitepress-demo-plugin` 多文件展示时会取文件路径的 `basename` 作为文件名，你也可以通过 `Object` 类型的 `vueFiles/reactFiles/htmlFiles` 属性来指定文件名。例如，你想通过 `constant/students.ts` 来体现出文件所在的目录层级，你可以通过如下方式：

```html
<demo
  vue="../demos/multiple.vue"
  :vueFiles="{
    'multiple.vue': '../demos/multiple.vue',
    'constant/students.ts': '../demos/constant/students.ts',
  }"
/>
```

其对应的渲染效果如下：

<demo
  vue="../demos/multiple.vue"
  :vueFiles="{
    'multiple.vue': '../demos/multiple.vue',
    'constant/students.ts': '../demos/constant/students.ts',
  }"
/>

### 自定义展示

你也可以通过 `vueFiles/reactFiles/htmlFiles` 属性去完全自定义要展示的文件及代码，例如你要展示一份代码的 `typescript` 和 `javascript` 的两种格式，你可以通过如下方式：

```html
<demo
  react="../demos/demo.tsx"
  :reactFiles="{
    'Typescript': '../demos/demo.tsx',
    'Javascript': '../demos/demo.jsx',
  }"
/>
```

其对应的渲染效果如下：

<demo
  react="../demos/demo.tsx"
  :reactFiles="{
    'Typescript': '../demos/demo.tsx',
    'Javascript': '../demos/demo.jsx',
  }"
/>

### 🚨 注意事项

`vitepress-demo-plugin` 内部会将 `vueFiles/reactFiles/htmlFiles` 作为一个类型为 `string[] | Record<string, string>` 的字符串来处理，所以你只能直接声明 `vueFiles/reactFiles/htmlFiles` 的值，不能通过引用变量的方式来代替。

- ❌ 错误示例

  ```html
  const vueFiles = ['../demos/multiple.vue', '../demos/constant/students.ts'];

  <demo vue="../demos/multiple.vue" :vueFiles="vueFiles" />
  ```

- ✅ 正确示例

  ```html
  <demo
    vue="../demos/multiple.vue"
    :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']"
  />
  ```

## Html 引用本地资源

如果想在 `html` 标签中通过链接引用本地的资源，需要将资源文件放置在 `public` 目录下，然后通过绝对路径引用。以 [demo-link.html](https://github.com/zh-lx/vitepress-demo-plugin/blob/main/packages/docs/demos/demo-link.html) 的代码为例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo With Style Link</title>
    <!-- 通过绝对路径引用 public 目录下的本地资源 -->
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="title">Html demo with style link</div>
  </body>
</html>
```

正确的资源结构如下：

```
my-docs
├── demos
│   └── demo-link.html
└── public
    └── style.css
```

<demo html="demo-link.html" />

## 写入 html 的方式

对于 html 类型的 demo，`vitepress-demo-plugin` 有两种代码写入方式，可以通过 `htmlWriteWay` 属性来指定:

- `write` 方式：使用 `document.write` 写入 html 内容，这种写入比较丝滑，可以避免在多 demo 模式切换代码时闪烁的问题。
- `srcdoc` 方式：使用 `iframe.srcdoc` 写入 html 内容，可以避免因为 `document.write` 弃用导致的控制台 warning 问题。

示例：

```ts
<demo html="demo.html" htmlWriteWay="srcdoc" />
```

## 样式隔离

::: tip 注意
样式隔离是基于 `vitepress` 自身提供的 [raw](https://vitepress.dev/zh/guide/markdown#raw) 实现的，但是 `vitepress-demo-plugin` 内部已经对 `demo` 添加了 `vp-raw` 类名，所以你不需要再手动添加 `::: raw` 或者 `vp-raw` 类名，否则会影响到代码块的样式。
:::

vitepress 内置的一些 css 样式可能会影响到 demo 的展示，可以参考通过以下方法实现样式隔离：

1. 安装 `postcss` 插件：

```shell
npm install postcss -D
# or
yarn add postcss -D
# or
pnpm add postcss -D
```

2. 在项目根目录下创建 `postcss.config.mjs` 文件，并添加以下内容：

```js
import { postcssIsolateStyles } from 'vitepress';

export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/, /base\.css/],
    }),
  ],
};
```

以 `element-plus` 的 `table` 组件为例，渲染效果如下：

<demo vue="element-table.vue" scope="element" />

## 代码主题

`vitepress-demo-plugin` 的代码块展示是基于 [Shiki](https://shiki.tmrs.site/) 实现的，因此你可以使用一切 `Shiki` 默认捆绑的主题。主题列表可以参考 [Shiki 官网 - 捆绑的主题](https://shiki.tmrs.site/themes#%E6%8D%86%E7%BB%91%E7%9A%84%E4%B8%BB%E9%A2%98)。

你可以通过 `lightTheme`(默认为 `github-light`) 和 `darkTheme`(默认为 `github-dark`) 分别指定亮色模式和暗色模式下的代码块主题。在 `config.ts` 中添加如下代码：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import path from 'path';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        lightTheme: 'github-light', // [!code ++]
        darkTheme: 'github-dark', // [!code ++]
      });
    },
  },
});
```

## 国际化

你可以通过 `locale` 参数配置代码展示组件的国际化文案。`locale` 是一个键值对对象，`key` 为你 `vitepress` 中配置的多语言的 `lang` 属性，`value` 为 `'zh-CN' | 'en-US' | LocaleText`。

示例如下:

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import path from 'path';

export default defineConfig({
  // other configs...
  locales: {
    root: {
      lang: 'zh',
      // ...other config
    },
    en: {
      lang: 'en-US',
      // ...other config
    },
    ja: {
      lang: 'ja',
      // ...other config
    },
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        // key 对应上面的 lang
        locale: {
          zh: 'zh-CN', // zh-CN 代表使用内置的中文文案
          'en-US': 'en-US', // en-US 代表使用内置的英文文案
          // 自定义其他语言：
          ja: {
            openInStackblitz: 'Stackblitz で開く',
            openInCodeSandbox: 'Codesandbox で開く',
            openInGithub: 'GitHub で開く',
            openInGitlab: 'GitLab で開く',
            collapseCode: 'コードを折りたたむ',
            expandCode: 'コードを展開する',
            copyCode: 'コードをコピーする',
          },
        },
      });
    },
  },
});
```

需要配置的 `LocaleText` 类型定义请参考 [text.ts](https://github.com/zh-lx/vitepress-demo-plugin/blob/main/packages/plugin/src/locales/text.ts)
