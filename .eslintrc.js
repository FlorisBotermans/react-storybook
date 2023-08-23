module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['standard', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    globalThis: false
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'multiline-ternary': 'off',
    'no-use-before-define': 'off',
    semi: ['error', 'always'],
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    'react/prop-types': 'off',
    'eol-last': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    "@typescript-eslint/naming-convention": ["error",
    // { selector: "default", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow" },

    // { selector: "variableLike", format: ["camelCase"] },
    // { selector: "variable", format: ["camelCase", "PascalCase"] },
    // { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow" },

    // { selector: "typeLike", format: ["PascalCase"] },
    // { selector: "typeParameter", format: ["PascalCase"], prefix: ["T"] },

    {
      selector: "enum",
      format: ["PascalCase"]
    }, {
      selector: "enumMember",
      format: ["PascalCase"]
    }

    // Todo: Enable when all errors have been resolved
    // { selector: "typeAlias", format: ["PascalCase"], prefix: ["T"] },
    // { selector: "interface", format: ["PascalCase"], prefix: ["I"] },
    ]
    // '@typescript-eslint/interface-name-prefix': 'off' // Todo: ['error', 'always'],
  },

  root: true,
  settings: {
    react: {
      version: 'detect'
    }
  }
};