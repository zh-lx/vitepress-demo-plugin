<template>
  <div :class="[ns.bem('tooltip', 'wrapper')]">
    <div :class="[ns.bem('tooltip', 'content')]">
      <slot name="content">{{ props.content }}</slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNameSpace } from '../utils/namespace';

const ns = useNameSpace();

const props = defineProps<{
  content: string;
}>();
</script>

<style scoped lang="scss">
@import '../style/var.scss';

.#{$defaultPrefix}-tooltip__wrapper {
  position: relative;
  display: inline-block;
  &:hover {
    .#{$defaultPrefix}-tooltip__content {
      display: block;
    }
  }
}

.#{$defaultPrefix}-tooltip__content {
  position: absolute;
  top: -4px;
  left: 50%;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  background-color: var(--coot-demo-box-tooltip-bg);
  color: var(--coot-demo-box-tooltip-color);
  transform: translate(-50%, -100%);
  display: none;
}
</style>
../utils/namespace
