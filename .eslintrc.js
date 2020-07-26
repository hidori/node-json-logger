module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
    },
    env: {
        node: true,
    },
    extends: ['eslint:recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
};
