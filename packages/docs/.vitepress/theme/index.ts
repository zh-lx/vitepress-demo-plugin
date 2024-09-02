// https://vitepress.dev/guide/custom-theme
import { h, ref } from 'vue';
import Theme from 'vitepress/theme';
import './style.scss';
import { VitepressDemoBox } from 'vitepress-demo-box';
import 'vitepress-demo-box/dist/style.css';

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('demo-box', VitepressDemoBox);
  },
};
