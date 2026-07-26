export enum ComponentType {
  VUE = 'vue',
  REACT = 'react',
  SVELTE = 'svelte',
  HTML = 'html',
}

export enum PlatformType {
  STACKBLITZ = 'stackblitz',
  CODESANDBOX = 'codesandbox',
}

export interface PlatformTemplate {
  scope: 'global' | 'vue' | 'react' | 'svelte' | 'html' | string;
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
  files?: Record<string, PreviewFile>;
  sourceFiles?: Record<string, string>;
  customFiles?: Record<string, string> | Record<string, { content: string }>;
}

export interface PreviewFile {
  code: string;
  filename: string;
  entry?: boolean;
  path?: string;
}

export const DEFAULT_TITLE = 'vitepress-demo';
export const DEFAULT_DESCRIPTION = 'This is a demo from vitepress-demo-plugin';
