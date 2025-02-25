<template>
  <div :class="[ns.e('container')]">
    <div class="loader"></div>
    <div class="loading-text">loading</div>
  </div>
</template>

<script setup lang="ts">
import { useNameSpace } from './utils/namespace';

const ns = useNameSpace('placeholder');
</script>

<style scoped lang="scss">
@import './style/var.scss';

.#{$defaultPrefix}-placeholder__container {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--coot-demo-box-border);
  margin: 10px 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .loader {
    width: 20px;
    height: 20px;
    border: 2px solid #bee2ff;
    border-radius: 50%;
    border-top-color: #1677ff;
    animation: spin 1s ease-in-out infinite;
  }

  .loading-text {
    color: #1677ff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    position: relative;
    display: inline-block;
    margin-top: 12px;
  }

  .loading-text::after {
    content: '';
    position: absolute;
    animation: dots 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dots {
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }
}
</style>
