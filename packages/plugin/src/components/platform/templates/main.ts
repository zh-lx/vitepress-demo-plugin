import { ComponentType } from '@/constant/type';

const mainVue = `import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
`;

const mainReact = `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
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
