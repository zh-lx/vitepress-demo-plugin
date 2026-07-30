import { ComponentType, PlatformParams } from '@/constant/type';
import { openHtmlStackblitz } from './html';
import { openReactStackblitz } from './react';
import { openSvelteStackblitz } from './svelte';
import { openSolidStackblitz } from './solid';
import { openPreactStackblitz } from './preact';
import { openVueStackblitz } from './vue';
import { getSourceFiles } from '..';

export function openStackblitz(params: PlatformParams) {
  const globalFiles = (params.templates || []).find(
    (item) => item.scope === 'global'
  )?.files;
  const typeFiles = (params.templates || []).find(
    (item) => item.scope === params.type
  )?.files;
  const scopeFiles = (params.templates || []).find(
    (item) => item.scope === params.scope
  )?.files;
  const platformParams = {
    ...params,
    sourceFiles: getSourceFiles(params),
    customFiles: {
      ...globalFiles,
      ...typeFiles,
      ...scopeFiles,
    },
  };

  if (params.type === ComponentType.VUE) {
    return openVueStackblitz(platformParams);
  }
  if (params.type === ComponentType.REACT) {
    return openReactStackblitz(platformParams);
  }
  if (params.type === ComponentType.SVELTE) {
    return openSvelteStackblitz(platformParams);
  }
  if (params.type === ComponentType.SOLID) {
    return openSolidStackblitz(platformParams);
  }
  if (params.type === ComponentType.PREACT) {
    return openPreactStackblitz(platformParams);
  }
  if (params.type === ComponentType.HTML) {
    return openHtmlStackblitz(platformParams);
  }
}
