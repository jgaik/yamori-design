import React, { useEffect } from "react";
import { Preview } from "@storybook/react";

import "@yamori-design/styles/dist/global.css";
import "./preview.scss";

export default {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals.theme || "light";

      // TODO move to context or util
      useEffect(() => {
        document.documentElement.setAttribute(
          "data-yamori-theme",
          selectedTheme
        );
      }, [selectedTheme]);

      return <Story />;
    },
  ],
} satisfies Preview;
