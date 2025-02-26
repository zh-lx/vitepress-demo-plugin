# 展示 Element PLus 组件库

本节将以 `element-plus` 为例，进行组件库全局引入的教学。

## 安装 element-plus

在终端执行以下指令安装 `element-plus` 组件库：

```shell
npm i element-plus
```

## 全局注册

在 `.vitepress/theme/index.ts` 文件中添加如下配置:

```ts
import Theme from 'vitepress/theme';
import ElementPlus from 'element-plus'; // 引入组件库
import 'element-plus/dist/index.css'; // 引入样式

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(ElementPlus); // 注册组件库
  },
};
```

## 展示 Demo

```html
<demo vue="ele.vue" scope="element" />
```

渲染效果如下：

<demo vue="ele.vue" scope="element" />
