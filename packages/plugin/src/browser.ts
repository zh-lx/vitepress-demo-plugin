type VitepressDemoPlugin = typeof import('./markdown').vitepressDemoPlugin;

export { VitepressDemoBox, VitepressDemoPlaceholder } from './client';

export const vitepressDemoPlugin: VitepressDemoPlugin = () => {
  throw new Error(
    '[vitepress-demo-plugin] vitepressDemoPlugin is only available in Node.js. Import it from "vitepress-demo-plugin/markdown" in your VitePress config.',
  );
};
