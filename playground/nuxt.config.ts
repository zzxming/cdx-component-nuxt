import { defineNuxtConfig } from 'nuxt/config';
import CdxComponent from '../src/module';

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-08-10',
  modules: [CdxComponent],
});
