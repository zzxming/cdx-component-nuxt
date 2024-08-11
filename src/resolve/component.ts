import { addComponent } from '@nuxt/kit';
import { toKebabCase } from '../utils';
import type { Options } from '../types';
import { libraryName } from '../constants';
import { resolvePath } from './path';

export const resolveComponent = (options: Options) => {
  const { components, subComponents } = options;
  const subComponentMap: Record<string, string> = {};
  for (const [key, value] of Object.entries(subComponents)) {
    for (const subName of value) {
      subComponentMap[subName] = key;
    }
  }

  return Promise.all(components.map(async (name) => {
    const partialName = toKebabCase((subComponentMap[name] || name).slice(3));
    const filePath = `${libraryName}/es/components/${partialName}/index.mjs`;
    addComponent({
      export: name,
      name,
      filePath: await resolvePath(filePath),
    });
  }));
};
