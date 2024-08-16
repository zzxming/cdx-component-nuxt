import type { Options } from '../types';
import { ensureArray } from '../utils';
import { getStylePath } from './style';

export const resolveDirective = (options: Options, name: string): [name: string, styles?: string | undefined] | undefined => {
  if (options.directives[name]) {
    const [directiveName, styleName] = ensureArray<string>(options.directives[name]);
    const style = styleName && getStylePath(styleName);
    return [directiveName, style];
  }
};
