import pretty from 'pretty';

interface HtmlTemplateProps {
  code?: string;
  src?: string; // 需要 import 的资源
}

export function genHtmlTemplate(params?: HtmlTemplateProps) {
  let { code, src } = params || {};
  if (!code) {
    code = `<div id="app"></div>`;
  }
  if (src) {
    code += `\n<script type="module" src="${src}"></script>`;
  }

  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, 'text/html');
    return pretty(`<!DOCTYPE html>\n${doc.documentElement.outerHTML}`, {
      ocd: true,
    });
  }

  return '';
}
