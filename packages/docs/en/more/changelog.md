# Changelog

## 1.3.0

- 🎉 feat: For vue components that do not use client api, support static build with SSG [#71](https://github.com/zh-lx/vitepress-demo-plugin/pull/71)
- 🎉 feat: Add loading state before component is loaded [#70](https://github.com/zh-lx/vitepress-demo-plugin/pull/70)
- 🎉 feat: Migrate code theme from highlight.js to shiki [#69](https://github.com/zh-lx/vitepress-demo-plugin/pull/69)
- 🐛 fix: Fixed the problem of copying the wrong code when copying multiple files [#68](https://github.com/zh-lx/vitepress-demo-plugin/pull/68)
- 🐛 fix: Fixed the problem that multi-file demo cannot be switched on Windows [#ab1675b0](https://github.com/zh-lx/vitepress-demo-plugin/commit/ab1675b07ce4c68ba86081e123b81c6f597bd350)

## 1.2.3

- 🐛 fix: Fixed the issue that the bottom style of the code block is affected when expanded [#58](https://github.com/zh-lx/vitepress-demo-plugin/pull/58)

## 1.2.2

- 🐛 fix: Fixed the issue that `vite-plugin-node-polyfills` plugin is incompatible with `fs` module, which causes the multi-file demo display to fail [#c1d3b39f](https://github.com/zh-lx/vitepress-demo-plugin/commit/c1d3b39f0e517a7680f472585259614a512cd942)

## 1.2.1

- 🐛 fix: Fixed the warning issue about `Module "path" has been externalized for browser compatibility` when bundling documents [#51](https://github.com/zh-lx/vitepress-demo-plugin/pull/51)
- 🐛 fix: Fixed the issue that the code block height is abnormal when switching syntax in multi-syntax demo [#50](https://github.com/zh-lx/vitepress-demo-plugin/pull/50)

## 1.2.0

- 🎉 feat: Support custom code themes [#48](https://github.com/zh-lx/vitepress-demo-plugin/pull/48)

## 1.1.4

- 🐛 fix: Fix the issue that `vitepress-demo-plugin` code block styles are affected when using `raw` for style isolation [#47](https://github.com/zh-lx/vitepress-demo-plugin/pull/47)

## 1.1.3

- 🐛 fix: Fix the issue that react nodes are not uninstalled when components are uninstalled [#42](https://github.com/zh-lx/vitepress-demo-plugin/pull/42)

## 1.1.2

- 🐛 fix: Fixed the problem of component naming duplication caused by multiple `.` in a file path [#40](https://github.com/zh-lx/vitepress-demo-plugin/pull/40)

## 1.1.1

- 🐛 fix: Fixed the problem of rendering after commenting `<demo />` [#38](https://github.com/zh-lx/vitepress-demo-plugin/pull/38)

- 🐛 fix: Fixed the problem of compilation failure when the demo path contains Chinese characters [#37](https://github.com/zh-lx/vitepress-demo-plugin/pull/37)

## 1.1.0

- 🎉 feat: Support multi-file code display [#34](https://github.com/zh-lx/vitepress-demo-plugin/pull/34)
- 🐛 fix: Fix the adaptation problem of mobile code blocks [#33](https://github.com/zh-lx/vitepress-demo-plugin/pull/33)

## 1.0.6

- 🐛 fix: Fixed the problem of inconsistent html component style after packaging [#30](https://github.com/zh-lx/vitepress-demo-plugin/pull/30)

## 1.0.5

- 🐛 fix: Fixed the problem that the build failed when the react component used similar client code [#27](https://github.com/zh-lx/vitepress-demo-plugin/pull/27)

## 1.0.4

- 🐛 fix: Fixed the problem of only displaying Warning issue when using vue/react single component [#25](https://github.com/zh-lx/vitepress-demo-plugin/pull/25)

## 1.0.3

- 🐛 fix: Fix some known issues

## 1.0.2

- 🐛 fix: Fixed the issue that `codesandbox.templates` does not work [#22](https://github.com/zh-lx/vitepress-demo-plugin/pull/22)

## 1.0.1

- 🐛 fix: Fixed the issue that `DOMParse is undefined` when building docs [#21](https://github.com/zh-lx/vitepress-demo-plugin/pull/21)

## 1.0.0

- 🎉 release: vitepress-demo-plugin is released for the first time!