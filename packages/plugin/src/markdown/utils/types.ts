import { PlatformTemplate } from '../../constant/type';
import { Locale } from '@/locales/text';

export interface DefaultProps {
  title?: string;
  description?: string;
  vue?: string;
  html?: string;
  react?: string;
}

export interface TabConfig {
  /**
   * @cn 代码切换 tab 的展示顺序
   * @en The order of the code switch tab
   */
  order?: string;
  /**
   * @cn 是否显示 tab
   * @en Whether to show the tab
   */
  visible?: boolean;
  /**
   * @cn 默认选中的 tab
   * @en The default selected tab
   */
  select?: string;
}

export type Files = Record<string, { code: string; filename: string }>;

export type PreviewFiles = Record<'vue' | 'react' | 'html', Files>;

export type Platform = {
  show: boolean;
  templates?: PlatformTemplate[];
};

export type CodeFiles = string[] | Record<string, string>;

export type PlaygroundConfig = {
  url: string | ((content: string) => string);
  fn?: (files: Record<string, string>) => string;
  entryName?: {
    vue?: string;
    react?: string;
    html?: string;
  };
};

export type Playground = {
  show: boolean;
  templates?: PlatformTemplate[];
  config: PlaygroundConfig | (PlaygroundConfig & { name: string })[];
};

export interface VitepressDemoBoxConfig {
  /**
   * @cn demo所在目录
   * @en The directory of the demo
   */
  demoDir?: string;
  /**
   * @cn 代码切换 tab 的配置
   * @en The configuration of the code switch tab
   */
  tab?: TabConfig;
  /**
   * @cn stackblitz 平台配置
   * @en The configuration of the stackblitz platform
   */
  stackblitz?: Platform;
  /**
   * @cn codesandbox 平台配置
   * @en The configuration of the codesandbox platform
   */
  codesandbox?: Platform;
  /**
   * @cn vue 展示的代码文件
   * @en The code files of the vue
   */
  vueFiles?: CodeFiles;
  /**
   * @cn react 展示的代码文件
   * @en The code files of the react
   */
  reactFiles?: CodeFiles;
  /**
   * @cn html 展示的代码文件
   * @en The code files of the html
   */
  htmlFiles?: CodeFiles;
  /**
   * @cn 亮色模式主题，参考 https://shiki.style/themes#bundled-themes
   * @en The light theme, reference https://shiki.style/themes#bundled-themes
   */
  lightTheme?: string;
  /**
   * @cn 暗色模式主题，参考 https://shiki.style/themes#bundled-themes
   * @en The dark theme, reference https://shiki.style/themes#bundled-themes
   */
  darkTheme?: string;
  /**
   * @cn 亮色/暗色模式统一的主题(建议使用 lightTheme 和 darkTheme 分开)，参考 https://shiki.style/themes#bundled-themes
   * @en The light/dark theme, reference https://shiki.style/themes#bundled-themes
   */
  theme?: string;
  /**
   * @cn 国际化配置 'zh-CN' | 'en-US'
   * @en The locale configuration 'zh-CN' | 'en-US'
   */
  locale?: Locale;
  /**
   * @cn 自定义 playground 平台配置
   * @en The configuration of the custom playground platform
   */
  playground?: Playground;
}
