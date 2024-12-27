# Third Party Platform

## Jump To Online Code Editing Platform

`vitepress-demo-plugin` supports jumping to popular online code editing platforms, such as Stackblitz, Codesandbox, etc., with two ways of local opening and global opening.

### Local

Add the `stackblitz/codesandbox` attribute in the `<demo />` component to take effect on a single `<demo />` component. For example:

```html
<demo vue="../demos/demo.vue" stackblitz="true" codesandbox="true" />
```

The rendering effect is as follows:

<demo vue="../demos/demo.vue" stackblitz="true" codesandbox="true" />

### Global

Add the following configuration in `.vitepress/config.ts` to take effect on all `<demo />` components.

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        stackblitz: { // [!code ++]
          show: true, // [!code ++]
        }, // [!code ++]
        codesandbox: { // [!code ++]
          show: true, // [!code ++]
        }, // [!code ++]
      });
    },
  },
});
```
## Preset Files And Codes

`vitepress-demo-plugin` presets some file configurations, so that you can open `stackblitz/codesandbox` and other platforms to preview your `<demo />` without a separate configuration file in most cases. The preset files and codes for different platforms and demo types are as follows:

::: details Expand to view the stackblitz platform Vue preset files and codes
::: code-group

```html [src/Demo.vue]
<!-- Will be dynamically replaced with your demo code -->
```

```ts [src/main.ts]
import { createApp } from "vue";
import Demo from "./Demo.vue";

const app = createApp(Demo);
app.mount("#app");
```

```json [.stackblitzrc]
{
  "installDependencies": false,
  "startCommand": "npm install && npm run dev"
}
```

```html [index.html]
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

```json [package.json]
{
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "vue": "latest",
    // Will be automatically added based on the import dependencies in your demo
  },
  "devDependencies": {
    "vite": "latest",
    "typescript": "latest",
    "@vitejs/plugin-vue": "latest",
    "@vitejs/plugin-vue-jsx": "latest"
  }
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": [
    "src"
  ]
}
```

```ts [vite.config.js]
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

:::

::: details Expand to view the stackblitz platform React preset files and code
::: code-group

```html [src/Demo.tsx]
<!-- Will be dynamically replaced with your demo code -->
```

```ts [src/main.tsx]
import React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./Demo.tsx";

const root = createRoot(document.querySelector("#app"));
root.render(<Demo />);
```

```json [.stackblitzrc]
{
  "installDependencies": false,
  "startCommand": "npm install && npm run dev"
}
```

```html [index.html]
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

```json [package.json]
{
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "react": "latest",
    "@emotion/styled": "latest",
    "react-dom": "latest",
    "@emotion/react": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "vite": "latest",
    "@vitejs/plugin-react": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```

```ts [vite.config.js]
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
});
```

:::

::: details Expand to view the stackblitz platform Html preset files and codes
::: code-group

```html [index.html]
<!-- Expand to view the stackblitz platform Html preset files and codes -->
```

:::

::: details Expand to view codesandbox platform Vue preset files and codes
::: code-group

```html [Demo.vue]
<!-- Expand to view codesandbox platform Vue preset files and codes -->
```

```ts [main.ts]
import { createApp } from "vue";
import Demo from "./Demo.vue";

const app = createApp(Demo);
app.mount("#app");
```

```html [index.html]
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

```json [package.json]
{
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "vue": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "@vue/cli-plugin-babel": "latest"
  }
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": [
    "src"
  ]
}
```

:::

::: details Expand to view the codesandbox platform React preset files and codes
::: code-group

```html [Demo.tsx]
<!-- Expand to view the stackblitz platform Html preset files and codes -->
```

```ts [main.tsx]
import React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./Demo.tsx";

const root = createRoot(document.querySelector("#app"));
root.render(<Demo />);
```

```html [index.html]
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

```json [package.json]
{
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "react": "latest",
    "@emotion/styled": "latest",
    "react-dom": "latest",
    "@emotion/react": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```

:::

::: details Expand to view codesandbox platform Html preset files and codes
::: code-group

```html [index.html]
<!-- Expand to view the stackblitz platform Html preset files and codes -->
```

:::

## Custom Files And Code

`vitepress-demo-plugin` supports custom files and code. You can add `templates` configuration in `.vitepress/config.ts` to replace the code of the preset file or add a new file. The types of `templates` are as follows:

```ts
type Template = {
  scope: 'global' | 'vue' | 'react' | 'html' | string;
  files: {
    [filename: string]: string; // Code
  };
}

type Templates = Template[];
```

### All Kinds

When `scope` is set to `global`, it means that the template is effective for all types of demo components. Take the stackblitz platform as an example:

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        stackblitz: {
          show: true,
          templates: [ // [!code ++]
            { // [!code ++]
              scope: 'global', // This is effective for all types of demo components. // [!code ++]
              files: { // [!code ++]
                // Add new file // [!code ++]
                'print.js': `console.log("Hello！Vitepress Demo Plugin")`, // [!code ++]
                // Replace the default index.html file // [!code ++]
                'index.html': `<!DOCTYPE html><html><body><div id="app"></div></body><script src="print.js"></script></html>`, // [!code ++]
              } // [!code ++]
            }, // [!code ++]
          ], // [!code ++]
        }
      });
    },
  }
});
```

### Single Kind

When `scope` is set to `vue/react/html`, it means that the template is only valid for demo components of the corresponding type. Take the following demo as an example, it is only valid for demo components of the Vue type:

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        stackblitz: {
          show: true,
          templates: [
            {
              scope: 'global', // This is effective for all types of demo components.
              files: {
                // Add new file
                'print.js': `console.log("Hello！Vitepress Demo Plugin")`,
                // Replace the default index.html file
                'index.html': `<!DOCTYPE html><html><body><div id="app"></div></body><script src="print.js"></script></html>`,
              },
            },
            { // [!code ++]
              scope: 'vue', // Only valid for Vue demo components // [!code ++]
              files: { // [!code ++]
                // Replace the default main.ts file // [!code ++]
                'main.ts': `import { createApp } from "vue";\nimport Demo from "./Demo.vue";\nconst app = createApp(Demo);\napp.mount("#app");`, // [!code ++]
              } // [!code ++]
            }, // [!code ++]
          ]
        }
      });
    },
  }
});
```

### Customize The Demo Scope

You can also customize the name of `scope` to indicate that the template is only valid for demo components of the corresponding type. For example:

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        stackblitz: {
          show: true,
          templates: [
            {
              scope: 'global', // This is effective for all types of demo components.
              files: {
                // Add new file
                'print.js': `console.log("Hello！Vitepress Demo Plugin")`,
                // Replace the default index.html file
                'index.html': `<!DOCTYPE html><html><body><div id="app"></div></body><script src="print.js"></script></html>`,
              },
            },
            { 
              scope: 'vue', // Only valid for Vue demo components
              files: { 
                // Replace the default main.ts file
                'main.ts': `import { createApp } from "vue";\nimport Demo from "./Demo.vue";\nconst app = createApp(Demo);\napp.mount("#app");`, 
              } 
            },
            { // [!code ++]
              scope: 'myScope', // Only valid for Vue demo components // [!code ++]
              files: { // [!code ++]
                // Replace the default main.ts file // [!code ++]
                'main.ts': `console.log("this is a custom template")`, // [!code ++]
              } // [!code ++]
            }, // [!code ++]
          ]
        }
      });
    },
  }
});
```

Now that you have defined a template named `myScope`, you can use the `scope` property to make the template available to a specific demo component.

```html
<demo vue="../demos/demo.vue" scope="myScope" />
```