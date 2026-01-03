import pluginStorybook from "eslint-plugin-storybook";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    pluginStorybook.configs["flat/recommended"],
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: path.resolve(__dirname),
    },
  },
});
