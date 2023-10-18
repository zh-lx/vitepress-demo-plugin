<script lang="ts" setup>
import { ref, inject, watch } from 'vue';
import CodeOpenIcon from './icons/code-open.vue';
import CodeCloseIcon from './icons/code-close.vue';
import CopyIcon from './icons/copy.vue';
import { MessageService } from './message';
import { useNameSpace } from './hooks/namespace';
import { useCodeFold } from './hooks/fold';
import { useCodeCopy } from './hooks/copy';

interface VitepressDemoBoxProps {
  code: string;
  html?: string;
  lit?: string;
  react?: string;
  showCode?: string;
  showHtmlCode?: string;
  showLitCode?: string;
  showReactCode?: string;
  title?: string;
  description?: string;
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

const sourceCode = ref(decodeURIComponent(props.code));
const showSourceCode = ref(decodeURIComponent(props.showCode || ''));
const htmlCode = ref(decodeURIComponent(props.html || ''));
const showHtmlSourceCode = ref(decodeURIComponent(props.showHtmlCode || ''));
const litCode = ref(decodeURIComponent(props.lit || ''));
const showLitSourceCode = ref(decodeURIComponent(props.showLitCode || ''));
const reactCode = ref(decodeURIComponent(props.react || ''));
const showReactSourceCode = ref(decodeURIComponent(props.showReactCode || ''));

watch(
  () => (codeType as any).value,
  (val: any) => {
    // @ts-ignore
    if (props[val === 'vue' ? 'code' : val]) {
      type.value = val;
    } else {
      if (type.value) {
        return;
      } else if (props.html) {
        type.value = 'html';
      } else if (props.lit) {
        type.value = 'lit';
      } else if (props.code) {
        type.value = 'vue';
      } else if (props.react) {
        type.value = 'react';
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
  } else if (type.value === 'lit') {
    clickCopy(litCode.value);
  } else if (type.value === 'vue') {
    clickCopy(sourceCode.value);
  } else if (type.value === 'react') {
    clickCopy(reactCode.value);
  }

  MessageService.open();
};
</script>

<template>
  <div :class="[ns.e('ant-design__container')]">
    <section :class="[ns.bem('preview')]">
      <slot> </slot>
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
      <div :class="[ns.bem('lang-tabs')]">
        <div
          :class="['tab', type === 'html' && 'active-tab']"
          v-show="html"
          @click="setCodeType?.('html')"
        >
          html
        </div>
        <div
          :class="['tab', type === 'lit' && 'active-tab']"
          v-show="lit"
          @click="setCodeType?.('lit')"
        >
          lit
        </div>
        <div
          :class="['tab', type === 'vue' && 'active-tab']"
          v-show="code"
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
      <div
        v-show="type === 'html'"
        v-html="showHtmlSourceCode"
        class="language-html"
      ></div>
      <div
        v-show="type === 'lit'"
        v-html="showLitSourceCode"
        class="language-typescript"
      ></div>
      <div
        v-show="type === 'vue'"
        v-html="showSourceCode"
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

  .#{$defaultPrefix}-lang-tabs {
    border-top: 1px dashed var(--coot-demo-box-border);
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

  div[class*='language-'] {
    margin-top: 0 !important;
  }
}
</style>
