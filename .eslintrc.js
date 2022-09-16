module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-mutating-props':      'off',
  }
}
