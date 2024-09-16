import { getHtmlCodeSandboxParams } from './sandbox/html';
import { getReactCodeSandboxParams } from './sandbox/react';
import { getVueCodeSandboxParams } from './sandbox/vue';
import { openVueStackblitz } from './stackblitz/vue';
import { openReactStackblitz } from './stackblitz/react';
import { openHtmlStackblitz } from './stackblitz/html';

export function getCodeSandboxParams(code: string, type: string) {
  if (type === 'vue') {
    return getVueCodeSandboxParams(code);
  }
  if (type === 'react') {
    return getReactCodeSandboxParams(code);
  }
  if (type === 'html') {
    return getHtmlCodeSandboxParams(code);
  }
}

export function openStackblitz(code: string, type: string) {
  if (type === 'vue') {
    return openVueStackblitz(code);
  }
  if (type === 'react') {
    return openReactStackblitz(code);
  }
  if (type === 'html') {
    return openHtmlStackblitz(code);
  }
}

export function getInitialFile(type: string) {
  if (type === 'vue') {
    return '/src/Demo.vue';
  }
  if (type === 'react') {
    return '/src/Demo.tsx';
  }
  return 'index.html';
}
