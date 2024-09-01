<script lang="ts" setup>
import { ref, inject, watch, nextTick, onMounted } from 'vue';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import CodeOpenIcon from './icons/code-open.vue';
import CodeCloseIcon from './icons/code-close.vue';
import CopyIcon from './icons/copy.vue';
import { MessageService } from './message';
import { useNameSpace } from './hooks/namespace';
import { useCodeFold } from './hooks/fold';
import { useCodeCopy } from './hooks/copy';

interface VitepressDemoBoxProps {
  vue: string;
  html?: string;
  react?: string;
  showVueCode?: string;
  showHtmlCode?: string;
  showReactCode?: string;
  title?: string;
  description?: string;
  reactComponent?: any;
}

const props = withDefaults(defineProps<VitepressDemoBoxProps>(), {
  title: '默认标题',
  description: '描述内容',
});

const codeType = inject('coot-code-type');
const setCodeType = inject<(type: string) => void>('set-coot-code-type');
const type = ref('');

const ns = useNameSpace();
const { isCodeFold, setCodeFold } = useCodeFold();
const { clickCopy } = useCodeCopy();

const vueCode = ref(decodeURIComponent(props.vue));
const showVueCode = ref(decodeURIComponent(props.showVueCode || ''));
const htmlCode = ref(decodeURIComponent(props.html || ''));
const showHtmlSourceCode = ref(decodeURIComponent(props.showHtmlCode || ''));
const reactCode = ref(decodeURIComponent(props.react || ''));
const showReactSourceCode = ref(decodeURIComponent(props.showReactCode || ''));

watch(
  () => (codeType as any).value,
  (val: any) => {
    // @ts-ignore
    if (props[val]) {
      type.value = val;
      if (val === 'html') {
        setHTMLWithScript();
      } else if (val === 'react') {
        renderReactComponent();
      }
    } else {
      if (type.value) {
        return;
      } else if (props.html) {
        type.value = 'html';
        setHTMLWithScript();
      } else if (props.vue) {
        type.value = 'vue';
      } else if (props.react) {
        type.value = 'react';
        renderReactComponent();
      }
    }
  },
  {
    immediate: true,
  }
);

const clickCodeCopy = () => {
  if (type.value === 'html') {
    clickCopy(htmlCode.value);
  } else if (type.value === 'vue') {
    clickCopy(vueCode.value);
  } else if (type.value === 'react') {
    clickCopy(reactCode.value);
  }

  MessageService.open();
};

function runScript(target: HTMLElement, script: HTMLScriptElement) {
  return new Promise((reslove, rejected) => {
    // 直接 document.head.appendChild(script) 是不会生效的，需要重新创建一个
    const newScript = document.createElement('script');
    // 获取 inline script
    newScript.innerHTML = script.innerHTML.replace(/import\s+'([^']+)'/g, '');
    // 存在 src 属性的话
    const src = script.getAttribute('src');
    if (src) newScript.setAttribute('src', src);
    // script 加载完成和错误处理
    newScript.onload = () => reslove(1);
    newScript.onerror = (err) => rejected();
    target.appendChild(newScript);
    target.removeChild(newScript);
    if (!src) {
      reslove(1);
    }
  });
}

const htmlContainerRef = ref();
function setHTMLWithScript() {
  nextTick(() => {
    if (!htmlContainerRef.value) {
      return;
    }
    htmlContainerRef.value.innerHTML = htmlCode.value;
    const scripts = htmlContainerRef.value.querySelectorAll('script');
    return Array.prototype.slice.apply(scripts).reduce((chain, script) => {
      return chain.then(() => runScript(htmlContainerRef.value, script));
    }, Promise.resolve());
  });
}
watch(
  () => htmlCode.value,
  (val: string) => {
    if (val) {
      setHTMLWithScript();
    }
  },
  { immediate: true }
);

const reactContainerRef = ref();
let root: any = null;
function renderReactComponent() {
  nextTick(() => {
    if (props.reactComponent && type.value === 'react') {
      if (!root) {
        root = createRoot(reactContainerRef.value);
      }
      root.render(createElement(props.reactComponent, {}, null));
    }
  });
}
watch(
  () => reactContainerRef.value,
  (val) => {
    if (reactContainerRef.value) {
      renderReactComponent();
    } else if (root) {
      root.unmount();
      root = null;
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => reactCode,
  (val) => {
    if (val && root) {
      root.render(createElement(props.reactComponent, {}, null));
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div :class="[ns.e('ant-design__container')]">
    <section :class="[ns.bem('preview')]">
      <slot name="vue" v-if="type === 'vue'"></slot>
      <div ref="htmlContainerRef" v-else-if="type === 'html'"></div>
      <slot name="lit" v-else-if="type === 'lit'"></slot>
      <div ref="reactContainerRef" v-else-if="type === 'react'"></div>
    </section>
    <section :class="[ns.bem('description')]">
      <div v-if="props.title" :class="[ns.bem('description', 'title')]">
        {{ title }}
      </div>
      <div
        v-if="props.description"
        :class="[ns.bem('description', 'content')]"
        v-html="description"
      ></div>
      <div
        v-if="props.description || (!props.title && !props.description)"
        :class="[ns.bem('description', 'split-line')]"
      ></div>
      <div :class="[ns.bem('lang-tabs')]">
        <div
          :class="['tab', type === 'html' && 'active-tab']"
          v-show="html"
          @click="setCodeType?.('html')"
        >
          html
        </div>
        <div
          :class="['tab', type === 'vue' && 'active-tab']"
          v-show="vue"
          @click="setCodeType?.('vue')"
        >
          vue
        </div>
        <div
          :class="['tab', type === 'react' && 'active-tab']"
          v-show="react"
          @click="setCodeType?.('react')"
        >
          react
        </div>
      </div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <CodeCloseIcon v-if="!isCodeFold" @click="setCodeFold(true)" />
        <CodeOpenIcon v-else @click="setCodeFold(false)" />
        <CopyIcon @click="clickCodeCopy" />
      </div>
    </section>

    <section
      :class="[ns.bem('source')]"
      ref="sourceCodeArea"
      v-show="!isCodeFold"
    >
      <div
        v-show="type === 'html'"
        v-html="showHtmlSourceCode"
        class="language-html"
      ></div>
      <div
        v-show="type === 'vue'"
        v-html="showVueCode"
        class="language-vue"
      ></div>
      <div
        v-show="type === 'react'"
        v-html="showReactSourceCode"
        class="language-tsx"
      ></div>
    </section>
  </div>
</template>

<style lang="scss">
@import './style/var.scss';

$componentPrefix: 'ant-design';
$containerPrefix: #{$defaultPrefix}__#{$componentPrefix};

.#{$containerPrefix}__container > * {
  font-size: 14px;
}

.#{$containerPrefix}__container {
  div[class*='language-'] {
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 0;
    background: var(--coot-demo-box-code-bg);
  }
}

.#{$containerPrefix}__container {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--coot-demo-box-border);
  box-shadow: 0px 0px 10px var(--coot-demo-box-border);
  margin: 10px 0;
  overflow: hidden;

  .#{$defaultPrefix}-preview,
  .#{$defaultPrefix}-description,
  .#{$defaultPrefix}-source {
    width: 100%;
  }
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-preview {
  padding: 20px 20px 30px 20px;

  & > p {
    margin: 0;
    padding: 0;
  }
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-description {
  .#{$defaultPrefix}-description__title {
    width: 100%;
    position: relative;
    padding-left: 25px;

    &::before {
      content: '';
      position: absolute;
      width: 3%;
      border-top: 1px solid var(--coot-demo-box-border);
      top: 12px;
      left: 0;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      border-top: 1px solid var(--coot-demo-box-border);
      top: 12px;
      margin-left: 5px;
    }
  }

  .#{$defaultPrefix}-description__content {
    padding: 20px;
  }

  .#{$defaultPrefix}-description__split-line {
    border-bottom: 1px dashed var(--coot-demo-box-border);
  }

  .#{$defaultPrefix}-description__handle-btn {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      color: var(--vp-c-text-1);
      cursor: pointer;
    }

    svg:not(:last-of-type) {
      margin-right: 8px;
    }
  }
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-source {
  overflow: hidden;
  transition: all 0.4s ease-in-out;

  div[class*='language-'] {
    margin-top: 0 !important;
  }
}

.#{$defaultPrefix}-lang-tabs {
  border-bottom: 1px dashed var(--coot-demo-box-border);
  line-height: 36px;
  display: flex;
  justify-content: center;
  column-gap: 16px;
  .tab {
    cursor: pointer;
  }

  .active-tab {
    color: #1677ff;
    font-weight: 500;
  }
}
</style>
