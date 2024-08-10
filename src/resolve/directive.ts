import type { Options } from '../types';
import { toPascalCase } from '../utils';
import { libraryName } from '../constants';

export const resolveDirective = (options: Options, name: string): [name: string, styles?: string | undefined] | undefined => {
  if (options.directives[name]) {
    return [`Cdx${toPascalCase(name)}Directive`, `${libraryName}/es/components/${name}/style/index.mjs`];
  }
};
