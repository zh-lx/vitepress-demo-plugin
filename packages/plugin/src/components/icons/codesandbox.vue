<template>
  <form
    action="https://codesandbox.io/api/v1/sandboxes/define"
    method="post"
    target="_blank"
    style="display: flex"
  >
    <input style="display: none" name="parameters" :value="parameters" />
    <input style="display: none" name="embed" :value="1" />
    <input
      style="display: none"
      name="query"
      :value="`module=${initialFile}`"
    />
    <button type="submit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-codesandbox"
      >
        <path
          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        />
        <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
        <polyline points="7.5 19.79 7.5 14.6 3 12" />
        <polyline points="21 12 16.5 14.6 16.5 19.79" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" x2="12" y1="22.08" y2="12" />
      </svg>
    </button>
  </form>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { getInitialFile } from '../platform';
import { getCodeSandboxParams } from '../platform/sandbox';
import {
  ComponentType,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  PlatformTemplate,
} from '@/constant/type';

const props = defineProps<{
  code: string;
  type: ComponentType;
  title?: string;
  description?: string;
  scope?: string;
  templates: PlatformTemplate[];
}>();

const parameters = computed(() =>
  getCodeSandboxParams({
    code: props.code,
    type: props.type,
    title: props.title || DEFAULT_TITLE,
    description: props.description || DEFAULT_DESCRIPTION,
    scope: props.scope,
    templates: props.templates,
  })
);

const initialFile = computed(() => {
  return getInitialFile(props.type);
});
</script>
