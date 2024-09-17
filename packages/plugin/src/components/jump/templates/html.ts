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
  const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vitepress Demo</title>
  </head>
  <body>
    ${code}
  </body>
</html>`;
  return pretty(content);
}
