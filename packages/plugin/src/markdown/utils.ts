// <demo></demo> or <demo />
export const demoReg = [
  /<demo(\s|\n)((.|\n)*)><\/demo>/,
  /<demo(\s|\n)((.|\n)*)\/>/,
];

const scriptLangTsReg = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupReg = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptSetupCommonReg =
  /<\s*script\s+(setup|lang='ts'|lang="ts")?\s*(setup|lang='ts'|lang="ts")?\s*>/;

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
  type?: 'dynamicImport' | 'inject',
) => {
  const scriptsCode = env.sfcBlocks.scripts as any[];

  // 判断MD文件内部是否本身就存在 <script setup> 脚本
  const scriptsSetupIndex = scriptsCode.findIndex((script: any) => {
    if (
      scriptSetupReg.test(script.tagOpen) ||
      scriptLangTsReg.test(script.tagOpen)
    )
      return true;
    return false;
  });

  // 统一处理组件名称为驼峰命名
  const componentName = name || '';

  let importCode = '';
  if (type === 'dynamicImport') {
    importCode = name
      ? `
      const ${componentName} = ref();
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

  // MD文件中没有 <script setup> 或 <script setup lang='ts'> 脚本文件
  if (scriptsSetupIndex === -1) {
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
  } else {
    // MD文件注入了 <script setup> 或 <script setup lang='ts'> 脚本
    const oldScriptsSetup = scriptsCode[0];
    // MD文件中存在已经引入了组件，直接替换组件的内容
    if (
      oldScriptsSetup.content.includes(path) &&
      (!name || oldScriptsSetup.content.includes(componentName))
    ) {
      scriptsCode[0].content = oldScriptsSetup.content;
    } else {
      // MD文件中不存在组件 添加组件 import ${_componentName} from '${path}'\n
      // 如果MD文件中存在 <script setup lang="ts">、<script lang="ts" setup>  或 <script setup> 代码块, 那么统一转换为 <script setup lang="ts">
      const scriptCodeBlock = '<script lang="ts" setup>\n';
      scriptsCode[0].content = scriptsCode[0].content.replace(
        scriptSetupCommonReg,
        scriptCodeBlock
      );
      scriptsCode[0].content = scriptsCode[0].content.replace(
        scriptCodeBlock,
        `<script setup>\n
      ${importCode}\n`
      );
    }
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
  return 'Temp' + btoa(encodeURIComponent(componentList.join('-').split('.').slice(0, -1).join("."))).replace(/=/g, 'Equal');
};
