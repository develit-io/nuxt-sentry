module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  plugins: ["import"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    quotes: ["error", "double", { allowTemplateLiterals: false, avoidEscape: true }],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/consistent-type-imports": "error",
    "vue/multi-word-component-names": 0,
    "prettier/prettier": ["warn"],
    "import/order": [
      "error",
      {
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "unknown",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
  },
}
