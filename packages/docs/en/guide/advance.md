# Advanced Configuration

## Specify Directory

If your demo file and your `.md` file are not in the same directory, the relative path to reference the demo may be long. You can specify the directory where the demo is located through the `demoDir` property to simplify the import path.

For example, the following directory structure:

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

Add following code into `config.ts`：

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

### Before Configuring The Specified Directory

Before configuring the specified directory, in `start.md`, we import demo via a relative path:

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/base/demo.html"
/>
```

### After Configuring The Specified Directory

After configuring the specified directory, in `start.md`, we can simplify the import path to:

```html
<demo vue="demo.vue" react="demo.tsx" html="base/demo.html" />
```

## Display Order And Default Selection

### Local Configuration

When multiple syntaxes are displayed in a `<demo />` component, the default display order is `vue,react,html` and the first syntax in the display order is selected by default.

You can specify the display order of demos through the `order` attribute, and specify the default selected demo through the `select` attribute.

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
  order="html,react,vue"
  select="react"
/>
```

The corresponding rendering result is as follows:

<demo
  vue="demo.vue"
  react="demo.tsx"
  html="demo.html"
  order="html,react,vue"
  select="react"
/>

### Global Configuration

If you want to make it effective for the global `<demo />` component, add the `tabs` configuration in `.vitepress/config.ts`, for example:

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
        tabs: { // [!code ++]
          order: 'html,react,vue', // [!code ++]
          select: 'react', // [!code ++]
        }, // [!code ++]
      });
    },
  },
});
```

## Display Multiple Files Code

### Array

If your demo contains multiple files, you can use the `vueFiles/reactFiles/htmlFiles` property to specify the files and codes of the corresponding type of demo to be displayed. For example:

```html
<demo
  vue="../demos/multiple.vue"
  :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']"
/>
```

The corresponding rendering result is as follows:

<demo
  vue="../demos/multiple.vue"
  :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']"
/>

### Object

By default, `vitepress-demo-plugin` takes the `basename` of the file path as the file name when displaying multiple files. You can also specify the file name through the `vueFiles/reactFiles/htmlFiles` property of the `Object` type. For example, if you want to use `constant/students.ts` to reflect the directory hierarchy of the file, you can do it as follows:

```html
<demo
  vue="../demos/multiple.vue"
  :vueFiles="{
    'multiple.vue': '../demos/multiple.vue',
    'constant/students.ts': '../demos/constant/students.ts',
  }"
/>
```

The corresponding rendering result is as follows:

<demo
  vue="../demos/multiple.vue"
  :vueFiles="{
    'multiple.vue': '../demos/multiple.vue',
    'constant/students.ts': '../demos/constant/students.ts',
  }"
/>

### Custom

You can also use the `vueFiles/reactFiles/htmlFiles` property to completely customize the files and code to be displayed. For example, if you want to display two formats of a code, `typescript` and `javascript`, you can do it as follows:

```html
<demo
  react="../demos/demo.tsx"
  :reactFiles="{
    'Typescript': '../demos/demo.tsx',
    'Javascript': '../demos/demo.jsx',
  }"
/>
```

The corresponding rendering result is as follows:

<demo
  react="../demos/demo.tsx"
  :reactFiles="{
    'Typescript': '../demos/demo.tsx',
    'Javascript': '../demos/demo.jsx',
  }"
/>

### 🚨 Notice

`vitepress-demo-plugin` internally treats `vueFiles/reactFiles/htmlFiles` as a string of type `string[] | Record<string, string>`, so you can only declare the value of `vueFiles/reactFiles/htmlFiles` directly, and cannot replace it by referencing variables.

- ❌ Wrong

  ```html
  const vueFiles = ['../demos/multiple.vue', '../demos/constant/students.ts'];

  <demo
    vue="../demos/multiple.vue"
    :vueFiles="vueFiles"
  />
  ```

- ✅ Right

  ```html
  <demo
    vue="../demos/multiple.vue"
    :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']"
  />
  ```

## Style Isolation

::: tip Tip
Style isolation is based on [raw](https://vitepress.dev/zh/guide/markdown#raw) provided by `vitepress` itself, but `vitepress-demo-plugin` has added `vp-raw` class name to `demo`, so you don't need to manually add `::: raw` or `vp-raw` class name, otherwise it will affect the style of the code block.
:::

Some built-in CSS styles of vitepress may affect the display of demo. You can refer to the following methods to achieve style isolation:

1. Install `postcss`:
  ```shell
  npm install postcss -D
  # or
  yarn add postcss -D
  # or
  pnpm add postcss -D
  ```

2. Create a `postcss.config.mjs` file in the project root directory and add the following content:
  ```js
  import { postcssIsolateStyles } from 'vitepress'

  export default {
    plugins: [
      postcssIsolateStyles({
        includeFiles: [/vp-doc\.css/]
      })
    ]
  }
  ```

Taking the `table` component of `element-plus` as an example, the rendering result is as follows:

<demo vue="element-table.vue" scope="element" />

## Code Theme

The code block display of `vitepress-demo-plugin` is based on [Shiki](https://shiki.style/), so you can use all themes supported by `Shiki`. For a list of themes, please refer to the [Shiki - Bundled Themes](https://shiki.style/themes#bundled-themes).

You can specify the code block themes in light mode and dark mode respectively through `lightTheme` (default is `github-light`) and `darkTheme` (default is `github-dark`). Add the following code in `config.ts`:

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