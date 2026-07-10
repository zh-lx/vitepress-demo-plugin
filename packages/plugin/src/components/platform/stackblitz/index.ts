import { ComponentType, PlatformParams } from '@/constant/type';
import { openHtmlStackblitz } from './html';
import { openReactStackblitz } from './react';
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
  if (params.type === ComponentType.HTML) {
    return openHtmlStackblitz(platformParams);
  }
}
