import { ref } from 'vue';

export const useCodeCopy = () => {
  const copyContent = ref('');
  const clickCopy = async (value: string) => {
    let successful = true;
    try {
      // 优先使用现代 Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      }
    } catch (_) {
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      successful = document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    return successful;
  };

  return {
    copyContent,
    clickCopy,
  };
};
