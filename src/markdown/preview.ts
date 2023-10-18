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
const pathRegex = /path="(.*?)"/;
const htmlPathRegex = /html="(.*?)"/;
const litPathRegex = /lit="(.*?)"/;
const reactPathRegex = /react="(.*?)"/;
const descriptionRegex = /description="(.*?)"/;

export interface DefaultProps {
  path: string;
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
    path: '',
    title: '',
    description: '',
    html: '',
    lit: '',
    react: '',
  };

  // 获取Props相关参数
  const titleValue = token.content.match(titleRegex);
  const pathRegexValue = token.content.match(pathRegex);
  const htmlPathRegexValue = token.content.match(htmlPathRegex);
  const litPathRegexValue = token.content.match(litPathRegex);
  const reactPathRegexValue = token.content.match(reactPathRegex);
  const descriptionRegexValue = token.content.match(descriptionRegex);

  if (!pathRegexValue)
    throw new Error(
      'vitepress-demo-box: path is a required parameter in <demo />'
    );
  // eslint-disable-next-line prefer-destructuring
  const absolutePath = path.resolve(
    demoRoot || path.dirname(mdFile.path),
    componentProps.path || '.'
  );
  const relativePath = path.relative(path.dirname(mdFile.path), absolutePath);
  componentProps.path = path
    .join(relativePath, pathRegexValue[1])
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

  const componentPath = componentProps.path
    ? path.resolve(demoRoot || path.dirname(mdFile.path), pathRegexValue[1])
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
  const componentName = composeComponentName(componentProps.path);
  // 后缀名
  const suffixName = componentPath.substring(
    componentPath.lastIndexOf('.') + 1
  );

  // 注入组件导入语句
  injectComponentImportScript(mdFile, componentProps.path, componentName);

  // 组件源码
  const componentSourceCode = fs.readFileSync(componentPath, {
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
    componentSourceCode,
    suffixName
  );

  const code = encodeURI(componentSourceCode);
  const showCode = encodeURIComponent(compileHighlightCode);
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
    code="${code}" 
    html="${encodeURIComponent(componentHtmlCode)}"
    lit="${encodeURIComponent(componentLitCode)}"
    react="${encodeURIComponent(componentReactCode)}"
    showHtmlCode="${showHtmlCode}"
    showLitCode="${showLitCode}"
    showReactCode="${showReactCode}"
    showCode="${showCode}"
    suffixName="${suffixName}" 
    absolutePath="${componentPath}" 
    relativePath="${componentProps.path}">
    <${componentName}></${componentName}>
  </demo-box>`;

  return sourceCode;
};
