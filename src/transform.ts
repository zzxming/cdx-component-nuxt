import { createUnplugin } from 'unplugin';
import MagicString from 'magic-string';
import type { NuxtOptions } from '@nuxt/schema';
import { genLibImport, genSideEffectsImport } from './utils';
import { resolvePath } from './resolve';
import { libraryName } from './constants';

interface PluginOptions {
  include: RegExp[];
  exclude: RegExp[];
  sourcemap?: NuxtOptions['sourcemap']['client'];
  transformStyles: (name: string) => undefined | string;
  transformDirectives: (name: string) => undefined | [name: string, styles?: string];
}

const componentsRegExp = /(?<=[ (])_?resolveComponent\(\s*["'](lazy-|Lazy)?([^"']*?)["'][\s,]*[^)]*\)/g;
const directivesRegExp = /(?<=[ (])_?resolveDirective\(\s*["']([^"']*?)["'][\s,]*[^)]*\)/g;

export const transformPlugin = createUnplugin((options: PluginOptions) => {
  const { include, exclude, sourcemap, transformStyles, transformDirectives } = options;

  return {
    name: `${libraryName}:transform`,
    enforce: 'post',
    transformInclude(id) {
      if (exclude.some(pattern => id.match(pattern))) {
        return false;
      }
      if (include.some(pattern => id.match(pattern))) {
        return true;
      }
    },
    async transform(code, id) {
      const styles = new Set<string>();
      const directives = new Set<string>();
      const s = new MagicString(code);
      const addStyles = (style?: string) => {
        style && styles.add(style);
      };

      s.replace(componentsRegExp, (full, lazy, name) => {
        addStyles(transformStyles(name));
        return full;
      });
      s.replace(directivesRegExp, (full, name) => {
        const directiveConfig = transformDirectives(name);
        if (directiveConfig) {
          const [directive, styles] = directiveConfig;
          addStyles(styles);
          directives.add(directive);
          return directive;
        }
        return full;
      });

      if (styles.size > 0 || directives.size > 0) {
        let imports: string = '';
        for (const name of styles) {
          imports += genSideEffectsImport(await resolvePath(name));
        }
        for (const name of directives) {
          imports += genLibImport(name, libraryName);
        }
        s.prepend(imports);
      }

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: sourcemap
            ? s.generateMap({ source: id, includeContent: true })
            : undefined,
        };
      }
    },
  };
});
