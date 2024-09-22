import { ComponentType, PlatformParams } from '@/constant/type';
import { openHtmlStackblitz } from './html';
import { openReactStackblitz } from './react';
import { openVueStackblitz } from './vue';

export function openStackblitz(params: PlatformParams) {
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
