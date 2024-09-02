import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';
import { demoReg } from './utils';
import { transformPreview, VitepressDemoBoxConfig } from './preview';

export const markdownDemo = (
  md: MarkdownIt & any,
  params?: VitepressDemoBoxConfig
) => {
  const defaultHtmlInlineRender = md.renderer.rules.html_inline!;
  md.renderer.rules.html_inline = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    mdFile: any,
    self: Renderer
  ) => {
    const token = tokens[idx];
    if (demoReg.some((reg) => reg.test(token.content))) {
      return transformPreview(md, token, mdFile, params);
    }
    return defaultHtmlInlineRender(tokens, idx, options, mdFile, self);
  };
};
