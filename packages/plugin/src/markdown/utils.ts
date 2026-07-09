// <demo></demo> or <demo />
export const demoReg = [
  /<demo(\s|\n)((.|\n)*)><\/demo>/,
  /<demo(\s|\n)((.|\n)*)\/>/,
];

const htmlCommentReg = /<!--[\s\S]*?-->/g;
const scriptSetupOpenTagReg =
  /<\s*script\b(?=[^>]*\ssetup(?:[\s=>/]|>))[^>]*>/i;
const pendingScriptSetupTokenKey = '__vitepress_demo_plugin_script_setup_token__';

type MarkdownToken = {
  type?: string;
  content?: string;
  children?: MarkdownToken[];
};

const hasOwn = (target: Record<string, any>, key: string) =>
  Object.prototype.hasOwnProperty.call(target, key);

const stripHtmlComments = (content: string) =>
  content.replace(htmlCommentReg, '');

const hasScriptSetupOpenTag = (content?: string) =>
  !!content && scriptSetupOpenTagReg.test(stripHtmlComments(content));

const findPendingScriptSetupToken = (
  tokens: MarkdownToken[]
): MarkdownToken | null => {
  for (const token of tokens) {
    if (token?.type === 'html_block' && hasScriptSetupOpenTag(token.content)) {
      return token;
    }
    const children = token?.children;
    if (Array.isArray(children)) {
      const child = findPendingScriptSetupToken(children);
      if (child) {
        return child;
      }
    }
  }
  return null;
};

const includesInjectedCode = (
  content: string,
  path: string,
  componentName?: string
) => content.includes(path) && (!componentName || content.includes(componentName));

const injectIntoScriptSetupContent = (content: string, importCode: string) =>
  content.replace(
    scriptSetupOpenTagReg,
    (tagOpen) => `${tagOpen}\n${importCode}`
  );

export const prepareScriptSetupToken = (env: any, tokens: any[]) => {
  if (!env || hasOwn(env, pendingScriptSetupTokenKey)) {
    return;
  }

  env[pendingScriptSetupTokenKey] = findPendingScriptSetupToken(tokens);
};

/**
 * 注入 script 脚本
 * @param mdInstance
 * @param path
 * @param componentName
 */
export const injectComponentImportScript = (
  env: any,
  path: string,
  name?: string,
  type?: 'dynamicImport' | 'inject'
) => {
  const scriptsCode = env.sfcBlocks.scripts as any[];

  // 判断MD文件内部是否本身就存在 <script setup> 脚本
  const scriptSetupBlock = hasScriptSetupOpenTag(
    env.sfcBlocks.scriptSetup?.tagOpen
  )
    ? env.sfcBlocks.scriptSetup
    : scriptsCode.find((script: any) => hasScriptSetupOpenTag(script.tagOpen));
  const pendingScriptSetupToken = hasScriptSetupOpenTag(
    env[pendingScriptSetupTokenKey]?.content
  )
    ? env[pendingScriptSetupTokenKey]
    : null;

  // 统一处理组件名称为驼峰命名
  const componentName = name || '';

  let importCode = '';
  if (type === 'dynamicImport') {
    importCode = name
      ? `
      const ${componentName} = shallowRef();
      onMounted(async () => {
        ${componentName}.value = (await import('${path}')).default;
      });
      `.trim()
      : `
      onMounted(async () => {
        await import('${path}');
      });
      `.trim();
  } else if (type === 'inject') {
    importCode = `
      ${name}
    `.trim();
  } else {
    importCode = name
      ? `import ${componentName} from '${path}'`
      : `import '${path}'`;
  }

  // MD文件中已经处理过 <script setup> 或 <script setup lang='ts'> 脚本文件
  if (scriptSetupBlock) {
    if (includesInjectedCode(scriptSetupBlock.content, path, componentName)) {
      return;
    }

    scriptSetupBlock.content = injectIntoScriptSetupContent(
      scriptSetupBlock.content,
      importCode
    );
    scriptSetupBlock.contentStripped = `${importCode}\n${
      scriptSetupBlock.contentStripped || ''
    }`;
    return;
  }

  // MD文件后续存在 <script setup>，提前向 token 中注入，避免生成第二个 setup
  if (pendingScriptSetupToken) {
    if (
      includesInjectedCode(pendingScriptSetupToken.content, path, componentName)
    ) {
      return;
    }

    pendingScriptSetupToken.content = injectIntoScriptSetupContent(
      pendingScriptSetupToken.content,
      importCode
    );
    return;
  }

  // MD文件中没有 <script setup> 或 <script setup lang='ts'> 脚本文件
  if (!scriptSetupBlock) {
    const scriptBlockObj = {
      type: 'script',
      tagClose: '</script>',
      tagOpen: "<script setup lang='ts'>",
      content: `<script setup lang='ts'>
        ${importCode}
        </script>`,
      contentStripped: importCode,
    };
    scriptsCode.push(scriptBlockObj);
    env.sfcBlocks.scriptSetup = scriptBlockObj;
  }
};

/**
 * 根据组件路径组合组件引用名称
 * @param path
 * @returns
 */
export const composeComponentName = (path: string) => {
  let isFlag = true;
  const componentList: string[] = [];
  while (isFlag) {
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex === -1) {
      isFlag = false;
    } else {
      const name = path.substring(lastIndex + 1);
      componentList.unshift(name);
      path = path.substring(0, lastIndex);
    }
  }
  return (
    'Temp' +
    btoa(
      encodeURIComponent(
        componentList.join('-').split('.').slice(0, -1).join('.')
      )
    ).replace(/=/g, 'Equal')
  );
};
