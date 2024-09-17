export const genTsConfig = (type: string) => {
  const additions: Record<string, any> = {};
  if (type === 'react') {
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
};
