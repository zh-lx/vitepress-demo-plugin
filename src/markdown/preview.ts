/* eslint-disable no-param-reassign */
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import fs from 'fs';
import path from 'path';
import {
  composeComponentName,
  injectComponentImportScript,
  isCheckingRelativePath,
  transformHighlightCode,
} from './utils';

const titleRegex = /title="(.*?)"/;
const vuePathRegex = /vue="(.*?)"/;
const htmlPathRegex = /vanilla="(.*?)"/;
const litPathRegex = /lit="(.*?)"/;
const reactPathRegex = /react="(.*?)"/;
const descriptionRegex = /description="(.*?)"/;

export interface DefaultProps {
  vue: string;
  title: string;
  description: string;
  html?: string;
  react?: string;
  lit?: string;
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
    lit: '',
    react: '',
  };

  // 获取Props相关参数
  const titleValue = token.content.match(titleRegex);
  const vuePathRegexValue = token.content.match(vuePathRegex);
  const htmlPathRegexValue = token.content.match(htmlPathRegex);
  const litPathRegexValue = token.content.match(litPathRegex);
  const reactPathRegexValue = token.content.match(reactPathRegex);
  const descriptionRegexValue = token.content.match(descriptionRegex);

  if (!vuePathRegexValue)
    throw new Error(
      'vitepress-demo-box: path is a required parameter in <demo />'
    );
  // eslint-disable-next-line prefer-destructuring
  const absolutePath = path.resolve(
    demoRoot || path.dirname(mdFile.path),
    componentProps.vue || '.'
  );
  const relativePath = path.relative(path.dirname(mdFile.path), absolutePath);
  componentProps.vue = path
    .join(relativePath, vuePathRegexValue[1])
    .replace(/\\/g, '/');

  if (htmlPathRegexValue?.[1]) {
    componentProps.html = path
      .join(relativePath, htmlPathRegexValue[1])
      .replace(/\\/g, '/');
  }
  if (litPathRegexValue?.[1]) {
    componentProps.lit = path
      .join(relativePath, litPathRegexValue[1])
      .replace(/\\/g, '/');
  }
  if (reactPathRegexValue?.[1]) {
    componentProps.react = path
      .join(relativePath, reactPathRegexValue[1])
      .replace(/\\/g, '/');
  }

  componentProps.title = titleValue ? titleValue[1] : '';
  componentProps.description = descriptionRegexValue
    ? descriptionRegexValue[1]
    : '';

  const componentVuePath = componentProps.vue
    ? path.resolve(demoRoot || path.dirname(mdFile.path), vuePathRegexValue[1])
    : '';
  const componentHtmlPath = componentProps.html
    ? path.resolve(
        demoRoot || path.dirname(mdFile.path),
        htmlPathRegexValue?.[1] || '.'
      )
    : '';
  const componentLitPath = componentProps.lit
    ? path.resolve(
        demoRoot || path.dirname(mdFile.path),
        litPathRegexValue?.[1] || '.'
      )
    : '';
  const componentReactPath = componentProps.react
    ? path.resolve(
        demoRoot || path.dirname(mdFile.path),
        reactPathRegexValue?.[1] || '.'
      )
    : '';

  // 组件名
  const componentName = composeComponentName(componentProps.vue);
  // 后缀名
  const suffixName = componentVuePath.substring(
    componentVuePath.lastIndexOf('.') + 1
  );

  // 注入组件导入语句
  injectComponentImportScript(mdFile, componentProps.vue, componentName);

  // 组件源码
  const componentVueCode = fs.readFileSync(componentVuePath, {
    encoding: 'utf-8',
  });
  const componentHtmlCode = componentHtmlPath
    ? fs.readFileSync(componentHtmlPath, {
        encoding: 'utf-8',
      })
    : '';
  const componentLitCode = componentLitPath
    ? fs.readFileSync(componentLitPath, {
        encoding: 'utf-8',
      })
    : '';
  const componentReactCode = componentReactPath
    ? fs.readFileSync(componentReactPath, {
        encoding: 'utf-8',
      })
    : '';
  // 源码代码块（经过处理）
  const compileHighlightCode = transformHighlightCode(
    md,
    componentVueCode,
    suffixName
  );

  const showVueCode = encodeURIComponent(compileHighlightCode);
  const showHtmlCode = encodeURIComponent(
    transformHighlightCode(md, componentHtmlCode, 'html')
  );
  const showLitCode = encodeURIComponent(
    transformHighlightCode(md, componentLitCode, 'typescript')
  );
  const showReactCode = encodeURIComponent(
    transformHighlightCode(md, componentReactCode, 'tsx')
  );

  const sourceCode = `<demo-box 
    title="${componentProps.title}"
    description="${componentProps.description}" 
    vue="${encodeURIComponent(componentVueCode)}" 
    html="${encodeURIComponent(componentHtmlCode)}"
    lit="${encodeURIComponent(componentLitCode)}"
    react="${encodeURIComponent(componentReactCode)}"
    showHtmlCode="${showHtmlCode}"
    showLitCode="${showLitCode}"
    showReactCode="${showReactCode}"
    showVueCode="${showVueCode}"
    suffixName="${suffixName}" 
    absolutePath="${componentVuePath}" 
    relativePath="${componentProps.vue}">
    <template #vue>
      <${componentName}></${componentName}>
    </template>
  </demo-box>`;

  return sourceCode;
};
