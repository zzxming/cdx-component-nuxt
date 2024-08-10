import type { Component } from 'vue';
import type { PresetImport } from './types';

export const isVueComponent = (value: any): value is Component => {
  return typeof value === 'object' && value.name && (value.props || value.emits || value.setup || value.render);
};
export const toKebabCase = (key: string) => {
  const result = key.replaceAll(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
};
export const toCamelCase = (key: string) => {
  return key.replaceAll(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
};
export const toPascalCase = (key: string) => {
  const name = toCamelCase(key);
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};
export const ensureArray = <T>(value: T | T[]): T[] => Array.isArray(value) ? value : [value];

export const genLibImport = (item: PresetImport, from: string) => {
  let importStr = '';
  if (typeof item !== 'string') {
    const [name, as] = item;
    importStr = `${name} as ${as}`;
  }
  else {
    importStr = item;
  }
  return `import { ${importStr} } from '${from}';\n`;
};
export const genSideEffectsImport = (from: string) => `import '${from}';\n`;
