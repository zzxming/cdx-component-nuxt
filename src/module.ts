import { defineNuxtModule } from '@nuxt/kit';
import type { Options } from './types';
import { resolveComponent, resolveDirective, resolveStyle, resolveThemes } from './resolve';
import { defaults } from './configs';
import { transformPlugin } from './transform';
import { libraryName } from './constants';

export default defineNuxtModule<Partial<Options>>({
  meta: {
    name: libraryName,
    configKey: 'CdxComponent',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults,
  async setup(_options, nuxt) {
    const options = _options as Options;

    if (options.components && nuxt.options.components !== false) {
      resolveComponent(options);
    }
    resolveThemes();

    nuxt.hook('vite:extendConfig', (config, { isClient }) => {
      const mode = isClient ? 'client' : 'server';
      config.plugins = config.plugins || [];
      config.plugins.push(transformPlugin.vite({
        include: options.include,
        exclude: options.exclude,
        sourcemap: nuxt.options.sourcemap[mode],
        transformStyles: name => resolveStyle(options, name),
        transformDirectives: name => resolveDirective(options, name),
      }));
    });

    nuxt.hook('webpack:config', (configs) => {
      for (const config of configs) {
        const mode = config.name === 'client' ? 'client' : 'server';
        config.plugins = config.plugins || [];
        config.plugins.push(transformPlugin.webpack({
          include: options.include,
          exclude: options.exclude,
          sourcemap: nuxt.options.sourcemap[mode],
          transformStyles: name => resolveStyle(options, name),
          transformDirectives: name => resolveDirective(options, name),
        }));
      }
    });
  },
});
