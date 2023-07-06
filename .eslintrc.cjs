module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'globals': {
        'module': true
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react',
        'react-refresh',
        '@typescript-eslint'
    ],
    'rules': {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-console': ['warn', { 'allow': ['info', 'warn', 'error', 'debug'] }],
        'no-debugger': 'error',
        'no-unused-vars': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-newline': [1, { 'prevent': true, 'allowMultilines': true }],
        'react/jsx-max-props-per-line': [1, { 'maximum': 1 }],
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-filename-extension': ['warn', { 'extensions': ['.tsx'] }],
        'react/jsx-closing-bracket-location': [1, 'line-aligned'],
        'react/no-unescaped-entities': 'off',
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-unused-vars': ['error', { 'destructuredArrayIgnorePattern': '^_' }],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
    }
};