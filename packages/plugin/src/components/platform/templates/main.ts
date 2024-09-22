import { ComponentType } from '@/constant/type';

const mainVue = `import { createApp } from "vue";
import Demo from "./Demo.vue";

const app = createApp(Demo);
app.mount("#app");
`;

const mainReact = `import React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./Demo.tsx";

const root = createRoot(document.querySelector("#app"));
root.render(<Demo />);
`;

export function genMainTs(type: ComponentType): string {
  if (type === ComponentType.VUE) {
    return mainVue;
  }

  if (type === ComponentType.REACT) {
    return mainReact;
  }

  return '';
}
