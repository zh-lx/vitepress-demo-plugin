import { ComponentType } from '@/constant/type';

export function genTsConfig(type?: ComponentType): string {
  const additions: Record<string, any> = {};
  if (type === ComponentType.REACT) {
    additions['jsx'] = 'react';
  }
  const content = JSON.stringify(
    {
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowImportingTsExtensions: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        ...additions,
      },
      include: ['src'],
    },
    null,
    2
  );
  return content;
}
