// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import {defineConfig, globalIgnores} from 'eslint/config';
import {FlatCompat} from '@eslint/eslintrc';

const compat = new FlatCompat();

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{js,jsx}'],
  extends: [
    js.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    ...compat.extends('google'),
  ],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {jsx: true},
    },
  },
  rules: {
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    'max-len': ['error', {code: 260}],
  },
}, ...storybook.configs["flat/recommended"]]);
