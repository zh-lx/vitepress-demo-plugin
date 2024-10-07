import { ComponentType, PlatformParams } from '@/constant/type';
import { openHtmlStackblitz } from './html';
import { openReactStackblitz } from './react';
import { openVueStackblitz } from './vue';

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
  params.customFiles = {
    ...globalFiles,
    ...typeFiles,
    ...scopeFiles,
  };

  if (params.type === ComponentType.VUE) {
    return openVueStackblitz(params);
  }
  if (params.type === ComponentType.REACT) {
    return openReactStackblitz(params);
  }
  if (params.type === ComponentType.HTML) {
    return openHtmlStackblitz(params);
  }
}
