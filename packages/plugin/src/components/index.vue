<script lang="ts" setup>
import {
  ref,
  inject,
  watch,
  nextTick,
  computed,
  Ref,
  onUnmounted,
  watchEffect,
  onMounted,
} from 'vue';
import CodeOpenIcon from './icons/code-open.vue';
import CodeCloseIcon from './icons/code-close.vue';
import CopyIcon from './icons/copy.vue';
import FoldIcon from './icons/fold.vue';
import CodeSandboxIcon from './icons/codesandbox.vue';
import StackblitzIcon from './icons/stackblitz.vue';
import GithubIcon from './icons/github.vue';
import GitlabIcon from './icons/gitlab.vue';
import { MessageService } from './message';
import Tooltip from './tooltip/index.vue';
import { useNameSpace } from './utils/namespace';
import { useCodeFold } from './utils/fold';
import { useCodeCopy } from './utils/copy';
import { genHtmlCode } from './utils/template';
import { ComponentType } from '@/constant/type';
import { Platform } from '@/markdown/preview';
import { codeToHtml } from 'shiki';

interface VitepressDemoBoxProps {
  title?: string;
  description?: string;
  reactComponent?: any;
  vueCode?: string;
  reactCode?: string;
  htmlCode?: string;
  order: string;
  visible?: boolean;
  select?: ComponentType;
  github?: string;
  gitlab?: string;
  reactCreateElement?: any; // import { createElement as reactCreateElement } from 'react';
  reactCreateRoot?: any; // import { createRoot as reactCreateRoot } from 'react-dom/client';
  stackblitz?: string;
  codesandbox?: string;
  codeplayer?: string;
  scope?: string;
  files: string;
  lightTheme?: string;
  darkTheme?: string;
  theme?: string;
}

const props = withDefaults(defineProps<VitepressDemoBoxProps>(), {
  title: '默认标题',
  description: '描述内容',
  visible: true,
  select: ComponentType.VUE,
  order: 'vue,react,html',
  github: '',
  gitlab: '',
});

const emit = defineEmits(['mount']);
onMounted(() => {
  emit('mount');
});

const stackblitz = computed<Platform>(() => {
  return JSON.parse(decodeURIComponent(props.stackblitz || '{}'));
});
const codesandbox = computed<Platform>(() => {
  return JSON.parse(decodeURIComponent(props.codesandbox || '{}'));
});
const codeplayer = computed<Platform>(() => {
  return JSON.parse(decodeURIComponent(props.codeplayer || '{}'));
});

const activeFile = ref<string>('');
const currentFiles = computed<
  Record<string, { code: string; filename: string }>
>(() => {
  const files = JSON.parse(decodeURIComponent(props.files || '{}'));
  const result = files[type.value];
  if (result && !result[activeFile.value]) {
    activeFile.value = Object.keys(result)?.[0] || '';
  }
  return result;
});

const tabOrders = computed(() => {
  return props.order.split(',').map((item: string) => item.trim());
});
const injectType = inject('coot-code-type', {} as any);
const setInjectType = inject<(type: string) => void>(
  'set-coot-code-type',
  (type: string) => {}
);

const type = ref<ComponentType>(ComponentType.VUE);
function setCodeType(_type: ComponentType) {
  type.value = _type;
  if (typeof setInjectType === 'function') {
    setInjectType(_type);
  }
}
const fileType = computed(() => {
  return type.value === 'react' ? 'tsx' : type.value;
});

const ns = useNameSpace();
const { isCodeFold, setCodeFold } = useCodeFold();
const { clickCopy } = useCodeCopy();

const currentCode = computed(() => {
  if (currentFiles.value && currentFiles.value[activeFile.value]) {
    return currentFiles.value[activeFile.value].code;
  }
  return props[`${type.value}Code` as keyof VitepressDemoBoxProps];
});

const displayCode = ref('');
watchEffect(async () => {
  await updatetDisplayCode();
  updateCodeBlockHeight();
});

async function updatetDisplayCode() {
  displayCode.value = await codeToHtml(currentCode.value || '', {
    lang:
      currentFiles.value[activeFile.value]?.filename.split('.').pop() ||
      fileType.value,
    themes: {
      dark: props.darkTheme || 'github-dark',
      light: props.lightTheme || 'github-light',
    },
  });
}

function updateCodeBlockHeight() {
  setTimeout(() => {
    // 重新计算代码块高度
    if (sourceRef.value && !isCodeFold.value) {
      sourceRef.value.style.height = sourceContentRef.value.scrollHeight + 'px';
    }
  });
}

const tabs = computed<ComponentType[]>(() => {
  return [ComponentType.VUE, ComponentType.REACT, ComponentType.HTML]
    .filter((item) => props[`${item}Code` as keyof VitepressDemoBoxProps])
    .sort((a: string, b: string) => {
      return tabOrders.value.indexOf(a) - tabOrders.value.indexOf(b);
    });
});

watch(
  () => (injectType as Ref<ComponentType>)?.value,
  (val: ComponentType) => {
    if (val && props[`${val}Code` as keyof VitepressDemoBoxProps]) {
      type.value = val;
    }
  },
  { immediate: true }
);

const openGithub = () => {
  window.open(props.github, '_blank');
};

const openGitlab = () => {
  window.open(props.gitlab, '_blank');
};

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

const htmlContainerRef = ref();
let observer: () => void;
function setHTMLWithScript() {
  nextTick(() => {
    if (!htmlContainerRef.value) {
      return;
    }
    const iframe = htmlContainerRef.value.querySelector('iframe');
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    const styles = document.head.querySelectorAll('style');
    const styleLinks = document.head.querySelectorAll('link[as="style"]');
    const fontLinks = document.head.querySelectorAll('link[as="font"]');
    const styleString = Array.from(styles)
      .map((style) => `<style replace="true">${style.innerText}</style>`)
      .join('\n');
    const styleLinkString = Array.from(styleLinks)
      .map((link) => link.outerHTML)
      .join('\n');
    const fontLinkString = Array.from(fontLinks)
      .map((link) => link.outerHTML)
      .join('\n');
    iframeDocument.write(
      genHtmlCode({
        code: props.htmlCode || '',
        styles: styleString,
        links: styleLinkString + '\n' + fontLinkString,
      })
    );
    iframeDocument.close();
    // 监听 iframe 高度变化
    const originObserver = (observer = function () {
      requestAnimationFrame(() => {
        iframe.style.height = iframeDocument.body.scrollHeight + 'px';
        if (iframeDocument.documentElement) {
          iframeDocument.documentElement.className =
            document.documentElement.className;
        }
        if (originObserver === observer) {
          observer();
        }
      });
    });
    observer();
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
onUnmounted(() => {
  if (root) {
    root.unmount();
    root = null;
  }
});

watch(
  () => [reactContainerRef.value, props.reactComponent],
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
  (val: ComponentType) => {
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

function handleFileClick(file: string) {
  activeFile.value = file;
  if (sourceRef.value) {
    sourceRef.value.style.height = 'auto';
  }
}

const sourceRef = ref();
const sourceContentRef = ref();
watch(
  () => isCodeFold.value,
  (val) => {
    nextTick(async () => {
      if (sourceRef.value) {
        if (val) {
          sourceRef.value.style.height = 0;
        } else {
          await updatetDisplayCode();
          updateCodeBlockHeight();
        }
      }
    });
  }
);
</script>

<template>
  <div :class="[ns.e('container')]">
    <!-- 预览区 -->
    <section :class="[ns.bem('preview'), 'vp-raw']">
      <slot name="vue" v-if="type === 'vue'"></slot>
      <div ref="htmlContainerRef" v-else-if="type === 'html'">
        <iframe style="width: 100%; height: auto; border: none"></iframe>
      </div>
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
          :class="[ns.bem('tab'), type === tab && ns.bem('active-tab')]"
          @click="setCodeType?.(tab)"
        >
          {{ tab }}
        </div>
      </div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <Tooltip content="在 stackblitz 中打开" v-if="stackblitz.show">
          <StackblitzIcon
            :code="currentCode"
            :type="type"
            :scope="scope || ''"
            :templates="stackblitz.templates || []"
          />
        </Tooltip>
        <Tooltip content="在 codesandbox 中打开" v-if="codesandbox.show">
          <CodeSandboxIcon
            :code="currentCode"
            :type="type"
            :scope="scope || ''"
            :templates="codesandbox.templates || []"
          />
        </Tooltip>
        <Tooltip content="在 github 中打开" v-if="github">
          <GithubIcon @click="openGithub" />
        </Tooltip>
        <Tooltip content="在 gitlab 中打开" v-if="gitlab">
          <GitlabIcon @click="openGitlab" />
        </Tooltip>
        <Tooltip content="收起代码" v-if="!isCodeFold">
          <CodeCloseIcon @click="setCodeFold(true)" />
        </Tooltip>
        <Tooltip content="展开代码" v-else>
          <CodeOpenIcon @click="setCodeFold(false)" />
        </Tooltip>
        <Tooltip content="复制代码">
          <CopyIcon @click="clickCodeCopy" />
        </Tooltip>
      </div>
    </section>

    <!-- 代码展示区 -->
    <section :class="[ns.bem('source')]" ref="sourceRef">
      <div ref="sourceContentRef">
        <div
          :class="[ns.bem('file-tabs')]"
          v-if="Object.keys(currentFiles).length"
        >
          <div
            v-for="file in Object.keys(currentFiles)"
            :key="file"
            :class="[
              ns.bem('tab'),
              activeFile === file && ns.bem('active-tab'),
            ]"
            @click="handleFileClick(file)"
          >
            {{ file }}
          </div>
        </div>
        <pre class="language-html"><div v-html="displayCode"></div></pre>
      </div>
    </section>

    <div :class="ns.bem('fold')" v-if="!isCodeFold" @click="setCodeFold(true)">
      <FoldIcon />收起代码
    </div>
  </div>
</template>

<style lang="scss">
@import './style/var.scss';

html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

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
    column-gap: 16px;

    svg {
      width: 16px;
      height: 16px;
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
    margin: 0;
    overflow-x: auto;
    .shiki {
      background-color: var(--vp-code-block-bg) !important;
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        Liberation Mono, Courier New, monospace;
      padding: 0 24px;
    }
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
  line-height: 36px;
  font-size: 12px;
  column-gap: 4px;
  cursor: pointer;
  border-top: 1px solid var(--coot-demo-box-border);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.#{$defaultPrefix}-lang-tabs,
.#{$defaultPrefix}-file-tabs {
  line-height: 36px;
  display: flex;
  justify-content: center;
  column-gap: 16px;
  overflow-x: auto;

  .#{$defaultPrefix}-tab {
    cursor: pointer;
  }

  .#{$defaultPrefix}-active-tab {
    color: #1677ff;
    font-weight: 500;
  }
}
.#{$defaultPrefix}-lang-tabs {
  border-bottom: 1px dashed var(--coot-demo-box-border);
}

.#{$defaultPrefix}-file-tabs {
  border-top: 1px dashed var(--coot-demo-box-border);
}
</style>
