import { factory } from '@zzxming/eslint-config';

export default factory({
  overrides: [
    {
      rules: {
        'ts/no-unused-expressions': 'off',

        'unicorn/prefer-string-replace-all': 'off',

        'prefer-regex-literals': 'off',
      },
    },
  ],
});
