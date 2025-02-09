<script setup lang="ts">
import { ref, watch } from 'vue';
import SuccessIcon from '../icons/success.vue';
import { useNameSpace } from '../utils/namespace';

const Duration = 3000;

const ns = useNameSpace();

interface message {
  content: string;
  close: () => void;
}

const props = withDefaults(defineProps<message>(), {
  content: '复制成功！',
});

const visible = ref(false);
const setVisible = (value: boolean) => {
  visible.value = value;
};
const topHeight = ref(-9999);
const setTopHeight = (value: number) => {
  topHeight.value = value;
};

watch(visible, (newValue) => {
  if (newValue === true) {
    setTimeout(() => {
      visible.value = false;
    }, Duration);
  }
});

const handleDestroy = () => {
  props.close();
};

defineExpose({
  setVisible,
  setTopHeight,
});
</script>

<template>
  <transition name="slide-fade" @after-leave="handleDestroy">
    <div
      v-if="visible"
      :class="[ns.bem('message-notice', 'container')]"
      :style="{ top: topHeight + 'px' }"
    >
      <SuccessIcon />
      <span style="color: var(--vp-c-text-1)">{{ content }}</span>
    </div>
  </transition>
</template>

<style lang="scss">
@import '../style/var.scss';

.#{$defaultPrefix}-message-notice__container {
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 8px var(--coot-demo-box-message-border);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  color: var(--coot-demo-box-primary-color);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background-color: var(--coot-demo-box-message-bg);
  font-weight: 500;

  svg {
    display: inline-block;
    fill: currentColor;
    color: var(--coot-demo-box-primary-color);
    cursor: pointer;
    margin-right: 4px;
  }
}

.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.25s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(-50%, -75px);
  opacity: 0;
}
</style>
../utils/namespace
