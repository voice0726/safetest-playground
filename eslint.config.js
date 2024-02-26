const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');
const tsEsLintPlugin = require('@typescript-eslint/eslint-plugin');
const tsEsLintParser = require('@typescript-eslint/parser');
const eslintConfigPrettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

const commonRules = {
  ...js.configs.recommended.rules,
  ...jsxA11y.configs.recommended.rules,
  ...react.configs.recommended.rules,
  ...react.configs['jsx-runtime'].rules,
  ...reactHooks.configs.recommended.rules,
  ...nextPlugin.configs.recommended.rules,
  ...nextPlugin.configs['core-web-vitals'].rules,
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    },
  ],
  'import/extensions': [
    'error',
    {
      ignorePackages: true,
      pattern: {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        css: 'always',
        config: 'always',
      },
    },
  ],
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'object',
        'index',
      ],
      pathGroups: [
        {
          pattern: '{react,react-dom/**}',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: '{[A-Z]*,**/[A-Z]*}',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: './**.module.css',
          group: 'index',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      alphabetize: {
        order: 'asc',
      },
      'newlines-between': 'always',
    },
  ],
  'react/display-name': 'off',
};
const tsRules = {
  ...tsEsLintPlugin.configs['recommended'].rules,
  ...tsEsLintPlugin.configs['eslint-recommended'].rules,
  ...tsEsLintPlugin.configs['recommended-requiring-type-checking'].rules,
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksVoidReturn: false,
    },
  ],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/triple-slash-reference': [
    'error',
    {
      types: 'always',
    },
  ],
};

module.exports = [
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
    },
    rules: { ...commonRules },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser, ...globals.es2021 },
      parser: tsEsLintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        tsconfigRootDir: '.',
        project: ['./tsconfig.eslint.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEsLintPlugin,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
    },
    rules: {
      ...commonRules,
      ...tsRules,
    },
  },
  {
    files: ['**/*.tsx'],
    rules: { 'react/prop-types': 'off' },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier,
];
