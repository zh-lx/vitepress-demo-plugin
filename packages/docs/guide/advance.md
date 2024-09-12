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
import { vitepressDemoPlugin } from 'vitepress-demo-box';
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

## 多代码 Tabs 配置

### Tabs 顺序

当在一个 `<demo />` 组件中展示多种语法的 demo 时，默认的 Tabs 展示顺序为 `vue/react/html`。你可以通过 `tab.order` 来指定代码的 tabs 顺序。

在 `config.ts` 中添加如下代码：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-box';
import path from 'path';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        tabs: { // [!code ++]
          order: ['html', 'react', 'vue'],  // [!code ++]
        }, // [!code ++]
      });
    },
  },
});
```

### 默认选中的 Tab

`<demo />` 组件中默认渲染并展示代码的 Tab 是第一个 Tab，你可以使用 `tab.defaultSelect` 来改变默认渲染并展示代码的 Tab。

在 `config.ts` 中添加如下代码：

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-box';
import path from 'path';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        tabs: {
          order: ['html', 'react', 'vue'],
          defaultSelect: 'react'  // [!code ++]
        },
      });
    },
  },
});
```