# 进阶配置

## 指定目录

如果你的 demo 和你的 `.md` 文件不是在一个目录下，引用的相对路径可能比较长，你可以通过 `demoRoot` 属性指定 demo 所在的目录，然后直接基于 `demoRoot` 的路径去配置你的 demo 路径。

例如以下的目录结构:

```
docs
├─ .vitepress
│  └─ config.ts
├─ guide
│  └─ start.md
└─ demos
   ├─ demo.html
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

在 `start.md` 中，配置指定目录之前，我们是通过相对路径引入 demo 的：

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
/>
```

### 配置指定目录后

配置了指定目录之后，我们可以直接通过相对于 `demos` 目录的路径引入 demo：

```html
<demo vue="demo.vue" react="demo.tsx" html="demo.html" />
```
