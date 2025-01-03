# 更新日志

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