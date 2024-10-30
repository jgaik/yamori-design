import React, { useEffect } from "react";
import { Preview } from "@storybook/react";
import { ThemeOption } from "@yamori-design/react-components";

import "@yamori-design/styles/dist/global.css";
import "./preview.scss";

export default {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["default", "light", "dark"] satisfies ThemeOption[],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: localStorage.getItem("@yamori-design:theme") ?? "default",
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = (context.globals.theme as ThemeOption) || "default";

      useEffect(() => {
        if (selectedTheme === "default") {
          delete document.documentElement.dataset.yamoriTheme;
        } else {
          document.documentElement.dataset.yamoriTheme = selectedTheme;
        }
      }, [selectedTheme]);

      return <Story />;
    },
  ],
} satisfies Preview;
