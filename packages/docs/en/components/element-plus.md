# Element PLus

This section will take `element-plus` as an example to teach how to import component libraries globally.

## Install element-plus

Execute the following command in the terminal to install the `element-plus` component library:

```shell
npm i element-plus
```

## Global registration

Add the following configuration to the `.vitepress/theme/index.ts` file:

```ts
import Theme from 'vitepress/theme';
import ElementPlus from 'element-plus'; // Import component library
import 'element-plus/dist/index.css'; // Import style

export default {
...Theme,
enhanceApp({ app }) {
app.use(ElementPlus); // Register component library
},
};
```

## Display Demo

```html
<demo vue="ele.vue" />
```

The rendering result is as follows:

<demo vue="ele.vue" />