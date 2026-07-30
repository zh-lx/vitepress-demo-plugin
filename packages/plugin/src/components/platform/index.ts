import { ComponentType, PlatformParams } from '@/constant/type';

export function getInitialFile(type: string) {
  if (type === 'vue') {
    return '/src/App.vue';
  }
  if (type === 'react') {
    return '/src/App.tsx';
  }
  if (type === 'svelte') {
    return '/src/App.svelte';
  }
  if (type === 'solid') {
    return '/src/App.tsx';
  }
  if (type === 'preact') {
    return '/src/App.tsx';
  }
  return 'index.html';
}

export function getSourceFiles(params: PlatformParams) {
  const baseDir = params.type === ComponentType.HTML ? '' : 'src/';

  return Object.fromEntries(
    Object.entries(params.files || {})
      .filter(([, file]) => !file.entry)
      .map(([filename, file]) => [
        normalizePath(`${baseDir}${file.path || filename}`),
        file.code,
      ]),
  );
}

function normalizePath(filename: string) {
  return filename
    .split('/')
    .reduce<string[]>((parts, part) => {
      if (part === '..') {
        parts.pop();
      } else if (part && part !== '.') {
        parts.push(part);
      }
      return parts;
    }, [])
    .join('/');
}
