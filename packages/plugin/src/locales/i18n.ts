import { ref } from 'vue';
import { CN, EN, Locale, LocaleText } from './text';

const i18nData = ref<Record<keyof Locale, LocaleText>>({
  'zh-CN': CN,
  'en-US': EN,
});

export const i18n = ref(CN);

export const initI18nData = (locale: Locale) => {
  i18nData.value = {};
  for (const key in locale) {
    if (locale[key] === 'zh-CN') {
      i18nData.value[key] = CN;
    } else if (locale[key] === 'en-US') {
      i18nData.value[key] = EN;
    } else {
      i18nData.value[key] = locale[key];
    }
  }
  if (typeof document !== 'undefined') {
    i18n.value =
      i18nData.value[document.documentElement.getAttribute('lang') || 'zh-CN'];
  }
};
let observer: MutationObserver;

export function observeI18n() {
  if (
    typeof MutationObserver !== 'undefined' &&
    typeof document !== 'undefined'
  ) {
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'lang'
        ) {
          const newLang = document.documentElement.getAttribute('lang');
          if (newLang) {
            i18n.value = i18nData.value[newLang] || CN;
          }
        }
      });
    });
  }
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
}

export function unobserveI18n() {
  if (observer) {
    observer.disconnect();
  }
}
