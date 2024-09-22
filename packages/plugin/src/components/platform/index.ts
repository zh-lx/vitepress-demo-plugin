export function getInitialFile(type: string) {
  if (type === 'vue') {
    return '/src/Demo.vue';
  }
  if (type === 'react') {
    return '/src/Demo.tsx';
  }
  return 'index.html';
}
