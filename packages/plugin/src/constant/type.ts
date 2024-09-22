export enum ComponentType {
  VUE = 'vue',
  REACT = 'react',
  HTML = 'html',
}

export enum PlatformType {
  STACKBLITZ = 'stackblitz',
  CODESANDBOX = 'codesandbox',
}

export interface PlatformParams {
  title?: string;
  description?: string;
  code: string;
  type?: ComponentType;
  platform?: PlatformType;
}

export const DEFAULT_TITLE = 'vitepress-demo';
export const DEFAULT_DESCRIPTION = 'This is a demo from vitepress-demo-plugin';
