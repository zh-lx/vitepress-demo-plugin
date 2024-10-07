export enum ComponentType {
  VUE = 'vue',
  REACT = 'react',
  HTML = 'html',
}

export enum PlatformType {
  STACKBLITZ = 'stackblitz',
  CODESANDBOX = 'codesandbox',
}

export interface PlatformTemplate {
  scope: 'global' | 'vue' | 'react' | 'html' | string;
  files: Record<string, string>;
}

export interface PlatformParams {
  title?: string;
  description?: string;
  code: string;
  type?: ComponentType;
  platform?: PlatformType;
  templates?: PlatformTemplate[];
  scope?: string;
  customFiles?: Record<string, string> | Record<string, { content: string }>;
}

export const DEFAULT_TITLE = 'vitepress-demo';
export const DEFAULT_DESCRIPTION = 'This is a demo from vitepress-demo-plugin';
