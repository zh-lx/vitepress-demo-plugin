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