/* eslint-disable no-param-reassign */
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import path from 'path';
import {
  composeComponentName,
  createPlaygroundUrls,
  getAbsolutePath,
  injectComponentImportScript,
  parsePreviewAttributes,
  readPreviewFiles,
} from './utils';
import type {
  DefaultProps,
  Playground,
  VitepressDemoBoxConfig,
} from './utils';

export type {
  CodeFiles,
  DefaultProps,
  Files,
  Platform,
  Playground,
  PlaygroundConfig,
  TabConfig,
  VitepressDemoBoxConfig,
} from './utils';

/**
 * 编译预览组件
 * @param md
 * @param token
 * @param mdFile
 * @param demoDir
 * @returns
 */
export const transformPreview = (
  md: MarkdownIt,
  token: Token,
  mdFile: any,
  config?: VitepressDemoBoxConfig,
) => {
  const {
    demoDir,
    tab = {},
    stackblitz = { show: false },
    codesandbox = { show: false },
    playground = { show: false } as Playground,
  } = config || {};
  let {
    order = 'vue,react,html',
    visible = true,
    select = (tab.order || 'vue,react,html').split(',')[0] || 'vue',
  } = tab;
  const attributes = parsePreviewAttributes(token.content);
  const {
    github,
    gitlab,
    scope: scopeValue,
    ssg: ssgValue,
    htmlWriteWay: htmlWriteWayValue,
    background: backgroundValue,
  } = attributes;
  const mdFilePath = mdFile.realPath ?? mdFile.path;
  const dirPath = demoDir || path.dirname(mdFilePath);

  if (attributes.order) {
    order = attributes.order;
  }
  if (attributes.select) {
    select = attributes.select;
  }
  if (attributes.stackblitz) {
    stackblitz.show = attributes.stackblitz === 'true';
  }
  if (attributes.codesandbox) {
    codesandbox.show = attributes.codesandbox === 'true';
  }
  if (attributes.playground) {
    playground.show = attributes.playground !== 'false';
  }

  const componentProps: DefaultProps = {
    title: attributes.title,
    description: attributes.description,
    vue: attributes.vuePath
      ? path.join(dirPath, attributes.vuePath).replace(/\\/g, '/')
      : '',
    html: attributes.htmlPath
      ? path.join(dirPath, attributes.htmlPath).replace(/\\/g, '/')
      : '',
    react: attributes.reactPath
      ? path.join(dirPath, attributes.reactPath).replace(/\\/g, '/')
      : '',
  };

  const getAbsPath = (demoPath?: string) =>
    getAbsolutePath(demoDir || path.dirname(mdFilePath), demoPath);
  const componentVuePath = componentProps.vue
    ? getAbsPath(attributes.vuePath)
    : '';
  const componentHtmlPath = componentProps.html
    ? getAbsPath(attributes.htmlPath)
    : '';
  const componentReactPath = componentProps.react
    ? getAbsPath(attributes.reactPath)
    : '';

  // 组件名
  // eslint-disable-next-line prefer-destructuring
  const absolutePath = path
    .resolve(
      dirPath,
      componentProps.vue || componentProps.react || componentProps.html || '.',
    )
    .replace(/\\/g, '/');

  const componentName = composeComponentName(absolutePath);
  const reactComponentName = `react${componentName}`;

  // 注入 vitepress-demo-plugin 组件和样式
  injectComponentImportScript(
    mdFile,
    'vitepress-demo-plugin',
    `{ VitepressDemoBox, VitepressDemoPlaceholder }`,
  );
  injectComponentImportScript(mdFile, 'vitepress-demo-plugin/dist/style.css');
  injectComponentImportScript(mdFile, 'vue', '{ ref, shallowRef, onMounted }');

  // 注入组件导入语句
  if (componentProps.vue) {
    injectComponentImportScript(
      mdFile,
      componentVuePath,
      componentName,
      ssgValue ? undefined : 'dynamicImport',
    );
  }
  if (componentProps.react) {
    injectComponentImportScript(
      mdFile,
      'react',
      '{ createElement as reactCreateElement }',
    );
    injectComponentImportScript(
      mdFile,
      'react-dom/client',
      '{ createRoot as reactCreateRoot }',
    );
    injectComponentImportScript(
      mdFile,
      componentReactPath,
      reactComponentName,
      'dynamicImport',
    );
  }

  const placeholderVisibleKey = `__placeholder_visible_key__`;

  // 控制 placeholder 的显示
  injectComponentImportScript(
    mdFile,
    placeholderVisibleKey,
    `const ${placeholderVisibleKey} = ref(true);`,
    'inject',
  );

  // 组件代码，动态引入以便实时更新
  const htmlCodeTempVariable = componentProps.html
    ? `TempCodeHtml${componentName}`
    : `''`;
  const reactCodeTempVariable = componentProps.react
    ? `TempCodeReact${componentName}`
    : `''`;
  const vueCodeTempVariable = componentProps.vue
    ? `TempCodeVue${componentName}`
    : `''`;
  if (componentProps.html) {
    injectComponentImportScript(
      mdFile,
      `${componentHtmlPath}?raw`,
      htmlCodeTempVariable,
    );
  }
  if (componentProps.react) {
    injectComponentImportScript(
      mdFile,
      `${componentReactPath}?raw`,
      reactCodeTempVariable,
    );
  }
  if (componentProps.vue) {
    injectComponentImportScript(
      mdFile,
      `${componentVuePath}?raw`,
      vueCodeTempVariable,
    );
  }

  const inputFiles = {
    vue: attributes.vueFiles,
    react: attributes.reactFiles,
    html: attributes.htmlFiles,
  };
  const componentPaths = {
    vue: componentVuePath,
    react: componentReactPath,
    html: componentHtmlPath,
  };
  const files = readPreviewFiles(inputFiles, componentPaths, dirPath);

  // 国际化
  let locale = '';
  if (config?.locale && typeof config.locale === 'object') {
    locale = encodeURIComponent(JSON.stringify(config.locale));
  }

  const {
    html: htmlPlayground,
    vue: vuePlayground,
    react: reactPlayground,
  } = createPlaygroundUrls({
    playground,
    playgroundName: attributes.playground,
    scope: scopeValue,
    files,
    inputFiles,
    componentPaths,
    baseDir: dirPath,
  });

  const sourceCode = `
  ${
    ssgValue
      ? ''
      : `<vitepress-demo-placeholder v-show="${placeholderVisibleKey}" />`
  }
  ${ssgValue ? '' : '<ClientOnly>'}
    <vitepress-demo-box 
      title="${componentProps.title}"
      description="${componentProps.description}"
      locale="${locale}"
      select="${select}"
      order="${order}"
      github="${github}"
      gitlab="${gitlab}"
      theme="${config?.theme || ''}"
      lightTheme="${config?.lightTheme || ''}"
      darkTheme="${config?.darkTheme || ''}"
      stackblitz="${encodeURIComponent(JSON.stringify(stackblitz))}"
      codesandbox="${encodeURIComponent(JSON.stringify(codesandbox))}"
      playground="${encodeURIComponent(JSON.stringify(playground))}"
      files="${encodeURIComponent(JSON.stringify(files))}"
      scope="${scopeValue || ''}"
      htmlWriteWay="${htmlWriteWayValue}"
      background="${backgroundValue}"
      htmlPlayground="${htmlPlayground}"
      vuePlayground="${vuePlayground}"
      reactPlayground="${reactPlayground}"
      :visible="!!${visible}"
      @mount="() => { ${placeholderVisibleKey} = false; }"
      ${
        componentProps.html
          ? `
            :htmlCode="${htmlCodeTempVariable}"
            `
          : ''
      }
      ${
        componentProps.vue
          ? `
            :vueCode="${vueCodeTempVariable}"
            `
          : ''
      }
      ${
        componentProps.react
          ? `
            :reactCode="${reactCodeTempVariable}"
            :reactComponent="${reactComponentName}"
            :reactCreateRoot="reactCreateRoot"
            :reactCreateElement="reactCreateElement"
            `
          : ''
      }
      >
      ${
        componentProps.vue
          ? `
            <template v-if="${componentName}" #vue>
              <${componentName}></${componentName}>
            </template>
            `
          : ''
      }
    </vitepress-demo-box>
  ${ssgValue ? '' : '</ClientOnly>'}`.trim();

  return sourceCode;
};
