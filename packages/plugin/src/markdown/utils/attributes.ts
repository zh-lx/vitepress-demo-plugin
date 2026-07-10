const attributeRegex = {
  title: /title="(.*?)"/,
  vuePath: /vue="(.*?)"/,
  htmlPath: /html="(.*?)"/,
  reactPath: /react="(.*?)"/,
  description: /description="(.*?)"/,
  order: /order="(.*?)"/,
  select: /select="(.*?)"/,
  github: /github="(.*?)"/,
  gitlab: /gitlab="(.*?)"/,
  stackblitz: /stackblitz="(.*?)"/,
  codesandbox: /codesandbox="(.*?)"/,
  scope: /scope="(.*?)"/,
  vueFiles: /vueFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  reactFiles: /reactFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  htmlFiles: /htmlFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  ssg: /ssg="(.*?)"/,
  htmlWriteWay: /htmlWriteWay="(.*?)"/,
  background: /background="(.*?)"/,
  playground: /playground="(.*?)"/,
};

const getAttribute = (content: string, regex: RegExp) =>
  content.match(regex)?.[1];

export const parsePreviewAttributes = (content: string) => ({
  title: getAttribute(content, attributeRegex.title) || '',
  vuePath: getAttribute(content, attributeRegex.vuePath),
  htmlPath: getAttribute(content, attributeRegex.htmlPath),
  reactPath: getAttribute(content, attributeRegex.reactPath),
  description: getAttribute(content, attributeRegex.description) || '',
  order: getAttribute(content, attributeRegex.order),
  select: getAttribute(content, attributeRegex.select),
  github: getAttribute(content, attributeRegex.github) || '',
  gitlab: getAttribute(content, attributeRegex.gitlab) || '',
  stackblitz: getAttribute(content, attributeRegex.stackblitz),
  codesandbox: getAttribute(content, attributeRegex.codesandbox),
  scope: getAttribute(content, attributeRegex.scope) || '',
  vueFiles: getAttribute(content, attributeRegex.vueFiles),
  reactFiles: getAttribute(content, attributeRegex.reactFiles),
  htmlFiles: getAttribute(content, attributeRegex.htmlFiles),
  ssg: !!getAttribute(content, attributeRegex.ssg),
  htmlWriteWay:
    getAttribute(content, attributeRegex.htmlWriteWay) || 'write',
  background: getAttribute(content, attributeRegex.background),
  playground: getAttribute(content, attributeRegex.playground),
});

export type PreviewAttributes = ReturnType<typeof parsePreviewAttributes>;
