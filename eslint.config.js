import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        node: true,
      },
    },
    rules: {
      // ESLint recommended rules
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        node: true,
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      vue,
    },
    rules: {
      // ESLint recommended rules
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      
      // Vue recommended rules
      'vue/valid-template-root': 'error',
      'vue/valid-v-if': 'error',
      'vue/valid-v-for': 'error',
      'vue/valid-v-model': 'error',
      'vue/valid-v-on': 'error',
      'vue/valid-v-show': 'error',
      'vue/valid-v-slot': 'error',
      'vue/valid-v-text': 'error',
      'vue/valid-v-html': 'error',
      
      // Custom rules
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ],
          alphabetical: false
        }
      ],
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      '*.local',
    ],
  },
]