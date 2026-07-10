# 第三方平台

## 跳转在线代码编辑平台

`vitepress-demo-plugin` 支持跳转至流行的在线代码编辑平台，如 Stackblitz，Codesandbox 等，有局部开启和全局开启两种方式。

### 局部开启

在 `<demo />` 组件中添加 `stackblitz/codesandbox` 属性，可对单个 `<demo />` 组件生效。例如：

```html
<demo vue="../demos/demo.vue" stackblitz="true" codesandbox="true" />
```

渲染效果如下：

<demo vue="../demos/demo.vue" stackblitz="true" codesandbox="true" />

### 全局开启

在 `.vitepress/config.ts` 中添加如下配置，可对所有 `<demo />` 组件生效。

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
## 预设文件及代码

`vitepress-demo-plugin` 预设了一些文件配置，让你多数情况下不需要单独配置文件就能够打开 `stackblitz/codesandbox` 等平台去预览你的 `<demo />`。不同平台及 demo 类型预设的文件及代码如下：

::: details 展开查看 stackblitz 平台 Vue 预设文件及代码
::: code-group

```html [src/Demo.vue]
<!-- 会动态替换为你的 demo 代码 -->
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
    // 会根据你 demo 中的 import 依赖自动添加
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

::: details 展开查看 stackblitz 平台 React 预设文件及代码
::: code-group

```html [src/Demo.tsx]
<!-- 会动态替换为你的 demo 代码 -->
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

::: details 展开查看 stackblitz 平台 Html 预设文件及代码
::: code-group

```html [index.html]
<!-- 会动态替换为你的 demo 代码 -->
```

:::

::: details 展开查看 codesandbox 平台 Vue 预设文件及代码
::: code-group

```html [Demo.vue]
<!-- 会动态替换为你的 demo 代码 -->
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

::: details 展开查看 codesandbox 平台 React 预设文件及代码
::: code-group

```html [Demo.tsx]
<!-- 会动态替换为你的 demo 代码 -->
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

::: details 展开查看 codesandbox 平台 Html 预设文件及代码
::: code-group

```html [index.html]
<!-- 会动态替换为你的 demo 代码 -->
```

:::

## 自定义文件及代码

`vitepress-demo-plugin` 支持自定义文件及代码，你可以在 `.vitepress/config.ts` 中添加 `templates` 配置，来替换预设文件的代码或者添加新的文件。`templates` 的类型如下：

```ts
type Template = {
  scope: 'global' | 'vue' | 'react' | 'html' | string;
  files: {
    [filename: string]: string; // 代码内容
  };
}

type Templates = Template[];
```

### 全类别生效

当设置 `scope` 为 `global` 时，表示该模板对所有类型的 demo 组件都生效。以 stackblitz 平台为例：

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
              scope: 'global', // 针对所有类型的 demo 组件都生效 // [!code ++]
              files: { // [!code ++]
                // 新添加一个文件 // [!code ++]
                'print.js': `console.log("Hello！Vitepress Demo Plugin")`, // [!code ++]
                // 替换预设的 index.html 文件 // [!code ++]
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

### 单类别生效

当设置 `scope` 为 `vue/react/html` 时，表示该模板仅对相应类型的 demo 组件生效。以下面的 demo 为例，仅对 Vue 类型的 demo 组件生效：

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
              scope: 'global', // 针对所有类型的 demo 组件都生效
              files: {
                // 新添加一个文件
                'print.js': `console.log("Hello！Vitepress Demo Plugin")`,
                // 替换预设的 index.html 文件
                'index.html': `<!DOCTYPE html><html><body><div id="app"></div></body><script src="print.js"></script></html>`,
              },
            },
            { // [!code ++]
              scope: 'vue', // 仅针对 Vue 类型的 demo 组件生效 // [!code ++]
              files: { // [!code ++]
                // 替换预设的 main.ts 文件 // [!code ++]
                'src/main.ts': `import { createApp } from "vue";\nimport Demo from "./Demo.vue";\nconst app = createApp(Demo);\napp.mount("#app");`, // [!code ++]
              } // [!code ++]
            }, // [!code ++]
          ]
        }
      });
    },
  }
});
```

### 自定义 demo 生效范围

你也可以自定义 `scope` 的名称，表示该模板仅对相应类型的 demo 组件生效。例如：

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
              scope: 'global', // 针对所有类型的 demo 组件都生效
              files: {
                // 新添加一个文件
                'print.js': `console.log("Hello！Vitepress Demo Plugin")`,
                // 替换预设的 index.html 文件
                'index.html': `<!DOCTYPE html><html><body><div id="app"></div></body><script src="print.js"></script></html>`,
              },
            },
            { 
              scope: 'vue', // 仅针对 Vue 类型的 demo 组件生效
              files: { 
                // 替换预设的 main.ts 文件
                'src/main.ts': `import { createApp } from "vue";\nimport Demo from "./Demo.vue";\nconst app = createApp(Demo);\napp.mount("#app");`, 
              } 
            },
            { // [!code ++]
              scope: 'myScope', // 仅针对 scope demo 组件生效 // [!code ++]
              files: { // [!code ++]
                // 替换预设的 main.ts 文件 // [!code ++]
                'src/main.ts': `console.log("this is a custom template")`, // [!code ++]
              } // [!code ++]
            }, // [!code ++]
          ]
        }
      });
    },
  }
});
```

现在你定义了一个名为 `myScope` 的模板，你可以通过 `scope` 属性来让该模版对特定的 demo 组件生效。

```html
<demo vue="../demos/demo.vue" scope="myScope" />
```

## 自定义 playground <Badge type="tip" text="1.6.0+" vertical="middle" />

除了 `codesandbox` 和 `stackblitz` 之外，也支持你自定义跳转至其他的 playground 平台，`playground` 配置项如下：

```ts
export type PlaygroundConfig = {
  // 要跳转的 url
  url: string | ((content: string) => string);
  // 自定义文件处理逻辑
  fn?: (files: Record<string, string>) => string;
  // 部分 playground 对于入口文件名有要求，如 element-plus playground 要求 App.vue
  // vitepress 会为对应的 demo 替换你设置的入口文件名
  entryName?: {
    vue?: string; // 默认为 App.vue
    react?: string; // 默认为 App.tsx
    html?: string; // 默认为 index.html
  };
};

export type Playground = {
  // 是否对全局 demo 显示 playground 按钮
  show: boolean;
  // 平台模板
  templates?: PlatformTemplate[];
  // playground 配置，Array 格式时必须指定 name
  config: PlaygroundConfig | (PlaygroundConfig & { name: string })[];
};
```

### 最简配置

`vitepress-demo-plugin` 内置了一份对于 playground 的代码参数处理逻辑，它适用于很多 playground 平台如 [vue sfc playground](https://play.vuejs.org/)、[element-plus playground](https://element-plus.run/) 等。你只需要设置 `url`:

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

设置 `playground` 为 `true`，即可使用内置的 playground 处理逻辑。

```html
<demo vue="../demos/ele.vue" playground="true" />
```
<demo vue="../demos/ele.vue" playground="elementPlus" />

### 配置多个 playground

如果你有多个 demo 想打开不同的 playground，可以配置多个 `config`，以我要添加一个 codeplayer 的 playground 为例。

- 首先将 `playground.config` 改成数组形式并且设置 `name`:

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

- 新增加一个名为 `codeplayer` 的 config，并且自定义 `url`
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

- 按照 [codeplayer](https://play.fe-dev.cn/) 平台的格式，增加 `codeplayer` 的 scope:
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

- 按照 [codeplayer 平台的序列化格式](https://play.fe-dev.cn/docs/guide/start.html)，自定义 `fn` 函数：
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

这样就可以跳转不同的 playground 了：

- 跳转到 elementPlus

```html
<demo vue="../demos/ele.vue" playground="elementPlus" />
```
<demo vue="../demos/ele.vue" playground="elementPlus" />

- 跳转到 codeplayer

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
