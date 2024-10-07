/* eslint-disable no-param-reassign */
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import path from 'path';
import {
  composeComponentName,
  handleComponentName,
  injectComponentImportScript,
} from './utils';
import { PlatformTemplate } from '@/constant/type';

const titleRegex = /title="(.*?)"/;
const vuePathRegex = /vue="(.*?)"/;
const htmlPathRegex = /html="(.*?)"/;
const reactPathRegex = /react="(.*?)"/;
const descriptionRegex = /description="(.*?)"/;
const orderRegex = /order="(.*?)"/;
const selectRegex = /select="(.*?)"/;
const githubRegex = /github="(.*?)"/;
const gitlabRegex = /gitlab="(.*?)"/;
const stackblitzRegex = /stackblitz="(.*?)"/;
const codesandboxRegex = /codesandbox="(.*?)"/;
const codeplayerRegex = /codeplayer="(.*?)"/;
const scopeRegex = /scope="(.*?)"/;

export interface DefaultProps {
  title?: string;
  description?: string;
  vue?: string;
  html?: string;
  react?: string;
}

export interface TabConfig {
  /**
   * @description 代码切换 tab 的展示顺序
   */
  order?: string;
  /**
   * @description 是否显示 tab
   */
  visible?: boolean;
  /**
   * @description 默认选中的 tab
   */
  select?: string;
}

export type Files = Record<string, string>;

export type Platform = {
  show: boolean;
  templates?: PlatformTemplate[];
};

export interface VitepressDemoBoxConfig {
  /**
   * @description demo所在目录
   */
  demoDir?: string;
  /**
   * @description 代码切换 tab 的配置
   */
  tab?: TabConfig;
  /**
   * @description stackblitz 平台配置
   */
  stackblitz?: Platform;
  /**
   * @description codesandbox 平台配置
   */
  codesandbox?: Platform;
  /**
   * @description codeplayer 平台配置
   */
  codeplayer?: Platform;
}

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
  config?: VitepressDemoBoxConfig
) => {
  const {
    demoDir,
    tab = {},
    stackblitz = { show: false },
    codesandbox = { show: false },
    codeplayer = { show: false },
  } = config || {};
  let {
    order = 'vue,react,html',
    visible = true,
    select = (tab.order || 'vue,react,html').split(',')[0] || 'vue',
  } = tab;

  const componentProps: DefaultProps = {
    vue: '',
    title: '',
    description: '',
    html: '',
    react: '',
  };

  // 获取Props相关参数
  const titleValue = token.content.match(titleRegex);
  const vuePathRegexValue = token.content.match(vuePathRegex);
  const htmlPathRegexValue = token.content.match(htmlPathRegex);
  const reactPathRegexValue = token.content.match(reactPathRegex);
  const descriptionRegexValue = token.content.match(descriptionRegex);
  const orderValue = token.content.match(orderRegex);
  const selectValue = token.content.match(selectRegex);
  const githubValue = token.content.match(githubRegex);
  const gitlabValue = token.content.match(gitlabRegex);
  const stackblitzValue = token.content.match(stackblitzRegex);
  const codesandboxValue = token.content.match(codesandboxRegex);
  const codeplayerValue = token.content.match(codeplayerRegex);
  const scopeValue = token.content.match(scopeRegex)?.[1] || '';

  const dirPath = demoDir || path.dirname(mdFile.path);

  if (orderValue?.[1]) {
    order = orderValue[1];
  }
  if (selectValue?.[1]) {
    select = selectValue[1];
  }
  let github = '';
  let gitlab = '';
  if (githubValue?.[1]) {
    github = githubValue[1];
  }
  if (gitlabValue?.[1]) {
    gitlab = gitlabValue[1];
  }
  if (stackblitzValue?.[1]) {
    stackblitz.show = stackblitzValue[1] === 'true';
  }
  if (codesandboxValue?.[1]) {
    codesandbox.show = codesandboxValue[1] === 'true';
  }
  if (codeplayerValue?.[1]) {
    codeplayer.show = codeplayerValue[1] === 'true';
  }

  if (vuePathRegexValue?.[1]) {
    componentProps.vue = path
      .join(dirPath, vuePathRegexValue[1])
      .replace(/\\/g, '/');
  }

  if (htmlPathRegexValue?.[1]) {
    componentProps.html = path
      .join(dirPath, htmlPathRegexValue[1])
      .replace(/\\/g, '/');
  }
  if (reactPathRegexValue?.[1]) {
    componentProps.react = path
      .join(dirPath, reactPathRegexValue[1])
      .replace(/\\/g, '/');
  }

  componentProps.title = titleValue ? titleValue[1] : '';
  componentProps.description = descriptionRegexValue
    ? descriptionRegexValue[1]
    : '';

  const componentVuePath = componentProps.vue
    ? path
        .resolve(
          demoDir || path.dirname(mdFile.path),
          vuePathRegexValue?.[1] || '.'
        )
        .replace(/\\/g, '/')
    : '';
  const componentHtmlPath = componentProps.html
    ? path
        .resolve(
          demoDir || path.dirname(mdFile.path),
          htmlPathRegexValue?.[1] || '.'
        )
        .replace(/\\/g, '/')
    : '';
  const componentReactPath = componentProps.react
    ? path
        .resolve(
          demoDir || path.dirname(mdFile.path),
          reactPathRegexValue?.[1] || '.'
        )
        .replace(/\\/g, '/')
    : '';

  // 组件名
  // eslint-disable-next-line prefer-destructuring
  const absolutePath = path
    .resolve(
      dirPath,
      componentProps.vue || componentProps.react || componentProps.html || '.'
    )
    .replace(/\\/g, '/');

  const componentName = composeComponentName(absolutePath);
  const reactComponentName = handleComponentName(`react-${componentName}`);

  // 注入 vitepress-demo-plugin 组件和样式
  injectComponentImportScript(
    mdFile,
    'vitepress-demo-plugin',
    `{ VitepressDemoBox }`
  );
  injectComponentImportScript(mdFile, 'vitepress-demo-plugin/dist/style.css');

  // 注入组件导入语句
  if (componentProps.vue) {
    injectComponentImportScript(mdFile, componentVuePath, componentName);
  }
  if (componentProps.react) {
    injectComponentImportScript(
      mdFile,
      'react',
      '{ createElement as reactCreateElement }'
    );
    injectComponentImportScript(
      mdFile,
      'react-dom/client',
      '{ createRoot as reactCreateRoot }'
    );
    injectComponentImportScript(mdFile, componentReactPath, reactComponentName);
  }

  // 组件代码，动态引入以便实时更新
  const htmlCode = componentProps.html
    ? handleComponentName(`code-html-${componentName}`)
    : `''`;
  const reactCode = componentProps.react
    ? handleComponentName(`code-react-${componentName}`)
    : `''`;
  const vueCode = componentProps.vue
    ? handleComponentName(`code-vue-${componentName}`)
    : `''`;
  if (componentProps.html) {
    injectComponentImportScript(mdFile, `${componentHtmlPath}?raw`, htmlCode);
  }
  if (componentProps.react) {
    injectComponentImportScript(mdFile, `${componentReactPath}?raw`, reactCode);
  }
  if (componentProps.vue) {
    injectComponentImportScript(mdFile, `${componentVuePath}?raw`, vueCode);
  }

  const sourceCode = `<vitepress-demo-box 
    title="${componentProps.title}"
    description="${componentProps.description}"
    select="${select}"
    order="${order}"
    github="${github}"
    gitlab="${gitlab}"
    stackblitz="${encodeURIComponent(JSON.stringify(stackblitz))}"
    codesandbox="${encodeURIComponent(JSON.stringify(codesandbox))}"
    codeplayer="${encodeURIComponent(JSON.stringify(codeplayer))}"
    scope="${scopeValue || ''}"
    :visible="!!${visible}"
    :htmlCode="${encodeURIComponent(htmlCode)}"
    :vueCode="${encodeURIComponent(vueCode)}"
    :reactCode="${encodeURIComponent(reactCode)}"
    :reactComponent="${reactComponentName}"
    :reactCreateRoot="reactCreateRoot"
    :reactCreateElement="reactCreateElement"
    >
    <template #vue>
      <${componentName}></${componentName}>
    </template>
  </vitepress-demo-box>`;

  return sourceCode;
};
