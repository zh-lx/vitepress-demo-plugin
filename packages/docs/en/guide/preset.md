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
              scope: 'myScope', // Only valid for scope demo components // [!code ++]
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

## Custom Playground <Badge type="tip" text="1.6.0+" vertical="middle" />

In addition to `codesandbox` and `stackblitz`, you can configure links to other playground platforms. The `playground` configuration is defined as follows:

```ts
export type PlaygroundConfig = {
  // The URL to open
  url: string | ((content: string) => string);
  // Custom file processing logic
  fn?: (files: Record<string, string>) => string;
  // Some playgrounds require a specific entry file name. For example,
  // the Element Plus playground requires App.vue. VitePress replaces the
  // corresponding demo entry file name with the value configured here.
  entryName?: {
    vue?: string; // Defaults to App.vue
    react?: string; // Defaults to App.tsx
    html?: string; // Defaults to index.html
  };
};

export type Playground = {
  // Whether to show the playground button for all demos
  show: boolean;
  // Platform templates
  templates?: PlatformTemplate[];
  // Playground configuration. A name is required when using the array form.
  config: PlaygroundConfig | (PlaygroundConfig & { name: string })[];
};
```

### Basic Configuration

`vitepress-demo-plugin` provides built-in logic for processing playground code parameters. It works with many playground platforms, such as the [Vue SFC Playground](https://play.vuejs.org/) and [Element Plus Playground](https://element-plus.run/). You only need to configure the `url`:

```ts
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        playground: { // [!code ++]
          config: { // [!code ++]
            url: 'https://element-plus.run', // [!code ++]
          }, // [!code ++]
        }, // [!code ++]
      });
    },
  }
});
```

Set `playground` to `true` to use the built-in playground processing logic.

```html
<demo vue="../demos/ele.vue" playground="true" />
```
<demo vue="../demos/ele.vue" playground="elementPlus" />

### Configure Multiple Playgrounds

If you want different demos to open in different playgrounds, you can provide multiple `config` entries. The following example adds CodePlayer as a second playground.

- First, change `playground.config` to an array and set a `name`:

  ```ts
  import { defineConfig } from 'vitepress';
  import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

  export default defineConfig({
    // other configs...
    markdown: {
      config(md) {
        md.use(vitepressDemoPlugin, {
          playground: {
            config: { // [!code --]
              url: 'https://element-plus.run', // [!code --]
            }, // [!code --]
            config: [ // [!code ++]
              { // [!code ++]
                name: 'elementPlus', // [!code ++]
                url: 'https://element-plus.run', // [!code ++]
              }, // [!code ++]
            ], // [!code ++]
          },
        });
      },
    }
  });
  ```

- Add a config named `codeplayer` and customize its `url`:

  ```ts
  import { defineConfig } from 'vitepress';
  import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

  export default defineConfig({
    // other configs...
    markdown: {
      config(md) {
        md.use(vitepressDemoPlugin, {
          playground: {
            config: [
              {
                name: 'elementPlus',
                url: 'https://element-plus.run',
              },
              { // [!code ++]
                name: 'codeplayer', // [!code ++]
                url: (content: string) => `https://play.fe-dev.cn/?entry=index.html#${content}`, // [!code ++]
              }, // [!code ++]
            ],
          },
        });
      },
    }
  });
  ```

- Add the `codeplayer` scope using the format required by [CodePlayer](https://play.fe-dev.cn/):

  ```ts
  import { defineConfig } from 'vitepress';
  import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

  const indexHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CodePlayer</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    <script type="module">
      import './main.ts';
    </script>
  </html>
  `.trim();

  const mainTs = `
  import { createApp } from 'vue';
  import App from './App.vue';
  const app = createApp(App);
  app.mount('#app');
  `.trim();

  const importJson = `
  {
    "imports": {
      "vue": "https://esm.sh/vue@latest"
    }
  }`.trim();

  export default defineConfig({
    // other configs...
    markdown: {
      config(md) {
        md.use(vitepressDemoPlugin, {
          playground: {
            config: [
              {
                name: 'elementPlus',
                url: 'https://element-plus.run',
              },
              {
                name: 'codeplayer',
                url: (content: string) => `https://play.fe-dev.cn/?entry=index.html#${content}`,
              },
            ],
            templates: [ // [!code ++]
              {  // [!code ++]
                scope: 'codeplayer', // [!code ++]
                files: {  // [!code ++]
                  'main.ts': mainTs, // [!code ++]
                  'index.html': indexHtml, // [!code ++]
                  'import-map.json': importJson, // [!code ++]
                }  // [!code ++]
              },  // [!code ++]
            ] // [!code ++]
          },
        });
      },
    }
  });
  ```

- Customize the `fn` function according to [CodePlayer's serialization format](https://play.fe-dev.cn/docs/guide/start.html):

  ```ts
  import { defineConfig } from 'vitepress';
  import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

  const indexHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CodePlayer</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    <script type="module">
      import './main.ts';
    </script>
  </html>
  `.trim();

  const mainTs = `
  import { createApp } from 'vue';
  import App from './App.vue';
  const app = createApp(App);
  app.mount('#app');
  `.trim();

  const importJson = `
  {
    "imports": {
      "vue": "https://esm.sh/vue@latest"
    }
  }`.trim();

  export default defineConfig({
    // other configs...
    markdown: {
      config(md) {
        md.use(vitepressDemoPlugin, {
          playground: {
            config: [
              {
                name: 'elementPlus',
                url: 'https://element-plus.run',
              },
              {
                name: 'codeplayer',
                url: (content: string) => `https://play.fe-dev.cn/?entry=index.html&activeFile=App.vue#${content}`,
                fn: (files: Record<string, string>) => { // [!code ++]
                  return btoa(JSON.stringify(files)); // [!code ++]
                }, // [!code ++]
              },
            ],
            templates: [
              {
                scope: 'codeplayer',
                files: {
                  'main.ts': mainTs,
                  'index.html': indexHtml,
                  'import-map.json': importJson,
                },
              },
            ],
          },
        });
      },
    }
  });
  ```

You can now open each demo in a different playground:

- Open in Element Plus Playground

```html
<demo vue="../demos/ele.vue" playground="elementPlus" />
```
<demo vue="../demos/ele.vue" playground="elementPlus" />

- Open in CodePlayer

```html
<demo
  vue="../demos/multiple.vue"
  :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']" playground="codeplayer"
/>
```

<demo
  vue="../demos/multiple.vue"
  :vueFiles="['../demos/multiple.vue', '../demos/constant/students.ts']"
  playground="codeplayer"
  scope="codeplayer"
/>
