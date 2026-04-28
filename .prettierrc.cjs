/** @type {import('prettier').Config} */
module.exports = {
  // Basic formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',

  // HTML/JSX
  jsxSingleQuote: false,
  htmlWhitespaceSensitivity: 'css',

  // Markdown
  proseWrap: 'preserve',

  // End of file
  endOfLine: 'lf',

  // Plugins
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss', // Must be last
  ],

  // Astro-specific settings
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
