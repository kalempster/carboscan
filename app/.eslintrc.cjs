/** @type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react-native/all"
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "@typescript-eslint", "react-native"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto"
            }
        ],
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    }
};
