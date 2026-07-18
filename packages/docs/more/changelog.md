# 更新日志

## 1.7.0

- 🐛 fix: 隔离浏览器入口与 Node 模块 [#112](https://github.com/zh-lx/vitepress-demo-plugin/pull/112)

## 1.6.0

- 🎉 feat: 支持自定义 playground 跳转 [#108](https://github.com/zh-lx/vitepress-demo-plugin/pull/108)
- 🐛 fix: 修复同一个 `markdown` 文件中同时使用 vue demo 和 `<script setup />` 语法报错的问题 [#107](https://github.com/zh-lx/vitepress-demo-plugin/pull/107)
- 🐛 fix: 修复多文件 demo 打开 stackblitz 和 codesandbox 失败的问题 [#110](https://github.com/zh-lx/vitepress-demo-plugin/pull/110)
- 🐛 fix: 修复 codesandbox、stackblitz 是否开启在多个 demo 中互相污染的问题 [#110](https://github.com/zh-lx/vitepress-demo-plugin/pull/110)

## 1.5.1

- 🐛 fix: 提升了复制代码的浏览器兼容性 [#103](https://github.com/zh-lx/vitepress-demo-plugin/pull/103)

## 1.5.0

- 🎉 feat: 支持自定义 demo 容器背景 [#98](https://github.com/zh-lx/vitepress-demo-plugin/pull/98)
- 🐛 fix: 修复了重写路由时 demo 相对路径不生效的问题 [#99](https://github.com/zh-lx/vitepress-demo-plugin/pull/99)

## 1.4.7

- 🐛 fix: 修复了 Html Demo 文档重复写入的问题 [#97](https://github.com/zh-lx/vitepress-demo-plugin/pull/97)

## 1.4.6

- 🐛 fix: 修复了 demo 重复初始化导致的报错问题 [#96](https://github.com/zh-lx/vitepress-demo-plugin/pull/96)

## 1.4.5

- 🐛 fix: 修复了 Demo 宽度可能溢出容器的问题 [#94](https://github.com/zh-lx/vitepress-demo-plugin/pull/94)
- 🐛 fix: 支持 `document.write` 的浏览器中预览 Html Demo [#94](https://github.com/zh-lx/vitepress-demo-plugin/pull/94)
- 🐛 fix: 修复了开发环境关于 `Vue received a Component that was made a reactive object` 的报错问题 [#93](https://github.com/zh-lx/vitepress-demo-plugin/pull/93)

## 1.4.4

- 🐛 fix: 修复了 Html Demo 不显示的问题 [#90](https://github.com/zh-lx/vitepress-demo-plugin/pull/90)

## 1.4.3

- 🐛 fix: 修复了 Html Demo 样式隔离不生效的问题 [#89](https://github.com/zh-lx/vitepress-demo-plugin/pull/89)

## 1.4.2

- 🐛 fix: 修复了部分组件打包时使用浏览器 API 的报错问题 [#86](https://github.com/zh-lx/vitepress-demo-plugin/pull/86)

## 1.4.1

- 🐛 fix: 修复了复制成功的文案国际化不生效的问题 [#81](https://github.com/zh-lx/vitepress-demo-plugin/pull/81)

## 1.4.0

- 🎉 feat: 支持国际化 [#80](https://github.com/zh-lx/vitepress-demo-plugin/pull/80)

## 1.3.1

- 🐛 fix: 修复了 ssg 组件打包时关于 `DOMParser` 报错的问题 [#74](https://github.com/zh-lx/vitepress-demo-plugin/pull/74)
- 🐛 fix: 修复了组件展开时不展示代码的问题 [#73](https://github.com/zh-lx/vitepress-demo-plugin/pull/73)

## 1.3.0

- 🎉 feat: 对于未使用客户端 api 的 vue 组件，支持 SSG 进行静态构建 [#71](https://github.com/zh-lx/vitepress-demo-plugin/pull/71)
- 🎉 feat: 组件加载完成前，增加 loading 状态 [#70](https://github.com/zh-lx/vitepress-demo-plugin/pull/70)
- 🎉 feat: 代码主题从 highlight.js 迁移至 shiki [#69](https://github.com/zh-lx/vitepress-demo-plugin/pull/69)
- 🐛 fix: 修复了多文件 demo 复制代码时，复制的不是当前文件代码的问题 [#68](https://github.com/zh-lx/vitepress-demo-plugin/pull/68)
- 🐛 fix: 修复了 Windows 系统多文件无法切换的问题 [ab1675b0](https://github.com/zh-lx/vitepress-demo-plugin/commit/ab1675b07ce4c68ba86081e123b81c6f597bd350)

## 1.2.3

- 🐛 fix: 修复了代码块展开时底部两侧的样式问题 [#58](https://github.com/zh-lx/vitepress-demo-plugin/pull/58)

## 1.2.2

- 🐛 fix: 修复了 `vite-plugin-node-polyfills` 插件不兼容 `fs` 模块导致多文件 demo 展示不生效的问题 [#c1d3b39f](https://github.com/zh-lx/vitepress-demo-plugin/commit/c1d3b39f0e517a7680f472585259614a512cd942)

## 1.2.1

- 🐛 fix: 修复了文档打包时关于 `Module "path" has been externalized for browser compatibility` 的告警问题 [#51](https://github.com/zh-lx/vitepress-demo-plugin/pull/51)
- 🐛 fix: 修复了多语法 demo 切换语法时，代码块高度展示异常的问题 [#50](https://github.com/zh-lx/vitepress-demo-plugin/pull/50)

## 1.2.0

- 🎉 feat: 支持自定义代码主题 [#48](https://github.com/zh-lx/vitepress-demo-plugin/pull/48)

## 1.1.4

- 🐛 fix: 修复使用 `raw` 进行样式隔离时，`vitepress-demo-plugin` 代码块样式受影响的问题 [#47](https://github.com/zh-lx/vitepress-demo-plugin/pull/47)

## 1.1.3

- 🐛 fix: 修复了组件卸载时未卸载 react 节点的问题 [#42](https://github.com/zh-lx/vitepress-demo-plugin/pull/42)

## 1.1.2

- 🐛 fix: 修复一个文件路径中包含多个 `.` 导致组件命名重复的问题 [#40](https://github.com/zh-lx/vitepress-demo-plugin/pull/40)

## 1.1.1

- 🐛 fix: 修复了将 `<demo />` 注释后依然会渲染的问题 [#38](https://github.com/zh-lx/vitepress-demo-plugin/pull/38)
- 🐛 fix: 修复了 demo 路径中包含中文字符时编译失败的问题 [#37](https://github.com/zh-lx/vitepress-demo-plugin/pull/37)

## 1.1.0

- 🎉 feat: 支持多文件代码展示 [#34](https://github.com/zh-lx/vitepress-demo-plugin/pull/34)
- 🐛 fix: 修复移动端代码块的适配问题 [#33](https://github.com/zh-lx/vitepress-demo-plugin/pull/33)

## 1.0.6

- 🐛 fix: 修复了打包后 html 组件样式表现不一致的问题 [#30](https://github.com/zh-lx/vitepress-demo-plugin/pull/30)

## 1.0.5

- 🐛 fix: 修复了 react 组件使用了类似客户端代码时会导致构建失败的问题 [#27](https://github.com/zh-lx/vitepress-demo-plugin/pull/27)

## 1.0.4

- 🐛 fix: 修复了只展示 vue/react 单组件时的告警问题 [#25](https://github.com/zh-lx/vitepress-demo-plugin/pull/25)

## 1.0.3

- 🐛 fix: 修复部分已知问题

## 1.0.2

- 🐛 fix: 修复了 `codesandbox.templates` 不生效的问题 [#22](https://github.com/zh-lx/vitepress-demo-plugin/pull/22)

## 1.0.1

- 🐛 fix: 修复了 docs 构建时 `DOMParse is undefined` 的问题 [#21](https://github.com/zh-lx/vitepress-demo-plugin/pull/21)

## 1.0.0

- 🎉 release: vitepress-demo-plugin 首次发布了！
