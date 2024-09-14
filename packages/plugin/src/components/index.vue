<script lang="ts" setup>
import { ref, inject, watch, nextTick, onMounted, computed, Ref } from 'vue';
import CodeOpenIcon from './icons/code-open.vue';
import CodeCloseIcon from './icons/code-close.vue';
import CopyIcon from './icons/copy.vue';
import FoldIcon from './icons/fold.vue';
import { MessageService } from './message';
import { useNameSpace } from './hooks/namespace';
import { useCodeFold } from './hooks/fold';
import { useCodeCopy } from './hooks/copy';
import { useHighlightCode } from './hooks/highlight';
import 'highlight.js/styles/atom-one-dark.css';

interface VitepressDemoBoxProps {
  title?: string;
  description?: string;
  reactComponent?: any;
  vueCode?: string;
  reactCode?: string;
  htmlCode?: string;
  order: string;
  visible?: boolean;
  select?: string;
  reactCreateElement?: any; // import { createElement as reactCreateElement } from 'react';
  reactCreateRoot?: any; // import { createRoot as reactCreateRoot } from 'react-dom/client';
}

const props = withDefaults(defineProps<VitepressDemoBoxProps>(), {
  title: '默认标题',
  description: '描述内容',
  visible: true,
  select: 'vue',
  order: 'vue,react,html',
});

const tabOrders = computed(() => {
  return props.order.split(',').map((item: string) => item.trim());
});
const injectType = inject('coot-code-type');
const setInjectType = inject<(type: string) => void>('set-coot-code-type');

const type = ref('vue');
function setCodeType(_type: string) {
  type.value = _type;
  if (typeof setInjectType === 'function') {
    setInjectType(_type);
  }
}

const ns = useNameSpace();
const { isCodeFold, setCodeFold } = useCodeFold();
const { clickCopy } = useCodeCopy();

const currentCode = computed(() => {
  return props[`${type.value}Code` as keyof VitepressDemoBoxProps];
});
// 要展示的高亮代码
const displayCode = computed(() => {
  let code = useHighlightCode(currentCode.value);
  return code;
});

const tabs = computed(() => {
  return ['vue', 'react', 'html']
    .filter((item) => props[`${item}Code` as keyof VitepressDemoBoxProps])
    .sort((a: string, b: string) => {
      return tabOrders.value.indexOf(a) - tabOrders.value.indexOf(b);
    });
});

watch(
  () => (injectType as Ref<string>)?.value,
  (val) => {
    if (val && props[`${val}Code` as keyof VitepressDemoBoxProps]) {
      type.value = val;
    }
  },
  { immediate: true }
);

watch(
  () => (type as any).value,
  (val: any) => {
    if (!val) {
      return;
    }

    // 副作用
    if (val === 'html') {
      setHTMLWithScript();
    } else if (val === 'react') {
      renderReactComponent();
    }
  },
  {
    immediate: true,
  }
);

const clickCodeCopy = () => {
  clickCopy(currentCode.value || '');
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
    htmlContainerRef.value.innerHTML = props.htmlCode;
    const scripts = htmlContainerRef.value.querySelectorAll('script');
    return Array.prototype.slice.apply(scripts).reduce((chain, script) => {
      return chain.then(() => runScript(htmlContainerRef.value, script));
    }, Promise.resolve());
  });
}

watch(
  () => props.htmlCode,
  (val?: string) => {
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
    if (props.reactComponent && type.value === 'react' && props.reactCode) {
      if (!root) {
        root = props.reactCreateRoot(reactContainerRef.value);
      }
      root.render(props.reactCreateElement(props.reactComponent, {}, null));
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
  () => props.reactCode,
  (val) => {
    if (val && root) {
      root.render(props.reactCreateElement(props.reactComponent, {}, null));
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.select,
  (val) => {
    if (val && props[`${val}Code` as keyof VitepressDemoBoxProps]) {
      type.value = val;
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => tabs.value,
  () => {
    if (!props[`${type.value}Code` as keyof VitepressDemoBoxProps]) {
      type.value = tabs.value[0];
    }
  },
  { immediate: true, deep: true }
);

const sourceRef = ref();
watch(
  () => isCodeFold.value,
  (val) => {
    nextTick(() => {
      if (sourceRef.value) {
        if (val) {
          sourceRef.value.style.height = 0;
        } else {
          sourceRef.value.style.height = sourceRef.value.scrollHeight + 'px';
        }
      }
    });
  }
);
</script>

<template>
  <div :class="[ns.e('container')]">
    <!-- 预览区 -->
    <section :class="[ns.bem('preview')]">
      <slot name="vue" v-if="type === 'vue'"></slot>
      <div ref="htmlContainerRef" v-else-if="type === 'html'"></div>
      <div ref="reactContainerRef" v-else-if="type === 'react'"></div>
    </section>
    <!-- 描述及切换 -->
    <section :class="[ns.bem('description')]">
      <div v-if="title" :class="[ns.bem('description', 'title')]">
        <div style="flex-shrink: 0">{{ title }}</div>
      </div>
      <div
        v-if="description"
        :class="[ns.bem('description', 'content')]"
        v-html="description"
      ></div>
      <div
        v-if="props.description || (!props.title && !props.description)"
        :class="[ns.bem('description', 'split-line')]"
      ></div>
      <div :class="[ns.bem('lang-tabs')]" v-if="tabs.length > 1 && visible">
        <div
          v-for="tab in tabs"
          :key="tab"
          :class="['tab', type === tab && 'active-tab']"
          @click="setCodeType?.(tab)"
        >
          {{ tab }}
        </div>
      </div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <CodeCloseIcon v-if="!isCodeFold" @click="setCodeFold(true)" />
        <CodeOpenIcon v-else @click="setCodeFold(false)" />
        <CopyIcon @click="clickCodeCopy" />
      </div>
    </section>

    <!-- 代码展示区 -->
    <section :class="[ns.bem('source')]" ref="sourceRef">
      <pre class="language-html"><code v-html="displayCode"></code></pre>
    </section>

    <div :class="ns.bem('fold')" v-if="!isCodeFold" @click="setCodeFold(true)">
      <FoldIcon />收起代码
    </div>
  </div>
</template>

<style lang="scss">
@import './style/var.scss';

.#{$defaultPrefix}__container > * {
  font-size: 14px;
}

.#{$defaultPrefix}__container {
  div[class*='language-'] {
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 0;
    background: var(--coot-demo-box-code-bg);
  }
}

.#{$defaultPrefix}__container {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--coot-demo-box-border);
  box-shadow: 0px 0px 10px var(--coot-demo-box-border);
  margin: 10px 0;

  .#{$defaultPrefix}-preview,
  .#{$defaultPrefix}-description,
  .#{$defaultPrefix}-source {
    width: 100%;
  }
}

.#{$defaultPrefix}__container > .#{$defaultPrefix}-preview {
  padding: 20px 20px 30px 20px;

  & > p {
    margin: 0;
    padding: 0;
  }
}

.#{$defaultPrefix}__container > .#{$defaultPrefix}-description {
  .#{$defaultPrefix}-description__title {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-weight: 500;

    &::before {
      content: '';
      width: 12px;
      border-top: 1px solid var(--coot-demo-box-border);
    }

    &::after {
      content: '';
      flex: 1;
      border-top: 1px solid var(--coot-demo-box-border);
    }
  }

  .#{$defaultPrefix}-description__content {
    padding: 8px 20px;
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

.#{$defaultPrefix}__container > .#{$defaultPrefix}-source {
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  height: 0;

  div[class*='language-'] {
    margin-top: 0 !important;
  }

  .language-html {
    background-color: #f5f7fa;
    margin: 0;

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        Liberation Mono, Courier New, monospace;
      padding: 20px 24px;
    }
  }
}

.dark .#{$defaultPrefix}__container > .#{$defaultPrefix}-source {
  .language-html {
    background-color: rgb(40, 44, 52);
  }
}

.#{$defaultPrefix}__container > .#{$defaultPrefix}-fold {
  position: sticky;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: var(--vp-c-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 48px;
  font-size: 14px;
  column-gap: 4px;
  cursor: pointer;
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
