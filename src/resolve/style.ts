import type { Options } from '../types';
import { toKebabCase } from '../utils';
import { componentRegExp, libraryName } from '../constants';

export const getStylePath = (name: string) => {
  const partialName = toKebabCase(name.slice(3));
  return `${libraryName}/es/components/${partialName}/style/index.mjs`;
};
export const resolveStyle = (options: Options, name: string) => {
  if (!options.components.includes(name) || !(componentRegExp.test(name))) return;
  return getStylePath(name);
};
