import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * ESLint Flat Config (Modern Format)
 *
 * This is the new flat config format recommended for ESLint 9+
 * and Astro 5 best practices.
 */

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Astro recommended rules
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],

  // Global configuration
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        node: true,
        es2022: true,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JSX A11y
      'jsx-a11y/anchor-is-valid': 'off',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // Astro-specific overrides
  {
    files: ['**/*.astro'],
    rules: {
      // Astro-specific rules
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      // Disable unused-vars for Astro - frontmatter vars are used in template
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      // Disable no-undef for Astro globals
      'no-undef': 'off',
    },
  },

  // Config files
  {
    files: ['*.config.{js,mjs,cjs,ts}', 'eslint.config.mjs', '.prettierrc.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off', // Allow Node.js globals like module, require
    },
  },

  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', '.astro', 'public', '*.d.ts'],
  },
];
