import { ComponentType, PlatformParams } from '@/constant/type';
import { getVueCodeSandboxParams } from './vue';
import { getReactCodeSandboxParams } from './react';
import { getHtmlCodeSandboxParams } from './html';

export function getCodeSandboxParams(params: PlatformParams) {
  if (params.type === ComponentType.VUE) {
    return getVueCodeSandboxParams(params);
  }
  if (params.type === ComponentType.REACT) {
    return getReactCodeSandboxParams(params);
  }
  if (params.type === ComponentType.HTML) {
    return getHtmlCodeSandboxParams(params);
  }
}
