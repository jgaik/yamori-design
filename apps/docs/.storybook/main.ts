/* eslint-disable storybook/story-exports */
import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.*"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  managerHead: (head) =>
    head?.replace(/<title>.+<\/title>/, "<title>Yamori Design</title>"),

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
