import type { Options } from '../types';
import { getAllCdxComponents } from './defaults';

export * from './defaults';
export const defaults: Options = {
  components: getAllCdxComponents(),
  subComponents: {
    CdxCaptcha: ['CdxCaptchaSlider'],
    CdxCollapse: ['CdxCollapseItem'],
    CdxElementSelect: ['CdxElementSelectItem'],
  },
  directives: {
    loading: ['CdxLoadingDirective', 'CdxLoading'],
    tooltip: ['CdxTooltipDirective', 'CdxTooltip'],
    resize: ['CdxResizeDirective', 'CdxResize'],
  },
  include: [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.((c|m)?j|t)sx?$/],
  exclude: [/[/\\]node_modules[/\\]/, /[/\\]\.git[/\\]/, /[/\\]\.nuxt[/\\]/],
};
