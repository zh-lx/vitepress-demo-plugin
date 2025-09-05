/* eslint-disable no-param-reassign */
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import path from 'path';
import fs from 'fs';
import { composeComponentName, injectComponentImportScript } from './utils';
import { PlatformTemplate } from '../constant/type';
import { Locale } from '@/locales/text';

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
const vueFilesRegex = /vueFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/;
const reactFilesRegex = /reactFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/;
const htmlFilesRegex = /htmlFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/;
const ssgRegex = /ssg="(.*?)"/;
const htmlWriteWayRegex = /htmlWriteWay="(.*?)"/;

export interface DefaultProps {
  title?: string;
  description?: string;
  vue?: string;
  html?: string;
  react?: string;
}

export interface TabConfig {
  /**
   * @cn 代码切换 tab 的展示顺序
   * @en The order of the code switch tab
   */
  order?: string;
  /**
   * @cn 是否显示 tab
   * @en Whether to show the tab
   */
  visible?: boolean;
  /**
   * @cn 默认选中的 tab
   * @en The default selected tab
   */
  select?: string;
}

export type Files = Record<string, { code: string; filename: string }>;

export type Platform = {
  show: boolean;
  templates?: PlatformTemplate[];
};

export type CodeFiles = string[] | Record<string, string>;

export interface VitepressDemoBoxConfig {
  /**
   * @cn demo所在目录
   * @en The directory of the demo
   */
  demoDir?: string;
  /**
   * @cn 代码切换 tab 的配置
   * @en The configuration of the code switch tab
   */
  tab?: TabConfig;
  /**
   * @cn stackblitz 平台配置
   * @en The configuration of the stackblitz platform
   */
  stackblitz?: Platform;
  /**
   * @cn codesandbox 平台配置
   * @en The configuration of the codesandbox platform
   */
  codesandbox?: Platform;
  /**
   * @cn codeplayer 平台配置
   * @en The configuration of the codeplayer platform
   */
  codeplayer?: Platform;
  /**
   * @cn vue 展示的代码文件
   * @en The code files of the vue
   */
  vueFiles?: CodeFiles;
  /**
   * @cn react 展示的代码文件
   * @en The code files of the react
   */
  reactFiles?: CodeFiles;
  /**
   * @cn html 展示的代码文件
   * @en The code files of the html
   */
  htmlFiles?: CodeFiles;
  /**
   * @cn 亮色模式主题，参考 https://shiki.style/themes#bundled-themes
   * @en The light theme, reference https://shiki.style/themes#bundled-themes
   */
  lightTheme?: string;
  /**
   * @cn 暗色模式主题，参考 https://shiki.style/themes#bundled-themes
   * @en The dark theme, reference https://shiki.style/themes#bundled-themes
   */
  darkTheme?: string;
  /**
   * @cn 亮色/暗色模式统一的主题(建议使用 lightTheme 和 darkTheme 分开)，参考 https://shiki.style/themes#bundled-themes
   * @en The light/dark theme, reference https://shiki.style/themes#bundled-themes
   */
  theme?: string;
  /**
   * @cn 国际化配置 'zh-CN' | 'en-US'
   * @en The locale configuration 'zh-CN' | 'en-US'
   */
  locale?: Locale;
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
  const vueFilesValue = token.content.match(vueFilesRegex);
  const reactFilesValue = token.content.match(reactFilesRegex);
  const htmlFilesValue = token.content.match(htmlFilesRegex);
  const ssgValue = !!token.content.match(ssgRegex)?.[1];
  const htmlWriteWayValue =
    token.content.match(htmlWriteWayRegex)?.[1] || 'write';
  const mdFilePath = mdFile.realPath ?? mdFile.path;
  const dirPath = demoDir || path.dirname(mdFilePath);

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
          demoDir || path.dirname(mdFilePath),
          vuePathRegexValue?.[1] || '.'
        )
        .replace(/\\/g, '/')
    : '';
  const componentHtmlPath = componentProps.html
    ? path
        .resolve(
          demoDir || path.dirname(mdFilePath),
          htmlPathRegexValue?.[1] || '.'
        )
        .replace(/\\/g, '/')
    : '';
  const componentReactPath = componentProps.react
    ? path
        .resolve(
          demoDir || path.dirname(mdFilePath),
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
  const reactComponentName = `react${componentName}`;

  // 注入 vitepress-demo-plugin 组件和样式
  injectComponentImportScript(
    mdFile,
    'vitepress-demo-plugin',
    `{ VitepressDemoBox, VitepressDemoPlaceholder }`
  );
  injectComponentImportScript(mdFile, 'vitepress-demo-plugin/dist/style.css');
  injectComponentImportScript(mdFile, 'vue', '{ ref, shallowRef, onMounted }');

  // 注入组件导入语句
  if (componentProps.vue) {
    injectComponentImportScript(
      mdFile,
      componentVuePath,
      componentName,
      ssgValue ? undefined : 'dynamicImport'
    );
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
    injectComponentImportScript(
      mdFile,
      componentReactPath,
      reactComponentName,
      'dynamicImport'
    );
  }

  const placeholderVisibleKey = `__placeholder_visible_key__`;

  // 控制 placeholder 的显示
  injectComponentImportScript(
    mdFile,
    placeholderVisibleKey,
    `const ${placeholderVisibleKey} = ref(true);`,
    'inject'
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
      htmlCodeTempVariable
    );
  }
  if (componentProps.react) {
    injectComponentImportScript(
      mdFile,
      `${componentReactPath}?raw`,
      reactCodeTempVariable
    );
  }
  if (componentProps.vue) {
    injectComponentImportScript(
      mdFile,
      `${componentVuePath}?raw`,
      vueCodeTempVariable
    );
  }

  // 多文件展示
  const files = {
    vue: {} as Record<string, { code: string; filename: string }>,
    react: {} as Record<string, { code: string; filename: string }>,
    html: {} as Record<string, { code: string; filename: string }>,
  };

  function formatString(value: string) {
    return value
      .replace(/'/g, '"')
      .replace(/\\n/g, '')
      .trim()
      .replace(/^"/, '')
      .replace(/"$/, '')
      .replace(/,(\s|\n)*\}$/, '}')
      .replace(/,(\s|\n)*\]$/, ']');
  }

  const inputFiles = {
    vue: formatString(vueFilesValue?.[1] || ''),
    react: formatString(reactFilesValue?.[1] || ''),
    html: formatString(htmlFilesValue?.[1] || ''),
  };

  for (const key in inputFiles) {
    let value = inputFiles[key as keyof typeof inputFiles];
    if (value) {
      try {
        const codeFiles = JSON.parse(value);
        if (Array.isArray(codeFiles)) {
          (codeFiles as string[]).forEach((file) => {
            const fileName = path.basename(file);
            files[key as keyof typeof files][fileName] = {
              filename: file,
              code: '',
            };
          });
        } else if (typeof codeFiles === 'object') {
          for (const file in codeFiles) {
            files[key as keyof typeof files][file] = {
              filename: codeFiles[file],
              code: '',
            };
          }
        }
        for (const file in files[key as keyof typeof files]) {
          const filePath = files[key as keyof typeof files][file].filename;
          if (filePath) {
            const absPath = path
              .resolve(demoDir || path.dirname(mdFilePath), filePath || '.')
              .replace(/\\/g, '/');
            if (fs.existsSync(absPath)) {
              const code = fs.readFileSync(absPath, 'utf-8');
              files[key as keyof typeof files][file].code = code;
            } else {
              delete files[key as keyof typeof files][file];
            }
          } else {
            delete files[key as keyof typeof files][file];
          }
        }
      } catch (error) {
        // 格式错误，则不展示该文件
      }
    }
  }

  // 国际化
  let locale = '';
  if (config?.locale && typeof config.locale === 'object') {
    locale = encodeURIComponent(JSON.stringify(config.locale));
  }

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
      codeplayer="${encodeURIComponent(JSON.stringify(codeplayer))}"
      files="${encodeURIComponent(JSON.stringify(files))}"
      scope="${scopeValue || ''}"
      htmlWriteWay="${htmlWriteWayValue}"
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
