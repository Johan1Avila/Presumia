module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Asegura que Prettier funcione como plugin de ESLint
  ],
  plugins: ['prettier'],
  rules: {
    // Que ESLint reporte los errores de formato según Prettier
    'prettier/prettier': ['error'],

    // Ejemplos de reglas propias que puedes ajustar o eliminar:
    'no-unused-vars': ['warn'],
    'no-console': 'off',
  },
};
