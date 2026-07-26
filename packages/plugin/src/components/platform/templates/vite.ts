import { ComponentType } from '@/constant/type';

const vueViteConfig = `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
`;

const reactViteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
});
`;

const svelteViteConfig = `import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({
  plugins: [svelte()],
});
`;

export function genViteConfig(type: ComponentType) {
  if (type === ComponentType.VUE) {
    return vueViteConfig;
  }
  if (type === ComponentType.REACT) {
    return reactViteConfig;
  }
  if (type === ComponentType.SVELTE) {
    return svelteViteConfig;
  }
  return '';
}
