import hljs from 'highlight.js/lib/core';
import ts from 'highlight.js/lib/languages/typescript';
import js from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';

// Then register the languages you need
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('javascript', js);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
export const useHighlightCode = (
  sourceCode: string,
) => hljs.highlightAuto(sourceCode).value