# Quick Start

## Installation

Choose your preferred package manager for installation:

```bash
npm install vitepress-demo-plugin -D
```

```bash
yarn add vitepress-demo-plugin -D
```

```bash
pnpm add vitepress-demo-plugin -D
```

## Import Plugin

Add the following code to `.vitepress/config.ts` to import the `vitepressDemoPlugin`:

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

## Vue Demo

You can set path of `.vue` file by `<demo vue="xxx/path" />` in `.md` file, render this vue component and display source code.

```html
<demo vue="../demos/demo.vue" />
```

The corresponding rendering result is as follows:

<demo vue="../demos/demo.vue" />

## Html Demo

You can set path of `.html` file by `<demo html="xxx/path" />` in `.md` file, render this html file and display source code.

```html
<demo html="../demos/demo.html" />
```

The corresponding rendering result is as follows:

<demo html="../demos/demo.html" />

## React Demo

::: tip Tip
If you want to display React Demo in your vitepress site, you need install related decencies by command below


```bash
npm install react react-dom -D
```
:::

You can set path of `.jsx/.tsx` file by `<demo react="xxx/path" />` in `.md` file, render this html file and display source code.

```html
<demo react="../demos/demo.tsx" />
```

The corresponding rendering result is as follows:

<demo react="../demos/demo.tsx" />

<hr />

## Mixed Demo

::: tip Tip
Same as above, if you want to display React Demo in your vitepress site, you need to execute the following command to install the corresponding dependencies:

```bash
npm install react react-dom -D
```

:::

You can specify multiple `vue/react/html` in `<demo />` at the same time to display demos with different syntaxes in one block.

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
/>
```

The corresponding rendering result is as follows:

<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
/>

## Title And Description

Set demo title and description by `title` 和 `description`:

```html
<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
  title="Multiple Syntax DEMO"
  description="This is an example of a mixed demo. You can use title and description to specify the title and description of the demo."
/>
```

The corresponding rendering result is as follows:

<demo
  vue="../demos/demo.vue"
  react="../demos/demo.tsx"
  html="../demos/demo.html"
  title="Multiple Syntax DEMO"
  description="This is an example of a mixed demo. You can use title and description to specify the title and description of the demo."
/>

## Open Github And Gitlab

You can add link by `github` and `gitlab` in `<demo />`. It will navigate to corresponding address.

```html
<demo
  vue="../demos/demo.vue"
  github="https://github.com/zh-lx/vitepress-demo-plugin/blob/main/packages/docs/demos/demo.vue" 
/>  
```

The corresponding rendering result is as follows:

<demo
  vue="../demos/demo.vue"
  github="https://github.com/zh-lx/vitepress-demo-plugin/blob/main/packages/docs/demos/demo.vue" 
/>

For GitLab, the usage is the same as GitHub. Simply replace `github` with `gitlab`.

## SSG

To avoid using `window`、`document` 等 browser environment variables in user components, `vitepress-demo-plugin` defaults to using the `<ClientOnly>` component to wrap user components. However, this will cause the user's components to not participate in static compilation, thus slowing down the loading speed of the components on the page.

If you are sure that your components do not use `window`、`document` etc. browser environment variables and only use vue components, you can close the `<ClientOnly>` component's packaging by setting the `ssg` attribute, thus speeding up the loading speed of the components.

```html
<demo
  vue="../demos/demo.vue"
  ssg="true"
/>  
```

The corresponding rendering result is as follows:

<demo
  vue="../demos/demo.vue"
  ssg="true"
/>
