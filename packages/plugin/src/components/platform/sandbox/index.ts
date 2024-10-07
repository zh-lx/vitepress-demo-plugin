import { ComponentType, PlatformParams } from '@/constant/type';
import { getVueCodeSandboxParams } from './vue';
import { getReactCodeSandboxParams } from './react';
import { getHtmlCodeSandboxParams } from './html';

export function getCodeSandboxParams(params: PlatformParams) {
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
  for (let file in params.customFiles) {
    // @ts-ignore
    params.customFiles[file] = {
      content: params.customFiles[file] || '',
    };
  }

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
