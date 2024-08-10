import { addComponent } from '@nuxt/kit';
import { toKebabCase } from '../utils';
import type { Options } from '../types';
import { libraryName } from '../constants';
import { resolvePath } from './path';

export const resolveComponent = (options: Options) => {
  const components = options.components;
  return Promise.all(components.map(async (name) => {
    const partialName = toKebabCase(name.slice(3));
    const filePath = `${libraryName}/es/components/${partialName}/index.mjs`;

    addComponent({
      export: name,
      name,
      filePath: await resolvePath(filePath),
    });
  }));
};
