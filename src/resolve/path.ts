import { createResolver } from '@nuxt/kit';

export const resolvePath = (path: string): Promise<string> => {
  const { resolvePath } = createResolver(import.meta.url);
  return resolvePath(path);
};
