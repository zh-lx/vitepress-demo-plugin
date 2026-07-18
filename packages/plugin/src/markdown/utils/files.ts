import fs from 'node:fs';
import path from 'node:path';
import { PreviewFiles } from './types';

type ComponentPaths = Record<keyof PreviewFiles, string>;
type InputFiles = Record<keyof PreviewFiles, string | undefined>;

export const getRelativePath = (from: string, to: string) =>
  path.relative(from, to).replace(/\\/g, '/');

export const getAbsolutePath = (baseDir: string, filePath?: string) =>
  path.resolve(baseDir, filePath || '.').replace(/\\/g, '/');

const formatFilesAttribute = (value: string) =>
  value
    .replace(/'/g, '"')
    .replace(/\\n/g, '')
    .trim()
    .replace(/^"/, '')
    .replace(/"$/, '')
    .replace(/,(\s|\n)*\}$/, '}')
    .replace(/,(\s|\n)*\]$/, ']');

export const readPreviewFiles = (
  inputFiles: InputFiles,
  componentPaths: ComponentPaths,
  baseDir: string,
): PreviewFiles => {
  const files: PreviewFiles = {
    vue: {},
    react: {},
    html: {},
  };

  for (const type of Object.keys(inputFiles) as (keyof PreviewFiles)[]) {
    const value = formatFilesAttribute(inputFiles[type] || '');
    if (!value) {
      continue;
    }

    try {
      const codeFiles = JSON.parse(value);
      if (Array.isArray(codeFiles)) {
        (codeFiles as string[]).forEach((file) => {
          const filePath = getAbsolutePath(baseDir, file);
          const fileName = getRelativePath(
            path.dirname(componentPaths[type]),
            filePath,
          );
          files[type][fileName] = { filename: file, code: '' };
        });
      } else if (typeof codeFiles === 'object' && codeFiles) {
        for (const file in codeFiles) {
          files[type][file] = { filename: codeFiles[file], code: '' };
        }
      }

      for (const file in files[type]) {
        const filename = files[type][file].filename;
        const absolutePath = getAbsolutePath(baseDir, filename);
        if (filename && fs.existsSync(absolutePath)) {
          files[type][file].code = fs.readFileSync(absolutePath, 'utf-8');
          files[type][file].entry = absolutePath === componentPaths[type];
          files[type][file].path = getRelativePath(
            path.dirname(componentPaths[type]),
            absolutePath,
          );
        } else {
          delete files[type][file];
        }
      }
    } catch (error) {
      // 格式错误，则不展示该文件
    }
  }

  return files;
};
