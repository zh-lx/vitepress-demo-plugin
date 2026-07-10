import { ComponentType, PlatformParams } from '@/constant/type';
import { getVueCodeSandboxParams } from './vue';
import { getReactCodeSandboxParams } from './react';
import { getHtmlCodeSandboxParams } from './html';
import { getSourceFiles } from '..';

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
    return getVueCodeSandboxParams(platformParams);
  }
  if (params.type === ComponentType.REACT) {
    return getReactCodeSandboxParams(platformParams);
  }
  if (params.type === ComponentType.HTML) {
    return getHtmlCodeSandboxParams(platformParams);
  }
}
