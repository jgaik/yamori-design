import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { 
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  tsEslint.configs.eslintRecommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
