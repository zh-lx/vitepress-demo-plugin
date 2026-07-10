import fs from 'fs';
import path from 'path';
import { getAbsolutePath, getRelativePath } from './files';
import { Playground, PreviewFiles } from './types';

type ComponentPaths = Record<keyof PreviewFiles, string>;

export interface PlaygroundUrls {
  html: string;
  vue: string;
  react: string;
}

interface CreatePlaygroundUrlsOptions {
  playground: Playground;
  playgroundName?: string;
  scope: string;
  files: PreviewFiles;
  inputFiles: Record<keyof PreviewFiles, string | undefined>;
  componentPaths: ComponentPaths;
  baseDir: string;
}

const emptyPlaygroundUrls = (): PlaygroundUrls => ({
  html: '',
  vue: '',
  react: '',
});

const encodeFiles = (files: Record<string, string>) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(files))));

const appendPreviewFiles = (
  target: Record<string, string>,
  files: PreviewFiles[keyof PreviewFiles],
  componentPath: string,
  baseDir: string,
) => {
  Object.values(files).forEach((item) => {
    const filePath = getAbsolutePath(baseDir, item.filename);
    if (filePath === componentPath) {
      return;
    }
    const filename = getRelativePath(path.dirname(componentPath), filePath);
    target[filename] = item.code;
  });
};

export const createPlaygroundUrls = ({
  playground,
  playgroundName,
  scope,
  files,
  inputFiles,
  componentPaths,
  baseDir,
}: CreatePlaygroundUrlsOptions): PlaygroundUrls => {
  const urls = emptyPlaygroundUrls();
  if (!playground.show) {
    return urls;
  }

  try {
    const templates = playground.templates || [];
    const globalFiles = templates.find((item) => item.scope === 'global')?.files;
    const scopeFiles = templates.find((item) => item.scope === scope)?.files;
    const platformFiles = {
      html: { ...templates.find((item) => item.scope === 'html')?.files },
      vue: { ...templates.find((item) => item.scope === 'vue')?.files },
      react: { ...templates.find((item) => item.scope === 'react')?.files },
    };

    (Object.keys(platformFiles) as (keyof PreviewFiles)[]).forEach((type) => {
      if (inputFiles[type]) {
        appendPreviewFiles(
          platformFiles[type],
          files[type],
          componentPaths[type],
          baseDir,
        );
      }
    });

    const config = Array.isArray(playground.config)
      ? playground.config.find((item) => item.name === playgroundName)
      : playground.config;
    if (!config?.url) {
      return urls;
    }

    const entryNames: Record<keyof PreviewFiles, string> = {
      html: config.entryName?.html || 'index.html',
      vue: config.entryName?.vue || 'App.vue',
      react: config.entryName?.react || 'App.tsx',
    };
    (Object.keys(componentPaths) as (keyof PreviewFiles)[]).forEach((type) => {
      if (componentPaths[type]) {
        platformFiles[type][entryNames[type]] = fs.readFileSync(
          componentPaths[type],
          'utf-8',
        );
      }
    });

    const getUrl =
      typeof config.url === 'function'
        ? config.url
        : (content: string) => `${config.url}#${content}`;
    const convert = config.fn || encodeFiles;

    (Object.keys(platformFiles) as (keyof PreviewFiles)[]).forEach((type) => {
      const finalFiles = {
        ...globalFiles,
        ...platformFiles[type],
        ...scopeFiles,
      };
      urls[type] = getUrl(convert(finalFiles));
    });
  } catch (error) {
    console.warn('[vitepress-demo-plugin] Get playground url error:', error);
  }

  return urls;
};
