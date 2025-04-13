export interface LocaleText {
  openInStackblitz: string;
  openInCodeSandbox: string;
  openInGithub: string;
  openInGitlab: string;
  collapseCode: string;
  expandCode: string;
  copyCode: string;
}

export type Locale = {
  [key: string]: 'zh-CN' | 'en-US' | LocaleText;
};

export const CN: LocaleText = {
  openInStackblitz: '在 Stackblitz 中打开',
  openInCodeSandbox: '在 Codesandbox 中打开',
  openInGithub: '在 GitHub 中打开',
  openInGitlab: '在 GitLub 中打开',
  collapseCode: '收起代码',
  expandCode: '展开代码',
  copyCode: '复制代码',
};

export const EN: LocaleText = {
  openInStackblitz: 'Open In Stackblitz',
  openInCodeSandbox: 'Open In Codesandbox',
  openInGithub: 'Open in GitHub',
  openInGitlab: 'Open in GitLab',
  collapseCode: 'Collapse Code',
  expandCode: 'Expand Code',
  copyCode: 'Copy Code',
};
