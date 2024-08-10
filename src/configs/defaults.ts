import * as AllComponents from 'cdx-component';
import { isVueComponent } from '../utils';
import { componentRegExp } from '../constants';

export const getAllCdxComponents = () => {
  return Object.entries(AllComponents).reduce((components, [key, imports]) => {
    if (isVueComponent(imports) && componentRegExp.test(key) && componentRegExp.test((imports as any).name ?? '')) {
      components.push(key);
    }
    return components;
  }, [] as string[]);
};
