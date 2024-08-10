import type { Options } from '../types';
import { toKebabCase } from '../utils';
import { componentRegExp, libraryName } from '../constants';

export const resolveStyle = (options: Options, name: string) => {
  const partialName = toKebabCase(name.slice(3));
  if (!options.components.includes(name) || !(componentRegExp.test(name))) return;
  return `${libraryName}/es/components/${partialName}/style/index.mjs`;
};
