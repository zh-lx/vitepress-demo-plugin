# 进阶配置

## 指定目录

如果你的 demo 文件和你的 `.md` 文件不是在一个目录下，引用 demo 的相对路径可能比较长，你可以通过 `demoRoot` 属性指定 demo 所在的目录以简化引入路径。

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
        demoRoot: path.resolve(__dirname, '../demos'),
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
