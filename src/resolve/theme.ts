import { useNuxt } from '@nuxt/kit';
import { libraryName } from '../constants';

export const resolveThemes = () => {
  const nuxt = useNuxt();
  const styleRegExp = new RegExp(`${libraryName}/es/components/.*/style/index.mjs`);
  const themeRegExp = new RegExp(`${libraryName}/theme/.*`);
  nuxt.options.build.transpile.push(styleRegExp, themeRegExp);
};
