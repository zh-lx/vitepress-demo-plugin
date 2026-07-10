export function toCodeSandboxFiles(
  files?: Record<string, string> | Record<string, { content: string }>,
) {
  return Object.fromEntries(
    Object.entries(files || {}).map(([filename, file]) => [
      filename,
      typeof file === 'string' ? { content: file || '' } : file,
    ]),
  );
}
