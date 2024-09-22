export const genStackblitzRc = () => {
  const content = JSON.stringify(
    {
      installDependencies: false,
      startCommand: 'npm install && npm run dev',
    },
    null,
    2
  );
  return content;
};
