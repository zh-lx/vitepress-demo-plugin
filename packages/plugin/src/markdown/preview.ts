/* eslint-disable no-param-reassign */
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import fs from 'fs';
import path from 'path';
import {
  composeComponentName,
  handleComponentName,
  injectComponentImportScript,
  transformHighlightCode,
} from './utils';

const titleRegex = /title="(.*?)"/;
const vuePathRegex = /vue="(.*?)"/;
const htmlPathRegex = /html="(.*?)"/;
const reactPathRegex = /react="(.*?)"/;
const descriptionRegex = /description="(.*?)"/;

export interface DefaultProps {
  vue: string;
  title: string;
  description: string;
  html?: string;
  react?: string;
}

/**
 * 编译预览组件
 * @param md
 * @param token
 * @param mdFile
 * @param demoRoot
 * @returns
 */
export const transformPreview = (
  md: MarkdownIt,
  token: Token,
  mdFile: any,
  demoRoot?: string
) => {
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

  const dirPath = demoRoot || path.dirname(mdFile.path);

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
    ? path.resolve(
        demoRoot || path.dirname(mdFile.path),
        vuePathRegexValue?.[1] || '.'
      )
    : '';
  const componentHtmlPath = componentProps.html
    ? path.resolve(
        demoRoot || path.dirname(mdFile.path),
        htmlPathRegexValue?.[1] || '.'
      )
    : '';
  const componentReactPath = componentProps.react
    ? path.resolve(
        demoRoot || path.dirname(mdFile.path),
        reactPathRegexValue?.[1] || '.'
      )
    : '';

  // 组件名
  // eslint-disable-next-line prefer-destructuring
  const absolutePath = path.resolve(
    dirPath,
    componentProps.vue || componentProps.react || componentProps.html || '.'
  );
  const componentName = composeComponentName(absolutePath);
  const reactComponentName = handleComponentName(`react-${componentName}`);

  // 注入组件导入语句
  if (componentProps.vue) {
    injectComponentImportScript(mdFile, componentVuePath, componentName);
  }
  if (componentProps.react) {
    injectComponentImportScript(mdFile, componentReactPath, reactComponentName);
  }

  // 组件源码
  const componentVueCode = componentVuePath
    ? fs.readFileSync(componentVuePath, {
        encoding: 'utf-8',
      })
    : '';
  const componentHtmlCode = componentHtmlPath
    ? fs.readFileSync(componentHtmlPath, {
        encoding: 'utf-8',
      })
    : '';
  const componentReactCode = componentReactPath
    ? fs.readFileSync(componentReactPath, {
        encoding: 'utf-8',
      })
    : '';

  // 源码代码块（经过处理）
  const showVueCode = encodeURIComponent(
    transformHighlightCode(md, componentVueCode, 'vue')
  );
  const showHtmlCode = encodeURIComponent(
    transformHighlightCode(md, componentHtmlCode, 'html')
  );
  const showReactCode = encodeURIComponent(
    transformHighlightCode(md, componentReactCode, 'tsx')
  );

  const sourceCode = `<demo-box 
    title="${componentProps.title}"
    description="${componentProps.description}" 
    vue="${encodeURIComponent(componentVueCode)}" 
    html="${encodeURIComponent(componentHtmlCode)}"
    react="${encodeURIComponent(componentReactCode)}"
    showHtmlCode="${showHtmlCode}"
    showReactCode="${showReactCode}"
    showVueCode="${showVueCode}"
    :reactComponent="${reactComponentName}"
    >
    <template #vue>
      <${componentName}></${componentName}>
    </template>
  </demo-box>`;

  return sourceCode;
};
