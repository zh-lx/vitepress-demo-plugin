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

const mainSvelte = `import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, { target: document.querySelector("#app") });

export default app;
`;

const mainSolid = `import { render } from "solid-js/web";
import App from "./App";

render(() => <App />, document.getElementById("app")!);
`;

const mainPreact = `import { render } from "preact";
import App from "./App";

render(<App />, document.getElementById("app")!);
`;

export function genMainTs(type: ComponentType): string {
  if (type === ComponentType.VUE) {
    return mainVue;
  }

  if (type === ComponentType.REACT) {
    return mainReact;
  }

  if (type === ComponentType.SVELTE) {
    return mainSvelte;
  }

  if (type === ComponentType.SOLID) {
    return mainSolid;
  }
  if (type === ComponentType.PREACT) {
    return mainPreact;
  }
  return '';
}
