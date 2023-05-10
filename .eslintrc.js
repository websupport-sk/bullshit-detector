// const ALWAYS_MULTILINE = 'always-multiline';

module.exports = {
  plugins: [
    'sonarjs',
    '@typescript-eslint/eslint-plugin'
  ],

  parser: '@typescript-eslint/parser',

  extends: [
    'plugin:sonarjs/recommended',
  ],

  rules: {
    //FORMATTING
    'max-len': ['warn', 120],
    'semi': ['warn'],
    'max-lines': ['warn', 1000],
    'indent': ['warn', 2],
    'quotes': ['warn', 'single'],
    'arrow-spacing': ['warn', {'before': true, 'after': true}],
    'curly': ['warn'],
    'no-label-var': ['error'],
    //FUNCTIONALITY
    'no-unused-vars': ['warn'],
    'max-lines-per-function': ['warn', 80],
    'no-var': ['warn'], // do we want this?
    'prefer-const': ['warn'],
    'no-useless-catch': ['error'],
    'no-loop-func': ['error'],
    'eqeqeq': ['warn'],
    'max-nested-callbacks': ['error', 5],
    'sonarjs/cognitive-complexity': ['error', 15],
    'sonarjs/no-small-switch': ['warn'],
    'sonarjs/no-nested-switch' : 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-empty-collection': 'warn',
    //==============>OTHER
    //NOT DISCUSSED https://jamboard.google.com/d/18-oMDhmljORzKuzAKZnx74dBHjFV696oD38ulUTwxhc/viewer?f=0
    'sonarjs/prefer-single-boolean-return': ['warn'],
    'sonarjs/no-duplicate-string': ['warn'],
    'sonarjs/no-all-duplicated-branches': ['warn'],
    //==============>VUE
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.js', '.ts', '.mjs', '.mts'],
  },
};
