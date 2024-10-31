/** @type {import('@trivago/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  trailingComma: 'es5',
  semi: false,
  bracketSameLine: true,
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'strict',
  singleQuote: true,
  experimentalTernaries: true,
  importOrder: [
    '^vue$',
    '^vue',
    '<THIRD_PARTY_MODULES>',
    ...[
      'components',
      'hooks',
      'stores',
      'api',
      'utils',
      'configs',
      'router',
      'styles',
    ].map((folder) => `^@/${folder}`),
    '^[./]',
  ],
}

export default config
